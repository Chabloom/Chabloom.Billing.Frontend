#!/bin/bash

pushd $(dirname "$(readlink -f "$0")")/../src

sed -i "s/http:\/\/localhost:3001/$BILLING_FRONTEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/billing-api-test.chabloom.com/$BILLING_BACKEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/accounts-api-test.chabloom.com/$ACCOUNTS_BACKEND_ADDRESS/g" types/settings.ts
sed -i "s/APPINSIGHTS_INSTRUMENTATIONKEY/$APPINSIGHTS_INSTRUMENTATIONKEY/g" types/settings.ts

popd
