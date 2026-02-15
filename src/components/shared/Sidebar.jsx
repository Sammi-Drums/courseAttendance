// src/components/shared/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, UserCheck, History, Settings,
    LogOut, X, GraduationCap, ShieldAlert, Users, Map
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, role = "admin" }) => { // Role added as a prop
    const navigate = useNavigate();
    const location = useLocation();

    // Define menus for each role
    const menus = {
        student: [
            { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard/student' },
            { name: 'Mark Attendance', icon: <UserCheck size={20} />, path: '/dashboard/student/check-in' },
            { name: 'My History', icon: <History size={20} />, path: '/dashboard/student/history' },
        ],
        lecturer: [
            { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard/lecturer' },
            { name: 'Class Sessions', icon: <Users size={20} />, path: '/dashboard/lecturer/sessions' },
        ],
        admin: [
            { name: 'Admin Home', icon: <LayoutDashboard size={20} />, path: '/dashboard/admin' },
            { name: 'User Management', icon: <Users size={20} />, path: '/dashboard/admin/users' },
            { name: 'System Settings', icon: <Map size={20} />, path: '/dashboard/admin/settings' },
        ]
    };

    const currentMenu = menus[role] || menus.student;

    return (
        <>
            <aside className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-transform duration-300 w-64 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl md:shadow-none`}>

                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                    <div className="flex items-center gap-2 text-blue-600">
                        <GraduationCap size={32} className="fill-blue-600/10" />
                        <span className="text-xl font-black tracking-tighter text-slate-800 italic">ATTENDLY</span>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden text-slate-500"><X size={24} /></button>
                </div>

                <nav className="mt-8 px-4 space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2">Main Menu</p>
                    {currentMenu.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => { navigate(item.path); if (window.innerWidth < 768) toggleSidebar(); }}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200
                  ${isActive
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 translate-x-1'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-8 w-full px-4 border-t border-slate-100 pt-6">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
                        <LogOut size={20} />
                        <span className="text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;