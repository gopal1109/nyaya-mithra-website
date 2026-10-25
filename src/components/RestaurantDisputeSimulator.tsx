import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Receipt,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  Info,
  Scale,
  ShieldCheck,
} from 'lucide-react';

interface RestaurantDisputeSimulatorProps {
  onNavigateToReport: (category: string, scenarioText: string) => void;
  onOpenAssistantWithPrompt: (prompt: string) => void;
}

export const RestaurantDisputeSimulator: React.FC<RestaurantDisputeSimulatorProps> = ({
  onNavigateToReport,
  onOpenAssistantWithPrompt,
}) => {
  // Questions specified in requirements
  const [disclosedBefore, setDisclosedBefore] = useState<'yes' | 'no' | 'unclear'>('no');
  const [shownOnBill, setShownOnBill] = useState<'yes' | 'no'>('yes');
  const [chargeType, setChargeType] = useState<
    'service_charge' | 'gst_tax' | 'packaging_charge' | 'ac_charge' | 'unexplained'
  >('service_charge');
  const [restaurantExplained, setRestaurantExplained] = useState<'yes' | 'no' | 'refused'>('refused');
  const [hasReceipt, setHasReceipt] = useState<'yes' | 'no'>('yes');

  // Interactive sample bill calculator
  const [foodSubtotal, setFoodSubtotal] = useState(1200);
  const [serviceChargeRate, setServiceChargeRate] = useState(10); // 10%
  const [gstRate, setGstRate] = useState(5); // 5% GST standard

  const serviceChargeAmount = (foodSubtotal * serviceChargeRate) / 100;
  const taxableAmount = foodSubtotal + (chargeType === 'service_charge' ? serviceChargeAmount : 0);
  const gstAmount = (taxableAmount * gstRate) / 100;
  const totalBill = foodSubtotal + (chargeType === 'service_charge' ? serviceChargeAmount : 0) + gstAmount;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200">
            <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
            <span>Interactive Scenario Simulator • Section 8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Restaurant Extra Charges & Service Charge Disputes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            &ldquo;A restaurant charged me more than the menu price, added an unexpected service charge,
            or included an unexplained fee.&rdquo; Analyze your restaurant bill against verified CCPA
            guidelines and consumer protection rules.
          </p>
        </div>

        {/* 2-Column Interactive layout: Questionnaire & Live Bill Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The 5 Standard Questions */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Receipt className="w-5 h-5 text-orange-600" />
              <span>Bill Details & Situation Assessment</span>
            </h2>

            {/* Q1: Disclosed before ordering? */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>1. Was the additional charge disclosed before ordering?</span>
                <span className="text-[11px] text-slate-400 font-normal">(on menu or entrance)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yes', label: 'Yes, printed on menu' },
                  { id: 'no', label: 'No disclosure' },
                  { id: 'unclear', label: 'Unclear / Hidden font' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDisclosedBefore(opt.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      disclosedBefore === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Shown on the bill? */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900">
                2. Is the charge explicitly shown on your bill / receipt?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'yes', label: 'Yes, itemized on printed bill' },
                  { id: 'no', label: 'No, added as lump sum' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setShownOnBill(opt.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      shownOnBill === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: What type of charge is it? */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900">
                3. What kind of fee or charge was added?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    id: 'service_charge',
                    label: 'Service Charge (5% - 10%)',
                    desc: 'Added by restaurant management (not a govt tax)',
                  },
                  {
                    id: 'gst_tax',
                    label: 'GST (Goods & Services Tax)',
                    desc: 'Statutory government tax (5% or 18% in luxury)',
                  },
                  {
                    id: 'packaging_charge',
                    label: 'Packaging / Container Charge',
                    desc: 'Charged for parcel or dine-in containers',
                  },
                  {
                    id: 'unexplained',
                    label: 'Other / Unexplained Surcharge',
                    desc: 'AC surcharge, cutlery fee, or round-off gap',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setChargeType(opt.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      chargeType === opt.id
                        ? 'bg-orange-50/80 border-orange-500 text-orange-950 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{opt.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Q4: Did the restaurant explain the charge? */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900">
                4. Did the restaurant explain the charge when asked?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yes', label: 'Explained politely' },
                  { id: 'refused', label: 'Refused to remove / hostile' },
                  { id: 'no', label: 'Did not ask yet' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRestaurantExplained(opt.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      restaurantExplained === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q5: Do you have a receipt or bill? */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900">
                5. Do you have a copy of the receipt or itemized bill?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'yes', label: 'Yes, printed or digital invoice' },
                  { id: 'no', label: 'No bill was provided' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHasReceipt(opt.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      hasReceipt === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Bill Breakdown & Legal Analysis */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Bill Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Sample Restaurant Bill</h3>
                  <p className="text-[11px] text-slate-400">Tax Invoice Verification</p>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  INV-2024-89
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Food & Beverage Items</span>
                  <span className="font-mono font-bold">₹{foodSubtotal.toFixed(2)}</span>
                </div>

                {chargeType === 'service_charge' && (
                  <div className="flex justify-between text-orange-700 bg-orange-50 p-2 rounded-lg font-medium">
                    <div>
                      <span className="font-bold">Service Charge ({serviceChargeRate}%)</span>
                      <p className="text-[10px] text-orange-600">Voluntary per CCPA 2022 guidelines</p>
                    </div>
                    <span className="font-mono font-bold">₹{serviceChargeAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>GST (CGST 2.5% + SGST 2.5%)</span>
                  <span className="font-mono">₹{gstAmount.toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Payable:</span>
                  <span className="font-mono text-base text-blue-900">₹{totalBill.toFixed(2)}</span>
                </div>
              </div>

              {/* Bill controls */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <label className="text-slate-500 block mb-1">Subtotal (₹):</label>
                  <input
                    type="number"
                    value={foodSubtotal}
                    onChange={(e) => setFoodSubtotal(Math.max(100, Number(e.target.value) || 0))}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Service Charge (%):</label>
                  <input
                    type="number"
                    value={serviceChargeRate}
                    onChange={(e) => setServiceChargeRate(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Legal Rule Card explaining Nuances */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Scale className="w-4 h-4" />
                <span>Legal Framework & Applicable Rules</span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-2.5">
                <p>
                  <strong className="text-white">Central Consumer Protection Authority (CCPA) Guidelines (2022):</strong>{' '}
                  Hotels and restaurants are prohibited from levying service charge automatically or by default.
                  A tip or service charge is strictly voluntary and at the consumer&apos;s discretion.
                </p>
                <p className="p-2.5 rounded-xl bg-slate-800 text-amber-200 border border-slate-700 text-[11px]">
                  <strong>Judicial Nuance:</strong> Restaurant associations challenged this guideline in the
                  Hon&apos;ble Delhi High Court. An interim stay was granted subject to conditions (e.g., clear
                  prominent disclosure on menus and no mandatory collection for takeaway). However, consumer
                  forums continue to treat forced imposition as an Unfair Trade Practice under Section 2(47) of
                  the Consumer Protection Act 2019.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Results & Action Recommendations */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Analysis & Recommended Step-by-Step Action
              </h3>
              <p className="text-xs text-slate-500">Based on your selections above</p>
            </div>
          </div>

          {/* Action steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs font-bold text-slate-900">Review Itemized Bill</h4>
              <p className="text-xs text-slate-600">
                Inspect whether the charge is GST (which is legal) or Service Charge / packaging
                surcharge. Cross-verify against the prices on the menu card.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs font-bold text-slate-900">Ask Manager to Remove</h4>
              <p className="text-xs text-slate-600">
                Politely cite CCPA guidelines. Inform the manager that service charge is voluntary.
                If they refuse, ask them to make a written endorsement on the bill.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-xs font-bold text-slate-900">Preserve All Evidence</h4>
              <p className="text-xs text-slate-600">
                {hasReceipt === 'yes'
                  ? 'Keep original paper receipt, payment transaction slip (UPI/card), and photograph of the menu page.'
                  : 'Notice: Without a receipt, it is difficult to prove the charge in forum. Always insist on a tax invoice.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="text-xs font-bold text-slate-900">Lodge Official Grievance</h4>
              <p className="text-xs text-slate-600">
                Call National Consumer Helpline at 1915 or register on consumerhelpline.gov.in. NCH
                mediates directly with the restaurant management.
              </p>
            </div>
          </div>

          {/* Button labeled exactly: Explore Consumer Complaint Options */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              *Disclaimer: Not all additional charges are illegal. Taxes and pre-disclosed packaging
              may be valid under specific conditions.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() =>
                  onOpenAssistantWithPrompt(
                    'Can a restaurant legally add a service charge to my food bill if I refuse to pay it?'
                  )
                }
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                Ask Nyaya AI about Service Charges
              </button>
              <button
                onClick={() =>
                  onNavigateToReport(
                    'Consumer Rights',
                    `Disputed restaurant bill extra charge. Food subtotal ₹${foodSubtotal}, Service Charge ₹${serviceChargeAmount.toFixed(
                      2
                    )}. Restaurant refused to waive.`
                  )
                }
                className="w-full sm:w-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Explore Consumer Complaint Options</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
