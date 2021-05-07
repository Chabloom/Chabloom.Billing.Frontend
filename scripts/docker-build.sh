timestamp=`date +%s`
docker build -t chb-prod-1.chabloom.com:32000/chabloom-billing-frontend:$timestamp -t chb-prod-1.chabloom.com:32000/chabloom-billing-frontend:latest .
docker push chb-prod-1.chabloom.com:32000/chabloom-billing-frontend:$timestamp
docker push chb-prod-1.chabloom.com:32000/chabloom-billing-frontend:latest
