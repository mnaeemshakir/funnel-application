#!/bin/bash
#chmod +x ./deployment-dev.sh 
#ng build --test --aot
yarn build
aws s3 sync ./build-1.0.0 s3://join-dev.mindshine.app --profile mindshine
aws cloudfront create-invalidation --distribution-id E1X4F03IK9MXY --paths "/*" --profile mindshine