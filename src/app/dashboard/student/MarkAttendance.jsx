import React, { useState, useEffect } from 'react';
import { MapPin, Key, CheckCircle2, AlertCircle } from 'lucide-react';
import { useGeofence } from '../../../hooks/useGeofence'; // The hook we discussed earlier

const MarkAttendance = () => {
    const { isInside, verifyLocation, loading } = useGeofence();
    const [step, setStep] = useState(1); // 1: Campus Entry, 2: Class Code
    const [classCode, setClassCode] = useState('');
    const [status, setStatus] = useState('idle'); // idle, success, error

    // Effect to verify location as soon as page opens
    useEffect(() => {
        verifyLocation();
    }, []);

    const handleCampusEntry = () => {
        if (isInside) {
            setStep(2);
            setStatus('idle');
        } else {
            setStatus('error');
        }
    };

    const handleClassCheckIn = (e) => {
        e.preventDefault();
        // Logic: If code matches (e.g., '123456') and still inside campus
        if (classCode === '123456' && isInside) {
            setStatus('success');
        } else {
            alert("Invalid code or you have moved out of the campus radius!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Progress Header */}
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Verify Presence</h2>
                    <div className="flex gap-2">
                        <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                    </div>
                </div>

                <div className="p-8">
                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="text-green-600" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Successfully Marked!</h3>
                            <p className="text-slate-500 mt-2">Your attendance for this course is recorded.</p>
                            <button onClick={() => setStep(1)} className="mt-6 text-blue-600 font-bold underline">Back to Dashboard</button>
                        </div>
                    ) : (
                        <>
                            {/* STEP 1: CAMPUS ENTRY */}
                            {step === 1 && (
                                <div className="space-y-6 text-center">
                                    <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                                        <MapPin className="text-blue-600" size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Step 1: Campus Arrival</h3>
                                        <p className="text-slate-500 text-sm">You must be within 500m of the university center.</p>
                                    </div>

                                    {isInside ? (
                                        <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3">
                                            <CheckCircle2 size={20} />
                                            <span className="text-sm font-semibold italic">Location Verified: You are on Campus</span>
                                        </div>
                                    ) : (
                                        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl flex items-center gap-3">
                                            <AlertCircle size={20} />
                                            <span className="text-sm font-semibold italic text-left">Location not detected on campus. Please move closer.</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleCampusEntry}
                                        disabled={!isInside}
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg disabled:bg-slate-200 transition-all hover:bg-blue-700"
                                    >
                                        Confirm Arrival
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: CLASS CODE */}
                            {step === 2 && (
                                <form onSubmit={handleClassCheckIn} className="space-y-6">
                                    <div className="text-center">
                                        <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Key className="text-blue-600" size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800">Step 2: Enter Class Code</h3>
                                        <p className="text-slate-500 text-sm">Ask your lecturer for the session code.</p>
                                    </div>

                                    <input
                                        type="text"
                                        maxLength={6}
                                        required
                                        value={classCode}
                                        onChange={(e) => setClassCode(e.target.value)}
                                        placeholder="0 0 0 0 0 0"
                                        className="w-full text-center text-4xl font-mono tracking-[0.4em] p-6 bg-slate-50 border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none uppercase"
                                    />

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                                    >
                                        Mark Present
                                    </button>

                                    <button onClick={() => setStep(1)} className="w-full text-slate-500 text-sm">
                                        Back to Step 1
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarkAttendance;