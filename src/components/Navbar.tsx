import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  Search,
  BookOpen,
  FileText,
  User,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
  onOpenAuth: () => void;
  onOpenAbout: (tab?: string) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAssistant,
  onOpenAuth,
  onOpenAbout,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'instant-guide', label: 'Whom & How to Complain' },
    { id: 'categories', label: 'Explore Rights' },
    { id: 'laws', label: 'Explore Laws' },
    { id: 'restaurant-dispute', label: 'Bill Dispute' },
    { id: 'report', label: 'Draft Complaint' },
    { id: 'tracker', label: 'My Cases' },
    { id: 'resources', label: 'Official Portals' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Tricolor top subtle accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-orange-500 via-white to-green-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                  NYAYA MITRA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  Civic-Tech
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-0.5">
                Know Your Rights. Stand for What&apos;s Right.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Nyaya AI Assistant button & User / Auth */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3 py-1.5 text-xs xl:text-sm font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded-lg shadow-sm hover:shadow transition-all group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Nyaya AI</span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1 py-0.5 rounded">
                Free
              </span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[90px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('tracker');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-slate-500" />
                      My Saved Cases
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAbout('privacy');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4 text-slate-500" />
                      Privacy & Data
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 text-xs xl:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => onNavigate('report')}
              className="px-3.5 py-1.5 text-xs xl:text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs hover:shadow transition-all"
            >
              Get Help
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAssistant}
              className="p-1.5 rounded-lg bg-slate-900 text-amber-400"
              title="Nyaya AI"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-left rounded-lg text-xs font-semibold ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            {user ? (
              <div className="flex items-center justify-between w-full px-2 py-1 bg-slate-50 rounded-lg">
                <span className="text-xs font-semibold text-slate-800 truncate">
                  Logged in: {user.name}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg text-center"
              >
                Sign In / Register
              </button>
            )}
            <button
              onClick={() => {
                onNavigate('report');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-bold text-white bg-orange-600 rounded-lg text-center shadow-xs"
            >
              Report a Problem
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
