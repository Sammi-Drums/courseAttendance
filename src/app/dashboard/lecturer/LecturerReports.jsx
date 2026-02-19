import React from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { FileDown, Filter, Calendar, Users, BarChart3 } from 'lucide-react';

const LecturerReports = () => {
    const reportData = [
        { id: 1, course: "Software Engineering", date: "Feb 18, 2026", total: 120, present: 112, rate: "93%" },
        { id: 2, course: "Database Systems", date: "Feb 17, 2026", total: 120, present: 98, rate: "81%" },
        { id: 3, course: "Software Engineering", date: "Feb 15, 2026", total: 120, present: 115, rate: "95%" },
    ];

    return (
        <DashboardLayout role="lecturer">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Attendance Reports</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Analyze and export classroom attendance data.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none transition-all">
                        <FileDown size={18} /> Export CSV
                    </button>
                </div>

                {/* Analytical Mini-Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ReportStat label="Avg. Attendance" value="89.4%" icon={<BarChart3 size={20} />} color="text-blue-600" />
                    <ReportStat label="Total Sessions" value="24" icon={<Calendar size={20} />} color="text-indigo-600" />
                    <ReportStat label="Unique Students" value="142" icon={<Users size={20} />} color="text-emerald-600" />
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-colors">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 dark:text-white">Recent Sessions</h3>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <Filter size={18} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <th className="px-8 py-4">Course Name</th>
                                    <th className="px-8 py-4">Date</th>
                                    <th className="px-8 py-4">Students</th>
                                    <th className="px-8 py-4">Rate</th>
                                    <th className="px-8 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {reportData.map((report) => (
                                    <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-8 py-5 font-bold text-slate-800 dark:text-slate-100">{report.course}</td>
                                        <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-400">{report.date}</td>
                                        <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{report.present}</span>/{report.total}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: report.rate }}></div>
                                                </div>
                                                <span className="text-xs font-black text-slate-600 dark:text-slate-300">{report.rate}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View Details</button>
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

const ReportStat = ({ label, value, icon, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors flex items-center gap-4">
        <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 ${color}`}>{icon}</div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

export default LecturerReports;