#!/bin/bash
set -o errexit

VERSION=$(curl --silent "https://api.github.com/repos/$1/$2/releases/latest" | # Get latest release from GitHub api
  grep '"tag_name":' |                                                         # Get tag line
  sed -E 's/.*"([^"]+)".*/\1/')                                                # Pluck JSON value

if [ -z "${VERSION}" ]; then
  VERSION="0.1.0"
fi

echo "${VERSION}"

### Inspired by https://gist.github.com/lukechilds/a83e1d7127b78fef38c2914c4ececc3c
# Usage
# $ get-latest-version.sh qlik-oss qsSimpleKPI
# 0.12.0
