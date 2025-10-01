const HOME_PAGE: IRouteConstant = {
    href: '/',
};
const AUTH_APP: IRouteConstant = {
    href: '/auth',
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

// Dashboard
const DASHBOARD_PAGE: IRouteConstant = {
    href: '/dashboard',
};
const DASHBOARD_PROFILE_PAGE: IRouteConstant = {
    href: '/dashboard/profile',
};
const DASHBOARD_CHRONOLOGY_PAGE: IRouteConstant = {
    href: '/dashboard/chronology',
};
const DASHBOARD_DOCTOR_PAGE: IRouteConstant = {
    href: '/dashboard/doctors',
};

export const CLIENT = {
    HOME: HOME_PAGE,
    AUTH: AUTH_APP,
    LOGIN: LOGIN_PAGE,
    NOT_FOUND: NOT_FOUND_PAGE,
    NEWS_DETAIL: NEWS_DETAIL_PAGE,
    DASHBOARD: DASHBOARD_PAGE,
    DASHBOARD_PROFILE: DASHBOARD_PROFILE_PAGE,
    DASHBOARD_CHRONOLOGY: DASHBOARD_CHRONOLOGY_PAGE,
    DASHBOARD_DOCTORS: DASHBOARD_DOCTOR_PAGE,
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
