'use client';

import { useParams } from 'next/navigation';
import { en, kr } from '@utils/lang';

const useTrans = () => {
    const params = useParams();
    const locale = params?.locale as string | undefined;

    const trans = locale === 'kr' ? kr : en;

    return trans;
};

export default useTrans;
