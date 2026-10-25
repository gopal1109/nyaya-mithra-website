import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Scale,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { INDIAN_LAWS } from '../data/lawsData';
import { LawDetail } from '../types';

export const LawExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLaw, setSelectedLaw] = useState<LawDetail>(INDIAN_LAWS[0]);

  const filteredLaws = INDIAN_LAWS.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.importantProvisions.some(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.plainEnglish.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>Interactive Law Explorer • Section 11</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Indian Statutory Laws & Acts
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Plain-English explanations of key Indian legislation, fundamental constitutional rights,
            essential sections, and real-life everyday citizen examples.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center bg-white rounded-2xl border border-slate-300 shadow-2xs p-1.5 focus-within:border-blue-600">
            <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laws, sections, consumer rights, or RERA..."
              className="w-full py-2 text-xs sm:text-sm outline-hidden text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Two-Column Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Acts List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Select Legislation ({filteredLaws.length}):
            </h3>
            <div className="space-y-2">
              {filteredLaws.map((law) => {
                const isSelected = selectedLaw.id === law.id;
                return (
                  <button
                    key={law.id}
                    onClick={() => setSelectedLaw(law)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-blue-900 text-white shadow-md border-blue-950 ring-2 ring-blue-200'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className={isSelected ? 'text-amber-300' : 'text-slate-400'}>
                        {law.actNumberYear}
                      </span>
                      {law.lastAmended && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            isSelected
                              ? 'bg-blue-800 text-blue-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {law.lastAmended}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold line-clamp-2">{law.shortTitle}</h4>
                    <p
                      className={`text-[11px] line-clamp-2 mt-1 ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {law.purpose}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: In-Depth Breakdown of Selected Law */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Title & Authority */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  {selectedLaw.actNumberYear}
                </span>
                {selectedLaw.lastAmended && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Amended: {selectedLaw.lastAmended}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {selectedLaw.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Administered by: {selectedLaw.ministryOrAuthority}
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Statutory Purpose & Legislative Intent:
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {selectedLaw.purpose}
              </p>
            </div>

            {/* Important Provisions / Sections with Plain English */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-800" />
                Key Provisions & Plain-English Translations:
              </h3>
              <div className="space-y-3">
                {selectedLaw.importantProvisions.map((prov, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-900 font-mono">
                        {prov.section}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{prov.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {prov.plainEnglish}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Everyday Citizen Examples */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Everyday Citizen Scenarios:
              </h3>
              <div className="space-y-2 text-xs">
                {selectedLaw.everydayExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who it applies to & Limitations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Who It Applies To:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedLaw.whoItAppliesTo}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Exceptions & Limitations:
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-amber-900">
                  {selectedLaw.exceptionsLimitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official Source Link (Section 11 requirement) */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Grounded in verified official Indian Code records.
              </span>
              <a
                href={selectedLaw.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 underline"
              >
                <span>Read Original Full Statute on India Code</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
