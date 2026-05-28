# NAB Workshop — From Proposal to Production

Starter repo for the May 28 NAB workshop. Walks the full Apollo schema proposal lifecycle: propose → approve → mock → implement → close.

## Layout

```
workshop/
├── package.json                   # pnpm workspace root + convenience scripts
├── pnpm-workspace.yaml            # packages: subgraphs/* + mock-server
├── router/
│   └── supergraph.yaml            # composes products + users + reviews
├── subgraphs/
│   ├── products/                  # production subgraph, DummyJSON-backed (port 4001)
│   ├── users/                     # production subgraph, DummyJSON-backed (port 4002)
│   └── reviews/                   # placeholder; filled in during Block 3 (port 4004)
└── mock-server/                   # standalone API mock — NOT a subgraph (port 4003)
    ├── schema.graphql             # populated via fetch-schema.sh + manual proposal additions
    ├── src/
    │   └── index.ts               # uses @graphql-tools/mock to auto-mock everything
    ├── fetch-schema.sh            # rover graph fetch helper
    └── ...
```

## Port map

| Service | Port |
|---|---|
| Router | 4000 |
| Products subgraph | 4001 |
| Users subgraph | 4002 |
| Mock server | 4003 |
| Reviews subgraph | 4004 |

## First-time setup

From the workshop root:

```bash
pnpm install
```

`pnpm install` walks the workspace and installs deps for every package. Each `postinstall` runs `tsc` so TypeScript compiles automatically.

## During the workshop

**Block 2** (mock the approved schema). Run `pnpm fetch-schema` from `mock-server/` to grab the current API schema, paste the proposal's additions on top, then `pnpm dev:mock` and hand the URL to client teams.

**Block 3** (implement and close the loop). Replace the placeholder schema in `subgraphs/reviews/schema.graphql` with the approved Review schema, fill in resolvers, then `rover subgraph publish workshop-hy3h2cb@current --name reviews ...` to close the proposal loop in Studio.

## Common commands

Start all subgraphs at once (products + users + reviews, in parallel):

```bash
pnpm dev:subgraphs
```

Start an individual subgraph:

```bash
pnpm dev:products    # port 4001
pnpm dev:users       # port 4002
pnpm dev:reviews     # port 4004
```

Start the mock server (standalone, port 4003):

```bash
pnpm dev:mock
```

Start the router (port 4000, after subgraphs are up):

```bash
pnpm router
```

Build everything once (no watch):

```bash
pnpm build
```
