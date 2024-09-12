import { createSlice } from '@reduxjs/toolkit';
import { getHomeVideos } from '../actions/getHomePageVideos';

const initialState = {
  videos: [],
  loading: false,
  error: null,
  nextPageToken: null,
};

const youtubeHomeSlice = createSlice({
  name: 'youtubeHome',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeVideos.fulfilled, (state, action) => {
        state.nextPageToken = action.payload.nextPageToken;
        state.videos = [...state.videos, ...action.payload.items]; 
        state.loading = false;
      })
      .addCase(getHomeVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load videos';
      });
  },
});

export default youtubeHomeSlice.reducer;
