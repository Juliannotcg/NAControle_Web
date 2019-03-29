Param(
    [parameter(Mandatory=$true)][string]$pathDockerfile,
    [parameter(Mandatory=$false)][string]$typeBuildNpm="build-prod",
    [parameter(Mandatory=$false)][string]$tag="dev"
)

# Initialization

Write-Host "Execute npm run $typeBuildNpm" -ForegroundColor Yellow

npm run $typeBuildNpm

Write-Host "Execute docker build -t grupoNaui:$tag -f $pathDockerfile . --no-cache" -ForegroundColor Yellow

docker build -t grupoNaui:$tag -f $pathDockerfile . --no-cache

Write-Host "Deploy success!!!" -ForegroundColor Yellow
