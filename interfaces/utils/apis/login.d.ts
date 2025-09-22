interface ILoginDataAPI {
    email?: string;
    password?: string;
}

interface ILoginAPIRes extends IBaseAPIRes {
    result: {
        accessToken: string;
    };
}

interface IGetProfileAPIRes {
    profile: IUserAPIData;
}
