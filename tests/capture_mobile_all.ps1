$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$screenshotDir = "C:\Users\danie\.gemini\antigravity\brain\94c2e31e-9787-42da-ae14-80b6232b8749"
$edge = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--window-size=390,844", "http://localhost:8080/" -PassThru
Start-Sleep -Seconds 3

try {
    $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
    $page = $tabs | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    if ($page) {
        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $cts = New-Object System.Threading.CancellationTokenSource
        $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait(3000)

        $global:msgId = 100
        function CaptureSection($sectionId, $fileName) {
            $global:msgId++
            $scroll = @{
                id = $global:msgId
                method = "Runtime.evaluate"
                params = @{ expression = "var el = document.getElementById('$sectionId'); if (el) { el.scrollIntoView({ behavior: 'instant', block: 'start' }); }" }
            } | ConvertTo-Json -Compress
            $b = [System.Text.Encoding]::UTF8.GetBytes($scroll)
            $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($b, 0, $b.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(2000)
            
            $buf = New-Object byte[] 4096
            $t = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buf, 0, $buf.Length)), $cts.Token)
            $t.Wait(2000)
            Start-Sleep -Milliseconds 800

            $global:msgId++
            $cmd = @{
                id = $global:msgId
                method = "Page.captureScreenshot"
                params = @{ format = "png" }
            } | ConvertTo-Json -Compress
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
            $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($bytes, 0, $bytes.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(3000)

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
                Write-Host "Saved $fileName"
            }
        }

        CaptureSection "supervisory-reels" "mobile_view_supervisory.png"
        CaptureSection "featured-stills-carousel" "mobile_view_carousel.png"
        CaptureSection "experience" "mobile_view_experience.png"
        CaptureSection "projects" "mobile_view_projects.png"

        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
}
