'use client';
const Footer: IFooterComponent<IFooterComponentProps> = (props) => {
    const { isShow } = props;

    if (isShow) {
        return <div className="components__footer flex justify-center items-center">Copyright 2023 VNEXT Software</div>;
    }
};

export default Footer;
