export type UserRole = 'founder' | 'freelancer' | 'admin';

export type StartupStage = 'idea' | 'validate' | 'build' | 'launch' | 'scale';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  onboardingCompleted: boolean;
  founderProfile?: {
    stage: StartupStage;
    industry: string;
    supportNeeds: string[];
    preferredMentorship: string[];
  };
  freelancerProfile?: {
    title: string;
    skills: string[];
    category: string;
    experienceYears: number;
    hourlyRate: number;
    availability: 'Available Now' | 'Available Next Week' | 'Booked';
    portfolioUrls: string[];
    services: { id: string; title: string; price: number; turnaround: string; description: string }[];
    rating: number;
    reviewsCount: number;
  };
  createdAt: string;
}

export interface VentureMilestone {
  id: string;
  title: string;
  stage: StartupStage;
  completed: boolean;
  dueDate?: string;
}

export interface Venture {
  id: string;
  userId: string;
  name: string;
  tagline: string;
  description: string;
  industry: string;
  location: string;
  stage: StartupStage;
  businessModel: string;
  targetAudience: string;
  problemSolved: string;
  traction?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  milestones: VentureMilestone[];
  latestReadinessScore?: number;
  latestAssessmentDate?: string;
  savedOpportunityIds: string[];
  savedResourceIds: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: 'Grant' | 'Government Scheme' | 'Seed Funding' | 'Incubation' | 'Accelerator' | 'Competition' | 'Investor Meet';
  eligibleStages: StartupStage[];
  industries: string[];
  location: string;
  deadline: string;
  fundingAmount: string;
  eligibilitySummary: string;
  requirements: string[];
  verificationStatus: 'Verified Official' | 'Admin Verified' | 'Sample Data';
  officialSource: string;
  officialUrl: string;
  lastVerified: string;
  description: string;
  tags: string[];
  matchScore?: number;
  matchReason?: string;
}

export interface Application {
  id: string;
  ventureId: string;
  opportunityId: string;
  status: 'applied' | 'under_review' | 'shortlisted' | 'accepted' | 'not_selected';
  appliedDate: string;
  notes?: string;
  submissionLink?: string;
}

export interface AssessmentResult {
  id: string;
  ventureId: string;
  createdAt: string;
  overallScore: number; // 0 - 100
  categoryScores: {
    problemSolution: number;
    targetCustomers: number;
    marketCompetition: number;
    businessModel: number;
    financialPlanning: number;
    teamCapabilities: number;
    productDev: number;
    executionTraction: number;
    legalCompliance: number;
  };
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  missingInfo: string[];
  nextSteps: string[];
  suggestedResourceIds: string[];
  relevantOpportunityIds: string[];
  answers: Record<string, string | number>;
  summary: string;
}

export interface FreelancerService {
  title: string;
  price: number;
  turnaround: string;
  description: string;
}

export interface FreelancerPortfolio {
  title: string;
  image?: string;
  link?: string;
  desc: string;
}

export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  category: string;
  skills: string[];
  experienceYears: number;
  startingPrice: number;
  availability: 'Available Now' | 'Available Next Week' | 'Booked';
  rating: number;
  reviewsCount: number;
  location: string;
  bio: string;
  portfolio: FreelancerPortfolio[];
  services: FreelancerService[];
}

export interface EnquiryResponse {
  sender: string;
  text: string;
  time: string;
}

export interface Enquiry {
  id: string;
  senderId: string;
  senderName: string;
  senderVenture: string;
  recipientId: string;
  serviceTitle: string;
  budget: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'replied';
  createdAt: string;
  responses: EnquiryResponse[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertise: string[];
  industries: string[];
  bio: string;
  location: string;
  availableFor: string[];
  connectionStatus: 'none' | 'pending' | 'connected' | 'declined';
  requestMessage?: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Idea Validation' | 'Business Planning' | 'Legal and Registration' | 'Funding' | 'Marketing' | 'Hiring' | 'Product Development' | 'Scaling';
  type: 'Guide' | 'Template' | 'Checklist' | 'Toolkit' | 'External Resource';
  readTime: string;
  description: string;
  source: 'SUTRA Editorial' | 'Official Partner' | 'Open Source';
  content?: string;
  downloadFilename?: string;
  tags: string[];
  completed?: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: 'opportunity_deadline' | 'recommendation' | 'assessment_done' | 'enquiry_update' | 'connection_request';
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}
