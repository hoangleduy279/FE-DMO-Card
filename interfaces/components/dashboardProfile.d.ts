interface IDashboardProfileComponentProps extends IBaseCompProps {
    onComplete?: () => void;
    type?: string;
}

interface IDashboardProfileComponentHandle {
    onSubmit: () => void;
}

interface IDashboardProfileComponent<P = {}> extends IBaseComp<P> {}

interface IDashboardProfileComponentState extends IBaseCompState {
    profileImage?: string;
}
