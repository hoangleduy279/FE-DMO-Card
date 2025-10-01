interface IDashboardDoctorComponentProps extends IBaseCompProps {
    onAdd?: (data: any) => void;
    onClose?: () => void;
    id?: string;
    data?: any;
}

interface IDashboardDoctorComponentHandle {
    onSubmit: () => void;
}

interface IDashboardDoctorComponent<P = {}> extends IBaseComp<P> {}

interface IDashboardDoctorComponentState extends IBaseCompState {
    specialization?: string;
    firstName?: string;
    lastName?: string;
    hospitalOffice?: string;
    place?: string;
    country?: string;
    phone?: string;
    email?: string;
}
