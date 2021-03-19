docker build -t chabloom-billing-frontend:1.0.0 .
docker save chabloom-billing-frontend > chabloom-billing-frontend.tar
microk8s ctr image import chabloom-billing-frontend.tar
rm chabloom-billing-frontend.tar
