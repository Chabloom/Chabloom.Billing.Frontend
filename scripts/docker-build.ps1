docker buildx create --name chabloom --platform linux/amd64,linux/arm64 --use

$timestamp=[int][double]::Parse((Get-Date -UFormat %s))
docker buildx build -t mdcasey/chabloom-billing-frontend:$timestamp -t mdcasey/chabloom-billing-frontend:latest --push --platform linux/amd64,linux/arm64 .
