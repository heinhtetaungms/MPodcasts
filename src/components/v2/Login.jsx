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

import googleLogo from '../../assets/img/google-logo.png'
import facebookLogo from '../../assets/img/fb-logo.png'
import githubLogo from '../../assets/img/github-logo.png'
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

            <div>
                <a
                    href='#'
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm text-white font-medium rounded-md bg-[#80B3FF] hover:bg-[#687EFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                    onClick={() => oauth2Login('google')}
                >
                    <img src={googleLogo} alt="googleLogo" style={{width: '24px', marginRight: '10px'}}/>
                    Log in with Google
                </a>
            </div>

            <div>
                <a
                    href='#'
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm text-white font-medium rounded-md bg-[#80B3FF] hover:bg-[#687EFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                    onClick={() => oauth2Login('facebook')}
                >
                    <img src={facebookLogo} alt="facebookLogo" style={{width: '24px', marginRight: '10px'}}/>
                    Log in with Facebook
                </a>
            </div>

            <div>
                <a
                    href='#'
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm text-white font-medium rounded-md bg-[#80B3FF] hover:bg-[#687EFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                    onClick={() => oauth2Login('github')}
                >
                    <img src={githubLogo} alt="githubLogo" style={{width: '24px', marginRight: '10px'}}/>
                    Log in with Github
                </a>
            </div>

        </form>
    );
};

export default Login;
