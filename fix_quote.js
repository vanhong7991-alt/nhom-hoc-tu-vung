const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Find the exact text around line 5291-5294 and patch it
const old = `if (srb) srb.style.display = 'none';\r\n                    const mainTimerBox`;
const rep = `if (srb) srb.style.display = 'none';\r\n                    // Xoá mô tả Ôn tập thông minh khi chuyển sang bài học bình thường\r\n                    if (lv !== 'custom') {\r\n                        var _quote = document.getElementById('motivational-quote');\r\n                        if (_quote) _quote.innerHTML = '';\r\n                    }\r\n                    const mainTimerBox`;

if (content.includes(old)) {
    content = content.replace(old, rep);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Done!');
} else {
    // Try with \n instead of \r\n
    const old2 = `if (srb) srb.style.display = 'none';\n                    const mainTimerBox`;
    if (content.includes(old2)) {
        const rep2 = `if (srb) srb.style.display = 'none';\n                    // Xoá mô tả Ôn tập thông minh khi chuyển sang bài học bình thường\n                    if (lv !== 'custom') {\n                        var _quote = document.getElementById('motivational-quote');\n                        if (_quote) _quote.innerHTML = '';\n                    }\n                    const mainTimerBox`;
        content = content.replace(old2, rep2);
        fs.writeFileSync(path, content, 'utf8');
        console.log('Done with LF!');
    } else {
        console.log('Pattern not found. Searching...');
        const idx = content.indexOf("srb.style.display = 'none'");
        console.log('Found at:', idx);
        console.log('Context:', JSON.stringify(content.slice(idx, idx + 200)));
    }
}
