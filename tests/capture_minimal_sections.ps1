$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$screenshotDir = "C:\Users\danie\.gemini\antigravity\brain\94c2e31e-9787-42da-ae14-80b6232b8749"
$edge = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--window-size=1440,900", "http://localhost:8080/" -PassThru
Start-Sleep -Seconds 3

try {
    $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
    $page = $tabs | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    if ($page) {
        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $cts = New-Object System.Threading.CancellationTokenSource
        $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait(4000)

        $global:msgId = 1000

        function ExecJS($expr) {
            $global:msgId++
            $eval = @{
                id = $global:msgId
                method = "Runtime.evaluate"
                params = @{ expression = $expr; returnByValue = $true }
            } | ConvertTo-Json -Compress
            $b = [System.Text.Encoding]::UTF8.GetBytes($eval)
            $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($b, 0, $b.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(2000)
            
            $buf = New-Object byte[] 4096
            $t = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buf, 0, $buf.Length)), $cts.Token)
            $t.Wait(2000)
        }

        function TakeScreenshot($fileName) {
            $global:msgId++
            $cmd = @{
                id = $global:msgId
                method = "Page.captureScreenshot"
                params = @{ format = "png" }
            } | ConvertTo-Json -Compress
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
            $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($bytes, 0, $bytes.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(4000)

            $ms = New-Object System.IO.MemoryStream
            $bufLarge = New-Object byte[] 65536
            do {
                $recvTask = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($bufLarge, 0, $bufLarge.Length)), $cts.Token)
                $recvTask.Wait(4000)
                $ms.Write($bufLarge, 0, $recvTask.Result.Count)
            } while (-not $recvTask.Result.EndOfMessage)

            $json = [System.Text.Encoding]::UTF8.GetString($ms.ToArray()) | ConvertFrom-Json
            if ($json.result.data) {
                $imageBytes = [System.Convert]::FromBase64String($json.result.data)
                $outPath = Join-Path $screenshotDir $fileName
                [System.IO.File]::WriteAllBytes($outPath, $imageBytes)
                Write-Host "Captured $fileName"
            }
        }

        # 1. Section 1: Header & Artist Compositing Reel (no 'Featured Artist Reel' eyebrow)
        ExecJS "window.scrollTo(0, 0);"
        Start-Sleep -Seconds 1
        TakeScreenshot "section_01_artist_reel.png"

        # 2. Section 2: Executive Overview & Hero (no buttons under bio)
        ExecJS "var el = document.getElementById('hero'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });"
        Start-Sleep -Seconds 1
        TakeScreenshot "section_02_dan_rubin_hero.png"

        # 3. Section 3: Supervisory Video Showcase (2x2 Grid Pattern)
        ExecJS "var el = document.getElementById('supervisory-reels'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });"
        Start-Sleep -Seconds 2
        TakeScreenshot "section_03_supervisory_2x2_grid.png"

        # 4. Section 4: Shot Gallery (no redundant titles or eyebrows)
        ExecJS "var el = document.getElementById('featured-stills-carousel'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });"
        Start-Sleep -Seconds 2
        TakeScreenshot "section_04_shot_gallery.png"

        # 5. Section 5: Professional Experience Timeline
        ExecJS "var el = document.getElementById('experience'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });"
        Start-Sleep -Seconds 1
        TakeScreenshot "section_05_experience_timeline.png"

        # 6. Section 6: Direct Contact & Footer (streamlined, inquiry form removed)
        ExecJS "var el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });"
        Start-Sleep -Seconds 1
        TakeScreenshot "section_06_contact_and_footer.png"

        # 7. Modal: Original Unaugmented 3-Page Résumé PDF (tabs removed)
        ExecJS "if (typeof openResumeModal === 'function') openResumeModal();"
        Start-Sleep -Seconds 2
        TakeScreenshot "modal_01_original_resume_pdf.png"

        Write-Host "All minimal section captures completed successfully!"
        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $cts.Token).Wait(2000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) {
        Stop-Process -Id $edge.Id -Force
    }
}
