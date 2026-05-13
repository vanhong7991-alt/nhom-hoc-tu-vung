const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');
let count = 0;

// ── PATCH 1: renderQuiz - disable input when ans is empty ──
// Old: <input type="text" id="input-${i}" data-ans="${ans}" oninput="check(${i})"...
// New: conditional disabled input when ans is empty
const p1old = `\`                     <input type="text" id="input-\${i}" data-ans="\${ans}" oninput="check(\${i})" onkeydown="handleKey(event, \${i})" autocomplete="off" placeholder="...">\``;
const p1new = `\`                     \${!ans.trim() ? \`<input type="text" id="input-\${i}" data-ans="" data-skip="true" disabled style="background:rgba(30,41,59,0.5);color:#475569;cursor:not-allowed;border:2px dashed #334155;opacity:0.55;" placeholder="— Không có cách đọc —">\` : \`<input type="text" id="input-\${i}" data-ans="\${ans}" oninput="check(\${i})" onkeydown="handleKey(event, \${i})" autocomplete="off" placeholder="...">\`}\``;

// Actually these are inside template literals in JS, let's use a simpler pattern
// Looking at line 5472: the literal text in file
const p1_find = `<input type="text" id="input-\${i}" data-ans="\${ans}" oninput="check(\${i})" onkeydown="handleKey(event, \${i})" autocomplete="off" placeholder="...">`;
const p1_replace = `\${!ans.trim() ? '<input type="text" id="input-'+i+'" data-ans="" data-skip="true" disabled style="background:rgba(30,41,59,0.5);color:#475569;cursor:not-allowed;border:2px dashed #334155;opacity:0.55;" placeholder="\\u2014 Kh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc \\u2014">' : '<input type="text" id="input-'+i+'" data-ans="'+ans+'" oninput="check('+i+')" onkeydown="handleKey(event, '+i+')" autocomplete="off" placeholder="...">'}`;

if (content.includes(p1_find)) {
    content = content.replace(p1_find, p1_replace);
    count++; console.log('Patch 1 OK: disabled input when no ans');
} else { console.log('Patch 1 FAIL: pattern not found'); }

// ── PATCH 2: check() - return early for disabled/skip inputs ──
const p2_find = `function check(idx, isSubmit = false) {\r\n                    const input = document.getElementById(\`input-\${idx}\`), val = input.value.trim().toLowerCase(), ans = input.getAttribute('data-ans').toLowerCase(), card = document.getElementById(\`q-\${idx}\`);`;
const p2_replace = `function check(idx, isSubmit = false) {\r\n                    const input = document.getElementById(\`input-\${idx}\`);\r\n                    if (!input || input.disabled || input.getAttribute('data-skip') === 'true') return; // bỏ qua câu không có đáp án\r\n                    const val = input.value.trim().toLowerCase(), ans = input.getAttribute('data-ans').toLowerCase(), card = document.getElementById(\`q-\${idx}\`);`;

if (content.includes(p2_find)) {
    content = content.replace(p2_find, p2_replace);
    count++; console.log('Patch 2 OK: check() guard');
} else { console.log('Patch 2 FAIL: pattern not found'); }

// ── PATCH 3: submitQuiz else-branch - skip instead of counting ok ──
const p3_find = `// Câu không có đáp án định nghĩa và chưa điền → bỏ qua (tính đúng)\r\n                             else if (ans === '' && val === '') {\r\n                                 ok++;\r\n                                 trackCorrect(currentList[idx]);\r\n                                 card.setAttribute('data-res', 'ok');\r\n                                 if (input) input.classList.add('correct');\r\n                                 card.style.borderLeftColor = 'var(--success)';\r\n                                 const _msgSkip = document.getElementById('msg-' + idx);\r\n                                 if (_msgSkip) { _msgSkip.className = 'fb-msg show ok'; _msgSkip.innerText = 'Tuyệt vời, chính xác! 🎉'; }\r\n                             }`;
const p3_replace = `// Câu không có cách đọc → bỏ qua, không tính điểm\r\n                             else if (ans === '' && val === '') {\r\n                                 skipped++;\r\n                                 card.setAttribute('data-res', 'skip');\r\n                                 card.style.borderLeftColor = '#334155';\r\n                                 if (input) { input.style.opacity = '0.4'; }\r\n                             }`;

if (content.includes(p3_find)) {
    content = content.replace(p3_find, p3_replace);
    count++; console.log('Patch 3 OK: submitQuiz skip branch');
} else { console.log('Patch 3 FAIL: pattern not found'); }

// ── PATCH 4: add skipped counter before forEach in submitQuiz ──
const p4_find = `let ok = 0, failed = 0;\r\n                    const cards = document.querySelectorAll('.card[id^=\"q-\"]');\r\n                    const total = cards.length;\r\n                    if (total === 0) { alert(\"Không có câu hỏi nào để chấm!\"); return; }`;
const p4_replace = `let ok = 0, failed = 0, skipped = 0;\r\n                    const cards = document.querySelectorAll('.card[id^=\"q-\"]');\r\n                    const total = cards.length;\r\n                    if (total === 0) { alert(\"Không có câu hỏi nào để chấm!\"); return; }`;

if (content.includes(p4_find)) {
    content = content.replace(p4_find, p4_replace);
    count++; console.log('Patch 4 OK: skipped counter added');
} else { console.log('Patch 4 FAIL: pattern not found'); }

// ── PATCH 5: adjust percent to exclude skipped ──
const p5_find = `const percent = (ok / total) * 100;`;
const p5_replace = `const activeTotal = total - skipped;\r\n                    const percent = activeTotal > 0 ? (ok / activeTotal) * 100 : 100;`;

// Only replace the first occurrence (in submitQuiz)
const p5_idx = content.indexOf(p5_find);
if (p5_idx >= 0) {
    content = content.slice(0, p5_idx) + p5_replace + content.slice(p5_idx + p5_find.length);
    count++; console.log('Patch 5 OK: percent excludes skipped');
} else { console.log('Patch 5 FAIL: pattern not found'); }

fs.writeFileSync(path, content, 'utf8');
console.log(`\nDone! Applied ${count}/5 patches.`);
