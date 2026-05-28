// Synthetic traffic generator for the workshop supergraph.
//
// Picks one of the ten named operations at random and POSTs it to the router.
// Inter-arrival times follow an exponential distribution (Poisson process)
// so the rate averages to TARGET_RPS but individual requests land at random
// times rather than on a fixed clock.
//
// Overrides:
//   ROUTER_URL=http://localhost:4000/graphql (default)
//   TARGET_RPS=10                            (default)

import { operations } from "./operations.js";

const URL = process.env.ROUTER_URL || "http://localhost:4000";
const TARGET_RPS = Number(process.env.TARGET_RPS) || 10;
const meanInterval = 1000 / TARGET_RPS;

const counters = { sent: 0, ok: 0, gqlErr: 0, httpErr: 0, netErr: 0 };
const byOp = new Map();
const errorsByOp = new Map(); // op name -> first error message seen
const VERBOSE = process.env.VERBOSE === "1";

async function fire() {
  counters.sent += 1;
  const op = operations[Math.floor(Math.random() * operations.length)];
  byOp.set(op.name, (byOp.get(op.name) || 0) + 1);

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: op.name,
        query: op.query,
        variables: op.variables(),
      }),
    });
    if (!res.ok) {
      counters.httpErr += 1;
      if (!errorsByOp.has(op.name)) {
        const body = await res.text().catch(() => "");
        const msg = `HTTP ${res.status} ${res.statusText} ${body.slice(0, 240)}`;
        errorsByOp.set(op.name, msg);
        console.log(`\n  [${op.name}] ${msg}`);
      }
      return;
    }
    const json = await res.json();
    if (json.errors) {
      counters.gqlErr += 1;
      const firstErr = json.errors[0];
      const msg = firstErr.message || JSON.stringify(firstErr);
      if (!errorsByOp.has(op.name)) {
        errorsByOp.set(op.name, msg);
        console.log(`\n  [${op.name}] ${msg}`);
      }
      if (VERBOSE) {
        console.log(`\n  [${op.name}] ${msg}`);
      }
    } else {
      counters.ok += 1;
    }
  } catch (e) {
    counters.netErr += 1;
    if (!errorsByOp.has(op.name)) {
      errorsByOp.set(op.name, e.message || String(e));
      console.log(`\n  [${op.name}] network: ${e.message || e}`);
    }
  }
}

function loop() {
  fire(); // fire and forget; do not await
  const next = -Math.log(1 - Math.random()) * meanInterval;
  setTimeout(loop, next);
}

setInterval(() => {
  const { sent, ok, gqlErr, httpErr, netErr } = counters;
  process.stdout.write(
    `\rsent=${sent} ok=${ok} gqlErr=${gqlErr} httpErr=${httpErr} netErr=${netErr}    `
  );
}, 1000);

process.on("SIGINT", () => {
  console.log("\n\nFinal counts:");
  console.log(counters);
  console.log("\nPer operation:");
  for (const [name, count] of [...byOp.entries()].sort((a, b) => b[1] - a[1])) {
    const err = errorsByOp.get(name);
    const marker = err ? "  ✗" : "  ✓";
    console.log(`${marker} ${name.padEnd(24)} ${String(count).padStart(4)}${err ? `   ${err.slice(0, 80)}` : ""}`);
  }
  process.exit(0);
});

console.log(`Sending ~${TARGET_RPS} ops/sec to ${URL}.`);
console.log(`Ten operations, random selection, exponential inter-arrival times.`);
console.log(`Ctrl-C to stop and print a per-operation summary.\n`);
loop();
