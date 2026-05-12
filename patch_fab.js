const fs = require('fs');
let c = fs.readFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// ====== REPLACE FAB HTML ======
const fabOld = `            <!-- ===== FLOATING ACTION BUTTONS (Van Mode) ===== -->
            <div id="van-fab-group" style="display:none; position:fixed; bottom:28px; right:24px; z-index:3500; display:none; flex-direction:column; gap:12px; align-items:flex-end;">
                <!-- Lịch sử làm bài -->
                <button id="van-fab-history" onclick="openVanHistory()"
                    title="Lịch sử làm bài"
                    style="display:flex; align-items:center; gap:8px; padding:12px 18px; border:none; border-radius:50px; cursor:pointer; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:14px; color:#fff; background:linear-gradient(135deg,#7c3aed,#a855f7); box-shadow:0 6px 20px rgba(124,58,237,0.55); transition:transform 0.15s,box-shadow 0.15s;"
                    onmouseenter="this.style.transform='scale(1.07)';this.style.boxShadow='0 8px 28px rgba(124,58,237,0.75)'"
                    onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='0 6px 20px rgba(124,58,237,0.55)'">
                    📋 Lịch sử làm bài
                </button>
                <!-- Scroll to top -->
                <button id="van-fab-top" onclick="window.scrollTo({top:0,behavior:'smooth'})"
                    title="Di chuyển đến đầu trang"
                    style="display:flex; align-items:center; gap:8px; padding:12px 18px; border:none; border-radius:50px; cursor:pointer; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:14px; color:#fff; background:linear-gradient(135deg,#0ea5e9,#38bdf8); box-shadow:0 6px 20px rgba(14,165,233,0.55); transition:transform 0.15s,box-shadow 0.15s;"
                    onmouseenter="this.style.transform='scale(1.07)';this.style.boxShadow='0 8px 28px rgba(14,165,233,0.75)'"
                    onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='0 6px 20px rgba(14,165,233,0.55)'">
                    ⬆️ Đầu trang
                </button>
            </div>`;

const fabNew = `            <!-- ===== SPEED DIAL FAB (Van Mode) ===== -->
            <div id="van-fab-group" style="display:none;">
                <!-- Backdrop khi mở -->
                <div id="van-fab-backdrop" onclick="vanFabClose()" style="display:none;position:fixed;inset:0;z-index:3490;background:rgba(0,0,0,0.25);backdrop-filter:blur(2px);transition:opacity 0.25s;opacity:0;"></div>

                <!-- Speed Dial wrapper -->
                <div id="van-fab-dial" style="position:fixed;bottom:24px;right:20px;z-index:3500;display:flex;flex-direction:column;align-items:flex-end;gap:10px;">

                    <!-- Action items (ẩn mặc định) -->
                    <div id="van-fab-items" style="display:flex;flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none;opacity:0;transform:translateY(12px);transition:opacity 0.25s,transform 0.25s;">

                        <!-- Item 1: Lịch sử -->
                        <div class="van-fab-item" onclick="openVanHistory();vanFabClose()">
                            <span class="van-fab-label">Lịch sử làm bài</span>
                            <button class="van-fab-icon-btn" style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 4px 18px rgba(124,58,237,0.6);">📋</button>
                        </div>

                        <!-- Item 2: Đầu trang -->
                        <div class="van-fab-item" onclick="window.scrollTo({top:0,behavior:'smooth'});vanFabClose()">
                            <span class="van-fab-label">Đầu trang</span>
                            <button class="van-fab-icon-btn" style="background:linear-gradient(135deg,#0ea5e9,#38bdf8);box-shadow:0 4px 18px rgba(14,165,233,0.6);">⬆️</button>
                        </div>
                    </div>

                    <!-- Main toggle button -->
                    <button id="van-fab-toggle" onclick="vanFabToggle()" aria-label="Menu nhanh"
                        style="width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#ec4899,#a855f7);box-shadow:0 6px 22px rgba(168,85,247,0.65);display:flex;align-items:center;justify-content:center;font-size:22px;transition:transform 0.3s,box-shadow 0.3s;position:relative;z-index:1;">
                        <span id="van-fab-toggle-icon" style="display:inline-block;transition:transform 0.35s;">✨</span>
                    </button>
                </div>
            </div>`;

if (c.includes(fabOld)) { c = c.replace(fabOld, fabNew); console.log('FAB HTML replaced OK'); }
else { console.log('FAB HTML NOT FOUND'); }

// ====== UPDATE updateVanFab JS ======
const jsOld = `                // ===== VAN FLOATING BUTTONS HELPERS =====
                function updateVanFab() {
                    const fab = document.getElementById('van-fab-group');
                    if (!fab) return;
                    fab.style.display = curVanMode ? 'flex' : 'none';
                }`;

const jsNew = `                // ===== VAN SPEED DIAL FAB HELPERS =====
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
                    if (btn)   { btn.style.transform = 'scale(1.1)'; btn.style.boxShadow = '0 8px 30px rgba(168,85,247,0.8)'; }
                }

                function vanFabClose() {
                    _vanFabOpen = false;
                    const items = document.getElementById('van-fab-items');
                    const icon  = document.getElementById('van-fab-toggle-icon');
                    const bd    = document.getElementById('van-fab-backdrop');
                    const btn   = document.getElementById('van-fab-toggle');
                    if (items) { items.style.pointerEvents = 'none'; items.style.opacity = '0'; items.style.transform = 'translateY(12px)'; }
                    if (icon)  { icon.style.transform = 'rotate(0deg)'; icon.textContent = '✨'; }
                    if (bd)    { bd.style.opacity = '0'; setTimeout(() => { if (bd) bd.style.display = 'none'; }, 250); }
                    if (btn)   { btn.style.transform = 'scale(1)'; btn.style.boxShadow = '0 6px 22px rgba(168,85,247,0.65)'; }
                }`;

if (c.includes(jsOld)) { c = c.replace(jsOld, jsNew); console.log('JS replaced OK'); }
else { console.log('JS NOT FOUND'); }

fs.writeFileSync('Kiemtratuvung_Fixed_FIXED_v2.html', c);
console.log('Done.');
