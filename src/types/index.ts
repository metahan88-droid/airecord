// Navigation types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Student types
export interface Student {
  id: string;
  name: string;
  grade: number;
  class: number;
  number: number;
  tags?: string[];
  photoUrl?: string;
}

// Dashboard types
export interface DashboardStats {
  completionRate: {
    grade: number;
    class: number;
    subject: number;
  };
  deadline: {
    daysLeft: number;
    urgent: number;
  };
  pending: {
    rejected: number;
    waiting: number;
  };
  warnings: {
    prohibited: number;
    duplicate: number;
  };
}

// AI Writing types
export interface AIWritingRequest {
  studentId: string;
  type: 'subject' | 'activity' | 'homeroom' | 'career';
  evidence: string[];
  template?: string;
  length?: 'short' | 'medium' | 'long';
  tone?: 'formal' | 'friendly';
}

export interface AIWritingResult {
  id: string;
  content: string;
  version: number;
  createdAt: Date;
  evidenceMapping: Record<string, string[]>;
  warnings: string[];
}
