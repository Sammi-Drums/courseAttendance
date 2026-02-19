import React, { useState } from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { MapPin, ShieldCheck, Lock, Unlock, CheckCircle2, Navigation } from 'lucide-react';

const MarkAttendance = () => {
    // Phases: 'geofence' (Step 1) or 'code' (Step 2)
    const [phase, setPhase] = useState('geofence');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    // Handle 6-digit input
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) element.nextSibling.focus();
    };

    return (
        <DashboardLayout role="student">
            <div className="max-w-xl mx-auto py-10 px-4">

                {/* Visual Progress Stepper */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                    <StepCircle icon={<Navigation size={18} />} active={true} completed={phase === 'code'} label="GPS Check" />
                    <StepCircle icon={<Lock size={18} />} active={phase === 'code'} completed={false} label="Class Code" />
                </div>

                {phase === 'geofence' ? (
                    /* PHASE 1: GEOFENCE VALIDATION */
                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700 shadow-2xl text-center space-y-6">
                        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto border-4 border-blue-100 dark:border-blue-800">
                            <MapPin size={40} className="text-blue-600 animate-bounce" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Validating Location...</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">We are confirming you are within the Hall B boundary.</p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl flex items-center gap-4 border border-green-100 dark:border-green-800">
                            <ShieldCheck className="text-green-600" />
                            <span className="text-sm font-bold text-green-700 dark:text-green-400 text-left">GPS Signal Verified: On Campus</span>
                        </div>

                        <button
                            onClick={() => setPhase('code')}
                            className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl"
                        >
                            <Unlock size={20} /> Proceed to Class Code
                        </button>
                    </div>
                ) : (
                    /* PHASE 2: LECTURER CODE ENTRY */
                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700 shadow-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 transition-all">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Enter Class Code</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Type the 6-digit code shown on the lecturer's screen.</p>
                        </div>

                        {/* 6-Digit OTP Inputs */}
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-16 text-2xl font-black text-center bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all dark:text-white"
                                    value={data}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                />
                            ))}
                        </div>

                        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none">
                            <CheckCircle2 size={20} /> Complete Check-in
                        </button>

                        <button
                            onClick={() => setPhase('geofence')}
                            className="text-slate-400 font-bold text-sm hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            Back to Location
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

// Stepper Component
const StepCircle = ({ icon, active, completed, label }) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all
            ${completed ? 'bg-green-500 border-green-100 text-white' :
                active ? 'bg-blue-600 border-blue-100 text-white scale-110 shadow-lg' :
                    'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
            {completed ? <CheckCircle2 size={20} /> : icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-slate-400'}`}>
            {label}
        </span>
    </div>
);

export default MarkAttendance;