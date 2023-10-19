import React from 'react'
import music from '../assets/img/banner.png'


const Banner = () => {
return (
    <div className="h-[500px] object-center obiect-cover overflow-hidden py-[20px]">
        <img src={music} alt="My Image" className='rounded-2xl w-full h-full'/>
    </div>
)
}

export default Banner