import React, { useState } from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import {
    Settings, Users, Map, Clock, ShieldAlert, Save,
    Database, TrendingUp, ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
    // State for System Settings
    const [geoSettings, setGeoSettings] = useState({
        lat: '4.1550',
        lng: '9.2633',
        radius: '500'
    });

    const [autoCheckout, setAutoCheckout] = useState('18:00');

    return (
        <DashboardLayout role="admin">
            {/* Clean main container without redundant flex wrappers */}
            <div className="space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Control Center</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage global campus security and student records.</p>
                </div>

                {/* Top Row Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <AdminStat icon={<Users />} label="Total Students" value="2,450" grow="+12%" />
                    <AdminStat icon={<TrendingUp />} label="Daily Avg" value="88%" grow="+2.4%" />
                    <AdminStat icon={<Clock />} label="Late Entries" value="142" grow="-5%" />
                    <AdminStat icon={<ShieldAlert />} label="Violations" value="12" grow="0" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Global Geofencing Settings */}
                    <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl">
                                    <Map size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Campus Geofence</h3>
                            </div>
                            <button className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
                                <Save size={16} /> Save Changes
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Latitude</label>
                                    <input type="text" value={geoSettings.lat} onChange={(e) => setGeoSettings({ ...geoSettings, lat: e.target.value })}
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 font-mono" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Longitude</label>
                                    <input type="text" value={geoSettings.lng} onChange={(e) => setGeoSettings({ ...geoSettings, lng: e.target.value })}
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 font-mono" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase">Radius (Meters)</label>
                                <input type="number" value={geoSettings.radius} onChange={(e) => setGeoSettings({ ...geoSettings, radius: e.target.value })}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 font-mono" />
                            </div>
                        </div>
                    </section>

                    {/* Automation & Policy */}
                    <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl">
                                <Settings size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Automation Policy</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">Automatic Checkout</p>
                                    <p className="text-xs text-slate-500">Forces all active sessions to close daily.</p>
                                </div>
                                <input
                                    type="time"
                                    value={autoCheckout}
                                    onChange={(e) => setAutoCheckout(e.target.value)}
                                    className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-slate-800 dark:text-white outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl opacity-50 border border-slate-100 dark:border-slate-700">
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">Email Alerts</p>
                                    <p className="text-xs text-slate-500">Notify admin on geofence breaches.</p>
                                </div>
                                <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full relative">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
};

const AdminStat = ({ icon, label, value, grow }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-default">
        <div className="flex justify-between items-start">
            <div className="p-2 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-blue-400 rounded-xl">{icon}</div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${grow.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400'}`}>
                <ArrowUpRight size={10} /> {grow}
            </span>
        </div>
        <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{label}</p>
        </div>
    </div>
);

export default AdminDashboard;