import axios from 'axios'

export const PodcastCreateRequest = async ({title, content, writerId, userId, file, image, authToken}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const podcastCreate = `${apiUrl}/podcast/add`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('writerId', writerId);
    formData.append('userId', userId);

    try {
        const response = await axios.post(podcastCreate, formData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
