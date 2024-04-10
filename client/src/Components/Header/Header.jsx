import React, { useContext, useState } from "react";
import { AppBar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from "../../utils/baseUrl";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import user from '../Assets/user.png'
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { UserContext } from "../Context/UserContext";
import logo from '../Assets/bgLogo.png'
// import getAuthToken from '../../utils/authToken';

function Header() {
  // const username = getAuthToken();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${baseUrl}/logout`, { withCredentials: true });
      toast.success("Logged Out Successfully !!");
      navigate("/login");
    } catch (error) {
      console.error("Err at handleLogout func => ", error.message);
    }
  };

  const { username } = useContext(UserContext);
  return (
    <div>
      <AppBar color="inherit" style={{ height: "60px" }}>

        <div className=" flex flex-row md:gap-8 sm:gap-6 md:items-center md:justify-center sm:items-center sm:justify-center font-semibold md:text-xl mt-3 items-center justify-center gap-5 ">
          <Link className=" hover:text-rose-500 ease-out 1s" to="/home">
            Home
          </Link>
          <Link
            className=" hover:text-rose-500 ease-out 1s"
            to={`/MyBlogs/${username}`}
          >
            My Blogs
          </Link>
          <Link className=" hover:text-rose-500 ease-out 1s" to="/Contact">
            Contact
          </Link>
          <div>
            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {/* <PersonIcon /> */}
                  <img src={user} alt="user img" />

                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <span className="text-base font-semibold">
                  Hello, {username} 👋
                </span>
              </MenuItem>
              <Divider component="li" />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
