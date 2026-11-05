import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SutraLogo } from '../../components/common/SutraLogo';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-sutra-cloud flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-4">
          <SutraLogo size="lg" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy tracking-tight">
          Reset Your Password
        </h2>
        <p className="mt-2 text-sm text-sutra-slate">
          Enter your registered email and we'll send a secure password reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-sutra-md border border-sutra-border">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-sutra-green mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-sutra-navy">Reset Link Dispatched</h3>
              <p className="text-xs text-sutra-slate">
                We've sent instructions to <strong className="text-sutra-navy">{email}</strong>. Check your inbox or spam folder.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sutra-royal hover:underline pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="founder@sutra.io"
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sutra-royal hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sutra-sm transition-all"
              >
                Send Reset Instructions
              </button>

              <div className="pt-2 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sutra-slate hover:text-sutra-navy"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
