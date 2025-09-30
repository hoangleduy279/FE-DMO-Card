'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, User, Phone, Stethoscope } from 'lucide-react';
import {
    IDashboardDoctorPage,
    IDashboardDoctorPageProps,
    IDashboardDoctorPageState,
} from '@interfaces/apps/dasboard/doctor/dashboardDoctors';
import DashboardDoctorForm from '@components/forms/dashboard/Doctor';

// Dummy data for doctors with unique IDs
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
    const [data, setData] = useState(generateDoctorsData()); // Make mutable
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
        setState((prev) => ({ ...prev, isFormOpen: true, selectedItem: item }));
    };

    const handleCloseForm = () => {
        setState((prev) => ({ ...prev, isFormOpen: false, selectedItem: undefined }));
    };

    const handleSubmitForm = (formData: any) => {
        // Process form data (map to dummy structure)
        const processedData = {
            specialty: formData.specialization,
            name: `${formData.firstName ? formData.firstName + ' ' : ''}${formData.lastName}`,
            phone: formData.phone,
            specialtyColor: 'text-red-500', // Keep default
            // Add other fields if needed (hospitalOffice, etc.)
            ...formData,
        };

        if (selectedItem) {
            // Update existing
            setData((prev) => prev.map((doc) => (doc.id === selectedItem.id ? { ...doc, ...processedData } : doc)));
        } else {
            // Add new
            const newDoctor = { ...processedData, id: `doctor-${Date.now()}`, specialtyColor: 'text-red-500' };
            setData((prev) => [newDoctor, ...prev]); // Add to top
        }
        handleCloseForm();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">LIST OF DOCTORS OF SOPHIE DE SPIEGELAAR</h1>
                <button
                    onClick={() => handleOpenForm()} // Add new: no item
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    Add a doctor
                </button>
            </div>

            {/* Doctors List */}
            <div className="bg-white rounded-lg shadow-sm">
                {currentItems.map((doctor) => (
                    <div
                        key={doctor.id} // Use id
                        onClick={() => handleOpenForm(doctor)} // Click to edit
                        className="flex items-center p-6 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors">
                        {/* Doctor Avatar */}
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <div className="relative">
                                <User size={28} className="text-white" />
                                <Stethoscope size={14} className="text-white absolute -bottom-1 -right-1" />
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                            <div className={`text-sm font-medium mb-1 ${doctor.specialtyColor}`}>{doctor.specialty}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                            <div className="flex items-center text-gray-600">
                                <Phone size={16} className="mr-2" />
                                <span>{doctor.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-4">
                <button
                    onClick={() => setState((prev) => ({ ...prev, currentPage: Math.max(prev.currentPage - 1, 1) }))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setState((prev) => ({ ...prev, currentPage: i + 1 }))}
                            className={`px-3 py-2 rounded-lg ${
                                currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'border border-gray-300 hover:bg-gray-50'
                            }`}>
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setState((prev) => ({ ...prev, currentPage: Math.min(prev.currentPage + 1, totalPages) }))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Slide-in Form */}
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
