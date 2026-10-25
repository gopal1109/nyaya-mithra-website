import React, { useState } from 'react';
import {
  ShoppingBag,
  Home,
  Car,
  Shield,
  CreditCard,
  Lock,
  Building2,
  Briefcase,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  X,
} from 'lucide-react';
import { LEGAL_CATEGORIES } from '../data/legalCategories';
import { LegalCategory } from '../types';

interface LegalCategoriesGridProps {
  onSelectCategory: (category: LegalCategory) => void;
  onNavigateToAnalyzer: (categoryName: string) => void;
  onNavigateToReport: (categoryName: string) => void;
  selectedCategoryId?: string | null;
}

const iconMap: Record<string, React.ReactNode> = {
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-orange-600" />,
  Home: <Home className="w-6 h-6 text-amber-600" />,
  Car: <Car className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-indigo-600" />,
  CreditCard: <CreditCard className="w-6 h-6 text-emerald-600" />,
  Lock: <Lock className="w-6 h-6 text-rose-600" />,
  Building2: <Building2 className="w-6 h-6 text-teal-600" />,
  Briefcase: <Briefcase className="w-6 h-6 text-purple-600" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-pink-600" />,
};

export const LegalCategoriesGrid: React.FC<LegalCategoriesGridProps> = ({
  onSelectCategory,
  onNavigateToAnalyzer,
  onNavigateToReport,
  selectedCategoryId,
}) => {
  const [activeCategory, setActiveCategory] = useState<LegalCategory | null>(
    selectedCategoryId
      ? LEGAL_CATEGORIES.find((c) => c.id === selectedCategoryId) || null
      : null
  );

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            9 Comprehensive Indian Legal Domains
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Everyday Legal Rights & Protections
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Select any category below to understand governing acts, consumer protections, and official
            redressal authorities across Central and State jurisdictions.
          </p>
        </div>

        {/* 9 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEGAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {iconMap[cat.icon]}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {cat.code}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {cat.description}
                </p>

                {/* Subtopic tags preview */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Common Grievances:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cat.subtopics.slice(0, 3).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200/60"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {cat.subtopics.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 text-blue-700 font-semibold">
                        +{cat.subtopics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5 flex items-center justify-between text-xs font-bold text-blue-900 mt-2">
                <span>View Legal Rights & Steps</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Detail Modal */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  {iconMap[activeCategory.icon]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">{activeCategory.code}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-800 text-blue-100">
                      {activeCategory.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    {activeCategory.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
              <div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {activeCategory.description}
                </p>
                {activeCategory.id === 'land-property' && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      <strong>Important Notice on Land Laws:</strong> Land, tenancy, and revenue
                      records are State subjects in India. Statutory procedures and forms vary between
                      states (e.g. 7/12 in Maharashtra/Gujarat, Patta/Chitta in Tamil Nadu, Khata in
                      Karnataka, Jamabandi in Punjab/Haryana).
                    </span>
                  </div>
                )}
              </div>

              {/* Subtopics with real scenarios */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider text-blue-900">
                  Key Grievance Areas & Governing Laws
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {activeCategory.subtopics.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-slate-900 text-sm">{sub.name}</h5>
                        <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-900 rounded self-start">
                          {sub.governingAct}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{sub.description}</p>
                      <div className="pt-1">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Typical Examples:
                        </p>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-xs">
                          {sub.commonIssues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Advice */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  Practical Citizen Steps & Evidence Preservation
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeCategory.quickAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-1.5 shrink-0"></span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Official Portals */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Verified Official Government Portals:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCategory.officialChannels.map((ch, idx) => (
                    <a
                      key={idx}
                      href={ch.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-slate-900 text-xs group-hover:text-blue-900">
                          {ch.name}
                        </p>
                        {ch.helpline && (
                          <p className="text-[11px] text-green-700 font-semibold">{ch.helpline}</p>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-900" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => {
                  const catName = activeCategory.title;
                  setActiveCategory(null);
                  onNavigateToAnalyzer(catName);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Analyze a Problem in this Category
              </button>
              <button
                onClick={() => {
                  const catName = activeCategory.title;
                  setActiveCategory(null);
                  onNavigateToReport(catName);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Draft / Save a Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
