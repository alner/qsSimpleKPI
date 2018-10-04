#!/bin/bash
set -o errexit

join_by () {
  local IFS="$1"; shift; echo "$*";
}

# get version from repo
OLD_VERSION="$(scripts/get-latest-version.sh $1 $2)"

# split into array
IFS='.' read -ra ARRAY_VERSION <<< "$OLD_VERSION"

# bump minor
ARRAY_VERSION[1]=$((ARRAY_VERSION[1]+1))

# join into string
NEW_VERSION=$(join_by . ${ARRAY_VERSION[@]})
echo "$NEW_VERSION"


# Usage
# $ bump-version.sh qlik-oss qsSimpleKPI
