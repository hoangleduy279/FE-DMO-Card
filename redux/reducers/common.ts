import { SET_LOCALE, SET_MODAL, SET_SIDEBAR } from '@redux/actions/type';

const localeReducer = (state: string = 'fr', action: ILocaleReduxAction) => {
    switch (action.type) {
        case SET_LOCALE:
            return action.data;
        default:
            return state;
    }
};

const modalReducer = (state: IModalReduxData = { isShow: false }, action: IModalReduxAction) => {
    switch (action.type) {
        case SET_MODAL:
            return action.data;
        default:
            return state;
    }
};

const sidebarReducer = (state: boolean = false, action: ISidebarReduxAction) => {
    switch (action.type) {
        case SET_SIDEBAR:
            return action.data;
        default:
            return state;
    }
};

export { localeReducer, modalReducer, sidebarReducer };
