import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVenture } from '../../context/VentureContext';
import { Venture, StartupStage } from '../../types';
import {
  Rocket,
  Plus,
  Check,
  Edit2,
  Trash2,
  Archive,
  ExternalLink,
  MapPin,
  Building,
  Target,
  BrainCircuit,
  ArrowRight,
  Bookmark,
  FileText,
  X
} from 'lucide-react';

export const VenturesPage: React.FC = () => {
  const {
    ventures,
    activeVenture,
    setActiveVentureId,
    createVenture,
    updateVenture,
    deleteVenture,
    archiveVenture
  } = useVenture();

  const location = useLocation();
  const navigate = useNavigate();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenture, setEditingVenture] = useState<Venture | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('AgriTech & Climate');
  const [locationField, setLocationField] = useState('Bangalore, India');
  const [stage, setStage] = useState<StartupStage>('build');
  const [businessModel, setBusinessModel] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [problemSolved, setProblemSolved] = useState('');

  // Check URL params for ?action=new
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      openCreateModal();
    }
  }, [location.search]);

  const openCreateModal = () => {
    setEditingVenture(null);
    setName('');
    setTagline('');
    setDescription('');
    setIndustry('AgriTech & Climate');
    setLocationField('Bangalore, India');
    setStage('idea');
    setBusinessModel('B2B SaaS / Subscription');
    setTargetAudience('');
    setProblemSolved('');
    setIsModalOpen(true);
  };

  const openEditModal = (v: Venture) => {
    setEditingVenture(v);
    setName(v.name);
    setTagline(v.tagline);
    setDescription(v.description);
    setIndustry(v.industry);
    setLocationField(v.location);
    setStage(v.stage);
    setBusinessModel(v.businessModel);
    setTargetAudience(v.targetAudience);
    setProblemSolved(v.problemSolved);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingVenture) {
      updateVenture({
        ...editingVenture,
        name,
        tagline,
        description,
        industry,
        location: locationField,
        stage,
        businessModel,
        targetAudience,
        problemSolved
      });
    } else {
      createVenture({
        name,
        tagline,
        description,
        industry,
        location: locationField,
        stage,
        businessModel,
        targetAudience,
        problemSolved
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteVenture(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sutra-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
            My Ventures Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-sutra-slate mt-1">
            Manage multiple independent startups under your account with strictly segregated schemes, scores, and milestones.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-sutra-royal hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sutra-sm flex items-center gap-2 transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Venture</span>
        </button>
      </div>

      {/* Ventures Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ventures.map(v => {
          const isActive = activeVenture?.id === v.id;

          return (
            <div
              key={v.id}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between shadow-sutra-sm ${
                isActive
                  ? 'border-sutra-royal ring-2 ring-sutra-royal/20 shadow-sutra-md'
                  : 'border-sutra-border hover:border-gray-300'
              } ${v.isArchived ? 'opacity-60 bg-gray-50' : ''}`}
            >
              <div>
                {/* Top status bar */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sutra-ice text-sutra-royal">
                      {v.stage} Stage
                    </span>
                    <span className="text-xs text-sutra-slate">{v.industry}</span>
                  </div>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-sutra-royal bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      <Check className="w-3.5 h-3.5" />
                      Active Cockpit
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveVentureId(v.id)}
                      className="text-xs font-bold text-sutra-slate hover:text-sutra-royal px-2.5 py-1 rounded-full border border-sutra-border hover:bg-sutra-cloud transition-colors"
                    >
                      Switch to this
                    </button>
                  )}
                </div>

                {/* Venture Title & Tagline */}
                <h3 className="text-xl font-bold text-sutra-navy mt-4">{v.name}</h3>
                <p className="text-xs text-sutra-slate mt-1 line-clamp-2 leading-relaxed">
                  {v.tagline || v.description}
                </p>

                {/* Metadata Pills */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-sutra-cloud border border-sutra-border">
                    <span className="text-[10px] font-bold text-sutra-slate uppercase block">Target Market</span>
                    <span className="font-semibold text-sutra-navy truncate block mt-0.5">
                      {v.targetAudience || 'General enterprise'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-sutra-cloud border border-sutra-border">
                    <span className="text-[10px] font-bold text-sutra-slate uppercase block">Readiness Diagnostic</span>
                    <span className="font-semibold text-sutra-royal block mt-0.5">
                      {v.latestReadinessScore ? `${v.latestReadinessScore}/100` : 'Not assessed yet'}
                    </span>
                  </div>
                </div>

                {/* Problem solved */}
                {v.problemSolved && (
                  <div className="mt-3 text-xs text-sutra-slate line-clamp-2 italic bg-blue-50/40 p-2.5 rounded-xl border border-blue-100">
                    <strong>Problem:</strong> {v.problemSolved}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-sutra-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(v)}
                    className="p-2 rounded-lg text-sutra-slate hover:text-sutra-navy hover:bg-sutra-cloud transition-colors"
                    title="Edit Venture"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => archiveVenture(v.id)}
                    className="p-2 rounded-lg text-sutra-slate hover:text-sutra-navy hover:bg-sutra-cloud transition-colors"
                    title={v.isArchived ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(v.id)}
                    className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete Venture"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActiveVentureId(v.id);
                    navigate('/dashboard');
                  }}
                  className="text-xs font-bold text-sutra-royal hover:underline flex items-center gap-1"
                >
                  <span>Open Cockpit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-sutra-border text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-sutra-navy">Delete Venture Permanently?</h3>
            <p className="text-xs text-sutra-slate mt-2">
              Are you sure you want to delete this venture? Its milestones, readiness history, and application records will be removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 px-3 border border-sutra-border rounded-xl text-xs font-semibold text-sutra-slate hover:bg-sutra-cloud"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Venture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-sutra-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-sutra-border">
              <h3 className="text-lg font-bold text-sutra-navy">
                {editingVenture ? 'Edit Venture Details' : 'Create New Venture'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-sutra-slate hover:text-sutra-navy hover:bg-sutra-cloud"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Venture Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. AgroPulse AI"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Tagline / High-Concept Pitch
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g. Satellite IoT telemetry for smallholder farmers"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  >
                    <option>AgriTech & Climate</option>
                    <option>HealthTech</option>
                    <option>AI/DeepTech</option>
                    <option>FinTech</option>
                    <option>CleanTech / Sustainability</option>
                    <option>SaaS & B2B</option>
                    <option>EdTech</option>
                    <option>Manufacturing / Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Current Stage
                  </label>
                  <select
                    value={stage}
                    onChange={e => setStage(e.target.value as StartupStage)}
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  >
                    <option value="idea">Idea (Conceptual)</option>
                    <option value="validate">Validate (Interviews & Surveys)</option>
                    <option value="build">Build (Prototype & MVP)</option>
                    <option value="launch">Launch (Early Users)</option>
                    <option value="scale">Scale (Expansion)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Headquarters / Location
                  </label>
                  <input
                    type="text"
                    value={locationField}
                    onChange={e => setLocationField(e.target.value)}
                    placeholder="Bangalore, India"
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Business Model
                  </label>
                  <input
                    type="text"
                    value={businessModel}
                    onChange={e => setBusinessModel(e.target.value)}
                    placeholder="B2B SaaS, Hardware Subscription, etc."
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  placeholder="Who is the exact buyer or user?"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                  Problem Being Solved
                </label>
                <textarea
                  rows={2}
                  value={problemSolved}
                  onChange={e => setProblemSolved(e.target.value)}
                  placeholder="Describe the painful problem in 1-2 sentences"
                  className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                />
              </div>

              <div className="pt-4 border-t border-sutra-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-sutra-slate hover:bg-sutra-cloud rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sutra-royal hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sutra-sm"
                >
                  {editingVenture ? 'Save Changes' : 'Create Venture'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
