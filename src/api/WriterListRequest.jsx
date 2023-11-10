import axios from 'axios';

export const WriterListRequest = async ({authToken}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}/writer/list`;

    const res = await axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            console.log("Response headers ", response);
            return response;
        });
    return res;
}