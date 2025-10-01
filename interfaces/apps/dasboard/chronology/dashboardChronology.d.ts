import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface IDashboardChronologyPageProps extends IBaseAppProps {}

interface IDashboardChronologyPage<P = {}> extends IBaseApp<P> {}

interface IDashboardChronologyPageState {
    currentPage: number;
    isFormOpen?: boolean;
    selectedItem?: any;
}
