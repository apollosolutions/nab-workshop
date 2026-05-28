import { readFileSync } from "fs";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";

const port = 4003;

async function main(): Promise<void> {
  const typeDefs = gql(
    readFileSync("./schema.graphql", { encoding: "utf-8" })
  );

  // Build a plain executable schema from the typeDefs (no federation
  // infrastructure), then wrap it with @graphql-tools/mock so every
  // field gets an auto-generated value. No resolvers required: strings
  // become "Hello World", floats become random numbers, IDs become
  // unique strings, etc.
  //
  // This mocks the composed API schema directly (the shape the router
  // would expose to clients), not a federation subgraph. Clients point
  // at this server to develop against the proposal's API contract while
  // the real backend is still being implemented.
  const schema = makeExecutableSchema({ typeDefs });
  const mockedSchema = addMocksToSchema({ schema });

  const server = new ApolloServer({ schema: mockedSchema });
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🎭  Mock server ready at ${url}`);
}

main();
