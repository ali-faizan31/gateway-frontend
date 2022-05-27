#!/bin/bash

# *** Change this to the desired name of the Cloudformation stack of
# your Pipeline (*not* the stack name of your app)
GITHUB_OWNER="sheraz-ferrum"
GITHUB_REPO="gateway-frontend"
GITHUB_BRANCH="cicd"
GITHUB_OAUTH_TOKEN=$1
DEV_PREFIX="ziki"
APP_NAME="frontend"
ENVIRONMENT="dev"
CODEPIPELINE_STACK_NAME="${DEV_PREFIX}${APP_NAME}-${ENVIRONMENT}-pipeline"
read -p "Enable password for frontend  true|false:" ENABLE_PASSOWRD
PASSWORD=$(tr -cd '[:alnum:]' < /dev/urandom | fold -w30 | head -n1)

if [ -z ${1} ]
then
	echo "PIPELINE CREATION FAILED!"
        echo "Pass your Github OAuth token as the first argument"
	exit 1
fi

set -eu

if [ "${ENABLE_PASSOWRD}" = true ]; then

aws cloudformation create-stack \
  --capabilities CAPABILITY_IAM \
  --stack-name $CODEPIPELINE_STACK_NAME --region us-east-1  \
  --parameters ParameterKey=DevPrefix,ParameterValue=${DEV_PREFIX} \
							 ParameterKey=GitHubBranch,ParameterValue=${GITHUB_BRANCH} \
							 ParameterKey=AppName,ParameterValue=${APP_NAME} \
							 ParameterKey=Environment,ParameterValue=${ENVIRONMENT} \
							 ParameterKey=PASSWORD,ParameterValue=${PASSWORD} \
  --template-body file://lambda.yaml

aws cloudformation wait stack-create-complete --region us-east-1 \
    --stack-name ${CODEPIPELINE_STACK_NAME}

LAMBDAEDGEVERSION=$(aws cloudformation --region us-east-1  describe-stacks --stack-name ${CODEPIPELINE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='CloudfrontEdgeLambdaVersion'].OutputValue" --output text)

LAMBDAEDGEARN=$(aws cloudformation --region us-east-1  describe-stacks --stack-name ${CODEPIPELINE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='CloudfrontEdgeLambdaArn'].OutputValue" --output text)

aws cloudformation create-stack \
  --capabilities CAPABILITY_IAM \
  --stack-name $CODEPIPELINE_STACK_NAME --region us-east-2  \
  --parameters ParameterKey=DevPrefix,ParameterValue=${DEV_PREFIX} \
	             ParameterKey=GitHubOwner,ParameterValue=${GITHUB_OWNER} \
							 ParameterKey=GitHubRepo,ParameterValue=${GITHUB_REPO} \
							 ParameterKey=GitHubBranch,ParameterValue=${GITHUB_BRANCH} \
	             ParameterKey=GitHubOAuthToken,ParameterValue=${GITHUB_OAUTH_TOKEN} \
							 ParameterKey=AppName,ParameterValue=${APP_NAME} \
							 ParameterKey=Environment,ParameterValue=${ENVIRONMENT} \
							 ParameterKey=LambdaEdgArn,ParameterValue=${LAMBDAEDGEARN} \
							 ParameterKey=LambdaEdgVersion,ParameterValue=${LAMBDAEDGEVERSION} \
	--template-body file://pipeline.yaml

echo Your password is step1 $PASSWORD

else

INCLUDE_LAMBDAEDGE="false"

aws cloudformation create-stack \
  --capabilities CAPABILITY_IAM \
  --stack-name $CODEPIPELINE_STACK_NAME --region us-east-2  \
  --parameters ParameterKey=DevPrefix,ParameterValue=${DEV_PREFIX} \
	             ParameterKey=GitHubOwner,ParameterValue=${GITHUB_OWNER} \
							 ParameterKey=GitHubRepo,ParameterValue=${GITHUB_REPO} \
							 ParameterKey=GitHubBranch,ParameterValue=${GITHUB_BRANCH} \
	             ParameterKey=GitHubOAuthToken,ParameterValue=${GITHUB_OAUTH_TOKEN} \
							 ParameterKey=AppName,ParameterValue=${APP_NAME} \
							 ParameterKey=Environment,ParameterValue=${ENVIRONMENT} \
							 ParameterKey=IncludeLambdaEdge,ParameterValue=${INCLUDE_LAMBDAEDGE} \
	--template-body file://pipeline.yaml

fi

# sleep 10

# aws wait cloudforamtion stack-create-complete \
#   --stack-name $CODEPIPELINE_STACK_NAME
