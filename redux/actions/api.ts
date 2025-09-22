import { Dispatch } from 'redux';

import { authHelper, apiHelper } from '@utils/helpers';
import { AxiosError, AxiosResponse } from 'axios';

import { SET_ACCOUNT, SET_LOADER } from '@redux/actions/type';

export const setLoader = (data: boolean = false) => {
    return {
        type: SET_LOADER,
        data,
    };
};

const setAccount = (data: IUserAPIData | null) => {
    return {
        type: SET_ACCOUNT,
        data,
    };
};

export const fetchLogin = async (
    data: ILoginDataAPI,
    callBack?: (result: ILoginAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        const res = await apiHelper.loginUser(data);
        if (res?.data) {
            authHelper.setAccessToken(res.data.result?.accessToken ?? '');
        }
        if (callBack) {
            callBack(res?.data ?? res);
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const fetchAccountUser = async (
    callBack?: (result: IGetProfileUserAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.getAccountUser();
            dispatch(setAccount(res?.data.result));
            if (callBack) {
                callBack(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};
