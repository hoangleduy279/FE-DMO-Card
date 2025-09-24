'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Loader from '@components/layouts/Loader';
import Modal from '@components/layouts/Modal';
import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';

import { fetchAccountUser, setLocale, setModal } from '@redux/actions';
import { useAppDispatch } from '@utils/hooks';
import { http, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';

const App: IAppComponent<IAppComponentProps> = (props) => {
    const { children, statusCode } = props;
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
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

    const noHeaderFooterPath = [routes.CLIENT.LOGIN.href, routes.CLIENT.AUTH.href];

    useEffect(() => {
        if (!token && !noAuthPath.includes(pathname)) {
            router.replace(routes.CLIENT.AUTH.href);
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
            <Header isShow={isShowComponent && !noHeaderFooterPath.includes(pathname)} />
            <div className="components__app-content">{children}</div>
            <Footer isShow={isShowComponent && !noHeaderFooterPath.includes(pathname)} />
        </div>
    );
};

export default App;
