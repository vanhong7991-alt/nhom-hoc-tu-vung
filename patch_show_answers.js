const fs = require('fs');
let html = fs.readFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// ================================================================
// FIX 1: submitQuiz - struct WRONG branch
// Remove answer from fb-msg, append .answer-reveal div to card instead
// ================================================================
const structWrongOld = `                            else {
                                failed++;
                                if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');
                                if (input) input.classList.add('error-shake');
                                card.style.borderLeftColor = 'var(--danger)';
                                // Hiển thị đáp án đúng bên dưới input
                                const _origAns = input ? input.getAttribute('data-ans').trim() : '';
                                const _msgEl = document.getElementById('msg-' + idx);
                                if (_msgEl && _origAns) { _msgEl.className = 'fb-msg show ng'; _msgEl.innerHTML = 'Sai rồi tiếc quá 😢 &nbsp;&nbsp;✅ <b style="color:#4ade80">' + _origAns + '</b>'; }
                            }`;

const structWrongNew = `                            else {
                                failed++;
                                if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');
                                if (input) input.classList.add('error-shake');
                                card.style.borderLeftColor = 'var(--danger)';
                                // Hiển thị msg đỏ đơn giản
                                const _msgEl2 = document.getElementById('msg-' + idx);
                                if (_msgEl2) { _msgEl2.className = 'fb-msg show ng'; _msgEl2.innerText = 'Sai rồi tiếc quá 😢'; }
                                // Hiển thị .answer-reveal riêng bên dưới card
                                const _origAns = input ? input.getAttribute('data-ans').trim() : '';
                                if (_origAns) {
                                    let _solEl2 = card.querySelector('.answer-reveal');
                                    if (!_solEl2) { _solEl2 = document.createElement('div'); _solEl2.className = 'answer-reveal'; card.appendChild(_solEl2); }
                                    _solEl2.innerHTML = '✅ Đáp án đúng: <b>' + _origAns + '</b>';
                                }
                            }`;

if (html.includes(structWrongOld)) { html = html.replace(structWrongOld, structWrongNew); console.log('Fix 1 OK - submitQuiz struct wrong branch'); }
else { console.log('Fix 1 NOT FOUND'); }

// ================================================================
// FIX 2: check() function - isSubmit wrong branch
// Remove answer from fb-msg, append .answer-reveal div to card instead
// ================================================================
const checkWrongOld = `                            msg.className = 'fb-msg show ng';
                            const _ans_display = input.getAttribute('data-ans').trim();
                            msg.innerHTML = 'Sai rồi tiếc quá 😢 &nbsp;&nbsp;✅ <b style="color:#4ade80">' + _ans_display + '</b>';`;

const checkWrongNew = `                            msg.className = 'fb-msg show ng';
                            msg.innerText = 'Sai rồi tiếc quá 😢';
                            // Hiển thị .answer-reveal riêng bên dưới card
                            const _ans_display = input.getAttribute('data-ans').trim();
                            if (_ans_display) {
                                let _solEl3 = card.querySelector('.answer-reveal');
                                if (!_solEl3) { _solEl3 = document.createElement('div'); _solEl3.className = 'answer-reveal'; card.appendChild(_solEl3); }
                                _solEl3.innerHTML = '✅ Đáp án đúng: <b>' + _ans_display + '</b>';
                            }`;

if (html.includes(checkWrongOld)) { html = html.replace(checkWrongOld, checkWrongNew); console.log('Fix 2 OK - check() wrong branch'); }
else { console.log('Fix 2 NOT FOUND'); }

// ================================================================
// FIX 3: Add showAllAnswers() function and wire it to "Đóng và xem đáp án"
// Insert showAllAnswers() right before retryFailedOnly()
// ================================================================
const retryFnOld = `                function retryFailedOnly() {`;

const retryFnNew = `                // ===== SHOW ALL ANSWERS on modal close =====
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
                            // Show msg if not yet shown
                            const msg = document.getElementById('msg-' + idx);
                            if (msg && !msg.classList.contains('show')) {
                                msg.className = 'fb-msg show ng'; msg.innerText = 'SAI RỒI! ❌';
                            }
                            // Show answer-reveal
                            const _correctBtn = wrap.querySelector('.quiz-opt[data-correct="true"]');
                            const _correctText = _correctBtn ? _correctBtn.textContent.trim() : item.ans;
                            let _solEl = card.querySelector('.answer-reveal');
                            if (!_solEl && _correctText) {
                                _solEl = document.createElement('div');
                                _solEl.className = 'answer-reveal';
                                card.appendChild(_solEl);
                            }
                            if (_solEl && _correctText) _solEl.innerHTML = '✅ Đáp án đúng: <b>' + _correctText + '</b>';
                            // Show explain
                            const exp = document.getElementById('explain-' + idx);
                            if (exp) exp.style.display = 'block';

                        } else {
                            // Từ đơn / Struct: hiện answer-reveal cho câu sai / chưa điền
                            if (res === 'ok') return;
                            const input = document.getElementById('input-' + idx);
                            if (!input) return;
                            const origAns = input.getAttribute('data-ans').trim();
                            // Lock input
                            input.style.pointerEvents = 'none';
                            card.style.borderLeftColor = 'var(--danger)';
                            // Show msg
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

                function retryFailedOnly() {`;

if (html.includes(retryFnOld)) { html = html.replace(retryFnOld, retryFnNew); console.log('Fix 3 OK - showAllAnswers() added'); }
else { console.log('Fix 3 NOT FOUND - retryFailedOnly not found'); }

// ================================================================
// FIX 4: Wire showAllAnswers() to "Đóng và xem đáp án" button
// The button's onclick is: () => closeModal('congrats-modal')
// Change to: () => { showAllAnswers(); closeModal('congrats-modal'); }
// ================================================================
const closeOnclickOld = `btnClose.innerText = "ĐÓNG VÀ XEM ĐÁP ÁN"; btnClose.onclick = () => closeModal('congrats-modal');`;
const closeOnclickNew = `btnClose.innerText = "ĐÓNG VÀ XEM ĐÁP ÁN"; btnClose.onclick = () => { showAllAnswers(); closeModal('congrats-modal'); };`;

const occurrences = (html.match(new RegExp(closeOnclickOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log('Fix 4 - occurrences of close onclick:', occurrences);

if (html.includes(closeOnclickOld)) {
    html = html.replaceAll(closeOnclickOld, closeOnclickNew);
    console.log('Fix 4 OK - close button wired to showAllAnswers()');
} else { console.log('Fix 4 NOT FOUND'); }

fs.writeFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', html);
console.log('\nAll done. File saved.');
