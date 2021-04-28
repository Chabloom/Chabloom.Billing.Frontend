timestamp=`date +%s`
docker build -t 10.1.1.11:32000/chabloom-billing-frontend:$timestamp -t 10.1.1.11:32000/chabloom-billing-frontend:latest .
docker push 10.1.1.11:32000/chabloom-billing-frontend:$timestamp
docker push 10.1.1.11:32000/chabloom-billing-frontend:latest
