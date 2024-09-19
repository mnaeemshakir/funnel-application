#!/bin/bash
#chmod +x ./deployment-prod.sh 
yarn build
aws s3 sync ./build-1.0.0 s3://join.mindshine.app --profile mindshine
aws cloudfront create-invalidation --distribution-id E1NWSOCX1HBXKQ --paths "/*" --profile mindshine