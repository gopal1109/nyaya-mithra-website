import React, { useState } from 'react';
import {
  X,
  Scale,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Mail,
  Send,
  Heart,
  FileText,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const tabs = [
    { id: 'about', label: 'About & Mission' },
    { id: 'privacy', label: 'Trust & Privacy' },
    { id: 'disclaimer', label: 'Legal Disclaimer' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact & Feedback' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">NYAYA MITRA</h3>
              <p className="text-xs text-slate-400">
                Know Your Rights. Stand for What&apos;s Right.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setFeedbackSubmitted(false);
              }}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-6 flex-1">
          {/* TAB 1: ABOUT & MISSION */}
          {activeTab === 'about' && (
            <div className="space-y-6 leading-relaxed">
              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                  Our Mission
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  &ldquo;To make legal awareness accessible to every Indian citizen by simplifying
                  laws, explaining everyday rights, and connecting people with the appropriate official
                  grievance channels.&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">How the Platform Works:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <p className="font-bold text-slate-900 text-xs">Search or Describe</p>
                    <p className="text-[11px] text-slate-600">
                      Write your grievance in simple words without needing legal terminology.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <p className="font-bold text-slate-900 text-xs">Understand Plain Rights</p>
                    <p className="text-[11px] text-slate-600">
                      Learn the exact sections, statutory limitation deadlines, and evidence needed.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <p className="font-bold text-slate-900 text-xs">Take Lawful Action</p>
                    <p className="text-[11px] text-slate-600">
                      Draft a formal complaint letter and launch the verified government grievance
                      portal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">Who We Serve:</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Students, consumers facing hidden charges, vehicle owners with wrongful challans,
                  tenants, cyber fraud victims, elderly citizens seeking maintenance, and anyone seeking
                  to understand their constitutional rights under the supreme law of India.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TRUST & PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 leading-relaxed">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Strict Security Warning:</strong>
                  Do NOT upload or enter sensitive passwords, net-banking PINs, debit/credit card CVV
                  numbers, or OTP codes under any circumstances. NYAYA MITRA will never request your
                  financial credentials.
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm">How Personal Data is Handled:</h4>
                <ul className="space-y-2 text-xs text-slate-600 list-disc pl-4">
                  <li>
                    <strong>Private Sandbox Storage:</strong> Your complaint reports, draft letters, and
                    case notes are stored privately in your authenticated session.
                  </li>
                  <li>
                    <strong>Zero Public Exposure:</strong> Complainants&apos; names, contact details, and
                    grievance facts are NEVER published or indexed publicly.
                  </li>
                  <li>
                    <strong>User Right to Delete:</strong> You can delete any saved case or document at
                    any time with immediate local purge from your dashboard.
                  </li>
                  <li>
                    <strong>No Hidden Telemetry:</strong> We do not sell user case data or track external
                    browsing behavior.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs space-y-1">
                <strong className="block font-bold text-slate-900">Emergency Protocol:</strong>
                <p>
                  NYAYA MITRA is not an emergency response platform. In situations involving immediate
                  threat to life, domestic violence, or physical danger, please immediately call{' '}
                  <strong className="text-red-600">112 (National Emergency)</strong> or{' '}
                  <strong className="text-rose-600">1091 (Women in Distress)</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LEGAL DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-5 leading-relaxed">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-2">
                <h4 className="font-extrabold text-sm text-amber-900">
                  Comprehensive Legal Information Disclaimer
                </h4>
                <p>
                  The materials and guidance available on NYAYA MITRA are provided solely for general
                  educational, civic awareness, and information purposes.
                </p>
                <p>
                  <strong>1. No Legal Advice:</strong> Content on this platform does not constitute
                  legal advice, attorney-client privileged communication, or a formal legal opinion.
                </p>
                <p>
                  <strong>2. Independent Civic Initiative:</strong> NYAYA MITRA is not affiliated with,
                  endorsed by, or operated by the Supreme Court of India, any High Court, the Ministry of
                  Law and Justice, or any police or governmental authority.
                </p>
                <p>
                  <strong>3. No Guarantee of Outcomes:</strong> Statutory dispute outcomes depend on the
                  precise factual matrix, judicial discretion, evidence admissibility, and evolving
                  statutory precedents. NYAYA MITRA makes no guarantee of redressal outcomes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <h5 className="font-bold text-slate-900">Seeking Formal Legal Aid in India:</h5>
                <p className="text-slate-600">
                  Citizens requiring legal representation who cannot afford an advocate can seek free
                  legal assistance under the Legal Services Authorities Act, 1987 via NALSA (Helpline:{' '}
                  <strong>15100</strong>) or through the District Legal Services Authority (DLSA) in
                  their local District Court.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {[
                {
                  q: 'Is restaurant service charge mandatory in India?',
                  a: 'No. Per the Central Consumer Protection Authority (CCPA) 2022 guidelines, service charges cannot be added automatically or by default. Tips and service charges are strictly voluntary. (Note: Subject to interim judicial observations in Delhi High Court, restaurants must prominently disclose and cannot force payment).',
                },
                {
                  q: 'What should I do if an e-challan has the wrong vehicle photo?',
                  a: 'Log in to echallan.parivahan.gov.in, navigate to the Grievance tab, and upload your RC along with photos of your actual vehicle showing differences in make, model, or color. If it reaches Virtual Court (vcourts.gov.in), you can contest the challan.',
                },
                {
                  q: 'What is the "Golden Hour" for cyber banking fraud?',
                  a: 'The first 2 to 3 hours after unauthorized money transfer. Dial 1930 immediately so the Indian Cyber Crime Coordination Centre (I4C) can freeze the beneficiary bank accounts before the money is withdrawn via ATMs or mule accounts.',
                },
                {
                  q: 'Does Nyaya Mitra file cases directly with consumer courts?',
                  a: 'No. We provide the tools to organize your facts, preserve evidence, draft your formal complaint letter, and navigate directly to official portals such as e-Daakhil and consumerhelpline.gov.in.',
                },
                {
                  q: 'Can a landlord disconnect electricity or water during a dispute?',
                  a: 'No. Under the Model Tenancy Act and state Rent Control Acts, landlords are strictly prohibited from cutting off essential municipal utility services (water, electricity, sewerage) even during eviction proceedings or non-payment of rent.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                >
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{faq.q}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CONTACT & FEEDBACK */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Citizen Feedback & Support Portal
                </h4>
                <p className="text-xs text-slate-500">
                  Help us improve Nyaya Mitra. Report a statutory correction, suggest a local
                  grievance portal, or share your civic experience.
                </p>
              </div>

              {feedbackSubmitted ? (
                <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                  <h5 className="font-bold text-slate-900 text-sm">Thank You for Your Feedback!</h5>
                  <p className="text-xs text-slate-600">
                    Your suggestions help make legal awareness accessible and accurate for fellow
                    citizens across India.
                  </p>
                  <button
                    onClick={() => setFeedbackSubmitted(false)}
                    className="text-xs font-bold text-blue-900 underline pt-2"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Your Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        placeholder="e.g. Ananya Sen"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        required
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Feedback or Query:
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={feedbackMsg}
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                      placeholder="Share your thoughts on law guides, UI accessibility, or report an issue..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Citizen Feedback</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
