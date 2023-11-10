import {useLocation, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import authStore from "../zustand/authStore";
import {toast} from "react-toastify";
import {GetCurrentUser} from "../api/loginRequest";

const GetToken = () => {
    const store = authStore.getState();
    const navigate = useNavigate();

    const search = useLocation().search;
    const authToken = new URLSearchParams(search).get('accessToken');

    const handleLoginSuccess = (response) => {
        console.log("inside handleLoginSuccess..", response)
        const authorizationHeader = authToken;
        store.setToken(authorizationHeader);
        const userData = response.data;
        store.setId(userData.id);
        store.setEmail(userData.email);
        store.setFirstName(userData.firstName);
        store.setLastName(userData.lastName);
        store.setProfileImageUrl(userData.profileImageUrl);
        store.setJoinDate(userData.joinDate);
        store.setRole(userData.role);
    };
    useEffect(() => {
        console.log("authToken : ", authToken)

        GetCurrentUser({authToken}).then((response) => {
            console.log(response)
                if (response.httpResponse === 200) {
                    handleLoginSuccess(response);
                    toast.success('Login success');
                    navigate('/');
                    window.location.reload();
                }
        }).catch((error) => toast.error(error.response?.data.message));

    }, [authToken, navigate]);

    return null;
};

export default GetToken;
