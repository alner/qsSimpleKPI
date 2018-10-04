#!/bin/bash
set -o errexit -o verbose

URL="https://github.com/tcnksm/ghr/releases/download/v0.5.4/ghr_v0.5.4_linux_386.zip"
echo "Version to install: $URL"

echo "Installing ghr"
curl -L ${URL} > ghr.zip
mkdir -p "$HOME/bin"
export PATH="$HOME/bin:$PATH"
unzip ghr.zip -d "$HOME/bin"
rm ghr.zip
