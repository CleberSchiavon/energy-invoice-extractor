#!/usr/bin/env bash
set -e

echo "INSTALLING HUSKY..."

rm -fr .husky
pnpm husky install
pnpm husky add .husky/pre-commit "pnpm run audit:commit"
pnpm husky add .husky/pre-push "pnpm run lint && pnpm run changelog"
pnpm husky add .husky/commit-msg "npx commitlint --edit $1"

echo "HUSKY INSTALLED"