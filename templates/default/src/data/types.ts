export interface Channel {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export interface Video {
  id: string;
  title: string;
  channelId: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

export interface ChannelsData {
  channels: Channel[];
}

export interface VideosData {
  videos: Video[];
}
