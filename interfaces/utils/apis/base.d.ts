interface IBaseAPIRes {
    code?: number;
    message?: string;
}

interface IErrorAPIRes extends IBaseAPIRes {
    code?: number;
    message?: string;
}

interface IAccessTokenAndParams {
    token?: string;
    params?: IListParams;
}
