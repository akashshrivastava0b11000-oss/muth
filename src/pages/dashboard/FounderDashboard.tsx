import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import { StartupStage } from '../../types';
import {
  GitFork,
  BrainCircuit,
  Compass,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FounderDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    activeVenture,
    ventures,
    toggleMilestone,
    addMilestone
  } = useVenture();
  const navigate = useNavigate();

  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  const opportunities = storage.getOpportunities();
  const applications = storage.getApplications().filter(a => a.ventureId === activeVenture?.id);

  if (!activeVenture) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto my-12">
        <GitFork className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No Active Venture</h3>
        <p className="text-xs text-slate-500 mt-1">
          Create or select a venture to open its operational roadmap.
        </p>
        <Link
          to="/ventures?action=new"
          className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Venture</span>
        </Link>
      </div>
    );
  }

  const stages: { key: StartupStage; label: string; desc: string }[] = [
    { key: 'idea', label: 'Idea', desc: 'Problem Definition' },
    { key: 'validate', label: 'Validate', desc: 'Customer Discovery' },
    { key: 'build', label: 'Build', desc: 'MVP & Prototype' },
    { key: 'launch', label: 'Launch', desc: 'First Pilot Users' },
    { key: 'scale', label: 'Scale', desc: 'Growth & Expansion' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === activeVenture.stage);
  const readinessScore = activeVenture.latestReadinessScore || 0;

  // Curated matches for active stage
  const matchedOpportunities = opportunities
    .filter(o => o.eligibleStages.includes(activeVenture.stage))
    .slice(0, 2);

  const handleToggleMilestone = (id: string) => {
    toggleMilestone(id);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    addMilestone(newMilestoneText.trim(), activeVenture.stage);
    setNewMilestoneText('');
    setShowAddMilestone(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Quiet, Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {activeVenture.name}
            </h1>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
              {activeVenture.stage} Stage
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeVenture.industry} • {activeVenture.location}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
            Readiness Index:{' '}
            <strong className="text-slate-900">
              {readinessScore > 0 ? `${readinessScore}/100` : 'Pending Audit'}
            </strong>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
            Tracked Filings:{' '}
            <strong className="text-slate-900">{applications.length}</strong>
          </div>
        </div>
      </div>

      {/* 2. Primary Flowchart Trunk: Stage Progression */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-2">
            <GitFork className="w-4 h-4 text-slate-400" />
            <span>Venture Flowchart • Stage Progression</span>
          </span>
          <span className="text-slate-400 text-[11px]">
            Node {currentStageIndex + 1} of 5 Active
          </span>
        </div>

        {/* Linear Stages Flow */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
          {stages.map((st, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={st.key}
                className={`p-3 rounded-lg border text-left transition-all relative ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/30'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/60 text-slate-700'
                    : 'border-slate-100 bg-white text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isCurrent
                        ? 'text-blue-700'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">{st.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Branched Flowchart Execution Nodes */}
      {/* Visual branching header */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>Active Stage Branches</span>
          <div className="w-12 h-px bg-slate-300"></div>
        </div>
        <span className="text-[11px] text-slate-400">
          Focus paths for {activeVenture.stage.toUpperCase()} stage
        </span>
      </div>

      {/* 4 Distinct Non-Overlapping Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Branch 1: Diagnostic & Audit */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold">
                  A
                </span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Diagnostic Branch
                </span>
              </div>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                Readiness Audit
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {readinessScore > 0 ? readinessScore : '--'}
              </span>
              <span className="text-xs text-slate-400">/ 100 benchmark score</span>
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {readinessScore > 0
                ? `Assessed across 9 core pillars. Next unlock: Formalize DPIIT incorporation to qualify for seed grants.`
                : 'Run the 9-pillar diagnostic to identify regulatory and product vulnerabilities.'}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">9 Diagnostic Pillars</span>
            <Link
              to="/readiness"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>{readinessScore > 0 ? 'Review Diagnostic' : 'Start Audit'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Branch 2: Capital & Verified Schemes */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold">
                  B
                </span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Capital Branch
                </span>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Verified Grants
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {matchedOpportunities.map(opp => (
                <div
                  key={opp.id}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <div className="font-semibold text-slate-800 truncate">{opp.title}</div>
                    <div className="text-[10px] text-slate-500">{opp.fundingAmount}</div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                    {opp.deadline || 'Always Open'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {matchedOpportunities.length} Verified Calls
            </span>
            <Link
              to="/opportunities?tab=recommended"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Explore Schemes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Branch 3: Execution & Milestones */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  C
                </span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Execution Branch
                </span>
              </div>
              <button
                onClick={() => setShowAddMilestone(!showAddMilestone)}
                className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Quick Milestone Form */}
            {showAddMilestone && (
              <form onSubmit={handleAddMilestone} className="mt-3 flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. File provisional patent..."
                  value={newMilestoneText}
                  onChange={e => setNewMilestoneText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700"
                >
                  Save
                </button>
              </form>
            )}

            {/* Milestones list */}
            <div className="mt-3 space-y-1.5">
              {activeVenture.milestones && activeVenture.milestones.length > 0 ? (
                activeVenture.milestones.slice(0, 3).map(m => (
                  <div
                    key={m.id}
                    onClick={() => handleToggleMilestone(m.id)}
                    className="p-2 rounded border border-slate-100 bg-slate-50 hover:bg-white cursor-pointer transition-colors flex items-center gap-2 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={m.completed}
                      onChange={() => {}}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span
                      className={`truncate ${
                        m.completed ? 'line-through text-slate-400' : 'text-slate-700'
                      }`}
                    >
                      {m.title}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-2">No active milestones.</div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {activeVenture.milestones.filter(m => m.completed).length}/
              {activeVenture.milestones.length} Completed
            </span>
            <Link
              to="/freelancers"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Vetted Co-Builders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Branch 4: Guidance & Knowledge */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold">
                  D
                </span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Advisory Branch
                </span>
              </div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                Knowledge & Mentors
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="font-semibold text-slate-800">
                  DPIIT Startup Recognition Blueprint
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Prerequisites, Section 80-IAC tax holiday & SISFS fast-track filing.
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Dr. Ramesh Venkatesh</div>
                  <div className="text-[10px] text-slate-500">Ex-CTO & Venture Partner</div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  Connected
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/resources"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Toolkits Hub
            </Link>
            <Link
              to="/mentors"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Mentors Network</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
