$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$edge = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "http://localhost:8080/" -PassThru
Start-Sleep -Seconds 3

try {
    $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
    $page = $tabs | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    if ($page) {
        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $cts = New-Object System.Threading.CancellationTokenSource
        $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait(3000)

        $evalExpr = @'
(() => {
    const results = {};

    // 1. Check for any download links
    const downloadLinks = Array.from(document.querySelectorAll('a[download]')).map(a => a.href);
    results.downloadLinksCount = downloadLinks.length;
    results.downloadLinks = downloadLinks;

    // 2. Check Artist Reel text for supervisor mentions
    const artistDesc = document.getElementById('artist-reel-desc')?.textContent || '';
    const artistRole = document.querySelector('#artist-reel .video-meta-role')?.textContent || '';
    const artistNote = document.querySelector('#artist-reel .video-meta-note')?.textContent || '';
    
    results.artistDesc = artistDesc.trim();
    results.artistRole = artistRole.trim();
    results.artistNote = artistNote.trim();
    results.hasSupervisorMention = /supervisor|supervisory|leadership|bidding|mentoring/i.test(artistDesc + ' ' + artistRole + ' ' + artistNote);

    // 3. Test Emoji Reaction Single-Vote Rule
    localStorage.removeItem("dan_portfolio_reactions");
    const btnHeart = document.querySelector('[data-reaction-type="heart"]');
    const testStillId = btnHeart ? btnHeart.getAttribute('data-reaction-still') : 'still-contra-hero';
    results.testStillId = testStillId;
    const rxBefore = getReactionsForStill(testStillId);
    const initialHeartCount = rxBefore.heart;
    results.initialHeartCount = initialHeartCount;

    // Click heart once
    if (btnHeart) {
        btnHeart.click();
    }
    const rxAfterFirstClick = getReactionsForStill(testStillId);
    results.heartAfterFirstClick = rxAfterFirstClick.heart;
    results.firstClickIncremented = (rxAfterFirstClick.heart === initialHeartCount + 1);

    // Click heart again 4 times to try to spam/inflate
    if (btnHeart) {
        btnHeart.click();
        btnHeart.click();
        btnHeart.click();
        btnHeart.click();
    }
    const rxAfterSpamClicks = getReactionsForStill(testStillId);
    results.heartAfterSpamClicks = rxAfterSpamClicks.heart;
    results.spamClicksPrevented = (rxAfterSpamClicks.heart === initialHeartCount + 1);

    // Test clicking a different emoji type (fire) on the same still
    const initialFireCount = rxBefore.fire;
    results.initialFireCount = initialFireCount;
    const btnFire = document.querySelector('[data-reaction-still="' + testStillId + '"][data-reaction-type="fire"]');
    if (btnFire) {
        btnFire.click();
    }
    const rxAfterFireFirstClick = getReactionsForStill(testStillId);
    results.fireAfterFirstClick = rxAfterFireFirstClick.fire;
    results.fireFirstClickIncremented = (rxAfterFireFirstClick.fire === initialFireCount + 1);

    // Click fire again 3 times
    if (btnFire) {
        btnFire.click();
        btnFire.click();
        btnFire.click();
    }
    const rxAfterFireSecondClick = getReactionsForStill(testStillId);
    results.fireSecondClickPrevented = (rxAfterFireSecondClick.fire === initialFireCount + 1);

    // 4. Verify section order
    results.sections = Array.from(document.querySelectorAll('main > section')).map(s => s.id);

    return JSON.stringify(results, null, 2);
})()
'@
        $cmd = @{
            id = 1
            method = "Runtime.evaluate"
            params = @{
                expression = $evalExpr
            }
        } | ConvertTo-Json -Compress

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
        $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($bytes, 0, $bytes.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(3000)

        $buffer = New-Object byte[] 65536
        $recvTask = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buffer, 0, $buffer.Length)), $cts.Token)
        $recvTask.Wait(4000)
        $respStr = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $recvTask.Result.Count)
        Write-Host "RAW RESULT:"
        Write-Host $respStr

        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
}
