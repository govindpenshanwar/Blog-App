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
import toast from 'react-hot-toast'

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (username === "" && email === "" && password === "") {
      toast.error("Please Enter Credentials")
    } else {
      try {
        const API = await axios.post(`${baseUrl}/signUpData`, { username, email, password });
        const res = API.data;
        console.log(res);
      } catch (error) {
        console.error("Error is:", error);
      }
      toast.success("Registration Successfull !!")
      navigate("/login")
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignUp();

  }

  return (
    <form onSubmit={handleSubmit} style={{ borderRightColor: '#FAF5FF' }}>
      <div
        className="flex items-center justify-center mt-24 mb-10 "
      // className='  mt-44 ml-80 '
      >
        <div
          className="flex flex-col gap-6 items-center  mt-10"
        // className='flex flex-col gap-6 ml-48 w-96 mt-10'

        >

          <span className='' > <Avatar sx={{ bgcolor: deepPurple[600] }}><LockOutlinedIcon /></Avatar> </span>
          <span className='text-center text-lg sm:text-xl font-mono font-bold'>Let's Dive in the world of Blogs😉</span>

          <TextField
            variant='outlined'
            label='Username'
            color='primary'
            value={username}
            className="sm:w-96 w-80"
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
            className="sm:w-96 w-80"
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
            label='Password'
            color='primary'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sm:w-96 w-80"
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
            className="sm:w-60 w-48"
          // onClick={handleSignUp}
          >Sign In</Button>
          <div className='flex flex-col text-center gap-4 '>
            <p>Already have an account ?</p>
            <Button
              variant='text'
              color='primary'
              type='submit'
              onClick={() => {
                navigate('/login')
              }}
            >Login</Button>

          </div>
        </div>
      </div>
      <Copyright />
    </form>
  )
}

export default SignUp;