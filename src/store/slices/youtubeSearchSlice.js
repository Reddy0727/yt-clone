import { createSlice } from "@reduxjs/toolkit";
import { getSearch } from "../actions/getSearchVideos";

const initialState = {
    videos: [],
    searchTerm: '',
    loading: false,
    error: null,
    nextPageToken: ''
};

const youtubeSearchSlice = createSlice({
    name: 'youtubeSearch', 
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getSearch.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSearch.fulfilled, (state, action) => {
            state.nextPageToken = action.payload.nextPageToken;
            state.videos = [...state.videos, ...action.payload.items]; 
            state.loading = false;
        })
        .addCase(getSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to load videos';
        });
    }
});

export default youtubeSearchSlice.reducer;
