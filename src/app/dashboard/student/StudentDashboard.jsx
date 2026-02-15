import React, { useState } from 'react';
import Sidebar from '../../../components/shared/Sidebar';
import { Menu, User, Bell, MapPin, Calendar, CheckCircle } from 'lucide-react';

const StudentDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userName = "Sammi-Drumz"; // This will eventually come from your Auth state

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex-1 md:ml-64 transition-all duration-300">
                {/* Top Navbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-600">
                        <Menu size={24} />
                    </button>

                    <div className="hidden md:block">
                        <h2 className="text-slate-800 font-semibold">Student Portal</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-blue-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">{userName}</span>
                            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                {userName.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-4 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Hello, {userName}! 👋</h1>
                        <p className="text-slate-500 text-sm">Here is what's happening with your attendance today.</p>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <StatCard title="Total Classes" value="42" icon={<Calendar className="text-blue-600" />} color="bg-blue-50" />
                        <StatCard title="Attended" value="38" icon={<CheckCircle className="text-green-600" />} color="bg-green-50" />
                        <StatCard title="Current Location" value="On Campus" icon={<MapPin className="text-amber-600" />} color="bg-amber-50" />
                    </div>

                    {/* Quick Action & Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 text-lg">Quick Check-in</h3>
                            <div className="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-200 text-center">
                                <p className="text-sm text-slate-500 mb-4">Are you in class right now?</p>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md shadow-blue-100">
                                    Open Scanner
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 text-lg">Recent Classes</h3>
                            <div className="space-y-4">
                                <ActivityItem subject="Software Engineering" status="Present" time="09:00 AM" />
                                <ActivityItem subject="Database Systems" status="Late" time="11:30 AM" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Sub-components to keep code clean
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

const ActivityItem = ({ subject, status, time }) => (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
        <div>
            <p className="font-semibold text-slate-800">{subject}</p>
            <p className="text-xs text-slate-500">{time}</p>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>{status}</span>
    </div>
);

export default StudentDashboard;