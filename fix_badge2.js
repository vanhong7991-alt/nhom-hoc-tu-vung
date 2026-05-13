const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Find the no-reading div block and the hint button line
const oldBlock = `<div style=\"display:flex; gap:12px;\"\u003e\r\n                         \${!ans.trim() ? '\u003cdiv id=\"input-'+i+'\" data-ans=\"\" data-skip=\"true\" style=\"display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.06));border:1.5px dashed #fbbf24;border-radius:10px;padding:7px 14px;color:#fde68a;font-size:13.5px;font-weight:700;letter-spacing:0.3px;text-shadow:0 0 8px rgba(251,191,36,0.4);box-shadow:0 2px 8px rgba(251,191,36,0.1);width:fit-content;\"\u003e\u003cspan style=\"font-size:15px;\"\u003e\u26a0\ufe0f\u003c/span\u003eKh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc n\\u00ean b\\u1ea1n k c\\u1ea7n \\u0111i\\u1ec1n n\\u00e8\u003c/div\u003e' : '\u003cinput type=\"text\" id=\"input-'+i+'\" data-ans=\"'+ans+'\" oninput=\"check('+i+')\" onkeydown=\"handleKey(event, '+i+')\" autocomplete=\"off\" placeholder=\"...\"\u003e'}\r\n                         \u003cbutton class=\"btn btn-gray\" style=\"width:70px; font-size:24px;\" onclick=\"showHint(\${i})\"\u003e\ud83d\udc41\ufe0f\u003c/button\u003e`;

const newBlock = `<div style=\"display:flex; gap:12px;\"\u003e\r\n                         \${!ans.trim() ? '\u003cdiv id=\"input-'+i+'\" data-ans=\"\" data-skip=\"true\" style=\"display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,rgba(251,191,36,0.13),rgba(251,191,36,0.06));border:1.5px dashed #fbbf24;border-radius:12px;padding:10px 18px;color:#fde68a;font-size:14px;font-weight:700;letter-spacing:0.3px;text-shadow:0 0 8px rgba(251,191,36,0.4);box-shadow:0 2px 10px rgba(251,191,36,0.12);width:100%;text-align:center;\"\u003e\u003cspan style=\"font-size:16px;\"\u003e\ud83c\udf3a\u003c/span\u003eKh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc n\\u00ean b\\u1ea1n k c\\u1ea7n \\u0111i\\u1ec1n n\\u00e8\u003c/div\u003e' : '\u003cinput type=\"text\" id=\"input-'+i+'\" data-ans=\"'+ans+'\" oninput=\"check('+i+')\" onkeydown=\"handleKey(event, '+i+')\" autocomplete=\"off\" placeholder=\"...\"\u003e\u003cbutton class=\"btn btn-gray\" style=\"width:70px; font-size:24px;\" onclick=\"showHint('+i+')\"\u003e\ud83d\udc41\ufe0f\u003c/button\u003e'}`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Done!');
} else {
    // Find partial to debug
    const idx = content.indexOf('data-skip=\\"true\\"');
    console.log('data-skip found at:', idx);
    if (idx >= 0) console.log('Context:', JSON.stringify(content.slice(idx - 30, idx + 100)));
}
