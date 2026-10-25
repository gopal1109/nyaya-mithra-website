import { LegalCategory } from '../types';

export const LEGAL_CATEGORIES: LegalCategory[] = [
  {
    id: 'consumer-rights',
    code: 'CATEGORY A',
    title: 'Consumer Rights & Unfair Trade Practices',
    shortTitle: 'Consumer Rights',
    icon: 'ShoppingBag',
    badge: 'High Frequency',
    description:
      'Protection against misleading advertisements, hidden restaurant charges, denied refunds, defective electronics, and deficiency in goods or services.',
    subtopics: [
      {
        name: 'Restaurant Billing & Service Charges',
        description:
          'CCPA 2022 guidelines clarify that service charge cannot be added by default. GST must be itemized accurately.',
        commonIssues: [
          'Automatic 10% service charge added to food bill without consent',
          'Charging higher than Maximum Retail Price (MRP) on water or packaged drinks',
          'Hidden packaging or AC surcharge not disclosed in the menu',
        ],
        governingAct: 'Consumer Protection Act, 2019 & CCPA Guidelines 2022',
      },
      {
        name: 'Hidden Charges & Misleading Pricing',
        description:
          'Drip pricing where charges are added at the final payment step or false discounts shown.',
        commonIssues: [
          'Convenience fees introduced on the payment screen without prior display',
          'Non-refundable booking fees hidden in fine print',
        ],
        governingAct: 'Consumer Protection (E-Commerce) Rules, 2020',
      },
      {
        name: 'Refund & Replacement Disputes',
        description:
          'Retailers or e-commerce platforms refusing statutory return windows for damaged or incorrect goods.',
        commonIssues: [
          'Delivered fake or broken product but refund request cancelled',
          'Seller forcing wallet credits instead of original payment mode return',
        ],
        governingAct: 'Section 2(47) & Section 35, CPA 2019',
      },
      {
        name: 'Defective Products & Warranty Breaches',
        description:
          'Manufacturer or authorized service center refusing repairs within standard warranty periods.',
        commonIssues: [
          'Electronics failing within 3 months, service center alleging customer misuse falsely',
          'Non-availability of spare parts during guaranteed warranty term',
        ],
        governingAct: 'Product Liability Provisions, CPA 2019 (Chapter VI)',
      },
    ],
    relevantLaws: [
      'Consumer Protection Act, 2019',
      'Consumer Protection (E-Commerce) Rules, 2020',
      'Legal Metrology (Packaged Commodities) Rules, 2011',
    ],
    officialChannels: [
      {
        name: 'National Consumer Helpline (NCH)',
        portalUrl: 'https://consumerhelpline.gov.in',
        helpline: '1915 or SMS to 8800001915',
      },
      {
        name: 'e-Daakhil Consumer Grievance Portal',
        portalUrl: 'https://edaakhil.nic.in',
      },
      {
        name: 'Central Consumer Protection Authority (CCPA)',
        portalUrl: 'https://consumeraffairs.nic.in',
      },
    ],
    quickAdvice: [
      'Always retain tax invoices, delivery receipts, photos/videos of unboxing.',
      'Call 1915 to register a National Consumer Helpline docket before filing in consumer court.',
      'Statutory limitation to file a Consumer Commission case is 2 years from date of cause of action.',
    ],
  },
  {
    id: 'land-property',
    code: 'CATEGORY B',
    title: 'Land, Property & Housing Rights',
    shortTitle: 'Land & Property',
    icon: 'Home',
    badge: 'State Regulated',
    description:
      'Guidance on boundary encroachments, land record verification, builder delays under RERA, tenant protections, and registration processes.',
    subtopics: [
      {
        name: 'Illegal Encroachment & Boundary Disputes',
        description:
          'Unauthorized construction or trespass by neighbors or third parties on private or ancestral property.',
        commonIssues: [
          'Neighbor building fence extending into your registered land parcel',
          'Squatters refusing to vacate inherited ancestral plot',
        ],
        governingAct: 'Specific Relief Act, 1963 & State Land Revenue Codes',
      },
      {
        name: 'Builder Delays & Real Estate Complaints (RERA)',
        description:
          'Flats not handed over within promised date or structural defects within 5 years of possession.',
        commonIssues: [
          'Promised possession in 2022, building still incomplete with no occupancy certificate (OC)',
          'Change in floor layout or amenities without 2/3rd allottee consent',
        ],
        governingAct: 'Real Estate (Regulation and Development) Act (RERA), 2016',
      },
      {
        name: 'Tenancy & Rental Security Deposits',
        description:
          'Arbitrary eviction, non-return of high security deposits, or excessive unannounced rent hikes.',
        commonIssues: [
          'Landlord deducting 100% security deposit for routine wear and tear',
          'Disconnecting electricity or water to forcefully evict tenant',
        ],
        governingAct: 'Model Tenancy Act & State Rent Control Acts',
      },
      {
        name: 'Property Document Fraud & Verification',
        description:
          'Safeguards when verifying Encumbrance Certificates (EC), Khatas, and Mutation records.',
        commonIssues: [
          'Forged power of attorney (PoA) used to sell mortgaged property',
          'Double registration of same survey number',
        ],
        governingAct: 'Registration Act, 1908 & Transfer of Property Act, 1882',
      },
    ],
    relevantLaws: [
      'Transfer of Property Act, 1882',
      'Real Estate (Regulation and Development) Act (RERA), 2016',
      'Registration Act, 1908',
      'State-specific Rent Control & Revenue Codes (e.g., Delhi, Maharashtra, Karnataka, Telangana)',
    ],
    officialChannels: [
      {
        name: 'State RERA Portals (e.g., MahaRERA, HRERA, UP-RERA)',
        portalUrl: 'https://mohua.gov.in/cms/rera.php',
      },
      {
        name: 'National Land Record Modernization (DILRMP)',
        portalUrl: 'https://dilrmp.gov.in',
      },
      {
        name: 'e-Courts Land Dispute Search',
        portalUrl: 'https://ecourts.gov.in',
      },
    ],
    quickAdvice: [
      'Land laws are state subjects; rules differ substantially between states.',
      'Check certified Encumbrance Certificate (EC) for minimum 30 years before purchasing any real estate.',
      'Landlords cannot shut off essential utility connections (water/power) even during rent disputes.',
    ],
  },
  {
    id: 'traffic-road',
    code: 'CATEGORY C',
    title: 'Traffic Regulations & Challan Disputes',
    shortTitle: 'Traffic & Road Laws',
    icon: 'Car',
    badge: 'Parivahan',
    description:
      'Understanding your rights during traffic stops, verifying electronic challan accuracy, virtual court hearings, and DL/RC guidelines.',
    subtopics: [
      {
        name: 'Incorrect or Camera-Glitch Challans',
        description:
          'Automated cameras misidentifying characters on vehicle registration plates or issuing duplicate challans.',
        commonIssues: [
          'Challan received from a city where you never drove your vehicle',
          'Red light violation captured when crossing on valid green arrow',
        ],
        governingAct: 'Motor Vehicles (Amendment) Act, 2019 (Section 136A)',
      },
      {
        name: 'Virtual Court vs Contesting Procedure',
        description:
          'How virtual traffic courts operate and how citizens can either plead guilty with nominal fine or contest before Magistrate.',
        commonIssues: [
          'Wanting to contest a wrongful speeding challan before a Magistrate',
          'Challan pending on portal even after successful online payment deduction',
        ],
        governingAct: 'Virtual Courts Portal (ecourts.gov.in / vcourts.gov.in)',
      },
      {
        name: 'Rights During Police Vehicle Inspections',
        description:
          'Digital locker recognition (DigiLocker / mParivahan), officer ranks permitted to issue compounding fines.',
        commonIssues: [
          'Traffic personnel seizing physical vehicle keys without lawful cause',
          'Refusal of police officer to accept original DigiLocker digital documents',
        ],
        governingAct: 'Rule 139 of Central Motor Vehicles Rules (CMVR)',
      },
      {
        name: 'Accident Reporting & Good Samaritan Rights',
        description:
          'Legal immunity for Good Samaritans assisting road accident victims without police harassment.',
        commonIssues: [
          'Hospital refusing immediate emergency trauma treatment without FIR',
          'Good Samaritan being pressured to become police witness against will',
        ],
        governingAct: 'Section 134A of Motor Vehicles (Amendment) Act, 2019',
      },
    ],
    relevantLaws: [
      'Motor Vehicles Act, 1988 (as amended in 2019)',
      'Central Motor Vehicles Rules, 1989',
      'Ministry of Road Transport (MoRTH) DigiLocker Circulars',
    ],
    officialChannels: [
      {
        name: 'Parivahan eChallan Official Portal',
        portalUrl: 'https://echallan.parivahan.gov.in',
      },
      {
        name: 'Virtual Courts Portal (Ministry of Law & Justice)',
        portalUrl: 'https://vcourts.gov.in',
      },
      {
        name: 'mParivahan Mobile & Web Services',
        portalUrl: 'https://parivahan.gov.in',
      },
    ],
    quickAdvice: [
      'Rule 139 of CMVR confirms that RC, DL, Insurance, and PUC in DigiLocker/mParivahan are at par with physical originals.',
      'Only officers of Sub-Inspector (SI) rank and above can compound spot fines in most states.',
      'Under Sec 134A, Good Samaritans are protected from civil or criminal liability and police cannot force them to reveal identity.',
    ],
  },
  {
    id: 'constitutional-rights',
    code: 'CATEGORY D',
    title: 'Constitutional & Fundamental Rights',
    shortTitle: 'Constitutional Rights',
    icon: 'Shield',
    badge: 'Supreme Law',
    description:
      'The foundational rights guaranteed to every citizen under Part III of the Constitution, including equality, free expression, life, privacy, and writ remedies.',
    subtopics: [
      {
        name: 'Right to Equality (Articles 14 to 18)',
        description:
          'Equality before the law, equal protection of laws, prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.',
        commonIssues: [
          'Arbitrary state action or discriminatory denial of public tender or access',
          'Denial of access to public shops, restaurants, or wells based on caste or origin',
        ],
        governingAct: 'Articles 14, 15, 16, 17, 18 of the Constitution of India',
      },
      {
        name: 'Right to Freedom & Speech (Articles 19 to 22)',
        description:
          'Freedom of speech, expression, peaceful assembly, movement across India, and practice of any lawful profession.',
        commonIssues: [
          'Unlawful detention beyond 24 hours without magistrate presentation (Art 22)',
          'Disproportionate censorship or arbitrary internet shutdowns',
        ],
        governingAct: 'Articles 19, 20, 21, 22 of the Constitution of India',
      },
      {
        name: 'Right to Life, Liberty & Privacy (Article 21)',
        description:
          'No person shall be deprived of life or personal liberty except according to procedure established by law. Encompasses privacy, dignity, and clean environment.',
        commonIssues: [
          'State surveillance or unauthorized phone tap without statutory judicial oversight (Puttaswamy case)',
          'Illegal demolition of shelter without prior notice and due process',
        ],
        governingAct: 'Article 21 & K.S. Puttaswamy v. Union of India (2017)',
      },
      {
        name: 'Constitutional Remedies & Writs (Articles 32 & 226)',
        description:
          'Empowers citizens to directly petition High Courts or the Supreme Court for enforcement of fundamental rights via Writs.',
        commonIssues: [
          'Habeas Corpus: To produce an unlawfully detained person',
          'Mandamus: To compel a public official to perform statutory duty',
          'Public Interest Litigation (PIL) for widespread public harm or pollution',
        ],
        governingAct: 'Articles 32 and 226 of the Constitution of India',
      },
    ],
    relevantLaws: [
      'Constitution of India, 1950',
      'Protection of Human Rights Act, 1993',
      'Digital Personal Data Protection Act, 2023',
    ],
    officialChannels: [
      {
        name: 'National Legal Services Authority (NALSA Free Legal Aid)',
        portalUrl: 'https://nalsa.gov.in',
        helpline: '15100 (Toll Free National Legal Aid Helpline)',
      },
      {
        name: 'Supreme Court of India e-Filing',
        portalUrl: 'https://efiling.sci.gov.in',
      },
      {
        name: 'National Human Rights Commission (NHRC)',
        portalUrl: 'https://nhrc.nic.in',
      },
    ],
    quickAdvice: [
      'Under Article 22(2), any arrested citizen must be produced before the nearest magistrate within 24 hours of arrest.',
      'Article 39A ensures free legal assistance to weaker sections through District Legal Services Authorities (DLSA).',
      'Fundamental rights apply predominantly against "the State" (governments, statutory authorities, municipalities under Art 12).',
    ],
  },
  {
    id: 'banking-finance',
    code: 'CATEGORY E',
    title: 'Banking, UPI & Financial Redressal',
    shortTitle: 'Banking & Finance',
    icon: 'CreditCard',
    badge: 'RBI Ombudsman',
    description:
      'Recourse against unauthorized card debits, failed UPI transfers, unfair loan recovery harassment, credit score discrepancies, and ATM errors.',
    subtopics: [
      {
        name: 'Unauthorized Electronic Transactions',
        description:
          'RBI circular on customer liability limits your financial liability if notified within 3 working days.',
        commonIssues: [
          'OTP bypassed or cloned SIM resulting in fraudulent bank debit',
          'Account debited but ATM machine did not dispense cash',
        ],
        governingAct: 'RBI Master Direction on Customer Protection (2017)',
      },
      {
        name: 'Failed UPI Payments & Auto-Reversals',
        description:
          'UPI amount deducted from your account but merchant received nothing; compensation for delayed reversals (T+1 days).',
        commonIssues: [
          'UPI money stuck for over 5 days with both banks blaming each other',
          'Turn Around Time (TAT) auto-compensation (₹100/day) not credited',
        ],
        governingAct: 'RBI Harmonisation of Turn Around Time (TAT) Framework',
      },
      {
        name: 'Loan Recovery Harassment & Privacy Violations',
        description:
          'Recovery agents threatening borrowers, calling family contacts, or contacting outside 8 AM – 7 PM.',
        commonIssues: [
          'Digital lending app accessing entire phone contacts and shaming borrower',
          'Recovery calls made at midnight or using vulgar language',
        ],
        governingAct: 'RBI Guidelines on Fair Practices Code & Digital Lending 2022',
      },
      {
        name: 'CIBIL / Credit Bureau Discrepancies',
        description:
          'Inaccurate default status on credit report causing loan rejection even though debt was settled.',
        commonIssues: [
          'Paid credit card bill in full 2 years ago, still reflecting as "written off" in CIBIL',
          'Identity mismatch showing another individual loan on your report',
        ],
        governingAct: 'Credit Information Companies (Regulation) Act, 2005',
      },
    ],
    relevantLaws: [
      'Banking Regulation Act, 1949',
      'Reserve Bank of India (RBI) Integrated Ombudsman Scheme, 2021',
      'Payment and Settlement Systems Act, 2007',
    ],
    officialChannels: [
      {
        name: 'RBI Complaint Management System (CMS)',
        portalUrl: 'https://cms.rbi.org.in',
        helpline: '14448 (RBI Centralised Contact Centre)',
      },
      {
        name: 'National Payments Corporation of India (NPCI Dispute)',
        portalUrl: 'https://npci.org.in/what-we-do/upi/dispute-redressal-mechanism',
      },
    ],
    quickAdvice: [
      'Report any unauthorized transaction to your bank in writing or email within 3 working days for zero customer liability.',
      'Banks must resolve complaints within 30 days; if unresolved, escalate directly to the RBI Ombudsman.',
      'Under RBI rules, recovery agents cannot call before 8 AM or after 7 PM.',
    ],
  },
  {
    id: 'cyber-fraud',
    code: 'CATEGORY F',
    title: 'Online Fraud, Phishing & Cyber Safety',
    shortTitle: 'Online Fraud & Cyber',
    icon: 'Lock',
    badge: 'Emergency 1930',
    description:
      'Urgent procedures for reporting cyber scams, task-based investment frauds, social media impersonation, sextortion, and dark web leak guidance.',
    subtopics: [
      {
        name: 'Immediate Financial Cybercrime (1930 Golden Hour)',
        description:
          'Citizen Financial Cyber Fraud Reporting System enables rapid inter-bank freeze of stolen funds.',
        commonIssues: [
          'Transferred money to fake work-from-home Telegram scam or trading app',
          'Electricity bill cancellation SMS with malicious APK download link',
        ],
        governingAct: 'Information Technology Act, 2000 (Section 66C & 66D)',
      },
      {
        name: 'Social Media Impersonation & Identity Theft',
        description:
          'Fake social media profiles created using your photos asking friends for urgent money.',
        commonIssues: [
          'Cloned Instagram or Facebook profile messaging family for medical funds',
          'PAN and Aadhaar misuse to take micro-loans on unverified apps',
        ],
        governingAct: 'Section 66C of IT Act & Section 318(4) Bharatiya Nyaya Sanhita (BNS)',
      },
      {
        name: 'Sextortion & Cyber Blackmail',
        description:
          'Video call recording morphing followed by extortion calls impersonating police officers.',
        commonIssues: [
          'Received threatening call claiming to be Delhi/Mumbai Police Cyber Cell demanding money',
          'Morphed video circulated on WhatsApp to coerce money transfers',
        ],
        governingAct: 'Section 66E, 67, 67A IT Act & Extortion under BNS',
      },
    ],
    relevantLaws: [
      'Information Technology Act, 2000 (as amended)',
      'Bharatiya Nyaya Sanhita (BNS), 2023 (Cyber Fraud & Impersonation)',
      'Indian Cyber Crime Coordination Centre (I4C) Framework',
    ],
    officialChannels: [
      {
        name: 'National Cyber Crime Reporting Portal (MHA)',
        portalUrl: 'https://cybercrime.gov.in',
        helpline: '1930 (National Cyber Fraud Emergency Helpline)',
      },
      {
        name: 'Sanchar Saathi (Block & Track Stolen Mobiles)',
        portalUrl: 'https://sancharsaathi.gov.in',
      },
    ],
    quickAdvice: [
      'Call 1930 within the first 2 hours of money transfer to initiate bank account freeze on the fraudster end.',
      'Never download APK files sent via WhatsApp or Telegram.',
      'Real police or CBI officers never conduct "digital arrests" or ask you to transfer funds to verify innocence over Skype/WhatsApp.',
    ],
  },
  {
    id: 'public-civic',
    code: 'CATEGORY G',
    title: 'Public Services, Municipal & Civic Grievances',
    shortTitle: 'Civic & Public Services',
    icon: 'Building2',
    badge: 'CPGRAMS / RTI',
    description:
      'Holding municipal corporations and government utilities accountable for water shortages, inflated electricity bills, potholes, garbage, and RTI requests.',
    subtopics: [
      {
        name: 'Electricity & Water Utility Grievances',
        description:
          'Surge billing, faulty smart meters, erratic voltage damaging appliances, or untreated drinking water.',
        commonIssues: [
          'Electricity bill jumped from ₹800 to ₹15,000 without explanation',
          'No piped water supply for 2 weeks despite continuous municipal water tax payment',
        ],
        governingAct: 'Electricity Act, 2003 (Consumer Grievance Redressal Forum - CGRF)',
      },
      {
        name: 'Potholes, Road Safety & Open Drains',
        description:
          'Citizen rights regarding motorable roads, municipal negligence, and claiming compensation for civic accidents.',
        commonIssues: [
          'Severe road cave-in or uncovered manhole causing vehicle damage and injury',
          'Garbage dump accumulated on public walkway causing health hazard',
        ],
        governingAct: 'State Municipal Corporation Acts & Public Nuisance under BNS',
      },
      {
        name: 'Right to Information (RTI Act, 2005)',
        description:
          'How ordinary citizens can seek official records, road contractor tender audits, or ration distribution data.',
        commonIssues: [
          'Public Information Officer (PIO) failed to reply within mandatory 30 days',
          'PIO demanding unreasonable photocopy fees or claiming unwarranted exemption',
        ],
        governingAct: 'Right to Information Act, 2005 (Sections 6, 7 & 19)',
      },
      {
        name: 'Central & State Public Grievance Portals (CPGRAMS)',
        description:
          'Escalating delayed government certificates, passport issues, EPFO pensions, or railway services.',
        commonIssues: [
          'Passport police verification delayed due to unofficial bribe solicitation',
          'EPF claim rejected repeatedly with vague remarks',
        ],
        governingAct: 'Citizen Charter Framework & CPGRAMS Portal',
      },
    ],
    relevantLaws: [
      'Right to Information Act, 2005',
      'Electricity Act, 2003',
      'State Right to Public Services Legislation (Guarantee of Services Acts)',
    ],
    officialChannels: [
      {
        name: 'CPGRAMS (Central Public Grievance Portal)',
        portalUrl: 'https://pgportal.gov.in',
      },
      {
        name: 'RTI Online Portal (Govt of India)',
        portalUrl: 'https://rtionline.gov.in',
      },
      {
        name: 'RailMadad (Indian Railways Grievance)',
        portalUrl: 'https://railmadad.indianrailways.gov.in',
        helpline: '139',
      },
    ],
    quickAdvice: [
      'Under the RTI Act 2005, a Public Information Officer must provide answers within 30 days (or 48 hours if related to life & liberty).',
      'Electricity complaints can be taken to your state Electricity Ombudsman if the company CGRF does not respond within 60 days.',
      'File complaints on CPGRAMS for central ministries, postal services, railways, and nationalized banks.',
    ],
  },
  {
    id: 'employment-education',
    code: 'CATEGORY H',
    title: 'Employment & Educational Rights',
    shortTitle: 'Work & Education',
    icon: 'Briefcase',
    badge: 'Labour & UGC',
    description:
      'Remedies for unpaid salaries, arbitrary termination, retention of educational certificates, coaching institute fee refunds, and scholarship delays.',
    subtopics: [
      {
        name: 'Unpaid Wages & Withholding Experience Letters',
        description:
          'Employers refusing full & final (F&F) settlement or holding back educational certificates.',
        commonIssues: [
          'Employer withholding 3 months of salary after serving full notice period',
          'Company retaining original educational degrees as employment security',
        ],
        governingAct: 'Code on Wages / Payment of Wages Act & Industrial Disputes Act',
      },
      {
        name: 'Coaching Institute & College Fee Refunds',
        description:
          'UGC and CCPA guidelines strictly mandate pro-rata fee refunds if a student withdraws admission.',
        commonIssues: [
          'Coaching institute refusing refund after student leaves within first 2 weeks',
          'Private university refusing to return original documents on course cancellation',
        ],
        governingAct: 'UGC Guidelines on Refund of Fees & CCPA Guidelines on Coaching Centers 2024',
      },
      {
        name: 'Workplace Safety & Harassment (PoSH Act)',
        description:
          'Mandatory Internal Complaints Committee (ICC) in every establishment with 10+ employees.',
        commonIssues: [
          'Retaliatory action against employee reporting inappropriate verbal or physical conduct',
          'Employer failing to constitute an active Internal Complaints Committee',
        ],
        governingAct: 'Sexual Harassment of Women at Workplace (PoSH) Act, 2013',
      },
    ],
    relevantLaws: [
      'Code on Wages, 2019 / Payment of Wages Act, 1936',
      'UGC Fee Refund Guidelines, 2023',
      'Industrial Disputes Act, 1947',
      'PoSH Act, 2013',
    ],
    officialChannels: [
      {
        name: 'Samadhan Portal (Ministry of Labour & Employment)',
        portalUrl: 'https://samadhan.labour.gov.in',
      },
      {
        name: 'UGC e-Samadhan (Higher Education Grievances)',
        portalUrl: 'https://samadhan.ugc.ac.in',
      },
      {
        name: 'National Scholarship Portal (Grievances)',
        portalUrl: 'https://scholarships.gov.in',
      },
    ],
    quickAdvice: [
      'No employer has legal authority to retain a candidate’s original school or degree certificates.',
      'UGC guidelines mandate 100% refund (with max ₹1,000 processing fee) if admission is cancelled before the formal cutoff date.',
      'Formal legal notices for unpaid salary can be submitted to the District Labour Commissioner.',
    ],
  },
  {
    id: 'vulnerable-citizens',
    code: 'CATEGORY I',
    title: 'Women, Children & Senior Citizens Rights',
    shortTitle: 'Vulnerable Groups',
    icon: 'HeartHandshake',
    badge: 'Special Protections',
    description:
      'Affirmative legal protections against domestic violence, maintenance rights for elderly parents, child safety, and emergency interventions.',
    subtopics: [
      {
        name: 'Protection from Domestic Abuse',
        description:
          'Right to reside in shared household, protection orders, and monetary relief under DV Act.',
        commonIssues: [
          'Physical, verbal, or economic abuse by domestic partners or in-laws',
          'Woman thrown out of matrimonial residence without shelter or maintenance',
        ],
        governingAct: 'Protection of Women from Domestic Violence Act (PWDVA), 2005',
      },
      {
        name: 'Elderly Parents Maintenance & Property Reversal',
        description:
          'Tribunals can order children/heirs to pay monthly maintenance or cancel property transfers if parents are neglected.',
        commonIssues: [
          'Son/daughter getting property transferred as gift deed and subsequently abandoning elderly parents',
          'Senior citizen deprived of medical care and basic sustenance by children',
        ],
        governingAct: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
      },
      {
        name: 'Child Rights & Protection (POCSO / Childline)',
        description:
          'Mandatory reporting of sexual offences against children, free compulsory education, and rehabilitation.',
        commonIssues: [
          'Child labor in hazardous manufacturing or commercial tea stalls',
          'Harassment or corporal punishment in schooling environments',
        ],
        governingAct: 'POCSO Act, 2012 & Right to Education (RTE) Act, 2009',
      },
    ],
    relevantLaws: [
      'Protection of Women from Domestic Violence Act, 2005',
      'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
      'POCSO Act, 2012',
      'Rights of Persons with Disabilities Act, 2016',
    ],
    officialChannels: [
      {
        name: 'National Commission for Women (NCW 24/7 Helpline)',
        portalUrl: 'https://ncw.nic.in',
        helpline: '7827170170 or 1091 (Women in Distress)',
      },
      {
        name: 'Childline India (Ministry of Women & Child Development)',
        portalUrl: 'https://childlineindia.org',
        helpline: '1098 (24x7 Emergency Child Helpline)',
      },
      {
        name: 'Elderline (National Helpline for Senior Citizens)',
        portalUrl: 'https://elderline.dosje.gov.in',
        helpline: '14567 (Toll-Free Senior Citizen Support)',
      },
    ],
    quickAdvice: [
      'Under the Senior Citizens Act 2007, an elderly parent can file for maintenance before the Sub-Divisional Magistrate (SDM) without hiring a lawyer.',
      'Under Section 12 of the DV Act, a Magistrate must fix the first hearing within 3 days of complaint filing.',
      'Dial 112 for immediate all-India police, ambulance, or fire emergency assistance.',
    ],
  },
];
