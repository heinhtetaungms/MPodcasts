import axios from "axios";

export const PlayListRequest = async ({authToken, userId}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}/podcast/playList?userId=${userId}`;

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