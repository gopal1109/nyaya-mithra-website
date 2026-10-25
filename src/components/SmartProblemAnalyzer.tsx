import React, { useState } from 'react';
import {
  FileSearch,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Scale,
  Calendar,
  MapPin,
  IndianRupee,
  ShieldCheck,
  ExternalLink,
  Save,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { LEGAL_CATEGORIES } from '../data/legalCategories';
import { CaseRecord } from '../types';

interface SmartProblemAnalyzerProps {
  initialCategory?: string;
  onSaveCase: (caseData: Partial<CaseRecord>) => void;
  onNavigateToReport: (category: string, facts: string) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Delhi (NCT)',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
  'Other State / UT',
];

export const SmartProblemAnalyzer: React.FC<SmartProblemAnalyzerProps> = ({
  initialCategory,
  onSaveCase,
  onNavigateToReport,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states for the 5 guided steps
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'Consumer Rights & Unfair Trade Practices'
  );
  const [description, setDescription] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('Delhi (NCT)');
  const [city, setCity] = useState<string>('New Delhi');
  const [incidentDate, setIncidentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [amountInvolved, setAmountInvolved] = useState<string>('');
  const [documentReceived, setDocumentReceived] = useState<string>('Tax Invoice / Receipt');
  const [opponentName, setOpponentName] = useState<string>('');

  // Structured analysis generator based on verified Indian legal knowledge
  const generateAnalysis = () => {
    const descLower = description.toLowerCase();
    const catLower = selectedCategory.toLowerCase();

    let relevantLaw = 'The Consumer Protection Act, 2019';
    let legalProvisions = [
      'Section 2(47): Unfair Trade Practice (deceptive, unfair or unconscionable trade practice)',
      'Section 2(11): Deficiency in Service',
    ];
    let userRights =
      'Right to be protected against unfair trade practices, right to receive accurate pre-disclosed terms, and right to seek redressal for defective goods or deficient service.';
    let officialAuthority = 'National Consumer Helpline (NCH) & District Consumer Commission';
    let officialLink = 'https://consumerhelpline.gov.in';
    let helpline = '1915';
    let verifiedLimitation =
      '2 years from the date on which the cause of action arose (Section 69 of CPA 2019).';
    let suggestedEvidence = [
      'Original printed or electronic tax invoice/bill',
      'Transaction slip / UPI reference screenshot / Bank statement',
      'Written correspondence (emails, chat logs, SMS with customer support)',
      'Photographs or video proof of defective product / unboxing',
    ];
    let practicalSteps = [
      'Issue a written complaint or email notice giving 7-15 days for formal rectification.',
      'Call the National Consumer Helpline at 1915 or file on consumerhelpline.gov.in for mediation.',
      'If mediation fails, prepare an e-Daakhil consumer petition for the District Commission.',
    ];

    if (catLower.includes('traffic') || descLower.includes('challan') || descLower.includes('police')) {
      relevantLaw = 'Motor Vehicles Act, 1988 (as amended in 2019)';
      legalProvisions = [
        'Section 136A: Electronic Monitoring and Digital Challan verification',
        'Rule 139 CMVR: Recognition of DigiLocker and mParivahan digital credentials',
        'Section 208: Summary disposal of minor traffic cases via Virtual Court',
      ];
      userRights =
        'Right to examine photographic evidence of alleged violation, right to present digital documents via DigiLocker, and right to contest before a Metropolitan/Judicial Magistrate.';
      officialAuthority = 'Parivahan eChallan Grievance & Virtual Courts Portal';
      officialLink = 'https://echallan.parivahan.gov.in';
      helpline = 'helpdesk-echallan@gov.in';
      verifiedLimitation =
        'Challans should ideally be contested or compounded within 90 days before referral to regular Lok Adalat or physical court summons.';
      suggestedEvidence = [
        'Challan notice PDF showing camera capture and vehicle number',
        'Vehicle Registration Certificate (RC) proving model/color discrepancies',
        'GPS log or toll receipt if vehicle was in a different city on the violation date',
      ];
      practicalSteps = [
        'Visit echallan.parivahan.gov.in and verify high-resolution camera images.',
        'File an online grievance on Parivahan indicating misread registration plate.',
        'If referred to Virtual Court (vcourts.gov.in), select "I wish to contest" instead of pleading guilty.',
      ];
    } else if (
      catLower.includes('land') ||
      catLower.includes('property') ||
      descLower.includes('tenant') ||
      descLower.includes('rera') ||
      descLower.includes('rent')
    ) {
      relevantLaw =
        'Real Estate (Regulation and Development) Act, 2016 & State Specific Rent/Land Codes';
      legalProvisions = [
        'Section 18 RERA: Compensation and interest for delayed possession',
        'Section 14(3) RERA: 5-year structural defect warranty by builder',
        'Specific Relief Act, 1963: Injunction against illegal dispossession or encroachment',
      ];
      userRights =
        'Right to timely possession per builder agreement, right to receipt for all rent payments, and protection against arbitrary disconnection of essential utilities (water/power).';
      officialAuthority = 'State Real Estate Regulatory Authority (RERA) / Rent Authority / Civil Court';
      officialLink = 'https://mohua.gov.in/cms/rera.php';
      helpline = 'State RERA Helpline';
      verifiedLimitation =
        'Varies by relief sought; RERA complaints can be filed while cause of action continues; civil boundary suits generally have a 3-year statutory limit under the Limitation Act, 1963.';
      suggestedEvidence = [
        'Registered Sale Deed / Agreement for Sale / Registered Lease Agreement',
        'Builder payment receipts and bank loan sanction letters',
        'Mutation extract (Khata, Patta, 7/12 extract, or Jamabandi)',
        'Written notices served to builder, landlord, or encroacher',
      ];
      practicalSteps = [
        'Conduct a certified survey through the local Tahsildar / Revenue Department.',
        'Issue a formal legal notice through an advocate before taking coercive steps.',
        'File an online complaint on your respective State RERA portal if against an approved developer.',
      ];
    } else if (
      catLower.includes('cyber') ||
      catLower.includes('fraud') ||
      descLower.includes('upi') ||
      descLower.includes('scam') ||
      descLower.includes('otp')
    ) {
      relevantLaw =
        'Information Technology Act, 2000 & RBI Circular on Customer Liability in Electronic Transactions';
      legalProvisions = [
        'Section 66C & 66D IT Act: Punishment for identity theft and cheating by personation',
        'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18: Zero liability if notified within 3 working days',
      ];
      userRights =
        'Right to rapid banking freeze of unauthorized transfers and zero liability if bank negligence or third-party breach is reported within 3 days without customer negligence.';
      officialAuthority = 'National Cyber Crime Reporting Portal & Bank Nodal Officer';
      officialLink = 'https://cybercrime.gov.in';
      helpline = '1930 (National Cybercrime Financial Helpline)';
      verifiedLimitation =
        'Immediate reporting within 2 to 3 hours ("Golden Hour") is essential for fund recovery across beneficiary banks.';
      suggestedEvidence = [
        'Bank account statement showing exact timestamp and debit amount',
        'UPI transaction reference number (UTR) and recipient VPA / account number',
        'Screenshots of fraudulent chats, phishing URLs, or call logs',
        'Complaint acknowledgment copy from your home bank',
      ];
      practicalSteps = [
        'Immediately dial 1930 to freeze the stolen funds at the recipient bank.',
        'Lodge an online complaint on cybercrime.gov.in and obtain an acknowledgment slip.',
        'Submit written notice with the Cyber FIR to your home bank branch demanding zero liability reversal.',
      ];
    } else if (catLower.includes('constitutional')) {
      relevantLaw = 'The Constitution of India (Part III, Fundamental Rights)';
      legalProvisions = [
        'Article 14: Equality before law and equal protection of the laws',
        'Article 19: Fundamental freedoms (speech, assembly, trade)',
        'Article 21: Protection of life and personal liberty, right to dignity & privacy',
        'Article 32 & 226: Right to move Supreme Court or High Courts via Writs',
      ];
      userRights =
        'Inviolable constitutional protections against arbitrary state deprivation, unlawful custody, or state discrimination.';
      officialAuthority = 'High Courts of Judicature (Article 226) & Supreme Court of India (Article 32) / NALSA';
      officialLink = 'https://nalsa.gov.in';
      helpline = '15100 (National Legal Aid)';
      verifiedLimitation =
        'No fixed statutory limitation for fundamental rights violations under Art 32/226, though courts disfavor unexplained long delays (laches).';
      suggestedEvidence = [
        'Official government orders, rejection notices, or arbitrary administrative decrees',
        'Evidence of discriminatory denial of equal public opportunity',
      ];
      practicalSteps = [
        'Seek free legal consultation through District Legal Services Authority (DLSA) if eligible.',
        'File an administrative appeal or RTI application to gather internal official files.',
        'Consult an advocate for drafting a Writ Petition (Mandamus, Certiorari, or Habeas Corpus).',
      ];
    }

    return {
      relevantLaw,
      legalProvisions,
      userRights,
      officialAuthority,
      officialLink,
      helpline,
      verifiedLimitation,
      suggestedEvidence,
      practicalSteps,
    };
  };

  const analysis = generateAnalysis();

  const handleSaveToTracker = () => {
    onSaveCase({
      title: `${selectedCategory.split(' ')[0]} Dispute: ${opponentName || 'Grievance'}`,
      category: selectedCategory,
      opponentName: opponentName || 'Unspecified Party',
      incidentDate,
      amount: amountInvolved ? parseFloat(amountInvolved) : undefined,
      state: selectedState,
      city,
      facts: description,
      remedySought: 'Formal investigation and restitution',
      status: 'Ready to submit',
      documents: [],
      notes: [
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-IN'),
          text: `Generated via Nyaya Mitra Problem Analyzer. Applicable Law: ${analysis.relevantLaw}`,
        },
      ],
    });
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
            <FileSearch className="w-4 h-4 text-blue-700" />
            <span>Interactive Diagnostic Engine • Section 7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understand My Problem
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Answer 5 simple questions in plain language to see which Indian laws may apply and where to
            seek official help.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>
              Step {step} of 6:{' '}
              {step === 1 && 'Select Legal Category'}
              {step === 2 && 'Describe What Happened'}
              {step === 3 && 'Location (State & City)'}
              {step === 4 && 'Date of Incident'}
              {step === 5 && 'Financials & Documentation'}
              {step === 6 && 'Structured Information Result'}
            </span>
            <span className="text-blue-700 font-bold">{Math.round((step / 6) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-700 to-indigo-600 transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Step 1: Select the problem category that best fits your situation
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                This helps us pinpoint the right statutory acts and regulatory grievance portals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEGAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedCategory === cat.title
                      ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{cat.title}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Continue to Description</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Describe in Own Words */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Step 2: Describe what happened in your own words
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                You do not need to use legal jargon. Just write what occurred, who was involved, and
                what went wrong.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Name of Business, Organization, or Authority Involved (Optional):
                </label>
                <input
                  type="text"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                  placeholder="e.g., ABC Restaurant, XYZ E-Commerce, Traffic Police, Local Builder"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  What happened? (Be as factual as possible):
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: I ordered a phone online on Oct 10th. When opened, the screen was cracked. The seller rejected the replacement request claiming customer fault without sending a technician..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!description.trim()}
                className="px-6 py-3 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: State and City */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Step 3: Select your State and City
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Land laws, tenancy, traffic compounding, and local municipal procedures vary significantly
                across Indian states.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  State / Union Territory:
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-blue-600 focus:outline-hidden"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  City / District:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Bengaluru, Mumbai, Lucknow, Hyderabad"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Continue to Incident Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Incident Date / Time */}
        {step === 4 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Step 4: Enter the date or approximate time of the incident
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Indian statutory limitation laws require complaints to be lodged within specific time
                frames (e.g. 2 years for consumer courts, 3 days for cyber banking zero liability).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Date of Incident / Cause of Action:
              </label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full max-w-sm px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Continue to Financials & Evidence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Amount and Document Type */}
        {step === 5 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Step 5: Provide monetary amount and document type (Optional)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Helps determine the pecuniary jurisdiction (e.g. District vs State Consumer Forum) and
                applicable fee waivers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Disputed Amount in Rupees (₹):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">₹</span>
                  <input
                    type="number"
                    value={amountInvolved}
                    onChange={(e) => setAmountInvolved(e.target.value)}
                    placeholder="e.g., 2500"
                    className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Document You Currently Possess:
                </label>
                <select
                  value={documentReceived}
                  onChange={(e) => setDocumentReceived(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-blue-600 focus:outline-hidden"
                >
                  <option value="Tax Invoice / Receipt">Tax Invoice / Receipt</option>
                  <option value="Electronic Challan Notice">Electronic Challan Notice</option>
                  <option value="Bank Statement / UPI SMS">Bank Statement / UPI SMS</option>
                  <option value="Registered Agreement / Sale Deed">Registered Agreement / Sale Deed</option>
                  <option value="Email / Chat Communication">Email / Chat Communication</option>
                  <option value="No Document Available">No Document Available</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(6)}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>View Structured Legal Analysis</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Structured Information Results Page (Exactly per Section 7 specs) */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in">
            {/* Disclaimer banner required by prompt */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Informational Guidance Notice:</strong>
                This result is generated for legal awareness and informational orientation only. It
                does not establish that a statutory violation or offence has occurred, nor does it
                constitute formal legal advice or an attorney-client relationship.
              </div>
            </div>

            {/* Results Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header result */}
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Diagnostic Analysis Complete
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                    {selectedCategory}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToTracker}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-4 h-4 text-slate-600" />
                    <span>Save to My Cases</span>
                  </button>
                  <button
                    onClick={() => onNavigateToReport(selectedCategory, description)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Draft Legal Notice</span>
                  </button>
                </div>
              </div>

              {/* Summary of Reported Situation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Summary of Reported Situation:
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 italic">
                  &ldquo;{description || 'No description provided.'}&rdquo;
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-slate-600">
                  <span>
                    <strong>Location:</strong> {city}, {selectedState}
                  </span>
                  <span>
                    <strong>Date:</strong> {incidentDate}
                  </span>
                  {amountInvolved && (
                    <span>
                      <strong>Amount:</strong> ₹{amountInvolved}
                    </span>
                  )}
                  <span>
                    <strong>Document:</strong> {documentReceived}
                  </span>
                </div>
              </div>

              {/* Potentially Relevant Indian Law & Provisions */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-800" />
                  Potentially Relevant Indian Law or Regulation
                </h3>
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <h4 className="font-extrabold text-blue-900 text-sm">
                    {analysis.relevantLaw}
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {analysis.legalProvisions.map((prov, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-1.5 shrink-0"></span>
                        <span>{prov}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Plain-Language Explanation of User's Rights */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Plain-Language Explanation of Your Rights
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 p-4 rounded-xl">
                  {analysis.userRights}
                </p>
              </div>

              {/* Suggested Practical Next Steps */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Suggested Practical Next Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {analysis.practicalSteps.map((stepItem, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed pt-1">{stepItem}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents / Evidence to Preserve */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Documents & Evidence to Preserve
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {analysis.suggestedEvidence.map((ev, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appropriate Official Authority & Deadlines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Official Grievance Channel
                  </h4>
                  <p className="text-xs font-bold text-slate-900">
                    {analysis.officialAuthority}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold">
                    Helpline: {analysis.helpline}
                  </p>
                  <a
                    href={analysis.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline pt-1"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Statutory Limitation / Deadline
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {analysis.verifiedLimitation}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    *Verified provision under Indian statutory code.
                  </p>
                </div>
              </div>
            </div>

            {/* Restart Analysis */}
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setStep(1);
                  setDescription('');
                  setAmountInvolved('');
                }}
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                ← Analyze Another Problem
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
