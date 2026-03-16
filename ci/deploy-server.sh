#!/bin/bash
set -e

HOST="locent"
REMOTE_DIR="~/locent"

echo ">> Syncing files..."
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='dist' \
  --filter=':- .gitignore' \
  package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json \
  core modules \
  "$HOST:$REMOTE_DIR/"

echo ">> Installing dependencies..."
ssh "$HOST" "cd $REMOTE_DIR && pnpm install --filter @locent/server... --frozen-lockfile"

echo ">> Restarting server..."
ssh "$HOST" "sudo systemctl restart locent-server"

echo ">> Done! Checking status..."
sleep 1
ssh "$HOST" "sudo systemctl is-active locent-server && curl -s http://localhost:3100/"
