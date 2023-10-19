import axios from "axios";

export const GetLatestPodcasts = async ({authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const dataUrl = `${apiUrl}/podcast/latest`;
    const res = await axios
        .get(dataUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            return response.data;
        });
    return res;
};