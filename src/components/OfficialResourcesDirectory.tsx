import React, { useState } from 'react';
import {
  Building2,
  Search,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  FileText,
  Filter,
} from 'lucide-react';
import { OFFICIAL_RESOURCES } from '../data/officialResources';
import { OfficialResource } from '../types';

export const OfficialResourcesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('All');

  const filteredResources = OFFICIAL_RESOURCES.filter((res) => {
    const matchesSearch =
      res.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.relevantGrievanceTypes.some((g) =>
        g.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesJurisdiction =
      jurisdictionFilter === 'All' || res.jurisdiction === jurisdictionFilter;
    return matchesSearch && matchesJurisdiction;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Official Government Directory • Section 10</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Official Grievance Portals & Helplines
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Direct access to authorized Government of India complaint management systems, statutory
            ombudsmen, and emergency helplines. No third-party intermediaries.
          </p>
        </div>

        {/* Independence Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-bold text-slate-900 mb-0.5">
              Notice on Official Links:
            </strong>
            The portals listed below are authentic government domains (.gov.in, .nic.in). NYAYA MITRA is
            an independent civic awareness platform and does not charge any fee for connecting citizens
            with these official resources.
          </div>
        </div>

        {/* Search & Jurisdiction Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by portal, grievance, or helpline (e.g. 1915, Cyber, RBI)..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['All', 'National', 'Banking & RBI', 'Consumer Forums'].map((cat) => (
              <button
                key={cat}
                onClick={() => setJurisdictionFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  jurisdictionFilter === cat
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                      Official Government Entity
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {res.organization}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                    Verified: {res.lastVerifiedDate}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{res.purpose}</p>

                {/* Helpline badge */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-bold text-slate-900">{res.helpline}</span>
                  </div>
                </div>

                {/* Relevant grievance types */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Relevant Grievance Types:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {res.relevantGrievanceTypes.map((type, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step by step submission instructions */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Basic Submission Instructions:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-600">
                    {res.basicInstructions.map((ins, idx) => (
                      <li key={idx}>{ins}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={res.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>Open Official Government Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
