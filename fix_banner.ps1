# Fix banner breakdown badges
$file = "d:\HỌC TỪ VỰNG\index.html"
$bytes = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Old lines 9007-9010 (0-indexed: 9006-9009)
$oldSnippet = "                            + '  <div style=""font-size:11px;color:#fdba74;margin-top:3px;font-weight:700;"">' + urgencyText + '</div>'`r`n                            + '</div>'`r`n                            + '</div>';"

$newSnippet = "                            + '<div style=""display:flex;gap:6px;flex-wrap:wrap;margin-top:5px;"">'`r`n                            + (stats.due > 0 ? '<span style=""background:rgba(239,68,68,0.25);border:1px solid rgba(239,68,68,0.5);border-radius:8px;padding:2px 8px;font-size:11px;color:#fca5a5;font-weight:800;"">&#128308; ' + stats.due + ' s&#7855;p qu&#234;n</span>' : '')`r`n                            + (stats.wrong > 0 ? '<span style=""background:rgba(249,115,22,0.25);border:1px solid rgba(249,115,22,0.5);border-radius:8px;padding:2px 8px;font-size:11px;color:#fdba74;font-weight:800;"">&#127968; ' + stats.wrong + ' hay sai</span>' : '')`r`n                            + (stats['new'] > 0 ? '<span style=""background:rgba(99,102,241,0.2);border:1px solid rgba(165,180,252,0.4);border-radius:8px;padding:2px 8px;font-size:11px;color:#a5b4fc;font-weight:800;"">&#127971; ' + stats['new'] + ' t&#7915; m&#7899;i</span>' : '')`r`n                            + '</div>'`r`n                            + '</div>'`r`n                            + '</div>';"

if ($content.Contains($oldSnippet)) {
    Write-Host "Found target - replacing..."
    $newContent = $content.Replace($oldSnippet, $newSnippet)
    $newBytes = [System.Text.Encoding]::UTF8.GetBytes($newContent)
    [System.IO.File]::WriteAllBytes($file, $newBytes)
    Write-Host "Done!"
} else {
    Write-Host "Target NOT found - checking nearby lines..."
    # Print lines 9005-9012
    $lines = $content -split "`n"
    for ($i = 9004; $i -le 9012; $i++) {
        Write-Host ($i+1).ToString() + ": " + $lines[$i].Substring(0, [Math]::Min($lines[$i].Length, 150))
    }
}
