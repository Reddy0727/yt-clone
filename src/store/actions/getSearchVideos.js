import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utilities/apis";

export const getSearch = createAsyncThunk(
    'youtube/searchVideos',
    async ({ isNext, searchTerm }, { getState, rejectWithValue }) => {
        try {
            const { youtubeSearch: { nextPageToken } } = getState();
            const token = isNext ? nextPageToken : '';

            // Fetch search results
            const searchResponse = await request.get('/search', {
                params: {
                    maxResults: 20,
                    part: 'snippet',
                    q: searchTerm,
                    type: 'video', 
                    pageToken: token
                }
            });

            const videoIds = searchResponse.data.items.map(item => item.id.videoId).filter(id => id);
            const channelIds = searchResponse.data.items.map(item => item.snippet.channelId).filter(id => id);

            // Fetch video details
            const videoDetailsResponse = await request.get('/videos', {
                params: {
                    part: 'snippet,statistics,contentDetails',
                    id: videoIds.join(',')
                }
            });

            // Fetch channel details
            const channelDetailsResponse = await request.get('/channels', {
                params: {
                    part: 'snippet',
                    id: channelIds.join(',')
                }
            });

            // Map video details and channel info
            const videoDetails = videoDetailsResponse.data.items;
            const channelDetails = channelDetailsResponse.data.items;

            const videosWithDetails = videoDetails.map(video => {
                const channel = channelDetails.find(c => c.id === video.snippet.channelId);
                return {
                    ...video,
                    channelInfo: channel ? channel.snippet : null
                };
            });

            return {
                items: videosWithDetails,
                nextPageToken: searchResponse.data.nextPageToken
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
