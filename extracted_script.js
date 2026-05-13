
                // VAN_CONTAINERS: ánh xạ key trong vanData → các div container trong sidebar
                // ➜ Để thêm section mới: thêm 1 dòng với key = key trong vanData_xx.js
                var VAN_CONTAINERS_MAP = {
                    jp: {
                        'n1voca': { struct: 'van-n1voca-struct', quiz: 'van-n1voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'n2voca': { struct: 'van-n2voca-struct', quiz: 'van-n2voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'n2gram': { struct: 'van-n2gram-struct', quiz: 'van-n2gram-quiz', type_struct: 'gram', type_quiz: 'gram_quiz' },
                        'bjtvoca': { struct: 'van-bjtvoca-struct', quiz: 'van-bjtvoca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' }
                    },
                    en: {
                        'toeic600': { struct: 'van-toeic600-struct', quiz: 'van-toeic600-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' }
                    },
                    cn: {
                        'hsk1voca': { struct: 'van-hsk1voca-struct', quiz: 'van-hsk1voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'hsk2voca': { struct: 'van-hsk2voca-struct', quiz: 'van-hsk2voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'hsk3voca': { struct: 'van-hsk3voca-struct', quiz: 'van-hsk3voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'hsk4voca': { struct: 'van-hsk4voca-struct', quiz: 'van-hsk4voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'hsk5voca': { struct: 'van-hsk5voca-struct', quiz: 'van-hsk5voca-quiz', type_struct: 'voca', type_quiz: 'voca_quiz' },
                        'hskgram': { struct: 'van-hskgram-struct', quiz: 'van-hskgram-quiz', type_struct: 'gram', type_quiz: 'gram_quiz' }
                    }
                };
                var _currentLangParam = new URLSearchParams(window.location.search).get('lang') || 'jp';
                var VAN_CONTAINERS = VAN_CONTAINERS_MAP[_currentLangParam] || VAN_CONTAINERS_MAP['jp'];

                let curVanMode = false;
                let curVanSection = null, curVanSub = null, curVanIdx = null;

                function renderVanSidebar() {
                    if (currentLang !== 'jp' && currentLang !== 'en' && currentLang !== 'cn') return; // Chỉ render khi lang=jp, en hoặc cn
                    const icons = ['🌸', '🍀', '🌻', '🌺', '🌿', '🍄', '🎀', '🧸', '🌷', '🍁', '🌱', '🌼'];
                    for (const [sectionKey, containers] of Object.entries(VAN_CONTAINERS)) {
                        // Tính tổng cả nhóm lvl1 (bao gồm cả struct và quiz)
                        let groupTotal = 0;
                        for (const sub of ['struct', 'quiz']) {
                            const lessons = vanData[sectionKey][sub] || [];
                            lessons.forEach(l => { if (l.list) groupTotal += l.list.length; });
                        }

                        // Gắn badge vào van-menu-lvl1
                        const lvl1Header = document.querySelector('.lvl1-' + sectionKey);
                        if (lvl1Header) {
                            let badge = lvl1Header.querySelector('.cat-badge');
                            if (!badge) {
                                badge = document.createElement('span');
                                badge.className = 'cat-badge';
                                lvl1Header.appendChild(badge);
                            }
                            badge.innerText = groupTotal > 0 ? groupTotal : '';
                            badge.style.display = groupTotal > 0 ? 'inline-block' : 'none';
                        }

                        for (const sub of ['struct', 'quiz']) {
                            const containerEl = document.getElementById(containers[sub]);
                            if (!containerEl) continue;
                            containerEl.innerHTML = '';
                            const lessons = vanData[sectionKey][sub] || [];
                            const vanType = containers[sub === 'struct' ? 'type_struct' : 'type_quiz'];

                            // Tính tổng tiểu mục (Từ đơn/Trắc nghiệm)
                            let subTotal = 0;
                            lessons.forEach(l => { if (l.list) subTotal += l.list.length; });

                            // Gắn badge vào menu-lvl2
                            const subHeader = containerEl.previousElementSibling;
                            if (subHeader && subHeader.classList.contains('menu-lvl2')) {
                                let sBadge = subHeader.querySelector('.cat-badge');
                                if (!sBadge) {
                                    sBadge = document.createElement('span');
                                    sBadge.className = 'cat-badge';
                                    subHeader.appendChild(sBadge);
                                }
                                sBadge.innerText = subTotal > 0 ? subTotal : '';
                                sBadge.style.display = subTotal > 0 ? 'inline-block' : 'none';
                            }

                            lessons.forEach((lesson, idx) => {
                                const progressKey = 'van_' + sectionKey + '_' + sub + '_' + lesson.name;
                                const progress = JSON.parse(localStorage.getItem(progressKey) || '{"done":[false,false,false]}');
                                let maxMode = 3;
                                if (vanType === 'gram') maxMode = 2;
                                else if (vanType === 'voca_quiz' || vanType === 'gram_quiz') maxMode = 1;
                                else if (currentLang === 'en' && vanType === 'voca') maxMode = 2;
                                const isAllDone = progress.done.slice(0, maxMode).every(v => v === true);
                                const wordCount = lesson.list.length;
                                const unitText = (vanType === 'voca_quiz' || vanType === 'gram_quiz') ? 'câu' : (vanType === 'gram' ? 'mẫu' : 'từ');
                                const rIcon = icons[idx % icons.length];
                                const div = document.createElement('div');
                                div.className = 'menu-lvl3';
                                const lockBadge = (!lesson.free && REQUIRE_LOCK.goc_cua_van)
                                    ? '<span title="Bài học có khoá" style="font-size:12px;background:rgba(239,68,68,0.2);color:#fca5a5;padding:2px 6px;border-radius:10px;border:1px solid rgba(239,68,68,0.3);">🔒</span>'
                                    : '';

                                div.innerHTML = `
                        <span onclick="selectVanDay('${sectionKey}','${sub}',${idx})" style="flex:1;display:flex;align-items:center;gap:8px;">
                            ${rIcon} <span class="lesson-name-text">${lesson.name}</span>
                        </span>
                        <span style="display:flex;align-items:center;gap:8px;margin-right:12px;">
                            ${isAllDone ? '<b class="done-check" style="font-size:18px;">✅</b>' : ''}
                            ${lockBadge}
                            <span style="font-size:13px;font-weight:800;color:#c4b5fd;border:1px solid #a855f7;padding:2px 8px;border-radius:12px;box-shadow:0 0 8px rgba(168,85,247,0.5);">${wordCount} ${unitText}</span>
                        </span>`;
                                containerEl.appendChild(div);
                            });
                            if (lessons.length === 0) {
                                const empty = document.createElement('div');
                                empty.style.cssText = 'padding:12px 20px;color:#475569;font-size:13px;font-style:italic;';
                                empty.innerText = 'Chưa có bài nào';
                                containerEl.appendChild(empty);
                            }
                        }
                    }
                }

                function selectVanDay(sectionKey, sub, lessonIdx, listOverride = null, targetMode = null) {
                    if (window.innerWidth <= 768) {
                        document.body.classList.add('sidebar-hidden');
                        localStorage.setItem('sidebar_hidden', '1');
                        const fab = document.getElementById('mobile-menu-fab');
                        if (fab) fab.style.display = 'flex';
                    }
                    const lesson = vanData[sectionKey]?.[sub]?.[lessonIdx];
                    const isFreeLesson = lesson && lesson.free === true;
                    if (REQUIRE_LOCK.goc_cua_van && !_appUnlocked && !listOverride && !isFreeLesson) {
                        _requireAccess(() => selectVanDay(sectionKey, sub, lessonIdx, listOverride, targetMode));
                        return;
                    }
                    if (!lesson) return;
                    curVanSection = sectionKey; curVanSub = sub; curVanIdx = lessonIdx;
                    var _ss = document.getElementById('stats-screen'); if (_ss) _ss.style.display = 'none';
                    curVanMode = true;
                    var _qc = document.getElementById('quiz-container'); if (_qc) _qc.style.display = listOverride ? '' : 'none'; var _sc2 = document.getElementById('submit-container'); if (_sc2) _sc2.style.display = listOverride ? 'flex' : 'none'; var _rt2 = document.getElementById('rt-wrapper'); if (_rt2 && _rt2.style.display === 'none') _rt2.style.display = '';
                    const containers = VAN_CONTAINERS[sectionKey];
                    curType = containers[sub === 'struct' ? 'type_struct' : 'type_quiz'];
                    curLevel = sectionKey; curDay = lesson.name;
                    currentList = listOverride || [...lesson.list];
                    document.getElementById('view-title').textContent = (listOverride ? "♻️ " : "👑 ") + lesson.name + ' (Vân)';
                    const startBtn = document.getElementById('btn-start-lesson');
                    if (startBtn) startBtn.style.display = 'none';
                    const actionWrapper = document.getElementById('action-buttons-wrapper');
                    if (actionWrapper) actionWrapper.style.display = 'none';
                    const progressKey = 'van_' + sectionKey + '_' + sub + '_' + lesson.name;
                    window._vanProgressKey = progressKey;
                    window._vanProgress = JSON.parse(localStorage.getItem(progressKey) || '{"done":[false,false,false]}');
                    document.getElementById('journey-card').style.display = 'none';
                    const mainTimerBox = document.getElementById('main-timer-box');
                    if (mainTimerBox) mainTimerBox.style.display = 'block';
                    document.getElementById('mode-box-container').style.display = listOverride ? 'none' : (currentList.length > 0 ? 'block' : 'none');
                    document.getElementById('submit-container').style.display = listOverride ? 'flex' : 'none';
                    document.getElementById('rt-wrapper').style.display = currentList.length > 0 ? 'flex' : 'none';
                    document.getElementById('btn-flashcard').style.display = (listOverride || sub === 'quiz') ? 'none' : (currentList.length > 0 ? 'flex' : 'none');

                    const group1 = document.getElementById('group-1');
                    if (group1) group1.style.display = 'none'; // Góc của Vân KHÔNG có nhóm 1
                    const group2a = document.getElementById('group-2a');
                    if (group2a) group2a.style.display = (listOverride) ? 'none' : 'block';
                    const group2b = document.getElementById('group-2b');
                    if (group2b) group2b.style.display = (listOverride) ? 'none' : 'block';

                    const g2aTitle = document.getElementById('group-2a-title');
                    if (g2aTitle) g2aTitle.innerHTML = '📚 HỌC TẬP & DANH SÁCH TỪ';
                    const g2bTitle = document.getElementById('group-2b-title');
                    if (g2bTitle) g2bTitle.innerHTML = '🎮 TRÒ CHƠI ÔN TẬP';
                    const g3Title = document.getElementById('group-3-title');
                    if (g3Title) g3Title.innerHTML = '📝 KIỂM TRA';

                    ["btn-show-list", "btn-shuffle", "btn-match-game", "btn-reaction-game"].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.style.display = (listOverride || sub === 'quiz') ? 'none' : 'inline-flex';
                    });
                    // Sidebar stays open (persistent layout)
                    let bestMode = 0;
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') bestMode = 2;
                    if (targetMode !== null) bestMode = targetMode;
                    changeMode(bestMode);
                    resetTimer();
                    updateVanFab();

                    // Breadcrumb & back button
                    const secLabel = {
                        'n1voca': 'N1 Từ Vựng', 'n2voca': 'N2 Từ Vựng', 'n2gram': 'N2 Ngữ Pháp', 'bjtvoca': 'BJT Từ Vựng',
                        'toeicvoca': 'Từ vựng TOEIC', 'toeic600': '600 Từ vựng TOEIC', 'toeicpart5': 'Ngữ pháp Part 5'
                    }[sectionKey] || sectionKey;
                    const subLabel = sub === 'struct' ? 'Học từ vựng' : 'Trắc nghiệm';
                    setBreadcrumb(`${secLabel} / ${subLabel} / ${lesson.name}`, true);
                    // Truyền containerId để chỉ highlight đúng nhánh, tránh match tên ngày trùng ở nhánh khác
                    const activeContainerId = VAN_CONTAINERS[sectionKey]?.[sub === 'struct' ? 'struct' : 'quiz'] ?? null;
                    setActiveMenuItem(lesson.name, activeContainerId);
                }

                function fT(text) {
                    if (!text) return '';
                    return String(text)
                        .replace(/\\n/g, '<br>')
                        .replace(/\n/g, '<br>')
                        .replace(/(?:🇻🇳)?\s*Dịch\s*:/gi, 'Dịch:')
                        .replace(/Dịch:/g, '<br><span style="color:#059669; font-weight:900;">&#x1F1FB;&#x1F1F3; Dịch:</span>')
                        .replace(/\[\[(.*?)\]\]/g, '<span style="color: #ef4444; font-weight: 900; text-decoration: underline; text-underline-offset: 4px;">$1</span>')
                        .replace(/\(\((.*?)\)\)/g, '<span style="color: #ef4444; font-weight: 900; text-decoration: underline; text-underline-offset: 4px;">$1</span>');
                }

                function toggleTopCard() {
                    const content = document.getElementById('top-card-content');
                    // sync both possible toggle buttons
                    const btns = [document.getElementById('top-card-toggle-btn'), document.getElementById('top-card-toggle-btn-default')];
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        btns.forEach(b => { if (b) b.innerHTML = '&#8722; Thu g&#7885;n'; });
                    } else {
                        content.style.display = 'none';
                        btns.forEach(b => { if (b) b.innerHTML = '&#43; M&#7903; r&#7897;ng'; });
                    }
                }

                /* ===== BREADCRUMB & BACK BUTTON HELPERS ===== */
                let _lastBackContext = null; // {sectionId, parentId}

                function setBreadcrumb(path, isVan) {
                    const bar = document.getElementById('breadcrumb-bar');
                    const txt = document.getElementById('breadcrumb-text');
                    const defBtn = document.getElementById('top-card-toggle-btn-default');
                    if (!bar || !txt) return;
                    bar.style.display = 'flex';
                    txt.innerHTML = (isVan ? '🌸 Góc của Vân&nbsp;&nbsp;❯&nbsp;&nbsp;' : '') + path.replace(/ \/ /g, '&nbsp;&nbsp;❯&nbsp;&nbsp;');
                    // hide the default toggle (now inside breadcrumb-bar)
                    if (defBtn) defBtn.style.display = 'none';
                }

                function setActiveMenuItem(dayName, containerId) {
                    // ── Bước 1: Xoá highlight cũ ──
                    document.querySelectorAll('.menu-lvl3.active-lesson').forEach(el => el.classList.remove('active-lesson'));

                    // ── Bước 2: Đóng tất cả sub-menu đang mở ──
                    document.querySelectorAll('.sub-menu').forEach(s => s.style.display = 'none');

                    // ── Bước 3: Tìm item đúng, highlight và mở ĐÚNG parent chain ──
                    // Nếu có containerId → chỉ tìm trong container đó (tránh match tên ngày trùng ở nhánh khác)
                    const scope = containerId ? document.getElementById(containerId) : document;
                    if (!scope) return;
                    scope.querySelectorAll('.menu-lvl3').forEach(el => {
                        const nameEl = el.querySelector('.lesson-name-text');
                        const label = nameEl ? nameEl.textContent.trim() : el.textContent.trim();
                        if (label === dayName) {
                            el.classList.add('active-lesson');
                            // Chỉ mở parent chain của item này thôi
                            let parent = el.parentElement;
                            while (parent && parent.id !== 'sidebar') {
                                if (parent.classList.contains('sub-menu')) {
                                    parent.style.display = 'block';
                                }
                                parent = parent.parentElement;
                            }
                        }
                    });
                }

                function scrollToActiveItem() {
                    const activeEl = document.querySelector('.menu-lvl3.active-lesson');
                    if (activeEl) {
                        // Small delay to let sidebar open animation finish
                        setTimeout(() => {
                            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 250);
                    }
                }

                function goBack() {
                    // If sidebar was hidden, show it first
                    if (document.body.classList.contains('sidebar-hidden')) {
                        document.body.classList.remove('sidebar-hidden');
                        localStorage.setItem('sidebar_hidden', '0');
                    }
                    scrollToActiveItem();
                }
                /* ============================================= */

                // ╔══════════════════════════════════════════╗
                // ║         🔐 MÃ TRUY CẬP ỨNG DỤNG         ║
                // ║   Thay đổi giá trị ACCESS_CODE bên dưới  ║
                // ╚══════════════════════════════════════════╝
                const ACCESS_CODE = '200124';   // <-- ĐỔI MÃ Ở ĐÂY

                // 🔓 CẤU HÌNH KHÓA (Chỉ áp dụng cho Góc của Vân)
                // Sửa thành true (cần mã) hoặc false (vào tự do không cần mã)
                const REQUIRE_LOCK = {
                    goc_cua_van: true  // Góc của Vân (Đang khoá)
                };

                let _appUnlocked = false;

                /* ============================================= */
                // --- LANGUAGE & PORTAL SETTINGS ---
                const urlParams = new URLSearchParams(window.location.search);
                let currentLang = urlParams.get('lang') || 'jp';
                let activeLevels = ["n1", "n2", "n3", "bjt"];
                let currentDbKey = 'mgao_v37_db';
                let langLabel = '🎌 JLPT & BJT';

                if (currentLang === 'en') {
                    activeLevels = ["toeic"];
                    currentDbKey = 'mgao_v37_db_en';
                    langLabel = '🇺🇸 TOEIC';
                } else if (currentLang === 'cn') {
                    activeLevels = ["hsk"];
                    currentDbKey = 'mgao_v37_db_cn';
                    langLabel = '🇨🇳 HSK';
                }

                function _updateLangButtons(lang) {
                    ['jp', 'en', 'cn'].forEach(l => {
                        const btn = document.getElementById('lang-btn-' + l);
                        if (btn) btn.style.background = (l === lang) ? 'rgba(255,255,255,0.25)' : 'transparent';
                    });
                    const sel = document.getElementById('lang-switcher');
                    if (sel) sel.value = lang;
                }

                function switchLanguage(lang) {
                    const url = new URL(window.location);
                    url.searchParams.set('lang', lang);
                    window.location.href = url.toString();
                }

                function applyLanguageLayout() {
                    // Cập nhật nút cờ ngôn ngữ
                    _updateLangButtons(currentLang);
                    // Bước 1: Ẩn tất cả các nhóm sidebar trước
                    const jpGroup = document.getElementById('jp-group');
                    const enGroup = document.getElementById('en-group');
                    const cnGroup = document.getElementById('cn-group');
                    const vanWrapper = document.getElementById('van-section-wrapper'); // Góc của Vân (JP)
                    const vanEnWrapper = document.getElementById('van-en-wrapper');       // Góc TOEIC
                    const vanCnWrapper = document.getElementById('van-cn-wrapper');       // Góc HSK

                    if (jpGroup) jpGroup.style.display = 'none';
                    if (enGroup) enGroup.style.display = 'none';
                    if (cnGroup) cnGroup.style.display = 'none';
                    if (vanWrapper) vanWrapper.style.display = 'none';
                    if (vanEnWrapper) vanEnWrapper.style.display = 'none';
                    if (vanCnWrapper) vanCnWrapper.style.display = 'none';

                    // Bước 2: Hiện đúng nhóm theo ngôn ngữ
                    if (currentLang === 'jp') {
                        if (jpGroup) jpGroup.style.display = 'block';
                        if (vanWrapper) vanWrapper.style.display = 'block';
                    } else if (currentLang === 'en') {
                        if (enGroup) enGroup.style.display = 'block';
                        if (vanEnWrapper) vanEnWrapper.style.display = 'block';
                    } else if (currentLang === 'cn') {
                        if (cnGroup) cnGroup.style.display = 'block';
                        if (vanCnWrapper) vanCnWrapper.style.display = 'block';
                    }
                }

                function updateGlobalStats() {
                    let totalVoca = 0, totalVocaQuiz = 0, totalGram = 0, totalGramQuiz = 0;
                    activeLevels.forEach(lv => {
                        Object.keys(db[lv].voca).forEach(day => totalVoca += db[lv].voca[day].list.filter(it => (it.count || 0) >= 1).length);
                        Object.keys(db[lv].voca_quiz).forEach(day => totalVocaQuiz += db[lv].voca_quiz[day].list.filter(it => (it.count || 0) >= 1).length);
                        Object.keys(db[lv].gram).forEach(day => totalGram += db[lv].gram[day].list.filter(it => (it.count || 0) >= 1).length);
                        Object.keys(db[lv].gram_quiz).forEach(day => totalGramQuiz += db[lv].gram_quiz[day].list.filter(it => (it.count || 0) >= 1).length);
                    });
                    const e1 = document.getElementById('stat-voca-total'), e2 = document.getElementById('stat-voca-quiz-total'), e3 = document.getElementById('stat-gram-total'), e4 = document.getElementById('stat-gram-quiz-total');
                    if (e1) e1.innerText = totalVoca; if (e2) e2.innerText = totalVocaQuiz; if (e3) e3.innerText = totalGram; if (e4) e4.innerText = totalGramQuiz;
                }

                let db = JSON.parse(localStorage.getItem(currentDbKey));
                let userName = localStorage.getItem('mgao_user_v37') || "";
                let curLevel, curType, curDay, seconds = 0, timerInterval = null, currentMode = 0; let currentList = []; Object.defineProperty(window, "appCurrentList", { get: function () { return currentList; } });
                let totalSeconds = 0, totalTimerInterval = null;
                let lessonTimes = []; // stores time (seconds) for each completed lesson
                let sessionScores = []; // stores {ok, total, mode} for each lesson
                var showAnswerImmediately = false;
                let pendingDeletes = new Set();

                let currentFlashcardIndex = 0;
                let isFlashcardFlipped = false;
                let fcList = [];
                let fcStarred = new Set();

                /* --- MATCH GAME LOGIC --- */
                let mgData = [];
                let mgChunks = [];
                let mgCurrentChunkIdx = 0;
                let mgLeftItems = [];
                let mgRightItems = [];
                let mgSelectedLeft = null;
                let mgSelectedRight = null;
                let mgScore = 0;
                let mgTimer = 0;
                let mgInterval = null;
                let mgMatchedPairsInChunk = 0;

                function openMatchGame() {
                    mgData = currentList.filter(item => item.c1 && item.c3 && item.c1.trim() !== '' && item.c3.trim() !== '').map((item, index) => ({
                        id: index,
                        c1: item.c1,
                        c3: item.c3
                    }));

                    if (mgData.length === 0) {
                        alert("Bài học này không có đủ dữ liệu từ vựng/ngữ pháp để chơi game nối từ!");
                        return;
                    }

                    mgData.sort(() => Math.random() - 0.5);

                    mgChunks = [];
                    for (let i = 0; i < mgData.length; i += 6) {
                        mgChunks.push(mgData.slice(i, i + 6));
                    }

                    document.getElementById('match-game-modal').style.display = 'flex';
                    startMatchGame();
                }

                function closeMatchGame() {
                    document.getElementById('match-game-modal').style.display = 'none';
                    clearInterval(mgInterval);
                }

                function startMatchGame() {
                    mgCurrentChunkIdx = 0;
                    mgScore = 0;
                    mgTimer = 0;
                    document.getElementById('mg-score').innerText = '0';
                    document.getElementById('mg-timer').innerText = '00:00';
                    document.getElementById('mg-end-screen').style.display = 'none';
                    document.getElementById('mg-board').style.display = 'flex';

                    clearInterval(mgInterval);
                    mgInterval = setInterval(() => {
                        mgTimer++;
                        const mins = Math.floor(mgTimer / 60).toString().padStart(2, '0');
                        const secs = (mgTimer % 60).toString().padStart(2, '0');
                        document.getElementById('mg-timer').innerText = `${mins}:${secs}`;
                    }, 1000);

                    loadMgChunk();
                }

                function loadMgChunk() {
                    if (mgCurrentChunkIdx >= mgChunks.length) {
                        endMatchGame();
                        return;
                    }

                    const currentChunk = mgChunks[mgCurrentChunkIdx];
                    mgMatchedPairsInChunk = 0;
                    mgSelectedLeft = null;
                    mgSelectedRight = null;

                    document.getElementById('mg-progress').innerText = `${mgCurrentChunkIdx + 1}/${mgChunks.length}`;

                    mgLeftItems = currentChunk.map(item => ({ id: item.id, text: item.c1 }));
                    mgRightItems = currentChunk.map(item => ({ id: item.id, text: item.c3 }));

                    mgLeftItems.sort(() => Math.random() - 0.5);
                    mgRightItems.sort(() => Math.random() - 0.5);

                    renderMgBoard();
                }

                function renderMgBoard() {
                    const leftCol = document.getElementById('mg-left-col');
                    const rightCol = document.getElementById('mg-right-col');
                    leftCol.innerHTML = '';
                    rightCol.innerHTML = '';

                    mgLeftItems.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'mg-item';
                        div.id = `mg-left-${item.id}`;
                        div.innerText = item.text;
                        div.onclick = () => selectMgItem('left', item.id, div);
                        leftCol.appendChild(div);
                    });

                    mgRightItems.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'mg-item';
                        div.id = `mg-right-${item.id}`;
                        div.innerText = item.text;
                        div.onclick = () => selectMgItem('right', item.id, div);
                        rightCol.appendChild(div);
                    });
                }

                function selectMgItem(side, id, el) {
                    if (side === 'left') {
                        if (mgSelectedLeft === id) {
                            mgSelectedLeft = null;
                            el.classList.remove('selected');
                            return;
                        }
                        if (mgSelectedLeft !== null) {
                            const oldEl = document.getElementById(`mg-left-${mgSelectedLeft}`);
                            if (oldEl) oldEl.classList.remove('selected');
                        }
                        mgSelectedLeft = id;
                        el.classList.add('selected');
                    } else {
                        if (mgSelectedRight === id) {
                            mgSelectedRight = null;
                            el.classList.remove('selected');
                            return;
                        }
                        if (mgSelectedRight !== null) {
                            const oldEl = document.getElementById(`mg-right-${mgSelectedRight}`);
                            if (oldEl) oldEl.classList.remove('selected');
                        }
                        mgSelectedRight = id;
                        el.classList.add('selected');
                    }

                    checkMgMatch();
                }

                function checkMgMatch() {
                    if (mgSelectedLeft !== null && mgSelectedRight !== null) {
                        const leftEl = document.getElementById(`mg-left-${mgSelectedLeft}`);
                        const rightEl = document.getElementById(`mg-right-${mgSelectedRight}`);

                        if (mgSelectedLeft === mgSelectedRight) {
                            // Đúng
                            leftEl.classList.remove('selected');
                            rightEl.classList.remove('selected');
                            leftEl.classList.add('matched');
                            rightEl.classList.add('matched');

                            if (typeof confetti === 'function') {
                                const rL = leftEl.getBoundingClientRect();
                                const rR = rightEl.getBoundingClientRect();
                                confetti({ zIndex: 9999, particleCount: 40, spread: 50, origin: { x: (rL.left + rL.width / 2) / window.innerWidth, y: (rL.top + rL.height / 2) / window.innerHeight } });
                                confetti({ zIndex: 9999, particleCount: 40, spread: 50, origin: { x: (rR.left + rR.width / 2) / window.innerWidth, y: (rR.top + rR.height / 2) / window.innerHeight } });
                            }

                            try {
                                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                                const osc = audioCtx.createOscillator();
                                const gain = audioCtx.createGain();
                                osc.type = 'sine';
                                osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                                osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
                                gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                                osc.connect(gain);
                                gain.connect(audioCtx.destination);
                                osc.start();
                                osc.stop(audioCtx.currentTime + 0.2);
                            } catch (e) { }

                            mgScore += 10;
                            document.getElementById('mg-score').innerText = mgScore;
                            mgMatchedPairsInChunk++;

                            mgSelectedLeft = null;
                            mgSelectedRight = null;

                            if (mgMatchedPairsInChunk === mgChunks[mgCurrentChunkIdx].length) {
                                setTimeout(() => {
                                    mgCurrentChunkIdx++;
                                    loadMgChunk();
                                }, 800);
                            }
                        } else {
                            // Sai
                            leftEl.classList.remove('selected');
                            rightEl.classList.remove('selected');
                            leftEl.classList.add('error');
                            rightEl.classList.add('error');

                            mgScore = Math.max(0, mgScore - 2);
                            document.getElementById('mg-score').innerText = mgScore;

                            setTimeout(() => {
                                leftEl.classList.remove('error');
                                rightEl.classList.remove('error');
                            }, 400);

                            mgSelectedLeft = null;
                            mgSelectedRight = null;
                        }
                    }
                }

                function endMatchGame() {
                    clearInterval(mgInterval);
                    document.getElementById('mg-board').style.display = 'none';
                    document.getElementById('mg-end-screen').style.display = 'flex';
                    document.getElementById('mg-final-score').innerText = mgScore;

                    const mins = Math.floor(mgTimer / 60).toString().padStart(2, '0');
                    const secs = (mgTimer % 60).toString().padStart(2, '0');
                    document.getElementById('mg-final-time').innerText = `${mins}:${secs}`;

                    if (typeof confetti === 'function') {
                        confetti({
                            zIndex: 9999,
                            particleCount: 150,
                            spread: 80,
                            origin: { y: 0.6 }
                        });
                    }
                }

                function openFlashcard() {
                    if (currentList.length === 0) return;
                    fcList = [...currentList];
                    fcStarred.clear();
                    currentFlashcardIndex = 0;

                    document.getElementById('fc-main-view').style.display = 'block';
                    document.getElementById('fc-end-screen').style.display = 'none';

                    updateFlashcardUI();
                    openModal('flashcard-modal');
                }

                function updateFlashcardUI() {
                    const item = fcList[currentFlashcardIndex];
                    if (!item) return;

                    const inner = document.getElementById('flashcard-inner');
                    isFlashcardFlipped = false;
                    inner.style.transform = 'rotateY(0deg)';

                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = 'struct';

                    const frontText = document.getElementById('fc-front-text');
                    const backReading = document.getElementById('fc-back-reading');
                    const backMeaning = document.getElementById('fc-back-meaning');
                    const backExample = document.getElementById('fc-back-example');

                    if (gramType === 'quiz') {
                        frontText.innerHTML = fT(item.q || item.c1 || '');
                        backReading.innerHTML = '';
                        backMeaning.innerHTML = fT(item.ans || item.c5 || '');
                        backExample.innerHTML = fT(item.explain || item.c6 || '');
                    } else if (gramType === 'struct') {
                        frontText.innerHTML = fT(item.c1 || '');
                        backReading.innerHTML = '';
                        backMeaning.innerHTML = fT(item.c3 || '');
                        backExample.innerHTML = fT(item.c4 || '');
                    } else {
                        frontText.innerHTML = fT(item.c1 || '');
                        backReading.innerHTML = fT(item.c2 || '');
                        backMeaning.innerHTML = fT(item.c3 || '');
                        backExample.innerHTML = fT(item.c4 || '');
                    }

                    const starBtn = document.getElementById('fc-star-btn');
                    if (fcStarred.has(item)) {
                        starBtn.innerHTML = '⭐';
                        starBtn.style.color = '#fbbf24';
                    } else {
                        starBtn.innerHTML = '☆';
                        starBtn.style.color = '#64748b';
                    }

                    document.getElementById('flashcard-progress').innerText = `${currentFlashcardIndex + 1} / ${fcList.length}`;
                }
                function toggleListStar(index, btnId, e) {
                    if (e) e.stopPropagation();
                    const item = currentList[index];
                    if (!item) return;
                    const key = _itemKey(item);

                    let isStarred = fcStarredKeys.has(key);
                    if (isStarred) {
                        fcStarredKeys.delete(key);
                        let toRemove = null;
                        fcStarred.forEach(it => { if (_itemKey(it) === key) toRemove = it; });
                        if (toRemove) fcStarred.delete(toRemove);
                    } else {
                        fcStarredKeys.add(key);
                        fcStarred.add(item);
                    }
                    saveFcStarred();

                    const btn = document.getElementById(btnId);
                    if (btn) {
                        const nowStarred = fcStarredKeys.has(key);
                        btn.innerHTML = nowStarred ? '⭐' : '☆';
                        btn.style.color = nowStarred ? '#fbbf24' : '#64748b';
                        btn.style.textShadow = nowStarred ? '0 0 10px rgba(251,191,36,0.5)' : 'none';
                    }
                    const countEl = document.getElementById('fc-star-count');
                    if (countEl) countEl.innerText = fcStarredKeys.size;
                }

                function toggleFcStar(e) {
                    e.stopPropagation();
                    const item = fcList[currentFlashcardIndex];
                    if (!item) return;
                    const key = _itemKey(item);
                    if (fcStarred.has(item)) {
                        fcStarred.delete(item);
                        fcStarredKeys.delete(key);
                    } else {
                        fcStarred.add(item);
                        fcStarredKeys.add(key);
                    }
                    saveFcStarred();
                    updateFlashcardUI();
                }

                function flipFlashcard() {
                    isFlashcardFlipped = !isFlashcardFlipped;
                    const inner = document.getElementById('flashcard-inner');
                    inner.style.transform = isFlashcardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
                }

                function prevFlashcard() {
                    if (currentFlashcardIndex > 0) {
                        currentFlashcardIndex--;
                        updateFlashcardUI();
                    }
                }

                function nextFlashcard() {
                    if (currentFlashcardIndex < fcList.length - 1) {
                        currentFlashcardIndex++;
                        updateFlashcardUI();
                    } else {
                        document.getElementById('fc-main-view').style.display = 'none';
                        document.getElementById('fc-star-count').innerText = fcStarred.size;

                        const btnRestartStar = document.getElementById('btn-fc-restart-star');
                        if (fcStarred.size === 0) {
                            btnRestartStar.disabled = true;
                            btnRestartStar.style.opacity = '0.5';
                            btnRestartStar.style.cursor = 'not-allowed';
                        } else {
                            btnRestartStar.disabled = false;
                            btnRestartStar.style.opacity = '1';
                            btnRestartStar.style.cursor = 'pointer';
                        }

                        document.getElementById('fc-end-screen').style.display = 'flex';
                    }
                }

                function restartFcAll() {
                    fcList = [...currentList];
                    currentFlashcardIndex = 0;
                    document.getElementById('fc-end-screen').style.display = 'none';
                    document.getElementById('fc-main-view').style.display = 'block';
                    updateFlashcardUI();
                }

                function restartFcStarred() {
                    if (fcStarred.size === 0) return;
                    fcList = Array.from(fcStarred);
                    currentFlashcardIndex = 0;
                    document.getElementById('fc-end-screen').style.display = 'none';
                    document.getElementById('fc-main-view').style.display = 'block';
                    updateFlashcardUI();
                }

                window.onload = () => {
                    // Restore sidebar state (default: visible)
                    if (localStorage.getItem('sidebar_hidden') === '1') {
                        document.body.classList.add('sidebar-hidden');
                    }

                    const langSelect = document.getElementById('lang-switcher');
                    if (langSelect) langSelect.value = currentLang;

                    const urlParams = new URLSearchParams(window.location.search);
                    const syncData = urlParams.get('sync');
                    if (syncData) {
                        try {
                            const decoded = decodeURIComponent(escape(atob(syncData)));
                            const parsed = JSON.parse(decoded);
                            if (parsed && Object.keys(parsed).some(k => activeLevels.includes(k))) {
                                if (confirm("☁️ Phát hiện Link Đồng Bộ!\nBạn có muốn ghi đè dữ liệu hiện tại bằng dữ liệu từ Link này không?")) {
                                    activeLevels.forEach(lv => {
                                        if (!parsed[lv]) {
                                            parsed[lv] = { voca: {}, voca_quiz: {}, gram: {}, gram_quiz: {} };
                                            ["voca", "voca_quiz", "gram", "gram_quiz"].forEach(ty => { for (let i = 1; i <= 10; i++) parsed[lv][ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; });
                                        } else {
                                            if (!parsed[lv].voca_quiz) { parsed[lv].voca_quiz = {}; for (let i = 1; i <= 10; i++) parsed[lv].voca_quiz[`Ngày ${i}`] = { list: [], done: [false, false, false] }; }
                                            if (!parsed[lv].gram_quiz) { parsed[lv].gram_quiz = {}; for (let i = 1; i <= 10; i++) parsed[lv].gram_quiz[`Ngày ${i}`] = { list: [], done: [false, false, false] }; }
                                        }
                                    });
                                    localStorage.setItem(currentDbKey, JSON.stringify(parsed));
                                    alert("✅ Phục hồi dữ liệu từ Link thành công!");
                                    db = parsed; // Update immediate reference
                                }
                            }
                        } catch (e) { alert("❌ Link đồng bộ bị lỗi hoặc sai định dạng!"); }
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }

                    let savedDb = localStorage.getItem(currentDbKey);
                    if (!savedDb) {
                        db = {};
                        activeLevels.forEach(lv => {
                            db[lv] = { "voca": {}, "voca_quiz": {}, "gram": {}, "gram_quiz": {} };
                            ["voca", "voca_quiz", "gram", "gram_quiz"].forEach(ty => { for (let i = 1; i <= 10; i++) db[lv][ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; });
                        });
                        saveToLocal();
                    } else {
                        db = JSON.parse(savedDb);
                        let updated = false;
                        activeLevels.forEach(lv => {
                            if (!db[lv]) {
                                db[lv] = { "voca": {}, "voca_quiz": {}, "gram": {}, "gram_quiz": {} };
                                ["voca", "voca_quiz", "gram", "gram_quiz"].forEach(ty => { for (let i = 1; i <= 10; i++) db[lv][ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; });
                                updated = true;
                            } else {
                                if (!db[lv].voca_quiz) { db[lv].voca_quiz = {}; for (let i = 1; i <= 10; i++) db[lv].voca_quiz[`Ngày ${i}`] = { list: [], done: [false, false, false] }; updated = true; }
                                if (!db[lv].gram_quiz) { db[lv].gram_quiz = {}; for (let i = 1; i <= 10; i++) db[lv].gram_quiz[`Ngày ${i}`] = { list: [], done: [false, false, false] }; updated = true; }
                            }
                        });
                        if (updated) saveToLocal();
                    }

                    if (!userName) document.getElementById('welcome-screen').style.display = 'flex'; else applyUser();
                    renderSidebar(); renderVanSidebar(); updateGlobalStats();

                    const savedStart = localStorage.getItem('mgao_journey_start');
                    const savedEnd = localStorage.getItem('mgao_journey_end');
                    const journeyStartInput = document.getElementById('journey-start');
                    const journeyEndInput = document.getElementById('journey-end');
                    if (journeyStartInput && savedStart !== null) journeyStartInput.value = savedStart;
                    if (journeyEndInput && savedEnd !== null) journeyEndInput.value = savedEnd;
                    updateJourney();
                };

                function updateJourney() {
                    const startInput = document.getElementById('journey-start');
                    const endInput = document.getElementById('journey-end');
                    const sidebarText = document.getElementById('sidebar-journey-text');

                    const startVal = startInput ? startInput.value : '';
                    const endVal = endInput ? endInput.value : '';

                    if (startInput) localStorage.setItem('mgao_journey_start', startVal);
                    if (endInput) localStorage.setItem('mgao_journey_end', endVal);

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    let daysPassed = 0;
                    if (startVal) {
                        const startDate = new Date(startVal);
                        startDate.setHours(0, 0, 0, 0);
                        daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                        if (daysPassed < 0) daysPassed = 0;
                        sidebarText.innerHTML = `Bạn đã học được <b style="color:#fff; background:#ec4899; padding:2px 6px; border-radius:6px;">${daysPassed}</b> ngày rồi 🔥`;
                    } else {
                        sidebarText.innerText = "Bạn chưa thiết lập ngày bắt đầu!";
                    }

                    document.getElementById('journey-days-passed-big').innerText = daysPassed;

                    if (startVal && endVal) {
                        const startDate = new Date(startVal);
                        startDate.setHours(0, 0, 0, 0);
                        const endDate = new Date(endVal);
                        endDate.setHours(0, 0, 0, 0);

                        let totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
                        if (totalDays <= 0) totalDays = 1;

                        let daysLeft = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
                        if (daysLeft < 0) daysLeft = 0;
                        if (daysPassed > totalDays) daysPassed = totalDays;

                        let percent = (daysPassed / totalDays) * 100;
                        if (percent > 100) percent = 100;

                        document.getElementById('journey-days-total-text').innerText = `/ ${totalDays}`;
                        document.getElementById('journey-total-days-label').innerText = `🏆 ${totalDays} ngày`;
                        document.getElementById('journey-percent').innerText = `${Math.round(percent)}%`;
                        document.getElementById('journey-progress-bar').style.width = `${percent}%`;

                        if (percent === 100) {
                            document.getElementById('journey-message').innerText = "🎉 Chúc mừng! Bạn đã hoàn thành mục tiêu!";
                            document.getElementById('journey-message').style.color = 'var(--success)';
                        } else {
                            document.getElementById('journey-message').innerText = `🌿 Còn ${daysLeft} ngày nữa. Cố lên nhé! 💪`;
                            document.getElementById('journey-message').style.color = '#cbd5e1';
                        }
                    } else {
                        document.getElementById('journey-days-total-text').innerText = `/ ∞`;
                        document.getElementById('journey-total-days-label').innerText = `🏆 ∞ ngày`;
                        document.getElementById('journey-percent').innerText = startVal ? `100%` : `0%`;
                        document.getElementById('journey-progress-bar').style.width = startVal ? `100%` : `0%`;
                        document.getElementById('journey-message').innerText = startVal ? "🚀 Hành trình ngàn dặm bắt đầu từ một bước chân." : "Vui lòng chọn Ngày bắt đầu và kết thúc!";
                        document.getElementById('journey-message').style.color = '#cbd5e1';
                    }
                }

                function saveToLocal() {
                    localStorage.setItem(currentDbKey, JSON.stringify(db));
                    localStorage.setItem(currentDbKey + '_updatedAt', new Date().toISOString());
                }

                function applyUser() {
                    document.getElementById('header-user-name').innerText = `${userName} cố lên nhé! 🌸`;
                    const userLabel = document.getElementById('user-section-label');
                    if (userLabel) userLabel.innerHTML = `&#x1F338; GÓC CỦA ${userName.toUpperCase()}`;
                    if (document.getElementById('view-title').innerText.includes("Mục tiêu")) {
                        document.getElementById('view-title').innerText = `Mục tiêu hôm nay! 🎯`;
                    }
                    document.getElementById('motivational-quote').innerHTML = `Chào <b style="color:var(--warning)">${userName}</b> cùng vượt qua lười biếng và chăm chỉ mỗi ngày nhé.<br><span style="color:#f472b6; font-style:italic;">"Lười biếng hôm nay, hối hận ngày mai".</span>`;
                }

                function saveUser() { const val = document.getElementById('user-name-input').value.trim(); if (val) { userName = val; localStorage.setItem('mgao_user_v37', val); document.getElementById('welcome-screen').style.display = 'none'; applyUser(); } }
                function resetUserData() { if (confirm("Xóa toàn bộ dữ liệu?")) { localStorage.clear(); location.reload(); } }

                function toggleMenu() {
                    document.body.classList.toggle('sidebar-hidden');
                    // save preference
                    localStorage.setItem('sidebar_hidden', document.body.classList.contains('sidebar-hidden') ? '1' : '0');
                    updateGlobalStats();
                    // Show/hide FAB on mobile
                    const fab = document.getElementById('mobile-menu-fab');
                    if (fab) fab.style.display = document.body.classList.contains('sidebar-hidden') ? 'flex' : 'none';
                }

                // ── Touch swipe to open/close sidebar on mobile ──
                (function () {
                    let touchStartX = 0, touchStartY = 0;
                    const SWIPE_THRESHOLD = 50;
                    document.addEventListener('touchstart', e => {
                        touchStartX = e.touches[0].clientX;
                        touchStartY = e.touches[0].clientY;
                    }, { passive: true });
                    document.addEventListener('touchend', e => {
                        const dx = e.changedTouches[0].clientX - touchStartX;
                        const dy = e.changedTouches[0].clientY - touchStartY;
                        if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx) * 1.5) return; // ignore small / vertical swipes
                        const isSidebarHidden = document.body.classList.contains('sidebar-hidden');
                        // Swipe right from left edge → open sidebar
                        if (dx > 0 && touchStartX < 40 && isSidebarHidden) { toggleMenu(); return; }
                        // Swipe left anywhere on sidebar → close
                        if (dx < 0 && !isSidebarHidden) { toggleMenu(); return; }
                    }, { passive: true });
                })();
                function toggleSub(id) {
                    const el = document.getElementById(id);
                    if (!el) return;
                    const isOpen = (el.style.display === 'block');

                    // ── Accordion: đóng tất cả sub-menu anh em cùng cấp ──
                    if (el.parentElement) {
                        // Tìm tất cả sub-menu cùng cha (anh em)
                        const siblings = el.parentElement.querySelectorAll(':scope > .sub-menu');
                        siblings.forEach(s => {
                            if (s !== el) {
                                s.style.display = 'none';
                                // Đóng luôn các sub-menu con bên trong
                                s.querySelectorAll('.sub-menu').forEach(c => c.style.display = 'none');
                            }
                        });
                    }

                    // Toggle menu được chọn
                    el.style.display = isOpen ? 'none' : 'block';
                }
                let curSep = 'auto';
                function updateImportUI() {
                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = document.querySelector('input[name="gramType"]:checked')?.value || 'struct';
                    const isQuiz = (gramType === 'quiz');
                    document.getElementById('import-col-struct').style.display = isQuiz ? 'none' : 'flex';
                    document.getElementById('import-col-quiz').style.display = isQuiz ? 'block' : 'none';
                    const txtArea = document.getElementById('import-input');

                    const col2w = document.getElementById('col2-wrap'); if (col2w) col2w.style.display = isGram ? 'none' : 'inline-block';
                    const col4w = document.getElementById('col4-wrap'); if (col4w) col4w.style.display = isGram ? 'none' : 'inline-block';
                    const col5w = document.getElementById('col5-wrap'); if (col5w) col5w.style.display = isGram ? 'none' : 'inline-block';
                    const col6w = document.getElementById('col6-wrap'); if (col6w) col6w.style.display = isGram ? 'none' : 'inline-block';

                    if (isGram) {
                        document.getElementById('col1').value = 'c1';
                        document.getElementById('col3').value = 'c3';
                        txtArea.placeholder = "• Định dạng Cấu trúc (Tối đa 2 cột):\n• Cấu trúc | Ý nghĩa tiếng việt\n• VD: ~に違いない | Chắc chắn là...";
                    } else if (isQuiz) {
                        document.getElementById('col1').value = 'c1';
                        txtArea.placeholder = "• Dán dữ liệu trắc nghiệm:\n• Câu hỏi | ĐA Đúng | Sai 1 | Sai 2 | Sai 3 | Vị trí đúng (1, 2, 3, 4) | Giải thích\n• Ví dụ: Câu hỏi? | Đúng | Sai 1 | Sai 2 | Sai 3 | 1 | Giải thích";
                    } else {
                        document.getElementById('col1').value = 'c1';
                        document.getElementById('col2').value = 'c2';
                        document.getElementById('col3').value = 'c3';
                        txtArea.placeholder = "• Dán từ Excel, Google Sheets...\n• Mỗi từ 1 dòng (Tối đa 6 cột)\n• Ví dụ:  食べる / たべる / ăn / (Ăn cơm) / taberu / ...";
                    }
                    updateImportPreview();
                }

                function updateAddUI() {
                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = 'struct';
                    document.getElementById('add-gram-type-selector').style.display = isGram ? 'block' : 'none';
                    if (gramType === 'quiz') {
                        document.getElementById('add-inputs-voca-struct').style.display = 'none';
                        document.getElementById('add-inputs-quiz').style.display = 'block';
                    } else {
                        document.getElementById('add-inputs-voca-struct').style.display = 'block';
                        document.getElementById('add-inputs-quiz').style.display = 'none';
                        document.getElementById('add-c1').placeholder = isGram ? "Cấu trúc..." : "Kanji / Từ vựng...";
                        if (document.getElementById('add-c2')) {
                            document.getElementById('add-c2').style.display = isGram ? 'none' : 'inline-block';
                            document.getElementById('add-c2').placeholder = isGram ? "Cách đọc..." : "Cách đọc (Hiragana)...";
                        }
                        document.getElementById('add-c3').placeholder = isGram ? "Ý nghĩa tiếng việt..." : "Ý nghĩa...";
                        if (document.getElementById('add-c4')) {
                            document.getElementById('add-c4').style.display = isGram ? 'none' : 'inline-block';
                            document.getElementById('add-c4').placeholder = isGram ? "Ví dụ..." : "Giải thích ngắn gọn (Không bắt buộc)...";
                        }
                        if (document.getElementById('add-c5')) document.getElementById('add-c5').style.display = isGram ? 'none' : 'inline-block';
                        if (document.getElementById('add-c6')) document.getElementById('add-c6').style.display = isGram ? 'none' : 'inline-block';
                    }
                }

                function openModal(id) {
                    if (id === 'list-modal') {
                        renderListTable();
                        const btnFilter = document.getElementById('btn-filter-dups');
                        if (btnFilter) btnFilter.style.display = curVanMode ? 'none' : 'block';
                    }
                    if (id === 'add-word-modal') {
                        updateAddUI();
                        renderQuickAddList();
                    }
                    document.getElementById(id).style.display = 'flex';
                }
                function closeModal(id) { document.getElementById(id).style.display = 'none'; }

                function openImportModal() {
                    isEditMode = false;
                    document.getElementById('import-modal-title').innerHTML = '📥 NHẬP DỮ LIỆU HÀNG LOẠT';
                    document.getElementById('import-section-input').style.display = 'block';
                    document.getElementById('import-section-preview').style.display = 'block';
                    document.getElementById('btn-nhap-du-lieu').style.display = 'inline-flex';

                    const btnCS = document.getElementById('btn-chinh-sua');
                    if (btnCS) { btnCS.style.display = 'inline-flex'; btnCS.style.background = 'transparent'; btnCS.style.color = '#3b82f6'; btnCS.innerHTML = '✏️ Chỉnh sửa'; }
                    const btnCN = document.getElementById('btn-cap-nhat');
                    if (btnCN) btnCN.style.display = 'none';
                    document.getElementById('gram-type-selector').style.display = 'none';
                    updateImportUI();
                    renderCurWordList();
                    document.getElementById('import-modal').style.display = 'flex';
                }

                function openEditModal() {
                    isEditMode = true;
                    document.getElementById('import-modal-title').innerHTML = '✏️ CHỈNH SỬA DANH SÁCH TỪ';
                    document.getElementById('import-section-input').style.display = 'none';
                    document.getElementById('import-section-preview').style.display = 'none';
                    document.getElementById('btn-nhap-du-lieu').style.display = 'none';

                    const btnCS = document.getElementById('btn-chinh-sua');
                    if (btnCS) { btnCS.style.display = 'none'; }
                    const btnCN = document.getElementById('btn-cap-nhat');
                    if (btnCN) btnCN.style.display = 'inline-flex';

                    renderCurWordList();
                    document.getElementById('import-modal').style.display = 'flex';
                }

                function setSep(s) {
                    curSep = s;
                    document.querySelectorAll('.sep-pill').forEach(p => p.classList.remove('active'));
                    document.querySelector(`.sep-pill[data-sep="${s}"]`).classList.add('active');
                    updateImportPreview();
                }

                function detectSep(text) {
                    const lines = text.trim().split('\n').filter(l => l.trim()).slice(0, 8);
                    if (!lines.length) return '\t';
                    const candidates = ['\t', '/', ',', ';', '|'];
                    let best = '\t', bestScore = -1;
                    for (const s of candidates) {
                        const counts = lines.map(l => l.split(s).length - 1);
                        const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
                        const variance = counts.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / counts.length;
                        if (avg >= 1 && variance <= 0.6) { const sc = avg * 2 - variance; if (sc > bestScore) { bestScore = sc; best = s; } }
                    }
                    if (bestScore < 0 && lines.some(l => /\s{2,}/.test(l))) return 'spaces';
                    return best;
                }

                function getActiveSep(text) {
                    if (curSep === 'auto') return detectSep(text);
                    if (curSep === 'tab') return '\t';
                    if (curSep === ' ') return 'spaces';
                    return curSep;
                }

                function parseData() {
                    const raw = document.getElementById('import-input').value;
                    const skip = document.getElementById('skip-header').checked;
                    const sep = getActiveSep(raw);
                    let lines = raw.split('\n').filter(l => l.trim());
                    if (skip && lines.length > 0) lines = lines.slice(1);
                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = document.querySelector('input[name="gramType"]:checked')?.value || 'struct';
                    if (gramType === 'quiz') {
                        return lines.map(line => {
                            const parts = sep === 'spaces' ? line.trim().split(/\s{2,}/).map(p => p.trim()).filter(Boolean) : line.split(sep).map(p => p.trim());
                            const valid = parts.length >= 6;
                            let q = parts[0] || '';
                            let opt1 = parts[1] || '', opt2 = parts[2] || '', opt3 = parts[3] || '', opt4 = parts[4] || '';
                            let correctCol = (parts[5] || '').trim().toUpperCase();

                            let ans = opt1, w1 = opt2, w2 = opt3, w3 = opt4;

                            if (correctCol === 'A' || correctCol === '1' || correctCol === opt1.toUpperCase()) {
                                ans = opt1; w1 = opt2; w2 = opt3; w3 = opt4;
                            } else if (correctCol === 'B' || correctCol === '2' || correctCol === opt2.toUpperCase()) {
                                ans = opt2; w1 = opt1; w2 = opt3; w3 = opt4;
                            } else if (correctCol === 'C' || correctCol === '3' || correctCol === opt3.toUpperCase()) {
                                ans = opt3; w1 = opt1; w2 = opt2; w3 = opt4;
                            } else if (correctCol === 'D' || correctCol === '4' || correctCol === opt4.toUpperCase()) {
                                ans = opt4; w1 = opt1; w2 = opt2; w3 = opt3;
                            } else {
                                ans = opt1; w1 = opt2; w2 = opt3; w3 = opt4;
                            }

                            let explain = parts[6] || '';
                            const entry = { gramType: 'quiz', q, ans, w1, w2, w3, count: 0, explain };
                            return { entry, valid, parts };
                        });
                    }
                    const c1 = document.getElementById('col1').value;
                    const c2 = document.getElementById('col2').value;
                    const c3 = document.getElementById('col3').value;
                    const c4 = document.getElementById('col4') ? document.getElementById('col4').value : 'c4';
                    const c5 = document.getElementById('col5') ? document.getElementById('col5').value : 'c5';
                    const c6 = document.getElementById('col6') ? document.getElementById('col6').value : 'c6';
                    return lines.map(line => {
                        const parts = sep === 'spaces' ? line.trim().split(/\s{2,}/).map(p => p.trim()).filter(Boolean) : line.split(sep).map(p => p.trim());
                        const valid = parts.length >= 2;
                        const entry = { count: 0 };
                        if (isGram) {
                            entry['c1'] = parts[0] || '';
                            entry['c3'] = parts[1] || '';
                        } else {
                            entry[c1] = parts[0] || ''; entry[c2] = parts[1] || ''; entry[c3] = parts[2] || (parts[1] || '');
                            if (parts[3]) entry[c4] = parts[3];
                            if (parts[4]) entry[c5] = parts[4];
                            if (parts[5]) entry[c6] = parts[5];
                        }
                        return { entry, valid, parts };
                    });
                }

                function updateImportPreview() {
                    const data = parseData();
                    const valid = data.filter(d => d.valid);
                    const cnt = document.getElementById('prev-count');
                    const box = document.getElementById('import-preview');
                    cnt.textContent = `(${valid.length} hợp lệ${data.length > valid.length ? ' · ' + (data.length - valid.length) + ' dòng lỗi' : ''})`;
                    if (!data.length) { box.innerHTML = '<div class="imp-empty">Dán dữ liệu vào ô trên để xem trước...</div>'; return; }
                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = document.querySelector('input[name="gramType"]:checked')?.value || 'struct';
                    if (gramType === 'quiz') {
                        box.innerHTML = `<table class="prev-tbl"><thead><tr><th>#</th><th>Câu hỏi</th><th>Đáp án 1</th><th>Đáp án 2</th><th>Đáp án 3</th><th>Đáp án 4</th><th>ĐA Đúng</th><th>Giải thích</th></tr></thead><tbody>`
                            + data.map((d, i) => `<tr class="${d.valid ? '' : 'bad'}"><td style="color:#475569">${i + 1}</td><td><b style="color:var(--warning)">${fT(d.parts[0] || '—')}</b></td><td>${fT(d.parts[1] || '—')}</td><td>${fT(d.parts[2] || '—')}</td><td>${fT(d.parts[3] || '—')}</td><td>${fT(d.parts[4] || '—')}</td><td style="color:var(--success); font-weight:bold;">${fT(d.parts[5] || '—')}</td><td style="color:#f97316;">${fT(d.parts[6] || '—')}</td></tr>`).join('')
                            + '</tbody></table>';
                        return;
                    }
                    const c1 = document.getElementById('col1').value, c2 = document.getElementById('col2').value, c3 = document.getElementById('col3').value;
                    const c4 = document.getElementById('col4') ? document.getElementById('col4').value : 'c4';
                    const c5 = document.getElementById('col5') ? document.getElementById('col5').value : 'c5';
                    const c6 = document.getElementById('col6') ? document.getElementById('col6').value : 'c6';
                    const L = { c1: (isGram ? 'Cấu trúc' : 'Kanji/Từ'), c2: 'Cách đọc', c3: 'Nghĩa', c4: 'Ví dụ', c5: 'Đáp án', c6: 'Giải thích' };

                    if (isGram) {
                        box.innerHTML = `<table class="prev-tbl" style="font-size:12px;"><thead><tr><th>#</th><th>${L.c1}</th><th>${L.c3}</th></tr></thead><tbody>`
                            + data.map((d, i) => `<tr class="${d.valid ? '' : 'bad'}"><td style="color:#475569">${i + 1}</td><td><b style="color:var(--warning)">${fT(d.entry.c1 || '—')}</b></td><td style="color:#94a3b8">${fT(d.entry.c3 || '—')}</td></tr>`).join('')
                            + '</tbody></table>';
                    } else {
                        box.innerHTML = `<table class="prev-tbl" style="font-size:12px;"><thead><tr><th>#</th><th>${L[c1]}</th><th>${L[c2]}</th><th>${L[c3]}</th><th>${L[c4]}</th><th>${L[c5]}</th><th>${L[c6]}</th></tr></thead><tbody>`
                            + data.map((d, i) => `<tr class="${d.valid ? '' : 'bad'}"><td style="color:#475569">${i + 1}</td><td><b style="color:var(--warning)">${fT(d.entry[c1] || '—')}</b></td><td>${fT(d.entry[c2] || '—')}</td><td style="color:#94a3b8">${fT(d.entry[c3] || '—')}</td><td>${fT(d.entry[c4] || '—')}</td><td style="color:var(--success)">${fT(d.entry[c5] || '—')}</td><td style="color:#f97316">${fT(d.entry[c6] || '—')}</td></tr>`).join('')
                            + '</tbody></table>';
                    }
                }

                async function pasteFromClipboard() {
                    try {
                        if (navigator.clipboard && navigator.clipboard.readText) {
                            const t = await navigator.clipboard.readText();
                            document.getElementById('import-input').value = t;
                            updateImportPreview();
                        } else { document.getElementById('import-input').focus(); }
                    } catch (e) { document.getElementById('import-input').focus(); }
                }

                let isEditMode = false;

                function toggleEditMode() {
                    isEditMode = !isEditMode;
                    const btn = document.getElementById('btn-chinh-sua');
                    const btnCapNhat = document.getElementById('btn-cap-nhat');
                    if (isEditMode) {
                        btn.style.background = '#3b82f6';
                        btn.style.color = '#fff';
                        btn.innerHTML = '✏️ Đang sửa';
                        btnCapNhat.style.display = 'inline-flex';
                    } else {
                        btn.style.background = 'transparent';
                        btn.style.color = '#3b82f6';
                        btn.innerHTML = '✏️ Chỉnh sửa';
                        btnCapNhat.style.display = 'none';
                    }
                    renderCurWordList();
                }

                function renderCurWordList() {
                    if (!curDay) return;
                    const list = db[curLevel][curType][curDay].list;
                    document.getElementById('cur-count').textContent = `(${list.length} từ)`;
                    const box = document.getElementById('cur-word-list');
                    if (!list.length) { box.innerHTML = '<div class="imp-empty">Chưa có từ nào</div>'; return; }
                    const showTrash = isEditMode;

                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = document.querySelector('input[name="gramType"]:checked')?.value || 'struct';
                    const isQuiz = (gramType === 'quiz');

                    let headers = '';
                    if (isQuiz) {
                        headers = `<tr><th>#</th><th>Câu hỏi</th><th>ĐA Đúng</th><th>Các ĐA Sai</th><th>Giải thích</th>${showTrash ? '<th>Hành động</th>' : ''}</tr>`;
                    } else if (isGram) {
                        headers = `<tr><th>#</th><th>Cấu trúc</th><th>Ý nghĩa tiếng việt</th>${showTrash ? '<th>Hành động</th>' : ''}</tr>`;
                    } else {
                        headers = `<tr><th>#</th><th>Cột 1</th><th>Cột 2</th><th>Cột 3</th>${showTrash ? '<th>Hành động</th>' : ''}</tr>`;
                    }

                    box.innerHTML = `<table class="wlist-tbl"><thead>${headers}</thead><tbody>`
                        + list.map((w, i) => {
                            if (w.gramType === 'quiz') {
                                if (showTrash) {
                                    return `<tr><td style="color:#475569">${i + 1}</td><td colspan="${isGram ? 2 : 4}">
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <input type="text" value="${(w.q || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'q', this.value)" placeholder="Câu hỏi" style="width:100%; background:rgba(0,0,0,0.3); color:var(--warning); border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                                <input type="text" value="${(w.ans || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'ans', this.value)" placeholder="ĐA Đúng" style="flex:1; min-width:80px; background:rgba(34,197,94,0.1); color:var(--success); border:1px solid var(--success); border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.w1 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'w1', this.value)" placeholder="Sai 1" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.w2 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'w2', this.value)" placeholder="Sai 2" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.w3 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'w3', this.value)" placeholder="Sai 3" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                            </div>
                            <input type="text" value="${(w.explain || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'explain', this.value)" placeholder="Giải thích" style="width:100%; background:rgba(0,0,0,0.3); color:#f97316; border:1px solid #f97316; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                        </div></td><td><button class="wdel" onclick="directDeleteWord(${i})" title="Xoá từ này">🗑</button></td></tr>`;
                                } else {
                                    return `<tr><td style="color:#475569">${i + 1}</td><td><b style="color:var(--warning)">${fT(w.q)}</b></td><td><span style="color:var(--success)">${fT(w.ans)}</span></td><td><span style="opacity:0.7">${fT(w.w1)} | ${fT(w.w2)} | ${fT(w.w3)}</span></td><td style="color:#f97316; font-size:12px;">${fT(w.explain || '')}</td></tr>`;
                                }
                            } else {
                                if (showTrash) {
                                    if (isGram) {
                                        return `<tr>
                              <td style="color:#475569">${i + 1}</td>
                              <td><input type="text" value="${(w.c1 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c1', this.value)" placeholder="Cấu trúc" style="width:100%; min-width:80px; background:rgba(0,0,0,0.3); color:var(--warning); border:1px solid #3b82f6; border-radius:4px; padding:6px; font-weight:800; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;"></td>
                              <td><input type="text" value="${(w.c3 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c3', this.value)" placeholder="Ý nghĩa" style="width:100%; min-width:80px; background:rgba(0,0,0,0.3); color:#94a3b8; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;"></td>
                              <td><button class="wdel" onclick="directDeleteWord(${i})" title="Xoá từ này">🗑</button></td>
                            </tr>`;
                                    } else {
                                        return `<tr>
                              <td style="color:#475569">${i + 1}</td>
                              <td colspan="3">
                                 <div style="display:flex; flex-direction:column; gap:6px;">
                                    <div style="display:flex; gap:6px;">
                                        <input type="text" value="${(w.c1 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c1', this.value)" placeholder="Kanji/Từ" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:var(--warning); border:1px solid #3b82f6; border-radius:4px; padding:6px; font-weight:800; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                        <input type="text" value="${(w.c2 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c2', this.value)" placeholder="Cách đọc" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                        <input type="text" value="${(w.c3 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c3', this.value)" placeholder="Ý nghĩa" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#94a3b8; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                    </div>
                                    <div style="display:flex; gap:6px;">
                                        <input type="text" value="${(w.c4 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c4', this.value)" placeholder="Ví dụ" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                        <input type="text" value="${(w.c5 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c5', this.value)" placeholder="Đáp án" style="flex:1; min-width:80px; background:rgba(34,197,94,0.1); color:var(--success); border:1px solid var(--success); border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                        <input type="text" value="${(w.c6 || '').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c6', this.value)" placeholder="Giải thích" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#f97316; border:1px solid #f97316; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                    </div>
                                 </div>
                              </td>
                              <td><button class="wdel" onclick="directDeleteWord(${i})" title="Xoá từ này">🗑</button></td>
                            </tr>`;
                                    }
                                } else {
                                    if (isGram) {
                                        return `<tr>
                              <td style="color:#475569">${i + 1}</td>
                              <td><b style="color:var(--warning)">${fT(w.c1)}</b></td>
                              <td style="color:#94a3b8">${fT(w.c3 || '')}</td>
                            </tr>`;
                                    } else {
                                        return `<tr>
                              <td style="color:#475569">${i + 1}</td>
                              <td><b style="color:var(--warning)">${fT(w.c1)}</b><br><span style="color:#f97316; font-size:12px;">${fT(w.c6 || '')}</span></td>
                              <td>${fT(w.c2 || '')}<br><span style="color:var(--success); font-size:12px;">${fT(w.c5 || '')}</span></td>
                              <td style="color:#94a3b8">${fT(w.c3 || '')}<br><span style="color:#fff; font-size:12px;">${fT(w.c4 || '')}</span></td>
                            </tr>`;
                                    }
                                }
                            }
                        }).join('')
                        + '</tbody></table>';
                }

                function updateWordData(idx, field, value) {
                    db[curLevel][curType][curDay].list[idx][field] = value;
                }

                function directDeleteWord(idx) {
                    db[curLevel][curType][curDay].list.splice(idx, 1);
                    saveToLocal();
                    renderCurWordList();
                    // Hiện nút Cập nhật (luôn visible khi editMode)
                    document.getElementById('cur-count').textContent = `(${db[curLevel][curType][curDay].list.length} từ)`;
                    updateGlobalStats();
                }

                function applyAndSync() {
                    saveToLocal();
                    updateGlobalStats();
                    renderSidebar();
                    currentList = db[curLevel][curType][curDay].list;
                    if (document.getElementById('quiz-container').innerHTML !== '') {
                        renderQuiz();
                    }
                    document.getElementById('submit-container').style.display = currentList.length > 0 ? 'flex' : 'none';
                    document.getElementById('rt-wrapper').style.display = currentList.length > 0 ? 'flex' : 'none';

                    // Tắt chế độ chỉnh sửa sau khi cập nhật
                    isEditMode = false;
                    const btnCS = document.getElementById('btn-chinh-sua');
                    btnCS.style.background = 'transparent';
                    btnCS.style.color = '#3b82f6';
                    btnCS.innerHTML = '✏️ Chỉnh sửa';
                    document.getElementById('btn-cap-nhat').style.display = 'none';
                    renderCurWordList();

                    const btn = document.getElementById('btn-cap-nhat');
                    btn.innerHTML = '✅ ĐÃ CẬP NHẬT!';
                    btn.style.background = 'var(--success)';
                    btn.style.display = 'inline-flex';
                    setTimeout(() => {
                        btn.innerHTML = '🔄 CẬP NHẬT';
                        btn.style.background = '';
                        btn.style.display = 'none';
                    }, 1500);
                }

                function renderSidebar() {
                    // Ẩn/hiện đúng nhóm theo ngôn ngữ
                    applyLanguageLayout();

                    const icons = ['🌸', '🍀', '🌻', '🌺', '🌿', '🍄', '🎀', '🧸', '🌷', '🍁', '🌱', '🌼'];
                    activeLevels.forEach(lv => {
                        if (!db[lv]) return;
                        ["voca", "voca_quiz", "gram", "gram_quiz"].forEach(ty => {
                            const container = document.getElementById(`${lv}-${ty}`);
                            if (!container) return;
                            container.innerHTML = "";
                            let catTotal = 0;
                            Object.keys(db[lv][ty]).forEach((dayKey, idx) => {
                                let maxMode = 3;
                                if (ty === 'gram') maxMode = 2;
                                else if (ty === 'voca_quiz' || ty === 'gram_quiz') maxMode = 1;
                                const isAllDone = db[lv][ty][dayKey].done.slice(0, maxMode).every(v => v === true);
                                const wordCount = db[lv][ty][dayKey].list.length;
                                catTotal += wordCount;
                                const unitText = (ty === 'voca_quiz' || ty === 'gram_quiz') ? "câu" : (ty === 'gram' ? "mẫu" : "từ");
                                const div = document.createElement("div"); div.className = "menu-lvl3";
                                const rIcon = icons[idx % icons.length];
                                div.innerHTML = `
                    <span onclick="selectDay('${lv}', '${ty}', '${dayKey}')" style="flex:1; display:flex; align-items:center; gap:8px;">
                        ${rIcon} <span class="lesson-name-text">${dayKey}</span>
                    </span>
                    <span style="display:flex; align-items:center; gap:8px; margin-right:12px;">
                        ${isAllDone ? '<b class="done-check" style="font-size:18px;">&#x2705;</b>' : ''}
                        <span style="font-size:13px; font-weight:800; color:var(--accent); border: 1px solid var(--accent); padding: 2px 8px; border-radius: 12px; box-shadow: 0 0 8px rgba(59,130,246,0.5);">${wordCount} ${unitText}</span>
                    </span>
                    <span style="display:flex; gap:12px; align-items:center;">
                        <span style="color:var(--success)" onclick="exportDayTxt('${lv}', '${ty}', '${dayKey}')" title="Xuất file TXT">📄</span>
                        <span style="color:var(--accent)" onclick="renameDay('${lv}', '${ty}', '${dayKey}')" title="Đổi tên">✏️</span>
                    </span>`;
                                container.appendChild(div);
                            });
                            const prev = container.previousElementSibling;
                            if (prev && prev.classList.contains('menu-lvl2')) {
                                const oldBadge = prev.querySelector('.cat-badge');
                                if (oldBadge) oldBadge.remove();
                                if (catTotal > 0) {
                                    const badge = document.createElement('span');
                                    badge.className = 'cat-badge';
                                    badge.style.cssText = 'position:absolute; right:15px; top:50%; transform:translateY(-50%); font-size:12px; font-weight:800; background:rgba(15,23,42,0.8); color:var(--warning); padding:2px 8px; border-radius:12px; border:1px solid var(--warning);';
                                    badge.innerText = catTotal;
                                    prev.appendChild(badge);
                                }
                            }
                            const addBtn = document.createElement("button"); addBtn.className = "btn btn-gray"; addBtn.style = "width:100%; border-radius:0; font-size:12px;"; addBtn.innerText = "+ THÊM BÀI HỌC"; addBtn.onclick = () => addDay(lv, ty); container.appendChild(addBtn);
                        });
                    });
                }




                let curEditDayInfo = null;

                function renameDay(lv, ty, oldDay) {
                    curEditDayInfo = { lv, ty, oldDay };
                    document.getElementById('edit-day-name-input').value = oldDay;
                    openModal('edit-day-modal');
                }

                function applyRenameDay() {
                    if (!curEditDayInfo) return;
                    const { lv, ty, oldDay } = curEditDayInfo;
                    const newDay = document.getElementById('edit-day-name-input').value.trim();
                    if (!newDay || newDay === oldDay) {
                        closeModal('edit-day-modal');
                        return;
                    }
                    if (db[lv][ty][newDay]) { alert("Tên bài này đã tồn tại!"); return; }
                    const newObj = {};
                    for (let key in db[lv][ty]) {
                        if (key === oldDay) { newObj[newDay] = db[lv][ty][oldDay]; }
                        else { newObj[key] = db[lv][ty][key]; }
                    }
                    db[lv][ty] = newObj;
                    if (curDay === oldDay && curLevel === lv && curType === ty) curDay = newDay;
                    saveToLocal(); renderSidebar();
                    if (curDay === newDay) selectDay(lv, ty, newDay);
                    closeModal('edit-day-modal');
                }

                function applyDeleteDay() {
                    if (!curEditDayInfo) return;
                    const { lv, ty, oldDay } = curEditDayInfo;
                    if (confirm(`Bạn có chắc muốn xoá hoàn toàn bài "${oldDay}" không?\nHành động này không thể hoàn tác.`)) {
                        deleteDay(lv, ty, oldDay);
                        closeModal('edit-day-modal');
                    }
                }

                // ─── Lock screen helpers ───
                function _lockUpdateDots(val) {
                    const max = 4;
                    for (let i = 0; i < max; i++) {
                        const el = document.getElementById('ld' + i);
                        if (!el) continue;
                        el.style.background = i < val.length ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.12)';
                        el.style.transform = i < val.length ? 'scale(1.2)' : 'scale(1)';
                        el.style.boxShadow = i < val.length ? '0 0 12px rgba(139,92,246,0.7)' : 'none';
                    }
                }

                function _closeLockScreen() {
                    const overlay = document.getElementById('lockscreen-overlay');
                    if (overlay) {
                        overlay.style.transition = 'opacity 0.3s';
                        overlay.style.opacity = '0';
                        setTimeout(function () { overlay.style.display = 'none'; overlay.style.opacity = ''; }, 320);
                    }
                    // Hủy callback đang chờ (không thực thi bài)
                    window._lockPendingFn = null;
                    // Reset input
                    var inp = document.getElementById('lockscreen-input');
                    if (inp) { inp.value = ''; _lockUpdateDots(''); }
                }

                function _submitLockCode() {
                    const inp = document.getElementById('lockscreen-input');
                    const err = document.getElementById('lock-error-msg');
                    if (!inp) return;
                    if (inp.value === ACCESS_CODE) {
                        _appUnlocked = true;
                        const overlay = document.getElementById('lockscreen-overlay');
                        if (overlay) {
                            overlay.style.transition = 'opacity 0.4s';
                            overlay.style.opacity = '0';
                            setTimeout(() => { overlay.style.display = 'none'; overlay.style.opacity = ''; }, 420);
                        }
                        // Gọi lại hàm đang chờ nếu có
                        if (window._lockPendingFn) { window._lockPendingFn(); window._lockPendingFn = null; }
                    } else {
                        inp.value = '';
                        _lockUpdateDots('');
                        if (err) { err.style.opacity = '1'; setTimeout(() => { err.style.opacity = '0'; }, 2200); }
                        inp.style.borderColor = '#ef4444';
                        inp.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.25)';
                        inp.classList.add('error-shake');
                        setTimeout(() => {
                            inp.style.borderColor = 'rgba(139,92,246,0.35)';
                            inp.style.boxShadow = 'none';
                            inp.classList.remove('error-shake');
                        }, 500);
                    }
                }

                function _requireAccess(thenFn) {
                    if (_appUnlocked) { thenFn(); return; }
                    window._lockPendingFn = thenFn;
                    const overlay = document.getElementById('lockscreen-overlay');
                    if (overlay) {
                        overlay.style.display = 'flex';
                        overlay.style.opacity = '0';
                        requestAnimationFrame(() => {
                            overlay.style.transition = 'opacity 0.35s';
                            overlay.style.opacity = '1';
                        });
                        setTimeout(() => {
                            const inp = document.getElementById('lockscreen-input');
                            if (inp) { inp.value = ''; _lockUpdateDots(''); inp.focus(); }
                        }, 150);
                    }
                }
                // ─── End lock screen helpers ───

                function selectDay(lv, ty, day, listOverride = null, targetMode = null) {
                    if (window.innerWidth <= 768) {
                        document.body.classList.add('sidebar-hidden');
                        localStorage.setItem('sidebar_hidden', '1');
                        const fab = document.getElementById('mobile-menu-fab');
                        if (fab) fab.style.display = 'flex';
                    }
                    // Kiểm tra khoá cho bài học tiêu chuẩn
                    const lockKey = lv + '_' + ty;
                    if (REQUIRE_LOCK[lockKey] && !_appUnlocked && !listOverride) {
                        _requireAccess(() => selectDay(lv, ty, day, listOverride, targetMode));
                        return;
                    }
                    var _ss = document.getElementById('stats-screen'); if (_ss) _ss.style.display = 'none';
                    var _qc = document.getElementById('quiz-container'); if (_qc) _qc.style.display = listOverride ? '' : 'none'; var _sc2 = document.getElementById('submit-container'); if (_sc2) _sc2.style.display = listOverride ? 'flex' : 'none'; var _rt2 = document.getElementById('rt-wrapper'); if (_rt2 && _rt2.style.display === 'none') _rt2.style.display = '';
                    curVanMode = false;
                    updateVanFab();
                    curLevel = lv; curType = ty; curDay = day; currentList = listOverride || db[lv][ty][day].list;
                    document.getElementById('view-title').textContent = (listOverride ? "♻️ " : "📌 ") + day;
                    const startBtn = document.getElementById('btn-start-lesson');
                    if (startBtn) startBtn.style.display = 'none';
                    const maxMode = getMaxModeForType();
                    const isAllDone = db[lv][ty][day].done.slice(0, maxMode).every(v => v === true);
                    const isVoca = (ty === 'voca' || ty === 'gram');
                    ["btn-add-word", "btn-import", "btn-edit-list", "btn-show-list"].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.style.display = listOverride ? 'none' : 'inline-flex';
                    });
                    ["btn-shuffle", "btn-flashcard", "btn-match-game", "btn-reaction-game"].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.style.display = (listOverride || !isVoca) ? 'none' : 'inline-flex';
                    });
                    const group1 = document.getElementById('group-1');
                    if (group1) group1.style.display = listOverride ? 'none' : 'block';
                    const group2a = document.getElementById('group-2a');
                    if (group2a) group2a.style.display = listOverride ? 'none' : 'block';
                    const group2b = document.getElementById('group-2b');
                    if (group2b) group2b.style.display = listOverride ? 'none' : 'block';

                    const g2aTitle = document.getElementById('group-2a-title');
                    if (g2aTitle) g2aTitle.innerHTML = '📚 HỌC TẬP & DANH SÁCH TỪ';
                    const g2bTitle = document.getElementById('group-2b-title');
                    if (g2bTitle) g2bTitle.innerHTML = '🎮 TRÒ CHƠI ÔN TẬP';
                    const g3Title = document.getElementById('group-3-title');
                    if (g3Title) g3Title.innerHTML = '📝 NHÓM 3 — LÀM BÀI KIỂM TRA';

                    const journeyCard = document.getElementById('journey-card');
                    if (journeyCard) journeyCard.style.display = 'none';

                    const mainTimerBox = document.getElementById('main-timer-box');
                    if (mainTimerBox) mainTimerBox.style.display = 'block';

                    const btnMark = document.getElementById('btn-mark-done');
                    const btnUnmark = document.getElementById('btn-unmark-done');
                    if (listOverride) {
                        if (btnMark) btnMark.style.display = 'none';
                        if (btnUnmark) btnUnmark.style.display = 'none';
                    } else {
                        if (btnMark) btnMark.style.display = isAllDone ? 'none' : 'inline-flex';
                        if (btnUnmark) btnUnmark.style.display = isAllDone ? 'inline-flex' : 'none';
                    }

                    document.getElementById('mode-box-container').style.display = listOverride ? 'none' : 'block';
                    document.getElementById('submit-container').style.display = listOverride ? 'flex' : 'none';
                    document.getElementById('rt-wrapper').style.display = currentList.length > 0 ? 'flex' : 'none';
                    // Sidebar stays open (persistent layout)
                    let bestMode = 0;
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') bestMode = 2;
                    if (targetMode !== null) bestMode = targetMode;
                    changeMode(bestMode);
                    resetLessonTimer();
                    resetTotalTimer();
                    lessonTimes = [];
                    sessionScores = [];

                    // Breadcrumb & back button
                    const lvLabel = { 'n1': 'Năng lực N1', 'n2': 'Năng lực N2', 'n3': 'Trình độ N3', 'bjt': 'BJT' }[lv] || lv;
                    const tyLabel = { 'voca': 'Từ vựng', 'gram': 'Ngữ pháp', 'voca_quiz': 'Từ vựng (TN)', 'gram_quiz': 'Ngữ pháp (TN)' }[ty] || ty;
                    setBreadcrumb(`${lvLabel} / ${tyLabel} / ${day}`, false);
                    setActiveMenuItem(day, `${lv}-${ty}`);
                }

                function changeMode(m) {
                    currentMode = m;

                    const modeBox = document.getElementById('mode-box');
                    const vocaQuizOpts = document.getElementById('voca-quiz-options');

                    // Guard: curLevel='custom' — don’t read db[custom]
                    const isCustom = (curLevel === 'custom');

                    const isEnglishMode = (currentLang === 'en' && curType === 'voca');
                    const isTwoModes = (curType === 'gram' || isEnglishMode || (currentLang === 'en' && isCustom));

                    if (curType === 'voca_quiz' || curType === 'gram_quiz') {
                        if (modeBox) modeBox.style.display = 'none';
                        if (vocaQuizOpts) vocaQuizOpts.style.display = 'flex';
                    } else {
                        if (modeBox) {
                            modeBox.style.display = 'grid';
                            modeBox.style.gridTemplateColumns = isTwoModes ? "1fr 1fr" : "1fr 1fr 1fr";
                            const mode2 = document.getElementById('mode-2');
                            if (isTwoModes) mode2.style.display = 'none';
                            else mode2.style.display = 'flex';
                        }
                        if (vocaQuizOpts) vocaQuizOpts.style.display = 'none';
                    }

                    for (let i = 0; i < 3; i++) {
                        const btn = document.getElementById(`mode-${i}`);
                        const isDone = curVanMode
                            ? (window._vanProgress && window._vanProgress.done && window._vanProgress.done[i])
                            : (!isCustom && db[curLevel] && db[curLevel][curType] && db[curLevel][curType][curDay] && db[curLevel][curType][curDay].done && db[curLevel][curType][curDay].done[i]);

                        let disabled = false;
                        if (currentList.length === 0) disabled = true;
                        if (isTwoModes && i === 2) disabled = true;

                        if (disabled) {
                            btn.className = 'btn btn-gray';
                            btn.style.opacity = '0.3';
                            btn.style.pointerEvents = 'none';
                        } else {
                            btn.className = (i === m) ? 'btn btn-blue' : 'btn btn-gray';
                            btn.style.opacity = '1';
                            btn.style.pointerEvents = 'auto';
                        }

                        let txt = "";
                        if (curType === 'voca' || isCustom) {
                            if (currentLang === 'en') {
                                txt = (i == 0 ? "ĐIỀN NGHĨA VIỆT" : i == 1 ? "ĐIỀN TỪ TIẾNG ANH" : "");
                            } else if (currentLang === 'cn') {
                                txt = (i == 0 ? "CÁCH ĐỌC" : i == 1 ? "NGHĨA" : "TIẾNG TRUNG");
                            } else {
                                txt = (i == 0 ? "CÁCH ĐỌC" : i == 1 ? "NGHĨA" : "TIẾNG NHẬT");
                            }
                        } else if (curType === 'voca_quiz' || curType === 'gram_quiz') {
                            txt = "TRẮC NGHIỆM";
                        } else if (curType === 'gram') {
                            txt = (i == 0 ? "TÌM NGHĨA" : i == 1 ? "TÌM CẤU TRÚC" : "");
                        }
                        if (txt) {
                            btn.innerHTML = `<span style="font-size: 12px; opacity: 0.8; margin-bottom: 4px;">ĐỀ ${i + 1}</span><span>${txt}${isDone ? ' ✅' : ''}</span>`;
                        }
                    }

                    // Always clear quiz container first to prevent stale content from previous selection
                    document.getElementById('quiz-container').innerHTML = '';
                    if (currentList.length > 0) renderQuiz();
                    resetTestTimer();
                }

                function shuffleArray(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }



                let audioCtx = null;
                function unlockAudio() {
                    try {
                        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        if (audioCtx.state === 'suspended') audioCtx.resume();
                        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
                        gain.gain.value = 0;
                        osc.connect(gain); gain.connect(audioCtx.destination);
                        osc.start(0); osc.stop(audioCtx.currentTime + 0.1);
                        document.removeEventListener('touchstart', unlockAudio);
                        document.removeEventListener('click', unlockAudio);
                    } catch (e) { }
                }
                document.addEventListener('touchstart', unlockAudio);
                document.addEventListener('click', unlockAudio);

                window.isBgmMuted = localStorage.getItem('mgao_bgm_muted') === 'true';
                window.toggleMute = function() {
                    window.isBgmMuted = !window.isBgmMuted;
                    localStorage.setItem('mgao_bgm_muted', window.isBgmMuted);
                    
                    const iframe = document.getElementById('bgm-iframe');
                    if (window.isBgmMuted) {
                        if (typeof ytBgmPlayer !== 'undefined' && ytBgmPlayer.mute) ytBgmPlayer.mute();
                        else if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                    } else {
                        if (typeof ytBgmPlayer !== 'undefined' && ytBgmPlayer.unMute) ytBgmPlayer.unMute();
                        else if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                    }
                    updateMuteButtons();
                }
                function updateMuteButtons() {
                    const btn = document.getElementById('bottom-mute-btn');
                    if (btn) {
                        btn.innerHTML = window.isBgmMuted ? '🔇 Tắt nhạc' : '🔊 Nhạc nền';
                        btn.style.background = window.isBgmMuted ? '#475569' : ''; 
                    }
                }
                // Initial update
                setTimeout(updateMuteButtons, 500);

                function playSound(type) {
                    try {
                        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        if (audioCtx.state === 'suspended') audioCtx.resume();
                        const osc = audioCtx.createOscillator(), gainNode = audioCtx.createGain();
                        osc.connect(gainNode); gainNode.connect(audioCtx.destination);
                        if (type === 'ting') {
                            osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
                            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                            osc.start(); osc.stop(audioCtx.currentTime + 0.3);
                        } else {
                            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(120, audioCtx.currentTime);
                            gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                            osc.start(); osc.stop(audioCtx.currentTime + 0.2);
                        }
                    } catch (e) { }
                }

                function checkQuiz(i, btnIdx, isCorrect) {
                    if (!timerInterval) toggleTimer();
                    const card = document.getElementById(`q-${i}`);
                    if (card.getAttribute('data-res') === 'ok' || card.getAttribute('data-res') === 'ng') return;

                    const wrap = document.getElementById(`opts-wrap-${i}`);
                    wrap.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));

                    const btn = document.getElementById(`opt-${i}-${btnIdx}`);
                    btn.classList.add('selected');

                    card.setAttribute('data-selected-correct', isCorrect);
                    card.setAttribute('data-selected-idx', btnIdx);

                    if (showAnswerImmediately) {
                        wrap.querySelectorAll('.quiz-opt').forEach(b => b.style.pointerEvents = 'none');
                        const exp = document.getElementById(`explain-${i}`);
                        if (exp) exp.style.display = 'block';
                        const msg = document.getElementById(`msg-${i}`);

                        if (isCorrect) {
                            trackCorrect(currentList[i]);
                            card.setAttribute('data-res', 'ok');
                            card.style.borderLeftColor = 'var(--success)';
                            if (msg) { msg.className = 'fb-msg show ok'; msg.innerText = 'CHÍNH XÁC! 🎉'; }
                            btn.classList.add('correct');
                            playSound('ting');
                            const rect = btn.getBoundingClientRect();
                            const x = (rect.left + rect.width / 2) / window.innerWidth;
                            const y = (rect.top + rect.height / 2) / window.innerHeight;
                            confetti({ particleCount: 30, spread: 50, origin: { x: Math.max(0.1, Math.min(x, 0.9)), y: Math.max(0.1, Math.min(y, 0.9)) }, colors: ['#4ade80', '#22c55e'] });
                        } else {
                            card.setAttribute('data-res', 'ng');
                            card.style.borderLeftColor = 'var(--danger)';
                            if (msg) { msg.className = 'fb-msg show ng'; msg.innerText = 'SAI RỒI! ❌'; }
                            btn.classList.add('wrong');
                            wrap.querySelectorAll('.quiz-opt').forEach(b => {
                                if (b.getAttribute('data-correct') === 'true') {
                                    b.classList.add('correct');
                                    b.style.opacity = '1';
                                } else {
                                    b.style.opacity = '0.5';
                                }
                            });
                            playSound('buzz');
                        }
                        updateChart();
                    }
                }

                function handleKey(e, idx) {
                    if (e.key === 'ArrowDown' || e.key === 'Enter') {
                        e.preventDefault();
                        if (e.key === 'Enter') check(idx, true);
                        document.getElementById(`input-${idx + 1}`)?.focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        document.getElementById(`input-${idx - 1}`)?.focus();
                    }
                }


                function check(idx, isSubmit = false) {
                    const input = document.getElementById(`input-${idx}`), val = input.value.trim().toLowerCase(), ans = input.getAttribute('data-ans').toLowerCase(), card = document.getElementById(`q-${idx}`);
                    const prevRes = card.getAttribute('data-res');
                    const msg = document.getElementById(`msg-${idx}`);
                    input.classList.remove('correct', 'error-shake');

                    if (val === ans) {
                        input.classList.add('correct');
                        card.setAttribute('data-res', 'ok');
                        card.style.borderLeftColor = 'var(--success)';
                        msg.className = 'fb-msg show ok';
                        msg.innerText = 'Chính xác rồi nè 🎉';
                        if (prevRes !== 'ok') {
                            playSound('ting');
                            const rect = input.getBoundingClientRect();
                            const x = (rect.left + rect.width / 2) / window.innerWidth;
                            const y = (rect.top + rect.height / 2) / window.innerHeight;
                            confetti({ particleCount: 50, spread: 60, origin: { x: Math.max(0.1, Math.min(x, 0.9)), y: Math.max(0.1, Math.min(y, 0.9)) }, colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'], zIndex: 999999 });
                        }
                    }
                    else if (val === "") {
                        card.removeAttribute('data-res');
                        card.style.borderLeftColor = '#334155';
                        msg.className = 'fb-msg';
                    }
                    else {
                        if (card.getAttribute('data-res') !== 'forgot') {
                            card.setAttribute('data-res', 'ng');
                        }
                        if (isSubmit) {
                            playSound('buzz');
                            input.classList.add('error-shake');
                            card.style.borderLeftColor = 'var(--danger)';
                            msg.className = 'fb-msg show ng';
                            msg.innerText = 'Sai rồi tiếc quá 😢';
                            // Hiển thị .answer-reveal riêng
                            const _ans_display = input.getAttribute('data-ans').trim();
                            if (_ans_display) {
                                let _solEl3 = card.querySelector('.answer-reveal');
                                if (!_solEl3) { _solEl3 = document.createElement('div'); _solEl3.className = 'answer-reveal'; card.appendChild(_solEl3); }
                                _solEl3.innerHTML = '✅ Đáp án đúng: <b>' + _ans_display + '</b>';
                            }
                            setTimeout(() => input.classList.remove('error-shake'), 400);
                            // Track sai
                            if (currentList[idx]) trackWrong(currentList[idx]);
                        }
                    }
                    updateChart();
                }

                function updateChart() {
                    if (!currentList || currentList.length === 0) return;
                    let ok = 0, ng = 0, forgot = 0;
                    const cards = document.querySelectorAll('.card[id^="q-"]');
                    const total = cards.length;
                    if (total === 0) return;

                    cards.forEach(card => {
                        const res = card.getAttribute('data-res');
                        if (res === 'ok') ok++;
                        else if (res === 'ng') ng++;
                        else if (res === 'forgot') forgot++;
                    });

                    document.getElementById('rt-txt-ok').innerText = ok;
                    document.getElementById('rt-txt-ng').innerText = ng;
                    document.getElementById('rt-txt-forgot').innerText = forgot;
                    document.getElementById('rt-txt-remain').innerText = total - ok - ng - forgot;

                    let pOk = (ok / total) * 100;
                    let pNg = (ng / total) * 100;
                    let pForgot = (forgot / total) * 100;

                    let endOk = pOk;
                    let endNg = endOk + pNg;
                    let endForgot = endNg + pForgot;

                    document.getElementById('rt-donut').style.background = `conic-gradient(
            var(--success) 0% ${endOk}%, 
            var(--danger) ${endOk}% ${endNg}%, 
            var(--warning) ${endNg}% ${endForgot}%, 
            #334155 ${endForgot}% 100%
        )`;
                }

                function toggleChartWidget() {
                    const w = document.getElementById('rt-wrapper');
                    w.classList.toggle('minimized');
                    if (w.classList.contains('minimized')) {
                        document.getElementById('rt-content').style.display = 'none';
                        document.getElementById('rt-min-icon').style.display = 'block';
                    } else {
                        document.getElementById('rt-content').style.display = 'flex';
                        document.getElementById('rt-min-icon').style.display = 'none';
                    }
                }

                function resetQuiz() {
                    if (confirm('Bạn có chắc muốn làm lại bài này từ đầu? Toàn bộ các từ đang nhập dở sẽ bị xóa.')) {
                        renderQuiz();
                        resetTimer();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }

                function shuffleQuiz() {
                    if (currentList.length === 0) return;
                    if (confirm("Trộn ngẫu nhiên vị trí các từ và làm lại từ đầu?")) {
                        currentList = [...currentList];
                        for (let i = currentList.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [currentList[i], currentList[j]] = [currentList[j], currentList[i]];
                        }
                        renderQuiz();
                        resetTimer();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }

                function submitQuiz() {
                    // Stop lesson timer, save lesson time
                    if (timerInterval) toggleTimer(true);
                    let ok = 0, failed = 0;
                    const cards = document.querySelectorAll('.card[id^="q-"]');
                    const total = cards.length;
                    if (total === 0) { alert("Không có câu hỏi nào để chấm!"); return; }

                    cards.forEach((card) => {
                        const idx = card.getAttribute('data-idx');
                        const isQuizItem = (currentList[idx].gramType === 'quiz');

                        if (isQuizItem) {
                            if (card.getAttribute('data-res') === 'ok') { ok++; return; }
                            const isCorrect = card.getAttribute('data-selected-correct') === 'true';
                            const selectedIdx = card.getAttribute('data-selected-idx');
                            const wrap = document.getElementById(`opts-wrap-${idx}`);
                            const msg = document.getElementById(`msg-${idx}`);

                            wrap.querySelectorAll('.quiz-opt').forEach(b => b.style.pointerEvents = 'none');

                            const exp = document.getElementById(`explain-${idx}`);
                            if (exp) exp.style.display = 'block';

                            if (isCorrect) {
                                ok++;
                                trackCorrect(currentList[idx]);
                                card.setAttribute('data-res', 'ok');
                                card.style.borderLeftColor = 'var(--success)';
                                const btn = document.getElementById(`opt-${idx}-${selectedIdx}`);
                                if (btn) btn.classList.add('correct');
                                if (msg) { msg.className = 'fb-msg show ok'; msg.innerText = "CHÍNH XÁC! 🎉"; }
                            } else {
                                failed++;
                                if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');
                                card.style.borderLeftColor = 'var(--danger)';
                                if (selectedIdx !== null) {
                                    const btn = document.getElementById(`opt-${idx}-${selectedIdx}`);
                                    if (btn) btn.classList.add('wrong');
                                }
                                wrap.querySelectorAll('.quiz-opt').forEach(b => {
                                    if (b.getAttribute('data-correct') === 'true') {
                                        b.classList.add('correct');
                                        b.style.opacity = '1';
                                    } else {
                                        b.style.opacity = '0.5';
                                    }
                                });
                                if (msg) { msg.className = 'fb-msg show ng'; msg.innerText = "SAI RỒI! ❌"; }
                                // Hiển thị đáp án đúng
                                const _correctBtn = wrap.querySelector('.quiz-opt[data-correct="true"]');
                                const _correctText = _correctBtn ? _correctBtn.textContent.trim() : currentList[idx].ans;
                                let _solEl = wrap.parentElement.querySelector('.answer-reveal');
                                if (!_solEl) { _solEl = document.createElement('div'); _solEl.className = 'answer-reveal'; wrap.parentElement.appendChild(_solEl); }
                                _solEl.innerHTML = '✅ Đáp án đúng: <b>' + _correctText + '</b>';
                            }
                        } else {
                            const input = document.getElementById(`input-${idx}`);
                            const ans = input ? input.getAttribute('data-ans').trim() : '';
                            const ansLower = ans.toLowerCase();
                            const val = input ? input.value.trim() : '';
                            const valLower = val.toLowerCase();

                            const exp = document.getElementById(`explain-${idx}`);
                            if (exp) exp.style.display = 'block';

                            // Câu đúng: data-res đã là 'ok' (đã gõ đúng trước đó)
                            if (card.getAttribute('data-res') === 'ok') {
                                ok++;
                                trackCorrect(currentList[idx]);
                                if (input) input.classList.add('correct');
                                card.style.borderLeftColor = 'var(--success)';
                                // Hiện badge xanh 'Tuyệt vời'
                                const _msgOk = document.getElementById('msg-' + idx);
                                if (_msgOk) { _msgOk.className = 'fb-msg show ok'; _msgOk.innerText = 'Tuyệt vời, chính xác! 🎉'; }
                                // Hiển thị đáp án đúng
                                if (ans) {
                                    let _solOk = card.querySelector('.answer-reveal');
                                    if (!_solOk) { _solOk = document.createElement('div'); _solOk.className = 'answer-reveal'; card.appendChild(_solOk); }
                                    _solOk.innerHTML = '✅ Đáp án đúng: <b>' + ans + '</b>';
                                    _solOk.style.borderColor = 'var(--success)';
                                    _solOk.style.color = '#15803d';
                                }
                            }
                            // Câu không có đáp án định nghĩa và chưa điền → bỏ qua (tính đúng)
                            else if (ans === '' && val === '') {
                                ok++;
                                trackCorrect(currentList[idx]);
                                card.setAttribute('data-res', 'ok');
                                if (input) input.classList.add('correct');
                                card.style.borderLeftColor = 'var(--success)';
                                const _msgSkip = document.getElementById('msg-' + idx);
                                if (_msgSkip) { _msgSkip.className = 'fb-msg show ok'; _msgSkip.innerText = 'Tuyệt vời, chính xác! 🎉'; }
                            }
                            // Câu sai hoặc chưa điền (val === '' nhưng ans !== '')
                            else {
                                failed++;
                                if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');
                                if (input) { input.classList.add('error-shake'); }
                                card.style.borderLeftColor = 'var(--danger)';
                                // Hiển thị msg đỏ + .answer-reveal
                                const _msgEl = document.getElementById('msg-' + idx);
                                if (_msgEl) { _msgEl.className = 'fb-msg show ng'; _msgEl.innerText = 'Tiếc quá sai rồi 😢'; }
                                if (ans) {
                                    let _solEl2 = card.querySelector('.answer-reveal');
                                    if (!_solEl2) { _solEl2 = document.createElement('div'); _solEl2.className = 'answer-reveal'; card.appendChild(_solEl2); }
                                    _solEl2.innerHTML = '✅ Đáp án đúng: <b>' + ans + '</b>';
                                }
                                // Track sai
                                if (currentList[idx]) trackWrong(currentList[idx]);
                            }

                        }
                    });

                    const percent = (ok / total) * 100;

                    if (curVanMode) {
                        // Lưu tiến độ Góc của Vân vào localStorage (không dùng db)
                        if (percent >= 90) {
                            window._vanProgress.done[currentMode] = true;
                            localStorage.setItem(window._vanProgressKey, JSON.stringify(window._vanProgress));
                            renderVanSidebar();
                        }
                        // === Ghi lịch sử làm bài ===
                        const _histKey = 'van_history_' + (window._vanProgressKey || 'unknown');
                        const _histArr = JSON.parse(localStorage.getItem(_histKey) || '[]');
                        const _timerTxt = document.getElementById('timer-display') ? document.getElementById('timer-display').textContent : '--:--';
                        _histArr.unshift({
                            time: new Date().toLocaleString('vi-VN', { hour12: false }),
                            ok, failed, total,
                            percent: Math.round(percent),
                            duration: _timerTxt,
                            mode: currentMode
                        });
                        if (_histArr.length > 50) _histArr.length = 50; // giữ tối đa 50 lần
                        localStorage.setItem(_histKey, JSON.stringify(_histArr));
                        const btnMark = document.getElementById('btn-mark-done');
                        const btnUnmark = document.getElementById('btn-unmark-done');
                        if (btnMark) btnMark.style.display = 'none';
                        if (btnUnmark) btnUnmark.style.display = 'none';
                    } else {
                        if (percent >= 90) db[curLevel][curType][curDay].done[currentMode] = true;
                        const maxMode = getMaxModeForType();
                        const isAllDone = db[curLevel][curType][curDay].done.slice(0, maxMode).every(v => v === true);
                        const btnMark = document.getElementById('btn-mark-done');
                        const btnUnmark = document.getElementById('btn-unmark-done');
                        if (btnMark) btnMark.style.display = isAllDone ? 'none' : 'inline-flex';
                        if (btnUnmark) btnUnmark.style.display = isAllDone ? 'inline-flex' : 'none';
                        saveToLocal(); renderSidebar(); updateGlobalStats();
                    }

                    document.getElementById('res-ok').innerText = ok;
                    document.getElementById('res-ng').innerText = failed;
                    document.getElementById('res-time').innerText = document.getElementById('timer-display').textContent;
                    document.getElementById('btn-retry-failed').style.display = failed > 0 ? 'block' : 'none';

                    const starredCount = currentList.filter(item => fcStarredKeys.has(_itemKey(item))).length;
                    const btnRetryStarred = document.getElementById('btn-retry-starred');
                    if (btnRetryStarred) btnRetryStarred.style.display = starredCount > 0 ? 'block' : 'none';

                    let title = "CỐ GẮNG THÊM 💪";
                    let subtitle = "Bạn đã rất cố gắng nhưng hãy làm thêm lần nữa nhé.";
                    let titleColor = "var(--danger)";
                    let showDecor = false;

                    if (percent === 100) {
                        title = "XUẤT SẮC! 🏆";
                        subtitle = "Bạn thật xuất sắc, hãy phát huy nhé.";
                        titleColor = "var(--success)";
                        showDecor = true;
                        confetti({ particleCount: 200, spread: 70 });
                    }
                    else if (percent >= 90) {
                        title = "QUÁ GIỎI! 🌟";
                        subtitle = "Giỏi quá, cố thêm lần nữa nhé.";
                        titleColor = "var(--warning)";
                    }

                    const titleEl = document.getElementById('congrats-title');
                    titleEl.innerText = title;
                    titleEl.style.color = titleColor;

                    document.getElementById('congrats-subtitle').innerText = subtitle;

                    // Save this lesson's score
                    lessonTimes.push(seconds);
                    sessionScores.push({ ok, total, mode: currentMode });

                    // Show/hide "Next lesson" button
                    const maxMode = getMaxModeForType();
                    const btnNext = document.getElementById('btn-next-lesson');
                    const btnClose = document.getElementById('btn-close-congrats');
                    const uniqueCompletedModes = new Set(sessionScores.map(s => s.mode)).size;

                    if (currentMode < maxMode - 1 && !curVanMode) {
                        const modeLabels = { 0: 'Bài 1', 1: 'Bài 2', 2: 'Bài 3' };
                        if (btnNext) { btnNext.style.display = 'block'; btnNext.textContent = `→ SANG ${modeLabels[currentMode + 1] || 'BÀI TIẾP THEO'}`; }
                        if (btnClose) { btnClose.innerText = "ĐÓNG VÀ XEM ĐÁP ÁN"; btnClose.onclick = () => { showAllAnswers(); closeModal('congrats-modal'); }; }
                    } else if (!curVanMode && uniqueCompletedModes === maxMode) {
                        // Đã làm đủ số test yêu cầu — hiện nút Xem kết quả tổng
                        if (btnNext) btnNext.style.display = 'none';
                        if (btnClose) {
                            btnClose.innerText = "🎉 XEM KẾT QUẢ TỔNG";
                            btnClose.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                            btnClose.style.boxShadow = '0 10px 25px rgba(245,158,11,0.5)';
                            btnClose.onclick = () => { closeModal('congrats-modal'); setTimeout(showCompletionScreen, 300); };
                        }
                    } else {
                        if (btnNext) btnNext.style.display = 'none';
                        if (btnClose) { btnClose.innerText = "ĐÓNG VÀ XEM ĐÁP ÁN"; btnClose.onclick = () => { showAllAnswers(); closeModal('congrats-modal'); }; }
                    }
                    // ── Ghi nhật ký học tập theo ngày ──
                    (function () {
                        var _logKey = (typeof currentDbKey !== 'undefined') ? currentDbKey + '_daily_log' : 'mgao_daily_log';
                        var _log = JSON.parse(localStorage.getItem(_logKey) || '[]');
                        _log.unshift({
                            date: _localDateStr(),
                            ts: Date.now(),
                            level: curLevel || 'van',
                            type: curType || '',
                            day: curDay || '',
                            mode: currentMode,
                            ok: ok,
                            failed: failed,
                            total: total,
                            duration: seconds || 0,
                            source: curVanMode ? 'van' : 'user',
                            percent: Math.round((ok / total) * 100)
                        });
                        if (_log.length > 500) _log.length = 500;
                        localStorage.setItem(_logKey, JSON.stringify(_log));
                    })();
                    openModal('congrats-modal');
                }

                // ===== VAN SPEED DIAL FAB HELPERS =====
                let _vanFabOpen = false;

                function updateVanFab() {
                    const fab = document.getElementById('van-fab-group');
                    if (!fab) return;
                    fab.style.display = curVanMode ? 'block' : 'none';
                    if (!curVanMode && _vanFabOpen) vanFabClose();
                }

                function vanFabToggle() {
                    _vanFabOpen ? vanFabClose() : vanFabOpen();
                }

                function vanFabOpen() {
                    _vanFabOpen = true;
                    const items = document.getElementById('van-fab-items');
                    const icon = document.getElementById('van-fab-toggle-icon');
                    const bd = document.getElementById('van-fab-backdrop');
                    const btn = document.getElementById('van-fab-toggle');
                    if (items) { items.style.pointerEvents = 'auto'; items.style.opacity = '1'; items.style.transform = 'translateY(0)'; }
                    if (icon) { icon.style.transform = 'rotate(135deg)'; icon.textContent = '✕'; }
                    if (bd) { bd.style.display = 'block'; requestAnimationFrame(() => bd.style.opacity = '1'); }
                    if (btn) { btn.style.transform = 'scale(1.08)'; btn.style.boxShadow = '0 8px 28px rgba(168,85,247,0.85)'; }
                }

                function vanFabClose() {
                    _vanFabOpen = false;
                    const items = document.getElementById('van-fab-items');
                    const icon = document.getElementById('van-fab-toggle-icon');
                    const bd = document.getElementById('van-fab-backdrop');
                    const btn = document.getElementById('van-fab-toggle');
                    if (items) { items.style.pointerEvents = 'none'; items.style.opacity = '0'; items.style.transform = 'translateY(12px)'; }
                    if (icon) { icon.style.transform = 'rotate(0deg)'; icon.textContent = '✨'; }
                    if (bd) { bd.style.opacity = '0'; setTimeout(() => { if (!_vanFabOpen && bd) bd.style.display = 'none'; }, 250); }
                    if (btn) { btn.style.transform = 'scale(1)'; btn.style.boxShadow = '0 6px 22px rgba(168,85,247,0.65)'; }
                }

                function openVanHistory() {
                    const modal = document.getElementById('van-history-modal');
                    const list = document.getElementById('van-history-list');
                    const empty = document.getElementById('van-history-empty');
                    const label = document.getElementById('van-history-lesson-label');
                    if (!modal) return;

                    // Build label
                    const lessonName = (curVanSection && curVanSub !== null && curVanIdx !== null)
                        ? (vanData[curVanSection]?.[curVanSub]?.[curVanIdx]?.name || '')
                        : '';
                    label.textContent = lessonName ? ('Bài: ' + lessonName) : 'Tất cả bài học';

                    const histKey = 'van_history_' + (window._vanProgressKey || '');
                    const histArr = JSON.parse(localStorage.getItem(histKey) || '[]');

                    list.innerHTML = '';
                    if (histArr.length === 0) {
                        empty.style.display = 'block';
                        list.style.display = 'none';
                    } else {
                        empty.style.display = 'none';
                        list.style.display = 'flex';
                        const modeLabels = ['Đề 1', 'Đề 2', 'Đề 3'];
                        histArr.forEach((entry, i) => {
                            const pct = entry.percent;
                            const pctColor = pct >= 90 ? '#4ade80' : pct >= 70 ? '#fbbf24' : '#f87171';
                            const pctBg = pct >= 90 ? 'rgba(34,197,94,0.12)' : pct >= 70 ? 'rgba(251,191,36,0.12)' : 'rgba(239,68,68,0.12)';
                            const row = document.createElement('div');
                            row.style.cssText = `display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:rgba(30,41,59,0.7);border:1px solid rgba(255,255,255,0.06);`;
                            row.innerHTML = `
                                <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;flex-shrink:0;">${histArr.length - i}</div>
                                <div style="flex:1;min-width:0;">
                                    <div style="font-size:13px;font-weight:800;color:#e2e8f0;margin-bottom:2px;">${entry.time}</div>
                                    <div style="font-size:12px;color:#94a3b8;">${modeLabels[entry.mode] || ''} &nbsp;·&nbsp; ⏱ ${entry.duration}</div>
                                </div>
                                <div style="text-align:right;flex-shrink:0;">
                                    <div style="font-size:15px;font-weight:900;color:${pctColor};background:${pctBg};padding:3px 10px;border-radius:10px;border:1px solid ${pctColor}40;">${pct}%</div>
                                    <div style="font-size:11px;color:#64748b;margin-top:2px;">✅${entry.ok} ❌${entry.failed}/${entry.total}</div>
                                </div>`;
                            list.appendChild(row);
                        });
                    }
                    modal.style.display = 'flex';
                }

                function clearVanHistory() {
                    if (!confirm('Xoá toàn bộ lịch sử bài này?')) return;
                    const histKey = 'van_history_' + (window._vanProgressKey || '');
                    localStorage.removeItem(histKey);
                    openVanHistory(); // refresh
                }

                // ===== SHOW ALL ANSWERS on modal close =====
                function showAllAnswers() {
                    const cards = document.querySelectorAll('.card[id^="q-"]');
                    cards.forEach(card => {
                        const idx = card.getAttribute('data-idx');
                        if (!currentList[idx]) return;
                        const item = currentList[idx];
                        const isQuizItem = (item.gramType === 'quiz');
                        const res = card.getAttribute('data-res');

                        if (isQuizItem) {
                            // Trắc nghiệm: hiện answer-reveal cho câu sai / chưa chọn
                            if (res === 'ok') return; // đã đúng, không cần
                            const wrap = document.getElementById('opts-wrap-' + idx);
                            if (!wrap) return;
                            // Lock buttons & highlight correct
                            wrap.querySelectorAll('.quiz-opt').forEach(b => {
                                b.style.pointerEvents = 'none';
                                if (b.getAttribute('data-correct') === 'true') {
                                    b.classList.add('correct'); b.style.opacity = '1';
                                } else { b.style.opacity = '0.5'; }
                            });
                            const msgEl = document.getElementById('msg-' + idx);
                            if (msgEl && !msgEl.classList.contains('show')) {
                                msgEl.className = 'fb-msg show ng'; msgEl.innerText = 'Sai rồi tiếc quá 😢';
                            }
                            // Show answer-reveal
                            const _correctBtn = wrap.querySelector('.quiz-opt[data-correct="true"]');
                            const _correctText = _correctBtn ? _correctBtn.textContent.trim() : item.ans;
                            let solEl = card.querySelector('.answer-reveal');
                            if (!solEl && _correctText) {
                                solEl = document.createElement('div');
                                solEl.className = 'answer-reveal';
                                card.appendChild(solEl);
                            }
                            if (solEl && _correctText) solEl.innerHTML = '✅ Đáp án đúng: <b>' + _correctText + '</b>';
                            // Show explain
                            const exp = document.getElementById('explain-' + idx);
                            if (exp) exp.style.display = 'block';

                        } else {
                            if (res === 'ok') return;
                            const input = document.getElementById('input-' + idx);
                            if (!input) return;
                            const origAns = input.getAttribute('data-ans').trim();
                            input.style.pointerEvents = 'none';
                            card.style.borderLeftColor = 'var(--danger)';
                            const msgEl = document.getElementById('msg-' + idx);
                            if (msgEl && !msgEl.classList.contains('show')) {
                                msgEl.className = 'fb-msg show ng'; msgEl.innerText = 'Sai rồi tiếc quá 😢';
                            }
                            // Show answer-reveal
                            let solEl = card.querySelector('.answer-reveal');
                            if (!solEl && origAns) {
                                solEl = document.createElement('div');
                                solEl.className = 'answer-reveal';
                                card.appendChild(solEl);
                            }
                            if (solEl && origAns) solEl.innerHTML = '✅ Đáp án đúng: <b>' + origAns + '</b>';
                            // Show explain
                            const exp = document.getElementById('explain-' + idx);
                            if (exp) exp.style.display = 'block';
                        }
                    });
                }

                // ===== TIMER SYSTEM =====
                // 2. Test timer (chạy sau khi bấm Bắt Đầu, hiển thị trong card)
                function toggleTestTimer(fromSubmit = false) {
                    const btn = document.getElementById('timer-btn');
                    const wrap = document.getElementById('test-timer-display-wrap');
                    const iframe = document.getElementById('bgm-iframe');
                    if (timerInterval) {
                        clearInterval(timerInterval); timerInterval = null;
                        if (btn) { btn.innerHTML = '▶ TIẾP TỤC'; btn.className = 'btn btn-green'; }
                        const bPause = document.getElementById('bottom-pause-btn');
                        if (bPause) { bPause.innerHTML = '▶ TIẾP TỤC'; bPause.className = 'btn btn-green'; }
                        if (typeof ytBgmPlayer !== 'undefined' && ytBgmPlayer.pauseVideo) ytBgmPlayer.pauseVideo();
                        else if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                        if (!fromSubmit) {
                            const qc = document.getElementById('quiz-container'); if (qc) qc.style.display = 'none';
                            const sc = document.getElementById('submit-container'); if (sc) sc.style.display = 'none';
                        }
                    } else {
                        if (wrap) wrap.style.display = 'block';
                        timerInterval = setInterval(() => { seconds++; updateTestTime(); }, 1000);
                        if (btn) { btn.innerHTML = '⏸ TẠM DỪNG'; btn.className = 'btn btn-danger'; }
                        const bPause = document.getElementById('bottom-pause-btn');
                        if (bPause) { bPause.innerHTML = '⏸ TẠM DỪNG'; bPause.className = 'btn btn-danger'; bPause.style.display = 'inline-flex'; }
                        if (typeof ytBgmPlayer !== 'undefined' && ytBgmPlayer.playVideo) {
                            ytBgmPlayer.playVideo();
                            if (window.isBgmMuted) ytBgmPlayer.mute(); else ytBgmPlayer.unMute();
                        }
                        else if (iframe && iframe.contentWindow) {
                            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            if (window.isBgmMuted) iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                            else iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                        }
                        const qc = document.getElementById('quiz-container'); if (qc) qc.style.display = '';
                        const sc = document.getElementById('submit-container'); if (sc && currentList.length > 0) sc.style.display = 'flex';
                    }
                }
                function resetTestTimer() {
                    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
                    seconds = 0;
                    updateTestTime();
                    const btn = document.getElementById('timer-btn');
                    if (btn) { btn.innerHTML = '▶ BẮT ĐẦU'; btn.className = 'btn btn-green'; }
                    const wrap = document.getElementById('test-timer-display-wrap');
                    if (wrap) wrap.style.display = 'none';
                    const bPause = document.getElementById('bottom-pause-btn');
                    if (bPause) bPause.style.display = 'none';
                    const iframe = document.getElementById('bgm-iframe');
                    if (typeof ytBgmPlayer !== 'undefined' && ytBgmPlayer.pauseVideo) {
                        ytBgmPlayer.pauseVideo();
                        ytBgmPlayer.seekTo(0, true);
                    } else if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
                    }
                    const mbox = document.getElementById('mode-box-container');
                    const isOverride = mbox && mbox.style.display === 'none' && currentList.length > 0;
                    if (!isOverride) {
                        const qc = document.getElementById('quiz-container'); if (qc) qc.style.display = 'none';
                        const sc = document.getElementById('submit-container'); if (sc) sc.style.display = 'none';
                    }
                }
                function updateTestTime() {
                    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
                    const s2 = (seconds % 60).toString().padStart(2, '0');
                    const el = document.getElementById('test-timer-display');
                    if (el) el.textContent = `${m}:${s2}`;
                    const d = document.getElementById('timer-display'); if (d) d.textContent = `${m}:${s2}`;
                    const h = document.getElementById('header-test-timer-display-val'); if (h) h.textContent = `${m}:${s2}`;
                }

                // Legacy wrappers (backward compat)
                function toggleTimer(fromSubmit = false) { toggleTestTimer(fromSubmit); }
                function startTotalTimer() {
                    if (totalTimerInterval) return;
                    totalTimerInterval = setInterval(() => { totalSeconds++; updateTotalTime(); }, 1000);
                }
                function resetLessonTimer() { resetTestTimer(); }
                function resetTotalTimer() { if (totalTimerInterval) { clearInterval(totalTimerInterval); totalTimerInterval = null; } totalSeconds = 0; updateTotalTime(); }
                function resetTimer() { resetTestTimer(); }
                function updateLessonTime() { updateTestTime(); }
                function updateTotalTime() {
                    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0'), s = (totalSeconds % 60).toString().padStart(2, '0');
                    const d = document.getElementById('total-timer-display'); if (d) d.textContent = `${m}:${s}`;
                }
                function updateTime() { updateTestTime(); } // backward compat alias

                function retryFailedOnly() {
                    const wrongs = [];
                    const oldMode = currentMode;
                    document.querySelectorAll('.card[id^="q-"]').forEach((card) => {
                        const idx = card.getAttribute('data-idx');
                        if (card.getAttribute('data-res') !== 'ok') wrongs.push(currentList[idx]);
                    });
                    closeModal('congrats-modal');
                    if (curVanMode) {
                        selectVanDay(curVanSection, curVanSub, curVanIdx, wrongs, oldMode);
                    } else {
                        selectDay(curLevel, curType, curDay, wrongs, oldMode);
                    }
                }

                function retryStarredOnly() {
                    const starredItems = currentList.filter(item => fcStarredKeys.has(_itemKey(item)));
                    if (starredItems.length === 0) return;
                    const oldMode = currentMode;
                    closeModal('congrats-modal');
                    if (curVanMode) {
                        selectVanDay(curVanSection, curVanSub, curVanIdx, starredItems, oldMode);
                    } else {
                        selectDay(curLevel, curType, curDay, starredItems, oldMode);
                    }
                }


                function getMaxModeForType() {
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') return 1;
                    if (curType === 'gram') return 2;
                    return 3; // voca
                }

                function goNextLesson() {
                    const nextMode = currentMode + 1;
                    closeModal('congrats-modal');
                    // Save current lesson time before switching
                    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
                    // Reset lesson timer for new lesson
                    seconds = 0; updateLessonTime();
                    // Switch to next mode (changeMode auto-starts timer)
                    changeMode(nextMode);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                function markDayComplete() {
                    if (!curLevel || !curType || !curDay || !db[curLevel]?.[curType]?.[curDay]) return;
                    const maxMode = getMaxModeForType();
                    for (let i = 0; i < maxMode; i++) db[curLevel][curType][curDay].done[i] = true;
                    saveToLocal();
                    renderSidebar();
                }

                function showCompletionScreen() {
                    if (totalTimerInterval) { clearInterval(totalTimerInterval); totalTimerInterval = null; }
                    const iframe = document.getElementById('bgm-iframe');
                    if (typeof ytBgmPlayer !== 'undefined' && ytBgmPlayer.pauseVideo) ytBgmPlayer.pauseVideo();
                    else if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    const totalOk = sessionScores.reduce((a, s) => a + s.ok, 0);
                    const totalQ = sessionScores.reduce((a, s) => a + s.total, 0);
                    const pct = totalQ > 0 ? Math.round((totalOk / totalQ) * 100) : 0;
                    let modeNames = { 0: 'Bài 1 (Cách đọc)', 1: 'Bài 2 (Nghĩa)', 2: 'Bài 3 (Tiếng Nhật)' };
                    if (curType === 'gram') {
                        modeNames = { 0: 'Bài 1 (Tìm nghĩa)', 1: 'Bài 2 (Tìm cấu trúc)' };
                    } else if (curType === 'voca_quiz' || curType === 'gram_quiz') {
                        modeNames = { 0: 'Trắc nghiệm' };
                    }
                    const toTime = s => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
                    const breakdownHtml = lessonTimes.map((t, i) => {
                        const sc = sessionScores[i];
                        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <span style="color:#94a3b8;font-weight:700;">${modeNames[sc?.mode ?? i] || 'Bài ' + (i + 1)}</span>
                    <span>${sc ? `<b style="color:#4ade80">${sc.ok}</b>/<span style="color:#94a3b8">${sc.total}</span>` : ''} &nbsp;<span style="color:var(--warning);font-weight:800;">${toTime(t)}</span></span>
                </div>`;
                    }).join('');

                    // Rating & custom motivational message
                    let rating, ratingColor, motivMsg;
                    if (pct === 100) {
                        rating = '🏆 TUYỆT VỜI!';
                        ratingColor = '#4ade80';
                        motivMsg = 'Bạn đã hoàn thành xuất sắc rồi, tiếp tục phát huy nhé! 🌟';
                    } else if (pct >= 90) {
                        rating = '🌟 XUẤT SẮC!';
                        ratingColor = '#fbbf24';
                        motivMsg = 'Bạn làm tốt lắm nhưng sẽ tốt hơn nếu bạn cố thêm để điểm cao hơn đấy 💪';
                    } else {
                        rating = pct >= 70 ? '👍 KHÁ TỐT!' : '💪 CỐ THÊM NHÉ!';
                        ratingColor = pct >= 70 ? '#60a5fa' : '#f87171';
                        motivMsg = 'Mình biết bạn cũng đã cố gắng rồi, nhưng bạn hãy cố gắng thêm xíu nữa nhé 🥰';
                    }

                    const overlay = document.createElement('div');
                    overlay.id = 'completion-overlay';
                    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);';
                    overlay.innerHTML = `
                <div style="background:linear-gradient(145deg,#1e293b,#0f172a);border:1px solid rgba(255,255,255,0.1);border-radius:28px;padding:40px 36px;max-width:500px;width:92%;box-shadow:0 30px 80px rgba(0,0,0,0.6);text-align:center;position:relative;">
                    <div style="font-size:60px;margin-bottom:12px;">🎉</div>
                    <h1 style="font-size:28px;color:${ratingColor};margin:0 0 8px;text-shadow:0 0 20px ${ratingColor}40;">${rating}</h1>
                    <div style="color:#cbd5e1;font-size:15px;font-weight:700;margin-bottom:24px;line-height:1.6;padding:0 8px;">${motivMsg}</div>

                    <div style="background:rgba(0,0,0,0.3);border-radius:16px;padding:16px 20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.06);">
                        <div style="display:flex;justify-content:center;gap:20px;margin-bottom:16px;">
                            <div style="text-align:center;"><div style="font-size:34px;font-weight:900;color:#4ade80;">${totalOk}</div><div style="font-size:11px;color:#64748b;font-weight:700;">ĐÚNG</div></div>
                            <div style="text-align:center;"><div style="font-size:34px;font-weight:900;color:#f87171;">${totalQ - totalOk}</div><div style="font-size:11px;color:#64748b;font-weight:700;">SAI</div></div>
                            <div style="text-align:center;"><div style="font-size:34px;font-weight:900;color:var(--warning);">${pct}%</div><div style="font-size:11px;color:#64748b;font-weight:700;">ĐIỂM</div></div>
                            <div style="text-align:center;"><div style="font-size:34px;font-weight:900;color:#a78bfa;">${toTime(totalSeconds)}</div><div style="font-size:11px;color:#64748b;font-weight:700;">TỔNG GIỜ</div></div>
                        </div>
                        <div style="text-align:left;">${breakdownHtml}</div>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <button onclick="markDayComplete(); document.getElementById('completion-overlay').remove(); confetti({particleCount:250,spread:80});" style="padding:16px;border-radius:14px;background:linear-gradient(135deg,#10b981,#059669);color:white;font-size:17px;font-weight:900;border:none;cursor:pointer;letter-spacing:1px;box-shadow:0 8px 20px rgba(16,185,129,0.4);">✅ HOÀN THÀNH NGÀY HỌC!</button>
                        <button onclick="document.getElementById('completion-overlay').remove(); selectDay(curLevel, curType, curDay);" style="padding:12px;border-radius:12px;background:rgba(255,255,255,0.05);color:#94a3b8;font-size:14px;font-weight:700;border:1px solid rgba(255,255,255,0.08);cursor:pointer;">🔄 Làm lại từ đầu</button>
                    </div>
                </div>`;
                    document.body.appendChild(overlay);
                    confetti({ zIndex: 9999, particleCount: 300, spread: 100, origin: { y: 0.6 } });
                }

                function processImport() {
                    // Guard: must have a day selected
                    if (!curLevel || !curType || !curDay) {
                        alert('⚠️ Bạn chưa chọn bài học!\nHãy click vào một ngày ở menu bên trái trước khi nhập dữ liệu.');
                        return;
                    }
                    if (!db[curLevel] || !db[curLevel][curType] || !db[curLevel][curType][curDay]) {
                        alert('⚠️ Lỗi: Bài học không tồn tại trong dữ liệu. Hãy thử chọn lại bài học.');
                        return;
                    }

                    try {
                        const data = parseData();
                        const valid = data.filter(d => d.valid);
                        if (!valid.length) { alert('⚠️ Không tìm thấy dữ liệu hợp lệ!\nHãy kiểm tra dấu phân cách hoặc định dạng dữ liệu.'); return; }
                        const imodeEl = document.querySelector('input[name="imode"]:checked');
                        const mode = imodeEl ? imodeEl.value : 'append';
                        if (mode === 'replace') {
                            if (!confirm(`Thay thế TOÀN BỘ ${db[curLevel][curType][curDay].list.length} mục hiện có bằng ${valid.length} mục mới?`)) return;
                            db[curLevel][curType][curDay].list = valid.map(d => d.entry);
                        } else {
                            db[curLevel][curType][curDay].list.push(...valid.map(d => d.entry));
                        }

                        let dupCount = 0;
                        const seen = new Set();
                        const uniqueList = [];
                        for (const item of db[curLevel][curType][curDay].list) {
                            const key = (item.c1 || item.q || '').trim().toLowerCase();
                            if (seen.has(key)) { dupCount++; } else { seen.add(key); uniqueList.push(item); }
                        }
                        if (dupCount > 0) {
                            if (confirm(`⚠️ Phát hiện ${dupCount} mục bị TRÙNG LẶP.\nBạn có muốn tự động xoá các mục trùng và chỉ giữ lại 1 không?`)) {
                                db[curLevel][curType][curDay].list = uniqueList;
                            }
                        }

                        saveToLocal();
                        renderSidebar();
                        // Update currentList BEFORE changeMode so buttons aren't grayed out
                        currentList = db[curLevel][curType][curDay].list;
                        // Determine best mode for current type
                        const bestMode = (curType === 'voca_quiz' || curType === 'gram_quiz') ? 2 : currentMode;
                        changeMode(bestMode);
                        document.getElementById('mode-box-container').style.display = 'block';
                        document.getElementById('submit-container').style.display = currentList.length > 0 ? 'flex' : 'none';
                        document.getElementById('rt-wrapper').style.display = currentList.length > 0 ? 'flex' : 'none';
                        document.getElementById('import-input').value = '';
                        updateImportPreview();
                        renderCurWordList();
                        updateGlobalStats();
                        alert(`✅ Đã nhập ${valid.length} mục! Tổng danh sách: ${db[curLevel][curType][curDay].list.length} mục.`);
                    } catch (e) {
                        console.error('processImport error:', e);
                        alert('❌ Lỗi khi nhập dữ liệu: ' + e.message);
                    }
                }

                function quickAddWord() {
                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz') gramType = 'quiz';
                    else if (isGram) gramType = document.querySelector('input[name="addGramType"]:checked')?.value || 'struct';

                    if (gramType === 'quiz') {
                        const q = document.getElementById('add-q').value.trim();
                        const ans = document.getElementById('add-ans').value.trim();
                        const w1 = document.getElementById('add-w1').value.trim();
                        const w2 = document.getElementById('add-w2').value.trim();
                        const w3 = document.getElementById('add-w3').value.trim();
                        const explain = document.getElementById('add-q-explain').value.trim();
                        if (!q || !ans) { alert("Nhập ít nhất câu hỏi và đáp án đúng!"); return; }
                        db[curLevel][curType][curDay].list.push({ gramType: 'quiz', q, ans, w1, w2, w3, count: 0, explain });
                        document.getElementById('add-q').value = '';
                        document.getElementById('add-ans').value = '';
                        document.getElementById('add-w1').value = '';
                        document.getElementById('add-w2').value = '';
                        document.getElementById('add-w3').value = '';
                        document.getElementById('add-q-explain').value = '';
                        document.getElementById('add-q').focus();
                    } else {
                        const c1 = document.getElementById('add-c1').value.trim();
                        const c2 = document.getElementById('add-c2').value.trim();
                        const c3 = document.getElementById('add-c3').value.trim();
                        const c4 = document.getElementById('add-c4').value.trim();
                        const c5 = document.getElementById('add-c5').value.trim();
                        const c6 = document.getElementById('add-c6').value.trim();
                        if (!c1) { alert("Ô đầu tiên không được để trống!"); return; }

                        const exists = db[curLevel][curType][curDay].list.some(w => (w.c1 || '').trim().toLowerCase() === c1.toLowerCase());
                        if (exists && !confirm(`⚠️ "${c1}" đã tồn tại trong bài này! Bạn vẫn muốn thêm?`)) return;

                        const entry = { count: 0, c1: c1, c2: c2, c3: c3 || c2, c4: c4, c5: c5, c6: c6 };
                        if (gramType === 'struct') entry.gramType = 'struct';
                        db[curLevel][curType][curDay].list.push(entry);
                        document.getElementById('add-c1').value = '';
                        document.getElementById('add-c2').value = '';
                        document.getElementById('add-c3').value = '';
                        document.getElementById('add-c4').value = '';
                        if (document.getElementById('add-c5')) document.getElementById('add-c5').value = '';
                        if (document.getElementById('add-c6')) document.getElementById('add-c6').value = '';
                        document.getElementById('add-c1').focus();
                    }
                    saveToLocal();
                    updateGlobalStats();
                    renderQuickAddList();
                    renderSidebar();

                    if (document.getElementById('quiz-container').innerHTML !== "") {
                        renderQuiz();
                    }

                    const btn = document.querySelector('#add-word-modal .btn-green');
                    const oldText = btn.innerText;
                    btn.innerHTML = '✅ ĐÃ LƯU!';
                    setTimeout(() => { btn.innerHTML = oldText; }, 900);
                }

                function renderQuickAddList() {
                    if (!curDay) return;
                    const list = db[curLevel][curType][curDay].list;
                    const wrap = document.getElementById('quick-add-list-wrap');
                    const tbody = document.getElementById('quick-add-tbody');
                    const countEl = document.getElementById('quick-add-count');
                    const thead = document.querySelector('#quick-add-table thead');
                    if (!wrap) return;
                    if (list.length === 0) { wrap.style.display = 'none'; return; }
                    wrap.style.display = 'block';
                    countEl.textContent = `(${list.length} từ)`;

                    const isGram = (curType === 'gram');
                    let gramType = 'voca';
                    if (curType === 'voca_quiz' || curType === 'gram_quiz') gramType = 'quiz';
                    else if (isGram) gramType = document.querySelector('input[name="addGramType"]:checked')?.value || 'struct';
                    const isQuiz = (gramType === 'quiz');

                    if (thead) {
                        if (isQuiz) {
                            thead.innerHTML = '<tr><th>#</th><th>Câu hỏi</th><th>ĐA Đúng</th><th>Các ĐA Sai</th><th>Giải thích</th></tr>';
                        } else if (isGram) {
                            thead.innerHTML = '<tr><th>#</th><th>Cấu trúc</th><th>Ý nghĩa tiếng việt</th></tr>';
                        } else {
                            thead.innerHTML = '<tr><th>#</th><th>Kanji/Từ</th><th>Cách đọc</th><th>Nghĩa</th></tr>';
                        }
                    }

                    // Hiện danh sách mới nhất ở trên cùng
                    tbody.innerHTML = [...list].reverse().map((w, i) => {
                        const realIdx = list.length - 1 - i;
                        const isNew = i === 0;
                        if (w.gramType === 'quiz') {
                            return `<tr style="${isNew ? 'background:rgba(34,197,94,0.08);' : ''}">
                    <td style="color:#475569">${realIdx + 1}</td>
                    <td><b style="color:${isNew ? 'var(--success)' : 'var(--warning)'}">${fT(w.q)}</b>${isNew ? ' <span style="font-size:10px;background:var(--success);color:#fff;padding:1px 6px;border-radius:10px;font-weight:800;">MỚI</span>' : ''}</td>
                    <td><span style="color:var(--success)">${fT(w.ans)}</span></td>
                    <td><span style="opacity:0.7">${fT(w.w1)} | ${fT(w.w2)} | ${fT(w.w3)}</span></td>
                    <td style="color:#f97316; font-size:12px;">${fT(w.explain || '')}</td>
                </tr>`;
                        } else if (isGram) {
                            return `<tr style="${isNew ? 'background:rgba(34,197,94,0.08);' : ''}">
                    <td style="color:#475569">${realIdx + 1}</td>
                    <td><b style="color:${isNew ? 'var(--success)' : 'var(--warning)'}">${fT(w.c1)}</b>${isNew ? ' <span style="font-size:10px;background:var(--success);color:#fff;padding:1px 6px;border-radius:10px;font-weight:800;">MỚI</span>' : ''}</td>
                    <td style="color:#94a3b8">${fT(w.c3 || '')}</td>
                </tr>`;
                        } else {
                            return `<tr style="${isNew ? 'background:rgba(34,197,94,0.08);' : ''}">
                    <td style="color:#475569">${realIdx + 1}</td>
                    <td><b style="color:${isNew ? 'var(--success)' : 'var(--warning)'}">${fT(w.c1)}</b>${isNew ? ' <span style="font-size:10px;background:var(--success);color:#fff;padding:1px 6px;border-radius:10px;font-weight:800;">MỚI</span>' : ''}</td>
                    <td>${fT(w.c2 || '')}</td>
                    <td style="color:#94a3b8">${fT(w.c3 || '')}</td>
                </tr>`;
                        }
                    }).join('');
                    // Scroll lên đầu để thấy từ mới nhất
                    const scrollEl = wrap.querySelector('div[style*="overflow-y"]');
                    if (scrollEl) scrollEl.scrollTop = 0;
                }

                function renderListTable() {
                    const listToRender = currentList || [];
                    document.getElementById('voca-list-body').innerHTML = listToRender.map((item, i) => {
                        const isGram = (curType === 'gram');
                        const isQuiz = item.gramType === 'quiz';

                        let text1, text2, text3;
                        if (isQuiz) {
                            text1 = fT(item.q);
                            text2 = fT(item.ans);
                            text3 = fT(item.w1 ? item.w1 + ' | ' + (item.w2 || '') + ' | ' + (item.w3 || '') : '');
                            const text4 = fT(item.explain || '');
                            return `<tr style="border-bottom:1px solid #334155"><td style="padding:10px; text-align: center;">${i + 1}</td><td style="font-weight:800; color:var(--warning); text-align: left; padding: 10px;">${text1}</td><td style="text-align: left; padding: 10px;">${text2}</td><td style="text-align: left; padding: 10px;">${text3}</td><td style="color:#f97316; font-size:12px; text-align: left; padding: 10px;">${text4}</td></tr>`;
                        } else if (isGram) {
                            text1 = fT(item.c1);
                            text2 = fT(item.c3);
                            text3 = '';
                        } else {
                            text1 = fT(item.c1);
                            text2 = fT(item.c2);
                            text3 = fT(item.c3);
                        }
                        const searchQ = isQuiz ? item.q : item.c1;

                        if (!isQuiz) {
                            if (isGram) {
                                return `<tr style="border-bottom:1px solid #334155"><td style="padding:10px; text-align: center;">${i + 1}</td><td style="font-weight:800; color:var(--warning); padding: 10px;"><div style="display:flex; align-items:center; gap:8px;">${text1} <a href="https://www.google.com/search?q=${encodeURIComponent((searchQ || '') + ' とは')}" target="_blank" style="text-decoration:none; display:inline-flex; align-items:center;" title="Tra cứu trên Google"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 6px rgba(244,114,182,0.8));"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></a></div></td><td colspan="2" style="text-align: left; padding: 10px;">${text2}</td></tr>`;
                            } else {
                                return `<tr style="border-bottom:1px solid #334155"><td style="padding:10px; text-align: center;">${i + 1}</td><td style="font-weight:800; color:var(--warning); padding: 10px;"><div style="display:flex; align-items:center; gap:8px;">${text1} <a href="https://www.google.com/search?q=${encodeURIComponent((searchQ || '') + ' とは')}" target="_blank" style="text-decoration:none; display:inline-flex; align-items:center;" title="Tra cứu trên Google"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 6px rgba(244,114,182,0.8));"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></a></div></td><td style="text-align: left; padding: 10px;">${text2}</td><td style="text-align: left; padding: 10px;">${text3}</td></tr>`;
                            }
                        }
                    }).join('');

                    const listHeaderRow = document.querySelector('#list-modal thead tr');
                    if (listHeaderRow) {
                        if (curType === 'voca_quiz' || curType === 'gram_quiz') {
                            listHeaderRow.innerHTML = '<th style="padding:10px; width:50px; text-align:center;">STT</th><th style="text-align:left; padding: 10px;">Câu hỏi</th><th style="text-align:left; padding: 10px;">ĐA Đúng</th><th style="text-align:left; padding: 10px;">Các ĐA Sai</th><th style="text-align:left; padding: 10px;">Giải thích</th>';
                        } else if (curType === 'gram') {
                            listHeaderRow.innerHTML = '<th style="padding:10px; width:50px; text-align:center;">STT</th><th style="text-align:left; padding: 10px;">Cấu trúc</th><th style="text-align:left; padding: 10px;" colspan="2">Ý nghĩa tiếng việt</th>';
                        } else {
                            listHeaderRow.innerHTML = '<th style="padding:10px; width:50px; text-align:center;">STT</th><th style="text-align:left; padding: 10px;">Kanji/Từ</th><th style="text-align:left; padding: 10px;">Cách đọc</th><th style="text-align:left; padding: 10px;">Nghĩa</th>';
                        }
                    }
                }

                function showHint(idx) {
                    const input = document.getElementById(`input-${idx}`);
                    input.value = input.getAttribute('data-ans');
                    input.classList.add('correct');
                    const card = document.getElementById(`q-${idx}`);
                    card.setAttribute('data-res', 'forgot');
                    card.style.borderLeftColor = '#a855f7';
                    const msg = document.getElementById(`msg-${idx}`);
                    msg.className = 'fb-msg show forgot';
                    msg.innerText = 'Từ này bạn quên à 😅';
                    // Track quên
                    if (currentList[idx]) trackForgot(currentList[idx]);
                    updateChart();
                }

                function exportListToPdf() {
                    if (!currentList || currentList.length === 0) {
                        alert("Danh sách trống!");
                        return;
                    }

                    const titleText = document.getElementById('view-title') ? document.getElementById('view-title').textContent.trim() : 'Danh Sách Học Tập';

                    let html = `
                    <html>
                    <head>
                        <title>${titleText}</title>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&family=Inter:wght@400;600&display=swap');
                            body { font-family: 'Inter', sans-serif; padding: 20px; color: #1e293b; background: white; }
                            .header { text-align: center; border-bottom: 3px solid #8b5cf6; padding-bottom: 10px; margin-bottom: 20px; }
                            h1 { font-family: 'Baloo 2', cursive; color: #6d28d9; font-size: 28px; margin: 0 0 5px 0; }
                            .meta { font-size: 14px; color: #64748b; font-weight: 600; }
                            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                            th { background-color: #8b5cf6; color: white; padding: 10px; text-align: left; font-size: 14px; border: 1px solid #7c3aed; }
                            td { padding: 10px; border: 1px solid #cbd5e1; font-size: 14px; }
                            tr:nth-child(even) { background-color: #f8fafc; }
                            @media print {
                                @page { margin: 15mm; size: A4; }
                                body { padding: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>${titleText}</h1>
                            <div class="meta">Tổng số: ${currentList.length} câu | Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}</div>
                        </div>
                        <table>
                            <thead>
                    `;

                    const hasC1 = currentList.some(it => it.c1 !== undefined);
                    if (hasC1) {
                        html += `<tr><th style="width:40px; text-align:center;">STT</th><th>Từ vựng / Cấu trúc</th><th>Cách đọc</th><th>Ý nghĩa</th></tr></thead><tbody>`;
                    } else {
                        html += `<tr><th style="width:40px; text-align:center;">STT</th><th>Câu hỏi</th><th>Đáp án</th></tr></thead><tbody>`;
                    }

                    currentList.forEach((item, index) => {
                        html += `<tr><td style="text-align:center; font-weight:bold;">${index + 1}</td>`;
                        if (item.c1 !== undefined) {
                            html += `<td>${item.c1 || ''}</td><td>${item.c2 || ''}</td><td>${item.c3 || ''}</td>`;
                        } else if (item.q !== undefined) {
                            html += `<td>${item.q || ''}</td><td>${item.ans || ''}</td>`;
                        } else {
                            html += `<td colspan="3">${JSON.stringify(item)}</td>`;
                        }
                        html += `</tr>`;
                    });

                    html += `</tbody></table></body></html>`;

                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);

                    iframe.contentWindow.document.open();
                    iframe.contentWindow.document.write(html);
                    iframe.contentWindow.document.close();

                    setTimeout(() => {
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                        setTimeout(() => { document.body.removeChild(iframe); }, 1000);
                    }, 500);
                }

                function exportListToTxt() {
                    if (!currentList || currentList.length === 0) {
                        alert("Danh sách trống!");
                        return;
                    }

                    let content = `DANH SÁCH HỌC TẬP\n`;
                    const titleText = document.getElementById('view-title') ? document.getElementById('view-title').textContent : 'Danh Sach';
                    content += `Bài: ${titleText.trim()}\n`;
                    content += `Tổng số: ${currentList.length} câu\n`;
                    content += `-------------------------\n\n`;

                    currentList.forEach((item, index) => {
                        let line = `${index + 1}. `;
                        if (item.c1 !== undefined) {
                            line += `${item.c1} | ${item.c2} | ${item.c3}`;
                        } else if (item.q !== undefined) {
                            line += `${item.q} => ${item.ans}`;
                        } else {
                            line += JSON.stringify(item);
                        }
                        line = line.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
                        content += line + "\n";
                    });

                    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    const fileName = titleText.replace(/[^a-zA-Z0-9_ -]/g, '').trim().replace(/\s+/g, '_') || 'DanhSach';
                    a.download = `${fileName}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }

                function removeDuplicates() {
                    const list = db[curLevel][curType][curDay].list;
                    if (list.length === 0) return;
                    const seen = new Set();
                    const uniqueList = [];
                    let dupCount = 0;
                    for (const item of list) {
                        const key = (item.c1 || item.q || '').trim().toLowerCase();
                        if (seen.has(key)) { dupCount++; } else { seen.add(key); uniqueList.push(item); }
                    }
                    if (dupCount === 0) {
                        alert("✅ Danh sách rất sạch! Không có từ nào bị trùng lặp.");
                        return;
                    }
                    if (confirm(`⚠️ Phát hiện ${dupCount} từ bị TRÙNG LẶP (Dựa trên cột Kanji/Từ).\nBạn có chắc chắn muốn xoá các từ trùng và chỉ giữ lại 1 từ không?`)) {
                        db[curLevel][curType][curDay].list = uniqueList;
                        currentList = uniqueList;
                        saveToLocal();
                        renderCurWordList();
                        renderListTable();
                        updateGlobalStats();
                        renderSidebar();
                        if (document.getElementById('quiz-container').innerHTML !== "") {
                            renderQuiz();
                            resetTimer();
                        }
                        alert(`✅ Đã xoá thành công ${dupCount} từ trùng lặp!`);
                    }
                }

                function markAllDone() {
                    const maxMode = getMaxModeForType();
                    if (confirm(`Bạn có chắc chắn muốn đánh dấu đã hoàn thành cả ${maxMode} bài cho ngày này không?`)) {
                        for (let i = 0; i < maxMode; i++) db[curLevel][curType][curDay].done[i] = true;
                        saveToLocal();
                        renderSidebar();
                        changeMode(currentMode);
                        document.getElementById('btn-mark-done').style.display = 'none';
                        document.getElementById('btn-unmark-done').style.display = 'inline-flex';
                        alert("✅ Đã đánh dấu hoàn thành 3 bài!");
                    }
                }

                function unmarkAllDone() {
                    if (confirm("Bạn muốn hủy bỏ trạng thái đã hoàn thành của ngày này?")) {
                        db[curLevel][curType][curDay].done = [false, false, false];
                        saveToLocal();
                        renderSidebar();
                        changeMode(currentMode);
                        document.getElementById('btn-mark-done').style.display = 'inline-flex';
                        document.getElementById('btn-unmark-done').style.display = 'none';
                        alert("❎ Đã huỷ trạng thái hoàn thành!");
                    }
                }

                function addDay(lv, ty) {
                    const name = prompt("Tên bài:");
                    if (name) {
                        db[lv][ty][name] = { list: [], done: [false, false, false] };
                        saveToLocal();
                        renderSidebar();
                        selectDay(lv, ty, name);
                    }
                }

                function deleteDay(lv, ty, day) {
                    if (confirm("Xóa?")) {
                        delete db[lv][ty][day];
                        saveToLocal();
                        renderSidebar();
                        updateGlobalStats();
                    }
                }

                function exportDayTxt(lv, ty, dayKey) {
                    const list = db[lv][ty][dayKey].list;
                    if (list.length === 0) { alert("Bài này chưa có từ nào để xuất!"); return; }

                    let content = "";
                    list.forEach((item) => {
                        content += `${(item.c1 || '')} / ${(item.c2 || '')} / ${(item.c3 || '')}\n`;
                    });

                    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${lv}_${ty}_${dayKey.replace(/ /g, '_')}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                }

                function exportFile() {
                    const dataStr = localStorage.getItem('mgao_v37_db');
                    if (!dataStr) { alert("Không có dữ liệu để xuất!"); return; }
                    const blob = new Blob([dataStr], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `TuVung_SaoLuu_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                }

                function importFile(e) {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = function (evt) {
                        try {
                            const data = evt.target.result;
                            const parsed = JSON.parse(data);
                            if (parsed && parsed.n1 && parsed.n2) {
                                if (confirm("⚠️ CẢNH BÁO: Dữ liệu hiện tại trên máy này sẽ bị GHI ĐÈ TOÀN BỘ bằng dữ liệu từ File mới.\nBạn có chắc chắn muốn phục hồi không?")) {
                                    if (!parsed.n3) { parsed.n3 = { voca: {}, voca_quiz: {}, gram: {} };["voca", "voca_quiz", "gram"].forEach(ty => { for (let i = 1; i <= 10; i++) parsed.n3[ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; }); }
                                    if (!parsed.bjt) { parsed.bjt = { voca: {}, voca_quiz: {}, gram: {} };["voca", "voca_quiz", "gram"].forEach(ty => { for (let i = 1; i <= 10; i++) parsed.bjt[ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; }); }
                                    ["n1", "n2", "n3", "bjt"].forEach(lv => { if (!parsed[lv].voca_quiz) { parsed[lv].voca_quiz = {}; for (let i = 1; i <= 10; i++) parsed[lv].voca_quiz[`Ngày ${i}`] = { list: [], done: [false, false, false] }; } });
                                    localStorage.setItem('mgao_v37_db', JSON.stringify(parsed));
                                    alert("✅ Phục hồi dữ liệu thành công! Màn hình sẽ tải lại.");
                                    location.reload();
                                }
                            } else {
                                alert("❌ File không đúng cấu trúc dữ liệu của ứng dụng!");
                            }
                        } catch (err) {
                            alert("❌ Đã xảy ra lỗi khi đọc File!");
                        }
                        e.target.value = '';
                    };
                    reader.readAsText(file);
                }

                function generateSyncLink() {
                    const dataStr = localStorage.getItem('mgao_v37_db');
                    if (!dataStr) { alert("Không có dữ liệu!"); return; }
                    if (window.location.protocol === 'file:') {
                        alert("⚠️ CẢNH BÁO:\nBạn đang mở file trực tiếp trên ổ cứng. Người khác sẽ KHÔNG THỂ truy cập link này!\n\n👉 Tính năng Link chỉ dùng được khi đưa file lên website. Hãy dùng tính năng XUẤT FILE nhé.");
                        return;
                    }
                    try {
                        const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(dataStr))));
                        const link = window.location.origin + window.location.pathname + "?sync=" + encoded;
                        if (link.length > 8000) {
                            alert("⚠️ Dữ liệu quá lớn, link vượt giới hạn cho phép. Vui lòng dùng tính năng XUẤT FILE.");
                            return;
                        }
                        navigator.clipboard.writeText(link).then(() => {
                            alert("✅ ĐÃ COPY LINK ĐỒNG BỘ!\n\nDán link gửi qua Zalo/Mess. Thiết bị khác bấm vào Link là tự động nhận dữ liệu!");
                        }).catch(() => {
                            prompt("Copy đường link sau:", link);
                        });
                    } catch (e) {
                        alert("❌ Lỗi tạo link: Dữ liệu quá lớn hoặc mã hoá lỗi.");
                    }
                }

                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape') {
                        // 1. Nếu có modal nào đang mở thì đóng lại
                        const modals = document.querySelectorAll('.modal');
                        let closedAny = false;
                        modals.forEach(m => {
                            if (m.style.display === 'flex' || m.style.display === 'block') {
                                m.style.display = 'none';
                                closedAny = true;
                            }
                        });
                        if (closedAny) return;

                        // 2. Nếu có màn hình hoàn thành đang mở thì đóng
                        const overlay = document.getElementById('completion-overlay');
                        if (overlay) {
                            overlay.remove();
                            return;
                        }

                        // 3. Nếu đang nhập text thì bỏ focus
                        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                            document.activeElement.blur();
                            return;
                        }

                        // 4. Nếu đang ở trong bài học (chưa phải màn hình home) thì hỏi thoát
                        const homeView = document.getElementById('home-view');
                        if (homeView && homeView.style.display === 'none') {
                            if (confirm("🚪 Bạn có muốn thoát bài học hiện tại và quay về trang chủ không?")) {
                                location.reload();
                            }
                        }
                    }
                });
                // ══════════════════════════════════════════
                // STARRED PERSISTENCE (fcStarred saved by c1/q key)
                // ══════════════════════════════════════════
                let fcStarredKeys = new Set(JSON.parse(localStorage.getItem('fc_starred_keys') || '[]'));

                function _itemKey(item) {
                    return (item.q || item.c1 || '').trim();
                }
                function saveFcStarred() {
                    localStorage.setItem('fc_starred_keys', JSON.stringify([...fcStarredKeys]));
                }

                // ══════════════════════════════════════════
                // WRONG / FORGOT COUNT TRACKING (per-item, saved in db or vanData localStorage)
                // ══════════════════════════════════════════
                function trackCorrect(item) {
                    item.count = (item.count || 0) + 1;
                    if (!curVanMode) saveToLocal();
                    else saveVanItemExtra(item);
                }
                function trackWrong(item) {
                    item.wrongCount = (item.wrongCount || 0) + 1;
                    if (!curVanMode) saveToLocal();
                    else saveVanItemExtra(item);
                }
                function trackForgot(item) {
                    item.forgotCount = (item.forgotCount || 0) + 1;
                    if (!curVanMode) saveToLocal();
                    else saveVanItemExtra(item);
                }
                function saveVanItemExtra(item) {
                    // For vanData items: persist count/wrongCount/forgotCount by c1/q key
                    const key = 'vanextra_' + _itemKey(item);
                    localStorage.setItem(key, JSON.stringify({ 
                        count: item.count || 0,
                        wrongCount: item.wrongCount || 0, 
                        forgotCount: item.forgotCount || 0 
                    }));
                }
                function loadVanItemExtra(item) {
                    const key = 'vanextra_' + _itemKey(item);
                    const saved = JSON.parse(localStorage.getItem(key) || 'null');
                    if (saved) { 
                        item.count = saved.count || 0;
                        item.wrongCount = saved.wrongCount || 0; 
                        item.forgotCount = saved.forgotCount || 0; 
                    }
                }

                // ══════════════════════════════════════════
                // CUSTOM QUIZ MODAL LOGIC
                // ══════════════════════════════════════════

                // chip helpers
                function cqToggleChip(el, group, activeClass) {
                    el.classList.toggle(activeClass);
                    cqRefresh();
                }
                function cqSingleSelect(el, group, activeClass) {
                    document.querySelectorAll(`[id^="${group}-"]`).forEach(c => c.classList.remove(activeClass));
                    el.classList.add(activeClass);
                }
                function cqIsActive(id) {
                    const el = document.getElementById(id);
                    if (!el) return false;
                    return el.className.includes('active');
                }
                function cqSelectAllLessons(val) {
                    document.querySelectorAll('#cq-lesson-list input[type=checkbox]').forEach(cb => cb.checked = val);
                    cqRefresh();
                }

                function openCustomQuizModal() {
                    const allLvs = ['n1', 'n2', 'n3', 'bjt', 'toeic', 'hsk'];
                    allLvs.forEach(l => {
                        const chip = document.getElementById('cq-lv-' + l);
                        if (chip) {
                            if (activeLevels.includes(l)) {
                                chip.style.display = 'inline-flex';
                                if (!chip.classList.contains('active')) chip.classList.add('active');
                            } else {
                                chip.style.display = 'none';
                                chip.classList.remove('active');
                            }
                        }
                    });

                    // Hide Van source if not JP
                    const vanSrcChip = document.getElementById('cq-src-van');
                    if (vanSrcChip) vanSrcChip.style.display = currentLang === 'jp' ? 'inline-flex' : 'none';

                    cqRefresh();
                    openModal('custom-quiz-modal');
                }

                // Build list of source entries matching current filters
                function cqGetSelectedLessons() {
                    return [...document.querySelectorAll('#cq-lesson-list input[type=checkbox]:checked')].map(cb => cb.value);
                }

                function cqRefresh() {
                    const useVan = cqIsActive('cq-src-van');
                    const useUser = cqIsActive('cq-src-user');
                    const lvs = activeLevels.filter(l => cqIsActive('cq-lv-' + l));
                    const types = [];
                    if (cqIsActive('cq-type-voca')) types.push('voca');
                    if (cqIsActive('cq-type-gram')) types.push('gram');
                    const isStruct = cqIsActive('cq-mode-struct');
                    const isQuiz = cqIsActive('cq-mode-quiz');

                    // Build lesson list
                    const listEl = document.getElementById('cq-lesson-list');
                    let lessons = []; // {id, label, items_struct, items_quiz, src}

                    // --- Góc của Bạn ---
                    if (useUser) {
                        lvs.forEach(lv => {
                            types.forEach(ty => {
                                const structTy = ty; // 'voca' or 'gram'
                                const quizTy = ty + '_quiz';
                                const lvLabel = { n1: 'N1', n2: 'N2', n3: 'N3', bjt: 'BJT', toeic: 'TOEIC', hsk: 'HSK' }[lv] || lv;
                                const tyLabel = ty === 'voca' ? 'Từ vựng' : 'Ngữ pháp';
                                if (db[lv]) {
                                    Object.keys(db[lv][structTy] || {}).forEach(dayKey => {
                                        const structItems = (db[lv][structTy][dayKey]?.list || []).filter(it => !it.gramType);
                                        const quizItems = (db[lv][quizTy]?.[dayKey]?.list || []).filter(it => it.gramType === 'quiz');
                                        if (structItems.length > 0 || quizItems.length > 0) {
                                            lessons.push({ id: `user|${lv}|${ty}|${dayKey}`, label: `[${lvLabel} ${tyLabel}] ${dayKey}`, structItems, quizItems, src: 'user' });
                                        }
                                    });
                                }
                            });
                        });
                    }

                    // --- Góc của Vân ---
                    if (useVan) {
                        const VAN_MAP = {
                            n1voca: { lvs: ['n1'], types: ['voca'], label: 'N1 Từ vựng' },
                            n2gram: { lvs: ['n2'], types: ['gram'], label: 'N2 Ngữ pháp' },
                            bjtvoca: { lvs: ['bjt'], types: ['voca'], label: 'BJT Từ vựng' }
                        };
                        Object.entries(VAN_MAP).forEach(([sectionKey, meta]) => {
                            if (!lvs.some(l => meta.lvs.includes(l))) return;
                            if (!types.some(t => meta.types.includes(t))) return;
                            const ty = meta.types[0];
                            const sectionData = vanData[sectionKey];
                            if (!sectionData) return;
                            sectionData.struct?.forEach((lesson, idx) => {
                                const items = lesson.list || [];
                                // pre-load extra stats
                                items.forEach(loadVanItemExtra);
                                if (items.length > 0)
                                    lessons.push({ id: `van|${sectionKey}|struct|${idx}`, label: `[Van ${meta.label}] ${lesson.name}`, structItems: items, quizItems: [], src: 'van' });
                            });
                            sectionData.quiz?.forEach((lesson, idx) => {
                                const items = lesson.list || [];
                                items.forEach(loadVanItemExtra);
                                if (items.length > 0)
                                    lessons.push({ id: `van|${sectionKey}|quiz|${idx}`, label: `[Van ${meta.label} TN] ${lesson.name}`, structItems: [], quizItems: items, src: 'van' });
                            });
                        });
                    }

                    // Remove empty & deduplicate ids
                    const seen = new Set();
                    lessons = lessons.filter(l => { if (seen.has(l.id)) return false; seen.add(l.id); return true; });

                    // Re-render lesson checklist preserving existing checked state
                    const prevChecked = new Set(cqGetSelectedLessons());
                    listEl.innerHTML = lessons.length === 0
                        ? `<div style="padding:12px; color:#475569; text-align:center; font-size:13px; font-style:italic;">Không có bài nào phù hợp với bộ lọc.</div>`
                        : lessons.map(l => {
                            const checked = prevChecked.size === 0 || prevChecked.has(l.id) ? 'checked' : '';
                            return `<label class="cq-lesson-item">
                        <input type="checkbox" value="${l.id}" ${checked} onchange="cqUpdateCount()">
                        <span>${l.label}</span>
                    </label>`;
                        }).join('');

                    // Store lesson map for count computation
                    window._cqLessons = lessons;
                    cqUpdateCount();
                }

                function cqFilterLessonUI() {
                    const txt = document.getElementById('cq-search-lesson').value.toLowerCase();
                    const items = document.querySelectorAll('.cq-lesson-item');
                    items.forEach(el => {
                        const label = el.querySelector('span').innerText.toLowerCase();
                        el.style.display = label.includes(txt) ? 'flex' : 'none';
                    });
                }

                function cqApplyRange() {
                    const startVal = parseInt(document.getElementById('cq-range-start').value);
                    const endVal = parseInt(document.getElementById('cq-range-end').value);
                    if (isNaN(startVal) || isNaN(endVal) || startVal > endVal) {
                        alert("Khoảng không hợp lệ! Vui lòng nhập số hợp lệ.");
                        return;
                    }

                    const items = document.querySelectorAll('.cq-lesson-item');
                    items.forEach(el => {
                        const input = el.querySelector('input');
                        const label = el.querySelector('span').innerText;

                        const matches = label.match(/\d+/g);
                        if (matches && matches.length > 0) {
                            const lastNum = parseInt(matches[matches.length - 1]);
                            if (lastNum >= startVal && lastNum <= endVal) {
                                input.checked = true;
                            } else {
                                input.checked = false;
                            }
                        } else {
                            input.checked = false;
                        }
                    });
                    cqUpdateCount();
                }

                function cqUpdateCount() {
                    const lessons = window._cqLessons || [];
                    const selected = new Set(cqGetSelectedLessons());
                    const filterWrong = cqIsActive('cq-f-wrong');
                    const filterForgot = cqIsActive('cq-f-forgot');
                    const filterStar = cqIsActive('cq-f-star');
                    const isStruct = cqIsActive('cq-mode-struct');
                    const isQuiz = cqIsActive('cq-mode-quiz');

                    let total = 0;
                    lessons.filter(l => selected.has(l.id)).forEach(l => {
                        const itemsS = applySpecialFilters(l.structItems || [], filterWrong, filterForgot, filterStar);
                        const itemsQ = applySpecialFilters(l.quizItems || [], filterWrong, filterForgot, filterStar);
                        if (isStruct) total += itemsS.length;
                        else if (isQuiz) total += itemsQ.length;
                        else total += itemsS.length + itemsQ.length;
                    });

                    document.getElementById('cq-count').textContent = total;
                    const sel = lessons.filter(l => selected.has(l.id)).length;
                    document.getElementById('cq-detail').textContent =
                        total > 0 ? `Từ ${sel} bài được chọn` : 'Không có câu/từ phù hợp';
                }

                function applySpecialFilters(items, filterWrong, filterForgot, filterStar) {
                    if (!filterWrong && !filterForgot && !filterStar) return items;
                    return items.filter(item => {
                        if (filterWrong && (item.wrongCount || 0) > 2) return true;
                        if (filterForgot && (item.forgotCount || 0) > 2) return true;
                        if (filterStar && fcStarredKeys.has(_itemKey(item))) return true;
                        return false;
                    });
                }

                function openCustomQuiz(forceMode) {
                    const lessons = window._cqLessons || [];
                    const selected = new Set(cqGetSelectedLessons());
                    const filterWrong = cqIsActive('cq-f-wrong');
                    const filterForgot = cqIsActive('cq-f-forgot');
                    const filterStar = cqIsActive('cq-f-star');

                    const wantStruct = forceMode === 'struct';
                    const wantQuiz = forceMode === 'quiz';

                    let finalList = [];
                    lessons.filter(l => selected.has(l.id)).forEach(l => {
                        if (wantStruct) {
                            finalList.push(...applySpecialFilters(l.structItems || [], filterWrong, filterForgot, filterStar));
                        } else if (wantQuiz) {
                            finalList.push(...applySpecialFilters(l.quizItems || [], filterWrong, filterForgot, filterStar));
                        }
                    });

                    if (finalList.length === 0) {
                        alert('⚠️ Không có câu/từ nào phù hợp với bộ lọc đã chọn!\nVui lòng thử lại với bộ lọc khác.');
                        return;
                    }

                    // Xác định curType để renderQuiz hoạt động đúng
                    const hasQuizItems = finalList.some(it => it.gramType === 'quiz');
                    const hasGramItems = finalList.some(it => !it.gramType && it.c1 && !it.c2);
                    let detectedType;
                    if (wantQuiz && hasQuizItems) {
                        // check if gram or voca quiz
                        detectedType = 'voca_quiz'; // default; will render correctly either way
                    } else if (hasGramItems) {
                        detectedType = 'gram';
                    } else {
                        detectedType = 'voca';
                    }

                    closeModal('custom-quiz-modal');

                    // Temporarily override state for rendering
                    curVanMode = false;
                    updateVanFab();
                    curLevel = 'custom';
                    curType = detectedType;
                    curDay = 'Đề tuỳ ý';
                    currentList = finalList;

                    // Show main area
                    document.getElementById('view-title').textContent = `🎲 Đề Tuỳ Ý (${finalList.length} câu)`;
                    const startBtn = document.getElementById('btn-start-lesson');
                    if (startBtn) startBtn.style.display = 'none';
                    document.getElementById('journey-card').style.display = 'none';
                    const mainTimerBox = document.getElementById('main-timer-box');
                    if (mainTimerBox) mainTimerBox.style.display = 'block';

                    // Hide group-1 (data management buttons)
                    const g1 = document.getElementById('group-1');
                    if (g1) g1.style.display = 'none';
                    const g2a = document.getElementById('group-2a');
                    if (g2a) g2a.style.display = 'block';
                    const g2b = document.getElementById('group-2b');
                    if (g2b) g2b.style.display = 'block';
                    const g3Title = document.getElementById('group-3-title');
                    if (g3Title) g3Title.innerHTML = '📝 LÀM BÀI';

                    ['btn-add-word', 'btn-import', 'btn-edit-list'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.style.display = 'none';
                    });
                    ['btn-show-list', 'btn-shuffle'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.style.display = 'inline-flex';
                    });
                    ['btn-flashcard', 'btn-match-game', 'btn-reaction-game'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.style.display = wantStruct ? 'inline-flex' : 'none';
                    });

                    document.getElementById('mode-box-container').style.display = 'block';
                    document.getElementById('submit-container').style.display = 'flex';
                    document.getElementById('rt-wrapper').style.display = 'flex';

                    const btnMark = document.getElementById('btn-mark-done');
                    const btnUnmark = document.getElementById('btn-unmark-done');
                    if (btnMark) btnMark.style.display = 'none';
                    if (btnUnmark) btnUnmark.style.display = 'none';

                    setBreadcrumb('Đề Tuỳ Ý', false);

                    let bestMode = 0;
                    if (wantQuiz) bestMode = 2; // renders quiz layout
                    changeMode(bestMode);
                    resetLessonTimer();
                    resetTotalTimer();
                    lessonTimes = [];
                    sessionScores = [];

                    // Show/hide reaction game button (only for voca/gram - not quiz type)
                    const btnRg = document.getElementById('btn-reaction-game');
                    if (btnRg) btnRg.style.display = (listOverride || !isVoca) ? 'none' : 'inline-flex';

                    // Close sidebar on mobile
                    if (window.innerWidth <= 480) {
                        document.body.classList.add('sidebar-hidden');
                        localStorage.setItem('sidebar_hidden', '1');
                    }
                }
