import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SutraLogo } from '../common/SutraLogo';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import {
  GitFork,
  Compass,
  BrainCircuit,
  Users,
  UserCheck,
  BookOpen,
  Rocket,
  User,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  mobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileClose }) => {
  const { user } = useAuth();
  const { activeVenture } = useVenture();

  const isFreelancer = user?.role === 'freelancer';

  interface NavItem {
    label: string;
    to: string;
    icon: React.ElementType;
    branchTag?: string;
  }

  const founderBranches: NavItem[] = [
    { label: 'Venture Roadmap', to: '/dashboard', icon: GitFork },
    { label: 'Readiness Diagnostic', to: '/readiness', icon: BrainCircuit, branchTag: 'Audit' },
    { label: 'Schemes & Grants', to: '/opportunities', icon: Compass, branchTag: 'Capital' },
    { label: 'Co-Builders & Talent', to: '/freelancers', icon: Users, branchTag: 'Talent' },
    { label: 'Mentors & Advisory', to: '/mentors', icon: UserCheck, branchTag: 'Guidance' },
    { label: 'Toolkits & Blueprints', to: '/resources', icon: BookOpen, branchTag: 'Guides' },
  ];

  const managementItems: NavItem[] = [
    { label: 'My Ventures', to: '/ventures', icon: Rocket },
    { label: 'Account & Settings', to: '/profile', icon: User },
  ];

  const freelancerNavItems: NavItem[] = [
    { label: 'Freelancer Workspace', to: '/freelancer-dashboard', icon: Briefcase },
    { label: 'Schemes & Grants', to: '/opportunities', icon: Compass },
    { label: 'Toolkits & Guides', to: '/resources', icon: BookOpen },
    { label: 'Profile & Settings', to: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-slate-100">
        <Link to="/" onClick={mobileClose} className="flex items-center">
          <SutraLogo size="sm" showTagline={false} />
        </Link>
      </div>

      {/* Active Venture Capsule */}
      {!isFreelancer && activeVenture && (
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Active Venture
          </div>
          <div className="font-semibold text-xs text-slate-800 truncate mt-0.5">
            {activeVenture.name}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-medium text-slate-500 capitalize">
              {activeVenture.stage} Stage
            </span>
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {!isFreelancer ? (
          <>
            <div>
              <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Venture Branches
              </div>
              <nav className="space-y-0.5">
                {founderBranches.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={mobileClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.branchTag && !isActive && (
                            <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {item.branchTag}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Portfolio
              </div>
              <nav className="space-y-0.5">
                {managementItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={mobileClose}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </>
        ) : (
          <nav className="space-y-0.5">
            {freelancerNavItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={mobileClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        )}
      </div>

      {/* Subtle Footer Note */}
      <div className="p-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
        SUTRA System • v1.0
      </div>
    </aside>
  );
};
