

param(
    [Parameter(Mandatory = $true)][string]$Name,
    [switch]$Watch,
    [int]$TimeoutMinutes = 60
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '..\config.ps1')




$env:PYTHONIOENCODING = 'utf-8'
$env:PYTHONUTF8 = '1'

$ref = "$NammaUser/" + ($Name -replace '_', '-')

if ($Watch) {
    $deadline = (Get-Date).AddMinutes($TimeoutMinutes)
    while ((Get-Date) -lt $deadline) {



        $ErrorActionPreference = 'Continue'
        try {
            $status = (kaggle kernels status $ref 2>&1 | Out-String)
        } catch {
            $status = "watch: status check threw: $($_.Exception.Message)"
        }
        $ErrorActionPreference = 'Stop'

        if ($status -match 'COMPLETE') { Write-Host 'kernel complete'; break }
        if ($status -match 'ERROR|CANCELLED') {

            Write-Host "kernel ended with: $($status.Trim())"
            break
        }
        Start-Sleep -Seconds 30
    }
}

$outDir = Join-Path $NammaRoot "kaggle\out\$Name"
Remove-Item -Recurse -Force $outDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $outDir | Out-Null



$ok = $false
for ($i = 1; $i -le 3; $i++) {
    $ErrorActionPreference = 'Continue'   
    kaggle kernels output $ref -p $outDir
    $rc = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    if ($rc -eq 0) { $ok = $true; break }
    Write-Host "fetch attempt $i failed (rc=$rc); retrying in 20 s"
    Start-Sleep -Seconds 20
}
if (-not $ok) { throw "output fetch failed after 3 attempts" }

$summary = Join-Path $outDir 'out\summary.txt'
if (Test-Path $summary) {
    Write-Host "---- summary.txt ----"
    Get-Content $summary
}
Get-ChildItem -Recurse $outDir | Select-Object FullName, Length
