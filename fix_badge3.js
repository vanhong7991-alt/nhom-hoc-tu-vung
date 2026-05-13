const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Use indexOf + slice to replace lines 5471-5473
// Find the unique flex div wrapper before the badge
const startMarker = "                     <div style=\"display:flex; gap:12px;\">\r\n                         ${!ans.trim()";
const endMarker = "                         <button class=\"btn btn-gray\" style=\"width:70px; font-size:24px;\" onclick=\"showHint(${i})\">👁️</button>\r\n                     </div>";

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker, startIdx);

if (startIdx >= 0 && endIdx >= 0) {
    console.log('Found block from char', startIdx, 'to', endIdx + endMarker.length);
    
    // New block: badge gets eye button moved INSIDE the ternary (only for normal input), badge is full-width centered, no eye button
    const newBlock = `                     <div style=\"display:flex; gap:12px;\">\r\n                         \${!ans.trim() ? '<div id=\"input-'+i+'\" data-ans=\"\" data-skip=\"true\" style=\"display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,rgba(251,191,36,0.13),rgba(251,191,36,0.06));border:1.5px dashed #fbbf24;border-radius:12px;padding:10px 18px;color:#fde68a;font-size:14px;font-weight:700;text-shadow:0 0 8px rgba(251,191,36,0.4);box-shadow:0 2px 10px rgba(251,191,36,0.12);width:100%;text-align:center;\"><span style=\"font-size:16px;\">🌺</span>Kh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc n\\u00ean b\\u1ea1n k c\\u1ea7n \\u0111i\\u1ec1n n\\u00e8</div>' : '<input type=\"text\" id=\"input-'+i+'\" data-ans=\"'+ans+'\" oninput=\"check('+i+')\" onkeydown=\"handleKey(event, '+i+')\" autocomplete=\"off\" placeholder=\"...\"><button class=\"btn btn-gray\" style=\"width:70px; font-size:24px;\" onclick=\"showHint('+i+')\">👁️</button>'}\r\n                     </div>`;
    
    content = content.slice(0, startIdx) + newBlock + content.slice(endIdx + endMarker.length);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Done!');
} else {
    console.log('Markers not found. startIdx:', startIdx, 'endIdx:', endIdx);
}
