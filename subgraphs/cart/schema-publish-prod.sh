#!/usr/bin/env bash
#
# Publish the cart subgraph schema to the prod variant.
# Overrides:
#   GRAPH_REF=other-graph@variant ./schema-publish-prod.sh
#   ROUTING_URL=https://prod.example.com/graphql ./schema-publish-prod.sh

set -euo pipefail

cd "$(dirname "$0")"

GRAPH_REF="${GRAPH_REF:-workshop-hy3h2cb@prod}"
ROUTING_URL="${ROUTING_URL:-http://localhost:4005}"

rover subgraph publish "${GRAPH_REF}" \
  --name cart \
  --schema ./schema.graphql \
  --routing-url "${ROUTING_URL}"
