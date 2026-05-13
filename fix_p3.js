const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Use indexOf/slice approach to replace patch 3
const startMarker = "// Câu không có đáp án định nghĩa và chưa điền → bỏ qua (tính đúng)";
const endMarker = "// Câu sai hoặc chưa điền";

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker, startIdx);

if (startIdx >= 0 && endIdx >= 0) {
    console.log('Found block from', startIdx, 'to', endIdx);
    console.log('Block:', JSON.stringify(content.slice(startIdx, endIdx)));
    
    const replacement = `// Câu không có cách đọc → bỏ qua, không tính điểm\r\n                             else if (ans === '' && val === '') {\r\n                                 skipped++;\r\n                                 card.setAttribute('data-res', 'skip');\r\n                                 card.style.borderLeftColor = '#334155';\r\n                                 if (input) { input.style.opacity = '0.4'; }\r\n                             }\r\n                             `;
    
    content = content.slice(0, startIdx) + replacement + content.slice(endIdx);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Patch 3 applied!');
} else {
    console.log('Markers not found! startIdx:', startIdx, 'endIdx:', endIdx);
}
