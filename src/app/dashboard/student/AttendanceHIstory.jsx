import React from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { Calendar, CheckCircle, XCircle, FileText } from 'lucide-react';

const AttendanceHistory = () => {
    const history = [
        { id: 1, course: "Software Engineering", date: "Feb 18, 2026", time: "09:05 AM", status: "Present" },
        { id: 2, course: "Database Systems", date: "Feb 17, 2026", time: "11:40 AM", status: "Late" },
        { id: 3, course: "Computer Networks", date: "Feb 16, 2026", time: "---", status: "Absent" },
    ];

    return (
        <DashboardLayout role="student">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Attendance History</h1>
                    <button className="text-sm font-bold text-blue-600 flex items-center gap-2">
                        <FileText size={18} /> Export PDF
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SummaryCard label="Attendance Rate" value="92%" color="text-blue-600" />
                    <SummaryCard label="Total Present" value="24" color="text-green-600" />
                    <SummaryCard label="Total Absent" value="2" color="text-red-500" />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900/50">
                                <tr className="text-[10px] font-black uppercase text-slate-400">
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {history.map((row) => (
                                    <tr key={row.id} className="text-sm">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{row.course}</td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.date}</td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.time}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${row.status === 'Present' ? 'bg-green-100 text-green-700' :
                                                    row.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const SummaryCard = ({ label, value, color }) => (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{label}</p>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
);

export default AttendanceHistory;