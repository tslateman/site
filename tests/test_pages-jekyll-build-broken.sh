#!/bin/sh
set -eu

REPO="tslateman/site"
STATUS=$(gh api "repos/$REPO/pages" --jq '.status' 2>/dev/null) || STATUS="disabled"

if [ "$STATUS" = "errored" ]; then
  echo "FAIL: GitHub Pages for $REPO is status=errored (legacy Jekyll auto-build still enabled and broken)"
  exit 1
fi

echo "PASS: GitHub Pages for $REPO is not in an errored state (status=$STATUS)"
