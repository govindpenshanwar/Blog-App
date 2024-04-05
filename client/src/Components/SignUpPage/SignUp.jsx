import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../Footer/Copyright';
import baseUrl from '../../utils/baseUrl'


function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (username === "" && email === "" && password === "") {
      alert("Please Enter Credentials!!")
    } else {
      try {
        const API = await axios.post(`${baseUrl}/signUpData`, { username, email, password });
        const res = API.data;
        console.log(res);
      } catch (error) {
        console.error("Error is:", error);
      }
      navigate("/home")
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignUp();

  }

  return (
    <form onSubmit={handleSubmit} style={{ borderRightColor: '#FAF5FF' }}>
      <div className='  mt-44 ml-80 '>
        <div className='flex flex-col gap-6 ml-48 w-96 mt-10'>

          <span className='ml-44' > <Avatar sx={{ bgcolor: deepPurple[600] }}><LockOutlinedIcon /></Avatar> </span>
          <span className='text-center text-xl font-mono font-bold'>Let's Dive in the world of Blogs😉</span>

          <TextField
            variant='outlined'
            label='Username'
            color='primary'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name='username'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSharpIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant='outlined'
            label='Email'
            color='primary'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='password'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordSharpIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            variant='outlined'
            label='ConfirmPassword'
            color='primary'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='confirmPassword'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordSharpIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant='contained'
            color='primary'
            type='submit'
            endIcon={<LoginSharpIcon />}
          // onClick={handleSignUp}
          >Sign In</Button>

        </div>
      </div>
      <Copyright />
    </form>
  )
}

export default SignUp;