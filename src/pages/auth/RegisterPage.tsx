import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SutraLogo } from '../../components/common/SutraLogo';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ArrowRight, User, Briefcase, Check, Mail, Lock, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('founder');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsLoading(true);
    await register(name.trim(), email.trim(), role);
    setIsLoading(false);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-sutra-cloud flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link to="/" className="inline-block mb-4">
          <SutraLogo size="lg" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy tracking-tight">
          Create Your SUTRA Account
        </h2>
        <p className="mt-2 text-sm text-sutra-slate">
          Connect your entrepreneurial idea to verified ecosystem opportunities.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-sutra-md border border-sutra-border">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Account Type Selector */}
            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-2">
                Select Your Role in the Ecosystem
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Founder Option */}
                <div
                  onClick={() => setRole('founder')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === 'founder'
                      ? 'border-sutra-royal bg-blue-50/50 shadow-xs'
                      : 'border-sutra-border bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-sutra-royal text-white flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    {role === 'founder' && (
                      <span className="w-5 h-5 rounded-full bg-sutra-royal text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-sutra-navy mt-3">Founder / Entrepreneur</h4>
                  <p className="text-xs text-sutra-slate mt-1 leading-snug">
                    Building, validating or scaling a startup or early venture.
                  </p>
                </div>

                {/* Freelancer Option */}
                <div
                  onClick={() => setRole('freelancer')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === 'freelancer'
                      ? 'border-sutra-teal bg-teal-50/50 shadow-xs'
                      : 'border-sutra-border bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-sutra-teal text-white flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    {role === 'freelancer' && (
                      <span className="w-5 h-5 rounded-full bg-sutra-teal text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-sutra-navy mt-3">Freelancer / Specialist</h4>
                  <p className="text-xs text-sutra-slate mt-1 leading-snug">
                    Offering design, engineering, marketing or legal services.
                  </p>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ramesh Kulkarni"
                className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Work or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sutra-royal hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sutra-sm transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Continue to Onboarding'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-sutra-slate">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-sutra-royal hover:underline">
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
