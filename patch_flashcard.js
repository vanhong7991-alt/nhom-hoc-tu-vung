const fs = require('fs');

let html = fs.readFileSync('d:\\HỌC TỪ VỰNG\\Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// Replace the flashcard buttons
const oldButtons = `<div
                            style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                            <button class="btn btn-blue" style="padding: 12px 20px; font-size: 18px;"
                                onclick="prevFlashcard()">⬅️ Trước</button>
                            <div id="flashcard-progress" style="font-size: 18px; font-weight: bold; color: white;">1 /
                                10</div>
                            <button class="btn btn-blue" style="padding: 12px 20px; font-size: 18px;"
                                onclick="nextFlashcard()">Sau ➡️</button>
                        </div>`;

const newButtons = `<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 8px;">
                            <button class="btn btn-danger" style="flex:1; padding:10px; font-size:16px; background:var(--danger);" onclick="srsFlashcard('wrong')">❌ Sai</button>
                            <button class="btn btn-warning" style="flex:1; padding:10px; font-size:16px; background:var(--warning);" onclick="srsFlashcard('hard')">😐 Khó</button>
                            <button class="btn btn-success" style="flex:1; padding:10px; font-size:16px; background:var(--success);" onclick="srsFlashcard('easy')">✅ Nhớ</button>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                            <button class="btn btn-gray" style="padding: 8px 15px; font-size: 14px;" onclick="prevFlashcard()">⬅️ Trước</button>
                            <div id="flashcard-progress" style="font-size: 18px; font-weight: bold; color: white;">1 / 10</div>
                            <button class="btn btn-gray" style="padding: 8px 15px; font-size: 14px;" onclick="nextFlashcard()">Sau ➡️</button>
                        </div>`;

// Since there are encoding/whitespace variations, we'll use regex.
const buttonRegex = /<div\s*style="display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*space-between;\s*margin-bottom:\s*20px;">\s*<button[^>]*onclick="prevFlashcard\(\)"[^>]*>.*?<\/button>\s*<div[^>]*id="flashcard-progress"[^>]*>.*?<\/div>\s*<button[^>]*onclick="nextFlashcard\(\)"[^>]*>.*?<\/button>\s*<\/div>/g;

html = html.replace(buttonRegex, newButtons);

// Add srsFlashcard function and inject smartTracker.start() into updateFlashcardUI
const updateFcHtml = `function updateFlashcardUI() {
                    const item = fcList[currentFlashcardIndex];
                    if (!item) return;
                    if (window.smartTracker) window.smartTracker.start(item);`;

html = html.replace(/function updateFlashcardUI\(\) \{\s*const item = fcList\[currentFlashcardIndex\];\s*if \(\!item\) return;/g, updateFcHtml);

const srsFlashcardScript = `
                function srsFlashcard(result) {
                    if (window.smartTracker) {
                        window.smartTracker.record(fcList[currentFlashcardIndex], TEST_TYPES.FLASHCARD, result);
                    }
                    nextFlashcard();
                }
`;
html = html.replace(/function nextFlashcard\(\) \{/g, srsFlashcardScript + '\n                function nextFlashcard() {');

// Inject "Smart Review" button to sidebar menu
const smartReviewBtn = `<div class="menu-lvl1" style="background: linear-gradient(135deg, #ef4444, #f97316); color: white; text-align: center; border-radius: 12px; margin: 15px; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);" onclick="startSmartReview()">
                    🔥 ÔN TẬP ƯU TIÊN (SMART REVIEW)
                </div>`;
                
// Insert it at the top of the sidebar, right after stats container.
const sidebarTop = `<div class="sidebar-stats-container">`;
html = html.replace(sidebarTop, smartReviewBtn + '\n            ' + sidebarTop);

fs.writeFileSync('d:\\HỌC TỪ VỰNG\\Kiemtratuvung_Fixed_FIXED_v2_patched_fc.html', html, 'utf8');
console.log('Patched Flashcard UI and added Smart Review button.');
