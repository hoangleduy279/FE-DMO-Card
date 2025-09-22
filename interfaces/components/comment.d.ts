interface ICommentComponentProps extends IBaseCompProps {
    onComplete?: () => void;
    news?: INewsAPIData;
}

interface ICommentComponent<P = {}> extends IBaseComp<P> {}

interface ICommentComponentState extends IBaseCompState {
    comment: string;
}
