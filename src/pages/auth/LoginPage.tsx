import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SutraLogo } from '../../components/common/SutraLogo';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, ShieldCheck, Sparkles, User, Briefcase, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    await login(email.trim(), password);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = (role: 'founder' | 'freelancer') => {
    loginAsDemo(role);
    if (role === 'founder') {
      navigate('/dashboard');
    } else {
      navigate('/freelancer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-sutra-cloud flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-4">
          <SutraLogo size="lg" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy tracking-tight">
          Welcome back to SUTRA
        </h2>
        <p className="mt-2 text-sm text-sutra-slate">
          Sign in to access your ventures, readiness diagnostics, and verified schemes.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-sutra-md border border-sutra-border">
          {/* Quick 1-Click Demo Buttons */}
          <div className="mb-6 p-4 rounded-xl bg-sutra-cloud border border-sutra-border">
            <div className="text-xs font-bold text-sutra-slate uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Instant Test Access</span>
              <span className="text-[10px] bg-sutra-ice text-sutra-royal font-semibold px-2 py-0.5 rounded-full">
                1-Click Demo
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('founder')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-sutra-ice text-sutra-navy border border-sutra-border text-xs font-semibold shadow-xs transition-colors"
              >
                <User className="w-3.5 h-3.5 text-sutra-royal" />
                <span>Demo Founder</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('freelancer')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-sutra-ice text-sutra-navy border border-sutra-border text-xs font-semibold shadow-xs transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-sutra-teal" />
                <span>Demo Freelancer</span>
              </button>
            </div>
          </div>

          <div className="relative mb-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sutra-border"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-sutra-slate uppercase font-medium">
              Or sign in with email
            </span>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-sutra-royal hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sutra-royal hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sutra-sm transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-sutra-slate">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-sutra-royal hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
