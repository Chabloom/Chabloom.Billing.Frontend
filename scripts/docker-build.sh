timestamp=`date +%s`
docker build -t mdcasey/chabloom-billing-frontend:$timestamp -t mdcasey/chabloom-billing-frontend:latest .
docker push mdcasey/chabloom-billing-frontend:$timestamp
docker push mdcasey/chabloom-billing-frontend:latest
