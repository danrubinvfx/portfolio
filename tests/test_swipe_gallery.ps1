# Test Shot Gallery Swipe Logic and Invariants
Write-Host "=== Testing Shot Gallery Swipe Logic & Invariants ==="

$dataJs = Get-Content 'data.js' -Raw
$scriptJs = Get-Content 'script.js' -Raw

# 1. Verify pool count in data.js
$stillCount = ([regex]::Matches($dataJs, 'id:\s*"still-')).Count
Write-Host "Total stills in data.js galleryStills: $stillCount (Target: >= 75)"
if ($stillCount -lt 75) {
    Write-Error "Fewer than 75 stills in galleryStills!"
    exit 1
}

# 2. Check that index.html contains swipe controls and viewport
$html = Get-Content 'index.html' -Raw
$hasViewport = $html -match 'id="stills-swipe-viewport"'
$hasPrevBtn = $html -match 'id="gallery-prev-btn"'
$hasNextBtn = $html -match 'id="gallery-next-btn"'
$hasCounter = $html -match 'id="gallery-counter-chip"'

Write-Host "HTML Viewport: $hasViewport"
Write-Host "HTML Prev Button: $hasPrevBtn"
Write-Host "HTML Next Button: $hasNextBtn"
Write-Host "HTML Counter Chip: $hasCounter"

if (-not ($hasViewport -and $hasPrevBtn -and $hasNextBtn -and $hasCounter)) {
    Write-Error "HTML markup missing required swipe elements!"
    exit 1
}

# 3. Check styles.css has swipe styles
$css = Get-Content 'styles.css' -Raw
$hasViewportCSS = $css -match '\.stills-swipe-viewport'
$hasSlidingCSS = $css -match '\.anim-sliding-out-left'
Write-Host "CSS Viewport Rule: $hasViewportCSS"
Write-Host "CSS Animation Rules: $hasSlidingCSS"

if (-not ($hasViewportCSS -and $hasSlidingCSS)) {
    Write-Error "CSS missing swipe styling!"
    exit 1
}

Write-Host "`nAll static checks passed!"
