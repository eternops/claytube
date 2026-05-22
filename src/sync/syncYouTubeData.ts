import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { ClayTubeConfig } from "../config/loadConfig";
import type { Channel, ChannelsData, Video, VideosData } from "../data/types";
import {
  fetchLatestVideos,
  resolveYouTubeChannel,
  YouTubeApiError
} from "../youtube/client";

export interface SyncResult {
  channels: Channel[];
  videos: Video[];
}

export async function syncYouTubeData(config: ClayTubeConfig): Promise<SyncResult> {
  const uniqueChannelUrls = [...new Set(config.channels)];
  const channels: Channel[] = [];
  const videos: Video[] = [];

  if (uniqueChannelUrls.length === 0) {
    await writeJson("data/channels.json", { channels });
    await writeJson("data/videos.json", { videos });

    return { channels, videos };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new YouTubeApiError("YOUTUBE_API_KEY environment variable is required");
  }

  await writeJson("data/videos.json", { videos });

  for (const channelUrl of uniqueChannelUrls) {
    const resolved = await resolveYouTubeChannel(channelUrl, apiKey);
    const channelVideos = await fetchLatestVideos(
      resolved.channel,
      resolved.uploadsPlaylistId,
      apiKey
    );

    channels.push(resolved.channel);
    videos.push(...channelVideos);
  }

  channels.sort((left, right) => left.title.localeCompare(right.title));
  videos.sort((left, right) => {
    const byDate = right.publishedAt.localeCompare(left.publishedAt);
    return byDate === 0 ? left.id.localeCompare(right.id) : byDate;
  });

  await writeJson("data/channels.json", { channels });
  await writeJson("data/videos.json", { videos });

  return { channels, videos };
}

async function writeJson(
  filePath: "data/channels.json",
  data: ChannelsData
): Promise<void>;
async function writeJson(
  filePath: "data/videos.json",
  data: VideosData
): Promise<void>;
async function writeJson(filePath: string, data: unknown): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
