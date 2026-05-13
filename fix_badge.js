const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Find the disabled input in renderQuiz and replace with a styled badge
const oldInput = `'\u003cinput type=\"text\" id=\"input-'+i+'\" data-ans=\"\" data-skip=\"true\" disabled style=\"background:rgba(30,41,59,0.5);color:#475569;cursor:not-allowed;border:2px dashed #334155;opacity:0.55;\" placeholder=\"\\u2014 Kh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc \\u2014\"\u003e'`;

const newBadge = `'<div id=\"input-'+i+'\" data-ans=\"\" data-skip=\"true\" style=\"display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.06));border:1.5px dashed #fbbf24;border-radius:10px;padding:7px 14px;color:#fde68a;font-size:13.5px;font-weight:700;letter-spacing:0.3px;text-shadow:0 0 8px rgba(251,191,36,0.4);box-shadow:0 2px 8px rgba(251,191,36,0.1);width:fit-content;\"><span style=\"font-size:15px;\">⚠️</span>Kh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc n\\u00ean b\\u1ea1n k c\\u1ea7n \\u0111i\\u1ec1n n\\u00e8</div>'`;

if (content.includes(oldInput)) {
    content = content.replace(oldInput, newBadge);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Done!');
} else {
    // Try finding it differently
    const idx = content.indexOf('data-skip=\\"true\\" disabled');
    console.log('disabled input at char:', idx);
    if (idx >= 0) console.log('Context:', JSON.stringify(content.slice(idx - 80, idx + 200)));
}
