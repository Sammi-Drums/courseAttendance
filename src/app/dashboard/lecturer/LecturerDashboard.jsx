import React from 'react';
import DashboardLayout from '../../../components/shared/DashboardLayout';
import { Users, BookOpen, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LecturerDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Lecturer Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, Dr. Achille. You have 2 classes today.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/lecturer/live-class')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 group"
          >
            Start Live Class <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OverviewCard title="Total Students" value="482" icon={<Users className="text-blue-500" />} trend="+3% from last month" />
          <OverviewCard title="Courses Assigned" value="4" icon={<BookOpen className="text-indigo-500" />} trend="Active Semester" />
          <OverviewCard title="Avg. Attendance" value="88%" icon={<TrendingUp className="text-emerald-500" />} trend="High Performance" />
        </div>

        {/* Course Grid */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Your Courses</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CourseCard name="Software Engineering" code="SWE401" students="120" time="10:00 AM" />
            <CourseCard name="Database Systems" code="DBS302" students="85" time="02:00 PM" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const OverviewCard = ({ title, value, icon, trend }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl">{icon}</div>
    </div>
    <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <p className="text-[10px] text-emerald-500 font-bold">{trend}</p>
  </div>
);

const CourseCard = ({ name, code, students, time }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all group cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-3 py-1 rounded-full uppercase">{code}</span>
        <h4 className="text-xl font-bold text-slate-800 dark:text-white mt-3">{name}</h4>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
            <Users size={16} /> {students} Students
          </div>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
            <Calendar size={16} /> {time}
          </div>
        </div>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <ArrowRight size={20} />
      </div>
    </div>
  </div>
);

export default LecturerDashboard;