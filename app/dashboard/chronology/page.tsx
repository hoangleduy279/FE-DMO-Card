'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Stethoscope } from 'lucide-react';
import {
    IDashboardChronologyPage,
    IDashboardChronologyPageProps,
    IDashboardChronologyPageState,
} from '@interfaces/apps/dasboard/chronology/dashboardChronology';
import { DashboardChronologyForm } from '@components/index';

// Dummy data với ID unique
const generateDummyData = () => {
    const operations = [
        { type: 'Opération de la mâchoire', description: 'Recontruction de la mâchoire supérieure', date: '11/07/2019' },
        {
            type: 'Prise en charge suite à un accident',
            description: 'Hospitalisation suite à un accident de la route, multiples fractures.',
            date: '17/09/2018',
        },
        { type: 'Opération du cœur', description: 'Opération à cœur ouvert', date: '30/05/2015' },
        { type: 'Opération du genoux gauche', description: 'Intervention sur les ligaments croisés', date: '12/07/2004' },
        { type: 'Chirurgie orthopédique', description: 'Réparation de fracture du tibia', date: '15/03/2020' },
        { type: 'Appendicectomie', description: "Ablation de l'appendice en urgence", date: '22/11/2017' },
        { type: 'Opération des yeux', description: 'Correction de la myopie par laser', date: '08/04/2016' },
        { type: 'Chirurgie dentaire', description: 'Extraction de dents de sagesse', date: '03/12/2013' },
        { type: 'Opération de la thyroïde', description: 'Thyroïdectomie partielle', date: '19/08/2021' },
        { type: 'Chirurgie du dos', description: 'Discectomie lombaire L4-L5', date: '25/02/2019' },
    ];

    return operations.map((item, index) => ({ ...item, id: `item-${index}` })); // Thêm ID
};

const ITEMS_PER_PAGE = 4;

const DashboardChronologyPage: IDashboardChronologyPage<IDashboardChronologyPageProps> = () => {
    const [data, setData] = useState(generateDummyData());
    const [state, setState] = useState<IDashboardChronologyPageState>({
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
        const processedData = {
            ...formData,
            date: formData.date ? new Date(formData.date).toLocaleDateString('fr-FR') : '',
        };

        if (selectedItem) {
            setData((prev) => prev.map((it) => (it.id === selectedItem.id ? { ...it, ...processedData } : it)));
        } else {
            const newItem = { ...processedData, id: `item-${Date.now()}`, description: formData.description || '' };
            setData((prev) => [newItem, ...prev]);
        }
        handleCloseForm();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">OVERVIEW</h1>
                <button
                    onClick={() => handleOpenForm()}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    Add an intervention
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleOpenForm(item)}
                        className="flex items-start p-6 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center mr-6">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <Stethoscope size={20} className="text-gray-600" />
                            </div>
                            {currentItems.findIndex((i) => i.id === item.id) < currentItems.length - 1 && (
                                <div className="w-0.5 h-16 bg-gray-200"></div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="text-red-500 text-sm font-medium mb-1">{item.date}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.type}</h3>
                            <p className="text-gray-600 italic">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

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

            <div
                className={`fixed top-0 right-0 h-full w-120 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                    isFormOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <DashboardChronologyForm data={selectedItem} id={selectedItem?.id} onAdd={handleSubmitForm} onClose={handleCloseForm} />
            </div>
        </div>
    );
};

export default DashboardChronologyPage;
