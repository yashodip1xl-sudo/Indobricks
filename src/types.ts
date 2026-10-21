export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

export type EmployeeStatus = 'active' | 'invited' | 'offboarded' | 'on-leave';
export type EmployeeType = 'full-time' | 'part-time' | 'contractor' | 'intern';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  type: EmployeeType;
  startDate: string;
  location: string;
  manager?: string;
  trainingCompletion: number;
  avatarColor: string;
}

export interface Team {
  id: string;
  name: string;
  department: string;
  leadId: string;
  leadName: string;
  memberCount: number;
  color: string;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  appliedRole: string;
  department: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  source: string;
}


export interface Responsibility {
  id: string;
  title: string;
  department: string;
  urgency: 'high' | 'medium' | 'low';
  ownerId: string | null;
  ownerName: string | null;
  description: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  department: string;
  duration: string;
  hasLesson: boolean;
  lessonContent?: string;
  author?: string;
  tags: string[];
}

export interface DepartmentInfo {
  name: string;
  headcount: number;
  learningAssigned: boolean;
  completionRate: number;
  color: string;
}

export interface ComplianceMetrics {
  activePolicies: number;
  mandatory: number;
  archived: number;
  changesToReview: number;
}

export interface PolicyItem {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'review' | 'archived';
  isMandatory: boolean;
  version: string;
  lastUpdated: string;
}

export interface VerifiedQA {
  question: string;
  answer: string;
  sourcePolicy: string;
  verifiedBy: string;
  confidence: number;
  category: string;
}

export type ArticleStatus = 'published' | 'draft' | 'archived';

export interface KnowledgeArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  department: string;
  author: string;
  status: ArticleStatus;
  views: number;
  helpful: number;
  tags: string[];
  lastUpdated: string;
  readTime: string;
  isPinned?: boolean;
}

export interface KBTool {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string[];
  url: string;
  logoColor: string;
  logoLetter: string;
  tags: string[];
  addedBy: string;
  addedDate: string;
  hasCourse: boolean;
}
