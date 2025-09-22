// app/layout.tsx
'use client';

import './globals.css';
import '@styles/scss/main.scss';
import { Provider } from 'react-redux';
import { useRef } from 'react';
import { App } from '@components/index';
import { makeStore } from '@redux/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const storeRef = useRef(makeStore());
    return (
        <html lang="kr">
            <body>
                <Provider store={storeRef.current}>
                    <App>{children}</App>
                </Provider>
            </body>
        </html>
    );
}
