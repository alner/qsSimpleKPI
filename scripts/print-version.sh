#!/bin/sh
set -o errexit

VERSION="../VERSION"

MAJOR=$(grep -i 'MAJOR' VERSION  | cut -f2 -d'=')
MINOR=$(grep -i 'MINOR' VERSION  | cut -f2 -d'=')
PATCH=$(grep -i 'PATCH' VERSION  | cut -f2 -d'=')
VERSION="${MAJOR}.${MINOR}.${PATCH}"
echo ${VERSION}