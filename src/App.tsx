import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LegalCategoriesGrid } from './components/LegalCategoriesGrid';
import { SmartProblemAnalyzer } from './components/SmartProblemAnalyzer';
import { RestaurantDisputeSimulator } from './components/RestaurantDisputeSimulator';
import { ComplaintCenter } from './components/ComplaintCenter';
import { ComplaintTracker } from './components/ComplaintTracker';
import { LawExplorer } from './components/LawExplorer';
import { OfficialResourcesDirectory } from './components/OfficialResourcesDirectory';
import { NyayaAssistantModal } from './components/NyayaAssistantModal';
import { AuthModal } from './components/AuthModal';
import { AboutModal } from './components/AboutModal';
import { InstantComplaintGuide } from './components/InstantComplaintGuide';
import { CaseRecord, UserProfile } from './types';
import {
  Scale,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
  FileCheck2,
  PhoneCall,
  CheckCircle2,
  UtensilsCrossed,
  Car,
  Home,
  CreditCard,
  Lock,
} from 'lucide-react';

const INITIAL_CASES: CaseRecord[] = [
  {
    id: 'CASE-2024-001',
    title: 'Consumer Rights: Restaurant Surcharge Dispute',
    category: 'Consumer Rights & Unfair Trade Practices',
    opponentName: 'Bistro Delights, Connaught Place',
    incidentDate: '2024-10-18',
    amount: 1450,
    state: 'Delhi (NCT)',
    city: 'New Delhi',
    facts:
      'Restaurant added an arbitrary 10% service charge (₹145) on food bill without prior disclosure on the menu card. Manager refused to waive the charge despite citing CCPA 2022 guidelines.',
    remedySought: 'Refund of ₹145 service charge and written acknowledgment.',
    status: 'Submitted externally',
    externalRefNo: 'NCH-DEL-2024-91823',
    documents: [
      {
        id: 'doc-1',
        name: 'Itemized_Bill_Invoice.pdf',
        size: '142 KB',
        type: 'application/pdf',
        uploadDate: '2024-10-18',
      },
      {
        id: 'doc-2',
        name: 'Menu_Price_Photo.jpg',
        size: '880 KB',
        type: 'image/jpeg',
        uploadDate: '2024-10-18',
      },
    ],
    notes: [
      {
        id: 'n-1',
        date: '18/10/2024',
        text: 'Lodge mediation complaint on National Consumer Helpline (NCH Docket 91823).',
      },
      {
        id: 'n-2',
        date: '21/10/2024',
        text: 'NCH assigned mediation officer; merchant responded with offer for credit voucher.',
      },
    ],
    createdAt: '18/10/2024',
    updatedAt: '21/10/2024',
  },
  {
    id: 'CASE-2024-002',
    title: 'Traffic & Road Laws: Wrong Camera Speed Challan',
    category: 'Traffic Regulations & Challan Disputes',
    opponentName: 'Traffic Police Enforcement Wing',
    incidentDate: '2024-09-28',
    amount: 2000,
    state: 'Maharashtra',
    city: 'Pune',
    facts:
      'Speed camera recorded vehicle MH-12-XX-1234 on Pune bypass at 11:30 PM. Vehicle was parked in home garage at that time. Camera photo clearly shows a white commercial van whereas my vehicle is a grey hatchback.',
    remedySought: 'Cancellation of erroneous challan before Virtual Magistrate.',
    status: 'Awaiting response',
    externalRefNo: 'PARIVAHAN-PUN-0992',
    documents: [
      {
        id: 'doc-3',
        name: 'VirtualCourt_Notice.pdf',
        size: '210 KB',
        type: 'application/pdf',
        uploadDate: '2024-09-29',
      },
      {
        id: 'doc-4',
        name: 'Actual_Vehicle_RC_Copy.pdf',
        size: '340 KB',
        type: 'application/pdf',
        uploadDate: '2024-09-29',
      },
    ],
    notes: [
      {
        id: 'n-3',
        date: '29/09/2024',
        text: 'Submitted online grievance on echallan.parivahan.gov.in attaching vehicle photos.',
      },
    ],
    createdAt: '29/09/2024',
    updatedAt: '29/09/2024',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [prefilledCategory, setPrefilledCategory] = useState<string | undefined>(undefined);
  const [prefilledFacts, setPrefilledFacts] = useState<string | undefined>(undefined);

  // Modals state
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [assistantPrompt, setAssistantPrompt] = useState<string | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);
  const [aboutModalTab, setAboutModalTab] = useState<string>('about');

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nyaya_mitra_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default logged-in citizen demo user
    return {
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@example.in',
      phone: '+91 98765 43210',
      state: 'Delhi (NCT)',
      city: 'New Delhi',
      preferredLanguage: 'English',
    };
  });

  // Saved cases state
  const [cases, setCases] = useState<CaseRecord[]>(() => {
    const saved = localStorage.getItem('nyaya_mitra_cases');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CASES;
      }
    }
    return INITIAL_CASES;
  });

  useEffect(() => {
    localStorage.setItem('nyaya_mitra_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nyaya_mitra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nyaya_mitra_user');
    }
  }, [user]);

  // Handlers
  const handleSaveCase = (caseData: Partial<CaseRecord>) => {
    const newCase: CaseRecord = {
      id: `CASE-${Date.now().toString().slice(-6)}`,
      title: caseData.title || 'Untitled Grievance',
      category: caseData.category || 'Consumer Rights',
      opponentName: caseData.opponentName || 'Unspecified Party',
      incidentDate: caseData.incidentDate || new Date().toISOString().split('T')[0],
      amount: caseData.amount,
      state: caseData.state || 'Delhi (NCT)',
      city: caseData.city || 'New Delhi',
      facts: caseData.facts || '',
      remedySought: caseData.remedySought || 'Full resolution',
      status: caseData.status || 'Ready to submit',
      documents: caseData.documents || [],
      notes: caseData.notes || [
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-IN'),
          text: 'Case record created.',
        },
      ],
      createdAt: new Date().toLocaleDateString('en-IN'),
      updatedAt: new Date().toLocaleDateString('en-IN'),
    };

    setCases((prev) => [newCase, ...prev]);
  };

  const handleUpdateCase = (updated: CaseRecord) => {
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSearch = (query: string) => {
    setPrefilledFacts(query);
    setCurrentView('instant-guide');
  };

  const handleQuickSearch = (query: string) => {
    setPrefilledFacts(query);
    setCurrentView('instant-guide');
  };

  const handleOpenAssistantPrompt = (prompt: string) => {
    setAssistantPrompt(prompt);
    setAssistantOpen(true);
  };

  const handleNavigateToAnalyzer = (categoryName: string) => {
    setPrefilledCategory(categoryName);
    setCurrentView('analyzer');
  };

  const handleNavigateToReport = (categoryName?: string, factsText?: string) => {
    if (categoryName) setPrefilledCategory(categoryName);
    if (factsText) setPrefilledFacts(factsText);
    setCurrentView('report');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(v) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentView(v);
        }}
        onOpenAssistant={() => {
          setAssistantPrompt(undefined);
          setAssistantOpen(true);
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAbout={(tab) => {
          setAboutModalTab(tab || 'about');
          setAboutModalOpen(true);
        }}
        user={user}
        onLogout={() => setUser(null)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onSearch={handleSearch}
              onNavigate={(v) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentView(v);
              }}
              onQuickSearch={handleQuickSearch}
            />

            {/* Quick Action Matrix for High Priority Citizen Issues */}
            <section className="py-10 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      Frequently Disputed Citizen Grievances
                    </h2>
                    <p className="text-xs text-slate-500">
                      Jump directly into interactive guides and dispute simulators
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('categories')}
                    className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1"
                  >
                    <span>View All 9 Domains</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Restaurant Bill */}
                  <div
                    onClick={() => setCurrentView('restaurant-dispute')}
                    className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 hover:bg-orange-50 hover:border-orange-300 transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-orange-950">
                        Restaurant Extra Charges
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Service charge, hidden AC fee, packaging costs, and CCPA guidelines simulator.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-orange-700">
                      Launch Bill Analyzer →
                    </span>
                  </div>

                  {/* Card 2: Traffic Challan */}
                  <div
                    onClick={() => {
                      setPrefilledCategory('Traffic Regulations & Challan Disputes');
                      setCurrentView('analyzer');
                    }}
                    className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-950">
                        Incorrect Traffic Challan
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Camera plate misread, fake challan alerts, Virtual Court dispute steps.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-blue-700">
                      Dispute Challan →
                    </span>
                  </div>

                  {/* Card 3: Cyber Fraud & 1930 */}
                  <div
                    onClick={() => {
                      setPrefilledCategory('Online Fraud, Phishing & Cyber Safety');
                      setCurrentView('analyzer');
                    }}
                    className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-950">
                        UPI Scam & Cyber Fraud
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        1930 Golden Hour inter-bank fund freeze, cybercrime.gov.in complaint guide.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-rose-700">
                      Emergency Steps →
                    </span>
                  </div>

                  {/* Card 4: Land & Property Encroachment */}
                  <div
                    onClick={() => {
                      setPrefilledCategory('Land, Property & Housing Rights');
                      setCurrentView('analyzer');
                    }}
                    className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-950">
                        Property & Land Rights
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Illegal encroachment, RERA builder delay, rental deposit withholding.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-emerald-700">
                      Know Property Rights →
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Categories Grid */}
            <LegalCategoriesGrid
              onSelectCategory={(cat) => handleNavigateToAnalyzer(cat.title)}
              onNavigateToAnalyzer={handleNavigateToAnalyzer}
              onNavigateToReport={handleNavigateToReport}
            />

            {/* Trust and Independence Banner */}
            <section className="py-12 bg-linear-to-r from-blue-900 via-blue-950 to-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-amber-300">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Democratizing Legal Clarity for Every Indian
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 max-w-2xl mx-auto leading-relaxed">
                  We bridge the knowledge divide between complex statutes and the everyday citizen. No
                  expensive consultations required to understand if your rights have been infringed.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-bold text-amber-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Plain Language Guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Direct Official Govt Links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Data Selling / Private Storage</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'categories' && (
          <LegalCategoriesGrid
            onSelectCategory={(cat) => handleNavigateToAnalyzer(cat.title)}
            onNavigateToAnalyzer={handleNavigateToAnalyzer}
            onNavigateToReport={handleNavigateToReport}
          />
        )}

        {currentView === 'laws' && <LawExplorer />}

        {currentView === 'analyzer' && (
          <SmartProblemAnalyzer
            initialCategory={prefilledCategory}
            onSaveCase={(newCase) => {
              handleSaveCase(newCase);
              setCurrentView('tracker');
            }}
            onNavigateToReport={handleNavigateToReport}
          />
        )}

        {currentView === 'instant-guide' && (
          <InstantComplaintGuide
            initialProblemText={prefilledFacts}
            onSaveCase={(newCase) => {
              handleSaveCase(newCase);
            }}
            onOpenAssistantWithPrompt={handleOpenAssistantPrompt}
            onNavigateToTracker={() => setCurrentView('tracker')}
          />
        )}

        {currentView === 'restaurant-dispute' && (
          <RestaurantDisputeSimulator
            onNavigateToReport={handleNavigateToReport}
            onOpenAssistantWithPrompt={handleOpenAssistantPrompt}
          />
        )}

        {currentView === 'report' && (
          <ComplaintCenter
            initialCategory={prefilledCategory}
            initialFacts={prefilledFacts}
            onSaveCase={handleSaveCase}
            onNavigateToTracker={() => setCurrentView('tracker')}
          />
        )}

        {currentView === 'tracker' && (
          <ComplaintTracker
            cases={cases}
            onUpdateCase={handleUpdateCase}
            onDeleteCase={handleDeleteCase}
            onNavigateToReport={() => setCurrentView('report')}
          />
        )}

        {currentView === 'resources' && <OfficialResourcesDirectory />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(v) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentView(v);
        }}
        onOpenAbout={(tab) => {
          setAboutModalTab(tab || 'about');
          setAboutModalOpen(true);
        }}
        onOpenAssistant={() => {
          setAssistantPrompt(undefined);
          setAssistantOpen(true);
        }}
      />

      {/* Floating Action Button for Nyaya Assistant */}
      <button
        onClick={() => {
          setAssistantPrompt(undefined);
          setAssistantOpen(true);
        }}
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-blue-950 hover:bg-blue-900 text-amber-300 rounded-full shadow-2xl border-2 border-amber-400/60 hover:scale-105 transition-all flex items-center gap-2 group"
        aria-label="Ask Nyaya AI"
      >
        <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-extrabold text-white pr-1">
          Ask Nyaya AI
        </span>
      </button>

      {/* Conversational AI Assistant Modal */}
      <NyayaAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        initialPrompt={assistantPrompt}
        onDraftComplaint={(topic) => {
          setAssistantOpen(false);
          handleNavigateToReport(undefined, topic);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
      />

      {/* About & Trust Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        defaultTab={aboutModalTab}
      />
    </div>
  );
}
