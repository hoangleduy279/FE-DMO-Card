import { combineReducers } from 'redux';
import { localeReducer, modalReducer, sidebarReducer } from './common';
import { loaderReducer, accountReducer } from './api';

const rootReducers = combineReducers({
    account: accountReducer,
    locale: localeReducer,
    modal: modalReducer,
    loader: loaderReducer,
    sidebar: sidebarReducer,
});

export default rootReducers;
