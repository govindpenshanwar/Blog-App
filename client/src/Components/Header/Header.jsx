import React from 'react'

import { AppBar, } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import baseUrl from '../../utils/baseUrl';
import getAuthToken from '../../utils/authToken';
import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { Menu } from '@mui/material'

function Header() {
  const username = getAuthToken();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(`${baseUrl}/logout`, { withCredentials: true });
      toast.success("Logged Out Successfully !!");
      navigate('/login')


    } catch (error) {
      console.error("Err at handleLogout func => ", error.message);
    }
  }
  return (
    <div>
      <AppBar color='inherit' style={{ height: "60px" }} >
        <div className=' flex flex-row gap-8 sm:items-center sm:justify-center font-semibold text-xl mt-3 '>
          <Link className=' hover:text-rose-500 ease-out 1s' to="/home">Home</Link>
          <Link className=' hover:text-rose-500 ease-out 1s' to={`/MyBlogs/${username}`}>My Blogs</Link>
          <Link className=' hover:text-rose-500 ease-out 1s' to="/Contact">Contact</Link>
          <button
            onClick={handleLogout}
            className=' hover:text-rose-500 ease-out 1s' to="/login">
            Logout
          </button>
          <Menu>x``
            <PersonIcon />
          </Menu>
        </div>

      </AppBar >
    </div >
  )
}

export default Header