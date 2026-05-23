#!/usr/bin/env node

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const compiledEntry = new URL("../dist/cli/cli/index.js", import.meta.url);

if (existsSync(fileURLToPath(compiledEntry))) {
  await import(compiledEntry.href);
  process.exitCode ??= 0;
} else {
  const require = createRequire(import.meta.url);
  const tsxLoader = require.resolve("tsx");
  const cliEntry = fileURLToPath(
    new URL("../src/cli/index.ts", import.meta.url),
  );
  const result = spawnSync(
    process.execPath,
    ["--import", tsxLoader, cliEntry, ...process.argv.slice(2)],
    {
      env: process.env,
      stdio: "inherit",
    },
  );

  if (result.error) {
    throw result.error;
  }

  process.exitCode = result.status ?? 1;
}
