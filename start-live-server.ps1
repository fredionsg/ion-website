param(
  [int]$Port = 5500,
  [string]$BindHost = "127.0.0.1",
  [switch]$OpenBrowser
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
$pyCmd = Get-Command py -ErrorAction SilentlyContinue

if (-not $pythonCmd -and -not $pyCmd) {
  Write-Error "Python is not installed or not in PATH. Install Python 3 first."
  exit 1
}

$url = "http://$BindHost`:$Port/preview.html"
Write-Host "Serving files from: $root"
Write-Host "Live URL: $url"
Write-Host "Press Ctrl+C to stop."

if ($OpenBrowser) {
  Start-Process $url | Out-Null
}

if ($pythonCmd) {
  & python -m http.server $Port --bind $BindHost
} else {
  & py -m http.server $Port --bind $BindHost
}
