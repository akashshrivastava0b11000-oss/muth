import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SutraLogo } from '../../components/common/SutraLogo';
import { useAuth } from '../../context/AuthContext';
import { StartupStage } from '../../types';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  Briefcase,
  MapPin,
  Building,
  Target,
  FileCode,
  DollarSign,
  ChevronRight
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const isFreelancer = user?.role === 'freelancer';

  // Founder Form State
  const [stage, setStage] = useState<StartupStage>('build');
  const [industry, setIndustry] = useState('AgriTech & Climate');
  const [location, setLocation] = useState('Bangalore, India');
  const [supportNeeds, setSupportNeeds] = useState<string[]>(['Government Grants', 'Pilot Customers']);
  const [ventureName, setVentureName] = useState('');
  const [ventureTagline, setVentureTagline] = useState('');
  const [ventureDescription, setVentureDescription] = useState('');

  // Freelancer Form State
  const [title, setTitle] = useState('Senior Full-Stack & Systems Architect');
  const [category, setCategory] = useState('Web & App Development');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, Cloud APIs');
  const [experienceYears, setExperienceYears] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(3000);
  const [portfolioUrl, setPortfolioUrl] = useState('https://github.com');
  const [serviceDesc, setServiceDesc] = useState('Rapid MVP delivery and scalable web architecture.');

  const toggleSupportNeed = (need: string) => {
    if (supportNeeds.includes(need)) {
      setSupportNeeds(supportNeeds.filter(n => n !== need));
    } else {
      setSupportNeeds([...supportNeeds, need]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFreelancer) {
      completeOnboarding({
        title,
        category,
        skills: skills.split(',').map(s => s.trim()),
        experienceYears,
        hourlyRate,
        location,
        portfolioUrls: [portfolioUrl],
        services: [
          {
            id: `srv-${Date.now()}`,
            title: serviceDesc,
            price: hourlyRate * 15,
            turnaround: '7 Days',
            description: serviceDesc
          }
        ]
      });
      navigate('/freelancer-dashboard');
    } else {
      completeOnboarding({
        stage,
        industry,
        location,
        supportNeeds,
        ventureName: ventureName.trim() || undefined,
        ventureTagline,
        ventureDescription
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-sutra-cloud py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <SutraLogo size="md" className="justify-center mb-3" />
          <h2 className="text-3xl font-extrabold text-sutra-navy">
            {isFreelancer ? 'Set Up Your Freelancer Profile' : 'Configure Your Entrepreneurial Profile'}
          </h2>
          <p className="mt-2 text-sm text-sutra-slate">
            {isFreelancer
              ? 'Tell founders about your services, skills, and availability.'
              : 'Help SUTRA personalize your opportunities, readiness diagnostic, and mentor matching.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sutra-md border border-sutra-border p-6 sm:p-10">
          <form onSubmit={handleFinish} className="space-y-6">
            {!isFreelancer ? (
              /* --- FOUNDER ONBOARDING --- */
              <>
                {/* Entrepreneurial Stage */}
                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-2">
                    Current Entrepreneurial Stage
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {[
                      { key: 'idea', label: 'Idea', sub: 'Conceptualizing' },
                      { key: 'validate', label: 'Validate', sub: 'Interviews & Test' },
                      { key: 'build', label: 'Build', sub: 'MVP & Telemetry' },
                      { key: 'launch', label: 'Launch', sub: 'First Customers' },
                      { key: 'scale', label: 'Scale', sub: 'Growth & Series A' },
                    ].map(st => (
                      <button
                        type="button"
                        key={st.key}
                        onClick={() => setStage(st.key as StartupStage)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          stage === st.key
                            ? 'border-sutra-royal bg-blue-50 text-sutra-navy font-bold ring-1 ring-sutra-royal'
                            : 'border-sutra-border bg-white text-sutra-slate hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm capitalize font-bold">{st.label}</div>
                        <div className="text-[10px] text-sutra-slate mt-0.5">{st.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Primary Industry / Sector
                    </label>
                    <select
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    >
                      <option>AgriTech & Climate</option>
                      <option>HealthTech & Diagnostics</option>
                      <option>AI & DeepTech</option>
                      <option>FinTech & Payments</option>
                      <option>CleanTech & Energy</option>
                      <option>SaaS & Developer Tools</option>
                      <option>B2B Marketplace & Commerce</option>
                      <option>Consumer / EdTech</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Base Location / City
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Bangalore, Mumbai, Pune, Delhi"
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    />
                  </div>
                </div>

                {/* Support Needs */}
                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-2">
                    Where Do You Most Need Immediate Support?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Government Grants (SISFS / BIG)',
                      'Seed Capital & Angel Investors',
                      'Technical MVP Architecture',
                      'UI/UX Design & Prototyping',
                      'Pilot Customers & B2B Sales',
                      'DPIIT & Legal Compliance',
                      'Experienced Mentors'
                    ].map(item => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleSupportNeed(item)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          supportNeeds.includes(item)
                            ? 'bg-sutra-royal text-white border-sutra-royal'
                            : 'bg-sutra-cloud text-sutra-slate border-sutra-border hover:border-gray-400'
                        }`}
                      >
                        {item} {supportNeeds.includes(item) ? '✓' : '+'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional First Venture Setup */}
                <div className="pt-4 border-t border-sutra-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-sutra-royal">
                      Add Your First Venture (Optional — or Skip for later)
                    </span>
                    <span className="text-[10px] text-sutra-slate">You can manage multiple ventures later</span>
                  </div>

                  <div className="space-y-3 bg-sutra-cloud/60 p-4 rounded-xl border border-sutra-border">
                    <div>
                      <input
                        type="text"
                        value={ventureName}
                        onChange={e => setVentureName(e.target.value)}
                        placeholder="Venture Name (e.g. BioVolt Clean Energy)"
                        className="w-full bg-white border border-sutra-border rounded-xl px-4 py-2 text-sm text-sutra-dark focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={ventureTagline}
                        onChange={e => setVentureTagline(e.target.value)}
                        placeholder="One-line elevator pitch or tagline"
                        className="w-full bg-white border border-sutra-border rounded-xl px-4 py-2 text-sm text-sutra-dark focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* --- FREELANCER ONBOARDING --- */
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. Senior Product Designer"
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Service Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    >
                      <option>UI/UX Design</option>
                      <option>Web & App Development</option>
                      <option>Marketing & Growth</option>
                      <option>Legal & Compliance</option>
                      <option>Pitch Decks & Financial Modeling</option>
                      <option>Brand Identity & Content</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Skills & Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    placeholder="React, Figma, Node.js, Python, AWS"
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={e => setExperienceYears(Number(e.target.value))}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Starting Hourly / Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={e => setHourlyRate(Number(e.target.value))}
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai, India"
                      className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Portfolio / GitHub / Dribbble Link
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={e => setPortfolioUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-sutra-navy uppercase tracking-wider mb-1">
                    Featured Starter Service Description
                  </label>
                  <textarea
                    rows={2}
                    value={serviceDesc}
                    onChange={e => setServiceDesc(e.target.value)}
                    placeholder="What can you deliver for an early-stage founder in your first milestone?"
                    className="w-full bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-sutra-royal hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-sutra-sm transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Complete Setup & Enter SUTRA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
