import axios from 'axios'

export const OAuth2Request = async ({oauthType}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    let oauth2 = '';
    if (oauthType === 'google') {
        oauth2 = import.meta.env.VITE_GOOGLE_AUTH_URL;
    } else if (oauthType === 'facebook') {
        oauth2 = import.meta.env.VITE_FACEBOOK_AUTH_URL;
    } else if (oauthType === 'github') {
        oauth2 = import.meta.env.VITE_GITHUB_AUTH_URL;
    } else {
        // Handle unsupported types or set a default value
    }
    let oauth2Url = `${apiUrl}/${oauth2}`;
    console.log("oauth2Url...............", oauth2Url)

    const res = await axios.get(oauth2Url)
        .then((response) => {
            console.log("Response headers ", response);
            return response;
        })
        .catch((error) => {
            console.log(error)
        })
    return res;
}

export const redirectToOAuth2 = ({oauthType}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    let oauth2 = '';
    if (oauthType === 'google') {
        oauth2 = import.meta.env.VITE_GOOGLE_AUTH_URL;
    } else if (oauthType === 'facebook') {
        oauth2 = import.meta.env.VITE_FACEBOOK_AUTH_URL;
    } else if (oauthType === 'github') {
        oauth2 = import.meta.env.VITE_GITHUB_AUTH_URL;
    } else {
        // Handle unsupported types or set a default value
    }
    let oauth2Url = `${apiUrl}/${oauth2}`;

    window.location.href = oauth2Url;
};