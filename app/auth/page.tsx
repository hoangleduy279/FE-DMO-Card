'use client';
import React, { useState, useEffect } from 'react';
import { User, Users, ChevronRight } from 'lucide-react';
import { IAuthApp, IAuthAppProps, IAuthAppState } from '@interfaces/apps/auth/auth';
import { useRouter } from 'next/navigation';
import { images, routes } from '@utils/constants';
import { Img } from '@components/index';
import { useTrans } from '@utils/hooks';

const AppAuth: IAuthApp<IAuthAppProps> = () => {
    const trans = useTrans();
    const router = useRouter();
    const [state, setState] = useState<IAuthAppState>({
        bubbles: [],
    });
    const { selectedType, bubbles } = state;

    useEffect(() => {
        const createBubbles = () => {
            const newBubbles: any = [];
            for (let i = 0; i < 10; i++) {
                newBubbles.push({
                    id: i,
                    size: Math.random() * 60 + 20,
                    left: Math.random() * 100,
                    delay: Math.random() * 5,
                    duration: Math.random() * 3 + 8,
                });
            }
            setState((prevState) => ({
                ...prevState,
                bubbles: newBubbles,
            }));
        };

        createBubbles();
    }, []);

    const FloatingBubble = (props: any) => {
        const { bubble } = props;
        return (
            <div
                className="absolute rounded-full bg-gradient-to-br from-blue-200/30 to-green-200/30 backdrop-blur-sm animate-float"
                style={{
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    left: `${bubble.left}%`,
                    animationDelay: `${bubble.delay}s`,
                    animationDuration: `${bubble.duration}s`,
                }}
            />
        );
    };

    const handleNextPage = (route: string, query: Record<string, string | number | boolean>) => {
        const queryString = new URLSearchParams(query as Record<string, string>).toString();
        const fullPath = queryString ? `${route}?${queryString}` : route;

        router.push(fullPath);
    };

    return (
        <div className="app__auth min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Floating Bubbles */}
            <div className="absolute inset-0 pointer-events-none">
                {bubbles?.map((bubble) => <FloatingBubble key={bubble.id} bubble={bubble} />)}
            </div>
            <div className="w-full max-w-6xl relative z-10">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-down">{trans.auth.title}</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div
                        className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 transform hover:scale-105 hover:-translate-y-1 ${
                            selectedType === 'individual' ? 'border-blue-500 shadow-blue-100' : 'border-transparent'
                        }`}
                        onClick={() => {
                            setState((prevState) => ({
                                ...prevState,
                                selectedType: 'individual',
                            }));
                            handleNextPage(routes.CLIENT.LOGIN.href, { type: 'individual' });
                        }}>
                        <div className="p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-500 p-3 rounded-lg">
                                    <User className="text-white" size={24} />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800 ml-4">{trans.auth.individual.title}</h2>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <p className="text-gray-600 mb-6 leading-relaxed">{trans.auth.individual.subTitle}</p>
                                <div className="rounded-lg h-40 mb-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <Img className="object-contain" src={images.LOGIN_PRIVATE_IMAGE} />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group">
                                <span>{trans.auth.individual.buttonText}</span>
                                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                            </button>
                        </div>
                    </div>

                    <div
                        className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 transform hover:scale-105 hover:-translate-y-1 ${
                            selectedType === 'professional' ? 'border-green-500 shadow-green-100' : 'border-transparent'
                        }`}
                        onClick={() => {
                            setState((prevState) => ({
                                ...prevState,
                                selectedType: 'professional',
                            }));
                            handleNextPage(routes.CLIENT.LOGIN.href, { type: 'professional' });
                        }}>
                        <div className="p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-500 p-3 rounded-lg">
                                    <Users className="text-white" size={24} />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800 ml-4">{trans.auth.professional.title}</h2>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <p className="text-gray-600 mb-6 leading-relaxed">{trans.auth.professional.subTitle}</p>
                                <div className="rounded-lg h-40 mb-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <Img className="max-w-full h-[300px] object-contain" src={images.LOGIN_PROFESSIONAL_IMAGE} />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group">
                                <span>{trans.auth.professional.buttonText}</span>
                                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="emergency-container">
                    <div className="emergency-header">
                        <div className="header-content">
                            <svg className="emergency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                            <h2 className="emergency-title">{trans.auth.emergency.title}</h2>
                        </div>
                    </div>

                    <div className="emergency-body">
                        <div className="button-wrapper">
                            <button
                                className="emergency-button-3d"
                                onClick={() => {
                                    handleNextPage(routes.CLIENT.LOGIN.href, { type: 'emergency' });
                                }}>
                                <div className="button-surface">
                                    <span className="button-text">{trans.auth.emergency.buttonText}</span>
                                </div>
                            </button>
                        </div>
                        <p className="emergency-description">{trans.auth.emergency.subTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppAuth;
