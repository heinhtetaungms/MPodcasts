import axios from "axios";

export const Subscribe = ({subscriptionId, userId, paymentType, token}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const appLinkUrl = `${apiUrl}/subscription/subscribe`;


    const res = axios
        .post(appLinkUrl, {subscriptionId, userId, paymentType},
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            })
        .then(function (response) {
            return (response);
        })
        .catch(function (error) {
            return (error);
        });
    return res;
}
