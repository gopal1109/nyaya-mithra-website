export type CaseStatus =
  | 'Draft'
  | 'Ready to submit'
  | 'Submitted externally'
  | 'Awaiting response'
  | 'Additional information required'
  | 'Resolved'
  | 'Closed';

export interface LegalCategory {
  id: string;
  title: string;
  shortTitle: string;
  code: string;
  icon: string;
  description: string;
  badge: string;
  subtopics: Array<{
    name: string;
    description: string;
    commonIssues: string[];
    governingAct: string;
  }>;
  relevantLaws: string[];
  officialChannels: Array<{
    name: string;
    portalUrl: string;
    helpline?: string;
  }>;
  quickAdvice: string[];
}

export interface LawDetail {
  id: string;
  title: string;
  shortTitle: string;
  actNumberYear: string;
  ministryOrAuthority: string;
  purpose: string;
  importantProvisions: Array<{
    section: string;
    title: string;
    plainEnglish: string;
  }>;
  everydayExamples: string[];
  whoItAppliesTo: string;
  exceptionsLimitations: string[];
  officialSourceUrl: string;
  lastAmended?: string;
}

export interface OfficialResource {
  id: string;
  organization: string;
  shortName: string;
  purpose: string;
  relevantGrievanceTypes: string[];
  officialUrl: string;
  helpline: string;
  basicInstructions: string[];
  lastVerifiedDate: string;
  isGovernment: boolean;
  jurisdiction: 'National' | 'State / Regional' | 'Banking & RBI' | 'Consumer Forums';
}

export interface CaseRecord {
  id: string;
  title: string;
  category: string;
  opponentName: string;
  incidentDate: string;
  amount?: number;
  state: string;
  city: string;
  facts: string;
  remedySought: string;
  status: CaseStatus;
  externalRefNo?: string;
  documents: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    uploadDate: string;
  }>;
  notes: Array<{
    id: string;
    date: string;
    text: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  preferredLanguage: 'English' | 'Hindi' | 'Telugu';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
  relatedLaws?: string[];
  portalLink?: { name: string; url: string };
}
