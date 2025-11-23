#!/bin/bash
set -e

# Specify the base URL
BASE_URL=${1:-"http://localhost:1313"}

echo "Using base URL: $BASE_URL"

# Version configuration - modify these arrays to specify versions to build
# MAIN_VERSION format: "ref:display_name:source_dir"
# VERSIONS format: "ref:display_name:source_dir" where source_dir is either "docs" or "exampleSite"
MAIN_VERSION="v0.11.1:latest:docs"
VERSIONS=(
  "main:latest:docs" # latest version always builds from main
  "v0.10.2:v0.10:exampleSite"
  "v0.9.6:v0.9:exampleSite"
)

# Parse main version
IFS=':' read -r MAIN_REF MAIN_NAME MAIN_DIR <<< "$MAIN_VERSION"

# Ensure clean public directory
rm -rf public
mkdir -p public
mkdir -p public/versions

# Checkout and build main site
git checkout $MAIN_REF
GIT_HASH=$(git rev-parse --short HEAD)
echo "Building main site from $MAIN_REF (commit: $GIT_HASH)"
hugo \
  --minify \
  --themesDir=../.. --source=$MAIN_DIR \
  --baseURL "$BASE_URL/" \
  --destination=../public

# Build all versions
for VERSION in "${VERSIONS[@]}"; do
  IFS=':' read -r REF NAME DIR <<< "$VERSION"

  git checkout $REF
  GIT_HASH=$(git rev-parse --short HEAD)
  echo "Building version $NAME from $REF (commit: $GIT_HASH)"

  mkdir -p "public/versions/$NAME"
  hugo \
    --minify \
    --themesDir=../.. --source=$DIR \
    --baseURL "$BASE_URL/versions/$NAME/" \
    --destination="../public/versions/$NAME"
done

# Return to main branch
git checkout main

echo "Build completed"
