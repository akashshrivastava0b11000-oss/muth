import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import { Mentor } from '../../types';
import {
  UserCheck,
  Search,
  MapPin,
  Building,
  CheckCircle2,
  Clock,
  Send,
  X,
  Sparkles,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export const MentorsPage: React.FC = () => {
  const { user } = useAuth();
  const { activeVenture } = useVenture();
  const [mentors, setMentors] = useState<Mentor[]>(() => storage.getMentors());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  // Connection Request Modal
  const [requestMentor, setRequestMentor] = useState<Mentor | null>(null);
  const [requestNote, setRequestNote] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const filteredMentors = mentors.filter(m => {
    if (selectedExpertise !== 'all' && !m.expertise.some(e => e.includes(selectedExpertise))) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchCompany = m.company.toLowerCase().includes(q);
      const matchExpertise = m.expertise.some(e => e.toLowerCase().includes(q));
      if (!matchName && !matchCompany && !matchExpertise) return false;
    }
    return true;
  });

  const handleSendConnectionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestMentor) return;

    const updated = {
      ...requestMentor,
      connectionStatus: 'pending' as const,
      requestMessage: requestNote
    };

    storage.updateMentor(updated);
    setMentors(storage.getMentors());
    setRequestSubmitted(true);

    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestMentor(null);
      setRequestNote('');
    }, 1600);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sutra-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
            Mentors & Ecosystem Network
          </h1>
          <p className="text-xs sm:text-sm text-sutra-slate mt-1">
            Request 1-on-1 strategic guidance from veteran founders, venture partners, and sector specialists.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-sutra-ice text-sutra-royal border border-blue-200 w-fit">
          Verified Ecosystem Operators
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-sutra-border shadow-sutra-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search mentors by name, firm, or expertise..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-sutra-cloud border border-sutra-border rounded-xl pl-10 pr-4 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/30"
          />
        </div>

        <div>
          <select
            value={selectedExpertise}
            onChange={e => setSelectedExpertise(e.target.value)}
            className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/30"
          >
            <option value="all">All Guidance Areas</option>
            <option value="Fundraising">Pre-Seed & Seed Fundraising</option>
            <option value="AgriTech">AgriTech & Climate</option>
            <option value="HealthTech">HealthTech & Regulations</option>
            <option value="Product">Product Scalability & Tech</option>
          </select>
        </div>
      </div>

      {/* Mentors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map(m => (
          <div
            key={m.id}
            className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-sutra-border shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-base text-sutra-navy">{m.name}</h3>
                  <p className="text-xs text-sutra-slate">{m.title}</p>
                  <p className="text-[11px] font-semibold text-sutra-royal mt-0.5">{m.company}</p>
                </div>
              </div>

              <p className="text-xs text-sutra-slate mt-4 line-clamp-3 leading-relaxed">
                {m.bio}
              </p>

              {/* Expertise tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.expertise.map((exp, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold bg-sutra-cloud text-sutra-dark px-2 py-0.5 rounded-md border border-sutra-border"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              {/* Available for guidance */}
              <div className="mt-4 p-3 bg-sutra-cloud/60 rounded-xl border border-sutra-border text-[11px]">
                <span className="font-bold text-sutra-navy block mb-1">Available For:</span>
                <ul className="space-y-0.5 text-sutra-slate list-disc list-inside">
                  {m.availableFor.map((af, i) => (
                    <li key={i}>{af}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Connection Status & Action */}
            <div className="mt-6 pt-4 border-t border-sutra-border flex items-center justify-between">
              <span className="text-[11px] text-sutra-slate flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {m.location}
              </span>

              {m.connectionStatus === 'connected' ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-sutra-green bg-green-50 px-3 py-1.5 rounded-xl border border-green-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected
                </span>
              ) : m.connectionStatus === 'pending' ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <Clock className="w-3.5 h-3.5" />
                  Request Pending
                </span>
              ) : (
                <button
                  onClick={() => setRequestMentor(m)}
                  className="bg-sutra-royal hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-xs"
                >
                  Request Connection
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Request Modal */}
      {requestMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sutra-border">
            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-sutra-green mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-sutra-navy">Request Dispatched!</h3>
                <p className="text-xs text-sutra-slate">
                  Your introduction has been sent to {requestMentor.name}. Once accepted, you'll be able to schedule an advisory touchpoint.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-sutra-border">
                  <h3 className="text-sm font-bold text-sutra-navy">
                    Connect with {requestMentor.name}
                  </h3>
                  <button
                    onClick={() => setRequestMentor(null)}
                    className="p-1 text-sutra-slate hover:text-sutra-navy"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSendConnectionRequest} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Connecting on behalf of
                    </label>
                    <input
                      type="text"
                      disabled
                      value={activeVenture ? `${activeVenture.name} (${activeVenture.stage} Stage)` : 'My Startup'}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Personalized Introduction Note
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={requestNote}
                      onChange={e => setRequestNote(e.target.value)}
                      placeholder={`Hello ${requestMentor.name}, we are building ${activeVenture?.name || 'our venture'} and would value your guidance on...`}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                    />
                  </div>

                  <div className="pt-3 border-t border-sutra-border flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRequestMentor(null)}
                      className="px-3 py-1.5 text-xs text-sutra-slate"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sutra-royal text-white text-xs font-bold rounded-xl hover:bg-blue-700 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Request</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
