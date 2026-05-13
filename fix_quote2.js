const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Find the occurrence in selectDay (around line 5296-5299 area)
// Look for the second occurrence of "srb.style.display = 'none';" followed by mainTimerBox
const marker = "if (srb) srb.style.display = 'none';\r\n                    const mainTimerBox";
const idx = content.indexOf(marker);
if (idx >= 0) {
    const rep = "if (srb) srb.style.display = 'none';\r\n                    // Xoa mo ta On tap thong minh khi chuyen sang bai hoc binh thuong\r\n                    if (lv !== 'custom') {\r\n                        var _quote2 = document.getElementById('motivational-quote');\r\n                        if (_quote2) _quote2.innerHTML = '';\r\n                    }\r\n                    const mainTimerBox";
    content = content.slice(0, idx) + rep + content.slice(idx + marker.length);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Done! Patched selectDay at char', idx);
} else {
    // Try \n
    const marker2 = "if (srb) srb.style.display = 'none';\n                    const mainTimerBox";
    const idx2 = content.indexOf(marker2);
    console.log('marker2 found at:', idx2);
    if (idx2 >= 0) {
        console.log('Context:', JSON.stringify(content.slice(idx2 - 100, idx2 + 200)));
    }
}
