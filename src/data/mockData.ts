import type { Responsibility, ModuleItem, DepartmentInfo, PolicyItem, VerifiedQA, User, Employee, Team, Candidate, KnowledgeArticle, KBTool } from '../types';

export const initialTeamMembers: User[] = [
  { id: 'usr-1', name: 'Devon Vance', email: 'devon@2x1.org', role: 'Head of Engineering', department: 'Engineering' },
  { id: 'usr-2', name: 'Sarah Chen', email: 'sarah.c@2x1.org', role: 'Chief Compliance Officer', department: 'Legal' },
  { id: 'usr-3', name: 'Marcus Brody', email: 'marcus@2x1.org', role: 'VP People Operations', department: 'Human Resources' },
  { id: 'usr-4', name: 'Elena Rostova', email: 'elena@2x1.org', role: 'Director of Finance', department: 'Finance' },
  { id: 'usr-5', name: 'Liam Patel', email: 'liam@2x1.org', role: 'Principal Architect', department: 'Engineering' },
  { id: 'usr-6', name: 'Amara Okafor', email: 'amara@2x1.org', role: 'Head of Operations', department: 'Administration' },
];

export const initialResponsibilities: Responsibility[] = [
  { id: 'resp-1', title: 'SOC 2 Type II Annual Vendor Audit', department: 'Legal', urgency: 'high', ownerId: null, ownerName: null, description: 'Collect, review, and certify vendor compliance packets across Tier 1 SaaS suppliers.' },
  { id: 'resp-2', title: 'Customer Data Encryption Key Rotation', department: 'Engineering', urgency: 'high', ownerId: null, ownerName: null, description: 'Periodic envelope KMS key rotation policy enforcement across production DB clusters.' },
  { id: 'resp-3', title: 'Employee Offboarding Hardware & Access Revocation', department: 'Human Resources', urgency: 'high', ownerId: null, ownerName: null, description: 'SLA-governed same-day zero-trust token revocation and hardware recovery protocol.' },
  { id: 'resp-4', title: 'Quarterly Financial Tax & Statutory Filing', department: 'Finance', urgency: 'high', ownerId: null, ownerName: null, description: 'Preparation and internal audit sign-off for regional payroll and tax submissions.' },
  { id: 'resp-5', title: 'Incident Command On-Call Escalation Matrix', department: 'Engineering', urgency: 'high', ownerId: null, ownerName: null, description: 'Designation of tier 1-3 incident commanders and paging fallback trees.' },
  { id: 'resp-6', title: 'GDPR Data Subject Access Request (DSAR) SLA Handler', department: 'Legal', urgency: 'high', ownerId: null, ownerName: null, description: 'Execution and verification of customer personal data erasure requests within 30 days.' },
  { id: 'resp-7', title: 'Workplace Physical Access Badge Logs Audit', department: 'Administration', urgency: 'medium', ownerId: null, ownerName: null, description: 'Monthly physical security audit of office badge swiping records and visitor registrations.' },
  { id: 'resp-8', title: 'Production Database Backup Restoration Verification', department: 'Engineering', urgency: 'high', ownerId: null, ownerName: null, description: 'Automated recovery drills and data integrity verification for quarterly DR compliance.' },
  { id: 'resp-9', title: 'Whistleblower Policy Hotline Oversight', department: 'Legal', urgency: 'medium', ownerId: null, ownerName: null, description: 'Independent review channel for compliance disclosures and ethics investigations.' },
  { id: 'resp-10', title: 'Health & Safety First-Aid Officer Appointment', department: 'Administration', urgency: 'low', ownerId: null, ownerName: null, description: 'Designated certified safety officer for on-premise emergency triage protocol.' },
  { id: 'resp-11', title: 'Quarterly Cloud Infrastructure Cost Allocation', department: 'Finance', urgency: 'medium', ownerId: null, ownerName: null, description: 'Attributing shared AWS/GCP compute & storage consumption across business units.' },
  { id: 'resp-12', title: 'Security Vulnerability Bug Bounty Triage', department: 'Engineering', urgency: 'high', ownerId: null, ownerName: null, description: 'Response SLA, reproduction, and remediation bounty rewards on HackerOne.' },
  { id: 'resp-13', title: 'New Hire Background Screening Verification', department: 'Human Resources', urgency: 'medium', ownerId: null, ownerName: null, description: 'Verification of background check completion prior to production access provisioning.' },
  { id: 'resp-14', title: 'Business Continuity Plan (BCP) Annual Simulation', department: 'Operations', urgency: 'high', ownerId: null, ownerName: null, description: 'Orchestrating tabletop crisis drill simulation with C-suite and department leads.' },
  { id: 'resp-15', title: 'Enterprise SSO & SAML Identity Federation', department: 'Engineering', urgency: 'medium', ownerId: null, ownerName: null, description: 'Centralized Okta / Entra ID SCIM provisioning and conditional access rule sets.' },
  { id: 'resp-16', title: 'Vendor Expense Approval Threshold Governance', department: 'Finance', urgency: 'medium', ownerId: null, ownerName: null, description: 'Enforcing multi-tier approval workflows for software contracts exceeding $25k.' },
  { id: 'resp-17', title: 'Equal Employment Opportunity (EEO) Compliance Reporting', department: 'Human Resources', urgency: 'low', ownerId: null, ownerName: null, description: 'Compiling demographic workforce metrics for federal and state labor standards.' },
  { id: 'resp-18', title: 'Code Repository Branch Protection & Merge Controls', department: 'Engineering', urgency: 'high', ownerId: null, ownerName: null, description: 'Maintaining 2-approver requirements, mandatory CI passing, and signed commits.' },
  { id: 'resp-19', title: 'Internal Knowledge Base Review & Deprecation Cycle', department: 'Administration', urgency: 'low', ownerId: null, ownerName: null, description: 'Quarterly review to archive stale documentation and verify factual accuracy.' },
  { id: 'resp-20', title: 'Customer SLA Uptime Penalty Calculation Review', department: 'Finance', urgency: 'medium', ownerId: null, ownerName: null, description: 'Validating credits issued to enterprise customers during service degradations.' },
  { id: 'resp-21', title: 'Intellectual Property & Invention Assignment Audits', department: 'Legal', urgency: 'medium', ownerId: null, ownerName: null, description: 'Ensuring all contractor and employee IP assignments are executed and archived.' },
  { id: 'resp-22', title: 'Anti-Harassment Training Attendance Enforcement', department: 'Human Resources', urgency: 'high', ownerId: null, ownerName: null, description: 'Tracking 100% completion rate for mandatory annual compliance training.' },
];

export const initialModules: ModuleItem[] = [
  { id: 'mod-1', title: 'Information Security Essentials 2026', department: 'Engineering', duration: '25 mins', hasLesson: false, tags: ['Security', 'Mandatory'] },
  { id: 'mod-2', title: 'Anti-Money Laundering & Bribery Prevention', department: 'Legal', duration: '30 mins', hasLesson: false, tags: ['Compliance', 'Finance'] },
  { id: 'mod-3', title: 'Zero Trust Network Architecture & VPN Usage', department: 'Engineering', duration: '20 mins', hasLesson: false, tags: ['Infrastructure'] },
  { id: 'mod-4', title: 'Preventing Workplace Harassment & Hostility', department: 'Human Resources', duration: '40 mins', hasLesson: false, tags: ['HR', 'Mandatory'] },
  { id: 'mod-5', title: 'Handling Sensitive PII & GDPR Protocols', department: 'Legal', duration: '35 mins', hasLesson: false, tags: ['Privacy', 'Legal'] },
  { id: 'mod-6', title: 'Production Deployment & Canary Release Playbook', department: 'Engineering', duration: '15 mins', hasLesson: false, tags: ['DevOps'] },
  { id: 'mod-7', title: 'Travel & Expense Reimbursement Guidelines', department: 'Finance', duration: '15 mins', hasLesson: false, tags: ['Policy'] },
  { id: 'mod-8', title: 'Disaster Recovery: High-Severity Outage Response', department: 'Operations', duration: '30 mins', hasLesson: false, tags: ['Reliability'] },
  { id: 'mod-9', title: 'Customer Data Retention & Secure Shredding', department: 'Engineering', duration: '20 mins', hasLesson: false, tags: ['Data', 'Compliance'] },
  { id: 'mod-10', title: 'Effective Code Reviews & Architectural Standards', department: 'Engineering', duration: '25 mins', hasLesson: false, tags: ['Best Practices'] },
  { id: 'mod-11', title: 'Remote Work Ergonomics & Digital Wellness', department: 'Administration', duration: '15 mins', hasLesson: false, tags: ['Wellness'] },
  { id: 'mod-12', title: 'Insider Threat Awareness & Social Engineering Defense', department: 'Engineering', duration: '20 mins', hasLesson: false, tags: ['Cybersecurity'] },
  { id: 'mod-13', title: 'Intellectual Property Protection & Open-Source Usage', department: 'Legal', duration: '25 mins', hasLesson: false, tags: ['OpenSource', 'Legal'] },
  { id: 'mod-14', title: 'Managing Vendor Risk & Third-Party Integrations', department: 'Operations', duration: '30 mins', hasLesson: false, tags: ['Vendors'] },
  { id: 'mod-15', title: 'Annual Performance Review & OKR Calibration', department: 'Human Resources', duration: '20 mins', hasLesson: false, tags: ['Leadership'] },
  { id: 'mod-16', title: 'Corporate Credit Card & Spending Governance', department: 'Finance', duration: '15 mins', hasLesson: false, tags: ['Accounting'] },
  { id: 'mod-17', title: 'Customer Escalation & Service Recovery Playbook', department: 'Operations', duration: '25 mins', hasLesson: false, tags: ['Customer Success'] },
  { id: 'mod-18', title: 'Building Accessible UIs (WCAG 2.2 Standards)', department: 'Engineering', duration: '30 mins', hasLesson: false, tags: ['Accessibility', 'Frontend'] },
  { id: 'mod-19', title: 'Clean Desk & Physical Facility Security Policy', department: 'Administration', duration: '10 mins', hasLesson: false, tags: ['Facility'] },
  { id: 'mod-20', title: 'Emergency Evacuation & First Responder Protocol', department: 'Administration', duration: '15 mins', hasLesson: false, tags: ['Safety'] },
  { id: 'mod-21', title: 'Responsible AI & Data Ethics in Production', department: 'Engineering', duration: '25 mins', hasLesson: false, tags: ['AI', 'Ethics'] },
  { id: 'mod-22', title: 'Brand Identity & Media Spokesperson Policy', department: 'Marketing', duration: '15 mins', hasLesson: false, tags: ['Communications'] },
];

export const initialDepartments: DepartmentInfo[] = [
  { name: 'Administration', headcount: 0, learningAssigned: false, completionRate: 0, color: '#38bdf8' },
  { name: 'Finance', headcount: 0, learningAssigned: false, completionRate: 0, color: '#f59e0b' },
  { name: 'Human Resources', headcount: 0, learningAssigned: false, completionRate: 0, color: '#ec4899' },
  { name: 'Engineering', headcount: 0, learningAssigned: false, completionRate: 0, color: '#6366f1' },
  { name: 'Legal & Compliance', headcount: 0, learningAssigned: false, completionRate: 0, color: '#10b981' },
  { name: 'Operations', headcount: 0, learningAssigned: false, completionRate: 0, color: '#8b5cf6' },
];

export const initialPolicies: PolicyItem[] = [
  { id: 'pol-1', title: 'Acceptable Use & Information Security Policy', category: 'Security', status: 'review', isMandatory: true, version: 'v3.2', lastUpdated: '3 days ago' },
  { id: 'pol-2', title: 'Code of Business Conduct & Ethics', category: 'Governance', status: 'review', isMandatory: true, version: 'v2.1', lastUpdated: '1 week ago' },
  { id: 'pol-3', title: 'Global Remote Work & Home Office Policy', category: 'HR', status: 'review', isMandatory: false, version: 'v1.4', lastUpdated: '2 weeks ago' },
  { id: 'pol-4', title: 'Whistleblower & Non-Retaliation Standard', category: 'Compliance', status: 'review', isMandatory: true, version: 'v2.0', lastUpdated: '1 month ago' },
];

export const sampleQA: VerifiedQA[] = [
  {
    question: 'Who owns the customer encryption key rotation policy?',
    answer: 'The Principal Architect in Engineering leads key rotation, with mandatory co-approval from the Chief Compliance Officer under Section 4.2 of the Cryptographic Standard.',
    sourcePolicy: 'Infosec Standard SEC-204 § 4.2',
    verifiedBy: 'Devon Vance (Head of Eng)',
    confidence: 99,
    category: 'Engineering / Security'
  },
  {
    question: 'What is the required SLA for GDPR Right-to-be-Forgotten requests?',
    answer: 'All validated DSAR and erasure requests must be executed across databases and backups within 30 calendar days, with confirmation sent to legal@2x1.org.',
    sourcePolicy: 'Global Privacy Framework POL-801 § 7',
    verifiedBy: 'Sarah Chen (Chief Compliance Officer)',
    confidence: 98,
    category: 'Legal & Privacy'
  },
  {
    question: 'How do I submit an expense exceeding $5,000?',
    answer: 'Any operational or software spend over $5,000 requires pre-approval from the Department VP followed by automated routing to the Director of Finance in Brex.',
    sourcePolicy: 'Procurement & Spend Policy FIN-102 § 3.1',
    verifiedBy: 'Elena Rostova (Director of Finance)',
    confidence: 96,
    category: 'Finance'
  },
  {
    question: 'What is our on-call incident response time during non-business hours?',
    answer: 'For P0/P1 system incidents, the designated secondary on-call engineer must acknowledge PagerDuty alerts within 15 minutes, and spin up an incident bridge within 20 minutes.',
    sourcePolicy: 'Incident Management Playbook ENG-011 § 2',
    verifiedBy: 'Devon Vance (Head of Eng)',
    confidence: 100,
    category: 'Operations'
  }
];

// --------------- WORKFORCE DATA ---------------

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1', name: 'Devon Vance', email: 'devon@2x1.org',
    role: 'Head of Engineering', department: 'Engineering',
    status: 'active', type: 'full-time',
    startDate: '2023-01-10', location: 'San Francisco, CA',
    manager: undefined, trainingCompletion: 82, avatarColor: '#6366f1'
  },
  {
    id: 'emp-2', name: 'Sarah Chen', email: 'sarah.c@2x1.org',
    role: 'Chief Compliance Officer', department: 'Legal & Compliance',
    status: 'active', type: 'full-time',
    startDate: '2022-08-01', location: 'New York, NY',
    manager: undefined, trainingCompletion: 100, avatarColor: '#10b981'
  },
  {
    id: 'emp-3', name: 'Marcus Brody', email: 'marcus@2x1.org',
    role: 'VP People Operations', department: 'Human Resources',
    status: 'active', type: 'full-time',
    startDate: '2022-11-15', location: 'Austin, TX',
    manager: undefined, trainingCompletion: 95, avatarColor: '#ec4899'
  },
  {
    id: 'emp-4', name: 'Elena Rostova', email: 'elena@2x1.org',
    role: 'Director of Finance', department: 'Finance',
    status: 'active', type: 'full-time',
    startDate: '2023-03-20', location: 'Chicago, IL',
    manager: undefined, trainingCompletion: 77, avatarColor: '#f59e0b'
  },
  {
    id: 'emp-5', name: 'Liam Patel', email: 'liam@2x1.org',
    role: 'Principal Architect', department: 'Engineering',
    status: 'active', type: 'full-time',
    startDate: '2023-05-08', location: 'San Francisco, CA',
    manager: 'Devon Vance', trainingCompletion: 68, avatarColor: '#38bdf8'
  },
  {
    id: 'emp-6', name: 'Amara Okafor', email: 'amara@2x1.org',
    role: 'Head of Operations', department: 'Administration',
    status: 'active', type: 'full-time',
    startDate: '2023-07-17', location: 'Atlanta, GA',
    manager: undefined, trainingCompletion: 90, avatarColor: '#a78bfa'
  },
  {
    id: 'emp-7', name: 'Jordan Lee', email: 'jordan@2x1.org',
    role: 'Senior Backend Engineer', department: 'Engineering',
    status: 'active', type: 'full-time',
    startDate: '2023-09-01', location: 'Remote — US',
    manager: 'Devon Vance', trainingCompletion: 55, avatarColor: '#34d399'
  },
  {
    id: 'emp-8', name: 'Priya Sharma', email: 'priya@2x1.org',
    role: 'Compliance Analyst', department: 'Legal & Compliance',
    status: 'active', type: 'full-time',
    startDate: '2024-01-15', location: 'New York, NY',
    manager: 'Sarah Chen', trainingCompletion: 100, avatarColor: '#fb923c'
  },
  {
    id: 'emp-9', name: 'Ethan Cruz', email: 'ethan@2x1.org',
    role: 'Financial Analyst', department: 'Finance',
    status: 'invited', type: 'full-time',
    startDate: '2024-06-10', location: 'Remote — EU',
    manager: 'Elena Rostova', trainingCompletion: 0, avatarColor: '#e879f9'
  },
  {
    id: 'emp-10', name: 'Isabelle Martin', email: 'isabelle@2x1.org',
    role: 'UX/Product Designer', department: 'Engineering',
    status: 'active', type: 'full-time',
    startDate: '2024-02-20', location: 'Paris, FR (Remote)',
    manager: 'Devon Vance', trainingCompletion: 72, avatarColor: '#fbbf24'
  },
  {
    id: 'emp-11', name: 'Tariq Noor', email: 'tariq@2x1.org',
    role: 'Site Reliability Engineer', department: 'Engineering',
    status: 'on-leave', type: 'full-time',
    startDate: '2023-11-01', location: 'London, UK (Remote)',
    manager: 'Devon Vance', trainingCompletion: 61, avatarColor: '#4ade80'
  },
  {
    id: 'emp-12', name: 'Fatima Al-Hassan', email: 'fatima@2x1.org',
    role: 'HR Business Partner', department: 'Human Resources',
    status: 'active', type: 'part-time',
    startDate: '2024-03-01', location: 'Dubai, AE (Remote)',
    manager: 'Marcus Brody', trainingCompletion: 88, avatarColor: '#60a5fa'
  },
  {
    id: 'emp-13', name: 'Nate Thornton', email: 'nate@2x1.org',
    role: 'Security Engineer', department: 'Engineering',
    status: 'active', type: 'contractor',
    startDate: '2024-04-15', location: 'Remote — US',
    manager: 'Devon Vance', trainingCompletion: 45, avatarColor: '#f87171'
  },
  {
    id: 'emp-14', name: 'Mei-Ling Zhou', email: 'mei@2x1.org',
    role: 'Data Platform Engineer', department: 'Engineering',
    status: 'active', type: 'full-time',
    startDate: '2024-05-06', location: 'Singapore, SG (Remote)',
    manager: 'Liam Patel', trainingCompletion: 33, avatarColor: '#818cf8'
  },
  {
    id: 'emp-15', name: 'Carlos Rivera', email: 'carlos@2x1.org',
    role: 'Customer Success Manager', department: 'Operations',
    status: 'invited', type: 'full-time',
    startDate: '2024-07-01', location: 'Mexico City, MX (Remote)',
    manager: 'Amara Okafor', trainingCompletion: 0, avatarColor: '#fdba74'
  },
];

export const initialTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Platform Engineering',
    department: 'Engineering',
    leadId: 'emp-5',
    leadName: 'Liam Patel',
    memberCount: 5,
    color: '#6366f1',
    description: 'Core infrastructure, cloud architecture, database systems, and platform reliability.'
  },
  {
    id: 'team-2',
    name: 'Security & Compliance',
    department: 'Legal & Compliance',
    leadId: 'emp-2',
    leadName: 'Sarah Chen',
    memberCount: 3,
    color: '#10b981',
    description: 'SOC 2, ISO 27001, GDPR governance, internal audit, and penetration testing oversight.'
  },
  {
    id: 'team-3',
    name: 'People Ops & Talent',
    department: 'Human Resources',
    leadId: 'emp-3',
    leadName: 'Marcus Brody',
    memberCount: 2,
    color: '#ec4899',
    description: 'Recruiting, onboarding experience, HR policy governance, and benefits administration.'
  },
  {
    id: 'team-4',
    name: 'Finance & Accounting',
    department: 'Finance',
    leadId: 'emp-4',
    leadName: 'Elena Rostova',
    memberCount: 2,
    color: '#f59e0b',
    description: 'Financial reporting, budget allocation, vendor contracts, and statutory compliance.'
  },
  {
    id: 'team-5',
    name: 'Product & Design',
    department: 'Engineering',
    leadId: 'emp-1',
    leadName: 'Devon Vance',
    memberCount: 2,
    color: '#38bdf8',
    description: 'UX research, product roadmap, accessibility standards, and design systems.'
  },
  {
    id: 'team-6',
    name: 'Business Operations',
    department: 'Administration',
    leadId: 'emp-6',
    leadName: 'Amara Okafor',
    memberCount: 2,
    color: '#a78bfa',
    description: 'Facilities management, vendor relations, customer success, and executive support.'
  },
];

export const initialCandidates: Candidate[] = [
  {
    id: 'cand-1', name: 'Alexei Ivanov', email: 'alexei.ivanov@gmail.com',
    appliedRole: 'Staff Backend Engineer', department: 'Engineering',
    status: 'interview', appliedDate: '2026-10-10', source: 'LinkedIn'
  },
  {
    id: 'cand-2', name: 'Nadia Osei', email: 'nadia.osei@outlook.com',
    appliedRole: 'Compliance Manager', department: 'Legal & Compliance',
    status: 'screening', appliedDate: '2026-10-12', source: 'Referral'
  },
  {
    id: 'cand-3', name: 'Oliver Bennett', email: 'oliver.b@proton.me',
    appliedRole: 'Senior Finance Analyst', department: 'Finance',
    status: 'offer', appliedDate: '2026-09-28', source: 'Greenhouse'
  },
  {
    id: 'cand-4', name: 'Simone Dupont', email: 'simone.dupont@email.fr',
    appliedRole: 'Product Manager', department: 'Engineering',
    status: 'applied', appliedDate: '2026-10-18', source: 'AngelList'
  },
  {
    id: 'cand-5', name: 'Kai Nakamura', email: 'kai.n@mail.jp',
    appliedRole: 'DevSecOps Engineer', department: 'Engineering',
    status: 'hired', appliedDate: '2026-09-15', source: 'Referral'
  },
  {
    id: 'cand-6', name: 'Priyanka Das', email: 'p.das@workemail.in',
    appliedRole: 'HR Generalist', department: 'Human Resources',
    status: 'rejected', appliedDate: '2026-10-05', source: 'Indeed'
  },
];

// --------------- KNOWLEDGE BASE DATA ---------------

export const initialArticles: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'Getting Started with Inducto: New Employee Orientation Guide',
    excerpt: 'Everything a new hire needs to know about tools, systems, and their first 30 days at 2X1.',
    content: '# Welcome to 2X1\n\nThis guide walks you through your first 30 days...',
    category: 'Onboarding',
    department: 'Human Resources',
    author: 'Marcus Brody',
    status: 'published',
    views: 487,
    helpful: 51,
    tags: ['New Hire', 'Orientation', 'Getting Started'],
    lastUpdated: '2026-10-01',
    readTime: '8 min read',
    isPinned: true,
  },
  {
    id: 'art-2',
    title: 'Information Security: Acceptable Use Policy Explained',
    excerpt: 'A plain-language breakdown of what is and isn\'t permitted on company systems, devices, and networks.',
    content: '# Acceptable Use Policy\n\nThis article explains the key points of our AUP...',
    category: 'Security',
    department: 'Legal & Compliance',
    author: 'Sarah Chen',
    status: 'published',
    views: 312,
    helpful: 44,
    tags: ['Security', 'Policy', 'Compliance'],
    lastUpdated: '2026-09-18',
    readTime: '5 min read',
    isPinned: true,
  },
  {
    id: 'art-3',
    title: 'How to Submit Expenses Over $5,000',
    excerpt: 'Step-by-step walkthrough of the pre-approval process, Brex routing, and Finance sign-off for large spends.',
    content: '# Expense Submission Guide\n\nAny spend exceeding $5,000 requires...',
    category: 'Finance',
    department: 'Finance',
    author: 'Elena Rostova',
    status: 'published',
    views: 198,
    helpful: 29,
    tags: ['Finance', 'Procurement', 'Expenses'],
    lastUpdated: '2026-09-28',
    readTime: '4 min read',
  },
  {
    id: 'art-4',
    title: 'Remote Work & Home Office Policy — 2026 Edition',
    excerpt: 'Updated guidelines covering stipends, approved jurisdictions, security requirements, and meeting expectations.',
    content: '# Remote Work Policy\n\nEffective as of Q1 2026...',
    category: 'HR Policy',
    department: 'Human Resources',
    author: 'Marcus Brody',
    status: 'published',
    views: 376,
    helpful: 38,
    tags: ['Remote Work', 'HR', 'Policy'],
    lastUpdated: '2026-08-15',
    readTime: '6 min read',
  },
  {
    id: 'art-5',
    title: 'Incident Response Playbook: P0 & P1 Escalation',
    excerpt: 'Exact SLA timelines, PagerDuty escalation paths, incident bridge setup, and post-mortem template.',
    content: '# Incident Response Playbook\n\nFor all P0/P1 incidents...',
    category: 'Engineering',
    department: 'Engineering',
    author: 'Devon Vance',
    status: 'published',
    views: 143,
    helpful: 22,
    tags: ['Incidents', 'SLA', 'On-Call'],
    lastUpdated: '2026-10-05',
    readTime: '7 min read',
  },
  {
    id: 'art-6',
    title: 'GDPR Right-to-Be-Forgotten: Processing Requests',
    excerpt: 'How legal and engineering teams coordinate to execute DSAR/erasure requests within the 30-day SLA.',
    content: '# GDPR Erasure Request Process\n\nAll requests must be actioned within...',
    category: 'Privacy',
    department: 'Legal & Compliance',
    author: 'Sarah Chen',
    status: 'published',
    views: 89,
    helpful: 17,
    tags: ['GDPR', 'Privacy', 'Legal'],
    lastUpdated: '2026-09-10',
    readTime: '5 min read',
  },
  {
    id: 'art-7',
    title: 'SOC 2 Type II Vendor Audit Process & Checklist',
    excerpt: 'Annual vendor compliance audit workflow, checklist templates, and CCO sign-off requirements.',
    content: '# SOC 2 Vendor Audit\n\nThis guide covers our annual vendor compliance review...',
    category: 'Compliance',
    department: 'Legal & Compliance',
    author: 'Priya Sharma',
    status: 'published',
    views: 67,
    helpful: 12,
    tags: ['SOC 2', 'Audit', 'Vendors'],
    lastUpdated: '2026-10-08',
    readTime: '9 min read',
  },
  {
    id: 'art-8',
    title: 'Engineering Onboarding: Dev Environment Setup',
    excerpt: 'Complete walkthrough for setting up your local development environment, VPN, GitHub, and cloud access.',
    content: '# Dev Environment Setup\n\nStep 1: Clone the monorepo...',
    category: 'Onboarding',
    department: 'Engineering',
    author: 'Liam Patel',
    status: 'published',
    views: 224,
    helpful: 34,
    tags: ['Engineering', 'Setup', 'Onboarding'],
    lastUpdated: '2026-09-22',
    readTime: '12 min read',
  },
  {
    id: 'art-9',
    title: 'Whistleblower & Non-Retaliation Policy Overview',
    excerpt: 'How to report concerns confidentially, what protections apply, and the investigation process.',
    content: '# Whistleblower Protection Policy\n\nThis policy ensures...',
    category: 'Compliance',
    department: 'Legal & Compliance',
    author: 'Sarah Chen',
    status: 'draft',
    views: 23,
    helpful: 4,
    tags: ['Compliance', 'Governance', 'HR'],
    lastUpdated: '2026-10-14',
    readTime: '6 min read',
  },
  {
    id: 'art-10',
    title: 'Responsible AI & Data Ethics Framework',
    excerpt: 'Principles, review gates, and prohibited use cases for AI/ML models deployed in our products.',
    content: '# Responsible AI Policy\n\nAll AI systems must pass...',
    category: 'Engineering',
    department: 'Engineering',
    author: 'Devon Vance',
    status: 'draft',
    views: 11,
    helpful: 2,
    tags: ['AI', 'Ethics', 'Policy'],
    lastUpdated: '2026-10-19',
    readTime: '10 min read',
  },
];

export const initialKBTools: KBTool[] = [
  {
    id: 'tool-1', name: 'Linear', description: 'Issue tracking, project roadmaps, and sprint management for engineering teams.',
    category: 'Project Management', department: ['Engineering'], url: 'https://linear.app',
    logoColor: '#5E6AD2', logoLetter: 'L', tags: ['Issues', 'Sprints', 'Roadmap'],
    addedBy: 'Devon Vance', addedDate: '2026-03-01', hasCourse: true,
  },
  {
    id: 'tool-2', name: 'Notion', description: 'Company wiki, product specs, meeting notes, and team documentation.',
    category: 'Documentation', department: ['Engineering', 'HR', 'Operations'], url: 'https://notion.so',
    logoColor: '#000000', logoLetter: 'N', tags: ['Wiki', 'Docs', 'Notes'],
    addedBy: 'Marcus Brody', addedDate: '2026-01-10', hasCourse: false,
  },
  {
    id: 'tool-3', name: 'Brex', description: 'Corporate card management, expense submissions, and finance approvals.',
    category: 'Finance', department: ['Finance', 'All'], url: 'https://brex.com',
    logoColor: '#FF5B3A', logoLetter: 'B', tags: ['Expenses', 'Cards', 'Finance'],
    addedBy: 'Elena Rostova', addedDate: '2026-02-14', hasCourse: true,
  },
  {
    id: 'tool-4', name: 'PagerDuty', description: 'On-call scheduling, incident alerting, and escalation management for operations.',
    category: 'Operations', department: ['Engineering', 'Operations'], url: 'https://pagerduty.com',
    logoColor: '#06AC38', logoLetter: 'P', tags: ['On-Call', 'Incidents', 'Alerts'],
    addedBy: 'Devon Vance', addedDate: '2026-04-05', hasCourse: false,
  },
  {
    id: 'tool-5', name: 'Vanta', description: 'Automated SOC 2 compliance monitoring, evidence collection, and vendor trust reports.',
    category: 'Compliance', department: ['Legal & Compliance', 'Engineering'], url: 'https://vanta.com',
    logoColor: '#7C3AED', logoLetter: 'V', tags: ['SOC 2', 'Compliance', 'Security'],
    addedBy: 'Sarah Chen', addedDate: '2026-03-22', hasCourse: true,
  },
  {
    id: 'tool-6', name: 'Rippling', description: 'HR, payroll, device management, and employee lifecycle automation platform.',
    category: 'HR', department: ['Human Resources', 'IT'], url: 'https://rippling.com',
    logoColor: '#FF7A00', logoLetter: 'R', tags: ['HR', 'Payroll', 'IT'],
    addedBy: 'Marcus Brody', addedDate: '2026-01-15', hasCourse: false,
  },
  {
    id: 'tool-7', name: 'GitHub', description: 'Source code hosting, pull requests, code reviews, and CI/CD pipeline triggers.',
    category: 'Engineering', department: ['Engineering'], url: 'https://github.com',
    logoColor: '#24292F', logoLetter: 'G', tags: ['Code', 'CI/CD', 'Review'],
    addedBy: 'Liam Patel', addedDate: '2026-01-01', hasCourse: false,
  },
  {
    id: 'tool-8', name: 'Slack', description: 'Team messaging, channel-based collaboration, and app integrations across departments.',
    category: 'Communication', department: ['All'], url: 'https://slack.com',
    logoColor: '#4A154B', logoLetter: 'S', tags: ['Messaging', 'Channels', 'Integrations'],
    addedBy: 'Marcus Brody', addedDate: '2026-01-01', hasCourse: false,
  },
  {
    id: 'tool-9', name: 'Figma', description: 'Product design, UI prototyping, design system management, and stakeholder reviews.',
    category: 'Design', department: ['Engineering', 'Marketing'], url: 'https://figma.com',
    logoColor: '#F24E1E', logoLetter: 'F', tags: ['Design', 'UI', 'Prototyping'],
    addedBy: 'Isabelle Martin', addedDate: '2026-05-10', hasCourse: false,
  },
  {
    id: 'tool-10', name: 'Datadog', description: 'Infrastructure monitoring, APM, log management, and custom dashboards for engineering.',
    category: 'Monitoring', department: ['Engineering'], url: 'https://datadoghq.com',
    logoColor: '#632CA6', logoLetter: 'D', tags: ['Monitoring', 'APM', 'Logs'],
    addedBy: 'Tariq Noor', addedDate: '2026-06-01', hasCourse: false,
  },
];


