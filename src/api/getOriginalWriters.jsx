import axios from 'axios'


export const GetOriginalWriters = async ({authToken}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const userUrl = `${apiUrl}/writer/list`;
    const response = await axios
        .get(userUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            return response.data;
        });
    return response;
};