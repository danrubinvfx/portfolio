$content = Get-Content -Path .\index.html -Raw
$pattern = '<section\s+id="([^"]+)"'
$matches = [regex]::Matches($content, $pattern)
$found = @()
foreach ($m in $matches) {
    $found += $m.Groups[1].Value
}

Write-Host "Found sections in index.html:"
for ($i = 0; $i -lt $found.Count; $i++) {
    Write-Host "  $($i + 1). #$($found[$i])"
}

$expected = @(
    "artist-reel",
    "hero",
    "supervisory-reels",
    "featured-stills-carousel",
    "experience",
    "projects",
    "teaching",
    "supervision",
    "ai-notes",
    "contact"
)

$allMatch = $true
for ($i = 0; $i -lt $expected.Count; $i++) {
    if ($found[$i] -ne $expected[$i]) {
        Write-Error "Mismatch at position $($i + 1): expected #$($expected[$i]), got #$($found[$i])"
        $allMatch = $false
    }
}

if ($allMatch) {
    Write-Host "`nSUCCESS: All sections are in the exact requested order!" -ForegroundColor Green
} else {
    exit 1
}
