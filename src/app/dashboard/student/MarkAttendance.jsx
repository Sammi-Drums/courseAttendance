import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/shared/Sidebar';
import { Menu, MapPin, Key, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useGeofence } from '../../../hooks/useGeofence';

const MarkAttendance = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isInside, verifyLocation, loading } = useGeofence(); // Added loading state to your hook logic
    const [step, setStep] = useState(1);
    const [classCode, setClassCode] = useState('');
    const [status, setStatus] = useState('idle');

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex-1 md:ml-64">
                {/* Modern Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Secure Check-in
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                        <ShieldCheck size={16} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Level 2 Security</span>
                    </div>
                </header>

                <main className="p-6 md:p-12 max-w-4xl mx-auto">
                    {/* Progress Tracker UI */}
                    <div className="flex items-center justify-center mb-12 gap-4">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}>1</div>
                            <span className="hidden sm:inline font-semibold">Campus Arrival</span>
                        </div>
                        <div className="w-12 h-0.5 bg-slate-200"></div>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}>2</div>
                            <span className="hidden sm:inline font-semibold">Class Verification</span>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Background Decorative Blur */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

                        <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white p-8 md:p-12 overflow-hidden">

                            {status === 'success' ? (
                                /* Success View */
                                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900">All Set!</h3>
                                        <p className="text-slate-500 mt-2">Your attendance has been digitally signed and verified.</p>
                                    </div>
                                    <button onClick={() => window.location.href = '/dashboard/student'} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-xl">
                                        Return to Home
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* STEP 1: CAMPUS ENTRY UI */}
                                    {step === 1 && (
                                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                                            <div className="flex flex-col items-center text-center space-y-4">
                                                <div className="relative">
                                                    <div className={`absolute -inset-4 rounded-full opacity-20 animate-ping ${isInside ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                                                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transition-colors duration-500 ${isInside ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                                                        <MapPin size={40} />
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-bold">Step 1: Locate Campus</h3>
                                                <p className="text-slate-500 max-w-xs">We need to verify you are physically at the University before the class code can be used.</p>
                                            </div>

                                            <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${isInside ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-3 h-3 rounded-full ${isInside ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                                        <span className={`font-bold ${isInside ? 'text-green-700' : 'text-slate-500'}`}>
                                                            {isInside ? 'University Detected' : 'Scanning for University...'}
                                                        </span>
                                                    </div>
                                                    <button onClick={verifyLocation} className="p-2 hover:bg-white rounded-lg transition-colors text-blue-600">
                                                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setStep(2)}
                                                disabled={!isInside}
                                                className="group w-full bg-slate-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all duration-300 shadow-xl"
                                            >
                                                Proceed to Class Check-in
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}

                                    {/* STEP 2: CLASS CODE UI */}
                                    {step === 2 && (
                                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                                            <div className="flex flex-col items-center text-center space-y-4">
                                                <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-200">
                                                    <Key size={40} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900">Enter Class Code</h3>
                                                <p className="text-slate-500">Input the 6-digit code displayed on the lecturer's screen.</p>
                                            </div>

                                            <div className="flex justify-center gap-3">
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    value={classCode}
                                                    onChange={(e) => setClassCode(e.target.value)}
                                                    placeholder="••••••"
                                                    className="w-full max-w-[280px] text-center text-5xl font-black tracking-[0.3em] py-6 bg-slate-50 border-b-4 border-slate-200 focus:border-indigo-600 focus:bg-white outline-none transition-all placeholder:text-slate-200 rounded-t-2xl"
                                                />
                                            </div>

                                            <div className="flex gap-4">
                                                <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                                                    Back
                                                </button>
                                                <button
                                                    onClick={() => setStatus('success')}
                                                    className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all transform active:scale-95"
                                                >
                                                    Confirm Attendance
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MarkAttendance;