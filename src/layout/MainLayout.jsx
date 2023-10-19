import React from 'react'
import { useState } from 'react';
import Nav from '../components/Nav'
import { useNavigate, Link } from 'react-router-dom';
import authStore from '../zustand/authStore';
import Sidebar from '../components/SideBar/SideBar';
import { LogoutRequest } from '../api/logoutRequest';

const MainLayout = ({children}) => {
    const store = authStore.getState();
    const [authFirstname] = authStore((state)=>[state.firstName]);
    const [authLastname] = authStore((state)=>[state.lastName]);
    const [authEmail] = authStore((state)=>[state.email]);
    const [authProfileImage] = authStore((state)=>[state.profileImageUrl]);
    const [authProfileToggle] = authStore((state)=>[state.profileToggle]);
    const userName = authFirstname+' '+authLastname;
    const navigate = useNavigate();
    const [openToggle] = authStore((state) => [state.sidebarToggle]);

    const logoutHandler = ()=>{
        store.setToggleProfile(false);
        LogoutRequest()
      .then((response)=>{     
          store.logout();
          console.log("Logout success");
          navigate("/login");
      })
      .catch((error)=>{    
        if(error.response.data.httpResponse === 502){
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
      })
    }

    const profileOverlayHandler = ()=>{
        navigate("/userdetail");
        store.setToggleProfile(false);
    }
    
  return (
    <div className='wrapper relative'>
        <div className='w-full fixed top-0 z-10'>
          <Nav/>
        </div>
        {authProfileToggle && (
            <div style={{ transitionDelay: "30ms" }} className={`profile-overlay w-[300px] fixed right-2 top-[82px] bg-white 
                dark:bg-dark shadow-lg shadow-gray-500 transition-opacity duration-300 
                shadow-md rounded-md text-center z-40`}>
                <div className='flex p-5  border-b border-gray-500 items-center justify-center flex-col'>
                    <p className="order-2 text-base w-full break-words text-sm flex-1 dark:text-gray">{authEmail}</p>
                    <div className='w-16 h-16 rounded-full bg-secondary overflow-hidden flex justify-center items-center mr-3'>
                        <img src={authProfileImage} alt={authFirstname}/>
                    </div>
                    <div className='flex flex-wrap flex-col items-start pt-5 w-200  whitespace-normal '>
                        <p className="w-full order-1 text-base leading-tight break-words dark:text-gray">{userName}</p>
                    </div>
                </div>
                <div className='flex  flex-col items-start p-5 border-b border-gray-500'>
                    <span className="cursor-pointer inline-flex items-start justify-start dark:text-gray hover:text-secondary transition duration-3000" onClick={profileOverlayHandler}>Profile</span>
                </div>
                <div className='p-5 flex items-start'>
                   <span className="cursor-pointer inline-flex items-start justify-start dark:text-gray hover:text-secondary transition duration-3000" onClick={logoutHandler}>Logout</span>
                </div>
            </div>
        )}
        <Sidebar/>
        <div style={{ transitionDelay: "30ms" }}
          className={` duration-200 ${
            openToggle ? "w-82% ml-[18%]" : "w-94% ml-[5%]"
          } mx-[20px] pt-[82px] dark:bg-dark h-full`}>
            {children}
        </div>
    </div>
  )
}

export default MainLayout