import { fetchProduct, fetchProducts } from "./productsSource";

// Resolver functions map by type/field; Apollo Server matches them against
// the schema. The Product.__resolveReference resolver is the federation
// hook that lets other subgraphs reference a Product by id.

export const Query = {
  Query: {
    product: async (_parent: unknown, { id }: { id: string }) => {
      return fetchProduct(id);
    },
    products: async () => {
      return fetchProducts();
    },
  },
  Product: {
    __resolveReference: async (reference: { id: string }) => {
      return fetchProduct(reference.id);
    },
  },
};
