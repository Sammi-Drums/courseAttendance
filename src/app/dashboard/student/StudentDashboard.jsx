import React from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';

const StudentDashboard = () => {
    const userName = "Sammi-Drumz";

    return (
        <DashboardLayout role="student">
            {/* NO MORE SIDEBAR OR HEADER CODE HERE - It's already in the Layout! */}
            <main className="p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hello, {userName}! 👋</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Here is what's happening with your attendance today.</p>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Classes" value="42" icon={<Calendar className="text-blue-600" />} color="bg-blue-50 dark:bg-blue-900/20" />
                    <StatCard title="Attended" value="38" icon={<CheckCircle className="text-green-600" />} color="bg-green-50 dark:bg-green-900/20" />
                    <StatCard title="Current Location" value="On Campus" icon={<MapPin className="text-amber-600" />} color="bg-amber-50 dark:bg-amber-900/20" />
                </div>

                {/* Quick Action & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Quick Check-in</h3>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Are you in class right now?</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                                Open Scanner
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Recent Classes</h3>
                        <div className="space-y-4">
                            <ActivityItem subject="Software Engineering" status="Present" time="09:00 AM" />
                            <ActivityItem subject="Database Systems" status="Late" time="11:30 AM" />
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const ActivityItem = ({ subject, status, time }) => (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
        <div>
            <p className="font-semibold text-slate-800 dark:text-white">{subject}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{time}</p>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>{status}</span>
    </div>
);

export default StudentDashboard;