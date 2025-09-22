import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface IHomePageProps extends IBaseAppProps {}

interface IHomePage<P = {}> extends IBaseApp<P> {}

interface IHomePageState {
    news?: INewsAPIData[];
    hotNews?: INewsAPIData;
}
