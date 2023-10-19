import axios from 'axios'

export const VipList = async ({authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const data = `${apiUrl}/subscription/subscribe`;
    console.log(data);
    const res = await axios
        .get(data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },

        })
        .then((response) => {
            console.log("########333", response.data);

            return response.data;
        });
    return res;
};