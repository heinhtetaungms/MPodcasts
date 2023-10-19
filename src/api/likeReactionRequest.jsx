import axios from 'axios'

export const LikeRequest = async ({podcastId, userId, liked, authToken}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const likeRequestUrl = `${apiUrl}/podcast/like`;
    const res = await axios
        .post(likeRequestUrl, {
            podcastId,
            userId,
            liked,
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then((response) => {
            return response;
        });
    return res;
}