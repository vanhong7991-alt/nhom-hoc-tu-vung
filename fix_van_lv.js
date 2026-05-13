const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Find all occurrences of 'if (lv !== \'custom\')'
const needle = "if (lv !== 'custom')";
let idx = 0;
let occurrences = [];
while (true) {
    idx = content.indexOf(needle, idx);
    if (idx === -1) break;
    occurrences.push(idx);
    idx++;
}

console.log('Found', occurrences.length, 'occurrences at chars:', occurrences);

if (occurrences.length >= 1) {
    // First occurrence is in selectVanDay — replace 'lv' with 'sectionKey'
    const firstIdx = occurrences[0];
    // Show context
    console.log('First context:', JSON.stringify(content.slice(firstIdx - 200, firstIdx + 20)));
    
    // Replace ONLY the first occurrence: 'if (lv !== \'custom\')' with 'if (sectionKey !== \'custom\')'
    const before = content.slice(0, firstIdx);
    const after = content.slice(firstIdx + needle.length);
    const replacement = "if (sectionKey !== 'custom')";
    content = before + replacement + after;
    
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed! Replaced first occurrence with sectionKey');
} else {
    console.log('No occurrences found!');
}
