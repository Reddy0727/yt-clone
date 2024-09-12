import React, { useEffect } from 'react';
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeVideos } from '../store/actions/getHomePageVideos';

const HomePage = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.youtubeHome);

  useEffect(() => {
    dispatch(getHomeVideos(false));
  }, [dispatch]);

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
            <div className="grid gap-y-14 gap-x-8 grid-cols-3 p-8 overflow-hidden">
              {videos.map((item) => {
                return <Card data={item} key={item.videoId} />;
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

export default HomePage;
