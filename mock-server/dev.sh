#!/usr/bin/env bash
#
# Fetch the schema for a workshop variant, then start the mock server in
# dev mode (nodemon watching src/ and schema.graphql for hot reloads).
#
# Usage:
#   ./dev.sh           # fetches @dev (default), starts mock
#   ./dev.sh p-0       # fetches the p-0 proposal variant, starts mock
#   ./dev.sh prod      # fetches @prod, starts mock

set -euo pipefail
cd "$(dirname "$0")"

./fetch-schema.sh "$@"

pnpm exec nodemon \
  --watch "src/**" \
  --watch "./schema.graphql" \
  --ext "ts,json,graphql" \
  --exec "pnpm build && pnpm start"
