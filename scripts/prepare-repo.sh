#!/usr/bin/env bash
set -e

echo "Preparing Repo Environment"

echo 'Installing pnpm@8.9.0..'
npm install -g pnpm@8.9.0
echo "PNPM Installed"

echo "Installing All Repo Dependencies"
pnpm install
echo "Repo Dependencies Installed"

pnpm run husky:install
echo "Generating Database"
pnpm run api:database-generate
echo "Database Generated"
echo "Application is Ready to Start, type pnpm run dev to start the local application :)"