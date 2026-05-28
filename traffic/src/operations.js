// Ten named GraphQL operations against the workshop supergraph.
// Each .graphql file in ./queries/ provides the query text; this module
// pairs each one with a variables() generator and exports the list.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const queriesDir = resolve(__dirname, "..", "queries");

const loadQuery = (name) =>
  readFileSync(resolve(queriesDir, `${name}.graphql`), "utf8");

const randomId = (max = 30) => String(Math.floor(Math.random() * max) + 1);
const idVar = () => ({ id: randomId() });
const noVars = () => ({});

export const operations = [
  { name: "ProductPing",        query: loadQuery("ProductPing"),        variables: idVar },
  { name: "GetProductDetail",   query: loadQuery("GetProductDetail"),   variables: idVar },
  { name: "GetProductCard",     query: loadQuery("GetProductCard"),     variables: idVar },
  { name: "ListProducts",       query: loadQuery("ListProducts"),       variables: noVars },
  { name: "ProductCatalog",     query: loadQuery("ProductCatalog"),     variables: noVars },
  { name: "GetUser",            query: loadQuery("GetUser"),            variables: idVar },
  { name: "GetUserProfile",     query: loadQuery("GetUserProfile"),     variables: idVar },
  { name: "ListUsers",          query: loadQuery("ListUsers"),          variables: noVars },
  { name: "ProductWithReviews", query: loadQuery("ProductWithReviews"), variables: idVar },
  { name: "UserWithReviews",    query: loadQuery("UserWithReviews"),    variables: idVar },
];
