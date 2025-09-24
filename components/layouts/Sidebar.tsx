'use client';
import React, { useState } from 'react';
import {
    Home,
    Calendar,
    Heart,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Shield,
    BookOpen,
    Phone,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { ReduxStates } from '@redux/store';
import { setSidebar } from '@redux/actions';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector((states: ReduxStates) => states.sidebar);
    const [activeItem, setActiveItem] = useState('dashboard');
    const [expandedItems, setExpandedItems] = useState(['patients', 'reports']);

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Tổng quan',
            icon: Home,
            color: 'text-blue-500',
        },
        {
            id: 'appointments',
            label: 'Lịch hẹn',
            icon: Calendar,
            color: 'text-green-500',
            children: [
                { id: 'appointments-today', label: 'Hôm nay', icon: Clock },
                { id: 'appointments-upcoming', label: 'Sắp tới', icon: AlertCircle },
                { id: 'appointments-completed', label: 'Đã hoàn thành', icon: CheckCircle },
                { id: 'appointments-cancelled', label: 'Đã hủy', icon: XCircle },
            ],
        },
    ];

    const bottomMenuItems = [
        {
            id: 'settings',
            label: 'Cài đặt',
            icon: Settings,
            color: 'text-gray-500',
            children: [
                { id: 'settings-general', label: 'Chung', icon: Settings },
                { id: 'settings-security', label: 'Bảo mật', icon: Shield },
            ],
        },
        {
            id: 'help',
            label: 'Trợ giúp',
            icon: HelpCircle,
            color: 'text-gray-500',
            children: [
                { id: 'help-docs', label: 'Tài liệu', icon: BookOpen },
                { id: 'help-contact', label: 'Liên hệ', icon: Phone },
            ],
        },
    ];

    const handleItemClick = (itemId: string, hasChildren = false) => {
        if (hasChildren && !sidebar) {
            setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
        } else {
            setActiveItem(itemId);
        }
    };

    const renderMenuItem = (item: any) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.id);

        return (
            <div key={item.id}>
                <button
                    onClick={() => handleItemClick(item.id, hasChildren)}
                    className={`
            w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
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

                    {/* Expand/Collapse indicator for parent items */}
                    {hasChildren && !sidebar && (
                        <div className="transition-transform duration-200">
                            {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                        </div>
                    )}

                    {/* Active indicator for leaf items */}
                    {isActive && !hasChildren && (
                        <div
                            className={`
              w-2 h-2 bg-blue-500 rounded-full
              transition-all duration-300
              ${sidebar ? 'hidden' : 'block'}
            `}
                        />
                    )}
                </button>

                {/* Children items */}
                {hasChildren && isExpanded && !sidebar && (
                    <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                        {item.children.map((child: any) => {
                            const ChildIcon = child.icon;
                            const isChildActive = activeItem === child.id;

                            return (
                                <div className="relative" key={child.id}>
                                    <button
                                        key={child.id}
                                        onClick={() => handleItemClick(child.id)}
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
                                    {sidebar && (
                                        <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 hidden group-hover:block z-50">
                                            <div className="px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
                                                {item.label}
                                            </div>
                                        </div>
                                    )}
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
            {/* Sidebar */}
            <div
                className={`
        relative bg-white shadow-xl transition-all duration-300 ease-in-out
        ${sidebar ? 'w-25' : 'w-80'}
        min-h-screen border-r border-gray-200
      `}>
                {/* Toggle Button */}
                <button
                    onClick={() => dispatch(setSidebar(!sidebar))}
                    className={`
            absolute -right-3 top-8 z-10
            bg-white border border-gray-200 rounded-full p-1.5
            shadow-md hover:shadow-lg transition-all duration-200
            hover:bg-blue-50 hover:border-blue-200
            ${sidebar ? 'rotate-180' : ''}
          `}>
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                {/* Logo Section */}
                <div
                    className={`
          flex items-center p-6 border-b border-gray-100
          ${sidebar ? 'justify-center' : 'justify-start'}
        `}>
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center ${sidebar ? 'm-0' : ''}`}>
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div
                            className={`
              transition-all duration-300 overflow-hidden
              ${sidebar ? 'w-0 opacity-0' : 'w-auto opacity-100'}
            `}>
                            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">MediCare</h1>
                            <p className="text-xs text-gray-500 whitespace-nowrap">Hệ thống y tế</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4">
                    <div className="space-y-1 max-h-96 overflow-y-auto">{menuItems.map((item) => renderMenuItem(item))}</div>

                    {/* Bottom Menu */}
                    <div
                        className={`
    mt-8 pt-4 border-t border-gray-200 space-y-1
    ${sidebar ? 'border-t-0' : ''}
  `}>
                        {bottomMenuItems.map((item) => renderMenuItem(item))}
                    </div>
                </nav>

                <div
                    className={`
    absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50
    ${sidebar ? 'px-2' : 'px-4'}
  `}>
                    <div
                        className={`
      flex items-center space-x-3 p-3 rounded-lg
      bg-white border border-gray-200 shadow-sm
      hover:shadow-md transition-all duration-200 cursor-pointer
      ${sidebar ? 'justify-center' : 'justify-start'}
    `}>
                        <div
                            className={`w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${sidebar ? 'm-0' : ''}`}>
                            BS
                        </div>
                        <div
                            className={`
        transition-all duration-300 overflow-hidden
        ${sidebar ? 'w-0 opacity-0' : 'w-auto opacity-100'}
      `}>
                            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">BS. Nguyễn Văn A</p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">Bác sĩ chuyên khoa</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {!sidebar && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => dispatch(setSidebar(true))} />}
        </div>
    );
};

export default Sidebar;
