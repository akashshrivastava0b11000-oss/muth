import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import {
  User,
  Settings,
  Shield,
  Bell,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Save,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { ventures, activeVenture } = useVenture();

  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Notifications toggle
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      phone,
      location,
      bio
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo data back to default initial state?')) {
      storage.resetToDemo();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-sutra-border">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
          Account Profile & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-sutra-slate mt-1">
          Manage your personal credentials, communication preferences, and active role in SUTRA.
        </p>
      </div>

      {/* Main Profile Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sutra-border shadow-sutra-sm">
        <div className="flex items-center gap-4 pb-6 border-b border-sutra-border">
          <div className="w-16 h-16 rounded-2xl bg-sutra-navy text-white flex items-center justify-center text-xl font-bold overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name.charAt(0) || 'U'
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-sutra-navy">{user?.name}</h2>
            <p className="text-xs text-sutra-slate">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-sutra-ice text-sutra-royal">
              {user?.role === 'founder' ? 'Founder Account' : 'Freelancer Account'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Email Address (Permanent)
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full bg-sutra-cloud/50 border border-sutra-border rounded-xl px-4 py-2 text-xs text-sutra-slate cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91..."
                className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                Primary Location
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Bangalore, India"
                className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
              About / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="A few words about your background..."
              className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
            />
          </div>

          <div className="pt-4 border-t border-sutra-border flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-semibold text-sutra-green flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Profile changes saved!
              </span>
            ) : (
              <span></span>
            )}

            <button
              type="submit"
              className="bg-sutra-royal hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sutra-sm flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notifications Preferences */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sutra-border shadow-sutra-sm space-y-4">
        <h3 className="text-sm font-bold text-sutra-navy flex items-center gap-2">
          <Bell className="w-4 h-4 text-sutra-royal" />
          <span>Notification & Alert Preferences</span>
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-sutra-cloud border border-sutra-border cursor-pointer">
            <div>
              <div className="font-bold text-sutra-navy">Scheme Deadline Reminders</div>
              <div className="text-sutra-slate">Receive alerts 15 days before government scheme cutoff dates.</div>
            </div>
            <input
              type="checkbox"
              checked={deadlineAlerts}
              onChange={e => setDeadlineAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-sutra-royal focus:ring-sutra-royal cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-sutra-cloud border border-sutra-border cursor-pointer">
            <div>
              <div className="font-bold text-sutra-navy">New Matching Scheme Recommendations</div>
              <div className="text-sutra-slate">Notify me whenever a new grant matches my active venture stage.</div>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={e => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 rounded text-sutra-royal focus:ring-sutra-royal cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Data Management & Demo Reset */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sutra-border shadow-sutra-sm space-y-4">
        <h3 className="text-sm font-bold text-sutra-navy flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-sutra-amber" />
          <span>Ecosystem Data & Demo Reset</span>
        </h3>
        <p className="text-xs text-sutra-slate">
          Need to test the onboarding journey or clear sample ventures? You can reset your local mock state back to fresh defaults at any time.
        </p>

        <button
          onClick={handleResetDemoData}
          className="text-xs font-semibold px-4 py-2 bg-sutra-cloud hover:bg-sutra-ice text-sutra-navy border border-sutra-border rounded-xl transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Mock Data to Fresh Defaults</span>
        </button>
      </div>
    </div>
  );
};
