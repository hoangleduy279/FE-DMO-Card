import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface IDashboardDoctorPageProps extends IBaseAppProps {}

interface IDashboardDoctorPage<P = {}> extends IBaseApp<P> {}

interface IDashboardDoctorPageState {
    currentPage: number;
    isFormOpen?: boolean;
    selectedItem?: any;
}
