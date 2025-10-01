import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface IDashboardProfilePageProps extends IBaseAppProps {}

interface IDashboardProfilePage<P = {}> extends IBaseApp<P> {}

interface IDashboardProfilePageState {}

interface IDashboardProfileTabConfig {
    id: TabType;
    label: string;
    icon: React.ElementType;
}
