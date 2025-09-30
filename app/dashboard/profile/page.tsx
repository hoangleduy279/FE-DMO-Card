'use client';
import { DashboardProfileForm } from '@components/index';
import { IDashboardProfilePage, IDashboardProfilePageProps } from '@interfaces/apps/dasboard/profile/profile';
import { User, Heart, Shield, Lock, MapPin, Users, Stethoscope, FileText, Save } from 'lucide-react';
import React, { useState } from 'react';

type TabType = 'personal' | 'medical' | 'insurance' | 'password' | 'address' | 'contacts' | 'doctor' | 'documents';

interface TabConfig {
    id: TabType;
    label: string;
    icon: React.ElementType;
}

const DashboardProfilePage: IDashboardProfilePage<IDashboardProfilePageProps> = () => {
    const [activeTab, setActiveTab] = useState<TabType>('personal');

    const tabs: TabConfig[] = [
        { id: 'personal', label: 'Personal data', icon: User },
        { id: 'medical', label: 'Personal medical data', icon: Heart },
        { id: 'insurance', label: 'Insurance data', icon: Shield },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'address', label: 'Postal address', icon: MapPin },
        { id: 'contacts', label: 'Contact persons', icon: Users },
        { id: 'doctor', label: 'Treating doctor', icon: Stethoscope },
        { id: 'documents', label: 'Documents', icon: FileText },
    ];

    const handleTabClick = (tabId: TabType) => {
        setActiveTab(tabId);
    };

    const handleSave = () => {
        console.log(`Saving ${activeTab} data...`);
    };

    return (
        <div className="page__dashboard--profile">
            <div className="page__dashboard--profile--button">
                <button onClick={handleSave} className="Btn">
                    <div className="sign">
                        <Save size={16} />
                    </div>
                    <div className="text">Save</div>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg animate-fadeIn">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6 overflow-x-auto">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`
                                    py-4 px-2 border-b-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                                    ${
                                        isActive
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}>
                                    <IconComponent size={16} className="inline mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="p-6 min-h-[90vh]">
                    <DashboardProfileForm type={activeTab} />
                </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;
