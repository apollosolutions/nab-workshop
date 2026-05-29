import { readFileSync } from "fs";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { mockUsers } from "./mockData";

const port = 4003;

async function main(): Promise<void> {
  const typeDefs = gql(
    readFileSync("./schema.graphql", { encoding: "utf-8" })
  );

  // Fixture resolvers for users/carts (DummyJSON-shaped). Everything else
  // still auto-mocks via @graphql-tools/mock for ad-hoc queries.
  const resolvers = {
    Query: {
      users: () => mockUsers,
      user: (_: unknown, { id }: { id: string }) =>
        mockUsers.find((u) => u.id === id) ?? null,
    },
    Cart: {
      user: (cart: { id: string }) => {
        const owner = mockUsers.find((u) =>
          u.carts.some((c) => c.id === cart.id)
        );
        return owner ?? { id: "1" };
      },
    },
  };

  const mocks = {
    Product: () => ({
      title: () => "Cricket Helmet",
      category: () => "sports-accessories",
      brand: () => "DSC",
      price: () => 44.99,
      rating: () => 4.8,
      stock: () => 42,
    }),
    Review: () => ({
      reviewerName: () => "Alex Morgan",
      rating: () => 5,
    }),
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers: true,
  });

  const server = new ApolloServer({ schema: mockedSchema });
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🎭  Mock server ready at ${url}`);
}

main();
