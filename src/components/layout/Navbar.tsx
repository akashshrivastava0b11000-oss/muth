import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SutraLogo } from '../common/SutraLogo';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ArrowRight, User as UserIcon, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sutra-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center">
          <SutraLogo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sutra-slate">
          <a href="#features" className="hover:text-sutra-royal transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-sutra-royal transition-colors">
            How It Works
          </a>
          <Link to="/opportunities" className="hover:text-sutra-royal transition-colors flex items-center gap-1">
            <span>Opportunities</span>
            <span className="text-[10px] uppercase font-bold bg-sutra-ice text-sutra-royal px-1.5 py-0.5 rounded-full">
              Verified
            </span>
          </Link>
          <a href="#about" className="hover:text-sutra-royal transition-colors">
            About
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={user.role === 'freelancer' ? '/freelancer-dashboard' : '/dashboard'}
                className="bg-sutra-royal text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-all shadow-sutra-sm flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={logout}
                className="text-xs text-sutra-slate hover:text-red-600 px-2 py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-sutra-navy hover:text-sutra-royal px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-sutra-royal text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-all shadow-sutra-sm flex items-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-sutra-slate hover:text-sutra-navy hover:bg-sutra-cloud"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sutra-border bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-sutra-navy hover:text-sutra-royal"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-sutra-navy hover:text-sutra-royal"
          >
            How It Works
          </a>
          <Link
            to="/opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-sutra-navy hover:text-sutra-royal"
          >
            Opportunities & Schemes
          </Link>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-sutra-navy hover:text-sutra-royal"
          >
            About
          </a>
          <div className="pt-4 border-t border-sutra-border space-y-2">
            {user ? (
              <Link
                to={user.role === 'freelancer' ? '/freelancer-dashboard' : '/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block bg-sutra-royal text-white py-3 rounded-xl font-medium text-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block text-sutra-navy border border-sutra-border py-2.5 rounded-xl font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block bg-sutra-royal text-white py-2.5 rounded-xl font-medium text-sm"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
