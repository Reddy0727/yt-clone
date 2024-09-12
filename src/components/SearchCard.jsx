import React from 'react';
import { Link } from 'react-router-dom';

// Utility function to format ISO 8601 durations
const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? match[1].slice(0, -1) : '';
  const minutes = match[2] ? match[2].slice(0, -1) : '0';
  const seconds = match[3] ? match[3].slice(0, -1) : '00';
  return `${hours ? hours + ':' : ''}${minutes}:${seconds}`;
};

// Utility function to format view count
const formatViewCount = (views) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(views);
};

const SearchCard = ({ data }) => {
  const videoTitle = data?.snippet?.title || 'Video Title';
  const channelTitle = data?.snippet?.channelTitle || 'Channel Name';
  const thumbnail = data?.snippet?.thumbnails?.high?.url || '';
  const viewCount = formatViewCount(data?.statistics?.viewCount || 0);
  const duration = data?.contentDetails?.duration
    ? formatDuration(data.contentDetails.duration)
    : 'N/A';

  // Since channelInfo is missing from some of the responses,
  // this will safely fall back to an empty string if not found.
  const channelThumbnail = data?.channelInfo?.thumbnails?.default?.url || '';

  return (
    <div className="flex gap-3 ">
      <div className="relative">
        {/* Duration Overlay */}
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10 rounded-lg">
          {duration}
        </span>
        {/* Thumbnail and Link to Video */}
        <Link to={`/watch/${data.id?.videoId || data.id}`}>
          <img
            src={thumbnail}
            className="h-44 w-72 object-cover rounded-md"
            alt={videoTitle}
          />
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <a href="#">
            <img
              src={channelThumbnail}
              alt={channelTitle}
              className="h-9 w-9 rounded-full"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="line-clamp-2">
              {videoTitle}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <a href="#" className="hover:text-white">
                {channelTitle}
              </a>
            </div>
            <div>
              <span className="after:content-[''] after:mx-1">
                {viewCount} views
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
