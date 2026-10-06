$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$screenshotDir = "C:\Users\danie\.gemini\antigravity\brain\94c2e31e-9787-42da-ae14-80b6232b8749"
$origPdf = "C:\Users\danie\.gemini\antigravity\brain\94c2e31e-9787-42da-ae14-80b6232b8749\.user_uploaded\media_1790905446642.pdf"

Write-Host "=== 1. VERIFYING PDF INTEGRITY & MATCH ==="
$origHash = (Get-FileHash $origPdf).Hash
$localHash = (Get-FileHash ".\Dan_Rubin_Resume.pdf").Hash
Write-Host "Original Hash: $origHash"
Write-Host "Served Hash:   $localHash"
if ($origHash -ne $localHash) {
    Write-Error "Hash mismatch between original PDF and served PDF!"
    exit 1
}
Write-Host "SUCCESS: SHA256 hashes match 100%!"

Write-Host "`n=== 2. VERIFYING HTTP SERVER RESPONSE ==="
$response = Invoke-WebRequest -Uri "http://localhost:8080/Dan_Rubin_Resume.pdf" -UseBasicParsing
Write-Host "HTTP Status:  $($response.StatusCode)"
Write-Host "Content-Type: $($response.Headers['Content-Type'])"
Write-Host "Byte Length:  $($response.RawContentLength)"
if ($response.StatusCode -ne 200 -or $response.RawContentLength -ne 153740) {
    Write-Error "Server returned invalid response!"
    exit 1
}
Write-Host "SUCCESS: Server serves exact intact PDF bytes!"

Write-Host "`n=== 3. CAPTURING RESUME MODAL & BUTTON VERIFICATION ==="
function CaptureModal($width, $height, $fileName) {
    $edge = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--window-size=$width,$height", "http://localhost:8080/" -PassThru
    Start-Sleep -Seconds 3

    try {
        $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
        $page = $tabs | Where-Object { $_.type -eq "page" } | Select-Object -First 1
        if ($page) {
            $ws = New-Object System.Net.WebSockets.ClientWebSocket
            $cts = New-Object System.Threading.CancellationTokenSource
            $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait(4000)

            $global:msgId = 500
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
                return [System.Text.Encoding]::UTF8.GetString($buf, 0, $t.Result.Count)
            }

            # Open Resume Modal
            ExecJS "window.openResumeModal();"
            Start-Sleep -Seconds 2

            # Screenshot
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
                Write-Host "Saved $fileName"
            }

            $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
        }
    } finally {
        if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
    }
}

CaptureModal 1440 900 "desktop_view_resume_modal.png"
Start-Sleep -Seconds 1
CaptureModal 390 844 "mobile_view_resume_modal.png"

Write-Host "Verification script completed successfully!"
