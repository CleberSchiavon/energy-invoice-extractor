#!/usr/bin/env bash
set -e

echo "AUDITING CURRENT BRANCH & COMMITS"

pnpm validate-branch-name

echo "AUDIT COMPLETE"