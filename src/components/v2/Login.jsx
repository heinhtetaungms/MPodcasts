import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import authStore from '../../zustand/authStore';
import Input from '../v2/Input';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import {loginFields} from '../constants/FormFields';
import {LoginRequest} from "../../api/loginRequest";
import {FaEye, FaEyeSlash} from "react-icons/fa";

import {OAuth2Request} from "../../api/oauth2Request";


const Login = () => {
    const store = authStore.getState();


    const fields = loginFields;
    const navigate = useNavigate();
    let initialLoginState = {};

    fields.forEach((field) => (initialLoginState[field.id] = ''));

    const [loginState, setLoginState] = useState(initialLoginState);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => setLoginState({...loginState, [e.target.id]: e.target.value});

    const handleLoginSuccess = (response) => {
        const authorizationHeader = response.headers['jwt-token'];
        store.setToken(authorizationHeader);
        const userData = response.data.data;
        store.setId(userData.id);
        store.setEmail(userData.email);
        store.setFirstName(userData.firstName);
        store.setLastName(userData.lastName);
        store.setProfileImageUrl(userData.profileImageUrl);
        store.setJoinDate(userData.joinDate);
        store.setRole(userData.role);
    };

    const formLogin = async () => {
        const {email, password} = loginState;

        await LoginRequest({email, password})
            .then((response) => {
                if (response.data.httpResponse === 200) {
                    handleLoginSuccess(response);
                    toast.success('Login success');
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch((error) => toast.error(error.response?.data.message));
    };


    // Function to make oauth2Login
    const oauth2Login = async (oauthType) => {
        OAuth2Request({oauthType})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formLogin();
    };


    const showHidePasswordHandler = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {loginFields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={
                            field.id === 'password' && passwordVisible
                                ? 'text'
                                : field.type
                        }
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                        icon={field.id === 'password' ? passwordVisible ? FaEye : FaEyeSlash : null}
                        iconOnClick={field.id === 'password' ? showHidePasswordHandler : null}
                    />
                ))}
            </div>
            <FormExtra/>
            <FormAction name="button" type="submit" text="Login"/>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400"/>
                    <p className="text-center text-sm">OR</p>
                    <hr className="border-gray-400"/>
            </div>

            <div className="flex space-x-4">
            <div>
                <a
                    href='#'
                    className="group relative w-full flex items-center justify-center py-2 px-8 border border-transparent text-sm text-white font-medium rounded-md bg-[#93BFCF] hover:bg-[#6096B4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                    onClick={() => oauth2Login('google')}
                >
                    <svg className="flex-shrink-0 ml-[10%] mr-[5%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    <span className="flex-grow">Google</span>
                </a>

            </div>

            <div>
                <a
                    href='#'
                    className="group relative w-full flex items-center justify-center py-2 px-8 border border-transparent text-sm text-white font-medium rounded-md bg-[#93BFCF] hover:bg-[#6096B4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                    onClick={() => oauth2Login('facebook')}
                >
                    <svg className="flex-shrink-0 ml-[10%] mr-[5%]" xmlns="http://www.w3.org/2000/svg" aria-label="Facebook" role="img" viewBox="0 0 512 512" width="25px" height="25px" fill="#000000">
                        <g id="SVGRepo_iconCarrier">
                            <rect width="512" height="512" rx="15%" fill="#1877f2"></rect>
                            <path
                                d="M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z"
                                fill="#ffffff"
                            ></path>
                        </g>
                    </svg>
                    <span className="flex-grow">Facebook</span>
                </a>


            </div>

            <div>
                <a
                    href='#'
                    className="group relative w-full flex items-center justify-center py-2 px-7 border border-transparent text-sm text-white font-medium rounded-md bg-[#93BFCF] hover:bg-[#6096B4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                    onClick={() => oauth2Login('github')}
                >
                    <svg className="flex-shrink-0 ml-[10%] mr-[5%]" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_iconCarrier">
                            <title>github</title>
                            <rect width="24" height="24" fill="none"></rect>
                            <path
                                d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.10,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27,.16.59,.67.5A10,10,0,0,0,12,2Z"
                            ></path>
                        </g>
                    </svg>
                    <span className="flex-grow">GitHub</span>
                </a>
            </div>
            </div>

        </form>
    );
};

export default Login;
