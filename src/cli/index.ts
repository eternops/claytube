import { loadConfig } from "../config/loadConfig";
import { syncYouTubeData } from "../sync/syncYouTubeData";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command !== "sync") {
    throw new Error("Usage: claytube sync [--config claytube.config.yaml]");
  }

  const configPath = readOption(args, "--config") ?? "claytube.config.yaml";
  const config = await loadConfig(configPath);
  const result = await syncYouTubeData(config);

  console.log(
    `Synced ${result.channels.length} channel(s) and ${result.videos.length} video(s).`
  );
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
