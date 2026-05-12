const fs = require('fs');
const path = 'd:/HỌC TỪ VỰNG/Kiemtratuvung_Fixed_FIXED_v2.html';
const lines = fs.readFileSync(path, 'utf8').split('\n');

const newButton = `            <div class="menu-lvl1"
                style="background: linear-gradient(135deg, #f43f5e, #fb923c); color: white; text-align: center; border-radius: 16px; margin: 15px 12px; padding: 12px; box-shadow: 0 10px 20px -5px rgba(244, 63, 94, 0.5); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 800; letter-spacing: 0.5px; border: 1px solid rgba(255, 255, 255, 0.2); position: relative; overflow: hidden;"
                onclick="startSmartReview()"
                onmouseover="this.style.transform='translateY(-2px) scale(1.02)'; this.style.boxShadow='0 15px 25px -5px rgba(244, 63, 94, 0.6)';"
                onmouseout="this.style.transform='none'; this.style.boxShadow='0 10px 20px -5px rgba(244, 63, 94, 0.5)';"
            >
                <span style="font-size: 20px; filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));">🔥</span>
                <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
                    <span style="font-size: 13px; text-transform: uppercase; line-height: 1.2;">Ôn tập ưu tiên</span>
                    <span style="font-size: 10px; opacity: 0.8; font-weight: 400;">Thuật toán thông minh (AI)</span>
                </div>
            </div>`;

// Line 1997 is index 1996
// We replace from 1997 to 2008 (approx)
// But let's find the exact lines by looking for the startSmartReview string
let startLine = -1;
let endLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('onclick="startSmartReview()"')) {
        startLine = i;
        while (startLine > 0 && !lines[startLine].includes('<div class="menu-lvl1"')) {
            startLine--;
        }
        endLine = i;
        let openDivs = 1;
        while (endLine < lines.length && openDivs > 0) {
            endLine++;
            if (lines[endLine].includes('<div')) openDivs++;
            if (lines[endLine].includes('</div')) openDivs--;
        }
        break;
    }
}

if (startLine !== -1 && endLine !== -1) {
    lines.splice(startLine, endLine - startLine + 1, newButton);
    // Also fix the other corrupted emojis like stats icons if any
    let finalContent = lines.join('\n');
    
    // Fix common corrupted emojis in stats
    finalContent = finalContent.replace(/ðŸ“š/g, '📚');
    finalContent = finalContent.replace(/ðŸ’¡/g, '💡');
    finalContent = finalContent.replace(/ðŸŽ¯/g, '🎯');
    finalContent = finalContent.replace(/ðŸ”¥/g, '🔥');
    
    fs.writeFileSync(path, finalContent, 'utf8');
    console.log('Final fix applied.');
} else {
    console.log('Could not find the button to fix.');
}
