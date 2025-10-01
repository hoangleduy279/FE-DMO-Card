'use client';

import { Input } from '@components/index';
import Pagination from '@components/layouts/Pagination';
import React from 'react';

const MyDashboardApp = () => {
    return (
        <div>
            <Input />
            <Pagination totalPage={10} />
        </div>
    );
};

export default MyDashboardApp;
