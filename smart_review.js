// smart_review.js
// Logic Spaced Repetition và Smart Review

const TEST_TYPES = {
    SMART: "smart_learning",
    FLASHCARD: "flashcard",
    MATCHING: "matching",
    FILL_MEANING: "fill_meaning",
    MULTIPLE_CHOICE: "multiple_choice",
    TRUE_FALSE: "true_false"
};

const TEST_TYPE_WEIGHT = {
    flashcard: 0.8,
    true_false: 0.9,
    matching: 1.0,
    multiple_choice: 1.0,
    fill_meaning: 1.3,
    smart_learning: 1.1
};

// Khởi tạo localStorage
function getReviewHistory() {
    try {
        return JSON.parse(localStorage.getItem("van_review_history")) || [];
    } catch { return []; }
}

function getUserVocabState() {
    try {
        return JSON.parse(localStorage.getItem("van_user_vocab_state")) || {};
    } catch { return {}; }
}

function saveUserVocabState(stateObj) {
    localStorage.setItem("van_user_vocab_state", JSON.stringify(stateObj));
}

function appendReviewHistory(record) {
    const history = getReviewHistory();
    history.push(record);
    // Giữ lại 10000 bản ghi gần nhất để tránh đầy bộ nhớ
    if (history.length > 10000) {
        history.shift();
    }
    localStorage.setItem("van_review_history", JSON.stringify(history));
}

// Hàm sinh ID cho từ vựng
function getVocabId(vocab) {
    if (vocab.id) return vocab.id;
    if (vocab.gramType === 'quiz' || vocab.q) {
        return "quiz_" + btoa(unescape(encodeURIComponent(vocab.q.substring(0, 50)))).replace(/[^a-zA-Z0-9]/g, '');
    }
    const c1 = vocab.c1 || "NA";
    const c2 = vocab.c2 || "NA";
    return "voc_" + btoa(unescape(encodeURIComponent(c1 + "_" + c2))).replace(/[^a-zA-Z0-9]/g, '');
}

// Lấy thông tin từ
function getVocabBaseInfo(vocab) {
    if (vocab.gramType === 'quiz' || vocab.q) {
        return { word: vocab.q, kana: '', meaning: vocab.ans };
    }
    return { word: vocab.c1, kana: vocab.c2, meaning: vocab.c3 };
}

// 7. Phân loại tốc độ phản xạ
function getResponseSpeed(responseTimeMs) {
    if (responseTimeMs <= 2000) return "fast";
    if (responseTimeMs <= 5000) return "normal";
    if (responseTimeMs <= 10000) return "slow";
    return "very_slow";
}

// 10.2 Quy đổi kết quả
function normalizeResult(result, responseTimeMs, testType) {
    const speed = getResponseSpeed(responseTimeMs);
    if (result === "wrong") return "wrong";
    if (result === "hard") return "hard"; // Dùng cho flashcard

    if (result === "correct" && speed === "fast") return "easy";
    if (result === "correct" && speed === "normal") return "good";
    if (result === "correct" && speed === "slow") return "hard";
    if (result === "correct" && speed === "very_slow") return "hard";

    return "good";
}

// 11. Memory Score
function calculateMemoryScore(vocabState) {
    if (!vocabState.lastReviewedAt) return 0;

    const now = new Date();
    const lastReviewed = new Date(vocabState.lastReviewedAt);
    const daysPassed = Math.max(0, (now - lastReviewed) / (1000 * 60 * 60 * 24));
    
    // retention = exp(-t / S), S = intervalDays
    const interval = Math.max(0.1, vocabState.intervalDays || 1);
    const retention = Math.exp(-daysPassed / interval);

    return Math.round(retention * 100);
}

// 12. Priority Score
function calculatePriorityScore(vocabState) {
    let score = 0;
    const now = new Date();

    if (!vocabState.lastReviewedAt) {
        score += 40;
    }

    if (vocabState.nextReviewAt && new Date(vocabState.nextReviewAt) <= now) {
        score += 50;
    }

    const memScore = vocabState.memoryScore !== undefined ? vocabState.memoryScore : calculateMemoryScore(vocabState);
    if (memScore < 60) score += 30;
    if (memScore < 40) score += 30;

    score += Math.min((vocabState.wrongCount || 0) * 10, 40);

    const avgTime = vocabState.averageResponseTimeMs || 0;
    if (avgTime > 5000) score += 15;
    if (avgTime > 10000) score += 15;

    if (vocabState.isStarred) score += 20;

    return score;
}

// 13. Phân loại điểm yếu
function detectWeakPoint(vocabState, result, responseTimeMs, testType) {
    if (result === "wrong" && testType === "fill_meaning") return "weak_active_recall";
    if (result === "wrong" && testType === "true_false" && responseTimeMs < 2000) return "confusion_fast_wrong";
    if (result === "correct" && responseTimeMs > 7000) return "slow_recall";
    if ((vocabState.wrongCount || 0) >= 3) return "frequent_wrong";
    if (calculateMemoryScore(vocabState) < 40) return "forgetting_risk";
    return "normal";
}

// 10.4 Cập nhật interval
function updateSpacedRepetition(vocabState, result, responseTimeMs, testType) {
    const normalizedResult = normalizeResult(result, responseTimeMs, testType);
    const weight = TEST_TYPE_WEIGHT[testType] || 1.0;

    let intervalDays = vocabState.intervalDays || 1;
    let easeFactor = vocabState.easeFactor || 2.5;

    if (normalizedResult === "wrong") {
        intervalDays = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.3 * weight);
    } else if (normalizedResult === "hard") {
        intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15 * weight);
    } else if (normalizedResult === "good") {
        intervalDays = Math.max(1, Math.round(intervalDays * easeFactor * 0.8 * weight));
    } else if (normalizedResult === "easy") {
        intervalDays = Math.max(2, Math.round(intervalDays * easeFactor * 1.1 * weight));
        easeFactor = Math.min(3.0, easeFactor + 0.1 * weight);
    }

    vocabState.intervalDays = intervalDays;
    vocabState.easeFactor = easeFactor;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    vocabState.nextReviewAt = nextDate.toISOString();
}

// Cập nhật trung bình
function updateAverageResponseTime(oldAverage, newTime, reviewCount) {
    if (!oldAverage) return newTime;
    return Math.round((oldAverage * (reviewCount - 1) + newTime) / reviewCount);
}

// 8. Cập nhật trạng thái sau khi làm bài
function updateUserVocabState(vocab, result, responseTimeMs, testType) {
    const vocabId = getVocabId(vocab);
    const stateObj = getUserVocabState();
    
    let state = stateObj[vocabId];
    if (!state) {
        state = {
            vocabId: vocabId,
            baseInfo: getVocabBaseInfo(vocab),
            reviewCount: 0,
            correctCount: 0,
            wrongCount: 0,
            averageResponseTimeMs: 0,
            intervalDays: 1,
            easeFactor: 2.5,
            isStarred: vocab.count > 0 // Sử dụng flag cũ
        };
    }

    state.reviewCount += 1;
    state.lastReviewedAt = new Date().toISOString();

    if (result === "correct" || result === "easy" || result === "good") {
        state.correctCount += 1;
    } else if (result === "wrong") {
        state.wrongCount += 1;
    }

    state.averageResponseTimeMs = updateAverageResponseTime(
        state.averageResponseTimeMs,
        responseTimeMs,
        state.reviewCount
    );

    updateSpacedRepetition(state, result, responseTimeMs, testType);

    state.memoryScore = calculateMemoryScore(state);
    state.priorityScore = calculatePriorityScore(state);
    state.weakPointType = detectWeakPoint(state, result, responseTimeMs, testType);

    stateObj[vocabId] = state;
    saveUserVocabState(stateObj);

    // Lưu history
    appendReviewHistory({
        id: "history_" + Date.now() + "_" + Math.floor(Math.random()*1000),
        vocabId: vocabId,
        testType: testType,
        result: result,
        responseTimeMs: responseTimeMs,
        reviewedAt: state.lastReviewedAt
    });
}

// API theo dõi thời gian toàn cục
window.smartTracker = {
    startTimes: {},
    start: function(vocab) {
        if (!vocab) return;
        const id = getVocabId(vocab);
        this.startTimes[id] = Date.now();
    },
    record: function(vocab, testType, result) {
        if (!vocab) return;
        const id = getVocabId(vocab);
        let responseTimeMs = 3000; // default nếu không tìm thấy start
        if (this.startTimes[id]) {
            responseTimeMs = Date.now() - this.startTimes[id];
            delete this.startTimes[id];
        }
        updateUserVocabState(vocab, result, responseTimeMs, testType);
    }
};

// 14. Smart Review Logic
function getSmartReviewList(limit = 20) {
    const states = getUserVocabState();
    let priorityList = Object.values(states).map(state => {
        state.memoryScore = calculateMemoryScore(state);
        state.priorityScore = calculatePriorityScore(state);
        return state;
    });

    priorityList.sort((a, b) => b.priorityScore - a.priorityScore);
    const topStates = priorityList.slice(0, limit);
    
    // Tìm vocab gốc tương ứng (Tạm thời tìm từ tất cả danh sách hiện có)
    // Cách an toàn nhất là lưu baseInfo vào state khi update, đã thêm ở updateUserVocabState.
    
    return topStates;
}

function startSmartReview() {
    const topStates = getSmartReviewList(20);
    if (topStates.length === 0) {
        alert("Chưa có đủ dữ liệu học tập! Hãy học thêm các bài trước khi Ôn tập thông minh.");
        return;
    }

    // Lấy tất cả các nghĩa từ vựng đã học để làm đáp án gây nhiễu (sai)
    const statesObj = getUserVocabState();
    const allMeanings = Object.values(statesObj)
        .map(s => s.baseInfo && s.baseInfo.meaning)
        .filter(m => m && m.trim().length > 0);
    const uniqueMeanings = [...new Set(allMeanings)];

    // Tạo danh sách từ cần ôn tập (Chế độ Trắc nghiệm)
    let reviewList = topStates.map(state => {
        let base = state.baseInfo || {};
        let correctMeaning = base.meaning || "";
        
        // Chọn ngẫu nhiên 3 đáp án sai khác với đáp án đúng
        let wrongMeanings = uniqueMeanings.filter(m => m !== correctMeaning);
        wrongMeanings.sort(() => 0.5 - Math.random());
        
        let question = base.word || "";
        if (base.kana && base.kana !== base.word) {
            question += ` (${base.kana})`;
        }

        return {
            id: state.vocabId,
            gramType: 'quiz', // Kích hoạt UI trắc nghiệm
            q: question || "???",
            ans: correctMeaning,
            w1: wrongMeanings[0] || "Đáp án nhiễu 1",
            w2: wrongMeanings[1] || "Đáp án nhiễu 2",
            w3: wrongMeanings[2] || "Đáp án nhiễu 3",
            explain: base.kana ? `Cách đọc: ${base.kana}` : "",
            c1: base.word || "",
            c2: base.kana || "",
            c3: correctMeaning,
            count: 0
        };
    });

    // Ẩn sidebar trên mobile
    var sidebar = document.getElementById('van-sidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }

    // Gọi selectDay với 'voca_quiz' để ép vào giao diện trắc nghiệm
    if (typeof selectDay === 'function') {
        selectDay('custom', 'voca_quiz', 'Ôn tập ưu tiên', reviewList, 0);
        // Cập nhật tiêu đề sau khi selectDay chạy
        var headerTitle = document.getElementById('header-title');
        if (headerTitle) headerTitle.innerText = "🔥 Ôn tập ưu tiên";
        var viewTitle = document.getElementById('view-title');
        if (viewTitle) viewTitle.textContent = "🔥 Ôn tập ưu tiên";

        // Cập nhật mô tả logic ra đề
        var quoteEl = document.getElementById('motivational-quote');
        if (quoteEl) {
            quoteEl.innerHTML = `
                <div style="font-size: 14px; line-height: 1.6; color: #cbd5e1; background: rgba(30,41,59,0.5); padding: 15px; border-radius: 12px; border: 1px dashed rgba(59,130,246,0.3); margin-top: 10px; text-align: left;">
                    <b style="color: var(--warning); display: block; margin-bottom: 5px; font-size: 15px;">🚀 Logic chọn từ thông minh (AI Selection):</b>
                    • <b>Spaced Repetition:</b> Ưu tiên các từ đã đến hạn hoặc quá hạn cần ôn tập.<br>
                    • <b>Độ chính xác:</b> Tập trung vào các từ bạn thường xuyên trả lời sai.<br>
                    • <b>Tốc độ phản xạ:</b> Nhắc lại những từ bạn mất nhiều thời gian suy nghĩ.
                </div>
            `;
        }
        
        // Hiện thẻ Group 2A (chứa nút Flashcard) vốn bị ẩn mặc định bởi selectDay khi có listOverride
        var group2a = document.getElementById('group-2a');
        if (group2a) group2a.style.display = 'block';
        var group2aTitle = document.getElementById('group-2a-title');
        if (group2aTitle) group2aTitle.innerHTML = '📚 HỌC TẬP (THẺ TỪ)';
        
        // Hiện nút Ôn thẻ (Flashcard) để người dùng có thể chọn
        var flashcardBtn = document.getElementById('btn-flashcard');
        if (flashcardBtn) flashcardBtn.style.display = 'inline-flex';
        
    } else if (typeof window.changeMode === 'function') {
        // Fallback
        window.currentList = reviewList;
        window.curLevel = "custom";
        window.curDay = "Ôn tập ưu tiên";
        window.curType = "voca_quiz";

        var journeyCard = document.getElementById('journey-card');
        if (journeyCard) journeyCard.style.display = 'none';

        var quoteEl2 = document.getElementById('motivational-quote');
        if (quoteEl2) {
            quoteEl2.innerHTML = `
                <div style="font-size: 14px; line-height: 1.6; color: #cbd5e1; background: rgba(30,41,59,0.5); padding: 15px; border-radius: 12px; border: 1px dashed rgba(59,130,246,0.3); margin-top: 10px; text-align: left;">
                    <b style="color: var(--warning); display: block; margin-bottom: 5px; font-size: 15px;">🚀 Logic chọn từ thông minh (AI Selection):</b>
                    • <b>Spaced Repetition:</b> Ưu tiên các từ đã đến hạn hoặc quá hạn cần ôn tập.<br>
                    • <b>Độ chính xác:</b> Tập trung vào các từ bạn thường xuyên trả lời sai.<br>
                    • <b>Tốc độ phản xạ:</b> Nhắc lại những từ bạn mất nhiều thời gian suy nghĩ.
                </div>
            `;
        }

        var modeBoxContainer = document.getElementById('mode-box-container');
        if (modeBoxContainer) modeBoxContainer.style.display = 'none';
        var submitContainer = document.getElementById('submit-container');
        if (submitContainer) submitContainer.style.display = 'flex';
        var rtWrapper = document.getElementById('rt-wrapper');
        if (rtWrapper) rtWrapper.style.display = 'flex';
        var topControlCard = document.getElementById('top-control-card');
        if (topControlCard) topControlCard.style.display = 'block';
        var mainTimerBox = document.getElementById('main-timer-box');
        if (mainTimerBox) mainTimerBox.style.display = 'block';

        var headerTitle2 = document.getElementById('header-title');
        if (headerTitle2) headerTitle2.innerText = "🔥 Ôn tập ưu tiên";
        
        var group2a2 = document.getElementById('group-2a');
        if (group2a2) group2a2.style.display = 'block';
        var group2aTitle2 = document.getElementById('group-2a-title');
        if (group2aTitle2) group2aTitle2.innerHTML = '📚 HỌC TẬP (THẺ TỪ)';

        var flashcardBtn2 = document.getElementById('btn-flashcard');
        if (flashcardBtn2) flashcardBtn2.style.display = 'inline-flex';

        window.changeMode(0);
    } else {
        alert("Lỗi: Không tìm thấy hàm khởi động quiz. Vui lòng tải lại trang.");
    }
}

