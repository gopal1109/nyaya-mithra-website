import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini SDK if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Error initializing GoogleGenAI:', err);
  }
}

// System prompt grounding the AI in Indian Law
const NYAYA_SYSTEM_INSTRUCTION = `You are "Nyaya Assistant", a knowledgeable, compassionate Indian legal awareness and citizen grievance guidance assistant on the NYAYA MITRA platform.
Your purpose:
1. Explain legal rights and procedures in plain, simple, accessible language.
2. Reference relevant Indian statutes accurately (such as Consumer Protection Act 2019, Motor Vehicles Act 1988/2019, Information Technology Act 2000, Real Estate (RERA) Act 2016, Right to Information Act 2005, Constitution of India, etc.).
3. Suggest practical, lawful next steps and evidence to preserve.
4. Point users to official government grievance portals (National Consumer Helpline 1915, e-Daakhil, Parivahan Virtual Courts, Cybercrime 1930 / cybercrime.gov.in, CPGRAMS, RBI Ombudsman CMS, NALSA for free legal aid).
5. If requested, draft polite, factual complaint letters or notices with structured date, recipient, facts, legal grounds, and remedy sought.
6. Support English, Hindi, and Telugu (respond in the language asked or requested by the user).

CRITICAL BOUNDARIES:
- You provide general legal information, educational guidance, and grievance direction, NOT formal legal advice or attorney representation.
- Never guarantee legal victories, court outcomes, or claim an official government complaint has been filed.
- Always be objective; do not unfairly accuse merchants without factual verification.
- Always include a brief note reminding the user that this is legal awareness and they may consult an advocate or free legal aid (NALSA helpline 15100) for representation.`;

// Assistant API endpoint
app.post('/api/assistant', async (req, res) => {
  const { message, language = 'English', conversationHistory = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // If Gemini API is available, generate real AI response
  if (ai) {
    try {
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Add recent history if provided
      if (Array.isArray(conversationHistory)) {
        for (const item of conversationHistory.slice(-6)) {
          if (item.sender === 'user') {
            contents.push({ role: 'user', parts: [{ text: item.text }] });
          } else if (item.sender === 'assistant') {
            contents.push({ role: 'model', parts: [{ text: item.text }] });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [
          {
            text: `[User preferred response language: ${language}]\n${message}`,
          },
        ],
      });

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: NYAYA_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 8000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      const text = response.text || 'I could not generate an answer at this moment. Please try again.';
      return res.json({ reply: text, source: 'gemini' });
    } catch (err: any) {
      console.error('Gemini API call failed, falling back to legal rules engine:', err?.message || err);
    }
  }

  // Fallback legal engine if API key is not configured or temporary network issue
  const lower = message.toLowerCase();
  let fallbackReply = '';

  if (lower.includes('service charge') || lower.includes('restaurant')) {
    fallbackReply = `**Restaurant Service Charge Guidelines:**\n\n1. **Is it mandatory?** No. Under the Central Consumer Protection Authority (CCPA) guidelines issued on 4 July 2022, hotels and restaurants cannot levy service charge automatically or by default in food bills. A service charge is entirely voluntary and is a tip at the consumer's discretion.\n2. **Taxes vs Service Charge:** GST (5% for standard non-AC/AC restaurants without ITC) is mandatory government tax. Service charge is not a tax.\n3. **Steps you can take:**\n   - Politely ask the restaurant staff or manager to remove the service charge before payment.\n   - If they refuse, note down the objection on the bill or pay under protest.\n   - File a complaint on the National Consumer Helpline (Call 1915 or visit consumerhelpline.gov.in).\n   - You can also lodge an e-Daakhil complaint with the District Consumer Commission.\n\n*Disclaimer: Note that certain restaurant associations challenged the guidelines in the Delhi High Court, where an interim stay subject to conditions exists, but the CCPA strongly advises against compulsory imposition.*`;
  } else if (lower.includes('challan') || lower.includes('traffic')) {
    fallbackReply = `**Disputing an Incorrect Traffic Challan:**\n\n1. **Check Evidence:** Visit the official Parivahan eChallan portal (echallan.parivahan.gov.in). View the photo/video proof, vehicle plate number, date, time, and location to verify if it is indeed your vehicle.\n2. **Common Errors:** Clerical errors (misread number plate on another car), cloned plates, or already expired challan.\n3. **How to Contest:**\n   - Click "Grievance" on the Parivahan portal and upload your vehicle registration certificate (RC) and photos showing discrepancies.\n   - When sent to the Virtual Court (vcourts.gov.in), you can opt to "Contest the case" before the presiding Magistrate instead of paying.\n   - For Lok Adalat: Minor traffic disputes are frequently settled with reduced fines or waivers during National Lok Adalats held every quarter across districts.\n\n*Relevant Law: Motor Vehicles (Amendment) Act, 2019.*`;
  } else if (lower.includes('land') || lower.includes('property') || lower.includes('encroach')) {
    fallbackReply = `**Land & Property Encroachment Guidance:**\n\n1. **Verify Your Title:** Ensure your Sale Deed, Registered Title, Khata/Patta/7/12 extract, and up-to-date Property Tax receipts are preserved safely.\n2. **Key Steps:**\n   - **Revenue/Municipal Authority:** Submit a written complaint to the local Tahsildar/Revenue Divisional Officer (RDO) or Municipal Corporation with certified boundary survey maps.\n   - **Police Intervention:** File a written complaint for Criminal Trespass (Section 329 BNS / Section 441 IPC) if unauthorized persons forcefully occupy your land.\n   - **Civil Court Relief:** File a suit for Permanent Injunction and Possession under the Specific Relief Act, 1963.\n3. **Important Note:** Land and revenue records are subject to State-specific Land Revenue Codes. We recommend consulting a local revenue advocate.`;
  } else if (lower.includes('scam') || lower.includes('cyber') || lower.includes('upi') || lower.includes('fraud')) {
    fallbackReply = `**Online Payment & Cyber Fraud Immediate Steps:**\n\n1. **Golden Hour Action (within 2-3 hours):**\n   - Call **1930** immediately (National Cybercrime Helpline, operated by MHA & I4C).\n   - This initiates the financial fraud freeze across participating banks to lock the recipient's bank account before money is withdrawn.\n2. **Report Online:** Visit **cybercrime.gov.in** and lodge a formal cyber complaint with transaction IDs, UPI reference numbers, SMS alerts, and call screenshots.\n3. **Notify Your Bank:** Contact your bank's 24/7 fraud helpline and request an acknowledgment number. Under RBI guidelines (Circular on Limiting Liability of Customers in Unauthorised Electronic Banking Transactions), zero liability applies if reported within 3 working days without customer negligence.`;
  } else if (lower.includes('fundamental rights') || lower.includes('constitution')) {
    fallbackReply = `**Fundamental Rights Under the Indian Constitution (Part III, Articles 12-35):**\n\n1. **Right to Equality (Articles 14-18):** Equality before the law, prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.\n2. **Right to Freedom (Articles 19-22):** Freedom of speech & expression, peaceful assembly, movement, residence, and profession (subject to reasonable restrictions).\n3. **Right to Life & Personal Liberty (Article 21):** The cornerstone right, expanded to include right to privacy, clean environment, health, and dignified livelihood.\n4. **Right against Exploitation (Articles 23-24):** Prohibition of human trafficking, forced labor, and child labor in hazardous occupations.\n5. **Right to Freedom of Religion (Articles 25-28).**\n6. **Cultural and Educational Rights (Articles 29-30).**\n7. **Right to Constitutional Remedies (Article 32 & 226):** Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution", allowing any citizen to move the Supreme Court or High Courts via Writs (Habeas Corpus, Mandamus, Quo Warranto, Certiorari, Prohibition).`;
  } else {
    fallbackReply = `Hello! I am your Nyaya Assistant. Indian law protects citizens across consumer disputes, traffic issues, cyber fraud, tenancy, public grievances, and fundamental rights.\n\nTo help you effectively:\n- Please tell me the specific issue you faced (e.g., restaurant extra charge, denied refund, wrong challan, unauthorized bank charge, or RTI).\n- Let me know your state if local rules apply.\n\n*Remember: This information is for civic education and general guidance. For judicial representation, you can reach out to NALSA (Helpline 15100) or an authorized advocate.*`;
  }

  return res.json({ reply: fallbackReply, source: 'fallback_engine' });
});

// Draft complaint letter generator endpoint
app.post('/api/draft-complaint', async (req, res) => {
  const { category, opponentName, incidentDate, amount, facts, cityState, remedySought } = req.body;

  const dateStr = incidentDate || new Date().toISOString().split('T')[0];
  const template = `LEGAL NOTICE / FORMAL COMPLAINT DRAFT

Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

To:
The Grievance Redressal Officer / Management,
${opponentName || '[Business / Authority Name]'},
${cityState || '[City, State]'}

Subject: Formal Complaint regarding ${category || 'Consumer Grievance'} — Deficient Service / Unfair Practice

Dear Sir/Madam,

I am writing to bring to your formal notice the following grievance and seek immediate redressal:

1. STATEMENT OF FACTS:
On or about ${dateStr}, I engaged with your establishment/service. ${facts || 'The service provided was defective and caused unwarranted financial and mental hardship.'}
${amount ? `The disputed transaction involves a monetary amount of ₹${amount}.` : ''}

2. LEGAL PROVISIONS APPLICABLE:
- The Consumer Protection Act, 2019 (Section 2(47) regarding 'Unfair Trade Practice' and Section 2(11) regarding 'Deficiency in Service').
- Citizen Charter guidelines and statutory standards prescribed for consumer fair dealing.

3. RELIEF SOUGHT:
In light of the facts stated above, I respectfully demand:
- ${remedySought || 'Immediate resolution of the issue and full refund of the disputed amount.'}
- An official written confirmation acknowledging the closure of this grievance within 15 days of receipt of this notice.

Should you fail to redress this genuine grievance within 15 days, I reserve the right to escalate this matter to the National Consumer Helpline (NCH), lodge a complaint before the Competent District Consumer Disputes Redressal Commission via e-Daakhil, and claim compensation for legal costs and harassment.

Yours sincerely,

[Your Full Name]
[Contact Number / Email]
[Address]
Enclosures: Attached receipts, transaction screenshots, and correspondence records.`;

  res.json({ draftLetter: template });
});

// Instant Whom & How to Complain Analyzer Endpoint
app.post('/api/whom-to-complain', async (req, res) => {
  const { problemText, opponentName = '', city = '', state = 'India', amount = '' } = req.body;

  if (!problemText || typeof problemText !== 'string') {
    return res.status(400).json({ error: 'problemText is required' });
  }

  const textLower = problemText.toLowerCase();

  // Try Gemini if available
  if (ai) {
    try {
      const prompt = `Analyze this citizen legal grievance in India and output strict JSON identifying exactly WHOM to complain to and HOW to complain:
Grievance: "${problemText}"
Opponent: "${opponentName}"
Location: "${city}, ${state}"
Amount: "${amount}"

Return JSON matching:
{
  "category": string,
  "whomToComplain": {
    "primaryAuthority": string,
    "officerDesignation": string,
    "portalName": string,
    "portalUrl": string,
    "helpline": string,
    "escalationLevels": [
      { "level": string, "target": string, "timeline": string }
    ]
  },
  "howToComplain": [
    { "stepNumber": number, "title": string, "instruction": string }
  ],
  "applicableLaw": {
    "actName": string,
    "keySections": string,
    "userRights": string,
    "limitationPeriod": string
  },
  "evidenceChecklist": string[],
  "prefilledDraft": string
}`;

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    } catch (e: any) {
      console.log('Gemini whom-to-complain failed, using intelligent fallback rules:', e?.message || e);
    }
  }

  // Intelligent Fallback Legal Routing Engine
  let category = 'Consumer Rights & Unfair Trade Practices';
  let primaryAuthority = 'National Consumer Helpline (NCH) & District Consumer Commission';
  let officerDesignation = 'Grievance Redressal Officer / Consumer Commission President';
  let portalName = 'National Consumer Helpline (consumerhelpline.gov.in) & e-Daakhil';
  let portalUrl = 'https://consumerhelpline.gov.in';
  let helpline = '1915 (Toll-Free, 8 AM - 8 PM) or SMS 8800001915';
  let actName = 'The Consumer Protection Act, 2019';
  let keySections = 'Section 2(47) (Unfair Trade Practice) & Section 2(11) (Deficiency in Service)';
  let userRights = 'Right to be protected against misleading advertisements, unfair billing, and right to refund/replacement for deficient goods or services.';
  let limitationPeriod = '2 years from the date the dispute arose (Section 69, CPA 2019)';
  let evidenceChecklist = [
    'Original tax invoice, cash memo, or electronic receipt',
    'Bank account statement or UPI transaction ID screenshot',
    'Copies of emails, chat logs, or SMS communications with the seller',
    'Photographs or video proof of defective items or packaging',
  ];
  let escalationLevels = [
    { level: 'Level 1: Internal Escalation', target: `${opponentName || 'Merchant'} Grievance Officer / Management`, timeline: 'Give 7 to 15 days for voluntary resolution' },
    { level: 'Level 2: Mediation via NCH', target: 'National Consumer Helpline (Docket Registration)', timeline: 'Mediation typically takes 15 to 45 days' },
    { level: 'Level 3: Judicial Consumer Forum', target: 'District Consumer Disputes Redressal Commission via e-Daakhil', timeline: 'Statutory filing limit up to 2 years' },
  ];
  let howToComplain = [
    { stepNumber: 1, title: 'Serve Written Grievance Notice', instruction: `Send an email or formal registered post to ${opponentName || 'the opponent'} setting out the facts, quoting the transaction details, and demanding resolution within 15 days.` },
    { stepNumber: 2, title: 'Gather All Receipts & Proof', instruction: 'Collate your invoices, warranty cards, screenshots of conversations, and proof of payment in PDF/JPG format.' },
    { stepNumber: 3, title: 'Lodge Online Complaint on NCH', instruction: 'Visit consumerhelpline.gov.in or call 1915. Register with your mobile number, select the company name, paste your grievance facts, and attach invoices.' },
    { stepNumber: 4, title: 'Escalate to e-Daakhil if Ignored', instruction: 'If the company does not resolve the complaint through NCH within 30-45 days, file a formal consumer complaint online at edaakhil.nic.in before the District Commission.' },
  ];

  // Domain 1: Traffic & Vehicle Challans
  if (textLower.includes('challan') || textLower.includes('traffic') || textLower.includes('speed camera') || textLower.includes('helmet') || textLower.includes('driving licence') || textLower.includes('rc book')) {
    category = 'Traffic Regulations & Road Safety';
    primaryAuthority = 'Traffic Police Grievance Wing & Virtual Courts (Ministry of Law / MoRTH)';
    officerDesignation = 'Deputy Commissioner of Police (Traffic) / Metropolitan Magistrate';
    portalName = 'Parivahan eChallan & Virtual Courts Portal';
    portalUrl = 'https://echallan.parivahan.gov.in';
    helpline = 'helpdesk-echallan@gov.in / 0120-4925505';
    actName = 'Motor Vehicles Act, 1988 (as amended in 2019)';
    keySections = 'Section 136A (Electronic Enforcement), Rule 139 CMVR (DigiLocker validity), Section 208 (Summary disposal)';
    userRights = 'Right to inspect photographic evidence of alleged violation, right to use DigiLocker digital documents, and right to contest unfair fines before a Magistrate.';
    limitationPeriod = 'Within 90 days before virtual court sends physical summons';
    evidenceChecklist = [
      'Challan PDF notice downloaded from Parivahan',
      'Vehicle Registration Certificate (RC) showing exact make, model & color',
      'Photographs of your vehicle proving differences with camera image',
      'Toll receipts or parking tickets proving vehicle was elsewhere',
    ];
    escalationLevels = [
      { level: 'Level 1: Parivahan Grievance', target: 'eChallan Online Grievance System', timeline: 'Submit within 15 days of challan receipt' },
      { level: 'Level 2: Virtual Court Contest', target: 'Virtual Court (vcourts.gov.in)', timeline: 'Select "Contest Case" before Virtual Magistrate' },
      { level: 'Level 3: Regular Court / Lok Adalat', target: 'Traffic Metropolitan Magistrate Court or National Lok Adalat', timeline: 'Quarterly Lok Adalat for fine reduction or disposal' },
    ];
    howToComplain = [
      { stepNumber: 1, title: 'Inspect Camera Photographic Evidence', instruction: 'Log on to echallan.parivahan.gov.in, enter your vehicle plate or challan number, and download high-resolution photos of the incident.' },
      { stepNumber: 2, title: 'Submit Online Grievance on Parivahan', instruction: 'Click the "Grievance" tab on Parivahan, describe the clerical plate misread, and upload your RC proving your vehicle is different.' },
      { stepNumber: 3, title: 'Contest in Virtual Court (vcourts.gov.in)', instruction: 'If transferred to Virtual Court, do not click "Pay Fine". Select "I wish to contest the case" to present your defense before the Magistrate.' },
      { stepNumber: 4, title: 'Opt for National Lok Adalat Settlement', instruction: 'Minor traffic compoundable offences can be brought before quarterly Lok Adalats organized by DLSA for speedy dispute resolution.' },
    ];
  }
  // Domain 2: Cyber Fraud & UPI Scams
  else if (textLower.includes('cyber') || textLower.includes('upi') || textLower.includes('scam') || textLower.includes('fraud') || textLower.includes('otp') || textLower.includes('hacked') || textLower.includes('phishing')) {
    category = 'Online Fraud & Cyber Safety';
    primaryAuthority = 'Indian Cyber Crime Coordination Centre (I4C, MHA) & Home Bank Fraud Cell';
    officerDesignation = 'Inspector of Police (Cyber Crime) & Bank Principal Nodal Officer';
    portalName = 'National Cyber Crime Reporting Portal (cybercrime.gov.in)';
    portalUrl = 'https://cybercrime.gov.in';
    helpline = '1930 (National Cyber Financial Fraud 24/7 Helpline)';
    actName = 'Information Technology Act, 2000 & RBI Customer Protection Framework';
    keySections = 'Section 66C (Identity Theft), Section 66D (Cheating by Personation), RBI Circular DBR.No.Leg.BC.78/2017-18';
    userRights = 'Zero liability for unauthorized electronic transactions if notified to bank within 3 working days without customer negligence.';
    limitationPeriod = 'Dial 1930 within the first 2-3 hours ("Golden Hour") for beneficiary account freeze';
    evidenceChecklist = [
      'Bank statement showing transaction timestamp and UTR number',
      'Screenshots of phishing SMS, WhatsApp chat, or fraudulent APK link',
      'Caller phone numbers or recipient UPI Virtual Payment Address (VPA)',
      'Written dispute acknowledgment letter from your bank branch',
    ];
    escalationLevels = [
      { level: 'Level 1: Immediate Freeze (1930)', target: 'National Cyber Financial Fraud Helpline (I4C)', timeline: 'Call within 2 to 3 hours of money transfer' },
      { level: 'Level 2: Formal Cyber Complaint', target: 'cybercrime.gov.in Online FIR System', timeline: 'Submit within 24 hours of incident' },
      { level: 'Level 3: RBI Ombudsman Escalation', target: 'RBI Integrated Ombudsman (cms.rbi.org.in)', timeline: 'If bank fails to reverse within 30 days' },
    ];
    howToComplain = [
      { stepNumber: 1, title: 'Dial 1930 Immediately (Golden Hour)', instruction: 'Call 1930 right away. Provide your bank account details and beneficiary UPI ID to freeze the funds across banking rails before cash withdrawal.' },
      { stepNumber: 2, title: 'Lodge Cyber Portal Complaint', instruction: 'Visit cybercrime.gov.in, choose "Report Financial Fraud", fill in transaction details, and save the SMS acknowledgment number.' },
      { stepNumber: 3, title: 'Submit Written Notice to Your Bank', instruction: 'Visit your home bank branch within 3 working days, submit the Cyber Crime reference acknowledgment, and claim zero customer liability under RBI rules.' },
      { stepNumber: 4, title: 'Escalate to RBI Ombudsman (cms.rbi.org.in)', instruction: 'If your bank rejects or delays resolution beyond 30 days, lodge an appeal on the RBI CMS portal (Helpline 14448).' },
    ];
  }
  // Domain 3: Restaurant Service Charge & Food Bill Surcharges
  else if (textLower.includes('service charge') || textLower.includes('restaurant') || textLower.includes('packaging charge') || textLower.includes('ac charge') || textLower.includes('hotel bill')) {
    category = 'Consumer Protection — Restaurant Billing Disputes';
    primaryAuthority = 'Central Consumer Protection Authority (CCPA) & National Consumer Helpline';
    officerDesignation = 'Chief Commissioner, CCPA & District Consumer Mediation Cell';
    portalName = 'National Consumer Helpline (NCH INGRAM)';
    portalUrl = 'https://consumerhelpline.gov.in';
    helpline = '1915 (Toll-Free, 8 AM - 8 PM) or SMS 8800001915';
    actName = 'Consumer Protection Act, 2019 & CCPA Guidelines dated 4 July 2022';
    keySections = 'Section 2(47) (Unfair Trade Practice) & CCPA 2022 Guidelines on Service Charge';
    userRights = 'Service charge is completely voluntary. Hotels and restaurants are prohibited from collecting service charge by default without consent.';
    limitationPeriod = '2 years under Section 69 of Consumer Protection Act, 2019';
    evidenceChecklist = [
      'Original printed itemized tax invoice showing service charge separately',
      'Photograph of the restaurant menu card showing food prices',
      'Payment transaction receipt (UPI / Card swipe slip)',
      'Written notation on the bill if paid under protest',
    ];
    escalationLevels = [
      { level: 'Level 1: Spot Request to Manager', target: 'Restaurant Floor Manager / Proprietor', timeline: 'Immediate on presentation of bill' },
      { level: 'Level 2: National Consumer Helpline', target: 'NCH (consumerhelpline.gov.in / 1915)', timeline: 'File within 15 days of visit' },
      { level: 'Level 3: District Consumer Forum', target: 'District Commission via e-Daakhil', timeline: 'Claim refund, legal costs, and compensation' },
    ];
    howToComplain = [
      { stepNumber: 1, title: 'Request Manager to Remove Service Charge', instruction: 'Politely inform the restaurant manager that service charge is voluntary under CCPA 2022 guidelines and ask them to remove it from the bill.' },
      { stepNumber: 2, title: 'Pay Under Protest if Refused', instruction: 'If they refuse, pay the bill, write "Paid under protest — service charge forced" on the receipt, and keep the customer copy.' },
      { stepNumber: 3, title: 'Register Complaint on NCH 1915', instruction: 'Call 1915 or visit consumerhelpline.gov.in. Upload the bill copy and restaurant name. NCH will issue a mediation notice to the establishment.' },
      { stepNumber: 4, title: 'File e-Daakhil for Unfair Trade Practice', instruction: 'If unresolved, file an e-Daakhil complaint before the District Consumer Commission demanding refund of the charge and harassment compensation.' },
    ];
  }
  // Domain 4: Land & Property Encroachment / RERA Builder Delay
  else if (textLower.includes('land') || textLower.includes('property') || textLower.includes('encroach') || textLower.includes('rera') || textLower.includes('builder') || textLower.includes('tenant') || textLower.includes('rent')) {
    category = 'Land, Real Estate & Housing Rights';
    primaryAuthority = textLower.includes('builder') || textLower.includes('flat')
      ? 'State Real Estate Regulatory Authority (RERA)'
      : 'Tahsildar / Sub-Divisional Magistrate (SDM) & Civil Court';
    officerDesignation = textLower.includes('builder') ? 'RERA Adjudicating Officer' : 'Revenue Divisional Officer (RDO) / Tahsildar';
    portalName = textLower.includes('builder') ? 'State RERA Portal (e.g. MahaRERA, HRERA, UP-RERA)' : 'State Land Revenue & e-Courts Portal';
    portalUrl = 'https://mohua.gov.in/cms/rera.php';
    helpline = 'Local District Collectorate / Tahsildar Office';
    actName = textLower.includes('builder')
      ? 'Real Estate (Regulation and Development) Act (RERA), 2016'
      : 'Specific Relief Act, 1963 & State Land Revenue Codes';
    keySections = textLower.includes('builder')
      ? 'Section 18 RERA (Delay Interest & Refund), Section 14 (Structural Defect Guarantee)'
      : 'Section 6 Specific Relief Act (Dispossession), Criminal Trespass under BNS / IPC';
    userRights = 'Right to timely possession with statutory interest (SBI MCLR + 2%), right to clear boundary records, and protection against unauthorized eviction.';
    limitationPeriod = 'RERA complaints valid during ongoing delay; civil boundary suits have 3-year limit';
    evidenceChecklist = [
      'Registered Sale Deed, Agreement for Sale, or Registered Lease',
      'Mutation register / Khata / Patta / 7/12 extract records',
      'Payment receipts and builder construction milestone notices',
      'Certified boundary survey map from local revenue department',
    ];
    escalationLevels = [
      { level: 'Level 1: Written Legal Notice', target: `${opponentName || 'Builder / Opposite Party'}`, timeline: 'Give 15 to 30 days notice through an advocate' },
      { level: 'Level 2: Statutory Authority Filing', target: textLower.includes('builder') ? 'State RERA Portal' : 'Tahsildar / SDM Revenue Court', timeline: 'File within statutory window' },
      { level: 'Level 3: Civil Court / High Court', target: 'District Civil Judge / High Court (Section 9 CPC)', timeline: 'Suit for Injunction and Vacant Possession' },
    ];
    howToComplain = [
      { stepNumber: 1, title: 'Verify Certified Revenue Records', instruction: 'Obtain certified copies of Encumbrance Certificate (EC), Patta/Khata/7/12 extract, and registered deeds from the Sub-Registrar.' },
      { stepNumber: 2, title: 'Serve Legal Notice of Demand', instruction: 'Issue a formal legal notice demanding compliance with agreement terms or immediate vacation of encroached portion within 15-30 days.' },
      { stepNumber: 3, title: 'Lodge Official Complaint with Authority', instruction: textLower.includes('builder') ? 'Lodge an online complaint on your State RERA portal with project registration number and demand delay interest.' : 'Submit a boundary demarcation petition to the Tahsildar with village survey maps.' },
      { stepNumber: 4, title: 'Seek Police Protection or Civil Injunction', instruction: 'If physical encroachment or threats occur, lodge a written complaint for Criminal Trespass with local police and file for an injunction in Civil Court.' },
    ];
  }
  // Domain 5: Public Grievances, Electricity & Municipal
  else if (textLower.includes('electricity') || textLower.includes('water') || textLower.includes('road') || textLower.includes('pothole') || textLower.includes('garbage') || textLower.includes('municipal') || textLower.includes('rti') || textLower.includes('passport') || textLower.includes('epfo')) {
    category = 'Public Services & Civic Administration';
    primaryAuthority = textLower.includes('electricity')
      ? 'Electricity Consumer Grievance Redressal Forum (CGRF) & Electricity Ombudsman'
      : 'Central Public Grievance Redress and Monitoring System (CPGRAMS) / Municipal Commissioner';
    officerDesignation = 'Public Grievance Redressal Officer / Electricity Ombudsman';
    portalName = 'CPGRAMS (pgportal.gov.in) & State Service Portals';
    portalUrl = 'https://pgportal.gov.in';
    helpline = '011-23743030 (CPGRAMS) or 1912 (Electricity All-India)';
    actName = textLower.includes('rti') ? 'Right to Information Act, 2005' : 'Citizen Charter Framework & Electricity Act, 2003';
    keySections = 'Section 42(5) Electricity Act (CGRF mandate), Section 7(1) RTI Act (30-day response window)';
    userRights = 'Right to quality public utility services, time-bound grievance resolution, and right to inspect official government files under RTI.';
    limitationPeriod = 'Electricity CGRF within 1-2 years; RTI appeals within 30-90 days';
    evidenceChecklist = [
      'Electricity consumer number (CA number) and billing statements',
      'Photographs of open manholes, garbage dumps, or damaged roads with geo-tags',
      'Previous written complaint reference tickets / SMS acknowledgments',
    ];
    escalationLevels = [
      { level: 'Level 1: Utility Helpdesk', target: 'Local Assistant Engineer / Municipal Ward Office', timeline: 'Standard 7 days resolution' },
      { level: 'Level 2: CPGRAMS / CGRF', target: 'Central Public Grievance Portal (pgportal.gov.in)', timeline: '30-day mandatory redressal window' },
      { level: 'Level 3: Statutory Ombudsman', target: 'State Electricity Ombudsman or Lokayukta', timeline: 'Within 30 days of unsatisfactory reply' },
    ];
    howToComplain = [
      { stepNumber: 1, title: 'Lodge Grievance on Municipal / Discom Helpline', instruction: 'Call 1912 for power issues or register on your municipal citizen app with photo proof.' },
      { stepNumber: 2, title: 'File on CPGRAMS (pgportal.gov.in)', instruction: 'Log on to CPGRAMS, select the concerned Ministry/Department, enter facts up to 4000 characters, and attach PDF proof.' },
      { stepNumber: 3, title: 'Escalate to Electricity Ombudsman', instruction: 'If electricity overbilling or power supply complaints remain unresolved by CGRF after 60 days, approach the State Electricity Ombudsman.' },
      { stepNumber: 4, title: 'File an RTI Application (rtionline.gov.in)', instruction: 'Use RTI to obtain official road maintenance contracts, contractor payments, and inspection reports for public transparency.' },
    ];
  }

  // Pre-filled custom formal letter
  const prefilledDraft = `FORMAL GRIEVANCE NOTICE / LEGAL NOTICE

Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

To:
The Grievance Redressal Officer / Authorized Representative,
${opponentName || '[Opposite Party / Organization Name]'},
${city ? `${city}, ` : ''}${state}

Subject: Formal Grievance regarding ${category} — Demand for Rectification and Redressal

Dear Sir/Madam,

I am writing to bring the following factual grievance to your immediate attention:

1. FACTS OF THE MATTER:
${problemText}
${amount ? `The monetary amount directly in dispute is ₹${amount}.` : ''}

2. STATUTORY GROUNDS & CITIZEN RIGHTS:
The aforementioned act/omission is in violation of statutory provisions under ${actName} (${keySections}).
As a citizen/consumer, I am entitled to fair dealing, time-bound service, and protection from arbitrary or deceptive practices.

3. RELIEF SOUGHT:
In light of the above facts, I respectfully demand:
a) Immediate rectification, full refund, or cancellation of disputed charges within 15 days of this notice.
b) Written confirmation of dispute closure.

Failing resolution within 15 days, I will proceed to file a formal complaint before ${primaryAuthority} via ${portalName} and seek exemplary damages for harassment and legal costs.

Yours sincerely,

[Your Name]
[Contact Number / Email]
[Address]
Copy sent for records to: Self Case File (Nyaya Mitra Case ID: NM-${Date.now().toString().slice(-6)})`;

  return res.json({
    category,
    whomToComplain: {
      primaryAuthority,
      officerDesignation,
      portalName,
      portalUrl,
      helpline,
      escalationLevels,
    },
    howToComplain,
    applicableLaw: {
      actName,
      keySections,
      userRights,
      limitationPeriod,
    },
    evidenceChecklist,
    prefilledDraft,
  });
});

async function startServer() {

  // In development, hook Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nyaya Mitra server running on port ${PORT}`);
  });
}

startServer();
