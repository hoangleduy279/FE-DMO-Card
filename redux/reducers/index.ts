import { combineReducers } from 'redux';
import { localeReducer, modalReducer } from './common';
import { loaderReducer, accountReducer } from './api';

const rootReducers = combineReducers({
    account: accountReducer,
    locale: localeReducer,
    modal: modalReducer,
    loader: loaderReducer,
});

export default rootReducers;
