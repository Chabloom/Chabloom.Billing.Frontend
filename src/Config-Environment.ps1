$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Push-Location $dir
((Get-Content -Path settings/config.ts -Raw) -replace 'PUBLIC_ADDRESS',$env:PUBLIC_ADDRESS) | Set-Content -Path settings/oidc.ts
((Get-Content -Path settings/config.ts -Raw) -replace 'API_PUBLIC_ADDRESS',$env:API_PUBLIC_ADDRESS) | Set-Content -Path settings/config.ts
((Get-Content -Path settings/config.ts -Raw) -replace 'JWT_PUBLIC_ADDRESS',$env:JWT_PUBLIC_ADDRESS) | Set-Content -Path settings/config.ts
((Get-Content -Path settings/config.ts -Raw) -replace 'APPINSIGHTS_INSTRUMENTATIONKEY',$env:APPINSIGHTS_INSTRUMENTATIONKEY) | Set-Content -Path settings/config.ts
Pop-Location
