import { parse } from "yaml";

export interface Config {
  site: { title: string; description?: string; url?: string; base?: string };
  channels: string[];
}

export function parseConfig(content: string): Config {
  const config = parse(content);

  if (
    !config?.channels ||
    !Array.isArray(config.channels) ||
    config.channels.length === 0
  ) {
    throw new Error("Missing channels");
  }

  const youtubeRegex =
    /^https:\/\/(www\.)?youtube\.com\/(channel\/|user\/|c\/|@)[a-zA-Z0-9_-]+$/;
  for (const url of config.channels) {
    if (typeof url !== "string" || !youtubeRegex.test(url)) {
      throw new Error(`Invalid channel URL: ${url}`);
    }
  }

  return config;
}
