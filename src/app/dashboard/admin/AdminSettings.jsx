import React from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { Save, ShieldCheck, BellRing, Map } from 'lucide-react';

const AdminSettings = () => {
    return (
        <DashboardLayout role="admin">
            <div className="max-w-4xl space-y-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">System Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Configure global application behavior and security protocols.</p>
                </div>

                <div className="space-y-6">
                    {/* Security Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                            <ShieldCheck className="text-blue-600" />
                            <h3 className="font-bold dark:text-white">Security & Access</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <ToggleSetting title="Strict Geofencing" description="Block attendance if student is outside campus radius." active={true} />
                            <ToggleSetting title="Device Binding" description="Restrict account login to a single mobile device." active={false} />
                        </div>
                    </div>

                    {/* Notification Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                            <BellRing className="text-amber-500" />
                            <h3 className="font-bold dark:text-white">System Alerts</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <ToggleSetting title="Lecturer Session Alerts" description="Notify admin when a new session starts." active={true} />
                            <ToggleSetting title="Low Attendance Warning" description="Email admin if average attendance drops below 60%." active={true} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl">
                        <Save size={20} /> Save Configuration
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

const ToggleSetting = ({ title, description, active }) => (
    <div className="flex items-center justify-between py-2">
        <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`}></div>
        </div>
    </div>
);

export default AdminSettings;