interface ICommentAPIData {
    comment_id?: number;
    news_id?: number;
    content?: string;
    user?: IUserAPIData;
    created_at?: string;
}

interface IGetCommentListAPIRes {
    comments?: ICommentAPIData[];
}

interface ICreateCommentAPIRes {
    comment_id?: number;
}
