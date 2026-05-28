# Cart Subgraph Build Prompt

Open Cursor or Claude Code from the workshop root with the
`apollo-server` skill installed (`npx skills add apollographql/skills`,
selecting `apollo-server` and `apollo-federation` at the picker).

Paste the prompt below into the chat. Slash command first; everything
after it is the brief.

---

```
/apollo-server

Create a new federated subgraph at subgraphs/cart/ that mirrors the
TypeScript structure of subgraphs/products/ (package.json, tsconfig.json,
src/index.ts boot, src/resolvers/Query.ts, src/resolvers/index.ts).
Port 4005. Federation 2.7. Backed by DummyJSON.

Write this schema to subgraphs/cart/schema.graphql:

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.7", import: ["@key"])

  type Cart @key(fields: "id") {
    id: ID!
    total: Float!
    discountedTotal: Float!
    totalProducts: Int!
    totalQuantity: Int!
    products: [CartItem!]!
    user: User!
  }

  type CartItem {
    quantity: Int!
    total: Float!
    discountedTotal: Float!
    product: Product!
  }

  type User @key(fields: "id") {
    id: ID!
    carts: [Cart!]!
  }

  type Product @key(fields: "id", resolvable: false) {
    id: ID!
  }

  type Query {
    cart(id: ID!): Cart
    carts: [Cart!]!
  }

DummyJSON endpoints (no auth required):

  GET https://dummyjson.com/carts/{id}             single cart
  GET https://dummyjson.com/carts?limit=30         list of carts
  GET https://dummyjson.com/carts/user/{userId}    carts for a user

DummyJSON cart payload shape:

  {
    "id": 1,
    "total": 4794.8,
    "discountedTotal": 4288.96,
    "totalProducts": 4,
    "totalQuantity": 50,
    "userId": 33,
    "products": [
      {
        "id": 144,
        "title": "Cricket Helmet",
        "price": 44.99,
        "quantity": 4,
        "total": 179.96,
        "discountPercentage": 11.47,
        "discountedTotal": 159.32,
        "thumbnail": "..."
      }
    ]
  }

Resolvers to implement in src/resolvers/Query.ts:

  - Query.cart(id)            fetch by id
  - Query.carts               fetch list
  - Cart.__resolveReference   entity lookup by id
  - Cart.user                 return { __typename: "User", id: parent.userId }
  - CartItem.product          return { __typename: "Product", id: parent.id }
  - User.carts                use /carts/user/{userId}

Use Node 20+ native fetch. No external HTTP libraries. Keep TypeScript
loose (any/unknown is fine for DummyJSON response shapes).
```

---

After the AI finishes:

1. Review the generated files. Make sure `subgraphs/cart/package.json`
   declares `name: "nab-workshop-cart"` so the workspace scripts find it.
2. From the workshop root, `pnpm install` to register the new package.
3. `pnpm dev:cart` to start it on port 4005.
4. Move on to registering cart with the router (next slide).
