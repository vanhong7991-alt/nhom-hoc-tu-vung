const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

const old = "document.getElementById('completion-overlay').remove(); selectDay(curLevel, curType, curDay);\"";
const rep = "document.getElementById('completion-overlay').remove(); renderQuiz(); if(typeof resetTimer==='function') resetTimer(); window.scrollTo({top:0,behavior:'smooth'});\"";

if (content.includes(old)) {
    content = content.replace(old, rep);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Done! Replaced successfully.');
} else {
    // Search for partial match
    const idx = content.indexOf('selectDay(curLevel, curType, curDay)');
    if (idx >= 0) {
        console.log('Found partial at char:', idx);
        console.log('Context:', JSON.stringify(content.slice(idx - 80, idx + 80)));
    } else {
        console.log('Pattern not found. Searching for completion-overlay...');
        const matches = [...content.matchAll(/completion-overlay.*?remove\(\)[^`]{0,150}/g)];
        matches.forEach((m, i) => console.log(i, JSON.stringify(m[0].slice(0, 200))));
    }
}
