import axios from 'axios'


export const LoginRequest = async ({email, password}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loginUrl = `${apiUrl}/user/login`;

    const res = await axios
        .post(loginUrl, {email, password})
        .then((response) => {
            console.log("Response headers ", response);
            return response;
        })
    return res;
}

export const ForgetPasswordRequest = async ({email}) => {
    const forgetPasswordUserUrl = `https://g4backend.onrender.com/api/user/resetPassword/${email}`;
    const res = await axios
        .get(forgetPasswordUserUrl)
        .then((response) => {
            console.log("Response headers ", response);
            return response;
        });
    return res;
}

export const GetCurrentUser = async ({authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const currentUserUrl = `${apiUrl}/user/me`;
    console.log(currentUserUrl);
    console.log("authToken......", authToken)
    const res = await axios
        .get(currentUserUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            return response.data;
        });
    return res;
};
