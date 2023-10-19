import axios from 'axios'

export const StreamAudio = async ({fileName, podcastId, userId, authToken}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const streamUrl = `${apiUrl}/audio/stream`;
    const actualUrl = `${streamUrl}?fileName=${fileName}&podcastId=${podcastId}&userId=${userId}`;
    const res = await axios
        .get(actualUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            responseType: 'blob',
        })
        .then((response) => {
            return response;
        });
    return res;
}