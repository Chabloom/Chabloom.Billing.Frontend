#!/bin/bash

npm install -g @openapitools/openapi-generator-cli@cli-5.0.0-beta
openapi-generator generate -i api.json -g typescript-fetch -o api -c api.config.json
