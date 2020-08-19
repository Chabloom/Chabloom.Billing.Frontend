$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Push-Location $dir
((Get-Content -Path config.json -Raw) -replace 'API_PUBLIC_ADDRESS',$env:API_PUBLIC_ADDRESS) | Set-Content -Path config.json
((Get-Content -Path config.json -Raw) -replace 'JWT_PUBLIC_ADDRESS',$env:JWT_PUBLIC_ADDRESS) | Set-Content -Path config.json
Pop-Location
