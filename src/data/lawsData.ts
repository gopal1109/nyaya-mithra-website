import { LawDetail } from '../types';

export const INDIAN_LAWS: LawDetail[] = [
  {
    id: 'cpa-2019',
    title: 'The Consumer Protection Act, 2019',
    shortTitle: 'Consumer Protection Act, 2019',
    actNumberYear: 'Act No. 35 of 2019',
    ministryOrAuthority: 'Ministry of Consumer Affairs, Food & Public Distribution',
    purpose:
      'Provides effective protection of the interests of consumers, establishes authorities for timely dispute settlement, recognizes unfair trade practices, and introduces product liability for defective goods.',
    importantProvisions: [
      {
        section: 'Section 2(47)',
        title: 'Definition of Unfair Trade Practice',
        plainEnglish:
          'Prohibits false representations regarding quality, misleading advertisements, refusal to issue a tax invoice, or unilateral contract clauses favoring the seller.',
      },
      {
        section: 'Section 2(11)',
        title: 'Deficiency in Service',
        plainEnglish:
          'Any fault, imperfection, shortcoming, or inadequacy in the quality, nature, and manner of performance required to be maintained by law or contract.',
      },
      {
        section: 'Section 10',
        title: 'Central Consumer Protection Authority (CCPA)',
        plainEnglish:
          'Empowered to recall unsafe goods, order refund of price paid, discontinue misleading advertisements, and impose penalties.',
      },
      {
        section: 'Section 34 & 35',
        title: 'District Consumer Disputes Redressal Commission',
        plainEnglish:
          'Jurisdiction for claims up to ₹50 Lakhs (amended from ₹1 Cr in 2021 rules). Consumers can file complaints where they reside, not just where the seller is located.',
      },
      {
        section: 'Section 84 & 85',
        title: 'Product Liability',
        plainEnglish:
          'A product manufacturer, service provider, or product seller is liable for compensation for any harm caused by a defective product or service.',
      },
    ],
    everydayExamples: [
      'A smartphone battery explodes within 6 months, causing property damage: Manufacturer and seller are liable under Product Liability.',
      'An airline charges non-refundable high cancellation fees without justification: Challengeable as an unfair contract under Section 2(46).',
      'An e-commerce seller delivers a counterfeit perfume and closes customer support: Covered under e-commerce rules with a mandatory grievance redressal timeline.',
    ],
    whoItAppliesTo:
      'Any individual or entity buying goods or availing services for consideration, including online/offline shoppers, tele-shopping, and multi-level marketing. Excludes purchases made strictly for commercial resale.',
    exceptionsLimitations: [
      'Statutory limitation period: Complaints must be filed within 2 years from the date on which the cause of action arose (Section 69).',
      'Does not apply to free government health services rendered without nominal or commercial fees.',
    ],
    officialSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/15256',
    lastAmended: '2021 Pecuniary Jurisdiction Rules',
  },
  {
    id: 'mva-1988',
    title: 'The Motor Vehicles Act, 1988 (Amended 2019)',
    shortTitle: 'Motor Vehicles Act, 1988 / 2019',
    actNumberYear: 'Act No. 59 of 1988 (amended by Act No. 32 of 2019)',
    ministryOrAuthority: 'Ministry of Road Transport and Highways (MoRTH)',
    purpose:
      'Regulates road transport vehicles, driver licensing, traffic infractions, electronic monitoring, and statutory compensation for road accident victims.',
    importantProvisions: [
      {
        section: 'Section 134A',
        title: 'Protection of Good Samaritans',
        plainEnglish:
          'A person who renders emergency medical or non-medical care or assistance to an accident victim shall not be liable for any civil or criminal action, and cannot be forced to disclose identity or become a witness.',
      },
      {
        section: 'Section 136A',
        title: 'Electronic Monitoring and Enforcement of Road Safety',
        plainEnglish:
          'Mandates state governments to deploy speed cameras, CCTV, and automated number plate recognition (ANPR) systems with digital challan audit trails.',
      },
      {
        section: 'Section 206',
        title: 'Power of Police Officer to Impound Documents',
        plainEnglish:
          'Police can impound driver licence only for specific grave offences (drunk driving, dangerous driving, jumping red lights), and must provide a temporary acknowledgment.',
      },
    ],
    everydayExamples: [
      'An automated camera captured the wrong registration number plate due to mud or font similarity: Driver can dispute before the Virtual Court with photographic proof of vehicle model.',
      'A passerby rushes an injured motorcyclist to the nearest private hospital: The hospital cannot refuse emergency stabilization or demand immediate police FIR first.',
    ],
    whoItAppliesTo:
      'All motorists, vehicle owners, public transit operators, driving schools, and pedestrians using public roads in India.',
    exceptionsLimitations: [
      'Challan compounding powers vary by state notifications (State Transport Departments can amend specific compounding fees).',
      'Digital documents on DigiLocker/mParivahan are statutorily recognized; however, revoked or suspended licences must still be surrendered.',
    ],
    officialSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1798',
    lastAmended: '2019 Amendment Act',
  },
  {
    id: 'it-act-2000',
    title: 'The Information Technology Act, 2000',
    shortTitle: 'Information Technology Act, 2000',
    actNumberYear: 'Act No. 21 of 2000',
    ministryOrAuthority: 'Ministry of Electronics and Information Technology (MeitY)',
    purpose:
      'Provides legal recognition for electronic transactions, e-signatures, data interchange, cyber security enforcement, and defines cyber offences and penalties.',
    importantProvisions: [
      {
        section: 'Section 43A',
        title: 'Compensation for Failure to Protect Sensitive Personal Data',
        plainEnglish:
          'Body corporates possessing or handling sensitive personal data that are negligent in maintaining reasonable security practices are liable to pay compensation to affected persons.',
      },
      {
        section: 'Section 66C',
        title: 'Punishment for Identity Theft',
        plainEnglish:
          'Dishonestly or fraudulently making use of the electronic signature, password, or any other unique identification feature of another person attracts imprisonment up to 3 years and a fine.',
      },
      {
        section: 'Section 66D',
        title: 'Punishment for Cheating by Personation Using Computer Resource',
        plainEnglish:
          'Cheating by impersonating someone using computer networks or phones carries imprisonment up to 3 years and a fine up to ₹1 Lakh.',
      },
      {
        section: 'Section 66E',
        title: 'Violation of Privacy',
        plainEnglish:
          'Intentionally capturing, publishing, or transmitting images of private body areas without consent is punishable with up to 3 years imprisonment.',
      },
    ],
    everydayExamples: [
      'A scammer poses as an electricity board official sending a payment APK via SMS: Covered under Sections 66C and 66D.',
      'An unauthorized person clones a SIM card to intercept bank OTPs: Cognizable cyber offence under Section 66C and BNS fraud sections.',
    ],
    whoItAppliesTo:
      'Any person who commits an offence or contravention inside India or outside India if the act involves a computer system or network located in India.',
    exceptionsLimitations: [
      'Section 66A was famously struck down as unconstitutional by the Supreme Court in Shreya Singhal v. Union of India (2015) for violating free speech.',
    ],
    officialSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1999',
    lastAmended: 'Intermediary Guidelines Rules 2021 & DPDP Act 2023 alignment',
  },
  {
    id: 'rera-2016',
    title: 'Real Estate (Regulation and Development) Act, 2016',
    shortTitle: 'RERA Act, 2016',
    actNumberYear: 'Act No. 16 of 2016',
    ministryOrAuthority: 'Ministry of Housing and Urban Affairs (MoHUA)',
    purpose:
      'Protects the interest of home buyers, establishes a state-level Real Estate Regulatory Authority, enforces transparency, and requires builders to keep 70% of buyer funds in escrow.',
    importantProvisions: [
      {
        section: 'Section 3 & 4',
        title: 'Mandatory Registration of Real Estate Projects',
        plainEnglish:
          'No promoter can advertise, market, book, or sell any plot or apartment without registering the project with the State RERA.',
      },
      {
        section: 'Section 4(2)(l)(D)',
        title: '70% Escrow Account Mandate',
        plainEnglish:
          'Promoter must deposit 70% of the amounts realized from allottees in a separate scheduled bank account to cover cost of construction and land.',
      },
      {
        section: 'Section 14(3)',
        title: '5-Year Structural Defect Guarantee',
        plainEnglish:
          'In case of any structural defect or workmanship flaw brought to notice within 5 years of possession, the promoter must rectify it within 30 days without charge.',
      },
      {
        section: 'Section 18',
        title: 'Return of Amount and Compensation for Delay',
        plainEnglish:
          'If the promoter fails to complete or give possession in accordance with the agreement terms, the allottee can demand full refund with interest or monthly interest for delayed period.',
      },
    ],
    everydayExamples: [
      'Builder promised delivery in December 2022, but project is halted in 2024: Allottee can file a petition before RERA for monthly interest at SBI MCLR + 2%.',
      'Builder sells based on super built-up area and alters carpet area without consent: RERA mandates sales only on standardized Carpet Area.',
    ],
    whoItAppliesTo:
      'Residential and commercial real estate projects where the area of land exceeds 500 square meters or the number of apartments exceeds 8.',
    exceptionsLimitations: [
      'Does not apply to renovation or redevelopment projects that do not involve marketing, advertising, or new allotment.',
      'State-specific RERA tribunals have distinct online filing portals and hearing schedules.',
    ],
    officialSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2158',
    lastAmended: '2016 (State rules updated periodically)',
  },
  {
    id: 'rti-2005',
    title: 'The Right to Information Act, 2005',
    shortTitle: 'RTI Act, 2005',
    actNumberYear: 'Act No. 22 of 2005',
    ministryOrAuthority: 'Department of Personnel and Training (DoPT)',
    purpose:
      'Empowers citizens to secure access to information under the control of public authorities in order to promote transparency and accountability in government functioning.',
    importantProvisions: [
      {
        section: 'Section 6',
        title: 'Request for Obtaining Information',
        plainEnglish:
          'Any citizen can submit an application in writing or electronically accompanied by a nominal fee of ₹10 (BPL applicants exempt). No need to state personal reasons.',
      },
      {
        section: 'Section 7(1)',
        title: 'Statutory 30-Day Response Window',
        plainEnglish:
          'Public Information Officer (PIO) must provide information or reject it within 30 days. If information concerns life or liberty of a person, it must be provided within 48 hours.',
      },
      {
        section: 'Section 19',
        title: 'Two-Tier Appeals Process',
        plainEnglish:
          'First Appeal to Senior Officer within 30 days of deadline expiry; Second Appeal to Central or State Information Commission within 90 days.',
      },
      {
        section: 'Section 20',
        title: 'Penalties on Defaulting Officers',
        plainEnglish:
          'Penalty of ₹250 each day (up to ₹25,000) can be levied on PIOs who refuse or delay information without reasonable cause.',
      },
    ],
    everydayExamples: [
      'A student requests certified answer key copies for a public competitive examination: Permitted under RTI.',
      'A resident seeks road construction tender specs and payment milestone audits for a pothole-ridden public highway: Fully disclosable public record.',
    ],
    whoItAppliesTo:
      'All Public Authorities, including Central and State governments, Union Territories, Municipal Corporations, Panchayats, and NGOs substantially financed by the government.',
    exceptionsLimitations: [
      'Section 8 lists exemptions (defense secrets, foreign relations, commercial confidence, cabinet papers before final decision).',
      'Private corporations and non-funded private entities are outside direct RTI, though regulators can obtain their records on request.',
    ],
    officialSourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2065',
    lastAmended: 'RTI (Amendment) Act, 2019',
  },
  {
    id: 'constitution-1950',
    title: 'The Constitution of India',
    shortTitle: 'Constitution of India',
    actNumberYear: 'Adopted 26 November 1949, in effect 26 January 1950',
    ministryOrAuthority: 'Constituent Assembly / Supreme Court of India',
    purpose:
      'The supreme law of India, establishing the framework that demarcates fundamental political code, structure, procedures, powers, and duties of government institutions and sets out fundamental rights and duties.',
    importantProvisions: [
      {
        section: 'Article 14',
        title: 'Equality before Law',
        plainEnglish:
          'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
      },
      {
        section: 'Article 19(1)(a)-(g)',
        title: 'Protection of Certain Rights regarding Freedom of Speech, etc.',
        plainEnglish:
          'Guarantees freedom of speech and expression, peaceful assembly without arms, forming associations, free movement, residence anywhere in India, and practicing any trade.',
      },
      {
        section: 'Article 21',
        title: 'Protection of Life and Personal Liberty',
        plainEnglish:
          'No person shall be deprived of his life or personal liberty except according to procedure established by law. Encompasses privacy, dignity, health, and fair trial.',
      },
      {
        section: 'Article 32 & 226',
        title: 'Right to Constitutional Remedies & Writ Jurisdiction',
        plainEnglish:
          'Citizens can approach the Supreme Court (Art 32) or High Courts (Art 226) directly to enforce Fundamental Rights via Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.',
      },
      {
        section: 'Article 51A',
        title: 'Fundamental Duties',
        plainEnglish:
          'Civic duties of every Indian citizen, including abiding by the Constitution, cherishing the freedom struggle, safeguarding public property, and developing scientific temper.',
      },
    ],
    everydayExamples: [
      'Arbitrary arrest by police without informing grounds of arrest: Direct violation of Article 22 and Article 21; enforceable through a Habeas Corpus writ petition.',
      'Public discrimination where a citizen is denied entry to a municipal park based on birthplace or caste: Violates Article 15.',
    ],
    whoItAppliesTo:
      'All persons within the territory of India (with certain rights reserved specifically for Indian citizens like Art 15, 16, 19, 29, 30).',
    exceptionsLimitations: [
      'Rights are subject to reasonable restrictions (public order, decency, morality, sovereignty and integrity of India).',
      'Fundamental rights apply predominantly against state entities (Article 12) rather than purely private contracts.',
    ],
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    lastAmended: '106th Constitutional Amendment Act (Women Reservation 2023)',
  },
];
