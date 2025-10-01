'use client';
import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronDown, ChevronUp, UserRound, Stethoscope, History } from 'lucide-react';
import { useAppDispatch, useAppSelector, useTrans } from '@utils/hooks';
import { ReduxStates } from '@redux/store';
import { setSidebar } from '@redux/actions';
import { routes } from '@utils/constants';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector((states: ReduxStates) => states.sidebar);
    const router = useRouter();
    const trans = useTrans();

    const [activeItem, setActiveItem] = useState(routes.CLIENT.DASHBOARD_PROFILE.href);
    const [expandedItems, setExpandedItems] = useState(['appointments', 'settings', 'help']);
    const getNormalizedId = (href: string) => href.replace(/^\//, '');

    const menuItems = [
        {
            href: routes.CLIENT.DASHBOARD_PROFILE.href,
            label: trans.sideBar.profile,
            icon: UserRound,
            color: 'text-blue-500',
        },
        {
            href: routes.CLIENT.DASHBOARD_CHRONOLOGY.href,
            label: trans.sideBar.chronology,
            icon: History,
            color: 'text-blue-500',
        },
        {
            href: routes.CLIENT.DASHBOARD_DOCTORS.href,
            label: trans.sideBar.doctor,
            icon: Stethoscope,
            color: 'text-blue-500',
        },
        // {
        //     href: '/appointments',
        //     label: 'Lịch hẹn',
        //     icon: Calendar,
        //     color: 'text-green-500',
        //     children: [
        //         { href: '/appointments/today', label: 'Hôm nay', icon: Clock },
        //         { href: '/appointments/upcoming', label: 'Sắp tới', icon: AlertCircle },
        //         { href: '/appointments/completed', label: 'Đã hoàn thành', icon: CheckCircle },
        //         { href: '/appointments/cancelled', label: 'Đã hủy', icon: XCircle },
        //     ],
        // },
    ];

    const handleItemClick = (href: string, hasChildren = false) => {
        const id = getNormalizedId(href);

        if (hasChildren && !sidebar) {
            setExpandedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
        } else {
            setActiveItem(href);
            router.push(href);
        }
    };

    const renderMenuItem = (item: any) => {
        const Icon = item.icon;
        const id = getNormalizedId(item.href);
        const isActive = activeItem === item.href;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(id);

        return (
            <div key={item.href} className="relative group">
                <button
                    onClick={() => handleItemClick(item.href, hasChildren)}
                    className={`
            w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer
            transition-all duration-200 text-left group
            ${isActive && !hasChildren ? 'bg-blue-50 border border-blue-200 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}
            ${sidebar ? 'justify-center' : 'justify-start'}
          `}>
                    <Icon
                        className={`
            w-5 h-5 transition-colors duration-200 flex-shrink-0
            ${sidebar ? 'm-0' : ''}
            ${isActive && !hasChildren ? 'text-blue-600' : `${item.color} group-hover:text-blue-500`}
          `}
                    />
                    {!sidebar && (
                        <span
                            className={`
            font-medium transition-all duration-300 overflow-hidden whitespace-nowrap flex-1 w-auto opacity-100
            ${isActive && !hasChildren ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'}
          `}>
                            {item.label}
                        </span>
                    )}

                    {hasChildren && !sidebar && (
                        <div className="transition-transform duration-200">
                            {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                        </div>
                    )}

                    {isActive && !hasChildren && !sidebar && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </button>

                {sidebar && (
                    <div
                        className={`
                            absolute left-full ml-2 top-1/2 -translate-y-1/2
                            bg-gray-800 text-white text-sm px-3 py-1 rounded-md
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-all duration-200 z-[99999]
                            shadow-lg
                            pointer-events-none
                            whitespace-nowrap overflow-visible
                        `}>
                        {item.label}
                    </div>
                )}

                {hasChildren && isExpanded && !sidebar && (
                    <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                        {item.children.map((child: any) => {
                            const ChildIcon = child.icon;
                            const isChildActive = activeItem === child.href;

                            return (
                                <div className="relative" key={child.href}>
                                    <button
                                        key={child.href}
                                        onClick={() => handleItemClick(child.href)}
                                        className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-md
                    transition-all duration-200 text-left group text-sm
                    ${
                        isChildActive
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                    }
                  `}>
                                        <ChildIcon
                                            className={`
                    w-4 h-4 transition-colors duration-200 flex-shrink-0
                    ${isChildActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                  `}
                                        />
                                        <span className="font-medium whitespace-nowrap flex-1">{child.label}</span>
                                        {isChildActive && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex">
            <div
                className={`
                    fixed top-0 left-0
                    bg-white shadow-xl transition-all duration-300 ease-in-out
                    ${sidebar ? 'w-20' : 'w-80 lg:w-54 2xl:w-80'}
                    h-screen
                    border-r border-gray-200
                    flex flex-col
                `}
                style={{ zIndex: 1000 }}>
                <button
                    onClick={() => dispatch(setSidebar(!sidebar))}
                    className={`
                        absolute -right-3 top-8 z-10 cursor-pointer
                        bg-white border border-gray-200 rounded-full p-1.5
                        shadow-md hover:shadow-lg transition-all duration-200
                        hover:bg-blue-50 hover:border-blue-200
                        ${sidebar ? 'rotate-180' : ''}
                    `}>
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                <div
                    onClick={() => {
                        setActiveItem(routes.CLIENT.DASHBOARD_PROFILE.href);
                        router.push(routes.CLIENT.DASHBOARD_PROFILE.href);
                    }}
                    className={`
                        flex items-center p-6 border-b border-gray-100 cursor-pointer
                        ${sidebar ? 'justify-center' : 'justify-start'}
                    `}>
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center ${sidebar ? 'm-0' : ''}`}>
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div className={`transition-all duration-300 overflow-hidden ${sidebar ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">my DMO-Card</h1>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-2">
                    <div className="space-y-1">{menuItems.map(renderMenuItem)}</div>
                    {/* <div className={`mt-6 pt-4 border-t border-gray-200 space-y-1 ${sidebar ? 'border-t-0' : ''}`}>
                        {bottomMenuItems.map(renderMenuItem)}
                    </div> */}
                </nav>

                <div className={`p-4 border-t border-gray-200 bg-gray-50 ${sidebar ? 'px-2' : 'px-4'}`}>
                    <div
                        className={`flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${sidebar ? 'justify-center' : 'justify-start'}`}>
                        <div
                            className={`w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${sidebar ? 'm-0' : ''}`}>
                            BS
                        </div>
                        <div className={`transition-all duration-300 overflow-hidden ${sidebar ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">BS. Nguyễn Văn A</p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">Bác sĩ chuyên khoa</p>
                        </div>
                    </div>
                </div>
            </div>

            {!sidebar && <div className="fixed inset-0 bg-opacity-50 z-40 lg:hidden" onClick={() => dispatch(setSidebar(true))} />}
        </div>
    );
};

export default Sidebar;
