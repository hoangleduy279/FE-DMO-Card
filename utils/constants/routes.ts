const HOME_PAGE: IRouteConstant = {
    href: '/',
};
const LOGIN_PAGE: IRouteConstant = {
    href: '/auth/login',
};
const NEWS_DETAIL_PAGE: IRouteConstant = {
    href: '/news/detail/[slug]',
};
const NOT_FOUND_PAGE: IRouteConstant = {
    href: '/404',
};

export const CLIENT = {
    HOME: HOME_PAGE,
    LOGIN: LOGIN_PAGE,
    NOT_FOUND: NOT_FOUND_PAGE,
    NEWS_DETAIL: NEWS_DETAIL_PAGE,
};

const LOGIN_API: IRouteConstant = {
    href: 'users/login',
};
const PROFILE_API: IRouteConstant = {
    href: 'profile',
};

const USER_API: IRouteConstant = {
    href: 'users',
};
export const API = {
    LOGIN: LOGIN_API,
    PROFILE: PROFILE_API,
    USERS: USER_API,
};
