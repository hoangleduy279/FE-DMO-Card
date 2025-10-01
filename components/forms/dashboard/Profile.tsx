'use client';
import { images } from '@utils/constants';
import { Camera, CheckCircle, Eye, EyeOff, MapPin, Phone, Trash2, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

const DashboardProfileForm: IDashboardProfileComponent<IDashboardProfileComponentProps> = () => {
    const [state, setState] = useState<IDashboardProfileComponentState>({
        profileImage: images.LATEST_IMAGE_2,
        dragActive: false,
        uploadedFiles: [],
        contacts: [
            {
                id: 1,
                name: 'De Spiegelaar Marc',
                phone: '0475/ 67 34 12',
                relationship: 'Époux',
            },
            {
                id: 2,
                name: 'Dessange Katy',
                phone: '0476/ 90 34 90',
                relationship: 'Mère',
            },
            {
                id: 3,
                name: 'Lerieux Jaques',
                phone: '0467/ 67 09 12',
                relationship: 'Père',
            },
            {
                id: 4,
                name: 'Lerieux Sophie',
                phone: '0488/ 12 88 99',
                relationship: 'Sœur',
            },
            {
                id: 5,
                name: '',
                phone: '',
                relationship: '',
            },
        ],
    });
    const { profileImage, uploadedFiles, dragActive, contacts } = state;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setState((prevState) => ({
                    ...prevState,
                    profileImage: e.target?.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setState((prevState) => ({ ...prevState, dragActive: true }));
        } else if (e.type === 'dragleave') {
            setState((prevState) => ({ ...prevState, dragActive: false }));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setState((prevState) => ({ ...prevState, dragActive: false }));

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileSelect = (e?: React.ChangeEvent<HTMLInputElement>) => {
        const files = e ? Array.from(e.target.files || []) : fileInputRef.current?.files ? Array.from(fileInputRef.current.files) : [];
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFiles = (files: File[]) => {
        const newFiles: UploadedFile[] = files.map((file) => ({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'uploading' as const,
            uploadProgress: 0,
        }));

        setState((prevState) => ({
            ...prevState,
            uploadedFiles: [...(prevState.uploadedFiles || []), ...newFiles],
        }));

        newFiles.forEach((newFile) => {
            simulateUpload(newFile.id);
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const simulateUpload = (fileId: string) => {
        const timer = setInterval(() => {
            setState((prevState) => {
                const updatedFiles = (prevState.uploadedFiles || []).map((file) =>
                    file.id === fileId ? { ...file, uploadProgress: Math.min(file.uploadProgress + 20, 80) } : file,
                );
                return { ...prevState, uploadedFiles: updatedFiles };
            });
        }, 500);

        setTimeout(() => {
            clearInterval(timer);
            setState((prevState) => {
                const updatedFiles = (prevState.uploadedFiles || []).map((file) =>
                    file.id === fileId ? { ...file, uploadProgress: 100, status: 'completed' as const } : file,
                );
                return { ...prevState, uploadedFiles: updatedFiles };
            });
        }, 3000);
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type === 'application/pdf') return '📄';
        if (type.includes('word') || type.includes('document')) return '📝';
        if (type.includes('excel') || type.includes('sheet')) return '📊';
        return '📁';
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const removeFile = (id: string) => {
        setState((prevState) => ({
            ...prevState,
            uploadedFiles: (prevState.uploadedFiles || []).filter((file) => file.id !== id),
        }));
    };

    return (
        <div className="w-full p-4 bg-white space-y-8">
            {/* Profile Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Profile Information</span>
                </h2>
                <div className="p-6">
                    <div className="bg-white flex flex-col items-center h-[50vh] justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                            {/* Profile Picture Section */}
                            <div className="lg:col-span-1">
                                <div className="space-y-4">
                                    <div className="flex w-100 justify-center">
                                        <div className="relative w-48 h-48 mx-auto lg:mx-0">
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-lg shadow-md"
                                            />
                                            <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                                                <Camera className="text-white" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-gray-800">Change picture</h3>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
                                                Choose File
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500">Upload a picture</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields Section */}
                            <div className="lg:col-span-2">
                                <div className="space-y-6">
                                    {/* First Row - Name Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">First name*</label>
                                            <input
                                                type="text"
                                                defaultValue="Sophie"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Name*</label>
                                            <input
                                                type="text"
                                                defaultValue="De Spiegelaar"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Sex</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Second Row - Birth Date and Place */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Birth date <span className="text-xs text-gray-500">(JJ/MM/AAAA)</span>*
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="17/01/1989"
                                                placeholder="DD/MM/YYYY"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Birth place*</label>
                                            <input
                                                type="text"
                                                defaultValue="Bruxelles"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Third Row - Physical Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Size <span className="text-xs text-gray-500">(in cm)</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    defaultValue="173"
                                                    className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-500 text-sm">cm</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Weight <span className="text-xs text-gray-500">(in kg)</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    defaultValue="65"
                                                    className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-500 text-sm">kg</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Are you an organ donor?</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                                <option value="unknown">Unknown</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Fourth Row - Nationality and Language */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Nationality</label>
                                            <input
                                                type="text"
                                                defaultValue="Belge"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Mother tongue</label>
                                            <input
                                                type="text"
                                                defaultValue="Français"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Medical Data Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Personal Medical Data</span>
                </h2>
                <div className="p-6 space-y-6">
                    {/* First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Blood group</label>
                            <div className="relative">
                                <select
                                    // value={formData.bloodGroup}
                                    // onChange={(e) => handleSelectChange('bloodGroup', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Do you accept a blood transfusion?</label>
                            <div className="relative">
                                <select
                                    // value={formData.bloodTransfusion}
                                    // onChange={(e) => handleSelectChange('bloodTransfusion', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Can you be intubated?</label>
                            <div className="relative">
                                <select
                                    // value={formData.canBeIntubated}
                                    // onChange={(e) => handleSelectChange('canBeIntubated', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Are you left or right hand?</label>
                            <div className="relative">
                                <select
                                    // value={formData.handedness}
                                    // onChange={(e) => handleSelectChange('handedness', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                                    <option value="Right">Right</option>
                                    <option value="Left">Left</option>
                                    <option value="Ambidextrous">Ambidextrous</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Do you have any vision disorder?</label>
                            <div className="relative">
                                <select
                                    // value={formData.visionDisorder}
                                    // onChange={(e) => handleSelectChange('visionDisorder', e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Partially">Partially</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insurance Data Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Insurance Data</span>
                </h2>
                <div className="p-6 space-y-8">
                    {/* Mutual Insurance */}
                    <div className="space-y-6">
                        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Mutual Insurance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Name of your mutual:</label>
                                <input
                                    type="text"
                                    // value={formData.mutualName}
                                    // onChange={(e) => handleInputChange('mutualName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Affiliate number:</label>
                                <input
                                    type="text"
                                    // value={formData.mutualAffiliate}
                                    // onChange={(e) => handleInputChange('mutualAffiliate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone number:</label>
                                <input
                                    type="text"
                                    // value={formData.mutualPhone}
                                    // onChange={(e) => handleInputChange('mutualPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hospital Insurance */}
                    <div className="space-y-6">
                        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Hospital Insurance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Name of your hospital insurance:</label>
                                <input
                                    type="text"
                                    // value={formData.hospitalName}
                                    // onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Affiliate number:</label>
                                <input
                                    type="text"
                                    // value={formData.hospitalAffiliate}
                                    // onChange={(e) => handleInputChange('hospitalAffiliate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone number:</label>
                                <input
                                    type="text"
                                    // value={formData.hospitalPhone}
                                    // onChange={(e) => handleInputChange('hospitalPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Travel Insurance */}
                    <div className="space-y-6">
                        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Travel Insurance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Name of your travel insurance:</label>
                                <input
                                    type="text"
                                    // value={formData.travelName}
                                    // onChange={(e) => handleInputChange('travelName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Affiliate number:</label>
                                <input
                                    type="text"
                                    // value={formData.travelAffiliate}
                                    // onChange={(e) => handleInputChange('travelAffiliate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone number:</label>
                                <input
                                    type="text"
                                    // value={formData.travelPhone}
                                    // onChange={(e) => handleInputChange('travelPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Other Insurances */}
                    <div className="space-y-2">
                        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Other Insurances</h3>
                        <label className="block text-sm font-medium text-gray-700">Other insurances:</label>
                        <textarea
                            rows={6}
                            // value={formData.otherInsurances}
                            // onChange={(e) => handleInputChange('otherInsurances', e.target.value)}
                            placeholder="Please, in details:"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                        />
                    </div>
                </div>
            </div>

            {/* Password Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-purple-50 to-violet-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Password Management</span>
                </h2>
                <div className="p-6 space-y-6">
                    {/* Email Address - Read Only */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            // value={formData.email}
                            readOnly={true}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Old Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Old password</label>
                        <div className="relative">
                            <input
                                // type={showPasswords.old ? 'text' : 'password'}
                                // value={formData.oldPassword}
                                // onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                                placeholder="Old password"
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                // onClick={() => togglePasswordVisibility('old')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {true ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">New password</label>
                        <div className="relative">
                            <input
                                // type={showPasswords.new ? 'text' : 'password'}
                                // value={formData.newPassword}
                                // onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                placeholder="New password"
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                // onClick={() => togglePasswordVisibility('new')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {true ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Confirm the new password</label>
                        <div className="relative">
                            <input
                                // type={showPasswords.confirm ? 'text' : 'password'}
                                // value={formData.confirmPassword}
                                // onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                placeholder="Confirm the new password"
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                // onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {true ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                            {/* {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                                <p className="text-sm text-red-600">Passwords do not match</p>
                            )} */}
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• At least 8 characters long</li>
                            <li>• Contains at least one uppercase letter</li>
                            <li>• Contains at least one lowercase letter</li>
                            <li>• Contains at least one number</li>
                            <li>• Contains at least one special character</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Postal Address Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Postal Address</span>
                </h2>
                <div className="p-6 space-y-6">
                    {/* Address */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            // value={formData.address}
                            // onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Post Code and City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Post Code</label>
                            <input
                                type="text"
                                // value={formData.postCode}
                                // onChange={(e) => handleInputChange('postCode', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                // value={formData.city}
                                // onChange={(e) => handleInputChange('city', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            // value={formData.country}
                            // onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Tel.</label>
                            <input
                                type="tel"
                                // value={formData.telephone}
                                // onChange={(e) => handleInputChange('telephone', e.target.value)}
                                placeholder="02/876 34 12"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">FAX</label>
                            <input
                                type="tel"
                                // value={formData.fax}
                                // onChange={(e) => handleInputChange('fax', e.target.value)}
                                placeholder="FAX"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Additional Address Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">Address Guidelines:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Please provide your complete postal address</li>
                            <li>• Ensure the post code matches your city</li>
                            <li>• Use the standard format for your country</li>
                            <li>• Include apartment/suite number if applicable</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Contact Persons Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Contact Persons</span>
                </h2>
                <div className="p-6 space-y-6">
                    {contacts?.map((contact, index) => (
                        <div key={contact.id} className="relative">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Name/First name</label>
                                    <input
                                        type="text"
                                        value={contact.name}
                                        // onChange={(e) => handleInputChange(contact.id, 'name', e.target.value)}
                                        placeholder="Name/First name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Phone number</label>
                                    <input
                                        type="tel"
                                        value={contact.phone}
                                        // onChange={(e) => handleInputChange(contact.id, 'phone', e.target.value)}
                                        placeholder="Phone number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Relationship Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Link</label>
                                    <select
                                        value={contact.relationship}
                                        // onChange={(e) => handleInputChange(contact.id, 'relationship', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="">Select relationship</option>
                                        <option value="Époux">Époux (Spouse)</option>
                                        <option value="Épouse">Épouse (Spouse)</option>
                                        <option value="Mère">Mère (Mother)</option>
                                        <option value="Père">Père (Father)</option>
                                        <option value="Sœur">Sœur (Sister)</option>
                                        <option value="Frère">Frère (Brother)</option>
                                        <option value="Fils">Fils (Son)</option>
                                        <option value="Fille">Fille (Daughter)</option>
                                        <option value="Ami(e)">Ami(e) (Friend)</option>
                                        <option value="Collègue">Collègue (Colleague)</option>
                                        <option value="Autre">Autre (Other)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact Priority Badge */}
                            {index < 4 && (
                                <div className="absolute -top-2 left-4 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                    Priority {index + 1}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Treating Doctor Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Treating Doctor</span>
                </h2>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <User className="inline w-4 h-4 mr-1" />
                                Doctor name
                            </label>
                            <input
                                type="text"
                                // value={doctor.name}
                                // onChange={(e) => handleInputChange(doctor.id, 'name', e.target.value)}
                                placeholder="Dr. Full Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <MapPin className="inline w-4 h-4 mr-1" />
                                City (Country)
                            </label>
                            <input
                                type="text"
                                // value={doctor.city}
                                // onChange={(e) => handleInputChange(doctor.id, 'city', e.target.value)}
                                placeholder="City, Country"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <Phone className="inline w-4 h-4 mr-1" />
                                Phone number
                            </label>
                            <input
                                type="tel"
                                // value={doctor.phone}
                                // onChange={(e) => handleInputChange(doctor.id, 'phone', e.target.value)}
                                placeholder="Phone number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Confirm</span>
                </h2>
                <div className="p-6">
                    <button
                        className="cursor-pointer w-40  text-white py-3 rounded-lg font-medium transition-colors focus:outline-none bg-gradient-to-br from-cyan-500 to-blue-300 shadow-md"
                        onClick={() => {
                            // Implement confirm logic here
                            console.log('Confirm changes');
                        }}>
                        Confirm Changes
                    </button>
                </div>
            </div>

            {/* Documents Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Documents</span>
                </h2>
                <div className="p-6 space-y-6">
                    {/* Upload Area */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Add documents</label>

                        <div
                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <div className="space-y-2">
                                <p className="text-lg text-gray-600">Drag and drop files here, or click to select</p>
                                <p className="text-sm text-gray-500">Supports: PDF, DOC, DOCX, JPG, PNG, XLS, XLSX (Max 10MB each)</p>
                            </div>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                                <Upload className="w-4 h-4 mr-2" />
                                Choose Files
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {uploadedFiles && uploadedFiles.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium text-gray-800">Uploaded Documents</h3>

                            {uploadedFiles.map((file) => (
                                <div key={file.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <span className="text-2xl">{getFileIcon(file.type)}</span>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                            </div>

                                            {file.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            {/* Button remove: Gắn removeFile (không phải 3 func kia) */}
                                            <button
                                                type="button"
                                                onClick={() => removeFile(file.id)}
                                                className="p-1 text-red-400 hover:text-red-600 cursor-pointer"
                                                title="Remove">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Progress Bar - Render từ state, không gắn func */}
                                    {file.status === 'uploading' && (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                <span>Uploading...</span>
                                                <span>{file.uploadProgress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${file.uploadProgress}%` }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Document Categories */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <h4 className="text-sm font-medium text-yellow-800 mb-2">Recommended Documents:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Identity Card / Passport</li>
                                <li>• Health Insurance Card</li>
                                <li>• Medical prescriptions</li>
                                <li>• Vaccination records</li>
                            </ul>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Emergency contact information</li>
                                <li>• Medical history documents</li>
                                <li>• Allergy information</li>
                                <li>• Current medication list</li>
                            </ul>
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            </div>
                            <div className="text-sm text-blue-700">
                                <strong>Privacy & Security:</strong> All uploaded documents are encrypted and stored securely. Access is
                                limited to authorized medical personnel only. You can remove any document at any time.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfileForm;
