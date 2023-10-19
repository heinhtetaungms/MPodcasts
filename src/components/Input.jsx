import React from 'react'
import {FaUserAlt, FaEye, FaEyeSlash} from "react-icons/fa";

export const Input = ({ placeholder, type, icon: IconComponent, iconOnClick, error, ...props }) => {

    return (
      <div className="mb-6 flex flex-col mx-[8%]">
        <div className="relative myinput">
          <input
            type={type}
            className="bg-transparent focus:outline-none h-[35px] p-1 pb-0 pr-[23px] text-sm text-black w-full border-b border-black transition duration-200 tracking-wider"
            placeholder={placeholder}
            {...props}
          />
          {IconComponent && <IconComponent className='icon text-black text-sm absolute right-1 top-[50%] translate-y-[-50%] transition duration-200' onClick={iconOnClick}/>}
        </div>
        <label htmlFor="error" className="text-red text-xs tracking-wider px-1 pt-1">{error}</label>
      </div>
    );
  };

export default Input