const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
const content = fs.readFileSync(path, 'utf8');

// Debug: find showHint button
const idx1 = content.indexOf('showHint');
console.log('showHint at char:', idx1);
if (idx1 >= 0) console.log('Context:', JSON.stringify(content.slice(idx1 - 100, idx1 + 150)));
