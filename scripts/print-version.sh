#!/bin/bash
set -o errexit

VERSION="$(scripts/get-latest-version.sh $1 $2)"

echo ${VERSION}

# Usage
# $ print-version.sh qlik-oss qsSimpleKPI
# 0.12.0
