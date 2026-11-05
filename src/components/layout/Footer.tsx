import React from 'react';
import { Link } from 'react-router-dom';
import { SutraLogo } from '../common/SutraLogo';
import { ShieldCheck, Heart, ExternalLink, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sutra-navy text-white pt-16 pb-12 border-t border-sutra-navy/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <SutraLogo lightMode={true} size="md" />
            <p className="text-blue-100 text-sm max-w-sm leading-relaxed mt-3">
              One connecting thread across every stage of entrepreneurship. Bringing verified government schemes, venture readiness diagnostics, vetted co-builders, and ecosystem guidance into one unified platform.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-teal-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Government Schemes & Transparent Startup Data</span>
            </div>
          </div>

          {/* Column: Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-blue-200">
              <li>
                <Link to="/opportunities" className="hover:text-white transition-colors">
                  Opportunities & Schemes
                </Link>
              </li>
              <li>
                <Link to="/readiness" className="hover:text-white transition-colors">
                  AI Venture Readiness
                </Link>
              </li>
              <li>
                <Link to="/freelancers" className="hover:text-white transition-colors">
                  Freelancer Marketplace
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="hover:text-white transition-colors">
                  Mentors & Network
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Startup Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Ecosystem */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm text-blue-200">
              <li>
                <a
                  href="https://seedfund.startupindia.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Startup India SISFS</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://birac.nic.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>BIRAC Biotechnology</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://meitystartuphub.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>MeitY Startup Hub</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nidhi-prayas.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>DST NIDHI-PRAYAS</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column: About & Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              SUTRA Vision
            </h4>
            <p className="text-xs text-blue-200 leading-relaxed">
              Bridging the Idea-to-Action Gap. Built for aspiring founders, emerging ventures, and mission-driven service specialists.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-blue-300">
              <p>Indicative diagnostics.</p>
              <p className="mt-1">Empowering independent founders.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300 gap-4">
          <p>© {new Date().getFullYear()} SUTRA — The Venture Catalyst. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Connecting Idea to Opportunity</span>
            <span>•</span>
            <span>Blue & White Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
