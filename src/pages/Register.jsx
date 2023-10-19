import React from "react";
import {  useState } from "react";
import Title from "../components/Title";
import Input from "../components/Input";
import { FaUserAlt} from "react-icons/fa";
import {FaEnvelopeCircleCheck} from "react-icons/fa6"
import { Button } from "../components/Button";
import {RegisterUser} from "../api/registerRequest"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    RegisterUser({
      firstName :inputData.firstname,
      lastName : inputData.lastname,
      email  : inputData.email,
      
    }).then((response) => {
        if(response.data.httpResponse === 200){
          toast.success("Registration Success. We've sent password to your email.");
          setTimeout(function() {
            navigate('/login')
          }, 1000);
        }
      })
      .catch((error)=>{
        if(error.response.data.httpResponse === 400){
          console.log(error.response.data.message);
          toast.danger(error.response.data.message);
        }
      })
  };
  console.log(inputData);
  return (
    <div className='border border-[#00B3FE] shadow-form max-w-[460px]'>
      <div className='bg-secondary p-12 min-w-[450px]'>
        <h2 className='mb-5 text-2xl bold text-white'>Welcome to our site</h2>
        <p className='mb-9 text-xs text-white'>We're here to make your day a bit brighter and more informed. Join us as we explore fascinating topics, 
        share inspiring stories.</p>
        <p className='text-xl text-white'>Create Account</p>
      </div>
      <div className="bg-white min-w-[450px] px-12 py-10">
        <Title label="Register" />
        <form className="" action="register" onSubmit={handleSubmit}>
          <Input
            placeholder="FirstName"
            type="text"
            icon={FaUserAlt}
            value={inputData.firstname}
            onChange={(e) => {
              setInputData({
                ...inputData,
                firstname: e.target.value,
              });
            }}
            error={
                inputData.firstname ==="" ? "First name is required": ""
            }
          />
          <Input
            placeholder="LastName"
            type="text"
            icon={FaUserAlt}
            value={inputData.lastname}
            onChange={(e) => {
              setInputData({
                ...inputData,
                lastname: e.target.value,
              });
            }}
            error={
                inputData.lastname ==="" ? "Last name is required": ""
              }
          />
          <Input
            placeholder="Enter Email"
            type="email"
            icon={FaEnvelopeCircleCheck}
            value={inputData.email}
            onChange={(e) => {
              setInputData({
                ...inputData,
                email: e.target.value,
              });
            }}
            error={
                inputData.email ==="" ? "Email is required": ""
              }
          />
          <div className="flex mb-4 mx-[10%]">
            <p className="text-black text-xs text-center">Already have an account?</p>
            <Link to="/login" className="ml-1 text-xs text-secondary underline">
              Login
            </Link>
          </div>
          <div className="md:max-w-[150px] sm:w-full mx-auto mt-6">
            <Button lable="Register" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
