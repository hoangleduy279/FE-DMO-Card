'use client';
import { LoginForm } from '@components/index';
import { ILoginApp, ILoginAppProps } from '@interfaces/apps/login';
import React from 'react';

const LoginApp: ILoginApp<ILoginAppProps> = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-300/20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-300/20 to-pink-300/20 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4-4H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Weekly Planner
                        </h2>
                        <p className="mt-3 text-gray-600 font-medium">Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginApp;
