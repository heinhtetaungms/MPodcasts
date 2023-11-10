import axios from 'axios'


export const RecentData = async ({authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const userUrl = `${apiUrl}/podcast/latest`;
    console.log(userUrl);
    console.log(authToken)
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