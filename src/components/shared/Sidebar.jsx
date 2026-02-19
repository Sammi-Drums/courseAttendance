import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, UserCheck, History, LogOut,
    X, GraduationCap, Users, Map, ShieldCheck, FileText
} from 'lucide-react';

const Sidebar = ({ isOpen, isCollapsed, toggleSidebar, role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menus = {
        student: [
            { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard/student' },
            { name: 'Attendance', icon: <UserCheck size={22} />, path: '/dashboard/student/check-in' },
            { name: 'History', icon: <History size={22} />, path: '/dashboard/student/history' },
        ],
        lecturer: [
            { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard/lecturer' },
            { name: 'Live Class', icon: <Users size={22} />, path: '/dashboard/lecturer/sessions' },
            { name: 'Reports', icon: <FileText size={22} />, path: '/dashboard/lecturer/reports' },
        ],
        admin: [
            { name: 'Admin Home', icon: <ShieldCheck size={22} />, path: '/dashboard/admin' },
            { name: 'Matricules', icon: <Users size={22} />, path: '/dashboard/admin/matricules' },
            { name: 'Geofence', icon: <Map size={22} />, path: '/dashboard/admin/settings' },
        ]
    };

    const currentMenu = menus[role] || menus.student;

    return (
        <aside className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out
      bg-[#0f172a] text-slate-400 border-r border-slate-800
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0 
      ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}>

            {/* Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800 overflow-hidden">
                <div className="flex items-center gap-3 min-w-max">
                    <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                        <GraduationCap size={24} />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-black tracking-tighter text-white italic">ATTENDLY</span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-3 space-y-2">
                {currentMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`w-full group relative flex items-center gap-4 p-3 rounded-xl transition-all
                ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <div className="min-w-[24px]">{item.icon}</div>

                            {/* Text - Hidden when collapsed */}
                            {!isCollapsed && (
                                <span className="text-sm font-bold whitespace-nowrap opacity-100 transition-opacity duration-300">
                                    {item.name}
                                </span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-16 scale-0 group-hover:scale-100 transition-transform origin-left bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-md shadow-xl border border-slate-700 pointer-events-none z-50">
                                    {item.name}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-6 w-full px-3">
                <button className="w-full flex items-center gap-4 p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all overflow-hidden">
                    <div className="min-w-[24px]"><LogOut size={22} /></div>
                    {!isCollapsed && <span className="text-sm font-bold">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;