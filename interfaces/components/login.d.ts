interface ILoginComponentProps extends IBaseCompProps {
    onComplete?: () => void;
}

interface ILoginComponentHandle {
    onSubmit: () => void;
}

interface ILoginComponent<P = {}> extends IBaseComp<P> {}

interface ILoginComponentState extends IBaseCompState {
    email: string;
    password: string;
    showPassword?: boolean;
}
