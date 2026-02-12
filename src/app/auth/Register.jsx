import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    matricule: '',
    gender: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    
    // LOGIC: Check Matricule against Admin Database
    // For now, we simulate this. If it's not 'UB123', it rejects.
    const VALID_MATRICULES = ["UB123", "UB456", "UB789"]; // This will come from your DB later
    
    if (!VALID_MATRICULES.includes(formData.matricule)) {
      setError("Invalid Matricule. Please contact the school administration.");
      return;
    }

    console.log("Valid registration details:", formData);
    // On success, go to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Join the System</h2>
          <p className="text-slate-500">Register with your official student credentials</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Username</label>
            <input type="text" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, userName: e.target.value})} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">University Email</label>
            <input type="email" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          {/* Matricule Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Matricule Number</label>
            <input type="text" required className="p-3 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              placeholder="e.g. FE23A456"
              onChange={(e) => setFormData({...formData, matricule: e.target.value})} />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input type="tel" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Gender</label>
            <select required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, gender: e.target.value})}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Password - Full width */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input type="password" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          {error && <p className="md:col-span-2 text-red-500 text-sm italic">{error}</p>}

          <button className="md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;