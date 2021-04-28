#!/bin/bash

pushd $(dirname "$(readlink -f "$0")")/../src

sed -i "s/https:\/\/accounts-dev-1.chabloom.com/$ACCOUNTS_FRONTEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/accounts-api-dev-1.chabloom.com/$ACCOUNTS_BACKEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/billing-dev-1.chabloom.com/$BILLING_FRONTEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/billing-api-dev-1.chabloom.com/$BILLING_BACKEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/ecommerce-dev-1.chabloom.com/$ECOMMERCE_FRONTEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/ecommerce-api-dev-1.chabloom.com/$ECOMMERCE_BACKEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/transactions-dev-1.chabloom.com/$TRANSACTIONS_FRONTEND_ADDRESS/g" types/settings.ts
sed -i "s/https:\/\/transactions-api-dev-1.chabloom.com/$TRANSACTIONS_BACKEND_ADDRESS/g" types/settings.ts

popd
