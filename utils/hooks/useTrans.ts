'use client';

import { useSearchParams } from 'next/navigation';
import { en, fr } from '@utils/lang';

const useTrans = () => {
    const params = useSearchParams();
    const locale = params.get('locale') ?? 'fr';

    const trans = locale === 'fr' ? fr : en;

    return trans;
};

export default useTrans;
