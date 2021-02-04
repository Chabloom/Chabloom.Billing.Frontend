$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Push-Location $dir/../src/
((Get-Content -Path types/settings.ts -Raw) -replace 'http://localhost:3001',$env:BILLING_FRONTEND_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'https://billing-api-test.chabloom.com',$env:BILLING_BACKEND_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'https://accounts-api-test.chabloom.com',$env:ACCOUNTS_BACKEND_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'APPINSIGHTS_INSTRUMENTATIONKEY',$env:APPINSIGHTS_INSTRUMENTATIONKEY) | Set-Content -Path types/settings.ts
Pop-Location
