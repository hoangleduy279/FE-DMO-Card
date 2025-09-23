interface ILoginComponentProps extends IBaseCompProps {
    onComplete?: () => void;
    type?: string;
}

interface ILoginComponentHandle {
    onSubmit: () => void;
}

interface ILoginComponent<P = {}> extends IBaseComp<P> {}

interface ILoginComponentState extends IBaseCompState {
    email: string;
    password: string;
    showPassword: boolean;
    cardId: string;
    emergencyPassword: string;
    birthDate: string;
    birthPlace: string;
    applicantName: string;
    applicantEmail: string;
    activeTab: string;
    showAlternativeLogin: boolean;
}
