$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Push-Location $dir
((Get-Content -Path settings/oidc.ts -Raw) -replace 'http://localhost:3001',$env:PUBLIC_ADDRESS) | Set-Content -Path settings/oidc.ts
((Get-Content -Path settings/config.ts -Raw) -replace 'https://payments-api-test.chabloom.com',$env:API_PUBLIC_ADDRESS) | Set-Content -Path settings/config.ts
((Get-Content -Path settings/config.ts -Raw) -replace 'https://accounts-api-test.chabloom.com',$env:JWT_PUBLIC_ADDRESS) | Set-Content -Path settings/config.ts
((Get-Content -Path settings/config.ts -Raw) -replace 'APPINSIGHTS_INSTRUMENTATIONKEY',$env:APPINSIGHTS_INSTRUMENTATIONKEY) | Set-Content -Path settings/config.ts
Pop-Location
