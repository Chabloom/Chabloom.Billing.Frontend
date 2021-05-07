timestamp=`date +%s`
docker build -t chb-uat-1.chabloom.com:32000/chabloom-billing-frontend:$timestamp -t chb-uat-1.chabloom.com:32000/chabloom-billing-frontend:latest .
docker push chb-uat-1.chabloom.com:32000/chabloom-billing-frontend:$timestamp
docker push chb-uat-1.chabloom.com:32000/chabloom-billing-frontend:latest
