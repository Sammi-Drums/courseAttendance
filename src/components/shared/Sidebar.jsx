import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, UserCheck, History,
    Settings, LogOut, X, GraduationCap
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard/student' },
        { name: 'Mark Attendance', icon: <UserCheck size={20} />, path: '/dashboard/student/check-in' },
        { name: 'My History', icon: <History size={20} />, path: '/dashboard/student/history' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/student/settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-transform duration-300 w-64 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-600">
                        <GraduationCap size={32} weight="bold" />
                        <span className="text-xl font-bold tracking-tight text-slate-800">Attendly</span>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden text-slate-500">
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => { navigate(item.path); if (window.innerWidth < 768) toggleSidebar(); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                  ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-8 w-full px-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-all">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;