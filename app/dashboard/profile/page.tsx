'use client';
import { DashboardProfileForm } from '@components/index';
import { IDashboardProfilePage, IDashboardProfilePageProps } from '@interfaces/apps/dasboard/profile/profile';
import { Save } from 'lucide-react';

const DashboardProfilePage: IDashboardProfilePage<IDashboardProfilePageProps> = () => {
    const handleSave = () => {
        // console.log(`Saving ${activeTab} data...`);
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
                <div className="p-6 min-h-[90vh]">
                    <DashboardProfileForm />
                </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;
