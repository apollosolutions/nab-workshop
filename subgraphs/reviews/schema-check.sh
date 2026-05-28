#!/usr/bin/env bash
#
# Run a schema check against the published reviews subgraph.
# Overrides:
#   GRAPH_REF=other-graph@variant ./check.sh

set -euo pipefail

cd "$(dirname "$0")"

GRAPH_REF="${GRAPH_REF:-workshop-hy3h2cb@dev}"

rover subgraph check "${GRAPH_REF}" \
  --name reviews \
  --schema ./schema.graphql
