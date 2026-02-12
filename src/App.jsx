// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import ForgotPassword from './app/auth/ForgotPassword';
import StudentDashboard from './app/dashboard/student/StudentDashboard'; // Corrected path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;