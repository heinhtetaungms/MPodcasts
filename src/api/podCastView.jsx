import axios from 'axios'


export const PodCastViewRequest = async ({authToken, podcastId, userId}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const podCastViewUrl = `${apiUrl}/podcast/view?podcastId=${podcastId}&userId=${userId}`;

    const res = await axios
        .get(podCastViewUrl, {
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
