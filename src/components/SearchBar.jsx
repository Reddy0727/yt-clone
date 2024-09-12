import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex-1'>
      <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-full">
        <div className="flex gap-4 items-center pr-5 w-full">
          <div>
            <SearchIcon className="text-xl" />
          </div>
          <input
            type="text"
            className="flex-1 bg-zinc-900 focus:outline-none border-none"
            value={searchTerm}
            onChange={handleChange}
          />
          <MicIcon
            className={`text-xl cursor-pointer`}
          />
        </div>
        <button type="submit" className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-full">
          <SearchIcon className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
