interface IDashboardProfileComponentProps extends IBaseCompProps {
    onComplete?: () => void;
}

interface IDashboardProfileComponentHandle {
    onSubmit: () => void;
}

interface IDashboardProfileComponent<P = {}> extends IBaseComp<P> {}

interface IDashboardProfileComponentState extends IBaseCompState {
    profileImage?: string;
    uploadedFiles?: UploadedFile[];
    dragActive?: boolean;
    contacts?: any[];
}
interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    status: 'uploading' | 'completed';
    uploadProgress: number;
}
