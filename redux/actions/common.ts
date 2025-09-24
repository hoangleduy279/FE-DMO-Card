import { SET_LOCALE, SET_MODAL, SET_SIDEBAR } from '@redux/actions/type';

// Action set active locale
export const setLocale = (data: string = 'fr') => {
    return {
        type: SET_LOCALE,
        data,
    };
};

export const setModal = (data: IModalReduxData = { isShow: false }) => {
    return {
        type: SET_MODAL,
        data,
    };
};

export const setSidebar = (data: boolean = false) => {
    return {
        type: SET_SIDEBAR,
        data,
    };
};
