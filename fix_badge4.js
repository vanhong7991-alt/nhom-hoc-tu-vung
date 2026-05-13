const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Use the known char position 308767 - find the whole block to replace
// Find the wrapping div before badge
const idx = content.indexOf('showHint(${i})');
console.log('showHint block at:', idx);

// Go backward to find the opening of the flex div
const before = content.lastIndexOf('<div style="display:flex; gap:12px;">', idx);
console.log('flex div starts at:', before);
// Go forward to find closing </div> after the button
const closeDiv = content.indexOf('</div>', idx);
console.log('closing div at:', closeDiv);
console.log('Full block:', JSON.stringify(content.slice(before, closeDiv + 6)));

// Now do the replacement
const oldBlock = content.slice(before, closeDiv + 6);

const newBlock = `<div style="display:flex; gap:12px;">\r\n                         \${!ans.trim() ? '<div id="input-'+i+'" data-ans="" data-skip="true" style="display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,rgba(251,191,36,0.13),rgba(251,191,36,0.06));border:1.5px dashed #fbbf24;border-radius:12px;padding:10px 18px;color:#fde68a;font-size:14px;font-weight:700;text-shadow:0 0 8px rgba(251,191,36,0.4);box-shadow:0 2px 10px rgba(251,191,36,0.12);width:100%;text-align:center;"><span style="font-size:16px;">🌺</span>Kh\\u00f4ng c\\u00f3 c\\u00e1ch \\u0111\\u1ecdc n\\u00ean b\\u1ea1n k c\\u1ea7n \\u0111i\\u1ec1n n\\u00e8</div>' : '<input type="text" id="input-'+i+'" data-ans="'+ans+'" oninput="check('+i+')" onkeydown="handleKey(event, '+i+')" autocomplete="off" placeholder="..."><button class="btn btn-gray" style="width:70px; font-size:24px;" onclick="showHint('+i+')">👁️</button>'}\r\n                     </div>`;

content = content.slice(0, before) + newBlock + content.slice(closeDiv + 6);
fs.writeFileSync(path, content, 'utf8');
console.log('Done!');
