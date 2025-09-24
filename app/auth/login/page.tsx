'use client';
import { LoginForm } from '@components/index';
import { ILoginApp, ILoginAppProps } from '@interfaces/apps/login';
import { useTrans } from '@utils/hooks';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const LoginApp: ILoginApp<ILoginAppProps> = () => {
    const trans = useTrans();
    const params = useSearchParams();
    const type = params.get('type');

    const LoginIndividualApp = () => {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 px-4 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-300/20 to-blue-300/20 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-teal-300/20 to-cyan-300/20 blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-md">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 p-8 space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                {trans.auth.individual.login.title}
                            </h2>
                            <p className="mt-3 text-gray-600 font-medium">{trans.auth.individual.login.subTitle}</p>
                        </div>
                        <LoginForm type={type?.toString()} />
                    </div>
                </div>
            </div>
        );
    };

    const LoginProfessionalApp = () => {
        return (
            <div className="min-h-screen flex bg-gray-50">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400/10 blur-2xl"></div>
                        <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-indigo-400/10 blur-2xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
                    </div>
                    <div className="relative flex flex-col justify-center px-12 text-white">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-6 backdrop-blur-sm border border-white/20">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold mb-4">{trans.auth.professional.login.title}</h1>
                            <p className="text-blue-100 text-lg leading-relaxed">{trans.auth.professional.login.subTitle}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-blue-100">{trans.auth.professional.login.note1}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-blue-100">{trans.auth.professional.login.note2}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-blue-100">{trans.auth.professional.login.note3}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-blue-100">{trans.auth.professional.login.note4}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
                    <div className="mx-auto w-full max-w-sm">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{trans.auth.professional.login.titleForm}</h2>
                            <p className="mt-2 text-gray-600">{trans.auth.professional.login.subTitleForm}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                            <LoginForm type={type?.toString()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const LoginEmergencyApp = () => {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-orange-800 to-red-800 px-4 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-500/20 blur-3xl animate-pulse"></div>
                    <div
                        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl animate-pulse"
                        style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative w-full max-w-lg">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-red-200 p-8 space-y-6">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-4 shadow-lg animate-pulse">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-red-600 mb-2">🚨 {trans.auth.emergency.login.title}</h2>
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                                <p className="text-red-700 font-semibold text-sm">{trans.auth.emergency.login.subTitle}</p>
                                <p className="text-red-600 text-sm mt-1">{trans.auth.emergency.login.subTitle2}</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-amber-800 font-medium text-sm">{trans.auth.emergency.login.textWarning}</span>
                            </div>
                            <p className="text-amber-700 text-xs leading-relaxed">{trans.auth.emergency.login.descriptions}</p>
                        </div>

                        <LoginForm type={type?.toString()} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>{type === 'individual' ? LoginIndividualApp() : type === 'professional' ? LoginProfessionalApp() : LoginEmergencyApp()}</div>
    );
};

export default LoginApp;
