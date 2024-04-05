import React from 'react'

function Copyright() {
    const day = new Date();
    const currentYear = day.getFullYear();
  return (
    <div>
        <p className='text-center mt-16 font-medium text-gray-500'>Copyright © Blogger {currentYear}.</p>
    </div>
  )
}

export default Copyright