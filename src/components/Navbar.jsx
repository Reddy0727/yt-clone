import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import icon from '../assets/icon.png';
import VideocamIcon from '@mui/icons-material/Videocam';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <header className='flex justify-between items-center py-4  px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50'>
     <div className='flex justify-between items-center gap-2'>
       <MenuIcon />
      <img src={icon} alt="icon" width={50} />
     </div>
     <div className='flex items-center justify-center gap-5 w-1/3'>
      <SearchBar />
     </div>
     <div className='flex gap-4 items-center cursor-pointer'>
       <VideocamIcon />
       <AppsIcon />
       <NotificationsNoneIcon />
       <AccountCircleIcon />
     </div>
    </header>
  )
}

export default Navbar
