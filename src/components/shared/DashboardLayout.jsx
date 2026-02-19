import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Sun, Moon, Bell, User, PanelLeftClose, PanelLeft } from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
    const [isCollapsed, setIsCollapsed] = useState(false); // Desktop mini-mode
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen flex bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* <div className="bg-white dark:bg-[#0f172a] transition-colors"></div> */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    isCollapsed={isCollapsed}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    role={role}
                />

                {/* Dynamic Margin: Adjusts when sidebar is big or small */}
                <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out 
                ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>

                    <header className="h-16 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40">
                        <div className="flex items-center gap-4">
                            {/* Sidebar Collapse Toggle */}
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="hidden md:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
                            >
                                {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2">
                                <PanelLeft size={22} />
                            </button>

                            <h2 className="font-bold text-slate-800 dark:text-white capitalize tracking-tight">
                                {role} <span className="text-blue-600">Portal</span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-slate-200 dark:ring-slate-700 transition-all"
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {/* Notifications */}
                            <button className="p-2.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all relative">
                                <Bell size={18} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
                            </button>

                            {/* Profile Wrapper */}
                            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
                                <div className="hidden sm:block text-right">
                                    <p className="text-xs font-black text-slate-900 dark:text-white leading-none">Sammi Drumz</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Level 400</p>
                                </div>
                                <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none cursor-pointer hover:scale-105 transition-transform">
                                    <User size={18} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;