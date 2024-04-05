import React from 'react'
import logo from '../Assets/logo.jpg';
import Button from '@mui/material/Button'
import {motion}from 'framer-motion';
import {useNavigate} from 'react-router-dom'

function BodyText() {

  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/login")
   
  }
   
  return (
    <main>
    <div className='BodyText'>
        <div className='py-4 flex'>
        <img src={logo}
         alt="logo" 
         width='35'
         className='ml-5'
         />    
         <span className='ml-2 mt-1 text-xl text-white font-semibold'>Blogger</span>
        </div>
        <button
         className='float-right -mt-8 mr-8 text-white font-bold font-sans text-sm hover:text-gray-400 '
         onClick={handleClick}
         >SIGN IN</button>
        

    </div>
   
    <div className='BodyText'>
        <div className='mt-48'>
      <h1 className='text-5xl text-center text-white font-thin'>Publish your passions, your way</h1>
      <h2 className='text-lg  text-center mt-7 text-white font-semibold'>Create a Unique and Beautiful blog easily. </h2> 
        
        <div className='text-center mt-12'>
      <Button 
      variant='contained'
      color='warning'
      size='large'
      onClick={handleClick}
      >Create a Blog</Button>
      </div>
      <motion.img 
      
      // initial = {{x:'100vw', opacity:0}}
      // animate = {{x : 0, opacity:1}}
      // transition={{duration:1, repeatDelay : 2,repeat:Infinity}}
      
      className='ml-72 mt-9'
      src="https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEhwB_tKV4qGuHpuGsTd0oMTxRTyuybrSENqr9vJwDu5WUQjyZMLPlF5KIvtpTUlcXXt2SxApn63nnfFYVOcjsljhUdesfFZMRStztab9eNx9G0oUUJl6fWCQFLk58v5MGMSeYREZ03VkdTEthhTJ8p32nR3/w1200" alt="chocolate img" width={850} />
      </div>
    </div>
    </main>
  )
}

export default BodyText
