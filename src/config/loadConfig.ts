import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "yaml";

export interface ClayTubeConfig {
  site: {
    title: string;
    description: string;
  };
  channels: string[];
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export async function loadConfig(
  configPath = "claytube.config.yaml"
): Promise<ClayTubeConfig> {
  const absolutePath = resolve(configPath);
  const source = await readFile(absolutePath, "utf8");
  const parsed = parse(source);

  return validateConfig(parsed, absolutePath);
}

function validateConfig(value: unknown, sourcePath: string): ClayTubeConfig {
  if (!isRecord(value)) {
    throw new ConfigError(`${sourcePath}: config must be an object`);
  }

  const site = value.site;
  if (!isRecord(site)) {
    throw new ConfigError(`${sourcePath}: site must be an object`);
  }

  const title = site.title;
  if (typeof title !== "string" || title.trim() === "") {
    throw new ConfigError(`${sourcePath}: site.title must be a non-empty string`);
  }

  const description = site.description;
  if (typeof description !== "string" || description.trim() === "") {
    throw new ConfigError(
      `${sourcePath}: site.description must be a non-empty string`
    );
  }

  const channels = value.channels;
  if (!Array.isArray(channels)) {
    throw new ConfigError(`${sourcePath}: channels must be an array`);
  }

  for (const [index, channel] of channels.entries()) {
    if (typeof channel !== "string" || channel.trim() === "") {
      throw new ConfigError(
        `${sourcePath}: channels[${index}] must be a non-empty string`
      );
    }
  }

  return {
    site: {
      title: title.trim(),
      description: description.trim()
    },
    channels: channels.map((channel) => channel.trim())
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
