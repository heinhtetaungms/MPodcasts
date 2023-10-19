import React, {useEffect, useState} from 'react'
import Title from '../components/Title'
import Input from '../components/Input'
import {FaEye, FaEyeSlash} from "react-icons/fa"
import {FaEnvelopeCircleCheck} from "react-icons/fa6"
import {Button} from '../components/Button'
import {LoginRequest, ForgetPasswordRequest} from '../api/loginRequest'
import authStore from '../zustand/authStore'
import {Link, useNavigate} from "react-router-dom"
import {toast} from 'react-toastify';
// import jwt_decode from 'jwt-decode'
// import {GOOGLE_AUTH_URL} from "../api/googleRequest"

const Login = () => {
    const store = authStore.getState();
    const [authToken] = authStore((state) => [state.token]);
    const [authEmail] = authStore((state) => [state.email]);
    const [inputType, setInputType] = useState("password");
    const [icon, setIcon] = useState(true);
    const navigate = useNavigate();

    const IconComponent = (icon ? FaEyeSlash : FaEye);

    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    })

    // const handleCallbackResponse = (response)=>{
    //   console.log("Encoded JWT token >>>> ",response.credential);
    //   var googleUserObj = jwt_decode(response.credential);
    //   console.log("Google user obj " , googleUserObj);

    //   store.setToken(response.credential);
    //   store.setEmail(googleUserObj.email);
    //   store.setUserName(googleUserObj.name);
    //   store.setProfileImageUrl(googleUserObj.picture);

    //   toast.success("Login success");
    //   setTimeout(function() {
    //     navigate('/')
    //   }, 2000);
    // }


    // useEffect(()=>{
    //   // google
    //   google.accounts.id.initialize({
    //     client_id: "594088735800-fkp8jebo00qq7hti1bh7eb74b6lob1nq.apps.googleusercontent.com",
    //     callback: handleCallbackResponse
    //   })
    //   google.accounts.id.renderButton(
    //     document.getElementById("signInDiv"),
    //     {theme: "outline", size: "large"}
    //   );
    // },[])
    const forgetPasswordHandler = () => {
        navigate('/forgetpassword');
    }

    const showHidePasswordHandler = () => {
        if (inputType === "password") {
            setInputType("text");
            setIcon(true);
            console.log("Icon ", icon);
        } else {
            setInputType("password");
            setIcon(false);
            console.log("Icon ", icon);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputData.email !== "" && inputData.password !== "" && inputData.password.length >= 9) {
            LoginRequest({email: inputData.email, password: inputData.password})
                .then((response) => {
                    const authorizationHeader = response.headers['jwt-token'];
                    store.setToken(authorizationHeader);

                    if (response.data.httpResponse === 200) {
                        store.setId(response.data.data.id);
                        store.setEmail(response.data.data.email);
                        store.setFirstName(response.data.data.firstName);
                        store.setLastName(response.data.data.lastName);
                        store.setProfileImageUrl(response.data.data.profileImageUrl);
                        store.setJoinDate(response.data.data.joinDate);
                        store.setRole(response.data.data.role);
                    }
                })
                .then(() => {
                    toast.success("Login success");
                    setTimeout(function () {
                        navigate('/')
                    }, 2000);
                })
                .then(() => {
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response.data.httpResponse === 502) {
                        console.log(error.response.data.message);
                        toast.error(error.response.data.message);
                    }
                })
        }
    }

    useEffect(() => {
        if (authToken != null) {
            navigate("/");
        }
    }, [authToken]);

    return (
        <div className='border border-[#00B3FE] shadow-form max-w-[460px]'>
            <div className='bg-secondary p-12 min-w-[450px]'>
                <h2 className='mb-5 text-2xl bold text-white'>Welcome to our site</h2>
                <p className='mb-9 text-xs text-white'>We're here to make your day a bit brighter and more informed.
                    Join us as we explore fascinating topics,
                    share inspiring stories.</p>
                <p className='text-xl text-white'>Login</p>
            </div>
            <div className='bg-white min-w-[450px] px-12 py-10'>
                <Title label="User Login"/>
                <form onSubmit={handleSubmit}>
                    <Input placeholder="User@gmail.com" type="email" icon={FaEnvelopeCircleCheck}
                           error={inputData.email === "" ? "Required email" : ""} onChange={(e) => setInputData({
                        ...inputData,
                        email: e.target.value,
                    })}/>
                    <Input placeholder="Password" type={inputType} icon={IconComponent}
                           iconOnClick={showHidePasswordHandler}
                           error={(inputData.password === "" ? "Required password" : "") || (inputData.password.length < 9 ? "password must be greater than 8 characters" : "")}
                           onChange={(e) => setInputData({
                               ...inputData,
                               password: e.target.value,
                           })}/>
                    <div className='flex'>
                        <p className='text-xs text-black mb-2 underline cursor-pointer ml-[10%] mr-[2%]'
                           onClick={forgetPasswordHandler}>Forget Password?</p>
                        <Link to="/register" className="ml-1 text-xs text-secondary underline">
                            Register
                        </Link>
                    </div>
                    <div className='md:max-w-[150px] sm:w-full mx-auto mt-6'>
                        <Button lable="Login" type="submit"/>
                    </div>
                </form>
                {/* <div id="signInDiv">
            <a href={GOOGLE_AUTH_URL} className='text-white'>Login with google</a>
          </div> */}
            </div>
        </div>
    )
}

export default Login