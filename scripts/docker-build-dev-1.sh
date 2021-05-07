timestamp=`date +%s`
docker build -t chb-dev-1.chabloom.com:32000/chabloom-billing-frontend:$timestamp -t chb-dev-1.chabloom.com:32000/chabloom-billing-frontend:latest .
docker push chb-dev-1.chabloom.com:32000/chabloom-billing-frontend:$timestamp
docker push chb-dev-1.chabloom.com:32000/chabloom-billing-frontend:latest
