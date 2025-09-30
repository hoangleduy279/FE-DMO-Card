interface IDashboardChronologyComponentProps extends IBaseCompProps {
    onAdd?: (data: any) => void;
    onClose?: () => void;
    id?: string;
    data?: any;
}

interface IDashboardChronologyComponentHandle {
    onSubmit: () => void;
}

interface IDashboardChronologyComponent<P = {}> extends IBaseComp<P> {}

interface IDashboardChronologyComponentState extends IBaseCompState {
    type?: string;
    date?: string;
    title?: string;
    hospital?: string;
    doctor?: string;
    description?: string;
}
