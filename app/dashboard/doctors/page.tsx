'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, User, Phone, Stethoscope, Users } from 'lucide-react';
import {
    IDashboardDoctorPage,
    IDashboardDoctorPageProps,
    IDashboardDoctorPageState,
} from '@interfaces/apps/dasboard/doctor/dashboardDoctors';
import DashboardDoctorForm from '@components/forms/dashboard/Doctor';
import { useTrans } from '@utils/hooks';

const generateDoctorsData = () => {
    const doctors = [
        {
            specialty: 'Dentist',
            name: 'Dr. De Bourlaar Alexis',
            phone: '071/45 78 98',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Cardiologist',
            name: 'Dr. Dupont Pierre',
            phone: '02/555 31 11',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'General practitioner',
            name: 'Dr. Jean-François Artois',
            phone: '02/725 68 97',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Dentist',
            name: 'Dr. Loko Charles',
            phone: '075/65 89 75',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Surgeon',
            name: 'Dr. Yvan Duliere',
            phone: '02/764 11 11',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Dermatologist',
            name: 'Dr. Marie Dubois',
            phone: '02/123 45 67',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Pediatrician',
            name: 'Dr. Sophie Martin',
            phone: '071/98 76 54',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Orthopedist',
            name: 'Dr. Michel Laurent',
            phone: '02/456 78 90',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Neurologist',
            name: 'Dr. Anne Leroy',
            phone: '075/321 54 87',
            specialtyColor: 'text-red-500',
        },
        {
            specialty: 'Ophthalmologist',
            name: 'Dr. Patrick Moreau',
            phone: '02/987 65 43',
            specialtyColor: 'text-red-500',
        },
    ];

    return doctors.map((doctor, index) => ({ ...doctor, id: `doctor-${index}` }));
};

const ITEMS_PER_PAGE = 5;

const DashboardDoctorsPage: IDashboardDoctorPage<IDashboardDoctorPageProps> = () => {
    const trans = useTrans();
    const [data, setData] = useState(generateDoctorsData());
    const [state, setState] = useState<IDashboardDoctorPageState>({
        currentPage: 1,
        isFormOpen: false,
        selectedItem: undefined,
    });
    const { currentPage, isFormOpen, selectedItem } = state;
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleOpenForm = (item?: any) => {
        setState((prevState) => ({ ...prevState, isFormOpen: true, selectedItem: item }));
    };

    const handleCloseForm = () => {
        setState((prevState) => ({ ...prevState, isFormOpen: false, selectedItem: undefined }));
    };

    const handleSubmitForm = (formData: any) => {
        const processedData = {
            specialty: formData.specialization,
            name: `${formData.firstName ? formData.firstName + ' ' : ''}${formData.lastName}`,
            phone: formData.phone,
            specialtyColor: 'text-red-500',
            ...formData,
        };

        if (selectedItem) {
            setData((prevState) => prevState.map((doc) => (doc.id === selectedItem.id ? { ...doc, ...processedData } : doc)));
        } else {
            const newDoctor = { ...processedData, id: `doctor-${Date.now()}`, specialtyColor: 'text-red-500' };
            setData((prevState) => [newDoctor, ...prevState]);
        }
        handleCloseForm();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{trans.dashboard.doctors.title}</h1>
                        <p className="text-gray-600 text-sm">{trans.dashboard.doctors.subTitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-1 lg:flex-none cursor-pointer">
                    <button
                        onClick={() => handleOpenForm()}
                        className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                        <Plus size={20} />
                        {trans.dashboard.doctors.addButton}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {currentItems.map((doctor) => (
                    <div
                        key={doctor.id}
                        onClick={() => handleOpenForm(doctor)}
                        className="flex items-center p-6 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mr-6 flex-shrink-0 shadow-md">
                            <div className="relative">
                                <User size={28} className="text-white" />
                                <Stethoscope size={14} className="text-cyan-300 absolute -bottom-1 -right-1 drop-shadow-sm" />
                            </div>
                        </div>

                        <div className="flex-1">
                            <div
                                className={`text-sm font-medium mb-1 ${doctor.specialtyColor} bg-gradient-to-r from-red-100 to-pink-100 px-2 py-1 rounded-full inline-block w-fit`}>
                                {doctor.specialty}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">{doctor.name}</h3>
                            <div className="flex items-center text-gray-600">
                                <Phone size={16} className="mr-2 text-cyan-500" />
                                <span className="font-medium">{doctor.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
                <button
                    onClick={() => setState((prevState) => ({ ...prevState, currentPage: Math.max(prevState.currentPage - 1, 1) }))}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                    <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setState((prevState) => ({ ...prevState, currentPage: i + 1 }))}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                currentPage === i + 1
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-cyan-600 hover:bg-gray-100'
                            }`}>
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() =>
                        setState((prevState) => ({ ...prevState, currentPage: Math.min(prevState.currentPage + 1, totalPages) }))
                    }
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                    <ChevronRight size={20} />
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-110 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                    isFormOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <DashboardDoctorForm data={selectedItem} id={selectedItem?.id} onAdd={handleSubmitForm} onClose={handleCloseForm} />
            </div>
        </div>
    );
};

export default DashboardDoctorsPage;
