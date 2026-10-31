





$local = Join-Path $PSScriptRoot 'config.local.ps1'
if (Test-Path $local) { . $local }
if (-not $env:KAGGLE_CONFIG_DIR) {
    $env:KAGGLE_CONFIG_DIR = Join-Path $HOME '.kaggle'
}

$script:NammaRoot   = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$script:NammaUser   = "shashankdev09"
$script:CodeDataset = "$script:NammaUser/namma-code"
$script:VideoDataset = "$script:NammaUser/metro-walk-video-v1"
