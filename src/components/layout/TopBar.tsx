import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Bell,
  Search,
  ChevronDown,
  Plus,
  Check,
  Sparkles,
  User as UserIcon,
  LogOut,
  Layers,
  Menu,
  ArrowRight
} from 'lucide-react';

interface TopBarProps {
  onOpenAskSutra: () => void;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenAskSutra, onOpenMobileMenu }) => {
  const { user, logout, loginAsDemo } = useAuth();
  const { ventures, activeVenture, setActiveVentureId } = useVenture();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [ventureMenuOpen, setVentureMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const ventureRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ventureRef.current && !ventureRef.current.contains(e.target as Node)) {
        setVentureMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifMenuOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/opportunities?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const isFreelancer = user?.role === 'freelancer';

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Active Venture Dropdown Switcher */}
        {!isFreelancer && (
          <div className="relative" ref={ventureRef}>
            <button
              onClick={() => setVentureMenuOpen(!ventureMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {activeVenture ? activeVenture.name.charAt(0) : 'V'}
              </div>
              <span className="text-xs font-semibold text-slate-800 max-w-[130px] sm:max-w-[170px] truncate">
                {activeVenture ? activeVenture.name : 'Select Venture'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {ventureMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Venture
                </div>
                <div className="max-h-52 overflow-y-auto py-1">
                  {ventures.map(v => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setActiveVentureId(v.id);
                        setVentureMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        activeVenture?.id === v.id ? 'bg-blue-50/60 font-semibold' : ''
                      }`}
                    >
                      <div className="truncate">
                        <div className="text-xs text-slate-800 truncate">{v.name}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{v.stage} Stage</div>
                      </div>
                      {activeVenture?.id === v.id && (
                        <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="p-1.5 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setVentureMenuOpen(false);
                      navigate('/ventures?action=new');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Venture</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search schemes, guides, talent..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Single Ask SUTRA Trigger */}
        <button
          onClick={onOpenAskSutra}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-medium text-slate-700 hover:text-blue-700 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Ask SUTRA</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-fadeIn">
              <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">No notifications.</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markAsRead(n.id);
                        if (n.link) {
                          setNotifMenuOpen(false);
                          navigate(n.link);
                        }
                      }}
                      className={`p-3 hover:bg-slate-50 cursor-pointer text-xs ${!n.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="font-semibold text-slate-800">{n.title}</div>
                      <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name.charAt(0) || 'U'
              )}
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fadeIn text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-800">{user?.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account & Settings</span>
                </Link>
                <Link
                  to="/ventures"
                  onClick={() => setUserMenuOpen(false)}
                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Manage Ventures</span>
                </Link>
              </div>

              {/* Demo Switcher */}
              <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Switch Demo Persona
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <button
                    onClick={() => {
                      loginAsDemo('founder');
                      setUserMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className={`py-1 rounded text-center font-medium ${
                      user?.role === 'founder'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Founder
                  </button>
                  <button
                    onClick={() => {
                      loginAsDemo('freelancer');
                      setUserMenuOpen(false);
                      navigate('/freelancer-dashboard');
                    }}
                    className={`py-1 rounded text-center font-medium ${
                      user?.role === 'freelancer'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Freelancer
                  </button>
                </div>
              </div>

              <div className="p-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
