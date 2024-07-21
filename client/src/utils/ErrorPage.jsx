import React from 'react'
import error from '../Components/Assets/error.svg'
function ErrorPage() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={error} alt="errr" className='md:w-3/6 w-3/6' />
        </div>
    )
}

export default ErrorPage
