import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;
const logoutUrl = `${apiUrl}/logout`;

export const LogoutRequest = async () => {
    const res = await axios
        .get(logoutUrl)
        .then((response) => {
            console.log("Response headers ", response);
            return response;
        });
    return res;
}