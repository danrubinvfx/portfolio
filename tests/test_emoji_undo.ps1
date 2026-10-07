$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Starting local HTTP server on port 8080..."
$serverJob = Start-Job -ScriptBlock {
    param($repoPath)
    Set-Location $repoPath
    powershell -ExecutionPolicy Bypass -File .\tools\server.ps1 -Port 8080
} -ArgumentList (Get-Location).Path

Start-Sleep -Seconds 2

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

        $global:msgId = 400
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

        # Clear localStorage and run full emoji select & undo suite
        $testResult = ExecJS @'
(() => {
    localStorage.removeItem("dan_portfolio_reactions");
    const results = {};

    const heartBtn = document.querySelector("#stills-grid-container .still-grid-card button[data-reaction-type='heart']");
    const fireBtn = document.querySelector("#stills-grid-container .still-grid-card button[data-reaction-type='fire']");
    if (!heartBtn) return JSON.stringify({ error: "Heart button not found" });

    const stillId = heartBtn.getAttribute("data-reaction-still");
    results.stillId = stillId;

    // 1. Initial State
    const rxInitial = getReactionsForStill(stillId);
    results.initialHeartCount = rxInitial.heart;
    results.initialFireCount = rxInitial.fire;
    results.initialUserVoted = [...(rxInitial.userVoted || [])];
    results.initialHeartHasActiveClass = heartBtn.classList.contains("active");

    // 2. Click Heart -> Vote (+1)
    heartBtn.click();
    const rxAfterVote = getReactionsForStill(stillId);
    results.voteHeartCount = rxAfterVote.heart;
    results.voteIncrementedByOne = (rxAfterVote.heart === rxInitial.heart + 1);
    results.voteUserVotedHasHeart = rxAfterVote.userVoted.includes("heart");
    results.voteHeartHasActiveClass = heartBtn.classList.contains("active");
    results.voteHeartHasVotedClass = heartBtn.classList.contains("voted");

    // 3. Click Heart AGAIN -> Undo (-1)
    heartBtn.click();
    const rxAfterUndo = getReactionsForStill(stillId);
    results.undoHeartCount = rxAfterUndo.heart;
    results.undoDecrementedToInitial = (rxAfterUndo.heart === rxInitial.heart);
    results.undoUserVotedRemovedHeart = !rxAfterUndo.userVoted.includes("heart");
    results.undoHeartRemovedActiveClass = !heartBtn.classList.contains("active");
    results.undoHeartRemovedVotedClass = !heartBtn.classList.contains("voted");

    // 4. Click Heart 3rd Time -> Re-vote (+1)
    heartBtn.click();
    const rxAfterRevote = getReactionsForStill(stillId);
    results.revoteHeartCount = rxAfterRevote.heart;
    results.revoteSuccess = (rxAfterRevote.heart === rxInitial.heart + 1);

    // 5. Click Fire -> Vote Fire (+1)
    if (fireBtn) {
        fireBtn.click();
        const rxWithBoth = getReactionsForStill(stillId);
        results.bothVotedHeart = rxWithBoth.userVoted.includes("heart");
        results.bothVotedFire = rxWithBoth.userVoted.includes("fire");
        results.fireCount = rxWithBoth.fire;
        results.fireIncremented = (rxWithBoth.fire === rxInitial.fire + 1);

        // Undo Fire only
        fireBtn.click();
        const rxUndoFire = getReactionsForStill(stillId);
        results.undoFireRemovedFromUserVoted = !rxUndoFire.userVoted.includes("fire");
        results.heartStillVoted = rxUndoFire.userVoted.includes("heart");
        results.fireCountRestored = (rxUndoFire.fire === rxInitial.fire);
    }

    // 6. Undo Heart again -> fully clean
    heartBtn.click();
    const rxFinal = getReactionsForStill(stillId);
    results.finalUserVotedClean = (rxFinal.userVoted.length === 0);
    results.finalHeartRestored = (rxFinal.heart === rxInitial.heart);

    return JSON.stringify(results, null, 2);
})()
'@

        Write-Host "Emoji Select & Undo Test Results:"
        Write-Host $testResult

        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
    if ($serverJob) { Stop-Job $serverJob; Remove-Job $serverJob -Force }
}

Write-Host "Test finished!"
