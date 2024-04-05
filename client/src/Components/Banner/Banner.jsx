import React from 'react'
import Blog from '../Assets/blog3.jpg'

function Banner() {
  return (
    <div className='mt-5 '>
      <img 
      className='blogImg '
      src={Blog} alt="Blog logo"
      style={{height:'55vh' , width : '100%'}}
      />
    
    </div>
  )
}

export default Banner