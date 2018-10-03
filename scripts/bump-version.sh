#!/bin/sh
set -o errexit

echo "Bumping version..."
MAJOR=$(grep -i 'MAJOR' VERSION  | cut -f2 -d'=')
MINOR=$(grep -i 'MINOR' VERSION  | cut -f2 -d'=')
PATCH=$(grep -i 'PATCH' VERSION  | cut -f2 -d'=')
echo "from: ${MAJOR}.${MINOR}.${PATCH}"

# The bump
sed -ie "/MINOR=/ s/=.*/=$((MINOR+1))/" "VERSION"

MAJOR=$(grep -i 'MAJOR' VERSION  | cut -f2 -d'=')
MINOR=$(grep -i 'MINOR' VERSION  | cut -f2 -d'=')
PATCH=$(grep -i 'PATCH' VERSION  | cut -f2 -d'=')
echo "to: ${MAJOR}.${MINOR}.${PATCH}"
