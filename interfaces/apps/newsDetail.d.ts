import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface INewsDetailPageProps extends IBaseAppProps {}

interface INewsDetailPage<P = {}> extends IBaseApp<P> {}

interface INewsDetailPageState {
    news?: INewsAPIData;
    comments?: ICommentAPIData[];
}
