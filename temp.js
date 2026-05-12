
                (function(){
                    const params = new URLSearchParams(window.location.search);
                    const lang = params.get('lang') || 'jp';
                    const activeBtn = document.getElementById('lang-btn-' + lang);
                    if(activeBtn) {
                        activeBtn.classList.add('active-' + lang);
                    }
                })();
            
