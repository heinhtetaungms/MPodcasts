import axios from 'axios'


export const VipList = async ({authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const data = `${apiUrl}/subscription/list`;
    console.log(data);
    const res = await axios
        .get(data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },

        })
        .then((response) => {
            return response.data;
        });
    return res;
};