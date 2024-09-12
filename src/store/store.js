import { configureStore } from '@reduxjs/toolkit';
import youtubeHomeSlice from './slices/youtubeHomeSlice';
import youtubeSearchSlice from './slices/youtubeSearchSlice';

const store = configureStore({
  reducer: {
    youtubeHome: youtubeHomeSlice, 
    youtubeSearch: youtubeSearchSlice, 
  },
});

export default store;
