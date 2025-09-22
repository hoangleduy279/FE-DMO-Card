'use client';

import { useRouter } from 'next/navigation';

import { routes, images } from '@utils/constants';

const Header: IHeaderComponent<IHeaderComponentProps> = (props) => {
    const { isShow } = props;
    const router = useRouter();

    if (isShow) {
        return (
            <>
                <div className="components__header flex justify-between items-center">
                    <img src={images.LOGO_IMAGE} alt="logo" onClick={() => router.push(routes.CLIENT.HOME.href)} className="logo" />
                    <div className="flex components__header-icon">
                        <img src={images.ICON_SEARCH} alt="icon_search" />
                        <img src={images.ICON_LIST} alt="icon_list" />
                    </div>
                </div>
            </>
        );
    }
    return <></>;
};

export default Header;
