// Cart subgraph resolvers — fill in during Block 3.
//
// The cartSource module provides the DummyJSON HTTP plumbing; you just need
// to wire it into the federation resolvers. You'll write:
//
//   - Query.cart(id) and Query.carts
//   - Cart.__resolveReference (entity lookup by id)
//   - Cart.user (return a User reference: { __typename: 'User', id })
//   - CartItem.product (return a Product reference: { __typename: 'Product', id })
//   - User.carts (use fetchCartsByUserId)
//
// Tip: open the apollo-server skill in Cursor / Claude Code and ask it to
// implement these against the helpers in ./cartSource.ts.

import {
  fetchCartById,
  fetchCarts,
  fetchCartsByUserId,
} from "./cartSource";

export const Query = {
  // TODO: implement
};
