'use client';

import { useAppSelector } from '@utils/hooks';

import React from 'react';
import { ReduxStates } from '@redux/store';

const Home = () => {
    const accountUser = useAppSelector((states: ReduxStates) => states.account);
    console.log(accountUser);
    return <div className="flex justify-center transition-transform duration-300 hover:text-amber-100 fade-in"></div>;
};

export default Home;
