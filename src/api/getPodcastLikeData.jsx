import axios from "axios";

export const PodcastLikeData = async ({authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const dataUrl = `${apiUrl}/podcast/likeCount`;
    const response = await axios
        .get(dataUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            return response.data;
        });
    return response;
};