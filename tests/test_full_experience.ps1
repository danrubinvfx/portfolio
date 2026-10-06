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

        $evalExpr = @"
(() => {
    const results = {};

    // 1. Check section sequence
    const sections = Array.from(document.querySelectorAll('main > section')).map(s => s.id);
    results.sections = sections;

    // 2. Banner check
    const bannerItems = document.querySelectorAll('.banner-item');
    results.bannerCount = bannerItems.length;

    // 3. Artist Reel Check
    const artistVid = document.getElementById('artist-showreel-video');
    results.artistVidExists = !!artistVid;
    results.artistVidSrc = artistVid ? (artistVid.currentSrc || artistVid.querySelector('source')?.src) : null;

    // 4. Supervisory Reels & Tabs
    const supTabs = Array.from(document.querySelectorAll('.video-tab-btn')).map(b => b.id);
    results.supervisoryTabs = supTabs;
    const supVid = document.getElementById('main-showreel-video');
    results.supVidExists = !!supVid;

    // 5. Test switching supervisory tab to Lift
    switchToTab('breakdown-lift');
    const activeTab = document.querySelector('.video-tab-btn.active')?.id;
    results.activeTabAfterSwitch = activeTab;
    results.supVidSrcAfterSwitch = supVid ? supVid.src : null;

    // 6. Featured Stills Carousel
    const kineticSlides = document.querySelectorAll('.kinetic-slide');
    results.kineticSlidesCount = kineticSlides.length;
    const counterBefore = document.getElementById('kinetic-slide-counter')?.textContent;
    kineticCarouselNext();
    const counterAfter = document.getElementById('kinetic-slide-counter')?.textContent;
    results.counterBefore = counterBefore;
    results.counterAfter = counterAfter;

    // 7. Lightbox Test
    openKineticStill(0);
    const lightboxModal = document.getElementById('lightbox-modal');
    results.lightboxVisible = lightboxModal && !lightboxModal.classList.contains('hidden');
    closeLightbox();
    results.lightboxHiddenAfterClose = lightboxModal && lightboxModal.classList.contains('hidden');

    // 8. Resume Modal Test
    openResumeModal();
    const resumeModal = document.getElementById('resume-modal');
    results.resumeVisible = resumeModal && !resumeModal.classList.contains('hidden');
    closeResumeModal();
    results.resumeHiddenAfterClose = resumeModal && resumeModal.classList.contains('hidden');

    // 9. Dual Title Check
    const heroTitle = document.getElementById('hero-title')?.textContent;
    results.heroTitle = heroTitle;

    return JSON.stringify(results, null, 2);
})()
"@
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
        Write-Host "RAW CDP RESPONSE:"
        Write-Host $respStr

        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
}
