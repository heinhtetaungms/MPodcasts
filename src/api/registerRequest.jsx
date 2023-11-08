import axios from "axios";

export const RegisterUser = ({firstName, lastName, email}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const appLinkUrl = `${apiUrl}/user/register`;

    const res = axios
        .post(appLinkUrl, {firstName, lastName, email})
        .then(function (response) {
            console.log("Response headers ", response);
            return (response);
        })
    return res;
}