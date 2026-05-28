#!/usr/bin/env bash
#
# Fetch the API schema from a workshop variant and write it to schema.graphql.
#
# Proposals are themselves variants (named p-0, p-1, ...), so you can fetch
# the post-proposal API schema directly without any manual paste step.
#
# Usage:
#   ./fetch-schema.sh                 # workshop-hy3h2cb@dev
#   ./fetch-schema.sh prod            # workshop-hy3h2cb@prod
#   ./fetch-schema.sh p-0             # proposal preview (post-proposal API)
#   VARIANT=p-0 ./fetch-schema.sh
#   GRAPH_REF=other-graph@variant ./fetch-schema.sh
#   OUTPUT=./other-file.graphql ./fetch-schema.sh

set -euo pipefail

VARIANT="${1:-${VARIANT:-dev}}"
GRAPH_REF="${GRAPH_REF:-workshop-hy3h2cb@$VARIANT}"
OUTPUT="${OUTPUT:-./schema.graphql}"

cd "$(dirname "$0")"

if ! command -v rover >/dev/null 2>&1; then
  echo "Error: rover is not installed or not on PATH." >&2
  echo "Install: curl -sSL https://rover.apollo.dev/nix/latest | sh" >&2
  exit 1
fi

echo "Fetching API schema from ${GRAPH_REF}..."
rover graph fetch "${GRAPH_REF}" > "${OUTPUT}"

LINES=$(wc -l < "${OUTPUT}" | tr -d ' ')
echo "Wrote ${LINES} lines to ${OUTPUT}"
