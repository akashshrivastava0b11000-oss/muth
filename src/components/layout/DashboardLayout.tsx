import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AskSutraModal } from '../ai/AskSutraModal';

export const DashboardLayout: React.FC = () => {
  const [askSutraOpen, setAskSutraOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Minimal Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 bg-white h-full shadow-xl flex flex-col">
            <Sidebar mobileClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar
          onOpenAskSutra={() => setAskSutraOpen(true)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div key={location.pathname} className="max-w-6xl mx-auto pb-16 page-enter">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Single Controlled Ask SUTRA AI Modal */}
      <AskSutraModal isOpen={askSutraOpen} onClose={() => setAskSutraOpen(false)} />
    </div>
  );
};
