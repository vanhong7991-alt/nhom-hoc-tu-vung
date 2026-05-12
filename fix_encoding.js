const fs = require('fs');
const path = 'd:/HỌC TỪ VỰNG/Kiemtratuvung_Fixed_FIXED_v2.html';
const buffer = fs.readFileSync(path);
const corruptedString = buffer.toString('utf8');
// Convert the string back to bytes using latin1 encoding
// This reverses the "UTF-8 as Latin1" corruption
const fixedBuffer = Buffer.from(corruptedString, 'latin1');
fs.writeFileSync(path, fixedBuffer);
console.log('Encoding fix attempted.');
