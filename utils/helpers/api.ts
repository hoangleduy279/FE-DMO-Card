import { axios } from '@utils/plugins';
import { routes } from '@utils/constants';

export const loginUser = async (data: ILoginDataAPI) => {
    try {
        return await axios.post<ILoginAPIRes>(routes.API.LOGIN.href, data);
    } catch (err) {
        throw err;
    }
};

export const getAccountUser = async () => {
    try {
        return await axios.get<IGetProfileUserAPIRes>(`${routes.API.USERS.href}/me`);
    } catch (err) {
        throw err;
    }
};
