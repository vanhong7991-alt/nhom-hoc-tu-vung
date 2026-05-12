const fs = require('fs');
let c = fs.readFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// === CHANGE 1: submitQuiz - quiz wrong branch: show correct answer badge ===
const q_old = "                                if (msg) { msg.className = 'fb-msg show ng'; msg.innerText = \"SAI RỒI! ❌\"; }\r\n                            }\r\n                        } else {";
const q_new = "                                if (msg) { msg.className = 'fb-msg show ng'; msg.innerText = \"SAI RỒI! ❌\"; }\r\n                                // Hiển thị đáp án đúng\r\n                                const _correctBtn = wrap.querySelector('.quiz-opt[data-correct=\"true\"]');\r\n                                const _correctText = _correctBtn ? _correctBtn.textContent.trim() : currentList[idx].ans;\r\n                                let _solEl = wrap.parentElement.querySelector('.answer-reveal');\r\n                                if (!_solEl) { _solEl = document.createElement('div'); _solEl.className = 'answer-reveal'; wrap.parentElement.appendChild(_solEl); }\r\n                                _solEl.innerHTML = '✅ Đáp án đúng: <b>' + _correctText + '</b>';\r\n                            }\r\n                        } else {";

if (c.includes(q_old)) { c = c.replace(q_old, q_new); console.log('Change 1 OK'); }
else { console.log('Change 1 NOT FOUND'); console.log('Expected snippet:'); const idx = c.indexOf("msg.innerText = \"SAI RỒI! ❌\"}"); console.log(JSON.stringify(c.slice(idx-5, idx+150))); }

// === CHANGE 2: submitQuiz - struct wrong branch: show correct answer ===
const s_old = "                            else {\r\n                                failed++;\r\n                                if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');\r\n                                if (input) input.classList.add('error-shake');\r\n                                card.style.borderLeftColor = 'var(--danger)';\r\n                            }";
const s_new = "                            else {\r\n                                failed++;\r\n                                if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');\r\n                                if (input) input.classList.add('error-shake');\r\n                                card.style.borderLeftColor = 'var(--danger)';\r\n                                // Hiển thị đáp án đúng bên dưới input\r\n                                const _origAns = input ? input.getAttribute('data-ans').trim() : '';\r\n                                const _msgEl = document.getElementById('msg-' + idx);\r\n                                if (_msgEl && _origAns) { _msgEl.className = 'fb-msg show ng'; _msgEl.innerHTML = 'Sai rồi tiếc quá 😢 &nbsp;&nbsp;✅ <b style=\"color:#4ade80\">' + _origAns + '</b>'; }\r\n                            }";

if (c.includes(s_old)) { c = c.replace(s_old, s_new); console.log('Change 2 OK'); }
else { console.log('Change 2 NOT FOUND'); }

// === CHANGE 3: check() function - isSubmit wrong: show correct answer ===
const ck_old = "                            msg.className = 'fb-msg show ng';\r\n                            msg.innerText = 'Sai rồi tiếc quá 😢';";
const ck_new = "                            msg.className = 'fb-msg show ng';\r\n                            const _ans_display = input.getAttribute('data-ans').trim();\r\n                            msg.innerHTML = 'Sai rồi tiếc quá 😢 &nbsp;&nbsp;✅ <b style=\"color:#4ade80\">' + _ans_display + '</b>';";

if (c.includes(ck_old)) { c = c.replace(ck_old, ck_new); console.log('Change 3 OK'); }
else { console.log('Change 3 NOT FOUND'); }

fs.writeFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', c);
console.log('Done writing.');
