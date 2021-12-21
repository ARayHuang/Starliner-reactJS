#!/bin/bash -xe
set -e
set -o pipefail

# declare parameter
REGION="us-west-2"
REPOSITORY_USER_URI="220214514712.dkr.ecr.us-west-2.amazonaws.com"
REPOSITORY_URI="$REPOSITORY_USER_URI/starliner-web"

DOCKERFILE_DIR_PATH="builder"
GIT_TAG=`git describe --tags $(git rev-list --tags --max-count=1)`
GIT_HASH=`git rev-parse HEAD`
IMAGE_TAG="$GIT_TAG-$GIT_HASH"
IMAGE=$REPOSITORY_URI:$IMAGE_TAG
LATSET="latest"
LATEST_IMAGE=$REPOSITORY_URI:$LATSET

# login to aws
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPOSITORY_USER_URI

# build docker file
docker build --no-cache -t $IMAGE -f $DOCKERFILE_DIR_PATH/Dockerfile .
docker tag $IMAGE $LATEST_IMAGE

docker push $IMAGE
docker push $LATEST_IMAGE

# update ecs service 

exit 0
