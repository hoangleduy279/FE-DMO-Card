'use client';
import { useTrans } from '@utils/hooks';
import React, { useEffect, useState } from 'react';

const DashboardChronologyForm: IDashboardChronologyComponent<IDashboardChronologyComponentProps> = (props) => {
    const { id, onAdd, onClose, data } = props;
    const trans = useTrans();
    const [state, setState] = useState<IDashboardChronologyComponentState>({
        type: '',
        date: '',
        title: '',
        hospital: '',
        doctor: '',
        description: '',
    });
    const { type, date, title, hospital, doctor, description } = state;
    const isEdit = !!id;

    useEffect(() => {
        if (data) {
            setState({
                type: data.type || '',
                date: data.date ? new Date(data.date.split('/').reverse().join('-')).toISOString().split('T')[0] : '',
                title: data.type || '',
                hospital: '',
                doctor: '',
                description: data.description || '',
            });
        }
    }, [data, isEdit]);

    useEffect(() => {
        if (!isEdit) {
            setState({
                type: '',
                date: '',
                title: '',
                hospital: '',
                doctor: '',
                description: '',
            });
        }
    }, [isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (onAdd) onAdd(state);
        setState({
            type: '',
            date: '',
            title: '',
            hospital: '',
            doctor: '',
            description: '',
        });
    };

    const handleClose = () => {
        if (onClose) onClose();
        setState({
            type: '',
            date: '',
            title: '',
            hospital: '',
            doctor: '',
            description: '',
        });
    };

    const typeOptions = ['Select a type', 'Other', 'Hospitalization', 'Disease', 'Operation'];
    const doctorOptions = ['Choose a doctor', 'Dr. Alice Johnson', 'Dr. Bob Smith', 'Dr. Carol Davis', 'Dr. David Wilson'];

    return (
        <div className="h-[100vh]">
            <div className="bg-white shadow-xl w-full max-w-xl max-h-[100vh] overflow-hidden border border-teal-100">
                <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 px-8 py-6 border-b border-teal-100">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-teal-900">{isEdit ? 'EDIT INTERVENTION' : 'ADD AN INTERVENTION'}</h2>
                                <p className="text-sm text-teal-600">{trans.dashboard.chronology.form.note}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-teal-600 hover:bg-teal-100 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 cursor-pointer">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto lg:h-[72vh] 2xl:h-[80vh] bg-gradient-to-b from-white to-teal-50/30">
                    <div className="space-y-6">
                        <div className="flex flex-row items-center grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    {trans.dashboard.chronology.form.type}
                                </label>
                                <select
                                    name="type"
                                    value={type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 cursor-pointer text-slate-700 hover:border-teal-200">
                                    {typeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {trans.dashboard.chronology.form.interventionDate}
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 text-slate-700 hover:border-teal-200"
                                />
                            </div>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                                {trans.dashboard.chronology.form.interventionTitle}
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                placeholder="e.g., Routine cardiac checkup"
                                className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1 space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                {trans.dashboard.chronology.form.hospital}
                            </label>
                            <input
                                type="text"
                                name="hospital"
                                value={hospital}
                                onChange={handleChange}
                                placeholder="e.g., City General Hospital"
                                className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1 space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {trans.dashboard.chronology.form.hospital}
                            </label>
                            <select
                                name="doctor"
                                value={doctor}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 cursor-pointer text-slate-700 hover:border-teal-200">
                                {doctorOptions.map((doctor) => (
                                    <option key={doctor} value={doctor}>
                                        {doctor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                {trans.dashboard.chronology.form.des}
                            </label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={handleChange}
                                placeholder="Provide detailed information about the intervention..."
                                rows={4}
                                className="w-full px-4 py-3 bg-white border-2 border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 resize-y placeholder:text-slate-400 text-slate-700 hover:border-teal-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-8 py-5 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-t border-teal-100 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2.5 bg-white border-2 border-teal-200 rounded-xl font-semibold text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200 shadow-sm">
                        {trans.common.cancel}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {isEdit ? trans.dashboard.chronology.form.updateIntervention : trans.dashboard.chronology.form.addIntervention}
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

export default DashboardChronologyForm;
