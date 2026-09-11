#!/bin/sh
set -e
cd "$(dirname "$0")/.."
pnpm audit --audit-level=critical
