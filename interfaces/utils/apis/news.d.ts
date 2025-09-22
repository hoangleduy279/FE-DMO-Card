interface INewsAPIData {
    news_id?: number;
    title?: string;
    slug?: string;
    content?: string;
    thumbnail_url?: string;
}

interface IGetNewsListAPIRes {
    news?: INewsAPIData[];
}

interface IGetNewsDetailAPIRes {
    new?: INewsAPIData;
}
