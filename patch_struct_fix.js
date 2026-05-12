const fs = require('fs');
let html = fs.readFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// ============================================================
// FIX 1: submitQuiz - struct wrong branch (use byte offsets)
// ============================================================
const struct1_marker = "// Hi\u1ec3n th\u1ecb \u0111\u00e1p \u00e1n \u0111\u00fang b\u00ean d\u01b0\u1edbi input";
const struct1_end_marker = "if (_msgEl \u0026\u0026 _origAns) { _msgEl.className = 'fb-msg show ng'; _msgEl.innerHTML = 'Sai r\u1ed3i ti\u1ebfc qu\u00e1 \ud83d\ude22 \u0026nbsp;\u0026nbsp;\u2705 <b style=\"color:#4ade80\">' + _origAns + '</b>'; }\r\n";

const s1_start = html.indexOf(struct1_marker);
console.log('Fix1 marker at:', s1_start);

if (s1_start !== -1) {
    const s1_end = html.indexOf(struct1_end_marker, s1_start);
    console.log('Fix1 end marker at:', s1_end);
    if (s1_end !== -1) {
        const endOfBlock = s1_end + struct1_end_marker.length;
        const newBlock = `// Hi\u1ec3n th\u1ecb msg \u0111\u1ecf \u0111\u01a1n gi\u1ea3n + .answer-reveal ri\u00eang
                                const _origAns = input ? input.getAttribute('data-ans').trim() : '';
                                const _msgEl = document.getElementById('msg-' + idx);
                                if (_msgEl) { _msgEl.className = 'fb-msg show ng'; _msgEl.innerText = 'Sai r\u1ed3i ti\u1ebfc qu\u00e1 \ud83d\ude22'; }
                                if (_origAns) {
                                    let _solEl2 = card.querySelector('.answer-reveal');
                                    if (!_solEl2) { _solEl2 = document.createElement('div'); _solEl2.className = 'answer-reveal'; card.appendChild(_solEl2); }
                                    _solEl2.innerHTML = '\u2705 \u0110\u00e1p \u00e1n \u0111\u00fang: <b>' + _origAns + '</b>';
                                }\r\n`;
        html = html.slice(0, s1_start) + newBlock + html.slice(endOfBlock);
        console.log('Fix 1 OK');
    } else { console.log('Fix 1: end marker not found'); }
} else { console.log('Fix 1: start marker not found'); }

// ============================================================
// FIX 2: check() wrong branch (use byte offsets)
// ============================================================
const struct2_marker = "msg.innerHTML = 'Sai r\u1ed3i ti\u1ebfc qu\u00e1 \ud83d\ude22 \u0026nbsp;\u0026nbsp;\u2705 <b style=\"color:#4ade80\">' + _ans_display + '</b>';";

const s2_start = html.indexOf(struct2_marker);
console.log('Fix2 marker at:', s2_start);

if (s2_start !== -1) {
    // Find start of the block: "const _ans_display = ..."
    const preMarker = "const _ans_display = input.getAttribute('data-ans').trim();\r\n                            " + struct2_marker;
    const pm_start = html.indexOf("const _ans_display = input.getAttribute('data-ans').trim();", s2_start - 200);
    const block_end = s2_start + struct2_marker.length;
    const newBlock2 = `msg.innerText = 'Sai r\u1ed3i ti\u1ebfc qu\u00e1 \ud83d\ude22';
                            // Hi\u1ec3n th\u1ecb .answer-reveal ri\u00eang
                            const _ans_display = input.getAttribute('data-ans').trim();
                            if (_ans_display) {
                                let _solEl3 = card.querySelector('.answer-reveal');
                                if (!_solEl3) { _solEl3 = document.createElement('div'); _solEl3.className = 'answer-reveal'; card.appendChild(_solEl3); }
                                _solEl3.innerHTML = '\u2705 \u0110\u00e1p \u00e1n \u0111\u00fang: <b>' + _ans_display + '</b>';
                            }`;
    
    // Find what's right before the marker in the actual html to replace correctly
    const preCode = "                            msg.className = 'fb-msg show ng';\r\n                            const _ans_display = input.getAttribute('data-ans').trim();\r\n                            " + struct2_marker;
    const newCode2 = "                            msg.className = 'fb-msg show ng';\r\n                            " + newBlock2;
    
    if (html.includes(preCode)) {
        html = html.replace(preCode, newCode2);
        console.log('Fix 2 OK');
    } else {
        // Try without \r
        const preCode2 = preCode.replace(/\r/g, '');
        if (html.includes(preCode2)) {
            html = html.replace(preCode2, newCode2.replace(/\r/g, ''));
            console.log('Fix 2 OK (no CR)');
        } else {
            console.log('Fix 2 NOT FOUND - dumping context:');
            const ctx = html.slice(s2_start - 200, s2_start + 100);
            console.log(JSON.stringify(ctx));
        }
    }
}

fs.writeFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', html);
console.log('\nDone.');
