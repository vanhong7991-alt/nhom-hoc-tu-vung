
    function parseFormat(str) {
        if (!str || typeof str !== 'string') return str;
        return str.replace(/\[\[(.*?)\]\]/g, '<u style="color:#ef4444; font-weight:900;">$1</u>')
                  .replace(/\{\{(.*?)\}\}/g, '<span style="color:#fde047; font-weight:900;">$1</span>')
                  .replace(/\*\*(.*?)\*\*/g, '<b style="color:#3b82f6;">$1</b>');
    }
    let db = JSON.parse(localStorage.getItem('mgao_v37_db'));
    let userName = localStorage.getItem('mgao_user_v37') || "";
    let curLevel, curType, curDay, seconds = 0, timerInterval = null, currentList = [], currentMode = 0;
    let curSubTab = 'tu-don';
    let pendingDeletes = new Set();
    let currentQuizIndex = 0;
    let quizItems = [];
    let quizState = { answers: {}, correct: {} };
    let quizFeedbackMode = localStorage.getItem('mgao_v37_quiz_fb') || 'instant';

    window.onload = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const syncData = urlParams.get('sync');
        if (syncData) {
            try {
                const decoded = decodeURIComponent(escape(atob(syncData)));
                const parsed = JSON.parse(decoded);
                if (parsed && parsed.n1 && parsed.n2) {
                    if (confirm("☁️ Phát hiện Link Đồng Bộ!\nBạn có muốn ghi đè dữ liệu hiện tại bằng dữ liệu từ Link này không?")) {
                        if(!parsed.n3) { parsed.n3 = { voca: {}, gram: {} }; ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) parsed.n3[ty][`Ngày ${i}`] = { list: [], done: [false, false, false, false] }; }); }
                        if(!parsed.bjt) { parsed.bjt = { voca: {}, gram: {} }; ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) parsed.bjt[ty][`Ngày ${i}`] = { list: [], done: [false, false, false, false] }; }); }
                        localStorage.setItem('mgao_v37_db', JSON.stringify(parsed));
                        alert("✅ Phục hồi dữ liệu từ Link thành công!");
                    }
                }
            } catch (e) { alert("❌ Link đồng bộ bị lỗi hoặc sai định dạng!"); }
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        let savedDb = localStorage.getItem('mgao_v37_db');
        if(!savedDb) {
            db = { "n1": { "voca": {}, "gram": {} }, "n2": { "voca": {}, "gram": {} }, "n3": { "voca": {}, "gram": {} }, "bjt": { "voca": {}, "gram": {} } };
            ["n1", "n2", "n3", "bjt"].forEach(lv => { ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) db[lv][ty][`Ngày ${i}`] = { list: [], done: [false, false, false, false] }; }); });
            saveToLocal();
        } else {
            db = JSON.parse(savedDb);
            let updated = false;
            if(!db.n3) { db.n3 = { voca: {}, gram: {} }; ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) db.n3[ty][`Ngày ${i}`] = { list: [], done: [false, false, false, false] }; }); updated = true; }
            if(!db.bjt) { db.bjt = { voca: {}, gram: {} }; ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) db.bjt[ty][`Ngày ${i}`] = { list: [], done: [false, false, false, false] }; }); updated = true; }
            ["n1", "n2", "n3", "bjt"].forEach(lv => { 
                ["voca", "gram"].forEach(ty => { 
                    Object.values(db[lv][ty]).forEach(day => {
                        if (day.done && day.done.length === 3) {
                            day.done.push(false);
                            updated = true;
                        }
                    });
                }); 
            });
            if(updated) saveToLocal();
        }

        if(!userName) document.getElementById('welcome-screen').style.display = 'flex'; else applyUser();
        renderSidebar(); updateGlobalStats();
    };

    function saveToLocal() { 
        localStorage.setItem('mgao_v37_db', JSON.stringify(db)); 
        localStorage.setItem('mgao_v37_updatedAt', new Date().toISOString());
    }

    function applyUser() { 
        document.getElementById('header-user-name').innerText = `${userName} cố lên nhé! 🌸`;
        document.getElementById('sidebar-user-name').innerText = `HỌC CÙNG ${userName.toUpperCase()} 🌸`;
        if(document.getElementById('view-title').innerText.includes("Mục tiêu")) {
             document.getElementById('view-title').innerText = `Mục tiêu hôm nay! 🎯`;
        }
        document.getElementById('motivational-quote').innerHTML = `Chào <b style="color:var(--warning)">${userName}</b> cùng vượt qua lười biếng và chăm chỉ mỗi ngày nhé.<br><span style="color:#f472b6; font-style:italic;">"Lười biếng hôm nay, hối hận ngày mai".</span>`;
    }

    function saveUser() { const val = document.getElementById('user-name-input').value.trim(); if(val) { userName = val; localStorage.setItem('mgao_user_v37', val); document.getElementById('welcome-screen').style.display = 'none'; applyUser(); } }
    function resetUserData() { if(confirm("Xóa toàn bộ dữ liệu?")) { localStorage.clear(); location.reload(); } }

    function toggleMenu() { 
        console.log('toggleMenu called');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        console.log('sidebar classes before:', sidebar.className);
        sidebar.classList.toggle('open'); 
        overlay.classList.toggle('open'); 
        console.log('sidebar classes after:', sidebar.className);
        updateGlobalStats(); 
    }
    function toggleSub(id) { const el = document.getElementById(id); el.style.display = (el.style.display === 'block') ? 'none' : 'block'; }
    let curSep = 'auto';
    function updateImportUI() {
        const isGram = (curType === 'gram');
        const isQuiz = (curSubTab === 'trac-nghiem');
        
        const selector = document.getElementById('gram-type-selector');
        if (selector) selector.style.display = 'none';
        
        document.getElementById('import-col-struct').style.display = isQuiz ? 'none' : 'flex';
        document.getElementById('import-col-quiz').style.display = isQuiz ? 'block' : 'none';
        const txtArea = document.getElementById('import-input');
        
        if(document.getElementById('col4-wrap')) document.getElementById('col4-wrap').style.display = (isQuiz || !isGram) ? 'none' : 'inline-block';
        if(document.getElementById('col5-wrap')) document.getElementById('col5-wrap').style.display = (isQuiz || !isGram) ? 'none' : 'inline-block';
        if(document.getElementById('col6-wrap')) document.getElementById('col6-wrap').style.display = (isQuiz || !isGram) ? 'none' : 'inline-block';
        
        if (isQuiz) {
            txtArea.placeholder = "• Định dạng trắc nghiệm (7 cột):\n• Câu hỏi | Đáp án A | Đáp án B | Đáp án C | Đáp án D | Đáp án đúng | Giải thích\n• VD: Mèo | Cat | Dog | Fish | Bird | Cat | Giải thích: Mèo trong tiếng Anh là Cat";
        } else {
            if (isGram) {
                txtArea.placeholder = "• Định dạng Cấu trúc (Tối đa 6 cột):\n• Cấu trúc | Đọc | Nghĩa | Ví dụ | Đáp án | Giải thích\n• VD: ~に違いない | ni chigainai | Chắc chắn là...";
            } else {
                txtArea.placeholder = "• Dán từ Excel, Google Sheets...\n• Mỗi từ 1 dòng (3 cột)\n• Ví dụ:  食べる / たべる / ăn";
            }
        }
        updateImportPreview();
    }

    function updateAddUI() {
        const isGram = (curType === 'gram');
        document.getElementById('add-gram-type-selector').style.display = 'none';
        
        document.getElementById('add-inputs-voca-struct').style.display = 'block';
        document.getElementById('add-inputs-quiz').style.display = 'none';
        
        document.getElementById('add-c1').placeholder = isGram ? "Cấu trúc..." : "Kanji / Từ vựng...";
        
        if (!isGram) {
            document.getElementById('add-c4').style.display = 'none';
            document.getElementById('add-c5').style.display = 'none';
            document.getElementById('add-c6').style.display = 'none';
            if(document.getElementById('add-c2')) {
                document.getElementById('add-c2').style.display = 'inline-block';
                document.getElementById('add-c2').placeholder = "Cách đọc (Hiragana)...";
            }
        } else {
            document.getElementById('add-c4').style.display = 'inline-block';
            document.getElementById('add-c5').style.display = 'inline-block';
            document.getElementById('add-c6').style.display = 'inline-block';
            if(document.getElementById('add-c2')) {
                document.getElementById('add-c2').style.display = 'inline-block';
                document.getElementById('add-c2').placeholder = "Cách đọc...";
            }
        }
    }
    function openModal(id) {
        if(id === 'list-modal') renderListTable();
        if(id === 'add-word-modal') {
            updateAddUI();
            renderQuickAddList();
        }
        if(id === 'import-modal') {
            isEditMode = false;
            const btnCS = document.getElementById('btn-chinh-sua');
            if(btnCS) { btnCS.style.background='transparent'; btnCS.style.color='#3b82f6'; btnCS.innerHTML='✏️ Chỉnh sửa'; }
            const btnCN = document.getElementById('btn-cap-nhat');
            if(btnCN) btnCN.style.display = 'none';
            updateImportUI();
            renderCurWordList();
        }
        document.getElementById(id).style.display = 'flex';
    }
    function closeModal(id) { document.getElementById(id).style.display = 'none'; }

    function setSep(s) {
        curSep = s;
        document.querySelectorAll('.sep-pill').forEach(p => p.classList.remove('active'));
        document.querySelector(`.sep-pill[data-sep="${s}"]`).classList.add('active');
        updateImportPreview();
    }

    function detectSep(text) {
        const lines = text.trim().split('\n').filter(l=>l.trim()).slice(0,8);
        if(!lines.length) return '\t';
        const candidates = ['\t','/',',',';','|'];
        let best='\t', bestScore=-1;
        for(const s of candidates){
            const counts = lines.map(l=>l.split(s).length-1);
            const avg = counts.reduce((a,b)=>a+b,0)/counts.length;
            const variance = counts.reduce((a,b)=>a+Math.pow(b-avg,2),0)/counts.length;
            if(avg>=1 && variance<=0.6){ const sc=avg*2-variance; if(sc>bestScore){bestScore=sc;best=s;} }
        }
        if(bestScore<0 && lines.some(l=>/\s{2,}/.test(l))) return 'spaces';
        return best;
    }

    function getActiveSep(text) {
        if(curSep==='auto') return detectSep(text);
        if(curSep==='tab') return '\t';
        if(curSep===' ') return 'spaces';
        return curSep;
    }

    function parseData() {
        const raw = document.getElementById('import-input').value;
        const skip = document.getElementById('skip-header').checked;
        const sep = getActiveSep(raw);
        let lines = raw.split('\n').filter(l=>l.trim());
        if(skip && lines.length>0) lines=lines.slice(1);
        const isGram = (curType === 'gram');
        const isQuiz = (curSubTab === 'trac-nghiem');
        if (isQuiz) {
            return lines.map(line=>{
                const parts = sep==='spaces' ? line.trim().split(/\s{2,}/).map(p=>p.trim()).filter(Boolean) : line.split(sep).map(p=>p.trim());
                const valid = parts.length>=6;
                let q = parts[0]||'';
                let opt1 = parts[1]||'', opt2 = parts[2]||'', opt3 = parts[3]||'', opt4 = parts[4]||'';
                let correctCol = (parts[5]||'').trim().toUpperCase();
                
                let ans = opt1, w1 = opt2, w2 = opt3, w3 = opt4;
                
                if (correctCol === 'A' || correctCol === '1' || correctCol === opt1.toUpperCase()) {
                    ans = opt1; w1 = opt2; w2 = opt3; w3 = opt4;
                } else if (correctCol === 'B' || correctCol === '2' || correctCol === opt2.toUpperCase()) {
                    ans = opt2; w1 = opt1; w2 = opt3; w3 = opt4;
                } else if (correctCol === 'C' || correctCol === '3' || correctCol === opt3.toUpperCase()) {
                    ans = opt3; w1 = opt1; w2 = opt2; w3 = opt4;
                } else if (correctCol === 'D' || correctCol === '4' || correctCol === opt4.toUpperCase()) {
                    ans = opt4; w1 = opt1; w2 = opt2; w3 = opt3;
                } else {
                    ans = opt1; w1 = opt2; w2 = opt3; w3 = opt4;
                }

                let explain = parts[6] || '';
                const entry={ gramType: 'quiz', q, ans, w1, w2, w3, count: 0, explain };
                return {entry, valid, parts};
            });
        }
        const c1 = document.getElementById('col1').value;
        const c2 = document.getElementById('col2').value;
        const c3 = document.getElementById('col3').value;
        const c4 = document.getElementById('col4') ? document.getElementById('col4').value : 'c4';
        const c5 = document.getElementById('col5') ? document.getElementById('col5').value : 'c5';
        const c6 = document.getElementById('col6') ? document.getElementById('col6').value : 'c6';
        return lines.map(line=>{
            const parts = sep==='spaces' ? line.trim().split(/\s{2,}/).map(p=>p.trim()).filter(Boolean) : line.split(sep).map(p=>p.trim());
            const valid = parts.length>=2;
            const entry={count:0};
            // Determine gramType based on current mode (quiz or struct)
            const gramType = isQuiz ? 'quiz' : 'struct';
            entry.gramType = gramType;
            entry[c1]=parts[0]||''; entry[c2]=parts[1]||''; entry[c3]=parts[2]||(parts[1]||'');
            if(parts[3]) entry[c4]=parts[3];
            if(parts[4]) entry[c5]=parts[4];
            if(parts[5]) entry[c6]=parts[5];
            return {entry, valid, parts};
        });
    }

    function updateImportPreview() {
        const data = parseData();
        const valid = data.filter(d=>d.valid);
        const cnt = document.getElementById('prev-count');
        const box = document.getElementById('import-preview');
        cnt.textContent = `(${valid.length} hợp lệ${data.length>valid.length?' · '+(data.length-valid.length)+' dòng lỗi':''})`;
        if(!data.length){ box.innerHTML='<div class="imp-empty">Dán dữ liệu vào ô trên để xem trước...</div>'; return; }
        const isGram = (curType === 'gram');
        const isQuiz = (curSubTab === 'trac-nghiem');
        if (isQuiz) {
            box.innerHTML=`<table class="prev-tbl"><thead><tr><th>#</th><th>Câu hỏi</th><th>Đáp án A</th><th>Đáp án B</th><th>Đáp án C</th><th>Đáp án D</th><th>ĐA Đúng</th><th>Giải thích</th></tr></thead><tbody>`
                +data.map((d,i)=>`<tr class="${d.valid?'':'bad'}"><td style="color:#475569">${i+1}</td><td><b style="color:var(--warning)">${d.parts[0]||'—'}</b></td><td>${d.parts[1]||'—'}</td><td>${d.parts[2]||'—'}</td><td>${d.parts[3]||'—'}</td><td>${d.parts[4]||'—'}</td><td style="color:var(--success); font-weight:bold;">${d.parts[5]||'—'}</td><td style="color:#f97316;">${d.parts[6]||'—'}</td></tr>`).join('')
                +'</tbody></table>';
            return;
        }
        const c1=document.getElementById('col1').value, c2=document.getElementById('col2').value, c3=document.getElementById('col3').value;
        const c4=document.getElementById('col4')?document.getElementById('col4').value:'c4';
        const c5=document.getElementById('col5')?document.getElementById('col5').value:'c5';
        const c6=document.getElementById('col6')?document.getElementById('col6').value:'c6';
        const L={c1: (isGram?'Cấu trúc':'Kanji/Từ'), c2:'Cách đọc', c3:'Nghĩa', c4:'Ví dụ', c5:'Đáp án', c6:'Giải thích'};
        box.innerHTML=`<table class="prev-tbl" style="font-size:12px;"><thead><tr><th>#</th><th>${L[c1]}</th><th>${L[c2]}</th><th>${L[c3]}</th><th>${L[c4]}</th><th>${L[c5]}</th><th>${L[c6]}</th></tr></thead><tbody>`
            +data.map((d,i)=>`<tr class="${d.valid?'':'bad'}"><td style="color:#475569">${i+1}</td><td><b style="color:var(--warning)">${parseFormat(d.entry[c1])||'—'}</b></td><td>${parseFormat(d.entry[c2])||'—'}</td><td style="color:#94a3b8">${parseFormat(d.entry[c3])||'—'}</td><td>${parseFormat(d.entry[c4])||'—'}</td><td style="color:var(--success)">${parseFormat(d.entry[c5])||'—'}</td><td style="color:#f97316">${parseFormat(d.entry[c6])||'—'}</td></tr>`).join('')
            +'</tbody></table>';
    }

    async function pasteFromClipboard() {
        try {
            if(navigator.clipboard&&navigator.clipboard.readText){
                const t=await navigator.clipboard.readText();
                document.getElementById('import-input').value=t;
                updateImportPreview();
            } else { document.getElementById('import-input').focus(); }
        } catch(e) { document.getElementById('import-input').focus(); }
    }

    let isEditMode = false;

    function toggleEditMode() {
        isEditMode = !isEditMode;
        const btn = document.getElementById('btn-chinh-sua');
        const btnCapNhat = document.getElementById('btn-cap-nhat');
        if(isEditMode) {
            btn.style.background = '#3b82f6';
            btn.style.color = '#fff';
            btn.innerHTML = '✏️ Đang sửa';
            btnCapNhat.style.display = 'inline-flex';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = '#3b82f6';
            btn.innerHTML = '✏️ Chỉnh sửa';
            btnCapNhat.style.display = 'none';
        }
        renderCurWordList();
    }

    function renderCurWordList() {
        if(!curDay) return;
        const rawList = db[curLevel][curType][curDay].list;
        const isQuizTab = (curSubTab === 'trac-nghiem');
        const showTrash = isEditMode;
        
        const filtered = rawList.map((w, idx) => ({ w, idx })).filter(item => {
            if (isQuizTab) return item.w.gramType === 'quiz';
            return item.w.gramType !== 'quiz';
        });
        
        document.getElementById('cur-count').textContent = `(${filtered.length} từ)`;
        const box = document.getElementById('cur-word-list');
        if(!filtered.length){ box.innerHTML='<div class="imp-empty">Chưa có từ nào</div>'; return; }
        
        let html = '';
        if (isQuizTab) {
            html += `<table class="wlist-tbl" style="font-size:12px;"><thead><tr><th>#</th><th>Câu hỏi</th><th>ĐA Đúng</th><th>Sai 1</th><th>Sai 2</th><th>Sai 3</th><th>Giải thích</th>${showTrash?'<th>Hành động</th>':''}</tr></thead><tbody>`;
            html += filtered.map((item, displayIdx) => {
                const w = item.w;
                const i = item.idx;
                if (showTrash) {
                    return `<tr><td style="color:#475569">${displayIdx+1}</td><td colspan="6">
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <input type="text" value="${(w.q||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'q', this.value)" placeholder="Câu hỏi" style="width:100%; background:rgba(0,0,0,0.3); color:var(--warning); border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                                <input type="text" value="${(w.ans||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'ans', this.value)" placeholder="ĐA Đúng" style="flex:1; min-width:80px; background:rgba(34,197,94,0.1); color:var(--success); border:1px solid var(--success); border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.w1||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'w1', this.value)" placeholder="Sai 1" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.w2||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'w2', this.value)" placeholder="Sai 2" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.w3||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'w3', this.value)" placeholder="Sai 3" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                                <input type="text" value="${(w.explain||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'explain', this.value)" placeholder="Giải thích" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#f97316; border:1px solid #f97316; border-radius:4px; padding:6px; font-family:'Baloo 2'; box-sizing:border-box;">
                            </div>
                        </div></td><td><button class="wdel" onclick="directDeleteWord(${i})" title="Xoá từ này">🗑</button></td></tr>`;
                } else {
                    return `<tr>
                        <td style="color:#475569">${displayIdx+1}</td>
                        <td><b style="color:var(--warning)">${parseFormat(w.q)}</b></td>
                        <td style="color:var(--success); font-weight:bold;">${parseFormat(w.ans)}</td>
                        <td>${parseFormat(w.w1)}</td>
                        <td>${parseFormat(w.w2)}</td>
                        <td>${parseFormat(w.w3)}</td>
                        <td style="color:#f97316">${parseFormat(w.explain||'')}</td>
                    </tr>`;
                }
            }).join('');
            html += '</tbody></table>';
        } else {
            html += `<table class="wlist-tbl" style="font-size:12px;"><thead><tr><th>#</th><th>Cột 1</th><th>Cột 2</th><th>Cột 3</th>${showTrash?'<th>Hành động</th>':''}</tr></thead><tbody>`;
            html += filtered.map((item, displayIdx) => {
                const w = item.w;
                const i = item.idx;
                if (showTrash) {
                    return `<tr>
                      <td style="color:#475569">${displayIdx+1}</td>
                      <td colspan="3">
                         <div style="display:flex; flex-direction:column; gap:6px;">
                            <div style="display:flex; gap:6px;">
                                <input type="text" value="${(w.c1||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c1', this.value)" placeholder="Cấu trúc/Từ" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:var(--warning); border:1px solid #3b82f6; border-radius:4px; padding:6px; font-weight:800; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                <input type="text" value="${(w.c2||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c2', this.value)" placeholder="Cách đọc" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                <input type="text" value="${(w.c3||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c3', this.value)" placeholder="Ý nghĩa" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#94a3b8; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                            </div>
                            <div style="display:flex; gap:6px;">
                                <input type="text" value="${(w.c4||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c4', this.value)" placeholder="Ví dụ" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid #3b82f6; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                <input type="text" value="${(w.c5||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c5', this.value)" placeholder="Đáp án" style="flex:1; min-width:80px; background:rgba(34,197,94,0.1); color:var(--success); border:1px solid var(--success); border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                                <input type="text" value="${(w.c6||'').replace(/"/g, '&quot;')}" onchange="updateWordData(${i}, 'c6', this.value)" placeholder="Giải thích" style="flex:1; min-width:80px; background:rgba(0,0,0,0.3); color:#f97316; border:1px solid #f97316; border-radius:4px; padding:6px; font-family:'Baloo 2'; font-size:13px; box-sizing:border-box;">
                            </div>
                         </div>
                      </td>
                      <td><button class="wdel" onclick="directDeleteWord(${i})" title="Xoá từ này">🗑</button></td>
                    </tr>`;
                } else {
                    return `<tr>
                      <td style="color:#475569">${displayIdx+1}</td>
                      <td><b style="color:var(--warning)">${parseFormat(w.c1)}</b><br><span style="color:#f97316; font-size:12px;">${parseFormat(w.c6||'')}</span></td>
                      <td>${parseFormat(w.c2||'')}<br><span style="color:var(--success); font-size:12px;">${parseFormat(w.c5||'')}</span></td>
                      <td style="color:#94a3b8">${parseFormat(w.c3||'')}<br><span style="color:#fff; font-size:12px;">${parseFormat(w.c4||'')}</span></td>
                    </tr>`;
                }
            }).join('');
            html += '</tbody></table>';
        }
        box.innerHTML = html;
    }

    function updateWordData(idx, field, value) {
        db[curLevel][curType][curDay].list[idx][field] = value;
    }

    function directDeleteWord(idx) {
        db[curLevel][curType][curDay].list.splice(idx, 1);
        saveToLocal();
        renderCurWordList();
        // Hiện nút Cập nhật (luôn visible khi editMode)
        document.getElementById('cur-count').textContent = `(${db[curLevel][curType][curDay].list.length} từ)`;
        updateGlobalStats();
    }

    function applyAndSync() {
        saveToLocal();
        updateGlobalStats();
        renderSidebar();
        currentList = db[curLevel][curType][curDay].list;
        if(document.getElementById('quiz-container').innerHTML !== '') {
            renderQuiz();
        }
        document.getElementById('submit-container').style.display = currentList.length > 0 ? 'flex' : 'none';
        document.getElementById('rt-wrapper').style.display = currentList.length > 0 ? 'flex' : 'none';

        // Tắt chế độ chỉnh sửa sau khi cập nhật
        isEditMode = false;
        const btnCS = document.getElementById('btn-chinh-sua');
        btnCS.style.background = 'transparent';
        btnCS.style.color = '#3b82f6';
        btnCS.innerHTML = '✏️ Chỉnh sửa';
        document.getElementById('btn-cap-nhat').style.display = 'none';
        renderCurWordList();

        const btn = document.getElementById('btn-cap-nhat');
        btn.innerHTML = '✅ ĐÃ CẬP NHẬT!';
        btn.style.background = 'var(--success)';
        btn.style.display = 'inline-flex';
        setTimeout(() => {
            btn.innerHTML = '🔄 CẬP NHẬT';
            btn.style.background = '';
            btn.style.display = 'none';
        }, 1500);
    }

    function renderSidebar() {
        const icons = ['🌸', '🍀', '🌻', '🌺', '🌿', '🍄', '🎀', '🧸', '🌷', '🍁', '🌱', '🌼'];
        ["n1", "n2", "n3", "bjt"].forEach(lv => { ["voca", "gram"].forEach(ty => {
            const container = document.getElementById(`${lv}-${ty}`); container.innerHTML = "";
            Object.keys(db[lv][ty]).forEach((dayKey, idx) => {
                const isAllDone = db[lv][ty][dayKey].done.every(v => v === true);
                const wordCount = db[lv][ty][dayKey].list.length;
                const div = document.createElement("div"); div.className = "menu-lvl3";
                const rIcon = icons[idx % icons.length];
                div.innerHTML = `
                    <span onclick="selectDay('${lv}', '${ty}', '${dayKey}')" style="flex:1; display:flex; align-items:center; gap:8px;">
                        ${rIcon} <span>${dayKey}</span>
                    </span>
                    <span style="display:flex; align-items:center; gap:8px; margin-right:12px;">
                        ${isAllDone ? '<b class="done-check" style="font-size:18px;">✅</b>' : ''}
                        <span style="font-size:13px; font-weight:800; color:var(--accent); border: 1px solid var(--accent); padding: 2px 8px; border-radius: 12px; box-shadow: 0 0 8px rgba(59,130,246,0.5);">${wordCount} từ</span>
                    </span>
                    <span style="display:flex; gap:12px; align-items:center;">
                        <span style="color:var(--success)" onclick="exportDayTxt('${lv}', '${ty}', '${dayKey}')" title="Xuất file TXT">📄</span>
                        <span style="color:var(--accent)" onclick="renameDay('${lv}', '${ty}', '${dayKey}')" title="Đổi tên">✏️</span>
                        <span style="color:var(--danger)" onclick="deleteDay('${lv}', '${ty}', '${dayKey}')" title="Xóa">✕</span>
                    </span>`;
                container.appendChild(div);
            });
            const addBtn = document.createElement("button"); addBtn.className = "btn btn-gray"; addBtn.style = "width:100%; border-radius:0; font-size:12px;"; addBtn.innerText = "+ THÊM BÀI HỌC"; addBtn.onclick = () => addDay(lv, ty); container.appendChild(addBtn);
        }); });
    }

    function renameDay(lv, ty, oldDay) {
        const newDay = prompt("Nhập tên bài mới:", oldDay);
        if(!newDay || newDay === oldDay) return;
        if(db[lv][ty][newDay]) { alert("Tên bài này đã tồn tại!"); return; }
        const newObj = {};
        for(let key in db[lv][ty]) {
            if(key === oldDay) { newObj[newDay] = db[lv][ty][oldDay]; } 
            else { newObj[key] = db[lv][ty][key]; }
        }
        db[lv][ty] = newObj;
        if(curDay === oldDay && curLevel === lv && curType === ty) curDay = newDay;
        saveToLocal(); renderSidebar();
        if(curDay === newDay) selectDay(lv, ty, newDay);
    }

    function switchSubTab(tab) {
        curSubTab = tab;
        const isQuizTab = (curSubTab === 'trac-nghiem');
        
        document.getElementById('tab-tu-don').className = isQuizTab ? 'btn btn-gray' : 'btn btn-blue';
        document.getElementById('tab-trac-nghiem').className = isQuizTab ? 'btn btn-blue' : 'btn btn-gray';
        
        const modeBox = document.getElementById('mode-box-container');
        if(modeBox) modeBox.style.display = isQuizTab ? 'none' : 'block';
        
        document.getElementById('btn-add-word').style.display = isQuizTab ? 'none' : 'inline-flex';
        document.getElementById('btn-show-list').style.display = isQuizTab ? 'none' : 'inline-flex';
        
        const btnImport = document.getElementById('btn-import');
        if(btnImport) {
            btnImport.style.display = 'inline-flex';
            btnImport.innerText = isQuizTab ? "📥 NHẬP CÂU HỎI HÀNG LOẠT" : "📥 NHẬP NHIỀU";
        }
        
        document.getElementById('btn-shuffle').style.display = isQuizTab ? 'inline-flex' : 'none';
        
        const isAllDone = db[curLevel][curType][curDay].done.slice(0,3).every(v => v === true);
        const isQuizDone = db[curLevel][curType][curDay].done[3] === true;
        
        const btnMark = document.getElementById('btn-mark-done');
        const btnUnmark = document.getElementById('btn-unmark-done');
        if(btnMark) btnMark.style.display = isQuizTab ? (isQuizDone ? 'none' : 'inline-flex') : (isAllDone ? 'none' : 'inline-flex');
        if(btnUnmark) btnUnmark.style.display = isQuizTab ? (isQuizDone ? 'inline-flex' : 'none') : (isAllDone ? 'inline-flex' : 'none');
        
        if (!isQuizTab) {
            changeMode(0);
        } else {
            renderQuiz();
        }
    }

    function selectDay(lv, ty, day, listOverride = null) {
        curLevel = lv; curType = ty; curDay = day; currentList = listOverride || db[lv][ty][day].list;
        document.getElementById('view-title').textContent = (listOverride ? "♻️ " : "📌 ") + day;
        const startBtn = document.getElementById('btn-start-lesson');
        if(startBtn) startBtn.style.display = 'none';
        
        document.getElementById('sub-tab-container').style.display = listOverride ? 'none' : 'flex';
        
        if (!listOverride) {
            switchSubTab('tu-don');
        } else {
            document.getElementById('mode-box-container').style.display = 'none';
            ["btn-add-word", "btn-import", "btn-show-list", "btn-shuffle", "btn-mark-done", "btn-unmark-done"].forEach(id => {
                const el = document.getElementById(id); if(el) el.style.display = 'none';
            });
            renderQuiz();
        }
        
        document.getElementById('submit-container').style.display = currentList.length > 0 ? 'flex' : 'none';
        document.getElementById('rt-wrapper').style.display = currentList.length > 0 ? 'flex' : 'none';
        if(document.getElementById('sidebar').classList.contains('open')) toggleMenu();
        resetTimer();
    }

    function changeMode(m) { 
        currentMode = m; 
        
        for(let i=0; i<3; i++) {
            const btn = document.getElementById(`mode-${i}`);
            if(!btn) continue;
            const isDone = db[curLevel][curType][curDay].done[i];
            
            btn.className = (i === m) ? 'btn btn-blue' : 'btn btn-gray';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            
            let txt = "";
            if (curType === 'voca') {
                txt = (i==0?"CÁCH ĐỌC":i==1?"NGHĨA":"TIẾNG NHẬT");
            } else {
                txt = (i==0?"TÌM NGHĨA":i==1?"TÌM CẤU TRÚC":"TÌM CÁCH ĐỌC");
            }
            btn.innerHTML = `<span style="font-size: 12px; opacity: 0.8; margin-bottom: 4px;">ĐỀ ${i+1}</span><span>${txt}${isDone ? ' ✅' : ''}</span>`;
        }
        renderQuiz(); 
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function renderQuiz() {
        const isQuizTab = (curSubTab === 'trac-nghiem');
        
        if (isQuizTab) {
            quizItems = currentList.map((item, originalIndex) => ({ ...item, originalIndex })).filter(item => item.gramType === 'quiz');
            if (quizItems.length === 0) {
                document.getElementById('quiz-container').innerHTML = '<div style="text-align:center; padding:30px; color:#cbd5e1;">Chưa có câu hỏi trắc nghiệm nào. Hãy nhập thêm nhé!</div>';
                document.getElementById('submit-container').style.display = 'none';
                return;
            }
            
            // Layout mới
            let html = `
            <div class="quiz-layout" style="display:flex; gap:20px; flex-wrap:wrap;">
                <div class="quiz-main" style="flex:1; min-width:300px;">
                    <div style="margin-bottom:15px; background:rgba(0,0,0,0.2); padding:10px 15px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                        <span style="color:var(--warning); font-weight:800; font-size:14px;">⚙️ CHẾ ĐỘ HIỂN THỊ</span>
                        <select id="quiz-fb-mode" onchange="changeFeedbackMode()" style="background:#1e293b; color:#fff; border:2px solid #334155; border-radius:8px; padding:6px 12px; font-family:'Baloo 2'; font-weight:700; font-size:14px; outline:none; cursor:pointer;">
                            <option value="instant" ${quizFeedbackMode === 'instant' ? 'selected' : ''}>Hiện luôn đáp án sau khi làm</option>
                            <option value="delayed" ${quizFeedbackMode === 'delayed' ? 'selected' : ''}>Hiện kết quả khi hoàn thành</option>
                        </select>
                    </div>
                    
                    <div id="single-question-container"></div>
                    
                    <div style="display:flex; justify-content:space-between; margin-top:20px;">
                        <button class="btn btn-gray" id="btn-prev-q" onclick="jumpToQuestion(currentQuizIndex - 1)" style="flex:1; margin-right:10px;">⬅️ CÂU TRƯỚC</button>
                        <button class="btn btn-blue" id="btn-next-q" onclick="jumpToQuestion(currentQuizIndex + 1)" style="flex:1; margin-left:10px;">CÂU TIẾP THEO ➡️</button>
                    </div>
                </div>
                
                <div class="quiz-palette" style="width:250px; background:var(--card-bg); border-radius:16px; padding:15px; border:1px solid rgba(255,255,255,0.1); height:fit-content; box-shadow:0 8px 20px rgba(0,0,0,0.3);">
                    <div style="font-size:14px; font-weight:800; color:var(--accent); text-transform:uppercase; text-align:center; margin-bottom:15px; border-bottom:1px dashed rgba(59,130,246,0.3); padding-bottom:10px;">DANH SÁCH CÂU HỎI</div>
                    <div id="palette-grid" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:8px;"></div>
                    <div style="display:flex; gap:8px; margin-top:20px;">
                        <button class="btn btn-gray" style="flex:1; font-size:14px; padding:12px; justify-content:center;" onclick="resetQuiz()">🔄 LÀM LẠI</button>
                        <button class="btn btn-green" style="flex:1; font-size:14px; padding:12px; justify-content:center;" onclick="submitQuiz()">✅ NỘP BÀI</button>
                    </div>
                </div>
            </div>`;
            
            document.getElementById('quiz-container').innerHTML = html;
            
            // Xóa nút Nộp Bài mặc định ở dưới cùng vì đã có trong Palette
            document.getElementById('submit-container').style.display = 'none';
            
            renderQuizPalette();
            jumpToQuestion(0);
        } else {
            // Hiển thị lại nút nộp bài gốc cho chế độ Từ Đơn
            document.getElementById('submit-container').style.display = currentList.length > 0 ? 'flex' : 'none';
            
            // Chế độ Từ Đơn (scroll)
            document.getElementById('quiz-container').innerHTML = currentList.map((item, i) => {
                const isQuizItem = (item.gramType === 'quiz');
                if (isQuizItem) return '';

                let ques = '', ans = '';
                if (curType === 'gram') {
                    if(currentMode === 0) { ques = item.c1||''; ans = item.c3||''; } 
                    else if(currentMode === 1) { ques = item.c3||''; ans = item.c1||''; }
                } else {
                    if(currentMode === 0) { ques = item.c1||''; ans = item.c2||''; } 
                    else if(currentMode === 1) { ques = item.c1||''; ans = item.c3||''; } 
                    else { ques = item.c3||''; ans = item.c1||''; }
                }
                return `<div class="card" id="q-${i}" data-idx="${i}" style="border-left: 10px solid #334155; transition: border-color 0.3s;">
                    <div style="font-size:26px; font-weight:800; margin-bottom:10px; display:flex; align-items:center; gap:15px; flex-wrap:wrap;">
                        <span>${parseFormat(ques)} ${item.count >= 5 ? '⭐' : ''} <a href="https://www.google.com/search?q=${encodeURIComponent('Giải thích nghĩa của ' + (item.c1||'') + ' và cách sử dụng trong tiếng nhật')}" target="_blank" style="text-decoration:none; margin-left:8px; display:inline-flex; align-items:center; transition:0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Tra cứu trên Google"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 6px rgba(244,114,182,0.8));"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></a></span>
                        <span id="msg-${i}" class="fb-msg"></span>
                    </div>
                    ${item.c4 ? `<div style="font-size:16px; color:#cbd5e1; margin-bottom:15px; background:rgba(0,0,0,0.2); padding:10px 15px; border-radius:10px; border-left:4px solid var(--warning);">💡 ${parseFormat(item.c4)}</div>` : ''}
                    <div style="display:flex; gap:12px;">
                        <input type="text" id="input-${i}" data-ans="${ans}" oninput="check(${i})" onkeydown="handleKey(event, ${i})" autocomplete="off" placeholder="...">
                        <button class="btn btn-gray" style="width:70px; font-size:24px;" onclick="showHint(${i})">👁️</button>
                    </div>
                </div>`;
        }).join('');
        
        if (!document.getElementById('quiz-styles')) {
            const style = document.createElement('style');
            style.id = 'quiz-styles';
            style.innerHTML = `
            .quiz-opt { background: rgba(30,41,59,0.7); border: 2px solid #3b82f6; border-radius: 12px; padding: 15px; color: white; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.3); font-family: 'Baloo 2', 'Kosugi Maru', sans-serif; }
            .quiz-opt:hover { background: rgba(59,130,246,0.3); transform: translateY(-2px); box-shadow: 0 6px 12px rgba(59,130,246,0.4); }
            .quiz-opt.correct { background: var(--success) !important; border-color: #4ade80 !important; box-shadow: 0 0 20px var(--success) !important; color: #fff; transform: scale(1.02); }
            .quiz-opt.wrong { background: var(--danger) !important; border-color: #f87171 !important; box-shadow: 0 0 20px var(--danger) !important; animation: shake 0.4s; }
            .quiz-opt.selected { background: rgba(59,130,246,0.6) !important; border-color: #60a5fa !important; box-shadow: 0 0 15px rgba(59,130,246,0.6) !important; transform: scale(1.02); }
            `;
            document.head.appendChild(style);
        }
        updateChart();
    }

    function changeFeedbackMode() {
        quizFeedbackMode = document.getElementById('quiz-fb-mode').value;
        localStorage.setItem('mgao_v37_quiz_fb', quizFeedbackMode);
        renderQuizPalette();
        jumpToQuestion(currentQuizIndex);
    }

    function renderQuizPalette() {
        let html = '';
        quizItems.forEach((item, idx) => {
            const hasAnswered = quizState.answers[item.originalIndex] !== undefined;
            const isCorrect = quizState.correct[item.originalIndex];
            const isReviewMode = document.getElementById('quiz-fb-mode')?.disabled;
            
            let bg = '#334155';
            if (hasAnswered) {
                if (isReviewMode || quizFeedbackMode === 'instant') {
                    bg = isCorrect ? 'var(--success)' : 'var(--danger)';
                } else {
                    bg = 'var(--accent)';
                }
            }
            
            html += `<button class="palette-btn" id="pal-btn-${idx}" onclick="jumpToQuestion(${idx})" style="background:${bg}; border:none; color:#fff; border-radius:8px; font-weight:bold; height:35px; cursor:pointer; transition:0.2s; font-family:'Baloo 2'; font-size:14px;">${idx + 1}</button>`;
        });
        const grid = document.getElementById('palette-grid');
        if (grid) grid.innerHTML = html;
    }

    function jumpToQuestion(idx) {
        if (idx < 0 || idx >= quizItems.length) return;
        currentQuizIndex = idx;
        
        const item = quizItems[idx];
        const originalIndex = item.originalIndex;
        
        let opts = [
            { t: item.ans, v: 1 },
            { t: item.w1, v: 0 },
            { t: item.w2, v: 0 },
            { t: item.w3, v: 0 }
        ].filter(o => o.t);
        
        if (!item.shuffledOpts) {
            shuffleArray(opts);
            item.shuffledOpts = opts;
        } else {
            opts = item.shuffledOpts;
        }
        
        const hasAnswered = quizState.answers[originalIndex] !== undefined;
        const selectedBtnIdx = quizState.answers[originalIndex];
        const isReviewMode = document.getElementById('quiz-fb-mode').disabled;
        
        let optHtml = opts.map((o, optIdx) => {
            let extraClass = '';
            if (hasAnswered && selectedBtnIdx === optIdx) {
                extraClass = 'selected';
            }
            if (quizFeedbackMode === 'instant' || isReviewMode) {
                if (hasAnswered && selectedBtnIdx === optIdx) {
                    extraClass = o.v === 1 ? 'correct' : 'wrong';
                } else if ((hasAnswered || isReviewMode) && o.v === 1) {
                    extraClass = 'correct';
                }
            }
            return `<button class="quiz-opt ${extraClass}" id="opt-${originalIndex}-${optIdx}" onclick="checkQuiz(${originalIndex}, ${optIdx}, ${o.v === 1}, ${idx})" ${isReviewMode ? 'style="pointer-events:none;"' : ''}>${parseFormat(o.t)}</button>`;
        }).join('');
        
        let explainHtml = '';
        if (item.explain && (quizFeedbackMode === 'instant' && hasAnswered || isReviewMode)) {
            explainHtml = `<div id="explain-${originalIndex}" style="margin-top:15px; background:#fef3c7; color:#0f172a; border:2px solid #ea580c; border-radius:12px; padding:15px; font-size:17px; font-weight:700; text-align:left; line-height:1.5; box-shadow:0 4px 10px rgba(234,88,12,0.2);">💡 <b>Giải thích:</b><br>${parseFormat(item.explain)}</div>`;
        }

        let html = `
        <div class="card" id="q-${originalIndex}" data-idx="${originalIndex}" style="border-left: 10px solid #334155; transition: border-color 0.3s; padding: 25px; border-radius: 16px; background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); box-shadow: 0 8px 32px rgba(0,0,0,0.3); margin-bottom: 0;">
            <div style="position:relative; font-size:20px; font-weight:800; margin-bottom:25px; color:#0f172a; background:#f8fafc; padding:20px 25px 20px 25px; border-radius:12px; text-align:left; line-height:1.6; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 6px solid #3b82f6;">
                <div style="position:absolute; top:-15px; left:-15px; background:var(--accent); color:white; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; box-shadow:0 4px 10px rgba(59,130,246,0.5); border:3px solid #f8fafc;">${idx + 1}</div>
                <div style="width:100%;">${parseFormat(item.q)}</div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;" id="opts-wrap-${originalIndex}">
                ${optHtml}
            </div>
            <div id="msg-${originalIndex}" class="fb-msg" style="text-align:center; margin-top:15px; font-size:18px;"></div>
            ${explainHtml}
        </div>`;
        
        document.getElementById('single-question-container').innerHTML = html;
        
        const card = document.getElementById(`q-${originalIndex}`);
        const msg = document.getElementById(`msg-${originalIndex}`);
        if (quizFeedbackMode === 'instant' && hasAnswered) {
            const isCorrect = quizState.correct[originalIndex];
            card.style.borderLeftColor = isCorrect ? 'var(--success)' : 'var(--danger)';
            msg.className = isCorrect ? 'fb-msg show ok' : 'fb-msg show ng';
            msg.innerText = isCorrect ? 'Chính xác rồi nè 🎉' : 'Sai rồi tiếc quá 😢';
        }

        const btnPrev = document.getElementById('btn-prev-q');
        const btnNext = document.getElementById('btn-next-q');
        if (btnPrev) {
            btnPrev.disabled = (idx === 0);
            btnPrev.style.opacity = (idx === 0) ? '0.5' : '1';
        }
        if (btnNext) {
            btnNext.disabled = (idx === quizItems.length - 1);
            btnNext.style.opacity = (idx === quizItems.length - 1) ? '0.5' : '1';
        }
        
        document.querySelectorAll('.palette-btn').forEach(btn => {
            btn.style.boxShadow = '';
            btn.style.transform = 'scale(1)';
        });
        const currentPalBtn = document.getElementById(`pal-btn-${idx}`);
        if(currentPalBtn) {
            currentPalBtn.style.boxShadow = '0 0 0 3px #fff, 0 0 15px rgba(59,130,246,0.8)';
            currentPalBtn.style.transform = 'scale(1.1)';
        }
    }

    let audioCtx = null;
    function unlockAudio() {
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            gain.gain.value = 0;
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(0); osc.stop(audioCtx.currentTime + 0.1);
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('click', unlockAudio);
        } catch(e) {}
    }
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('click', unlockAudio);

    function playSound(type) {
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator(), gainNode = audioCtx.createGain();
            osc.connect(gainNode); gainNode.connect(audioCtx.destination);
            if (type === 'ting') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                osc.start(); osc.stop(audioCtx.currentTime + 0.3);
            } else {
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(120, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                osc.start(); osc.stop(audioCtx.currentTime + 0.2);
            }
        } catch(e) {}
    }

    function checkQuiz(originalIndex, btnIdx, isCorrect, localIndex) {
        if (!timerInterval) toggleTimer();
        
        const isReviewMode = document.getElementById('quiz-fb-mode')?.disabled;
        if (isReviewMode) return; 
        
        if (quizFeedbackMode === 'instant' && quizState.answers[originalIndex] !== undefined) {
            return; // Không cho chọn lại nếu là instant
        }
        
        quizState.answers[originalIndex] = btnIdx;
        quizState.correct[originalIndex] = isCorrect;
        
        const wrap = document.getElementById(`opts-wrap-${originalIndex}`);
        if(wrap) {
            wrap.querySelectorAll('.quiz-opt').forEach((b, idx) => {
                b.classList.remove('selected', 'correct', 'wrong');
                if (quizFeedbackMode === 'instant') {
                    b.style.pointerEvents = 'none';
                    if (idx === btnIdx) b.classList.add(isCorrect ? 'correct' : 'wrong');
                    if (b.getAttribute('onclick').includes('true')) {
                        b.classList.add('correct');
                    }
                } else {
                    if (idx === btnIdx) b.classList.add('selected');
                }
            });
        }
        
        const card = document.getElementById(`q-${originalIndex}`);
        const msg = document.getElementById(`msg-${originalIndex}`);
        
        if (quizFeedbackMode === 'instant') {
            if (isCorrect) {
                playSound('ting');
                card.style.borderLeftColor = 'var(--success)';
                if(msg) { msg.className = 'fb-msg show ok'; msg.innerText = 'Chính xác rồi nè 🎉'; }
            } else {
                playSound('buzz');
                card.style.borderLeftColor = 'var(--danger)';
                if(msg) { msg.className = 'fb-msg show ng'; msg.innerText = 'Sai rồi tiếc quá 😢'; }
            }
            // re-render lại thẻ để hiện giải thích
            setTimeout(() => { jumpToQuestion(localIndex); }, 300);
        } else {
            if(msg) msg.className = 'fb-msg';
            renderQuizPalette();
            // Tô lại viền active
            const currentPalBtn = document.getElementById(`pal-btn-${localIndex}`);
            if(currentPalBtn) {
                currentPalBtn.style.boxShadow = '0 0 0 3px #fff, 0 0 15px rgba(59,130,246,0.8)';
                currentPalBtn.style.transform = 'scale(1.1)';
            }
        }
    }

    function handleKey(e, idx) {
        if(e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            if (e.key === 'Enter') check(idx, true);
            document.getElementById(`input-${idx+1}`)?.focus();
        } else if(e.key === 'ArrowUp') {
            e.preventDefault();
            document.getElementById(`input-${idx-1}`)?.focus();
        }
    }


    function check(idx, isSubmit = false) {
        const input = document.getElementById(`input-${idx}`), val = input.value.trim().toLowerCase(), ans = input.getAttribute('data-ans').toLowerCase(), card = document.getElementById(`q-${idx}`);
        const prevRes = card.getAttribute('data-res');
        const msg = document.getElementById(`msg-${idx}`);
        input.classList.remove('correct', 'error-shake'); 
        
        if (val === ans) { 
            input.classList.add('correct'); 
            card.setAttribute('data-res', 'ok'); 
            card.style.borderLeftColor = 'var(--success)';
            msg.className = 'fb-msg show ok';
            msg.innerText = 'Chính xác rồi nè 🎉';
            if(prevRes !== 'ok') {
                playSound('ting');
                const rect = input.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                confetti({ particleCount: 50, spread: 60, origin: { x: Math.max(0.1, Math.min(x, 0.9)), y: Math.max(0.1, Math.min(y, 0.9)) }, colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'], zIndex: 999999 });
            }
        }
        else if (val === "") { 
            card.removeAttribute('data-res'); 
            card.style.borderLeftColor = '#334155';
            msg.className = 'fb-msg';
        } 
        else { 
            if (card.getAttribute('data-res') !== 'forgot') {
                card.setAttribute('data-res', 'ng'); 
            }
            if (isSubmit) {
                playSound('buzz');
                input.classList.add('error-shake');
                card.style.borderLeftColor = 'var(--danger)';
                msg.className = 'fb-msg show ng';
                msg.innerText = 'Sai rồi tiếc quá 😢';
                setTimeout(() => input.classList.remove('error-shake'), 400);
            }
        }
        updateChart();
    }

    function updateChart() {
        if(!currentList || currentList.length === 0) return;
        let ok = 0, ng = 0, forgot = 0;
        const cards = document.querySelectorAll('.card[id^="q-"]');
        const total = cards.length;
        if (total === 0) return;

        cards.forEach(card => {
            const res = card.getAttribute('data-res');
            if(res === 'ok') ok++;
            else if(res === 'ng') ng++;
            else if(res === 'forgot') forgot++;
        });
        
        document.getElementById('rt-txt-ok').innerText = ok;
        document.getElementById('rt-txt-ng').innerText = ng;
        document.getElementById('rt-txt-forgot').innerText = forgot;
        document.getElementById('rt-txt-remain').innerText = total - ok - ng - forgot;

        let pOk = (ok / total) * 100;
        let pNg = (ng / total) * 100;
        let pForgot = (forgot / total) * 100;
        
        let endOk = pOk;
        let endNg = endOk + pNg;
        let endForgot = endNg + pForgot;
        
        document.getElementById('rt-donut').style.background = `conic-gradient(
            var(--success) 0% ${endOk}%, 
            var(--danger) ${endOk}% ${endNg}%, 
            var(--warning) ${endNg}% ${endForgot}%, 
            #334155 ${endForgot}% 100%
        )`;
    }

    function toggleChartWidget() {
        const w = document.getElementById('rt-wrapper');
        w.classList.toggle('minimized');
        if(w.classList.contains('minimized')){
            document.getElementById('rt-content').style.display = 'none';
            document.getElementById('rt-min-icon').style.display = 'block';
        } else {
            document.getElementById('rt-content').style.display = 'flex';
            document.getElementById('rt-min-icon').style.display = 'none';
        }
    }

    function resetQuiz() {
        if(confirm('Bạn có chắc muốn làm lại bài này từ đầu? Toàn bộ các từ đang nhập dở sẽ bị xóa.')) {
            quizState = { answers: {}, correct: {} };
            const fbModeBtn = document.getElementById('quiz-fb-mode');
            if(fbModeBtn) fbModeBtn.disabled = false;
            renderQuiz();
            resetTimer();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    function shuffleQuiz() {
        if(currentList.length === 0) return;
        if(confirm("Trộn ngẫu nhiên vị trí các từ và làm lại từ đầu?")) {
            currentList = [...currentList];
            for (let i = currentList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [currentList[i], currentList[j]] = [currentList[j], currentList[i]];
            }
            quizState = { answers: {}, correct: {} };
            const fbModeBtn = document.getElementById('quiz-fb-mode');
            if(fbModeBtn) fbModeBtn.disabled = false;
            renderQuiz();
            resetTimer();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    function markAllDone() {
        const isQuizTab = (curSubTab === 'trac-nghiem');
        if (isQuizTab) {
            db[curLevel][curType][curDay].done[3] = true;
        } else {
            db[curLevel][curType][curDay].done[0] = true;
            db[curLevel][curType][curDay].done[1] = true;
            db[curLevel][curType][curDay].done[2] = true;
        }
        saveToLocal(); switchSubTab(curSubTab); renderSidebar();
    }

    function unmarkAllDone() {
        const isQuizTab = (curSubTab === 'trac-nghiem');
        if (isQuizTab) {
            db[curLevel][curType][curDay].done[3] = false;
        } else {
            db[curLevel][curType][curDay].done[0] = false;
            db[curLevel][curType][curDay].done[1] = false;
            db[curLevel][curType][curDay].done[2] = false;
        }
        saveToLocal(); switchSubTab(curSubTab); renderSidebar();
    }

    function submitQuiz() {
        if (timerInterval) toggleTimer();
        let ok = 0, failed = 0, total = 0;
        const isQuizTab = (curSubTab === 'trac-nghiem');
        
        if (isQuizTab) {
            total = quizItems.length;
            if (total === 0) { alert("Không có câu hỏi nào để chấm!"); return; }
            
            const answeredCount = Object.keys(quizState.answers).length;
            if (answeredCount < total) {
                if(!confirm(`Bạn mới làm ${answeredCount}/${total} câu. Bạn có chắc chắn muốn nộp bài?`)) {
                    toggleTimer();
                    return;
                }
            }
            
            quizItems.forEach(item => {
                const originalIndex = item.originalIndex;
                if (quizState.answers[originalIndex] !== undefined) {
                    if (quizState.correct[originalIndex]) {
                        ok++;
                        currentList[originalIndex].count = (currentList[originalIndex].count || 0) + 1;
                    } else {
                        failed++;
                    }
                } else {
                    failed++; 
                }
            });
            
            const modeSelect = document.getElementById('quiz-fb-mode');
            if(modeSelect) { modeSelect.value = 'delayed'; modeSelect.disabled = true; }
            renderQuizPalette();
            jumpToQuestion(currentQuizIndex); 
            
        } else {
            const cards = document.querySelectorAll('.card[id^="q-"]');
            total = cards.length;
            if (total === 0) { alert("Không có câu hỏi nào để chấm!"); return; }
            
            cards.forEach((card) => {
                const idx = card.getAttribute('data-idx');
                const isQuizItem = (currentList[idx].gramType === 'quiz');
                if (isQuizItem) return;
                
                const input = document.getElementById(`input-${idx}`);
                const ans = input ? input.getAttribute('data-ans').trim().toLowerCase() : '';
                const val = input ? input.value.trim().toLowerCase() : '';
                
                const exp = document.getElementById(`explain-${idx}`);
                if (exp) exp.style.display = 'block';
                
                if(card.getAttribute('data-res') === 'ok' || (ans === '' && val === '')) { 
                    ok++; 
                    currentList[idx].count = (currentList[idx].count || 0) + 1; 
                    card.setAttribute('data-res', 'ok');
                    if (input) input.classList.add('correct');
                    card.style.borderLeftColor = 'var(--success)';
                }
                else { 
                    failed++;
                    if (card.getAttribute('data-res') !== 'forgot') card.setAttribute('data-res', 'ng');
                    if (input) input.classList.add('error-shake');
                    card.style.borderLeftColor = 'var(--danger)';
                }
            });
            updateChart();
        }
        
        const percent = (ok / total) * 100;
        if(percent >= 90) {
            if(isQuizTab) db[curLevel][curType][curDay].done[3] = true;
            else db[curLevel][curType][curDay].done[currentMode] = true;
        }
        
        const isAllDone = db[curLevel][curType][curDay].done.slice(0,3).every(v => v === true);
        const isQuizDone = db[curLevel][curType][curDay].done[3] === true;
        
        const btnMark = document.getElementById('btn-mark-done');
        const btnUnmark = document.getElementById('btn-unmark-done');
        if(btnMark) btnMark.style.display = isQuizTab ? (isQuizDone ? 'none' : 'inline-flex') : (isAllDone ? 'none' : 'inline-flex');
        if(btnUnmark) btnUnmark.style.display = isQuizTab ? (isQuizDone ? 'inline-flex' : 'none') : (isAllDone ? 'inline-flex' : 'none');

        document.getElementById('res-ok').innerText = ok;
        document.getElementById('res-ng').innerText = failed;
        document.getElementById('res-time').innerText = document.getElementById('timer-display').textContent;
        document.getElementById('btn-retry-failed').style.display = (!isQuizTab && failed > 0) ? 'block' : 'none';
        
        let title = "CỐ GẮNG THÊM 💪";
        if(percent === 100) { title = "XUẤT SẮC! 🏆"; confetti({ particleCount: 200, spread: 70 }); }
        else if(percent >= 90) title = "QUÁ GIỎI! 🌟";
        
        document.getElementById('congrats-title').innerText = title;
        const btnClose = document.getElementById('btn-close-congrats');
        if(btnClose) btnClose.innerText = curType === 'gram' ? "ĐÓNG VÀ XEM GIẢI THÍCH" : "ĐÓNG";
        saveToLocal(); renderSidebar(); openModal('congrats-modal'); updateGlobalStats();
    }

    function retryFailedOnly() {
        const wrongs = [];
        document.querySelectorAll('.card[id^="q-"]').forEach((card) => {
            const idx = card.getAttribute('data-idx');
            if(card.getAttribute('data-res') !== 'ok') wrongs.push(currentList[idx]);
        });
        closeModal('congrats-modal');
        selectDay(curLevel, curType, curDay, wrongs);
    }

    function toggleTimer() { const btn = document.getElementById('timer-btn'); if (timerInterval) { clearInterval(timerInterval); timerInterval = null; btn.innerText = "▶ TIẾP TỤC"; btn.className="btn btn-green"; } else { timerInterval = setInterval(() => { seconds++; updateTime(); }, 1000); btn.innerText = "⏸ TẠM DỪNG"; btn.className="btn btn-danger"; } }
    function resetTimer() { seconds = 0; updateTime(); }
    function updateTime() { const m = Math.floor(seconds/60).toString().padStart(2,'0'), s = (seconds%60).toString().padStart(2,'0'); document.getElementById('timer-display').textContent = document.getElementById('header-timer').textContent = `${m}:${s}`; }

    function processImport(){
        const data=parseData(); const valid=data.filter(d=>d.valid);
        if(!valid.length){ alert('⚠️ Không tìm thấy dữ liệu hợp lệ!\nHãy kiểm tra dấu phân cách hoặc định dạng dữ liệu.'); return; }
        const mode=document.querySelector('input[name="imode"]:checked').value;
        if(mode==='replace'){
            if(!confirm(`Thay thế TOÀN BỘ ${db[curLevel][curType][curDay].list.length} từ hiện có bằng ${valid.length} từ mới?`)) return;
            db[curLevel][curType][curDay].list=valid.map(d=>d.entry);
        } else {
            db[curLevel][curType][curDay].list.push(...valid.map(d=>d.entry));
        }

        let dupCount = 0;
        const seen = new Set();
        const uniqueList = [];
        for (const item of db[curLevel][curType][curDay].list) {
            const key = (item.c1 || item.q || '').trim().toLowerCase(); 
            if (seen.has(key)) { dupCount++; } else { seen.add(key); uniqueList.push(item); }
        }
        if (dupCount > 0) {
            if (confirm(`⚠️ Phát hiện ${dupCount} từ bị TRÙNG LẶP (giống Kanji/Từ).\nBạn có muốn tự động xoá các từ trùng và chỉ giữ lại 1 từ không?`)) {
                db[curLevel][curType][curDay].list = uniqueList;
            }
        }

        saveToLocal(); renderSidebar(); selectDay(curLevel,curType,curDay);
        document.getElementById('import-input').value='';
        updateImportPreview(); renderCurWordList(); updateGlobalStats();
        alert(`✅ Đã nhập ${valid.length} từ! Tổng danh sách: ${db[curLevel][curType][curDay].list.length} từ.`);
    }

    function quickAddWord() {
        const isGram = (curType === 'gram');
        const dataType = document.querySelector('input[name="addGramType"]:checked')?.value || 'struct';

        if (dataType === 'quiz') {
            const q = document.getElementById('add-q').value.trim();
            const ans = document.getElementById('add-ans').value.trim();
            const w1 = document.getElementById('add-w1').value.trim();
            const w2 = document.getElementById('add-w2').value.trim();
            const w3 = document.getElementById('add-w3').value.trim();
            const explain = document.getElementById('add-q-explain').value.trim();
            if(!q || !ans) { alert("Nhập ít nhất câu hỏi và đáp án đúng!"); return; }
            db[curLevel][curType][curDay].list.push({ gramType: 'quiz', q, ans, w1, w2, w3, count:0, explain });
            document.getElementById('add-q').value = '';
            document.getElementById('add-ans').value = '';
            document.getElementById('add-w1').value = '';
            document.getElementById('add-w2').value = '';
            document.getElementById('add-w3').value = '';
            document.getElementById('add-q-explain').value = '';
            document.getElementById('add-q').focus();
        } else {
            const c1 = document.getElementById('add-c1').value.trim();
            const c2 = document.getElementById('add-c2').value.trim();
            const c3 = document.getElementById('add-c3').value.trim();
            const c4 = document.getElementById('add-c4').value.trim();
            const c5 = document.getElementById('add-c5').value.trim();
            const c6 = document.getElementById('add-c6').value.trim();
            if(!c1) { alert("Ô đầu tiên không được để trống!"); return; }
            
            const exists = db[curLevel][curType][curDay].list.some(w => (w.c1||'').trim().toLowerCase() === c1.toLowerCase());
            if(exists && !confirm(`⚠️ "${c1}" đã tồn tại trong bài này! Bạn vẫn muốn thêm?`)) return;

            const entry = { count: 0, c1: c1, c2: c2, c3: c3 || c2, c4: c4, c5: c5, c6: c6 };
            if (dataType === 'struct') entry.gramType = 'struct';
            db[curLevel][curType][curDay].list.push(entry);
            document.getElementById('add-c1').value = '';
            document.getElementById('add-c2').value = '';
            document.getElementById('add-c3').value = '';
            document.getElementById('add-c4').value = '';
            if(document.getElementById('add-c5')) document.getElementById('add-c5').value = '';
            if(document.getElementById('add-c6')) document.getElementById('add-c6').value = '';
            document.getElementById('add-c1').focus();
        }
        saveToLocal();
        updateGlobalStats();
        renderQuickAddList();
        renderSidebar(); 
        
        if (document.getElementById('quiz-container').innerHTML !== "") {
            renderQuiz();
        }
        
        const btn = document.querySelector('#add-word-modal .btn-green');
        const oldText = btn.innerText;
        btn.innerHTML = '✅ ĐÃ LƯU!';
        setTimeout(() => { btn.innerHTML = oldText; }, 900);
    }

    function renderQuickAddList() {
        if(!curDay) return;
        const list = db[curLevel][curType][curDay].list;
        const wrap = document.getElementById('quick-add-list-wrap');
        const tbody = document.getElementById('quick-add-tbody');
        const countEl = document.getElementById('quick-add-count');
        if(!wrap) return;
        if(list.length === 0) { wrap.style.display = 'none'; return; }
        wrap.style.display = 'block';
        countEl.textContent = `(${list.length} từ)`;
        // Hiện danh sách mới nhất ở trên cùng
        tbody.innerHTML = [...list].reverse().map((w, i) => {
            const realIdx = list.length - 1 - i;
            const isNew = i === 0;
            if (w.gramType === 'quiz') {
                return `<tr style="${isNew ? 'background:rgba(34,197,94,0.08);' : ''}">
                    <td style="color:#475569">${realIdx + 1}</td>
                    <td colspan="3"><b style="color:${isNew ? 'var(--success)' : 'var(--warning)'}">${parseFormat(w.q)}</b>${isNew ? ' <span style="font-size:10px;background:var(--success);color:#fff;padding:1px 6px;border-radius:10px;font-weight:800;">MỚI</span>' : ''} <br> <span style="color:var(--success)">${parseFormat(w.ans)}</span> | ${parseFormat(w.w1)}</td>
                </tr>`;
            } else {
                return `<tr style="${isNew ? 'background:rgba(34,197,94,0.08);' : ''}">
                    <td style="color:#475569">${realIdx + 1}</td>
                    <td><b style="color:${isNew ? 'var(--success)' : 'var(--warning)'}">${parseFormat(w.c1)}</b>${isNew ? ' <span style="font-size:10px;background:var(--success);color:#fff;padding:1px 6px;border-radius:10px;font-weight:800;">MỚI</span>' : ''}</td>
                    <td>${parseFormat(w.c2||'')}</td>
                    <td style="color:#94a3b8">${parseFormat(w.c3||'')}</td>
                </tr>`;
            }
        }).join('');
        // Scroll lên đầu để thấy từ mới nhất
        const scrollEl = wrap.querySelector('div[style*="overflow-y"]');
        if(scrollEl) scrollEl.scrollTop = 0;
    }

    function renderListTable() { document.getElementById('voca-list-body').innerHTML = db[curLevel][curType][curDay].list.map((item, i) => `<tr style="border-bottom:1px solid #334155"><td style="padding:10px">${i+1}</td><td style="font-weight:800; color:var(--warning); display:flex; align-items:center; gap:8px;">${parseFormat(item.q || item.c1)} <a href="https://www.google.com/search?q=${encodeURIComponent((item.q || item.c1) + ' とは')}" target="_blank" style="text-decoration:none; display:inline-flex; align-items:center;" title="Tra cứu trên Google"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 6px rgba(244,114,182,0.8));"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></a></td><td>${parseFormat(item.ans || item.c2 || '')}</td><td>${parseFormat(item.w1 || item.c3 || '')}</td></tr>`).join(''); }
    function updateGlobalStats() { 
        let tVoca = 0, mVoca = 0, tGram = 0, mGram = 0;
        ["n1","n2","n3","bjt"].forEach(lv => {
            Object.values(db[lv]['voca']).forEach(day => { tVoca += day.list.length; day.list.forEach(item => { if(item.count>=5) mVoca++; }) });
            Object.values(db[lv]['gram']).forEach(day => { tGram += day.list.length; day.list.forEach(item => { if(item.count>=5) mGram++; }) });
        });
        const elTotalVoca = document.getElementById('stat-voca-total'); if(elTotalVoca) elTotalVoca.innerText = tVoca;
        const elMasterVoca = document.getElementById('stat-voca-master'); if(elMasterVoca) elMasterVoca.innerText = mVoca;
        const elTotalGram = document.getElementById('stat-gram-total'); if(elTotalGram) elTotalGram.innerText = tGram;
        const elMasterGram = document.getElementById('stat-gram-master'); if(elMasterGram) elMasterGram.innerText = mGram;
    }
    function showHint(idx) { 
        const input = document.getElementById(`input-${idx}`); 
        input.value = input.getAttribute('data-ans'); 
        input.classList.add('correct'); 
        const card = document.getElementById(`q-${idx}`);
        card.setAttribute('data-res', 'forgot'); 
        card.style.borderLeftColor = '#a855f7';
        const msg = document.getElementById(`msg-${idx}`);
        msg.className = 'fb-msg show forgot';
        msg.innerText = 'Từ này bạn quên à 😅';
        updateChart(); 
    }

    function removeDuplicates() {
        const list = db[curLevel][curType][curDay].list;
        if(list.length === 0) return;
        const seen = new Set();
        const uniqueList = [];
        let dupCount = 0;
        for (const item of list) {
            const key = (item.c1 || item.q || '').trim().toLowerCase(); 
            if (seen.has(key)) { dupCount++; } else { seen.add(key); uniqueList.push(item); }
        }
        if (dupCount === 0) {
            alert("✅ Danh sách rất sạch! Không có từ nào bị trùng lặp.");
            return;
        }
        if (confirm(`⚠️ Phát hiện ${dupCount} từ bị TRÙNG LẶP (Dựa trên cột Kanji/Từ).\nBạn có chắc chắn muốn xoá các từ trùng và chỉ giữ lại 1 từ không?`)) {
            db[curLevel][curType][curDay].list = uniqueList;
            currentList = uniqueList;
            saveToLocal();
            renderCurWordList(); 
            renderListTable();
            updateGlobalStats();
            renderSidebar();
            if (document.getElementById('quiz-container').innerHTML !== "") {
                renderQuiz();
                resetTimer();
            }
            alert(`✅ Đã xoá thành công ${dupCount} từ trùng lặp!`);
        }
    }


    function addDay(lv, ty) { 
        const name = prompt("Tên bài:"); 
        if(name) { 
            db[lv][ty][name] = { list: [], done: [false, false, false, false] }; 
            saveToLocal();
            renderSidebar(); 
            selectDay(lv, ty, name); 
        } 
    }
    
    function deleteDay(lv, ty, day) { 
        if(confirm("Xóa?")) { 
            delete db[lv][ty][day]; 
            saveToLocal();
            renderSidebar(); 
            updateGlobalStats();
        } 
    }

    function exportDayTxt(lv, ty, dayKey) {
        const list = db[lv][ty][dayKey].list;
        if(list.length === 0) { alert("Bài này chưa có từ nào để xuất!"); return; }
        
        let content = "";
        list.forEach((item) => {
            content += `${(item.c1||'')} / ${(item.c2||'')} / ${(item.c3||'')}\n`;
        });
        
        const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${lv}_${ty}_${dayKey.replace(/ /g, '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportFile() {
        const dataStr = localStorage.getItem('mgao_v37_db');
        if (!dataStr) { alert("Không có dữ liệu để xuất!"); return; }
        const blob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TuVung_SaoLuu_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function importFile(e) {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const data = evt.target.result;
                const parsed = JSON.parse(data);
                if (parsed && parsed.n1 && parsed.n2) {
                    if(confirm("⚠️ CẢNH BÁO: Dữ liệu hiện tại trên máy này sẽ bị GHI ĐÈ TOÀN BỘ bằng dữ liệu từ File mới.\nBạn có chắc chắn muốn phục hồi không?")) {
                        if(!parsed.n3) { parsed.n3 = { voca: {}, gram: {} }; ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) parsed.n3[ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; }); }
                        if(!parsed.bjt) { parsed.bjt = { voca: {}, gram: {} }; ["voca", "gram"].forEach(ty => { for(let i=1; i<=10; i++) parsed.bjt[ty][`Ngày ${i}`] = { list: [], done: [false, false, false] }; }); }
                        localStorage.setItem('mgao_v37_db', JSON.stringify(parsed));
                        alert("✅ Phục hồi dữ liệu thành công! Màn hình sẽ tải lại.");
                        location.reload();
                    }
                } else {
                    alert("❌ File không đúng cấu trúc dữ liệu của ứng dụng!");
                }
            } catch(err) {
                alert("❌ Đã xảy ra lỗi khi đọc File!");
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    }

    function generateSyncLink() {
        const dataStr = localStorage.getItem('mgao_v37_db');
        if(!dataStr) { alert("Không có dữ liệu!"); return; }
        if (window.location.protocol === 'file:') {
            alert("⚠️ CẢNH BÁO:\nBạn đang mở file trực tiếp trên ổ cứng. Người khác sẽ KHÔNG THỂ truy cập link này!\n\n👉 Tính năng Link chỉ dùng được khi đưa file lên website. Hãy dùng tính năng XUẤT FILE nhé.");
            return;
        }
        try {
            const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(dataStr))));
            const link = window.location.origin + window.location.pathname + "?sync=" + encoded;
            if(link.length > 8000) {
                alert("⚠️ Dữ liệu quá lớn, link vượt giới hạn cho phép. Vui lòng dùng tính năng XUẤT FILE.");
                return;
            }
            navigator.clipboard.writeText(link).then(() => {
                alert("✅ ĐÃ COPY LINK ĐỒNG BỘ!\n\nDán link gửi qua Zalo/Mess. Thiết bị khác bấm vào Link là tự động nhận dữ liệu!");
            }).catch(() => {
                prompt("Copy đường link sau:", link);
            });
        } catch(e) {
            alert("❌ Lỗi tạo link: Dữ liệu quá lớn hoặc mã hoá lỗi.");
        }
    }

