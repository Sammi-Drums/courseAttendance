import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import ForgotPassword from './app/auth/ForgotPassword';
import StudentDashboard from './app/dashboard/student/StudentDashboard';
import MarkAttendance from './app/dashboard/student/MarkAttendance'; // Import the new page

// Create simple "Placeholder" components so the app doesn't crash when you click History/Settings
const HistoryPlaceholder = () => <div className="p-20 text-center">History Page Coming Soon...</div>;
const SettingsPlaceholder = () => <div className="p-20 text-center">Settings Page Coming Soon...</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* STUDENT DASHBOARD ROUTES */}
        {/* Note: These must match the 'path' values in your Sidebar.jsx exactly! */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/student/check-in" element={<MarkAttendance />} />
        <Route path="/dashboard/student/history" element={<HistoryPlaceholder />} />
        <Route path="/dashboard/student/settings" element={<SettingsPlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;