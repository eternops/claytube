#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { loadConfig } from "../config/loadConfig.js";
import { syncYouTubeData } from "../sync/syncYouTubeData.js";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "sync") {
    await sync(args);
    return;
  }

  if (command === "build") {
    buildSite(args.slice(1));
    return;
  }

  throw new Error("Usage: claytube <sync|build> [options]");
}

async function sync(args: string[]): Promise<void> {
  const configPath = readOption(args, "--config") ?? "claytube.config.yaml";
  const config = await loadConfig(configPath);
  const result = await syncYouTubeData(config);

  console.log(
    `Synced ${result.channels.length} channel(s) and ${result.videos.length} video(s).`
  );
}

function buildSite(args: string[]): void {
  const require = createRequire(import.meta.url);
  const astroPackagePath = require.resolve("astro/package.json");
  const astroBinPath = join(dirname(astroPackagePath), "astro.js");
  const result = spawnSync(process.execPath, [astroBinPath, "build", ...args], {
    env: process.env,
    stdio: "inherit"
  });

  if (result.error) {
    throw result.error;
  }

  process.exitCode = result.status ?? 1;
}

function readOption(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);

  if (index === -1) {
    return undefined;
  }

  const value = args[index + 1];
  if (!value) {
    throw new Error(`${name} requires a value`);
  }

  return value;
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
