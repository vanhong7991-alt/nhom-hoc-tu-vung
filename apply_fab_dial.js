const fs = require('fs');
let html = fs.readFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// 1. Replace HTML
const htmlStartStr = '<!-- ===== FLOATING ACTION BUTTONS (Van Mode) ===== -->';
const htmlEndStr = '            <!-- ===== VAN HISTORY MODAL ===== -->';

const htmlStartIdx = html.indexOf(htmlStartStr);
const htmlEndIdx = html.indexOf(htmlEndStr);

if (htmlStartIdx !== -1 && htmlEndIdx !== -1) {
    const fabNewHTML = `<!-- ===== SPEED DIAL FAB (Van Mode) ===== -->
            <div id="van-fab-group" style="display:none;">
                <!-- Backdrop khi mở -->
                <div id="van-fab-backdrop" onclick="vanFabClose()" style="display:none;position:fixed;inset:0;z-index:3490;background:rgba(0,0,0,0.25);backdrop-filter:blur(2px);transition:opacity 0.25s;opacity:0;"></div>

                <!-- Speed Dial wrapper -->
                <div id="van-fab-dial" style="position:fixed;bottom:24px;right:20px;z-index:3500;display:flex;flex-direction:column;align-items:flex-end;gap:10px;">

                    <!-- Action items (ẩn mặc định) -->
                    <div id="van-fab-items" style="display:flex;flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none;opacity:0;transform:translateY(12px);transition:opacity 0.25s,transform 0.25s;">
                        <!-- Lịch sử -->
                        <div class="van-fab-item" onclick="openVanHistory();vanFabClose()" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
                            <span style="background:rgba(30,41,59,0.9);color:#fff;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,0.3);letter-spacing:0.3px;">Lịch sử làm bài</span>
                            <button style="width:44px;height:44px;border-radius:50%;border:none;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(124,58,237,0.6);pointer-events:none;">📋</button>
                        </div>

                        <!-- Đầu trang -->
                        <div class="van-fab-item" onclick="window.scrollTo({top:0,behavior:'smooth'});vanFabClose()" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
                            <span style="background:rgba(30,41,59,0.9);color:#fff;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,0.3);letter-spacing:0.3px;">Đầu trang</span>
                            <button style="width:44px;height:44px;border-radius:50%;border:none;background:linear-gradient(135deg,#0ea5e9,#38bdf8);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(14,165,233,0.6);pointer-events:none;">⬆️</button>
                        </div>
                    </div>

                    <!-- Main toggle button -->
                    <button id="van-fab-toggle" onclick="vanFabToggle()" aria-label="Menu nhanh"
                        style="width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#ec4899,#a855f7);color:#fff;box-shadow:0 6px 22px rgba(168,85,247,0.65);display:flex;align-items:center;justify-content:center;font-size:24px;transition:transform 0.3s,box-shadow 0.3s;position:relative;z-index:1;">
                        <span id="van-fab-toggle-icon" style="display:inline-block;transition:transform 0.35s;line-height:1;">✨</span>
                    </button>
                </div>
            </div>

`;
    html = html.slice(0, htmlStartIdx) + fabNewHTML + html.slice(htmlEndIdx);
    console.log('HTML replaced successfully.');
} else {
    console.log('HTML section not found.');
}

// 2. Replace JS
const jsStartStr = '// ===== VAN FLOATING BUTTONS HELPERS =====';
const jsEndStr = '                function openVanHistory() {';

const jsStartIdx = html.indexOf(jsStartStr);
const jsEndIdx = html.indexOf(jsEndStr);

if (jsStartIdx !== -1 && jsEndIdx !== -1) {
    const jsNew = `// ===== VAN SPEED DIAL FAB HELPERS =====
                let _vanFabOpen = false;

                function updateVanFab() {
                    const fab = document.getElementById('van-fab-group');
                    if (!fab) return;
                    fab.style.display = curVanMode ? 'block' : 'none';
                    if (!curVanMode && _vanFabOpen) vanFabClose();
                }

                function vanFabToggle() {
                    _vanFabOpen ? vanFabClose() : vanFabOpen();
                }

                function vanFabOpen() {
                    _vanFabOpen = true;
                    const items = document.getElementById('van-fab-items');
                    const icon  = document.getElementById('van-fab-toggle-icon');
                    const bd    = document.getElementById('van-fab-backdrop');
                    const btn   = document.getElementById('van-fab-toggle');
                    if (items) { items.style.pointerEvents = 'auto'; items.style.opacity = '1'; items.style.transform = 'translateY(0)'; }
                    if (icon)  { icon.style.transform = 'rotate(135deg)'; icon.textContent = '✕'; }
                    if (bd)    { bd.style.display = 'block'; requestAnimationFrame(() => bd.style.opacity = '1'); }
                    if (btn)   { btn.style.transform = 'scale(1.08)'; btn.style.boxShadow = '0 8px 28px rgba(168,85,247,0.85)'; }
                }

                function vanFabClose() {
                    _vanFabOpen = false;
                    const items = document.getElementById('van-fab-items');
                    const icon  = document.getElementById('van-fab-toggle-icon');
                    const bd    = document.getElementById('van-fab-backdrop');
                    const btn   = document.getElementById('van-fab-toggle');
                    if (items) { items.style.pointerEvents = 'none'; items.style.opacity = '0'; items.style.transform = 'translateY(12px)'; }
                    if (icon)  { icon.style.transform = 'rotate(0deg)'; icon.textContent = '✨'; }
                    if (bd)    { bd.style.opacity = '0'; setTimeout(() => { if (!_vanFabOpen && bd) bd.style.display = 'none'; }, 250); }
                    if (btn)   { btn.style.transform = 'scale(1)'; btn.style.boxShadow = '0 6px 22px rgba(168,85,247,0.65)'; }
                }

`;
    html = html.slice(0, jsStartIdx) + jsNew + html.slice(jsEndIdx);
    console.log('JS replaced successfully.');
} else {
    console.log('JS section not found.');
}

fs.writeFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', html);
console.log('File written.');
