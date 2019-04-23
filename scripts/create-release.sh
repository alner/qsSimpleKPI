#!/bin/bash
set -o errexit

echo "Creating release for version: $VERSION"
echo "Artifact name: ./dist/${3}_${VERSION}.zip"
$HOME/bin/ghr -t ${ghoauth} -u ${CIRCLE_PROJECT_USERNAME} -r ${CIRCLE_PROJECT_REPONAME} -c ${CIRCLE_SHA1} ${VERSION} "./dist/${3}_${4}.zip"


# Usage
# $ create-release.sh qlik-oss qsSimpleKPI qlik-multi-kpi 0.3.1
