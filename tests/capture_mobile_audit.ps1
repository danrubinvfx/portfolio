$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$screenshotDir = "C:\Users\danie\.gemini\antigravity\brain\94c2e31e-9787-42da-ae14-80b6232b8749"
# Mobile device emulation: 390 x 844 (iPhone 12/13/14)
$edge = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--window-size=390,844", "http://localhost:8080/" -PassThru
Start-Sleep -Seconds 3

try {
    $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
    $page = $tabs | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    if ($page) {
        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $cts = New-Object System.Threading.CancellationTokenSource
        $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait(3000)

        # 1. Capture mobile top view (Header + Artist Reel)
        $cmd = @{
            id = 1
            method = "Page.captureScreenshot"
            params = @{ format = "png" }
        } | ConvertTo-Json -Compress

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
        $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($bytes, 0, $bytes.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(3000)

        $ms = New-Object System.IO.MemoryStream
        $buffer = New-Object byte[] 65536
        do {
            $recvTask = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buffer, 0, $buffer.Length)), $cts.Token)
            $recvTask.Wait(4000)
            $ms.Write($buffer, 0, $recvTask.Result.Count)
        } while (-not $recvTask.Result.EndOfMessage)

        $respStr = [System.Text.Encoding]::UTF8.GetString($ms.ToArray())
        $json = $respStr | ConvertFrom-Json
        $base64Data = $json.result.data
        if ($base64Data) {
            $imageBytes = [System.Convert]::FromBase64String($base64Data)
            $outPath = Join-Path $screenshotDir "mobile_view_top.png"
            [System.IO.File]::WriteAllBytes($outPath, $imageBytes)
            Write-Host "Saved mobile top screenshot: $outPath"
        }

        # 2. Scroll to hero and capture
        $scrollHero = @{
            id = 2
            method = "Runtime.evaluate"
            params = @{ expression = "document.getElementById('hero').scrollIntoView();" }
        } | ConvertTo-Json -Compress
        $b2 = [System.Text.Encoding]::UTF8.GetBytes($scrollHero)
        $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($b2, 0, $b2.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(2000)
        
        $buf1 = New-Object byte[] 4096
        $t1 = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buf1, 0, $buf1.Length)), $cts.Token)
        $t1.Wait(2000)
        Start-Sleep -Milliseconds 600

        $cmd2 = @{
            id = 3
            method = "Page.captureScreenshot"
            params = @{ format = "png" }
        } | ConvertTo-Json -Compress
        $bytes2 = [System.Text.Encoding]::UTF8.GetBytes($cmd2)
        $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @($bytes2, 0, $bytes2.Length)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait(3000)

        $ms2 = New-Object System.IO.MemoryStream
        do {
            $recvTask2 = $ws.ReceiveAsync((New-Object System.ArraySegment[byte] -ArgumentList @($buffer, 0, $buffer.Length)), $cts.Token)
            $recvTask2.Wait(4000)
            $ms2.Write($buffer, 0, $recvTask2.Result.Count)
        } while (-not $recvTask2.Result.EndOfMessage)

        $json2 = [System.Text.Encoding]::UTF8.GetString($ms2.ToArray()) | ConvertFrom-Json
        if ($json2.result.data) {
            $imageBytes2 = [System.Convert]::FromBase64String($json2.result.data)
            $outPath2 = Join-Path $screenshotDir "mobile_view_hero.png"
            [System.IO.File]::WriteAllBytes($outPath2, $imageBytes2)
            Write-Host "Saved mobile hero screenshot: $outPath2"
        }

        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait(1000)
    }
} finally {
    if ($edge -and -not $edge.HasExited) { Stop-Process -Id $edge.Id -Force }
}
