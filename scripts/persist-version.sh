#!/bin/sh
set -o errexit

echo "Persisting version"

git config --global user.email $(git --no-pager show -s --format='%ae' HEAD)
git config --global user.name $(git --no-pager show -s --format='%ae' HEAD)
git status
git add VERSION
git commit -m "[ci skip] Bumping version"
git remote rm origin
git remote add origin https://qlikossbuild:${ghoauth}@github.com/qlik-oss/qsSimpleKPI.git
git push origin ${CIRCLE_BRANCH}