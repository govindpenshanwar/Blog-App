import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import PasswordSharpIcon from "@mui/icons-material/PasswordSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";
import baseUrl from "../../utils/baseUrl";
import { UserContext } from "../Context/UserContext";

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password !== "") {
      try {
        const API = await axios.post(
          `${baseUrl}/loginData`,
          { username, password },
          { withCredentials: true }
        );
        const res = API.data;
        // console.log(res);
        setIsAuthenticated(true);
        login(username);
        toast.success("Logged in Successfully !!");
        navigate("/home");
      } catch (error) {
        console.error("Error at login page => ", error);
      }
    } else {
      toast.error("Please Enter Login Credentials");
    }
  };
  const handleSignUp = () => {
    navigate("/signUp");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} style={{ borderRightColor: "#FAF5FF" }}>
      <div className="flex items-center justify-center mt-24 mb-10 ">
        <div
          // className='flex flex-col gap-6 ml-48 w-96 mt-10'
          className="flex flex-col gap-6 items-center  mt-10"
        >
          <span className="">
            <Avatar sx={{ bgcolor: deepPurple[600] }}>
              <LockOutlinedIcon />
            </Avatar>
          </span>
          <span className="text-center text-xl font-mono font-bold">
            Welcome back 👋👋
          </span>

          <TextField
            variant="outlined"
            label="Username*"
            color="primary"
            value={username}
            className="sm:w-96 w-80"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSharpIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            label="Password*"
            type="password"
            color="primary"
            value={password}
            className="sm:w-96 w-80"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordSharpIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            //  onClick={handleLogin}
            className="sm:w-60 w-48"
            endIcon={<LoginSharpIcon />}
          >
            Continue
          </Button>

          <p className="text-center -m-4">OR</p>
          <Button
            variant="text"
            color="primary"
            size="medium"
            onClick={handleSignUp}
          >
            Create an account
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Login;
