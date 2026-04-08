import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';

import {
    Users, Timer, RefreshCw, StopCircle,
    CheckCircle2, AlertTriangle, Crown
} from 'lucide-react';

const LiveClass = () => {
    const [code, setCode] = useState('521 094');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [attendees, setAttendees] = useState([
        { id: 1, name: "Ambe Divine", matric: "FE20A001", time: "10:02 AM", status: "on-time" },
        { id: 2, name: "Sonia Belibi", matric: "FE20A045", time: "10:04 AM", status: "on-time" },
        { id: 3, name: "Musa John", matric: "FE20A012", time: "10:07 AM", status: "late" },
    ]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const generateNewCode = () => {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCode(`${newCode.slice(0, 3)} ${newCode.slice(3)}`);
        setTimeLeft(300);
    };

    return (
        <DashboardLayout role="lecturer">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-120px)]">

                {/* LEFT COLUMN: BROADCAST (8 Cols) */}
                <div className="lg:col-span-8 space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 p-10 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl shadow-blue-500/5">
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

                        <div className="space-y-2 mb-8">
                            <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest">
                                Active Session: Software Engineering
                            </span>
                            <h2 className="text-slate-400 dark:text-slate-500 font-medium">Project this screen for students</h2>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-slate-900 dark:text-white font-mono leading-none">
                                {code}
                            </h1>
                        </div>

                        <div className="mt-12 flex items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Time Remaining</p>
                                <div className="flex items-center gap-2 text-2xl font-mono font-bold text-slate-700 dark:text-slate-200">
                                    <Timer size={20} className="text-indigo-600" />
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                            <button
                                onClick={generateNewCode}
                                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:opacity-70 transition-opacity"
                            >
                                <RefreshCw size={18} /> Regenerate Code
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Bar */}
                    <div className="grid grid-cols-3 gap-4">
                        <LiveStat label="Present" value={attendees.length} color="text-emerald-500" />
                        <LiveStat label="Expected" value="120" color="text-slate-400" />
                        <LiveStat label="Late" value="1" color="text-amber-500" />
                    </div>
                </div>

                {/* RIGHT COLUMN: LIVE FEED (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 flex-1 flex flex-col overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                <h3 className="font-bold text-slate-800 dark:text-white">Live Attendance</h3>
                            </div>
                            <Users size={18} className="text-slate-400" />
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {attendees.map((student) => (
                                <div key={student.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:border-indigo-500/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm font-black text-xs text-indigo-600">
                                            {student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{student.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{student.matric} • {student.time}</p>
                                        </div>
                                    </div>
                                    {student.status === 'on-time' ? (
                                        <CheckCircle2 size={18} className="text-emerald-500" />
                                    ) : (
                                        <AlertTriangle size={18} className="text-amber-500" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-200 dark:shadow-none transition-all">
                                <StopCircle size={20} /> End Session & Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const LiveStat = ({ label, value, color }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
        <p className={`text-2xl font-black ${color}`}>{value}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
);

export default LiveClass;