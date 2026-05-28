#!/usr/bin/env bash
#
# Download the Apollo Router binary into this folder.
# Defaults to the latest version; pin a version via ROUTER_VERSION.
#
# Usage:
#   ./download-router.sh
#   ROUTER_VERSION=v2.5.0 ./download-router.sh

set -euo pipefail

ROUTER_VERSION="${ROUTER_VERSION:-latest}"

cd "$(dirname "$0")"

echo "Downloading Apollo Router (${ROUTER_VERSION})..."
curl -sSL "https://router.apollo.dev/download/nix/${ROUTER_VERSION}" | sh

echo ""
echo "Router downloaded. Run with:"
echo "  ./router --supergraph supergraph.graphql --config router-config.yaml"
