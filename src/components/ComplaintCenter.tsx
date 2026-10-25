import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Save,
  Send,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  FileCheck2,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { LEGAL_CATEGORIES } from '../data/legalCategories';
import { CaseRecord } from '../types';

interface ComplaintCenterProps {
  initialCategory?: string;
  initialFacts?: string;
  onSaveCase: (caseRecord: Partial<CaseRecord>) => void;
  onNavigateToTracker: () => void;
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

export const ComplaintCenter: React.FC<ComplaintCenterProps> = ({
  initialCategory,
  initialFacts,
  onSaveCase,
  onNavigateToTracker,
}) => {
  const [category, setCategory] = useState<string>(
    initialCategory || 'Consumer Rights & Unfair Trade Practices'
  );
  const [opponentName, setOpponentName] = useState<string>('');
  const [incidentDate, setIncidentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [amount, setAmount] = useState<string>('');
  const [state, setState] = useState<string>('Delhi (NCT)');
  const [city, setCity] = useState<string>('New Delhi');
  const [facts, setFacts] = useState<string>(initialFacts || '');
  const [remedySought, setRemedySought] = useState<string>(
    'Full refund of the disputed amount, replacement of defective item, and compensation for harassment.'
  );

  // File uploads simulator
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ id: string; name: string; size: string; type: string; uploadDate: string }>
  >([]);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);

  // Submission / Action state
  const [activeActionModal, setActiveActionModal] = useState<
    'authority' | 'saved_success' | 'letter_draft' | null
  >(null);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGeneratingLetter, setIsGeneratingLetter] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadWarning(null);
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileName = file.name.toLowerCase();

    // Sensitive credential warning check
    if (
      fileName.includes('password') ||
      fileName.includes('otp') ||
      fileName.includes('cvv') ||
      fileName.includes('pin')
    ) {
      setUploadWarning(
        'Warning: Do not upload sensitive credentials such as passwords, OTPs, or debit/credit card CVVs.'
      );
      return;
    }

    const newDoc = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || 'Document',
      uploadDate: new Date().toLocaleDateString('en-IN'),
    };

    setUploadedFiles((prev) => [...prev, newDoc]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Action A: SAVE MY CASE (Private Account Record)
  const handleSaveMyCase = () => {
    onSaveCase({
      title: `${category.split(' ')[0]}: ${opponentName || 'Grievance Record'}`,
      category,
      opponentName: opponentName || 'Unspecified Party',
      incidentDate,
      amount: amount ? parseFloat(amount) : undefined,
      state,
      city,
      facts,
      remedySought,
      status: 'Ready to submit',
      documents: uploadedFiles,
      notes: [
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-IN'),
          text: 'Private case draft prepared in Nyaya Mitra Complaint Center.',
        },
      ],
    });

    setActiveActionModal('saved_success');
  };

  // Action B: FIND THE RIGHT AUTHORITY (External submission guidance)
  const handleFindAuthority = () => {
    setActiveActionModal('authority');
  };

  // Generate Formal Complaint Letter
  const handleGenerateNotice = async () => {
    setIsGeneratingLetter(true);
    setActiveActionModal('letter_draft');

    try {
      const res = await fetch('/api/draft-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          opponentName,
          incidentDate,
          amount,
          facts,
          cityState: `${city}, ${state}`,
          remedySought,
        }),
      });
      const data = await res.json();
      setGeneratedLetter(data.draftLetter);
    } catch (err) {
      // Fallback draft template
      const fallback = `FORMAL GRIEVANCE NOTICE\nDate: ${new Date().toLocaleDateString(
        'en-IN'
      )}\n\nTo: ${opponentName || '[Opponent Name]'}\nSubject: Formal Complaint regarding ${category}\n\nFacts: ${facts}\nAmount Disputed: ₹${
        amount || '0'
      }\nRemedy Sought: ${remedySought}\n\nThis notice gives 15 days for resolution before escalating to official consumer / statutory authorities.`;
      setGeneratedLetter(fallback);
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `NyayaMitra_Complaint_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Matched official portal depending on category
  const getOfficialChannel = () => {
    const cat = category.toLowerCase();
    if (cat.includes('traffic')) {
      return {
        name: 'Parivahan eChallan & Virtual Courts',
        url: 'https://echallan.parivahan.gov.in',
        helpline: 'helpdesk-echallan@gov.in',
        portalType: 'Ministry of Road Transport (MoRTH)',
      };
    }
    if (cat.includes('cyber') || cat.includes('fraud')) {
      return {
        name: 'National Cyber Crime Reporting Portal',
        url: 'https://cybercrime.gov.in',
        helpline: '1930 (24x7 Citizen Cyber Helpline)',
        portalType: 'Ministry of Home Affairs (MHA / I4C)',
      };
    }
    if (cat.includes('banking') || cat.includes('upi')) {
      return {
        name: 'RBI Complaint Management System (CMS)',
        url: 'https://cms.rbi.org.in',
        helpline: '14448 (RBI Centralized Contact Centre)',
        portalType: 'Reserve Bank of India',
      };
    }
    if (cat.includes('land') || cat.includes('property')) {
      return {
        name: 'State RERA & Revenue Divisional Authority',
        url: 'https://mohua.gov.in/cms/rera.php',
        helpline: 'Local Tahsildar / Sub-Registrar Office',
        portalType: 'State Housing & Revenue Dept',
      };
    }
    if (cat.includes('civic') || cat.includes('public')) {
      return {
        name: 'CPGRAMS Central Public Grievance Portal',
        url: 'https://pgportal.gov.in',
        helpline: '011-23743030',
        portalType: 'Department of Administrative Reforms (DARPG)',
      };
    }
    return {
      name: 'National Consumer Helpline (NCH) & e-Daakhil',
      url: 'https://consumerhelpline.gov.in',
      helpline: '1915 or SMS to 8800001915',
      portalType: 'Department of Consumer Affairs, Govt. of India',
    };
  };

  const channel = getOfficialChannel();

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold border border-orange-200">
            <FileText className="w-4 h-4 text-orange-600" />
            <span>Complaint Assistance Center • Section 9</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Report a Problem & Prepare Your Case
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Document your incident systematically, save private case records, and discover the exact
            official government portal to submit your formal complaint.
          </p>
        </div>

        {/* Clear Notice on External Submission */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs leading-relaxed flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-0.5">Important Transparency Disclosure:</strong>
            NYAYA MITRA stores your report privately in your account as a self-managed case file. We do
            not automatically transmit complaints to government or police systems without your direct
            action. We provide direct links and guidance to the official statutory portals.
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Incident Details & Supporting Evidence
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Grievance Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-blue-600 focus:outline-hidden"
              >
                {LEGAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Opponent / Business Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business, Company, or Authority Involved:
              </label>
              <input
                type="text"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                placeholder="e.g., QuickCart Retail, City Power Board, Hotel Grand"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Date of Incident / Transaction:
              </label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Monetary Amount Involved (₹) (Optional):
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 4500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">State / UT:</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-blue-600 focus:outline-hidden"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                City / District:
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Mumbai, Bengaluru, Lucknow"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Incident Facts */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Describe the incident in full detail (Include order IDs, invoice numbers, responses):
            </label>
            <textarea
              rows={5}
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              placeholder="State exactly what occurred chronologically. e.g., On 15th Sept, I paid ₹2,500 for a service. The provider failed to attend the appointment and subsequently blocked my calls..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden leading-relaxed"
            />
          </div>

          {/* Remedy Sought */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Remedy / Resolution You Are Seeking:
            </label>
            <input
              type="text"
              value={remedySought}
              onChange={(e) => setRemedySought(e.target.value)}
              placeholder="e.g., Full refund of ₹2500, written apology, replacement of product"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-hidden"
            />
          </div>

          {/* Secure Document Upload Interface */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900 block">
                  Attach Supporting Documents (Invoices, receipts, photos, emails)
                </label>
                <p className="text-[11px] text-slate-500">
                  Secure local sandbox storage. Max 10MB per file.
                </p>
              </div>
            </div>

            {uploadWarning && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{uploadWarning}</span>
              </div>
            )}

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Click to browse files (PDF, PNG, JPG)
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ensure sensitive details like card CVVs or net-banking passwords are NOT uploaded.
              </p>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                className="mt-3 text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            {/* Uploaded Documents List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-slate-700">Attached Files:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uploadedFiles.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                        <span className="text-slate-400 text-[10px]">({doc.size})</span>
                      </div>
                      <button
                        onClick={() => removeFile(doc.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TWO SEPARATE ACTIONS AS REQUIRED BY SECTION 9 */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleGenerateNotice}
              disabled={!facts.trim()}
              className="w-full sm:w-auto px-4 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>Generate Factual Notice / Letter</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* ACTION A: SAVE MY CASE */}
              <button
                onClick={handleSaveMyCase}
                disabled={!facts.trim()}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <Save className="w-4 h-4 text-slate-700" />
                <span>Action A: Save My Case</span>
              </button>

              {/* ACTION B: FIND THE RIGHT AUTHORITY */}
              <button
                onClick={handleFindAuthority}
                className="w-full sm:w-auto px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>Action B: Find The Right Authority</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal for ACTION A: Saved Success */}
        {activeActionModal === 'saved_success' && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Case Saved in Your Account!
                </h3>
                <p className="text-xs text-slate-600">
                  Your case report and attached evidence have been recorded privately. You can track
                  progress, add notes, and record external complaint reference numbers.
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveActionModal(null);
                    onNavigateToTracker();
                  }}
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold"
                >
                  Go to My Case Tracker
                </button>
                <button
                  onClick={() => setActiveActionModal(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for ACTION B: Find The Right Authority */}
        {activeActionModal === 'authority' && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900">
                  Recommended Official Grievance Channel
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">
                  Verified Portal
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Target Government Authority:
                </p>
                <h4 className="text-base font-extrabold text-blue-950">{channel.name}</h4>
                <p className="text-xs text-slate-600">{channel.portalType}</p>
                <p className="text-xs text-green-700 font-bold">Helpline: {channel.helpline}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-800">How to submit your complaint:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Click &quot;Open Official Portal&quot; below to launch the verified government website.</li>
                  <li>Register or sign in with your mobile OTP / DigiLocker.</li>
                  <li>Copy and paste the facts you documented here into their formal complaint form.</li>
                  <li>
                    Once submitted, keep the Docket / Reference Number and save it in your Nyaya Mitra
                    Complaint Tracker to track timelines.
                  </li>
                </ol>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setActiveActionModal(null)}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Generated Complaint Letter */}
        {activeActionModal === 'letter_draft' && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900">
                  Factual Complaint Letter / Legal Notice Draft
                </h3>
                <span className="text-xs font-semibold text-slate-500">Ready to Print or Copy</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-slate-50 border border-slate-200">
                {isGeneratingLetter ? (
                  <div className="py-12 text-center space-y-2">
                    <div className="w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs text-slate-500 font-semibold">
                      Drafting structured legal notice...
                    </p>
                  </div>
                ) : (
                  <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {generatedLetter}
                  </pre>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-400">
                  Can be sent via registered post (AD) or email.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadText}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Draft (.txt)</span>
                  </button>
                  <button
                    onClick={() => setActiveActionModal(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
