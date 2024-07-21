import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
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
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AuthButton from "../../utils/AuthButton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/loginData`,
        { username, password }, { withCredentials: true }
      );
      const res = response.data;
      console.log("response => ", res);
      if (res.statusCode === 200) {
        login(username);
        toast.success(res.message);
        res.payload.role === "admin" ? navigate("/admin-panel") : navigate("/home");
        localStorage.setItem("crsftoken", res.payload.token);
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Error at login page => ", error);

      if (error.response && error.response.data) {
        console.log("Error response data:", error.response.data);
        toast.error(error.response.data.message || "An error occurred during login. Please try again.");
      } else {
        toast.error("An error occurred during login. Please try again.");
      }

    }
  };
  const handleSignUp = () => {
    navigate("/signUp");
  };



  return (
    <form onSubmit={handleLogin} style={{ borderRightColor: "#FAF5FF" }}>
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
            label="Username"
            color="primary"
            required
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
            label="Password"
            required
            type={showPassword ? "text" : "password"}
            color="primary"
            value={password}
            className="sm:w-96 w-80 "
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
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
          <AuthButton />
        </div>
      </div>
    </form>
  );
}

export default Login;
