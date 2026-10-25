import React, { useState, useEffect } from 'react';
import {
  FileSearch,
  Building2,
  ListOrdered,
  Scale,
  FileCheck2,
  ExternalLink,
  PhoneCall,
  Copy,
  Check,
  Download,
  Save,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { CaseRecord } from '../types';

interface WhomToComplainData {
  category: string;
  whomToComplain: {
    primaryAuthority: string;
    officerDesignation: string;
    portalName: string;
    portalUrl: string;
    helpline: string;
    escalationLevels: Array<{
      level: string;
      target: string;
      timeline: string;
    }>;
  };
  howToComplain: Array<{
    stepNumber: number;
    title: string;
    instruction: string;
  }>;
  applicableLaw: {
    actName: string;
    keySections: string;
    userRights: string;
    limitationPeriod: string;
  };
  evidenceChecklist: string[];
  prefilledDraft: string;
}

interface InstantComplaintGuideProps {
  initialProblemText?: string;
  onSaveCase: (caseRecord: Partial<CaseRecord>) => void;
  onOpenAssistantWithPrompt: (prompt: string) => void;
  onNavigateToTracker: () => void;
}

export const InstantComplaintGuide: React.FC<InstantComplaintGuideProps> = ({
  initialProblemText = '',
  onSaveCase,
  onOpenAssistantWithPrompt,
  onNavigateToTracker,
}) => {
  const [problemText, setProblemText] = useState(initialProblemText);
  const [opponentName, setOpponentName] = useState('');
  const [amount, setAmount] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi (NCT)');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WhomToComplainData | null>(null);
  const [copied, setCopied] = useState(false);
  const [caseSaved, setCaseSaved] = useState(false);

  // Quick problem sample pills
  const sampleProblems = [
    {
      title: 'Restaurant Added Service Charge',
      text: 'Restaurant added an automatic 10% service charge of ₹250 on our food bill. When I requested the manager to remove it, they refused and said it is compulsory.',
      opponent: 'The Grand Diner',
      amount: '250',
    },
    {
      title: 'Online Shopping Denied Refund',
      text: 'I ordered a pair of shoes online for ₹3,499. The seller delivered the wrong size. When I requested return within 7 days, they rejected it claiming no returns.',
      opponent: 'TrendyKart Online',
      amount: '3499',
    },
    {
      title: 'Wrong Traffic Camera Challan',
      text: 'Received an automated speed challan of ₹2,000 showing camera image of a commercial truck, but my vehicle is a private car with a slightly similar number plate.',
      opponent: 'State Traffic Police',
      amount: '2000',
    },
    {
      title: 'UPI Payment Stuck / Scammed',
      text: 'Transferred ₹15,000 for a work-from-home assignment via UPI. The recipient blocked me immediately and the money was debited from my savings bank account.',
      opponent: 'UPI Beneficiary / Home Bank',
      amount: '15000',
    },
    {
      title: 'Builder Delay in Flat Possession',
      text: 'Booked a 2BHK flat in 2021 with promised handover by June 2023. Construction is stalled and developer is not paying monthly delay compensation.',
      opponent: 'Skyline Developers Ltd',
      amount: '450000',
    },
    {
      title: 'Unauthorized Bank ATM Debit',
      text: 'ATM debited ₹10,000 from my savings account but did not dispense cash. Bank branch is asking me to wait 30 days without filing a dispute.',
      opponent: 'National Commercial Bank',
      amount: '10000',
    },
  ];

  // Auto-analyze if initial text is provided
  useEffect(() => {
    if (initialProblemText && initialProblemText.trim()) {
      setProblemText(initialProblemText);
      handleAnalyze(initialProblemText);
    }
  }, [initialProblemText]);

  const handleAnalyze = async (overrideText?: string) => {
    const textToSubmit = (overrideText || problemText).trim();
    if (!textToSubmit) return;

    setLoading(true);
    setCaseSaved(false);

    try {
      const res = await fetch('/api/whom-to-complain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: textToSubmit,
          opponentName,
          city,
          state,
          amount,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error fetching whom-to-complain details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyDraft = () => {
    if (!result?.prefilledDraft) return;
    navigator.clipboard.writeText(result.prefilledDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDraft = () => {
    if (!result?.prefilledDraft) return;
    const blob = new Blob([result.prefilledDraft], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Complaint_Notice_${Date.now()}.txt`;
    a.click();
  };

  const handleSaveToTracker = () => {
    if (!result) return;
    onSaveCase({
      title: `${result.category.split('—')[0]}: ${opponentName || 'Grievance'}`,
      category: result.category,
      opponentName: opponentName || 'Unspecified Party',
      incidentDate: new Date().toISOString().split('T')[0],
      amount: amount ? parseFloat(amount) : undefined,
      state,
      city,
      facts: problemText,
      remedySought: 'Immediate resolution, refund/rectification and compliance with statutory guidelines',
      status: 'Ready to submit',
      documents: [],
      notes: [
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-IN'),
          text: `Analyzed via Instant Whom & How to Complain Guide. Primary Authority: ${result.whomToComplain.primaryAuthority}.`,
        },
      ],
    });
    setCaseSaved(true);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold border border-orange-200">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span>Instant Grievance Direct Routing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Whom to Complain & How to Complain
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto">
            Just enter your problem and incident details below. We instantly identify the exact
            government authority, portal, official helpline, step-by-step filing guide, and a
            ready-to-use complaint draft.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-blue-900" />
              <span>Enter Problem & Incident Details</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-semibold">1-Click Instant Analysis</span>
          </div>

          {/* Quick Problem Templates */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Or pick a common everyday issue:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sampleProblems.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setProblemText(sp.text);
                    setOpponentName(sp.opponent);
                    setAmount(sp.amount);
                    handleAnalyze(sp.text);
                  }}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 transition-all text-left"
                >
                  {sp.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Problem Textarea */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-900">
              Describe your problem (What happened, what went wrong, and what you want):
            </label>
            <textarea
              rows={4}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="e.g., A restaurant added ₹180 service charge on my food bill and refused to remove it... OR Ordered a mobile phone on Oct 12th, delivered broken, seller rejected return..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:border-blue-900 focus:ring-4 focus:ring-blue-100 focus:outline-hidden leading-relaxed placeholder:text-slate-400"
            />
          </div>

          {/* Quick Optional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Opponent / Company Name (Optional):
              </label>
              <input
                type="text"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                placeholder="e.g., QuickKart, XYZ Restaurant"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-900 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Disputed Amount in ₹ (Optional):
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 2500"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-900 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Location (City / State):
              </label>
              <input
                type="text"
                value={`${city}, ${state}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setCity(parts[0]?.trim() || city);
                  if (parts[1]) setState(parts[1].trim());
                }}
                placeholder="e.g., Bengaluru, Karnataka"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-900 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => handleAnalyze()}
              disabled={!problemText.trim() || loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-900 hover:bg-blue-950 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all group"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Finding Official Authority & Steps...</span>
                </>
              ) : (
                <>
                  <span>Show Whom to Complain & How to Complain</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS SECTION: Whom to Complain & How to Complain */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  Classification Result
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                  {result.category}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={result.whomToComplain.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* PART 1: WHOM TO COMPLAIN TO */}
            <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    1. Whom to Complain To (The Exact Official Authority)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Authorized statutory channel with jurisdiction over this matter
                  </p>
                </div>
              </div>

              {/* Main Authority Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                    Primary Statutory Authority:
                  </span>
                  <h4 className="text-base font-extrabold text-blue-950">
                    {result.whomToComplain.primaryAuthority}
                  </h4>
                  <p className="text-xs text-slate-600">
                    <strong>Designation:</strong> {result.whomToComplain.officerDesignation}
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Official Portal:</strong> {result.whomToComplain.portalName}
                  </p>
                  <div className="pt-2">
                    <a
                      href={result.whomToComplain.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:underline"
                    >
                      <span>{result.whomToComplain.portalUrl}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
                      Official Toll-Free Helpline:
                    </span>
                    <div className="flex items-center gap-2 pt-1">
                      <PhoneCall className="w-5 h-5 text-emerald-700" />
                      <span className="text-base font-extrabold text-emerald-950 font-mono">
                        {result.whomToComplain.helpline}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Free telephone assistance directly operated by the concerned ministry/regulator.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 text-[11px] text-slate-600">
                    <strong>Limitation Deadline:</strong> {result.applicableLaw.limitationPeriod}
                  </div>
                </div>
              </div>

              {/* 3-Tier Escalation Hierarchy */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Escalation Levels (Follow in this exact sequence):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.whomToComplain.escalationLevels.map((lvl, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                    >
                      <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                        {lvl.level}
                      </span>
                      <p className="text-xs font-bold text-slate-900 pt-1">{lvl.target}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{lvl.timeline}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PART 2: HOW TO COMPLAIN (Step-by-step practical guide) */}
            <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <ListOrdered className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    2. How to Complain (Step-by-Step Filing Procedure)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Practical instructions to prepare and submit your complaint lawfully
                  </p>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.howToComplain.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>

              {/* Evidence Checklist */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Required Documents & Evidence Checklist:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {result.evidenceChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center gap-2"
                    >
                      <input type="checkbox" className="rounded text-blue-900 cursor-pointer" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PART 3: APPLICABLE LAW & PROTECTIONS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    3. Governing Indian Law & Your Statutory Rights
                  </h3>
                  <p className="text-xs text-slate-500">Legal grounding supporting your grievance</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Applicable Act:
                  </span>
                  <p className="font-bold text-blue-950 text-sm">
                    {result.applicableLaw.actName}
                  </p>
                  <p className="text-slate-600 pt-1">
                    <strong>Key Sections:</strong> {result.applicableLaw.keySections}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Statutory Protection:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {result.applicableLaw.userRights}
                  </p>
                </div>
              </div>
            </div>

            {/* PART 4: READY-TO-USE PRE-FILLED NOTICE DRAFT */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-900 flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      4. Ready-to-Send Complaint Notice Draft
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pre-filled with your facts. Copy or download to send via email or registered post.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyDraft}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadDraft}
                    className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.txt)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-h-72 overflow-y-auto">
                <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {result.prefilledDraft}
                </pre>
              </div>
            </div>

            {/* ACTION BUTTONS BAR */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSaveToTracker}
                  disabled={caseSaved}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{caseSaved ? 'Case Saved in Dashboard!' : 'Save Case to My Dashboard'}</span>
                </button>

                {caseSaved && (
                  <button
                    onClick={onNavigateToTracker}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    View in Tracker →
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    onOpenAssistantWithPrompt(
                      `I need follow-up guidance on filing against ${opponentName || 'opponent'} regarding: "${problemText}"`
                    )
                  }
                  className="w-full sm:w-auto px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Ask Nyaya AI Follow-Up</span>
                </button>

                <a
                  href={result.whomToComplain.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <span>Launch Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
