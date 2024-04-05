import React from 'react'
import Copyright from './Copyright'

function Footer() {
  return (
    <>
    <div className='footer p-16 flex space-x-44'>
        <div className=' ml-16 '>
            <h1 className='  text-white text-xl font-bold'>Help</h1>
            <ul className='list-none text-gray-400  mt-8 text-lg space-y-3 cursor-pointer'>
                <li className='hover:text-gray-200'>Help Center</li>
                <li className='hover:text-gray-200'> Help Forum</li>
                <li className='hover:text-gray-200'>Video Tutorials</li>
            </ul>
        </div>

        <div>
            <h1 className='text-white text-xl font-bold'>Community</h1>
            <p className='cursor-pointer text-gray-400 mt-8 text-lg hover:text-gray-200'>Blogger Buzz</p>
        </div>

        <div >
            <h1  className='  text-white text-xl font-bold '>Developers</h1>
            <ul className='list-none cursor-pointer text-gray-400 mt-8 text-lg space-y-3'>
            <li className='hover:text-gray-200'>Blogger API</li>
            <li className='hover:text-gray-200  '>Developer Forum</li>
            </ul>
        </div>
     <span className='mt-28 float-right'>  <Copyright/></span>  
    </div>
    
    </>
  )
}

export default Footer