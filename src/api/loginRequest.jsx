import axios from 'axios'



export const LoginRequest = async ({email, password}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loginUrl = `${apiUrl}/user/login`;
    const res = await axios
        .post(loginUrl, {
            email,
            password,
        })
        .then((response) => {
            console.log("Response headers ", response);
            return response;
        });
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