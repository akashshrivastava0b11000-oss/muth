import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import { Resource } from '../../types';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Download,
  Bookmark,
  ExternalLink,
  Tag,
  Clock,
  Sparkles,
  X,
  FileText
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { activeVenture, toggleSaveResource, isResourceSaved } = useVenture();
  const [resources, setResources] = useState<Resource[]>(() => storage.getResources());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [readingResource, setReadingResource] = useState<Resource | null>(null);

  const toggleComplete = (id: string) => {
    storage.toggleResourceComplete(id);
    setResources(storage.getResources());
  };

  const filteredResources = resources.filter(res => {
    if (selectedCategory !== 'all' && res.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchTags = res.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  const handleDownload = (filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([
      `SUTRA VENTURE CATALYST - ${filename}\nGenerated for ${activeVenture?.name || 'Founder'}\n\nContents verified by SUTRA Research Engine.\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sutra-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
            Founder Knowledge Hub & Actionable Toolkits
          </h1>
          <p className="text-xs sm:text-sm text-sutra-slate mt-1">
            Curated blueprints, legal contract templates, unit economics frameworks, and validation roadmaps.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-sutra-ice text-sutra-royal border border-blue-200 w-fit">
          100% Free Ecosystem Playbooks
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-sutra-border shadow-sutra-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-sutra-slate absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search checklists, pitch templates, legal guides..."
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
            <option value="all">All Disciplines</option>
            <option value="Idea Validation">Idea Validation</option>
            <option value="Legal and Registration">Legal and Registration</option>
            <option value="Funding">Funding & Pitch Decks</option>
            <option value="Business Planning">Business Planning</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(res => {
          const isSaved = isResourceSaved(res.id);

          return (
            <div
              key={res.id}
              className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sutra-ice text-sutra-royal">
                    {res.type}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleComplete(res.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        res.completed
                          ? 'bg-green-100 border-green-300 text-sutra-green'
                          : 'border-sutra-border text-sutra-slate hover:bg-sutra-cloud'
                      }`}
                      title={res.completed ? 'Marked as Completed' : 'Mark Complete'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSaveResource(res.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-sutra-ice border-sutra-royal text-sutra-royal'
                          : 'border-sutra-border text-sutra-slate hover:bg-sutra-cloud'
                      }`}
                      title={isSaved ? 'Saved' : 'Save'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-sutra-navy mt-3 line-clamp-2">
                  {res.title}
                </h3>
                <p className="text-xs text-sutra-slate mt-1.5 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-[11px] text-sutra-slate pt-3 border-t border-sutra-border/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {res.readTime}
                  </span>
                  <span className="font-semibold text-sutra-navy">{res.source}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-sutra-border flex items-center justify-between gap-2">
                <button
                  onClick={() => setReadingResource(res)}
                  className="text-xs font-bold text-sutra-royal hover:underline"
                >
                  Read Blueprint
                </button>

                {res.downloadFilename && (
                  <button
                    onClick={() => handleDownload(res.downloadFilename!)}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-sutra-cloud text-sutra-navy hover:bg-sutra-ice transition-colors border border-sutra-border"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reader Modal */}
      {readingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sutra-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-sutra-border">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-sutra-ice text-sutra-royal">
                  {readingResource.type} • {readingResource.category}
                </span>
                <h3 className="text-lg font-bold text-sutra-navy mt-1">
                  {readingResource.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingResource(null)}
                className="p-1 text-sutra-slate hover:text-sutra-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 prose prose-sm text-xs leading-relaxed text-sutra-dark whitespace-pre-line">
              {readingResource.content || readingResource.description}
            </div>

            <div className="mt-6 pt-4 border-t border-sutra-border flex items-center justify-between">
              <button
                onClick={() => toggleComplete(readingResource.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                  readingResource.completed
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-white border-sutra-border text-sutra-slate hover:bg-sutra-cloud'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{readingResource.completed ? 'Completed' : 'Mark as Completed'}</span>
              </button>

              <button
                onClick={() => setReadingResource(null)}
                className="px-4 py-2 bg-sutra-royal hover:bg-blue-700 text-white rounded-xl text-xs font-semibold"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
