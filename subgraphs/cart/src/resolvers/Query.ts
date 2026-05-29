import {
  fetchCart,
  fetchCarts,
  fetchCartsByUserId,
} from "./cartsSource";

export const Query = {
  Query: {
    cart: async (_parent: unknown, { id }: { id: string }) => {
      return fetchCart(id);
    },
    carts: async () => {
      return fetchCarts();
    },
  },
  Cart: {
    __resolveReference: async (reference: { id: string }) => {
      return fetchCart(reference.id);
    },
    user: (parent: { userId: number }) => ({
      __typename: "User" as const,
      id: String(parent.userId),
    }),
  },
  CartItem: {
    product: (parent: { productId: number }) => ({
      __typename: "Product" as const,
      id: String(parent.productId),
    }),
  },
  User: {
    carts: async (parent: { id: string }) => {
      return fetchCartsByUserId(parent.id);
    },
  },
};
