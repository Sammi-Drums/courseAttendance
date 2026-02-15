import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/shared/Sidebar';
import {
  Menu, Users, Play, StopCircle,
  RefreshCw, ClipboardList, CheckCircle, Clock
} from 'lucide-react';

const LecturerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [timer, setTimer] = useState(0);

  // Function to generate a random 6-digit code
  const startSession = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setActiveSession(true);
    setTimer(60); // 60 minutes countdown
  };

  const endSession = () => {
    setActiveSession(false);
    setGeneratedCode('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2 text-indigo-600 font-bold">
            <ClipboardList size={20} />
            <span>Lecturer Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 uppercase">Dr. Ashille</p>
              <p className="text-[10px] text-slate-500">MSc. Project Supervisor</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">P</div>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Class Management</h1>
              <p className="text-slate-500 text-sm">Create and monitor active attendance sessions.</p>
            </div>

            {!activeSession ? (
              <button
                onClick={startSession}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                <Play size={18} fill="currentColor" /> Start New Session
              </button>
            ) : (
              <button
                onClick={endSession}
                className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition shadow-lg shadow-red-200"
              >
                <StopCircle size={18} fill="currentColor" /> End Session
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Code Display */}
            <div className="lg:col-span-2 space-y-8">
              {activeSession ? (
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl text-center space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-bold text-xs uppercase animate-pulse">
                      <Clock size={14} /> {timer}m remaining
                    </div>
                  </div>

                  <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Active Session Code</p>
                  <h2 className="text-8xl md:text-9xl font-black text-indigo-600 tracking-tighter animate-in zoom-in duration-500">
                    {generatedCode}
                  </h2>
                  <div className="pt-4">
                    <p className="text-slate-400 text-sm italic">Share this code with students in the hall.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100 rounded-[2.5rem] p-20 border-2 border-dashed border-slate-300 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400">No Active Session</h3>
                  <p className="text-slate-400 max-w-xs">Select a course and click "Start Session" to begin marking attendance.</p>
                </div>
              )}

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatBox label="Expected" value="120" />
                <StatBox label="Present" value={activeSession ? "45" : "0"} color="text-green-600" />
                <StatBox label="Absent" value={activeSession ? "75" : "0"} color="text-red-400" />
              </div>
            </div>

            {/* Right Column: Live Feed */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Live Attendance</h3>
                <RefreshCw size={16} className="text-slate-400 cursor-pointer" />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeSession ? (
                  <>
                    <Attendee name="Ambe Erick" time="10:02 AM" status="success" />
                    <Attendee name="Musa John" time="10:04 AM" status="success" />
                    <Attendee name="Sonia Belibi" time="10:05 AM" status="warning" />
                  </>
                ) : (
                  <p className="text-center text-slate-400 text-sm mt-20 italic">Waiting for session to start...</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper Components
const StatBox = ({ label, value, color = "text-slate-900" }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

const Attendee = ({ name, time, status }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      <div>
        <p className="text-xs font-bold text-slate-800">{name}</p>
        <p className="text-[10px] text-slate-500">{time}</p>
      </div>
    </div>
    <CheckCircle size={14} className="text-green-500" />
  </div>
);

export default LecturerDashboard;