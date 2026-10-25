import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  FileCheck2,
  Building,
  Car,
  UtensilsCrossed,
  AlertCircle,
} from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onNavigate: (view: string) => void;
  onQuickSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onNavigate,
  onQuickSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const exampleSearches = [
    { text: 'Restaurant charged me extra.', category: 'consumer', target: 'restaurant-dispute' },
    { text: 'My refund has been rejected.', category: 'consumer', target: 'analyzer' },
    { text: 'I received an incorrect traffic challan.', category: 'traffic', target: 'analyzer' },
    { text: 'Someone is occupying my land.', category: 'property', target: 'analyzer' },
    { text: 'An online seller cheated me.', category: 'cyber', target: 'analyzer' },
    { text: 'A company is refusing to provide a service.', category: 'consumer', target: 'analyzer' },
    { text: 'I want to understand my fundamental rights.', category: 'constitutional', target: 'laws' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/70 via-white to-slate-50 py-12 md:py-20 border-b border-slate-200">
      {/* Decorative civic background elements */}
      <div className="absolute inset-0 ashoka-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Subtle Indian Civic Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span>Indian Legal Awareness & Grievance Assistance</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-bold">Nyaya Mitra</span>
            </div>

            {/* Exact Required Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Facing an Unfair Situation?{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900">
                Know Your Rights.
              </span>
            </h1>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From hidden restaurant charges to property disputes, traffic challans, online fraud,
              and consumer complaints, understand your rights and discover the right steps to take.
            </p>

            {/* Big Prominent Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto lg:mx-0">
              <div className="relative flex items-center bg-white rounded-2xl shadow-md border-2 border-slate-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all p-1.5">
                <div className="pl-3.5 pr-2 text-slate-400">
                  <Search className="w-5 h-5 text-blue-900" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Describe your problem (e.g. restaurant charged extra, refund denied, wrong challan)..."
                  className="w-full py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent outline-hidden font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 sm:py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shadow-sm"
                >
                  <span>Get Complaint Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Example searches displayed below search bar */}
            <div className="space-y-2 text-left max-w-2xl mx-auto lg:mx-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Common Situations (click to see whom & how to complain):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exampleSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchInput(item.text);
                      onQuickSearch(item.text);
                    }}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-900 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onNavigate('instant-guide')}
                className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Whom & How to Complain</span>
              </button>

              <button
                onClick={() => onNavigate('categories')}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Laws & Rights</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Exact Required Trust Message */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span>Clear information. Official resources. Informed decisions.</span>
            </div>
          </div>

          {/* Right Column: Custom Modern Civic Illustration Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative card */}
              <div className="absolute -inset-1 bg-linear-to-r from-orange-400 via-blue-500 to-green-500 rounded-3xl blur-md opacity-25"></div>

              <div className="relative bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950 flex items-center justify-center text-amber-400 shadow-md">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">
                        Nyaya Mitra Guidance
                      </h3>
                      <p className="text-xs text-slate-500">Citizen Legal Support Matrix</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Verified
                  </span>
                </div>

                {/* Interactive Preview Cards */}
                <div className="space-y-3">
                  <div
                    onClick={() => onNavigate('restaurant-dispute')}
                    className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 hover:bg-orange-50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-500 text-white">
                        <UtensilsCrossed className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-orange-900">
                          Restaurant Service Charge Dispute
                        </p>
                        <p className="text-[11px] text-slate-500">
                          CCPA Guidelines 2022 • Voluntary nature
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-orange-600">Simulate →</span>
                  </div>

                  <div
                    onClick={() => onNavigate('categories')}
                    className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 hover:bg-blue-50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-700 text-white">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                          Traffic Challan Virtual Court
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Parivahan dispute • DigiLocker Rule 139
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-700">Guide →</span>
                  </div>

                  <div
                    onClick={() => onNavigate('laws')}
                    className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 hover:bg-emerald-50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-600 text-white">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                          Constitution Part III Rights
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Articles 14 to 32 • Writ Remedies
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Read →</span>
                  </div>
                </div>

                {/* Educational Notice */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>
                    No legal knowledge required. We translate complex statutes into straightforward
                    steps and connect you directly with official government portals.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
