import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import { useEnquiry } from '../../context/EnquiryContext';
import { storage } from '../../services/storageService';
import { Freelancer } from '../../types';
import {
  Users,
  Search,
  Star,
  MapPin,
  Clock,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Send,
  X,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const FreelancersPage: React.FC = () => {
  const { user } = useAuth();
  const { activeVenture } = useVenture();
  const { sendEnquiry } = useEnquiry();

  const [freelancers] = useState<Freelancer[]>(() => storage.getFreelancers());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  // Modal State
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [enquiryFreelancer, setEnquiryFreelancer] = useState<Freelancer | null>(null);

  // Enquiry Form State
  const [serviceTitle, setServiceTitle] = useState('');
  const [budget, setBudget] = useState('₹35,000');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter(f => {
      if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
      if (selectedAvailability !== 'all' && f.availability !== selectedAvailability) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesTitle = f.title.toLowerCase().includes(q);
        const matchesSkills = f.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesSkills) return false;
      }
      return true;
    });
  }, [freelancers, selectedCategory, selectedAvailability, searchQuery]);

  const handleSendEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryFreelancer) return;

    sendEnquiry({
      senderId: user?.id || 'user-demo-founder',
      senderName: user?.name || 'Founder',
      senderVenture: activeVenture?.name || 'My Startup',
      recipientId: enquiryFreelancer.id,
      serviceTitle: serviceTitle || enquiryFreelancer.services[0]?.title || 'Custom Milestone',
      budget,
      message: enquiryMessage
    });

    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquirySubmitted(false);
      setEnquiryFreelancer(null);
      setEnquiryMessage('');
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sutra-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
            Vetted Co-Builders & Freelancer Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-sutra-slate mt-1">
            Connect directly with verified software engineers, product designers, growth hackers, and startup lawyers.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-teal-50 text-sutra-teal border border-teal-200 w-fit flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestone-Protected Engagements</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-sutra-border shadow-sutra-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by skill (e.g. React, Figma, DPIIT, Patent, Cold Email)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-sutra-cloud border border-sutra-border rounded-xl pl-10 pr-4 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/30"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/30"
          >
            <option value="all">All Service Categories</option>
            <option value="Web & App Development">Web & App Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Marketing & Growth">Marketing & Growth</option>
            <option value="Legal & Compliance">Legal & Compliance</option>
          </select>
        </div>

        <div>
          <select
            value={selectedAvailability}
            onChange={e => setSelectedAvailability(e.target.value)}
            className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/30"
          >
            <option value="all">Any Availability</option>
            <option value="Available Now">Available Now</option>
            <option value="Available Next Week">Available Next Week</option>
          </select>
        </div>
      </div>

      {/* Freelancers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFreelancers.map(f => (
          <div
            key={f.id}
            className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Profile Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-sutra-border shadow-xs"
                  />
                  <div>
                    <h3 className="text-base font-bold text-sutra-navy">{f.name}</h3>
                    <p className="text-xs text-sutra-slate font-medium">{f.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-sutra-slate">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {f.rating}
                      </span>
                      <span>({f.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {f.location}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    f.availability === 'Available Now'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {f.availability}
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-sutra-slate mt-4 line-clamp-2 leading-relaxed">
                {f.bio}
              </p>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {f.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold bg-sutra-cloud text-sutra-navy px-2 py-0.5 rounded-md border border-sutra-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Featured Services Preview */}
              {f.services && f.services.length > 0 && (
                <div className="mt-4 p-3 bg-sutra-cloud/60 rounded-xl border border-sutra-border text-xs">
                  <div className="flex items-center justify-between text-sutra-navy font-bold">
                    <span className="truncate">{f.services[0].title}</span>
                    <span className="text-sutra-royal font-black whitespace-nowrap ml-2">
                      ₹{f.services[0].price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[10px] text-sutra-slate mt-0.5">
                    Turnaround: {f.services[0].turnaround}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-sutra-border flex items-center justify-between">
              <button
                onClick={() => setSelectedFreelancer(f)}
                className="text-xs font-semibold text-sutra-slate hover:text-sutra-navy"
              >
                View Full Profile & Portfolio
              </button>

              <button
                onClick={() => {
                  setEnquiryFreelancer(f);
                  setServiceTitle(f.services[0]?.title || '');
                }}
                className="bg-sutra-royal hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sutra-sm flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send Enquiry</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Freelancer Profile Modal */}
      {selectedFreelancer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sutra-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-sutra-border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFreelancer.avatar}
                  alt={selectedFreelancer.name}
                  className="w-14 h-14 rounded-2xl object-cover border"
                />
                <div>
                  <h3 className="text-lg font-bold text-sutra-navy">{selectedFreelancer.name}</h3>
                  <p className="text-xs text-sutra-slate">{selectedFreelancer.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFreelancer(null)}
                className="p-1 text-sutra-slate hover:text-sutra-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-sutra-navy uppercase tracking-wider mb-1">About</h4>
                <p className="text-sutra-slate leading-relaxed">{selectedFreelancer.bio}</p>
              </div>

              <div>
                <h4 className="font-bold text-sutra-navy uppercase tracking-wider mb-2">
                  Verified Portfolio Deliverables
                </h4>
                <div className="space-y-2">
                  {selectedFreelancer.portfolio.map((item, i) => (
                    <div key={i} className="p-3 bg-sutra-cloud rounded-xl border border-sutra-border">
                      <div className="font-bold text-sutra-navy">{item.title}</div>
                      <p className="text-sutra-slate mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sutra-navy uppercase tracking-wider mb-2">
                  Standard Milestone Packages
                </h4>
                <div className="space-y-2">
                  {selectedFreelancer.services.map((srv, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border border-sutra-border rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sutra-navy">{srv.title}</div>
                        <div className="text-[10px] text-sutra-slate">{srv.description} • {srv.turnaround}</div>
                      </div>
                      <div className="text-xs font-black text-sutra-royal">
                        ₹{srv.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sutra-border flex justify-end gap-3">
              <button
                onClick={() => setSelectedFreelancer(null)}
                className="px-4 py-2 text-xs text-sutra-slate"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEnquiryFreelancer(selectedFreelancer);
                  setSelectedFreelancer(null);
                }}
                className="px-5 py-2 bg-sutra-royal text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Hire / Send Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Enquiry Modal */}
      {enquiryFreelancer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sutra-border">
            {enquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-sutra-navy">Enquiry Dispatched!</h3>
                <p className="text-xs text-sutra-slate">
                  Your enquiry has been delivered directly to {enquiryFreelancer.name}'s workspace. You will be notified upon reply.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-sutra-border">
                  <h3 className="text-sm font-bold text-sutra-navy">
                    Send Enquiry to {enquiryFreelancer.name}
                  </h3>
                  <button
                    onClick={() => setEnquiryFreelancer(null)}
                    className="p-1 text-sutra-slate hover:text-sutra-navy"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSendEnquirySubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Project or Milestone Title
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceTitle}
                      onChange={e => setServiceTitle(e.target.value)}
                      placeholder="e.g. Design MVP Figma Prototype for Pilot"
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Proposed Budget (₹)
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={e => setBudget(e.target.value)}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Brief Message & Requirements
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={enquiryMessage}
                      onChange={e => setEnquiryMessage(e.target.value)}
                      placeholder={`Hi ${enquiryFreelancer.name}, for ${activeVenture?.name || 'our startup'}, we need...`}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                    />
                  </div>

                  <div className="pt-3 border-t border-sutra-border flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEnquiryFreelancer(null)}
                      className="px-3 py-1.5 text-xs text-sutra-slate"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sutra-royal text-white text-xs font-bold rounded-xl hover:bg-blue-700 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Enquiry</span>
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
