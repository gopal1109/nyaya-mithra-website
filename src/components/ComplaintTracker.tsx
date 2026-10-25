import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ExternalLink,
  Edit3,
  Calendar,
  FileCheck,
  Building,
  Paperclip,
  Trash2,
  Filter,
  Download,
} from 'lucide-react';
import { CaseRecord, CaseStatus } from '../types';

interface ComplaintTrackerProps {
  cases: CaseRecord[];
  onUpdateCase: (updatedCase: CaseRecord) => void;
  onDeleteCase: (caseId: string) => void;
  onNavigateToReport: () => void;
}

const ALL_STATUSES: CaseStatus[] = [
  'Draft',
  'Ready to submit',
  'Submitted externally',
  'Awaiting response',
  'Additional information required',
  'Resolved',
  'Closed',
];

const statusBadgeClasses: Record<CaseStatus, string> = {
  Draft: 'bg-slate-100 text-slate-700 border-slate-200',
  'Ready to submit': 'bg-blue-100 text-blue-900 border-blue-200',
  'Submitted externally': 'bg-indigo-100 text-indigo-900 border-indigo-200',
  'Awaiting response': 'bg-amber-100 text-amber-900 border-amber-200',
  'Additional information required': 'bg-rose-100 text-rose-900 border-rose-200',
  Resolved: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  Closed: 'bg-slate-200 text-slate-800 border-slate-300',
};

export const ComplaintTracker: React.FC<ComplaintTrackerProps> = ({
  cases,
  onUpdateCase,
  onDeleteCase,
  onNavigateToReport,
}) => {
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(cases[0] || null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [editingRefNo, setEditingRefNo] = useState<boolean>(false);
  const [tempRefNo, setTempRefNo] = useState<string>('');

  const filteredCases =
    filterStatus === 'all'
      ? cases
      : cases.filter((c) => c.status === filterStatus);

  const handleStatusChange = (newStatus: CaseStatus) => {
    if (!selectedCase) return;
    const updated = {
      ...selectedCase,
      status: newStatus,
      updatedAt: new Date().toLocaleDateString('en-IN'),
    };
    setSelectedCase(updated);
    onUpdateCase(updated);
  };

  const handleSaveRefNo = () => {
    if (!selectedCase) return;
    const updated = {
      ...selectedCase,
      externalRefNo: tempRefNo,
      updatedAt: new Date().toLocaleDateString('en-IN'),
    };
    setSelectedCase(updated);
    onUpdateCase(updated);
    setEditingRefNo(false);
  };

  const handleAddNote = () => {
    if (!selectedCase || !newNoteText.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-IN'),
      text: newNoteText.trim(),
    };
    const updated = {
      ...selectedCase,
      notes: [newNote, ...(selectedCase.notes || [])],
      updatedAt: new Date().toLocaleDateString('en-IN'),
    };
    setSelectedCase(updated);
    onUpdateCase(updated);
    setNewNoteText('');
  };

  const handleExportSummary = () => {
    if (!selectedCase) return;
    const summary = `NYAYA MITRA — CASE SUMMARY EXPORT
===========================================
Case ID: ${selectedCase.id}
Title: ${selectedCase.title}
Category: ${selectedCase.category}
Opponent: ${selectedCase.opponentName}
Status: ${selectedCase.status}
External Reference No: ${selectedCase.externalRefNo || 'Not yet provided'}
Incident Date: ${selectedCase.incidentDate}
Amount: ${selectedCase.amount ? `₹${selectedCase.amount}` : 'N/A'}
Location: ${selectedCase.city}, ${selectedCase.state}

FACTS OF THE CASE:
${selectedCase.facts}

REMEDY SOUGHT:
${selectedCase.remedySought}

ATTACHED DOCUMENTS:
${
  selectedCase.documents?.map((d) => `- ${d.name} (${d.size})`).join('\n') ||
  'No documents attached'
}

TIMELINE & CASE NOTES:
${
  selectedCase.notes
    ?.map((n) => `[${n.date}] ${n.text}`)
    .join('\n') || 'No notes added'
}
===========================================
Exported on ${new Date().toLocaleString('en-IN')} via Nyaya Mitra Platform.`;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Case_${selectedCase.id}_Summary.txt`;
    a.click();
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
              <FileCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>User Dashboard • Section 12</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              My Case Tracker & Grievance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage your private draft reports, evidence documents, and external government docket
              reference numbers.
            </p>
          </div>

          <button
            onClick={onNavigateToReport}
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Case</span>
          </button>
        </div>

        {/* Status Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Cases ({cases.length})
          </button>
          {ALL_STATUSES.map((st) => {
            const count = cases.filter((c) => c.status === st).length;
            if (count === 0 && filterStatus !== st) return null;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === st
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        {/* Main 2-column layout */}
        {cases.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Cases Recorded Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t saved any complaint drafts or incident records. Use the Problem Analyzer or
              Report a Problem feature to get started.
            </p>
            <button
              onClick={onNavigateToReport}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold"
            >
              File a Grievance Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Cases List */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Your Cases ({filteredCases.length})
              </h3>
              <div className="space-y-2.5">
                {filteredCases.map((c) => {
                  const isSelected = selectedCase?.id === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-blue-600 ring-2 ring-blue-100 shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusBadgeClasses[c.status]
                          }`}
                        >
                          {c.status}
                        </span>
                        <span className="text-[11px] text-slate-400">{c.incidentDate}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {c.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{c.facts}</p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{c.city}, {c.state}</span>
                        {c.externalRefNo && (
                          <span className="font-mono text-blue-800 font-semibold">
                            Ref: {c.externalRefNo}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Case Details & Timeline Management */}
            {selectedCase && (
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        statusBadgeClasses[selectedCase.status]
                      }`}
                    >
                      {selectedCase.status}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                      {selectedCase.title}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Created on {selectedCase.createdAt} • Updated {selectedCase.updatedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportSummary}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                      title="Download Summary"
                    >
                      <Download className="w-4 h-4 text-slate-600" />
                      <span>Export</span>
                    </button>
                    <button
                      onClick={() => onDeleteCase(selectedCase.id)}
                      className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs"
                      title="Delete Case"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* External Complaint Reference Number (Section 12 mandate) */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                      External Complaint Reference / Docket No.
                    </span>
                    {!editingRefNo && (
                      <button
                        onClick={() => {
                          setTempRefNo(selectedCase.externalRefNo || '');
                          setEditingRefNo(true);
                        }}
                        className="text-xs text-blue-800 font-bold hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{selectedCase.externalRefNo ? 'Update' : 'Add Docket No'}</span>
                      </button>
                    )}
                  </div>

                  {editingRefNo ? (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={tempRefNo}
                        onChange={(e) => setTempRefNo(e.target.value)}
                        placeholder="e.g. NCH-2024-88492 or CPGRAMS-D-2024-0012"
                        className="px-3 py-1.5 rounded-lg border border-blue-300 text-xs bg-white w-full"
                      />
                      <button
                        onClick={handleSaveRefNo}
                        className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingRefNo(false)}
                        className="px-2 py-1.5 text-xs text-slate-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs font-mono font-bold text-blue-900">
                      {selectedCase.externalRefNo || (
                        <span className="text-slate-400 font-sans font-normal italic">
                          No external docket number entered yet. When you submit to NCH, CPGRAMS, or
                          Cybercrime 1930, add your reference number here.
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {/* Status Switcher (User controlled per Section 12 rule) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Update Resolution Status (Per Section 12 instructions, user confirms status):
                  </label>
                  <select
                    value={selectedCase.status}
                    onChange={(e) => handleStatusChange(e.target.value as CaseStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden"
                  >
                    {ALL_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Case Facts & Details */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Incident Narrative & Facts:
                  </h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {selectedCase.facts}
                  </p>
                </div>

                {/* Attached Documents */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Evidence & Uploaded Documents ({selectedCase.documents?.length || 0}):
                  </h4>
                  {selectedCase.documents && selectedCase.documents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedCase.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Paperclip className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                            <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{doc.size}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No evidence files attached.</p>
                  )}
                </div>

                {/* Case Notes & Timeline Activity */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Case Notes & Follow-up Timeline:
                  </h4>

                  {/* Add note */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add a progress note, e.g. Called customer care, spoke to Mr. Sharma..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-hidden"
                    />
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800"
                    >
                      Add Note
                    </button>
                  </div>

                  {/* Notes list */}
                  <div className="space-y-2">
                    {selectedCase.notes?.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                      >
                        <span className="text-[10px] font-bold text-slate-400">{n.date}</span>
                        <p className="text-slate-700 leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
