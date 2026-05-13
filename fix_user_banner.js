const fs = require('fs');
const path = 'd:\\HỌC TỪ VỰNG\\index.html';
let content = fs.readFileSync(path, 'utf8');
let count = 0;

// ── PATCH 1: CSS for .section-header-user ──
const cssOld = `.section-header-user {
            padding: 12px 20px;
            background: linear-gradient(135deg, #1d4ed8, #3b82f6);
            color: white;
            font-weight: 900;
            font-size: 15px;
            letter-spacing: 1px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid rgba(59, 130, 246, 0.5);
            margin-top: 8px;
            user-select: none;
        }

        .section-header-user:hover {
            background: linear-gradient(135deg, #1e40af, #2563eb);
        }`;

const cssNew = `.section-header-user {
            padding: 0;
            background: none;
            cursor: pointer;
            display: block;
            position: relative;
            overflow: hidden;
            border-bottom: 2px solid rgba(56, 189, 248, 0.4);
            margin-top: 8px;
            user-select: none;
            height: 140px;
        }

        .section-header-user:hover .user-banner-overlay {
            opacity: 0.55;
        }`;

if (content.includes(cssOld)) {
    content = content.replace(cssOld, cssNew);
    count++; console.log('Patch 1 OK: CSS updated');
} else { console.log('Patch 1 FAIL'); }

// ── PATCH 2: HTML for the user section header ──
// Old: simple div with label span
const htmlOld = `<!-- ===== GÓC CỦA USER ===== -->\r\n            <div class="section-header-user" onclick="toggleSub('user-section')">\r\n                <span id="user-section-label">&#x1F338; GÓC CỦA BẠN</span>\r\n                <span id="user-section-arrow" style="font-size:12px;">▼</span>\r\n            </div>`;

const htmlNew = `<!-- ===== GÓC CỦA USER ===== -->\r\n            <div class="section-header-user" onclick="toggleSub('user-section')">\r\n                <!-- BG: dùng ảnh nền hoặc gradient pastel xanh -->\r\n                <div style="position:absolute;inset:0;background:linear-gradient(135deg,#e0f2fe 0%,#bae6fd 40%,#93c5fd 70%,#7dd3fc 100%);"></div>\r\n                <div style="position:absolute;inset:0;background:url('anhnen1.png') center/cover;opacity:0.28;" onerror="this.style.display='none'"></div>\r\n                <!-- Overlay gradient mềm phía dưới -->\r\n                <div class="user-banner-overlay" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(186,230,253,0.1) 0%,rgba(14,116,144,0.25) 100%);opacity:0.4;transition:opacity 0.3s;"></div>\r\n                <!-- Hoa trang trí -->\r\n                <div style="position:absolute;top:10px;left:14px;font-size:22px;opacity:0.5;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));">🍀</div>\r\n                <div style="position:absolute;bottom:10px;right:14px;font-size:20px;opacity:0.45;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));">🍀</div>\r\n                <!-- Nội dung chính -->\r\n                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0 36px;">\r\n                    <div id="user-section-label" style="font-size:18px;font-weight:900;color:#1e40af;text-shadow:0 1px 6px rgba(255,255,255,0.9),0 0 20px rgba(147,197,253,0.6);letter-spacing:0.5px;text-align:center;line-height:1.4;">\r\n                        🍀 G\u00f3c nh\u1ecf c\u1ee7a <span style="color:#0369a1;">&quot;T\u00ean&quot;</span> 🍀\r\n                    </div>\r\n                    <div style="font-size:10.5px;color:#0369a1;font-weight:700;letter-spacing:2px;opacity:0.85;">✨ H\u1eccC T\u1eea V\u1ef0NG M\u1ed6I NG\u00c0Y ✨</div>\r\n                </div>\r\n                <span id="user-section-arrow" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:14px;color:#1e40af;text-shadow:0 1px 4px rgba(255,255,255,0.8);">▼</span>\r\n            </div>`;

if (content.includes(htmlOld)) {
    content = content.replace(htmlOld, htmlNew);
    count++; console.log('Patch 2 OK: HTML updated');
} else {
    console.log('Patch 2 FAIL: searching partial...');
    const idx = content.indexOf('GÓC CỦA USER');
    console.log('GÓC CỦA USER at char:', idx);
    if (idx >= 0) console.log('Context:', JSON.stringify(content.slice(idx - 10, idx + 300)));
}

fs.writeFileSync(path, content, 'utf8');
console.log(`\nDone! Applied ${count}/2 patches.`);
