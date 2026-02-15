// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import ForgotPassword from './app/auth/ForgotPassword';
import StudentDashboard from './app/dashboard/student/StudentDashboard';
import MarkAttendance from './app/dashboard/student/MarkAttendance';
import LecturerDashboard from './app/dashboard/lecturer/LecturerDashboard';
import AdminDashboard from './app/dashboard/admin/AdminDashboard'; // Import Admin

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

        {/* Lecturer Group */}
        <Route path="/dashboard/lecturer" element={<LecturerDashboard />} />

        {/* Admin Group */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* 404 Catch-all */}
        <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;