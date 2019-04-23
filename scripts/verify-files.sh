#!/bin/bash
# The build script has a known race-condition that sometimes causes it to not include all files
# in the built zip. This script verifies the that the zip contains the correct number of files.

set -o errexit

echo "Verifying built file count"

while read line; do
    if [[ $line =~ ^\"name\": ]]; then
        name=${line#*: \"}
        name=${name%\"*}
    fi
done < package.json

expected_file_count=$(($(find dist -type f | wc -l)-1))
zip_file_count=$(zipinfo dist/${name}_${VERSION}.zip | grep ^- | wc -l)

if [ "${expected_file_count}" -ne "${zip_file_count}" ]; then
    # File count is incorrect
    echo "Expected file count ${expected_file_count}, but was ${zip_file_count}"
    exit 1
fi
echo "File count OK"
exit 0
