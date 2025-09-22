export const accessToken = () => {
    if (typeof window !== 'undefined') {
        const name = 'temiWebAccessToken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookie = decodedCookie.split(';');
        for (let i = 0; i < cookie.length; i++) {
            let cookie_str = cookie[i];
            while (cookie_str.charAt(0) === ' ') {
                cookie_str = cookie_str.substring(1);
            }
            if (cookie_str.indexOf(name) === 0) {
                const accessToken = cookie_str.substring(name.length, cookie_str.length);
                if (accessToken) {
                    return `Bearer ${accessToken}`;
                }
                return '';
            }
        }
    }
    return '';
};

export const setAccessToken = (accessToken: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `temiWebAccessToken=${accessToken};${expires};path=/;${window.location.protocol === 'https' ? 'secure;' : ''}`;
};

export const isAuth = () => {
    return Boolean(accessToken());
};

export const logOut = () => {
    document.cookie = 'temiWebAccessToken=; Max-Age=-99999999;';
};
