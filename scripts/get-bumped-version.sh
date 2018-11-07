#!/bin/bash
set -o errexit

if [ "${CIRCLE_BRANCH}" == "master" ]; then
    echo "$(head -n 1 BUMPED_VERSION)"
elif [[ ! -z "${CIRCLE_BRANCH}" && ! -z "${CIRCLE_BUILD_NUM}" ]]; then
    echo "[$(echo ${CIRCLE_BRANCH} | sed -e 's/\//-/g')]-${CIRCLE_BUILD_NUM}"
else
    echo "dev"
fi


# Usage
# $ get-bumped-version.sh
