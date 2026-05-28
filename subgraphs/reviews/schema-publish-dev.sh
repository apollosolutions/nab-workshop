#!/usr/bin/env bash
#
# Publish the reviews subgraph schema to GraphOS.
# Overrides:
#   GRAPH_REF=other-graph@variant ./publish.sh
#   ROUTING_URL=https://prod.example.com/graphql ./publish.sh

set -euo pipefail

cd "$(dirname "$0")"

GRAPH_REF="${GRAPH_REF:-workshop-hy3h2cb@dev}"
ROUTING_URL="${ROUTING_URL:-http://localhost:4004}"

rover subgraph publish "${GRAPH_REF}" \
  --name reviews \
  --schema ./schema.graphql \
  --routing-url "${ROUTING_URL}"
