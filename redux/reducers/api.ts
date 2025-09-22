import { SET_ACCOUNT, SET_LOADER } from '@redux/actions/type';

const loaderReducer = (state: boolean = false, action: ILoaderReduxAction) => {
    switch (action.type) {
        case SET_LOADER:
            return action.data;
        default:
            return state;
    }
};

const accountReducer = (state: IUserAPIData = {}, action: IAccountReduxAction) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return action.data;
        default:
            return state;
    }
};

export { loaderReducer, accountReducer };
