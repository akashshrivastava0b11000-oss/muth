import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  CheckCircle2,
  TrendingUp,
  Users,
  BrainCircuit,
  Rocket,
  Award,
  Layers,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sutra-cloud flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-sutra-cloud to-sutra-cloud">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sutra-ice text-sutra-royal text-xs font-semibold mb-6 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5 text-sutra-teal" />
            <span>One connecting thread. Every stage of entrepreneurship.</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sutra-navy tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            From Your First Idea to Your{' '}
            <span className="text-sutra-royal inline-block underline decoration-sutra-sky decoration-wavy underline-offset-8">
              Next Big Opportunity.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="mt-6 text-lg sm:text-xl text-sutra-slate max-w-3xl mx-auto leading-relaxed">
            Your entrepreneurial journey deserves more than scattered resources and disconnected platforms. Discover verified government schemes, connect with vetted co-builders, assess venture readiness, and access the exact support you need — all through one connected ecosystem.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-sutra-royal hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-sutra-md hover:shadow-sutra-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/opportunities"
              className="w-full sm:w-auto bg-white hover:bg-sutra-cloud text-sutra-navy border border-sutra-border px-8 py-3.5 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-sutra-royal" />
              <span>Explore Opportunities</span>
            </Link>
          </div>

          {/* Trust Metrics Pill */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-sutra-slate font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sutra-green" />
              <span>DPIIT & State Schemes Verified</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-sutra-teal" />
              <span>9-Category AI Readiness Diagnostic</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sutra-royal" />
              <span>Multi-Venture Architecture</span>
            </div>
          </div>

          {/* Interactive Hero Product Preview */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sutra-lg border border-sutra-border overflow-hidden text-left">
              {/* Fake Browser Top Bar */}
              <div className="bg-sutra-navy/5 px-4 py-3 border-b border-sutra-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
                  <span className="text-xs text-sutra-slate ml-3 font-mono">
                    app.sutra.io/dashboard/agropulse-ai
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-sutra-royal flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sutra-green"></span>
                  Live Connected Ecosystem
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6 sm:p-8 bg-white grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Venture Card */}
                <div className="lg:col-span-2 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sutra-border gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-sutra-royal bg-sutra-ice px-2 py-0.5 rounded-full">
                          Active Venture: Build Stage
                        </span>
                        <span className="text-xs text-sutra-slate">AgriTech & Climate</span>
                      </div>
                      <h3 className="text-2xl font-bold text-sutra-navy mt-1">AgroPulse AI</h3>
                      <p className="text-xs text-sutra-slate mt-0.5">
                        Precision irrigation & crop health telemetry via satellite IoT
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center sm:text-right">
                      <div className="text-[11px] font-bold text-sutra-slate uppercase">Readiness Score</div>
                      <div className="text-2xl font-black text-sutra-royal">78<span className="text-xs font-normal text-sutra-slate">/100</span></div>
                    </div>
                  </div>

                  {/* Stage Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-sutra-slate mb-2">
                      <span className="text-sutra-green">1. Idea ✓</span>
                      <span className="text-sutra-green">2. Validate ✓</span>
                      <span className="text-sutra-royal font-black">3. Build (Active)</span>
                      <span className="text-gray-400">4. Launch</span>
                      <span className="text-gray-400">5. Scale</span>
                    </div>
                    <div className="w-full bg-sutra-cloud h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-sutra-green via-sutra-royal to-blue-400 h-full w-[60%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Recommended Scheme */}
                  <div className="p-4 bg-sutra-cloud rounded-xl border border-sutra-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Matched Scheme • 94% Fit
                        </span>
                        <h4 className="text-sm font-bold text-sutra-navy mt-1.5">
                          Startup India Seed Fund Scheme (SISFS)
                        </h4>
                        <p className="text-xs text-sutra-slate mt-0.5">
                          Up to ₹50 Lakhs (₹20L Grant + ₹30L Convertible Debt) for prototype commercialization.
                        </p>
                      </div>
                      <Link
                        to="/opportunities"
                        className="text-xs font-semibold bg-sutra-royal text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Quick Widgets */}
                <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-sutra-border pt-4 lg:pt-0 lg:pl-6">
                  <div className="bg-white rounded-xl p-3 border border-sutra-border">
                    <div className="text-[11px] font-bold text-sutra-slate uppercase">Recommended Specialist</div>
                    <div className="flex items-center gap-3 mt-2">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                        alt="Specialist"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-sutra-navy">Priyanka Sen</div>
                        <div className="text-[10px] text-sutra-slate">Principal Product Designer</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sutra-teal">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>SUTRA AI Insight</span>
                    </div>
                    <p className="text-xs text-sutra-slate mt-1 leading-snug">
                      Complete provisional patent filing to unlock tier-1 DPIIT fast-track grant status.
                    </p>
                  </div>

                  <Link
                    to="/readiness"
                    className="w-full block text-center py-2 text-xs font-semibold text-sutra-royal bg-sutra-ice hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    View Diagnostic Report →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white border-y border-sutra-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sutra-royal">
              The Startup Dilemma
            </h2>
            <h3 className="text-3xl font-extrabold text-sutra-navy mt-2 sm:text-4xl">
              Why Building a Venture Is Harder Than It Should Be
            </h3>
            <p className="mt-4 text-base text-sutra-slate">
              Support exists everywhere — but it is fractured across hundreds of portals, confusing schemes, and closed networks.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1 */}
            <div className="p-6 rounded-2xl bg-sutra-cloud border border-sutra-border hover:shadow-sutra-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-sutra-navy">Idea-to-Action Gap</h4>
              <p className="mt-2 text-sm text-sutra-slate leading-relaxed">
                Aspiring founders have promising concepts but lack structured, step-by-step roadmaps to validate customer demand before spending capital.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 rounded-2xl bg-sutra-cloud border border-sutra-border hover:shadow-sutra-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-sutra-navy">Network Dependency</h4>
              <p className="mt-2 text-sm text-sutra-slate leading-relaxed">
                Access to experienced mentors, angel investors, and co-builders is often restricted to elite alumni networks and tier-1 metro circles.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 rounded-2xl bg-sutra-cloud border border-sutra-border hover:shadow-sutra-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-sutra-royal flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-sutra-navy">Opportunity Discovery Gap</h4>
              <p className="mt-2 text-sm text-sutra-slate leading-relaxed">
                Countless government grants, seed schemes, and incubation calls go unnoticed or expire because there is no single verified source tracking them.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 rounded-2xl bg-sutra-cloud border border-sutra-border hover:shadow-sutra-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h4 className="text-lg font-bold text-sutra-navy">Resource Inequality</h4>
              <p className="mt-2 text-sm text-sutra-slate leading-relaxed">
                First-time entrepreneurs frequently sign predatory equity terms or pay exorbitant fees for basic legal blueprints and MVP specifications.
              </p>
            </div>

            {/* 5 */}
            <div className="p-6 rounded-2xl bg-sutra-cloud border border-sutra-border hover:shadow-sutra-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm mb-4">
                05
              </div>
              <h4 className="text-lg font-bold text-sutra-navy">Founder Overload</h4>
              <p className="mt-2 text-sm text-sutra-slate leading-relaxed">
                Juggling legal compliance, tech architecture, customer discovery, and pitch decks without specialized support leads to rapid burnout.
              </p>
            </div>

            {/* 6 */}
            <div className="p-6 rounded-2xl bg-sutra-cloud border border-sutra-border hover:shadow-sutra-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                06
              </div>
              <h4 className="text-lg font-bold text-sutra-navy">Growth & Continuity Gap</h4>
              <p className="mt-2 text-sm text-sutra-slate leading-relaxed">
                Startups that graduate from incubators often get lost when transitioning from prototype building to customer acquisition and scaling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-sutra-cloud" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sutra-navy rounded-3xl p-8 sm:p-14 text-white shadow-sutra-lg relative overflow-hidden">
            <div className="max-w-3xl space-y-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                The SUTRA Solution
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                One Unified Thread. Every Stage of Entrepreneurship.
              </h3>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                SUTRA is not just another directory. It is an intelligent operational cockpit that monitors your venture’s stage, identifies verified government funding programs, benchmarks your readiness across 9 core pillars, and pairs you with vetted builders to execute.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-100 font-medium">
                    Verified official application URLs and transparent deadlines.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-100 font-medium">
                    Multi-venture management with segregated data and metrics.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-100 font-medium">
                    AI diagnostic engine providing objective readiness benchmarks.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-100 font-medium">
                    Milestone-driven freelancer marketplace & mentor connections.
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-sutra-royal hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sutra-sm"
                >
                  <span>Build Your Venture with SUTRA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white border-b border-sutra-border" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sutra-royal">
              How It Works
            </h2>
            <h3 className="text-3xl font-extrabold text-sutra-navy mt-2 sm:text-4xl">
              A Structured Journey from Idea to Scale
            </h3>
            <p className="mt-4 text-base text-sutra-slate">
              Five intentional steps designed to eliminate friction and accelerate your entrepreneurial momentum.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                desc: 'Select whether you are a Founder building ventures or a Freelancer offering specialized skills.'
              },
              {
                step: '02',
                title: 'Add Your Venture',
                desc: 'Input your venture stage (Idea, Validate, Build, Launch, or Scale) and industry focus.'
              },
              {
                step: '03',
                title: 'Discover Schemes',
                desc: 'Access verified government grants, seed funds, and incubator calls curated for your stage.'
              },
              {
                step: '04',
                title: 'Assess Readiness',
                desc: 'Complete the 9-category diagnostic to uncover hidden risks, strengths, and next actions.'
              },
              {
                step: '05',
                title: 'Execute & Grow',
                desc: 'Hire vetted builders, consult verified mentors, and track milestone progression in one place.'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-sutra-cloud p-6 rounded-2xl border border-sutra-border relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-sutra-royal mb-3">{s.step}</div>
                  <h4 className="text-base font-bold text-sutra-navy">{s.title}</h4>
                  <p className="text-xs text-sutra-slate mt-2 leading-relaxed">{s.desc}</p>
                </div>
                <div className="w-8 h-1 bg-sutra-royal/20 rounded-full mt-6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-sutra-cloud" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sutra-royal">
              Platform Features
            </h2>
            <h3 className="text-3xl font-extrabold text-sutra-navy mt-2 sm:text-4xl">
              Engineered to Accelerate Every Stage
            </h3>
            <p className="mt-4 text-base text-sutra-slate">
              Comprehensive capabilities built specifically for founders, operators, and startup service professionals.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-sutra-teal flex items-center justify-center mb-4 border border-teal-100">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">AI Readiness Assessment</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Interactive diagnostic covering 9 essential pillars with radar breakdown, risks, and actionable next steps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-sutra-royal flex items-center justify-center mb-4 border border-blue-100">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Funding & Govt Schemes</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Centralized database of DPIIT SISFS, BIRAC BIG, NIDHI-PRAYAS, YC, and Techstars with verified links.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Freelancer Marketplace</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Find vetted UI/UX designers, full-stack engineers, and startup lawyers with transparent turnaround packages.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-sutra-green flex items-center justify-center mb-4 border border-emerald-100">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Mentors & Network</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Connect directly with experienced ecosystem operators and angel investors for tailored venture advice.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-sutra-amber flex items-center justify-center mb-4 border border-amber-100">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Resources & Guides</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Curated checklists, legal templates, pitch deck frameworks, and financial models tested by top founders.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Personalized Engine</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Recommendations that explain exactly *why* an opportunity fits your specific stage and business model.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Multi-Venture Cockpit</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Manage multiple startups simultaneously with strictly segregated saved items, scores, and applications.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white p-6 rounded-2xl border border-sutra-border shadow-sutra-sm hover:shadow-sutra-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-sutra-navy">Ask SUTRA Co-Pilot</h4>
              <p className="text-xs text-sutra-slate mt-2 leading-relaxed">
                Context-aware startup assistant ready to answer operational questions using your active venture profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-sutra-navy via-sutra-royal to-blue-700 rounded-3xl p-10 sm:p-14 text-white shadow-sutra-lg">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Advance Your Venture?
            </h3>
            <p className="mt-4 text-blue-100 max-w-2xl mx-auto text-base sm:text-lg">
              Join thousands of aspiring founders, early-stage ventures, and vetted professionals in one connected entrepreneurial ecosystem.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-white text-sutra-navy hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md"
              >
                Create Your Account Free
              </Link>
              <Link
                to="/opportunities"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold text-base transition-all"
              >
                View Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
