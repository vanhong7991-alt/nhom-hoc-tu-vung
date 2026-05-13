import re

path = r'd:\HỌC TỪ VỰNG\index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Old: selectDay(curLevel, curType, curDay); inside Làm lại từ đầu button
old = 'document.getElementById(\'completion-overlay\').remove(); selectDay(curLevel, curType, curDay);"'
new = 'document.getElementById(\'completion-overlay\').remove(); renderQuiz(); if(typeof resetTimer===\'function\') resetTimer(); window.scrollTo({top:0,behavior:\'smooth\'});"'

if old in content:
    content = content.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Done! Replaced successfully.')
else:
    # Try to find what's there
    idx = content.find('selectDay(curLevel, curType, curDay)')
    if idx >= 0:
        print('Found at char:', idx)
        print('Context:', repr(content[idx-50:idx+100]))
    else:
        print('selectDay(curLevel, curType, curDay) not found')
        idx2 = content.find('completion-overlay')
        print('completion-overlay at:', idx2)
