import axios from "axios";

export const PodcastViewData = async ({ authToken}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const dataUrl = `${apiUrl}/podcast/viewCount`;
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