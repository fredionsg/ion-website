param(
  [int]$Port = 5500
)

$ErrorActionPreference = "Stop"

$listeners = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue
if (-not $listeners) {
  Write-Host "No listener found on port $Port."
  exit 0
}

$stopped = @{}
foreach ($listener in $listeners) {
  $pid = $listener.OwningProcess
  if (-not $stopped.ContainsKey($pid)) {
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    $stopped[$pid] = $true
  }
}

Write-Host "Stopped listener(s) on port $Port."
