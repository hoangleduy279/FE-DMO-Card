// hooks/useAppLocale.ts
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from './useRedux';
import { setLocale as setLocaleAction } from '@redux/actions/common';

const SUPPORTED_LOCALES = ['en', 'kr']; // <-- Danh sách locale hỗ trợ

export const useAppLocale = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const setLocale = (newLocale: string) => {
        dispatch(setLocaleAction(newLocale));

        const currentLocale = SUPPORTED_LOCALES.find((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);

        let cleanPath = pathname;

        if (currentLocale) {
            cleanPath = pathname.replace(`/${currentLocale}`, '') || '/';
        }

        const newPath = `/${newLocale}${cleanPath}`;

        console.log('Redirecting to:', newPath);
        router.push(newPath, { scroll: false });
    };

    return { setLocale };
};
