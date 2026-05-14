/**
 * fix_post_submit.js
 * Patch script để sửa toàn bộ lỗi luồng Post-Submit
 * Chạy bằng: node fix_post_submit.js
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

let patchCount = 0;

function patch(description, searchStr, replaceStr) {
    if (html.includes(searchStr)) {
        html = html.replace(searchStr, replaceStr);
        patchCount++;
        console.log(`✅ [${patchCount}] ${description}`);
    } else {
        console.warn(`⚠️  KHÔNG TÌM THẤY: ${description}`);
        console.warn(`   Tìm: ${searchStr.substring(0, 80)}...`);
    }
}

// ============================================================
// LỖI 3a: selectVanDay – không reset state khi có listOverride
// ============================================================
patch(
    'LỖI 3a: selectVanDay – guard isRetrySession reset by listOverride',
    `                    changeMode(bestMode);
                    resetTimer();
                    resetTotalTimer();
                    lessonTimes = [];
                    sessionScores = [];
                    isRetrySession = false;
                    updateVanFab();`,
    `                    changeMode(bestMode);
                    resetTimer();
                    resetTotalTimer();
                    // FIX LỖI 3a: Chỉ reset session state khi KHÔNG phải retry (listOverride = null)
                    if (!listOverride) {
                        lessonTimes = [];
                        sessionScores = [];
                        isRetrySession = false;
                        if (typeof window._resetLessonTimes === 'function') window._resetLessonTimes(); else lessonTimes = [];
                        if (typeof window._resetSessionScores === 'function') window._resetSessionScores(); else sessionScores = [];
                        if (typeof window._setIsRetrySession === 'function') window._setIsRetrySession(false);
                    }
                    updateVanFab();`
);

// ============================================================
// LỖI 3b: selectDay – không reset state khi có listOverride
// ============================================================
patch(
    'LỖI 3b: selectDay – guard session reset by listOverride',
    `                    // Reset qua window helpers (tránh cross-script-block scope issue)
                    if (typeof window._resetLessonTimes === 'function') window._resetLessonTimes(); else lessonTimes = [];
                    if (typeof window._resetSessionScores === 'function') window._resetSessionScores(); else sessionScores = [];
                    if (typeof window._setIsRetrySession === 'function') window._setIsRetrySession(false);`,
    `                    // FIX LỖI 3b: Chỉ reset session state khi KHÔNG phải retry (listOverride = null)
                    if (!listOverride) {
                        if (typeof window._resetLessonTimes === 'function') window._resetLessonTimes(); else lessonTimes = [];
                        if (typeof window._resetSessionScores === 'function') window._resetSessionScores(); else sessionScores = [];
                        if (typeof window._setIsRetrySession === 'function') window._setIsRetrySession(false);
                    }`
);

// ============================================================
// LỖI 2: submitQuiz – chỉ push sessionScores khi KHÔNG retry
// ============================================================
patch(
    'LỖI 2: submitQuiz – di chuyển sessionScores.push ra sau check _isRetry',
    `                    // Save this lesson's score
                    lessonTimes.push(seconds);
                    sessionScores.push({ ok, total, mode: currentMode });

                    // Đọc trạng thái retry (hỗ trợ cross-script-block)
                    const _isRetry = isRetrySession || (typeof window._getIsRetrySession === 'function' && window._getIsRetrySession());`,
    `                    // FIX LỖI 2: Đọc trạng thái retry TRƯỚC khi quyết định push score
                    const _isRetry = isRetrySession || (typeof window._getIsRetrySession === 'function' && window._getIsRetrySession());

                    // Chỉ tích lũy session score khi KHÔNG phải retry session
                    if (!_isRetry) {
                        lessonTimes.push(seconds);
                        sessionScores.push({ ok, total, mode: currentMode });
                    }`
);

// ============================================================
// LỖI 1+4: showCompletionScreen – "Làm lại từ đầu" reset đầy đủ
// ============================================================
patch(
    'LỖI 1+4: Nút "Làm lại từ đầu" – thêm reset sessionScores, lessonTimes, isRetrySession',
    `document.getElementById('completion-overlay').remove(); renderQuiz(); if(typeof resetTimer==='function') resetTimer(); window.scrollTo({top:0,behavior:'smooth'});`,
    `document.getElementById('completion-overlay').remove(); if(typeof window._resetSessionScores==='function') window._resetSessionScores(); else sessionScores=[]; if(typeof window._resetLessonTimes==='function') window._resetLessonTimes(); else lessonTimes=[]; if(typeof window._setIsRetrySession==='function') window._setIsRetrySession(false); else isRetrySession=false; renderQuiz(); if(typeof resetTimer==='function') resetTimer(); if(typeof resetTotalTimer==='function') resetTotalTimer(); window.scrollTo({top:0,behavior:'smooth'});`
);

// ============================================================
// LỖI 6a: selectVanDay – cleanup completion-overlay khi navigate
// ============================================================
patch(
    'LỖI 6a: selectVanDay – xóa completion-overlay khi navigate',
    `                function selectVanDay(sectionKey, sub, lessonIdx, listOverride = null, targetMode = null) {
                    if (window.innerWidth <= 768) {`,
    `                function selectVanDay(sectionKey, sub, lessonIdx, listOverride = null, targetMode = null) {
                    // FIX LỖI 6: Xóa overlay tổng kết nếu còn tồn tại trong DOM
                    const _co1 = document.getElementById('completion-overlay');
                    if (_co1) _co1.remove();
                    if (window.innerWidth <= 768) {`
);

// ============================================================
// LỖI 6b: selectDay – cleanup completion-overlay khi navigate
// ============================================================
patch(
    'LỖI 6b: selectDay – xóa completion-overlay khi navigate',
    `                function selectDay(lv, ty, day, listOverride = null, targetMode = null) {`,
    `                function selectDay(lv, ty, day, listOverride = null, targetMode = null) {
                    // FIX LỖI 6: Xóa overlay tổng kết nếu còn tồn tại trong DOM
                    const _co2 = document.getElementById('completion-overlay');
                    if (_co2) _co2.remove();`
);

// Ghi file
fs.writeFileSync(filePath, html, 'utf8');
console.log(`\n🎉 Hoàn tất! Đã áp dụng ${patchCount}/6 patch.`);
console.log('📄 File đã được lưu: index.html');
