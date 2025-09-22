interface IUserAPIData {
    user_id?: number;
    name?: string;
    avatar?: string;
}

interface IGetProfileUserAPIRes extends IBaseAPIRes {
    result: IUserAPIData;
}
