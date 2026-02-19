// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import ForgotPassword from './app/auth/ForgotPassword';
import StudentDashboard from './app/dashboard/student/StudentDashboard';
import MarkAttendance from './app/dashboard/student/MarkAttendance';
import AttendanceHistory from './app/dashboard/student/AttendanceHIstory';
import LecturerDashboard from './app/dashboard/lecturer/LecturerDashboard';
import LecturerReports from './app/dashboard/lecturer/LecturerReports';
import AdminDashboard from './app/dashboard/admin/AdminDashboard'; // Import Admin
import AdminMatriculeDB from './app/dashboard/admin/AdminMatriculeDB';
import AdminSettings from './app/dashboard/admin/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Group */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student Group */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/student/check-in" element={<MarkAttendance />} />
        <Route path="/dashboard/student/history" element={<AttendanceHistory />} />

        {/* Lecturer Group */}
        <Route path="/dashboard/lecturer" element={<LecturerDashboard />} />
        <Route path="/dashboard/lecturer/sessions" element={<div className="p-20 text-center">Live Class Sessions (Coming Soon)</div>} />
        <Route path="/dashboard/lecturer/reports" element={<LecturerReports />} />

        {/* Admin Group */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/matricules" element={<AdminMatriculeDB />} />
        <Route path="/dashboard/admin/settings" element={<AdminSettings />} />

        {/* 404 Catch-all */}
        <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;