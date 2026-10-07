#!/bin/bash
# Prepares Claude Code cloud sessions: install deps and build tokens/themes/icons/ui
# so lint, typecheck and tests work without a manual setup step.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"
pnpm install --frozen-lockfile
pnpm build:packages
