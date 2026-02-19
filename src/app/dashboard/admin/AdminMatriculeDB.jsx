import React, { useState } from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { Search, UserPlus, Upload, Trash2, Filter } from 'lucide-react';

const AdminMatriculeDB = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const mockStudents = [
        { id: 1, name: "Ambe Erick", matricule: "FE20A001", department: "Software Engineering", level: "400" },
        { id: 2, name: "Musa John", matricule: "FE20A042", department: "Computer Engineering", level: "300" },
    ];

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Matricule Database</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage authorized student records for registration.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl font-bold text-sm">
                            <Upload size={18} /> Bulk Import
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none">
                            <UserPlus size={18} /> Add Student
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or matricule..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 font-bold text-sm">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Matricule</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {mockStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{student.name}</td>
                                    <td className="px-6 py-4 font-mono text-sm text-blue-600 dark:text-blue-400">{student.matricule}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{student.department}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{student.level}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminMatriculeDB;