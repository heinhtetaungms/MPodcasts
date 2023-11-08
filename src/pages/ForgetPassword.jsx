import React,{useState} from 'react'
import {ForgetPasswordRequest } from '../api/loginRequest'
import Title from '../components/Title'
import Input from '../components/Input'
import { ActionButton } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import {FaEnvelopeCircleCheck} from "react-icons/fa6"
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email: "",
      })

    const handleSubmit = (e)=>{
        e.preventDefault();
        ForgetPasswordRequest({email:inputData.email})
        .then((response)=>{
            console.log("Response in forgetpassword");
        if(response.data.httpResponse === 200){
            console.log("Success");
            toast.success("A new password was sent to your email");
            setTimeout(function() {
                navigate('/login')
            }, 2000);
        }
        })
    }
  return (
    <div className='border border-[#00B3FE] shadow-form max-w-[460px]'>
        <div className='bg-secondary p-12 min-w-[450px]'>
            <h2 className='mb-5 text-2xl bold text-white'>Welcome to our site</h2>
            <p className='mb-9 text-xs text-white'>We're here to make your day a bit brighter and more informed. Join us as we explore fascinating topics, 
            share inspiring stories.</p>
            <p className='text-xl text-white'>Forgot password?</p>
        </div>
        <div className='bg-white min-w-[450px] px-12 py-10'>
            <Title label="Forget Your Password"/> 
            <p className='mb-5 sm:w-[260px] xs:w-[200px] text-sm text-center leading-tight text-[#62898e] mx-[10%]'>Please enter the email address you'd like your password reset information sent to</p>
            <form onSubmit={handleSubmit}>
                <Input placeholder="User@gmail.com" type="email" icon={FaEnvelopeCircleCheck} 
                error={inputData.email === "" ? "Required email" : ""} onChange={(e)=>setInputData({
                ...inputData,
                email: e.target.value,
                })}/>
                <div className='text-left mx-[8%]'>
                    <Link to="/login" className="px-2 text-xs underline">
                        Back To Login?
                    </Link>
                </div>
                <div className='md:max-w-[150px] sm:w-full mx-auto mt-6'>
                    <ActionButton lable="Submit" onClick={handleSubmit}/> 
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgetPassword