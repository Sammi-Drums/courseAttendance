import React, { useState } from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { Search, UserPlus, Upload, Trash2, Filter, X, FileText, CheckCircle } from 'lucide-react';

const AdminMatriculeDB = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadStep, setUploadStep] = useState('idle'); // idle, processing, success

    const handleUpload = () => {
        setUploadStep('processing');
        // Simulate a file parse
        setTimeout(() => setUploadStep('success'), 2000);
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                {/* Header with Upload Trigger */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Matricule Database</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Authorized students allowed to use the system.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                            <Upload size={18} /> Bulk Import
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all">
                            <UserPlus size={18} /> Add Student
                        </button>
                    </div>
                </div>

                {/* Existing Table Code here ... (Keep from previous version) */}

                {/* MODAL OVERLAY */}
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <h3 className="font-black text-slate-900 dark:text-white">Bulk Matricule Upload</h3>
                                <button onClick={() => { setIsUploadModalOpen(false); setUploadStep('idle'); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="p-8">
                                {uploadStep === 'idle' ? (
                                    <div
                                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                        onDragLeave={() => setDragActive(false)}
                                        className={`border-4 border-dashed rounded-[2rem] p-10 text-center transition-all
                                            ${dragActive ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-700'}`}
                                    >
                                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <FileText className="text-blue-600" size={32} />
                                        </div>
                                        <h4 className="font-bold text-slate-800 dark:text-white mb-2">Upload CSV or Excel</h4>
                                        <p className="text-xs text-slate-500 mb-6">File should contain: Name, Matricule, Department, Level</p>
                                        <button
                                            onClick={handleUpload}
                                            className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                                        >
                                            Select File
                                        </button>
                                    </div>
                                ) : uploadStep === 'processing' ? (
                                    <div className="py-10 text-center space-y-4">
                                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        <p className="font-bold text-slate-700 dark:text-slate-300">Syncing with Central Database...</p>
                                    </div>
                                ) : (
                                    <div className="py-10 text-center space-y-4 animate-in zoom-in duration-300">
                                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle size={40} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xl text-slate-900 dark:text-white">Success!</h4>
                                            <p className="text-slate-500">245 new matricules have been authorized.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsUploadModalOpen(false)}
                                            className="w-full bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-xl font-bold"
                                        >
                                            Done
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminMatriculeDB;