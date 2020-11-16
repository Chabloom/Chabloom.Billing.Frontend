$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Push-Location $dir/../src/
((Get-Content -Path types/settings.ts -Raw) -replace 'http://localhost:3001',$env:PUBLIC_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'https://payments-api-test.chabloom.com',$env:API_PUBLIC_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'https://accounts-api-test.chabloom.com',$env:JWT_PUBLIC_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'http://localhost:3002',$env:PROCESSING_PUBLIC_ADDRESS) | Set-Content -Path types/settings.ts
((Get-Content -Path types/settings.ts -Raw) -replace 'APPINSIGHTS_INSTRUMENTATIONKEY',$env:APPINSIGHTS_INSTRUMENTATIONKEY) | Set-Content -Path types/settings.ts
Pop-Location
