import React, { useEffect, useState } from 'react'
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import authStore from '../zustand/authStore';

const ThemeSwitcher = () => {
    const store = authStore.getState();
    const [authTheme] = authStore((state) => [state.theme]);

    useEffect(()=>{
        if(authTheme === "dark"){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    },[authTheme]);

    const switcherHandler = ()=>{
        store.setTheme(authTheme === "dark" ? "light" : "dark");
    }

  return (
    <>
        <button onClick={switcherHandler} className={`flex justify-center items-center w-[25px] h-[25px] rounded-full bg-gray relative`}>
            {authTheme === "dark" ?
            <>
             <BsFillSunFill className='text-black text-sm transition duration-300 ease-in-out rotate-0 absolute'/>
             <BsMoonFill className='text-black text-sm transition duration-300 ease-in-out rotate-[-90deg] opacity-0'/>
            </> 
             : 
            <>
             <BsFillSunFill className='text-white text-sm transition duration-300 ease-in-out rotate-[-90deg] opacity-0'/>
             <BsMoonFill className='text-black text-sm transition duration-300 ease-in-out rotate-0 absolute'/>
            </>
            }
        </button>
    </>
  )
}

export default ThemeSwitcher