import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../utilities/apis';

export const getHomeVideos = createAsyncThunk(
  'youtube/homeVideos',
  async (isNext, { getState, rejectWithValue }) => {
    try {
      const { youtubeHome: { nextPageToken } } = getState();
      const pageToken = isNext ? `${nextPageToken}` : '';

      // Fetch popular videos
      const videoResponse = await request.get('/videos', {
        params: {
          part: 'snippet,statistics,contentDetails',
          chart: 'mostPopular',
          maxResults:20,
          regionCode: 'US',
          pageToken: pageToken,
        },
      });

      const videoItems = videoResponse.data.items;
      const channelIds = videoItems.map(video => video.snippet.channelId).join(',');

      // Fetch channel info based on channelIds
      const channelResponse = await request.get('/channels', {
        params: {
          part: 'snippet',
          id: channelIds,
        },
      });

      // Map channel info into videos
      const channels = channelResponse.data.items;
      const videosWithChannelInfo = videoItems.map(video => {
        const channel = channels.find(c => c.id === video.snippet.channelId);
        return {
          ...video,
          channelInfo: channel ? channel.snippet : null,
        };
      });

      return { items: videosWithChannelInfo, nextPageToken: videoResponse.data.nextPageToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
