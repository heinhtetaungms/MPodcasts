import axios from 'axios'


export const ForUserData = async ({authToken, id}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const userUrl = `${apiUrl}/channel/${id}`;
    const res = await axios
        .get(userUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },

        })
        .then((response) => {
            return response.data;
        });
    return res;
};