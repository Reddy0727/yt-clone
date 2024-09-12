import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSearch } from '../store/actions/getSearchVideos';
import SearchCard from '../components/SearchCard';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../components/Spinner';
import Sidebar from '../components/Sidebar';

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.youtubeSearch);

  
  useEffect(() => {
    if (searchTerm) {
      dispatch(getSearch({ isnext: false, searchTerm }));
    }
  }, [dispatch, searchTerm]);

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex-[0.2]">
          <Sidebar />
        </div>
        <div className="flex-1">
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomeVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-1 p-8 overflow-hidden">
              {videos.map((item,i) => {
                return <SearchCard data={item} key={item.videoId + i} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
        </div>
      </div>
    
  );
};

export default SearchFeed;
