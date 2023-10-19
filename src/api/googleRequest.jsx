export const API_BASE_URL = 'https://g4backend.onrender.com';

export const OAUTH2_REDIRECT_URI = 'http://localhost:8888/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

const googleRequest = () => {
    return (
        <div>googleRequest</div>
    )
}

export default googleRequest