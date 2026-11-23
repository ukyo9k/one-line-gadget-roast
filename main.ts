// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line (1-200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt,
// falling back to /output/entry.txt when the env var is unset.
// Standard library only, Node 22+.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My noise-cancelling earbuds promised silence, then turned my own chewing into a podcast I never subscribed to.";

function validate(line) {
  if (!line || line.trim().length === 0) {
    throw new Error("roast line must not be empty or only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  const length = [...line].length; // count code points, not UTF-16 units
  if (length < 1 || length > 200) {
    throw new Error(`roast line must be 1-200 characters, got ${length}`);
  }
}

function main() {
  validate(ROAST);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ROAST + "\n", "utf8");
}

main();
