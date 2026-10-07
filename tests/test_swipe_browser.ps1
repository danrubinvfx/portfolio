$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

# 1. Start server in background job
Write-Host "Starting local HTTP server on port 8080..."
$serverJob = Start-Job -ScriptBlock {
    param($repoPath)
    Set-Location $repoPath
    powershell -ExecutionPolicy Bypass -File .\tools\server.ps1 -Port 8080
} -ArgumentList (Get-Location).Path

Start-Sleep -Seconds 2

# 2. Start Headless Edge
Write-Host "Launching Headless Edge..."
$edge = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--window-size=1440,900", "http://localhost:8080/" -PassThru
Start-Sleep -Seconds 3

try {
    $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
    $page = $tabs | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    if ($page) {
        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $cts = New-Object System.Threading.CancellationTokenSource
        $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait(4000)

        $global:msgId = 100
        function ExecJS($expr) {
            $global:msgId++
            $eval = @{
                id = $global:msgId
                method = "Runtime.evaluate"
                params = @{ expression = $expr; returnByValue = $true }
            } | ConvertTo-Json -Compress
            $b = [System.Text.Encoding]::UTF8.GetBytes($eval)
            $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($b, 0, $b.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(2000)
            
            $buf = New-Object byte[] 65536
            $t = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buf, 0, $buf.Length)), $cts.Token)
            $t.Wait(3000)
            $resp = [System.Text.Encoding]::UTF8.GetString($buf, 0, $t.Result.Count) | ConvertFrom-Json
            return $resp.result.result.value
        }

        # Test initial batch
        $testResult = ExecJS @'
(() => {
    const results = {};
    const cards = Array.from(document.querySelectorAll("#stills-grid-container .still-grid-card"));
    results.initialCardCount = cards.length;
    
    // Check for duplicates in initial set
    const initialImgs = cards.map(c => c.querySelector("img").src);
    results.uniqueInitialCount = (new Set(initialImgs)).size;
    results.initialHasZeroDuplicates = (results.initialCardCount === results.uniqueInitialCount);
    
    // Check initial counter label
    results.initialCounter = document.getElementById("gallery-counter-label")?.textContent;

    // Trigger swipe left (advance to Set 2)
    window.swipeGallery('left');
    return JSON.stringify(results);
})()
'@
        Write-Host "Initial Batch Results: $testResult"

        Start-Sleep -Milliseconds 600

        # Test Set 2 after swipe left
        $testResult2 = ExecJS @'
(() => {
    const results = {};
    const cards = Array.from(document.querySelectorAll("#stills-grid-container .still-grid-card"));
    results.set2CardCount = cards.length;
    const set2Imgs = cards.map(c => c.querySelector("img").src);
    results.uniqueSet2Count = (new Set(set2Imgs)).size;
    results.set2HasZeroDuplicates = (results.set2CardCount === results.uniqueSet2Count);
    results.set2Counter = document.getElementById("gallery-counter-label")?.textContent;

    // Trigger swipe left again (advance to Set 3)
    window.swipeGallery('left');
    return JSON.stringify(results);
})()
'@
        Write-Host "Set 2 Results: $testResult2"

        Start-Sleep -Milliseconds 600

        # Test Set 3 after second swipe left
        $testResult3 = ExecJS @'
(() => {
    const results = {};
    const cards = Array.from(document.querySelectorAll("#stills-grid-container .still-grid-card"));
    results.set3CardCount = cards.length;
    const set3Imgs = cards.map(c => c.querySelector("img").src);
    results.uniqueSet3Count = (new Set(set3Imgs)).size;
    results.set3HasZeroDuplicates = (results.set3CardCount === results.uniqueSet3Count);
    results.set3Counter = document.getElementById("gallery-counter-label")?.textContent;

    // Trigger swipe right (back to Set 2)
    window.swipeGallery('right');
    return JSON.stringify(results);
})()
'@
        Write-Host "Set 3 Results: $testResult3"

        Start-Sleep -Milliseconds 600

        # Test Back to Set 2 after swipe right
        $testResult4 = ExecJS @'
(() => {
    const results = {};
    results.backToSet2Counter = document.getElementById("gallery-counter-label")?.textContent;

    // Test opening Lightbox by clicking the first card
    const firstCard = document.querySelector("#stills-grid-container .still-grid-card");
    if (firstCard) firstCard.click();

    const lightbox = document.getElementById("lightbox-modal");
    results.lightboxOpened = (lightbox && !lightbox.classList.contains("hidden"));
    results.lightboxTitle = document.getElementById("lightbox-title")?.textContent;
    results.lightboxCounter = document.getElementById("lightbox-counter")?.textContent;

    return JSON.stringify(results);
})()
'@
        Write-Host "Lightbox and Back Navigation Results: $testResult4"

        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
    if ($serverJob) { Stop-Job $serverJob; Remove-Job $serverJob -Force }
}

Write-Host "`nBrowser test complete!"
