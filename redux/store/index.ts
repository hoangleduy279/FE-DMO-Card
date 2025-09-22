import reducer from '@redux/reducers';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const initialState = {};
export const makeStore = () => {
    return configureStore({
        reducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
            }).concat(thunk),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type ReduxStates = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
