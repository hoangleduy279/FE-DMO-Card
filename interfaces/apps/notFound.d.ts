import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface INotFoundPageProps extends IBaseAppProps {
    statusCode?: number;
}

interface INotFoundPage<P = {}> extends IBaseApp<P> {}
