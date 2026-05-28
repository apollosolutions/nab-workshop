#!/usr/bin/env bash
#
# Fetch the current API schema from the workshop graph in GraphOS
# and write it to schema.graphql. Run from mock-server/.
#
# Requires Rover to be authenticated with a personal API key
# (one-time setup: rover config auth).
#
# Usage:
#   ./fetch-schema.sh
#   GRAPH_REF=other-graph@variant ./fetch-schema.sh
#   OUTPUT=./other-file.graphql ./fetch-schema.sh

set -euo pipefail

GRAPH_REF="${GRAPH_REF:-workshop-hy3h2cb@current}"
OUTPUT="${OUTPUT:-./schema.graphql}"

if ! command -v rover >/dev/null 2>&1; then
  echo "Error: rover is not installed or not on PATH." >&2
  echo "Install: curl -sSL https://rover.apollo.dev/nix/latest | sh" >&2
  exit 1
fi

echo "Fetching API schema from ${GRAPH_REF}..."
rover graph fetch "${GRAPH_REF}" > "${OUTPUT}"

LINES=$(wc -l < "${OUTPUT}" | tr -d ' ')
echo "Wrote ${LINES} lines to ${OUTPUT}"
