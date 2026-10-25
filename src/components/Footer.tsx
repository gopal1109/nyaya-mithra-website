import React from 'react';
import { Scale, ShieldCheck, Heart, ExternalLink, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenAbout: (tab?: string) => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAbout, onOpenAssistant }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Scale className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                NYAYA MITRA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering 1.4 billion Indian citizens to understand everyday legal rights, challenge
              unfair trade charges, resolve traffic challan issues, and find verified official government
              grievance portals without fear or legal jargon.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Civic-Tech Platform • Free Public Service</span>
            </div>
          </div>

          {/* Core Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore Rights
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Consumer Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('restaurant-dispute')}
                  className="hover:text-white transition-colors"
                >
                  Restaurant Bill Surcharges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Land & Property Rights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Traffic Challan Disputes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Fundamental Rights (Part III)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Cybercrime & Banking Fraud
                </button>
              </li>
            </ul>
          </div>

          {/* Action Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Citizen Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('instant-guide')}
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  Whom & How to Complain
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('analyzer')}
                  className="hover:text-white transition-colors"
                >
                  Problem Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('report')}
                  className="hover:text-white transition-colors"
                >
                  Draft Complaint Letter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracker')}
                  className="hover:text-white transition-colors"
                >
                  My Case Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('laws')}
                  className="hover:text-white transition-colors"
                >
                  Indian Laws Database
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white transition-colors"
                >
                  Official Govt Helplines
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssistant}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  Ask Nyaya AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Essential Helplines & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Emergency & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>112 (National Emergency)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                <span>1915 (Consumer Helpline)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>1930 (Cyber Fraud)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-green-400" />
                <span>15100 (Free Legal Aid)</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onOpenAbout('disclaimer')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Legal Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAbout('privacy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAbout('terms')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Notice Required by Specification */}
        <div className="pt-6 pb-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center sm:text-left sm:flex items-start justify-between gap-4">
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">
                IMPORTANT LEGAL DISCLAIMER:
              </span>
              NYAYA MITRA is an independent legal awareness and grievance assistance platform. It is not
              a government website, court of law, police authority, or law enforcement agency, and does
              not provide a substitute for professional legal advice or formal representation by an
              enrolled advocate.
            </div>
            <button
              onClick={() => onOpenAbout('about')}
              className="mt-3 sm:mt-0 text-xs font-semibold px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg whitespace-nowrap transition-colors"
            >
              Our Mission
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-4 gap-2">
          <p>© {new Date().getFullYear()} NYAYA MITRA. Built for Indian Citizen Empowerment.</p>
          <div className="flex items-center gap-4">
            <span>Server-side AI Grounded</span>
            <span>•</span>
            <span>Zero Slop • High-Contrast Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
