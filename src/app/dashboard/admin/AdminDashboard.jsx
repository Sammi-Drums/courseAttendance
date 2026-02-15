import React, { useState } from 'react';
import Sidebar from '../../../components/shared/Sidebar';
import {
    Menu, Settings, Users, Map,
    Clock, ShieldAlert, Save, Database,
    TrendingUp, ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // State for System Settings
    const [geoSettings, setGeoSettings] = useState({
        lat: '4.1550',
        lng: '9.2633',
        radius: '500'
    });

    const [autoCheckout, setAutoCheckout] = useState('18:00');

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex-1 md:ml-64">
                {/* Admin Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-widest text-xs">
                        <ShieldAlert size={18} />
                        <span>System Administrator</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-500">
                        <Database size={20} className="hover:text-amber-600 cursor-pointer" />
                        <div className="w-8 h-8 bg-slate-100 rounded-lg border border-slate-200"></div>
                    </div>
                </header>

                <main className="p-6 md:p-10 space-y-8">
                    {/* Top Row Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <AdminStat icon={<Users />} label="Total Students" value="2,450" grow="+12%" />
                        <AdminStat icon={<TrendingUp />} label="Daily Avg" value="88%" grow="+2.4%" />
                        <AdminStat icon={<Clock />} label="Late Entries" value="142" grow="-5%" />
                        <AdminStat icon={<ShieldAlert />} label="Violations" value="12" grow="0" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Global Geofencing Settings */}
                        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                        <Map size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Campus Geofence</h3>
                                </div>
                                <button className="text-blue-600 font-bold text-sm flex items-center gap-1">
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Latitude</label>
                                        <input type="text" value={geoSettings.lat} onChange={(e) => setGeoSettings({ ...geoSettings, lat: e.target.value })}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-mono" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Longitude</label>
                                        <input type="text" value={geoSettings.lng} onChange={(e) => setGeoSettings({ ...geoSettings, lng: e.target.value })}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Radius (Meters)</label>
                                    <input type="number" value={geoSettings.radius} onChange={(e) => setGeoSettings({ ...geoSettings, radius: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-mono" />
                                </div>
                            </div>
                        </section>

                        {/* Automation & Policy */}
                        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-slate-900 text-white rounded-2xl">
                                    <Settings size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Automation Policy</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-slate-800">Automatic Checkout</p>
                                        <p className="text-xs text-slate-500">Forces all active sessions to close daily.</p>
                                    </div>
                                    <input
                                        type="time"
                                        value={autoCheckout}
                                        onChange={(e) => setAutoCheckout(e.target.value)}
                                        className="p-2 border border-slate-200 rounded-lg font-bold text-slate-800"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl opacity-50">
                                    <div>
                                        <p className="font-bold text-slate-800">Email Alerts</p>
                                        <p className="text-xs text-slate-500">Notify admin on geofence breaches.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-300 rounded-full relative">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Admin Sub-components
const AdminStat = ({ icon, label, value, grow }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-amber-200 transition-colors">
        <div className="flex justify-between items-start">
            <div className="p-2 bg-slate-50 text-slate-600 rounded-xl">{icon}</div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${grow.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                <ArrowUpRight size={10} /> {grow}
            </span>
        </div>
        <div>
            <p className="text-2xl font-black text-slate-900">{value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{label}</p>
        </div>
    </div>
);

export default AdminDashboard;