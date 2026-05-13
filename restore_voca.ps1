# Đọc file gốc backup trước
$orig = Get-Content 'vanData.js' -Raw -Encoding UTF8

# Tìm vị trí pattern sai và xóa phần n2voca bị lỗi, phục hồi về trạng thái cũ
# Pattern: từ "], n2voca:" đến ", n2gram:" (phần bị hỏng)
$fixed = $orig -replace ',\s*n2voca:\s*\{[\s\S]*?\}\s*,\s*n2gram:', ', n2gram:'

Set-Content 'vanData.js' $fixed -Encoding UTF8 -NoNewline
Write-Host "Restored. Lines: $($fixed.Split("`n").Length)"
