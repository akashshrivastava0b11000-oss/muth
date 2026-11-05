import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import { Opportunity, Application, StartupStage } from '../../types';
import {
  Compass,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Calendar,
  DollarSign,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  X,
  FileCheck2,
  Tag
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { activeVenture, isOpportunitySaved, toggleSaveOpportunity } = useVenture();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab & Filters
  const initialTab = searchParams.get('tab') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeTab, setActiveTab] = useState<'all' | 'recommended' | 'saved' | 'applied'>(
    initialTab as any
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  // Opportunities & Applications State
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => storage.getOpportunities());
  const [applications, setApplications] = useState<Application[]>(() => storage.getApplications());

  // Modal State
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [applyModalOpp, setApplyModalOpp] = useState<Opportunity | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<Application['status']>('applied');
  const [applicationNotes, setApplicationNotes] = useState('');

  // Active venture saved list
  const savedIds = activeVenture?.savedOpportunityIds || [];

  // Filtered List
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Tab filter
      if (activeTab === 'saved') {
        if (!savedIds.includes(opp.id)) return false;
      } else if (activeTab === 'recommended') {
        if (!activeVenture) return false;
        if (!opp.eligibleStages.includes(activeVenture.stage)) return false;
      } else if (activeTab === 'applied') {
        const isApplied = applications.some(
          a => a.opportunityId === opp.id && a.ventureId === activeVenture?.id
        );
        if (!isApplied) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && opp.category !== selectedCategory) {
        return false;
      }

      // Stage filter
      if (selectedStage !== 'all' && !opp.eligibleStages.includes(selectedStage as StartupStage)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organization.toLowerCase().includes(q);
        const matchesDesc = opp.description.toLowerCase().includes(q);
        const matchesTags = opp.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesOrg && !matchesDesc && !matchesTags) return false;
      }

      return true;
    });
  }, [
    opportunities,
    activeTab,
    selectedCategory,
    selectedStage,
    searchQuery,
    savedIds,
    activeVenture,
    applications
  ]);

  const handleMarkAsApplied = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalOpp || !activeVenture) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      ventureId: activeVenture.id,
      opportunityId: applyModalOpp.id,
      status: applicationStatus,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: applicationNotes
    };

    storage.addOrUpdateApplication(newApp);
    setApplications(storage.getApplications());
    setApplyModalOpp(null);
    setApplicationNotes('');
  };

  const getApplicationForOpp = (oppId: string) => {
    return applications.find(
      a => a.opportunityId === oppId && a.ventureId === activeVenture?.id
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sutra-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
              Opportunities & Government Schemes
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-sutra-green/10 text-sutra-green border border-sutra-green/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Official Sources
            </span>
          </div>
          <p className="text-xs sm:text-sm text-sutra-slate mt-1">
            Discover verified non-dilutive grants, DPIIT seed schemes, accelerators, and ecosystem competitions.
          </p>
        </div>

        {activeVenture && (
          <div className="px-3.5 py-2 bg-white rounded-xl border border-sutra-border shadow-xs text-xs">
            <span className="text-sutra-slate font-medium">Filtering Context: </span>
            <strong className="text-sutra-navy">{activeVenture.name}</strong>{' '}
            <span className="uppercase text-[10px] bg-sutra-ice text-sutra-royal font-bold px-1.5 py-0.5 rounded ml-1">
              {activeVenture.stage}
            </span>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-sutra-border space-x-6 text-sm font-semibold text-sutra-slate">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'all' ? 'text-sutra-royal' : 'hover:text-sutra-navy'
          }`}
        >
          <span>All Opportunities ({opportunities.length})</span>
          {activeTab === 'all' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sutra-royal"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('recommended')}
          className={`pb-3 relative flex items-center gap-1.5 transition-colors ${
            activeTab === 'recommended' ? 'text-sutra-royal' : 'hover:text-sutra-navy'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-sutra-teal" />
          <span>Recommended for You</span>
          {activeTab === 'recommended' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sutra-royal"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 relative flex items-center gap-1.5 transition-colors ${
            activeTab === 'saved' ? 'text-sutra-royal' : 'hover:text-sutra-navy'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved ({savedIds.length})</span>
          {activeTab === 'saved' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sutra-royal"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('applied')}
          className={`pb-3 relative flex items-center gap-1.5 transition-colors ${
            activeTab === 'applied' ? 'text-sutra-royal' : 'hover:text-sutra-navy'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Tracked Applications ({applications.length})</span>
          {activeTab === 'applied' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sutra-royal"></span>
          )}
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-sutra-border shadow-sutra-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by keyword, scheme name, or ministry..."
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
            <option value="all">All Categories</option>
            <option value="Government Scheme">Government Scheme</option>
            <option value="Grant">Grant</option>
            <option value="Seed Funding">Seed Funding</option>
            <option value="Accelerator">Accelerator</option>
            <option value="Competition">Competition</option>
          </select>
        </div>

        <div>
          <select
            value={selectedStage}
            onChange={e => setSelectedStage(e.target.value)}
            className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/30"
          >
            <option value="all">All Startup Stages</option>
            <option value="idea">Idea Stage</option>
            <option value="validate">Validate Stage</option>
            <option value="build">Build Stage</option>
            <option value="launch">Launch Stage</option>
            <option value="scale">Scale Stage</option>
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-sutra-border">
          <Compass className="w-12 h-12 text-sutra-slate mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-sutra-navy">No matching opportunities found</h3>
          <p className="text-xs text-sutra-slate mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, clear category filters, or explore the "All" tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opp => {
            const isSaved = isOpportunitySaved(opp.id);
            const userApp = getApplicationForOpp(opp.id);

            return (
              <div
                key={opp.id}
                className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Category & Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-sutra-royal border border-blue-100">
                      {opp.category}
                    </span>

                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-sutra-ice border-sutra-royal text-sutra-royal'
                          : 'border-sutra-border text-sutra-slate hover:bg-sutra-cloud'
                      }`}
                      title={isSaved ? 'Saved' : 'Save Scheme'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-bold text-base text-sutra-navy mt-3 leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-sutra-slate font-medium mt-0.5">{opp.organization}</p>

                  {/* Funding Amount & Verification Badge */}
                  <div className="mt-4 p-3 rounded-xl bg-sutra-cloud border border-sutra-border space-y-1">
                    <div className="text-[10px] uppercase font-bold text-sutra-slate">Grant / Assistance</div>
                    <div className="text-xs font-extrabold text-sutra-navy">{opp.fundingAmount}</div>
                  </div>

                  {/* Brief Eligibility */}
                  <p className="text-xs text-sutra-slate mt-3 line-clamp-2 leading-relaxed">
                    {opp.eligibilitySummary}
                  </p>

                  {/* Match Reason (if applicable) */}
                  {opp.matchReason && (
                    <div className="mt-3 text-[11px] bg-teal-50/70 border border-teal-200/60 text-sutra-navy p-2 rounded-xl">
                      <strong className="text-sutra-teal">SUTRA Match:</strong> {opp.matchReason}
                    </div>
                  )}

                  {/* Application Status Badge (if tracked) */}
                  {userApp && (
                    <div className="mt-3 flex items-center justify-between text-xs bg-green-50 text-green-800 p-2 rounded-xl border border-green-200">
                      <span className="font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        Status: <span className="uppercase">{userApp.status.replace('_', ' ')}</span>
                      </span>
                      <span className="text-[10px] text-green-700">Applied {userApp.appliedDate}</span>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-sutra-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedOpportunity(opp)}
                    className="text-xs font-semibold text-sutra-slate hover:text-sutra-navy"
                  >
                    Details & Rules
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setApplyModalOpp(opp)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-sutra-border text-sutra-slate hover:bg-sutra-cloud"
                    >
                      Track Filing
                    </button>
                    <a
                      href={opp.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold bg-sutra-royal hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sutra-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-sutra-border">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-sutra-royal">
                  {selectedOpportunity.category}
                </span>
                <h3 className="text-xl font-bold text-sutra-navy mt-1">
                  {selectedOpportunity.title}
                </h3>
                <p className="text-xs text-sutra-slate">{selectedOpportunity.organization}</p>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-1 rounded-lg text-sutra-slate hover:text-sutra-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Program Overview
                </h4>
                <p className="text-sutra-slate leading-relaxed">
                  {selectedOpportunity.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-sutra-cloud rounded-xl border border-sutra-border">
                <div>
                  <span className="text-sutra-slate block font-semibold">Grant / Funding:</span>
                  <span className="font-bold text-sutra-navy mt-0.5 block">{selectedOpportunity.fundingAmount}</span>
                </div>
                <div>
                  <span className="text-sutra-slate block font-semibold">Deadline:</span>
                  <span className="font-bold text-amber-600 mt-0.5 block">{selectedOpportunity.deadline || 'Always Open'}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sutra-navy uppercase tracking-wider mb-1.5">
                  Mandatory Eligibility Requirements
                </h4>
                <ul className="space-y-1.5 text-sutra-slate">
                  {selectedOpportunity.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sutra-royal font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <span className="font-bold text-sutra-navy block mb-0.5">Official Verification:</span>
                <span className="text-sutra-slate">
                  {selectedOpportunity.officialSource} • Last verified on {selectedOpportunity.lastVerified}.
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sutra-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="text-xs font-semibold text-sutra-slate hover:underline"
              >
                Close
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setApplyModalOpp(selectedOpportunity);
                    setSelectedOpportunity(null);
                  }}
                  className="px-4 py-2 border border-sutra-border text-sutra-navy hover:bg-sutra-cloud rounded-xl text-xs font-semibold"
                >
                  Mark as Applied
                </button>
                <a
                  href={selectedOpportunity.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-sutra-royal hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sutra-sm"
                >
                  <span>Open Official Application Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track / Mark as Applied Modal */}
      {applyModalOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sutra-border">
            <h3 className="text-base font-bold text-sutra-navy">Track Application for {activeVenture?.name}</h3>
            <p className="text-xs text-sutra-slate mt-1">
              Mark {applyModalOpp.title} in your internal dashboard to monitor review cycles and incubator meetings.
            </p>

            <form onSubmit={handleMarkAsApplied} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Current Application Status
                </label>
                <select
                  value={applicationStatus}
                  onChange={e => setApplicationStatus(e.target.value as any)}
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                >
                  <option value="applied">Applied (Submitted)</option>
                  <option value="under_review">Under Review / Committee Screening</option>
                  <option value="shortlisted">Shortlisted for Presentation</option>
                  <option value="accepted">Accepted / Grant Sanctioned</option>
                  <option value="not_selected">Not Selected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Private Founder Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={applicationNotes}
                  onChange={e => setApplicationNotes(e.target.value)}
                  placeholder="e.g. Submitted via incubator incubation cell; interview expected Dec 1st."
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-3 py-2 text-xs text-sutra-dark"
                />
              </div>

              <div className="pt-3 border-t border-sutra-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpp(null)}
                  className="px-3 py-1.5 text-xs text-sutra-slate"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sutra-royal text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
                >
                  Save to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
