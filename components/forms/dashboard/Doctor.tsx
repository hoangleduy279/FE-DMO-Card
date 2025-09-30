'use client';
import React, { useEffect, useState } from 'react';

const DashboardDoctorForm: IDashboardDoctorComponent<IDashboardDoctorComponentProps> = (props) => {
    const { id, onAdd, onClose, data } = props;

    const [state, setState] = useState<IDashboardDoctorComponentState>({
        specialization: '',
        firstName: '',
        lastName: '',
        hospitalOffice: '',
        place: '',
        country: '',
        phone: '',
        email: '',
    });
    const { specialization, firstName, lastName, hospitalOffice, phone, place, country, email } = state;
    const isEdit = !!id;
    useEffect(() => {
        if (data) {
            setState({
                specialization: data.specialization || '',
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                hospitalOffice: data.hospitalOffice || '',
                place: data.place || '',
                country: data.country || '',
                phone: data.phone || '',
                email: data.email || '',
            });
        }
    }, [data]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log('Doctor data:', state);
        if (onAdd) onAdd(state);
        if (!id) {
            // Reset for add mode
            setState({
                specialization: '',
                firstName: '',
                lastName: '',
                hospitalOffice: '',
                place: '',
                country: '',
                phone: '',
                email: '',
            });
        }
        if (onClose) onClose();
    };

    const handleClose = () => {
        if (onClose) onClose();
    };

    const specializationOptions = [
        'Select a specialty',
        'Anaesthetist',
        'Cardiologist',
        'Surgeon',
        'Dentist',
        'General practitioner',
        'Neurologist',
        'Paediatrician',
        'Psychiatrist',
    ];

    return (
        <div className="h-[100vh]">
            <div className="bg-white shadow-xl w-full max-w-xl max-h-[100vh] overflow-hidden border border-teal-100">
                {/* Header */}
                <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 px-8 py-6 border-b border-teal-100">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-teal-900">{isEdit ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                                <p className="text-sm text-teal-600">Complete the form below</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-teal-600 hover:bg-teal-100 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8 overflow-y-auto lg:h-[72vh] 2xl:h-[80vh] bg-gradient-to-b from-white to-teal-50/30">
                    <div className="space-y-6">
                        {/* Specialization */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                    />
                                </svg>
                                Specialization
                            </label>
                            <select
                                name="specialization"
                                value={specialization}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 cursor-pointer text-slate-700 hover:border-teal-200">
                                {specializationOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                        </div>

                        {/* Hospital/Office */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                Hospital/Office
                            </label>
                            <input
                                type="text"
                                name="hospitalOffice"
                                value={hospitalOffice}
                                onChange={handleChange}
                                placeholder="Enter hospital or office name"
                                className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                            />
                        </div>

                        {/* Address and Country */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="place"
                                    value={place}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={country}
                                    onChange={handleChange}
                                    placeholder="Enter country"
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                        </div>

                        {/* Phone and Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-t border-teal-100 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2.5 bg-white border-2 border-teal-200 rounded-xl font-semibold text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200 shadow-sm">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {isEdit ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                    {isEdit && (
                        <button
                            // onClick={handleDelete}
                            className="px-3 py-2.5 bg-white border-2 border-red-200 rounded-xl text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm flex items-center justify-center"
                            title="Delete Intervention">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardDoctorForm;
