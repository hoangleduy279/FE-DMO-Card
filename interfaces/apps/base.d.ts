import { AppContext, AppInitialProps } from 'next/app';

interface IBaseAppProps extends AppInitialProps {
    Component: React.FC<Component>;
    pageLoading?: boolean;
    locale?: string;
    statusCode?: number;
    title?: string;
    url?: {
        host?: string;
        pathname?: string;
        asPath?: string;
    };
}

interface IBaseApp<P> extends React.FC<P> {
    getInitialProps?: (props: AppContext) => Promise<{}>;
    getServerSideProps?: () => Promise<{ props?: any }>;
}
