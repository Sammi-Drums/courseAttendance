import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you would trigger the backend email reset
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <Link to="/login" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors">
                    <ChevronLeft size={18} /> Back to Login
                </Link>

                {!submitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h2>
                        <p className="text-slate-500 mb-8 text-sm">
                            Enter your registered email and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="name@university.edu"
                                />
                            </div>

                            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg">
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="text-green-600" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                        <p className="text-slate-500 text-sm mb-6">
                            We've sent password reset instructions to your school email address.
                        </p>
                        <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold">
                            Didn't receive it? Try again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;