
export const OAuth2Request = ({oauthType}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    let oauth2 = '';
    if (oauthType === 'google') {
        oauth2 = import.meta.env.VITE_GOOGLE_AUTH_URL;
    } else if (oauthType === 'facebook') {
        oauth2 = import.meta.env.VITE_FACEBOOK_AUTH_URL;
    } else if (oauthType === 'github') {
        oauth2 = import.meta.env.VITE_GITHUB_AUTH_URL;
    }
    let oauth2Url = `${apiUrl}/${oauth2}`;

    console.log("before invoked oauth2Url...........", oauth2Url)
    window.location.href = oauth2Url;
};

export default OAuth2Request