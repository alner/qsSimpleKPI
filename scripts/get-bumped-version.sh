#!/bin/bash
set -o errexit

echo "$(head -n 1 BUMPED_VERSION)"

# Usage
# $ get-bumped-version.sh
