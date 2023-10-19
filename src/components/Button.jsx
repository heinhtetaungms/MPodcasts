import React from 'react'

export const Button = ({ lable, icon, type }) => {
    return (
      <button className="w-full p-2 rounded-full bg-white text-white hover:bg-secondary hover:text-primary hover:to-secondary 
      transition duration-300 bg-gradient-to-b from-primary to-secondary" type={type}>
        {lable || icon}
      </button>
    );
  };

  export const ActionButton = ({ lable, icon, type, onClick }) => {
    return (
      <button className="w-full p-2 rounded-full bg-white text-white hover:bg-secondary hover:text-primary hover:to-secondary 
      transition duration-300 bg-gradient-to-b from-primary to-secondary" type={type} onClick={onClick}>
        {lable || icon}
      </button>
    );
  };