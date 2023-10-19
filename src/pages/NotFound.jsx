import React from 'react'

const NotFound = () => {
  return (
    <div className='text-center'>
        <h1 className='text-7xl text-white bold mb-5'>Oops<span className='text-10xl'>!</span></h1>
        <p className='text-xl text-white mb-5'>404 - PAGE NOT FOUND</p>
        <p className='text-md text-white'>The page you are looking for might have been removed<br/>or is temporarily unavailable.</p>
    </div>
  )
}

export default NotFound