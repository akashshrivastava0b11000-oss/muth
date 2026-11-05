import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEnquiry } from '../../context/EnquiryContext';
import {
  Briefcase,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  Star,
  DollarSign,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const FreelancerDashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { enquiries, replyToEnquiry, updateStatus } = useEnquiry();

  const profile = user?.freelancerProfile;

  // Active reply state
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Service modal
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(25000);
  const [newServiceTurnaround, setNewServiceTurnaround] = useState('5 Days');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // Availability state
  const availability = profile?.availability || 'Available Now';

  const toggleAvailability = (newVal: 'Available Now' | 'Available Next Week' | 'Booked') => {
    if (!user || !profile) return;
    updateUser({
      freelancerProfile: {
        ...profile,
        availability: newVal
      }
    });
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiryId || !replyText.trim()) return;

    replyToEnquiry(selectedEnquiryId, user?.name || 'Freelancer', replyText.trim());
    setReplyText('');
    setSelectedEnquiryId(null);
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim() || !profile) return;

    const newService = {
      id: `srv-${Date.now()}`,
      title: newServiceTitle.trim(),
      price: newServicePrice,
      turnaround: newServiceTurnaround,
      description: newServiceDesc
    };

    updateUser({
      freelancerProfile: {
        ...profile,
        services: [...(profile.services || []), newService]
      }
    });

    setShowAddService(false);
    setNewServiceTitle('');
    setNewServiceDesc('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-sutra-navy via-sutra-royal to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-sutra-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs border border-white/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Freelancer Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{user?.name}</h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            {profile?.title || 'Startup Co-Builder'} • Manage client inbound proposals, update your service packages, and respond to founders.
          </p>
        </div>

        {/* Availability Toggle */}
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1.5">
            Your Availability
          </div>
          <div className="flex gap-1.5 text-xs">
            {(['Available Now', 'Available Next Week', 'Booked'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => toggleAvailability(opt)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  availability === opt
                    ? 'bg-white text-sutra-navy shadow-sm'
                    : 'text-white/80 hover:bg-white/15'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Enquiries + Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Client Enquiries (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm">
            <div className="flex items-center justify-between pb-4 border-b border-sutra-border">
              <h2 className="text-base font-bold text-sutra-navy flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sutra-royal" />
                <span>Client Enquiries & Project Messages</span>
              </h2>
              <span className="text-xs font-bold bg-sutra-ice text-sutra-royal px-2.5 py-0.5 rounded-full">
                {enquiries.length} Inbound
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {enquiries.length === 0 ? (
                <div className="text-center py-8 text-xs text-sutra-slate">
                  No active enquiries yet. When founders send project scopes from the marketplace, they will appear here.
                </div>
              ) : (
                enquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl border border-sutra-border bg-sutra-cloud/40 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-sutra-navy">{enq.senderName}</h3>
                          <span className="text-xs text-sutra-slate">({enq.senderVenture})</span>
                        </div>
                        <p className="text-xs font-semibold text-sutra-royal mt-0.5">
                          Scope: {enq.serviceTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-sutra-navy bg-white px-3 py-1 rounded-lg border border-sutra-border">
                          Budget: {enq.budget}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            enq.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : enq.status === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-sutra-slate leading-relaxed bg-white p-3 rounded-xl border border-sutra-border">
                      "{enq.message}"
                    </p>

                    {/* Thread History */}
                    {enq.responses && enq.responses.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-sutra-border/60">
                        {enq.responses.map((r, i) => (
                          <div key={i} className="text-xs bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                            <strong className="text-sutra-navy">{r.sender}:</strong>{' '}
                            <span className="text-sutra-slate">{r.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Response actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        {enq.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(enq.id, 'accepted')}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept Scope</span>
                            </button>
                            <button
                              onClick={() => updateStatus(enq.id, 'declined')}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-sutra-border text-sutra-slate hover:bg-white"
                            >
                              Decline
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedEnquiryId(enq.id)}
                        className="text-xs font-bold text-sutra-royal hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send Direct Reply</span>
                      </button>
                    </div>

                    {/* Inline Reply Box */}
                    {selectedEnquiryId === enq.id && (
                      <form onSubmit={handleSendReply} className="pt-3 border-t border-sutra-border flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Type your reply to the founder..."
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          className="flex-1 bg-white border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                        />
                        <button
                          type="submit"
                          className="bg-sutra-royal hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                        >
                          Send
                        </button>
                      </form>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Manage Packages & Public Profile Preview (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm">
            <div className="flex items-center justify-between pb-4 border-b border-sutra-border">
              <h3 className="text-sm font-bold text-sutra-navy">Your Service Packages</h3>
              <button
                onClick={() => setShowAddService(!showAddService)}
                className="text-xs font-semibold text-sutra-royal hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {/* Add Service Form */}
            {showAddService && (
              <form onSubmit={handleAddServiceSubmit} className="mt-4 p-4 rounded-xl bg-sutra-cloud border border-sutra-border space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-sutra-navy uppercase mb-1">
                    Package Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Seed Pitch Deck Polish"
                    value={newServiceTitle}
                    onChange={e => setNewServiceTitle(e.target.value)}
                    className="w-full bg-white border border-sutra-border rounded-lg px-3 py-1.5 text-xs text-sutra-dark"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-sutra-navy uppercase mb-1">
                      Fixed Price (₹)
                    </label>
                    <input
                      type="number"
                      value={newServicePrice}
                      onChange={e => setNewServicePrice(Number(e.target.value))}
                      className="w-full bg-white border border-sutra-border rounded-lg px-3 py-1.5 text-xs text-sutra-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-sutra-navy uppercase mb-1">
                      Turnaround
                    </label>
                    <input
                      type="text"
                      value={newServiceTurnaround}
                      onChange={e => setNewServiceTurnaround(e.target.value)}
                      placeholder="e.g. 5 Days"
                      className="w-full bg-white border border-sutra-border rounded-lg px-3 py-1.5 text-xs text-sutra-dark"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-sutra-navy uppercase mb-1">
                    Deliverables Description
                  </label>
                  <textarea
                    rows={2}
                    value={newServiceDesc}
                    onChange={e => setNewServiceDesc(e.target.value)}
                    placeholder="What will you deliver?"
                    className="w-full bg-white border border-sutra-border rounded-lg px-3 py-1.5 text-xs text-sutra-dark"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddService(false)}
                    className="text-xs text-sutra-slate"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-sutra-royal text-white text-xs font-semibold px-3 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {/* Existing Services List */}
            <div className="mt-4 space-y-3">
              {profile?.services && profile.services.length > 0 ? (
                profile.services.map((srv, idx) => (
                  <div key={idx} className="p-3 bg-sutra-cloud/50 rounded-xl border border-sutra-border text-xs">
                    <div className="flex items-center justify-between font-bold text-sutra-navy">
                      <span className="truncate">{srv.title}</span>
                      <span className="text-sutra-royal whitespace-nowrap ml-2">₹{srv.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-sutra-slate mt-1 line-clamp-2">{srv.description}</p>
                    <div className="text-[10px] font-semibold text-sutra-slate mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Turnaround: {srv.turnaround}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-sutra-slate italic">No custom packages yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
