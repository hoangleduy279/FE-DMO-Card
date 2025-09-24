'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Loader from '@components/layouts/Loader';
import Modal from '@components/layouts/Modal';

import { fetchAccountUser, setLocale, setModal } from '@redux/actions';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { http, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import Sidebar from './Sidebar';
import { ReduxStates } from '@redux/store';

const App: IAppComponent<IAppComponentProps> = (props) => {
    const { children, statusCode } = props;
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector((states: ReduxStates) => states.sidebar);
    const [state, setState] = useState<IAppComponentState>({
        reloadKey: 0,
        historyPathname: pathname,
    });
    const token = authHelper.accessToken();
    const { reloadKey } = state;
    const locale = params.get('locale') ?? 'fr';
    const noAuthPath = [routes.CLIENT.LOGIN.href, routes.CLIENT.AUTH.href];

    const isNotFoundPage = statusCode === http.NOT_FOUND_CODE;
    const isShowComponent = !noAuthPath.includes(pathname) && !isNotFoundPage;
    const noSideBarPath = [routes.CLIENT.LOGIN.href, routes.CLIENT.AUTH.href];

    useEffect(() => {
        if (!token && !noAuthPath.includes(pathname)) {
            // router.replace(routes.CLIENT.AUTH.href);
            router.replace(routes.CLIENT.DASHBOARD.href);
        }
    }, [token]);

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    useEffect(() => {
        handleScrollToTop();
        setState((prevState) => ({
            ...prevState,
            historyPathname: pathname,
        }));
        if (authHelper.isAuth()) {
            handleFetchAccount();
        }
    }, [pathname]);

    useEffect(() => {
        dispatch(setLocale(locale));
    }, [locale]);

    const onBackButtonEvent = () => {
        dispatch(setModal({ isShow: false }));
        handleScrollToTop();
    };

    const handleFetchAccount = async () => {
        dispatch(await fetchAccountUser(() => {}, false));
    };

    const handleScrollToTop = () => {
        document.documentElement.style.scrollBehavior = 'auto';
        setTimeout(() => window.scrollTo(0, 0), 5);
    };

    return (
        <div key={reloadKey} className="components__app">
            <Loader />
            <Modal />
            <div className="flex min-h-screen">
                {!noSideBarPath.includes(pathname) && !isNotFoundPage && (
                    <div className={`${sidebar ? '' : 'w-1/6'} bg-gray-100`}>
                        <Sidebar />
                    </div>
                )}

                <div className={`flex-1 ${isShowComponent ? 'w-3/4' : 'w-4/5'}`}>
                    <div className="components__app-content p-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default App;
