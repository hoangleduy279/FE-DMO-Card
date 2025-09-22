import { SET_LOCALE, SET_MODAL } from '@redux/actions/type';

// Action set active locale
export const setLocale = (data: string = 'kr') => {
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
