const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
const content = fs.readFileSync(path, 'utf8');

// Find the 'bỏ qua' comment in submitQuiz
const idx = content.indexOf('qua (t');
if (idx >= 0) {
    console.log('Found at char:', idx);
    console.log('Context:', JSON.stringify(content.slice(idx - 20, idx + 400)));
}
