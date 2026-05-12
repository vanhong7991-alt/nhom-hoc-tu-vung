const fs = require('fs');

let html = fs.readFileSync('d:\\HỌC TỪ VỰNG\\Kiemtratuvung_Fixed_FIXED_v2.html', 'utf8');

// 1. Inject smartTracker.start() into renderQuiz
html = html.replace(/document\.getElementById\('quiz-container'\)\.innerHTML = currentList\.map\(\(item, i\) => \{/g, `document.getElementById('quiz-container').innerHTML = currentList.map((item, i) => {\n                        if(window.smartTracker) window.smartTracker.start(item);`);

// 2. Inject smartTracker.record() into checkQuiz
// Find "trackCorrect(currentList[i]);" inside checkQuiz
html = html.replace(/trackCorrect\(currentList\[i\]\);/g, `if(window.smartTracker) window.smartTracker.record(currentList[i], TEST_TYPES.MULTIPLE_CHOICE, 'correct');\n                              trackCorrect(currentList[i]);`);

// Find the else block for checkQuiz: "} else {" followed by "card.setAttribute('data-res', 'ng');"
html = html.replace(/\} else \{\s*card\.setAttribute\('data-res', 'ng'\);/g, `} else {\n                              if(window.smartTracker) window.smartTracker.record(currentList[i], TEST_TYPES.MULTIPLE_CHOICE, 'wrong');\n                              card.setAttribute('data-res', 'ng');`);

// 3. Inject smartTracker.record() into check() (Fill Meaning)
html = html.replace(/input\.classList\.add\('correct'\);\s*card\.setAttribute\('data-res', 'ok'\);/g, `input.classList.add('correct');\n                          if(window.smartTracker && prevRes !== 'ok') window.smartTracker.record(currentList[idx], TEST_TYPES.FILL_MEANING, 'correct');\n                          card.setAttribute('data-res', 'ok');`);

html = html.replace(/if \(currentList\[idx\]\) trackWrong\(currentList\[idx\]\);/g, `if (currentList[idx]) trackWrong(currentList[idx]);\n                              if(window.smartTracker) window.smartTracker.record(currentList[idx], TEST_TYPES.FILL_MEANING, 'wrong');`);

// 4. Inject smartTracker.start() into openMatchGame or loadMgChunk
// Let's inject into loadMgChunk
html = html.replace(/function loadMgChunk\(\) \{/g, `function loadMgChunk() {\n                if(window.smartTracker) { mgChunk.forEach(v => window.smartTracker.start(v)); }`);

// 5. Inject smartTracker.record() into checkMgMatch
// Inside checkMgMatch, when correct: mgSelectedLeft === mgSelectedRight
// We need the vocab object. In match game, mgSelectedLeft is usually the index or ID.
// Wait, we need to know the structure of MatchGame. Let's not inject it perfectly yet if we don't know the exact var, but let's try.
html = html.replace(/leftEl\.classList\.add\('matched'\);\s*rightEl\.classList\.add\('matched'\);/g, `leftEl.classList.add('matched');\n                              rightEl.classList.add('matched');\n                              if(window.smartTracker) {\n                                  let vocab = currentList.find(v => v.c1 === mgSelectedLeft || v.c2 === mgSelectedLeft || v.c3 === mgSelectedLeft);\n                                  if(vocab) window.smartTracker.record(vocab, TEST_TYPES.MATCHING, 'correct');\n                              }`);

// Flashcard buttons UI modifications:
// Find `<button class="btn btn-blue" onclick="flipFlashcard()">Lật mặt</button>`
// Replace the next/prev buttons with 3 SRS buttons if we are in flashcard mode, or just add them below.
// Let's just add the Smart Review UI.

fs.writeFileSync('d:\\HỌC TỪ VỰNG\\Kiemtratuvung_Fixed_FIXED_v2_patched.html', html, 'utf8');
console.log('Patched checkQuiz, check, loadMgChunk, and checkMgMatch.');
