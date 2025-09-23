'use client';

import { useParams } from 'next/navigation';
import { en, fr } from '@utils/lang';

const useTrans = () => {
    const params = useParams();
    const locale = params?.locale as string | undefined;

    const trans = locale === 'fr' ? fr : en;

    return trans;
};

export default useTrans;
