import {
  User,
  Venture,
  Opportunity,
  Application,
  AssessmentResult,
  Freelancer,
  Enquiry,
  Mentor,
  Resource,
  AppNotification
} from '../types';
import {
  INITIAL_VENTURES,
  INITIAL_OPPORTUNITIES,
  INITIAL_FREELANCERS,
  INITIAL_MENTORS,
  INITIAL_RESOURCES
} from '../data/initialData';

const STORAGE_KEYS = {
  CURRENT_USER: 'sutra_current_user',
  USERS: 'sutra_users',
  VENTURES: 'sutra_ventures',
  ACTIVE_VENTURE_ID: 'sutra_active_venture_id',
  OPPORTUNITIES: 'sutra_opportunities',
  APPLICATIONS: 'sutra_applications',
  ASSESSMENTS: 'sutra_assessments',
  FREELANCERS: 'sutra_freelancers',
  ENQUIRIES: 'sutra_enquiries',
  MENTORS: 'sutra_mentors',
  RESOURCES: 'sutra_resources',
  NOTIFICATIONS: 'sutra_notifications',
};

// Default Demo User
export const DEMO_FOUNDER_USER: User = {
  id: 'user-demo-founder',
  email: 'founder@sutra.io',
  name: 'Devanand Krishnan',
  role: 'founder',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98450 12345',
  location: 'Bangalore, India',
  bio: 'Building deeptech and IoT climate solutions. Passionate about empowering rural Indian farmers through technology.',
  onboardingCompleted: true,
  founderProfile: {
    stage: 'build',
    industry: 'AgriTech & Climate',
    supportNeeds: ['Government Grants', 'IoT Hardware Mentorship', 'Pilot Partner Intros'],
    preferredMentorship: ['Fundraising', 'Government Schemes', 'Product Scalability']
  },
  createdAt: '2026-08-01T09:00:00Z'
};

export const DEMO_FREELANCER_USER: User = {
  id: 'user-demo-freelancer',
  email: 'freelancer@sutra.io',
  name: 'Priyanka Sen',
  role: 'freelancer',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98201 54321',
  location: 'Mumbai, India',
  bio: 'Principal Product Designer helping early-stage founders build investor-ready MVPs.',
  onboardingCompleted: true,
  freelancerProfile: {
    title: 'Principal Product & UX Designer',
    skills: ['Figma', 'Design Systems', 'User Research', 'Pitch Decks'],
    category: 'UI/UX Design',
    experienceYears: 6,
    hourlyRate: 2800,
    availability: 'Available Now',
    portfolioUrls: ['https://figma.com/@priyankasen'],
    services: [
      { id: 'srv-1', title: 'Founder MVP Product Design', price: 45000, turnaround: '10 Days', description: 'Interactive Figma prototype' },
      { id: 'srv-2', title: 'Investor Pitch Deck Polish', price: 22000, turnaround: '4 Days', description: '12-slide high-impact narrative deck' }
    ],
    rating: 5.0,
    reviewsCount: 44
  },
  createdAt: '2026-07-15T10:00:00Z'
};

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    ventureId: 'ven-1',
    opportunityId: 'opp-1',
    status: 'under_review',
    appliedDate: '2026-10-15',
    notes: 'Submitted via SISFS DPIIT portal; presentation to incubator selection committee scheduled for next month.',
    submissionLink: 'https://seedfund.startupindia.gov.in/'
  },
  {
    id: 'app-2',
    ventureId: 'ven-1',
    opportunityId: 'opp-3',
    status: 'applied',
    appliedDate: '2026-10-22',
    notes: 'PRAYAS center application submitted for sensor hardware prototyping lab access.'
  }
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-demo-founder',
    type: 'opportunity_deadline',
    title: 'Application Deadline Approaching',
    message: 'NIDHI-PRAYAS Hardware Prototyping Grant closes in 40 days. Complete your draft proposal.',
    link: '/opportunities',
    read: false,
    createdAt: '2026-11-03T10:30:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-demo-founder',
    type: 'recommendation',
    title: 'New Scheme Matched for AgroPulse AI',
    message: 'MeitY TIDE 2.0 has opened a new incubation call matching your IoT & DeepTech focus.',
    link: '/opportunities',
    read: false,
    createdAt: '2026-11-02T14:15:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-demo-founder',
    type: 'connection_request',
    title: 'Mentor Connection Accepted',
    message: 'Dr. Ramesh Venkatesh accepted your connection request. You can now message him directly.',
    link: '/mentors',
    read: true,
    createdAt: '2026-10-29T18:00:00Z'
  }
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    senderId: 'user-demo-founder',
    senderName: 'Devanand Krishnan',
    senderVenture: 'AgroPulse AI',
    recipientId: 'free-2', // Priyanka Sen
    serviceTitle: 'Investor Pitch Deck & Visual Storytelling',
    budget: '₹22,000',
    message: 'Hello Priyanka, we have our preliminary telemetry data and need an investor deck designed for our upcoming seed discussions.',
    status: 'accepted',
    createdAt: '2026-10-20T11:00:00Z',
    responses: [
      { sender: 'Priyanka Sen', text: 'Hi Devanand! I would love to help. Could you share your raw slide notes and sensor charts?', time: '2026-10-20T13:45:00Z' },
      { sender: 'Devanand Krishnan', text: 'Shared via Google Drive link. Let us schedule a kickoff call tomorrow.', time: '2026-10-20T15:10:00Z' }
    ]
  }
];

class StorageService {
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set error', e);
    }
  }

  // --- Auth / User ---
  getCurrentUser(): User | null {
    return this.getItem<User | null>(STORAGE_KEYS.CURRENT_USER, DEMO_FOUNDER_USER);
  }

  setCurrentUser(user: User | null): void {
    this.setItem(STORAGE_KEYS.CURRENT_USER, user);
  }

  getUsers(): User[] {
    return this.getItem<User[]>(STORAGE_KEYS.USERS, [DEMO_FOUNDER_USER, DEMO_FREELANCER_USER]);
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    this.setItem(STORAGE_KEYS.USERS, users);
    if (this.getCurrentUser()?.id === user.id) {
      this.setCurrentUser(user);
    }
  }

  // --- Ventures ---
  getVentures(): Venture[] {
    return this.getItem<Venture[]>(STORAGE_KEYS.VENTURES, INITIAL_VENTURES);
  }

  saveVentures(ventures: Venture[]): void {
    this.setItem(STORAGE_KEYS.VENTURES, ventures);
  }

  getActiveVentureId(): string {
    const defaultId = INITIAL_VENTURES[0]?.id || 'ven-1';
    return this.getItem<string>(STORAGE_KEYS.ACTIVE_VENTURE_ID, defaultId);
  }

  setActiveVentureId(id: string): void {
    this.setItem(STORAGE_KEYS.ACTIVE_VENTURE_ID, id);
  }

  getActiveVenture(): Venture | null {
    const ventures = this.getVentures().filter(v => !v.isArchived);
    const activeId = this.getActiveVentureId();
    const found = ventures.find(v => v.id === activeId);
    return found || ventures[0] || null;
  }

  addVenture(venture: Omit<Venture, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'savedOpportunityIds' | 'savedResourceIds'>): Venture {
    const ventures = this.getVentures();
    const newVenture: Venture = {
      ...venture,
      id: `ven-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      savedOpportunityIds: [],
      savedResourceIds: [],
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Define customer value proposition', stage: venture.stage, completed: false },
        { id: `m-${Date.now()}-2`, title: 'Complete first readiness assessment on SUTRA', stage: venture.stage, completed: false }
      ]
    };
    ventures.push(newVenture);
    this.saveVentures(ventures);
    this.setActiveVentureId(newVenture.id);
    return newVenture;
  }

  updateVenture(updated: Venture): void {
    const ventures = this.getVentures();
    const index = ventures.findIndex(v => v.id === updated.id);
    if (index >= 0) {
      ventures[index] = { ...updated, updatedAt: new Date().toISOString() };
      this.saveVentures(ventures);
    }
  }

  deleteVenture(id: string): void {
    let ventures = this.getVentures();
    ventures = ventures.filter(v => v.id !== id);
    this.saveVentures(ventures);
    if (this.getActiveVentureId() === id) {
      if (ventures.length > 0) {
        this.setActiveVentureId(ventures[0].id);
      }
    }
  }

  // --- Opportunities ---
  getOpportunities(): Opportunity[] {
    return this.getItem<Opportunity[]>(STORAGE_KEYS.OPPORTUNITIES, INITIAL_OPPORTUNITIES);
  }

  saveOpportunities(opps: Opportunity[]): void {
    this.setItem(STORAGE_KEYS.OPPORTUNITIES, opps);
  }

  // --- Applications ---
  getApplications(): Application[] {
    return this.getItem<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }

  saveApplications(apps: Application[]): void {
    this.setItem(STORAGE_KEYS.APPLICATIONS, apps);
  }

  addOrUpdateApplication(app: Application): void {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === app.id || (a.ventureId === app.ventureId && a.opportunityId === app.opportunityId));
    if (index >= 0) {
      apps[index] = app;
    } else {
      apps.push(app);
    }
    this.saveApplications(apps);
  }

  // --- Assessments ---
  getAssessments(): AssessmentResult[] {
    return this.getItem<AssessmentResult[]>(STORAGE_KEYS.ASSESSMENTS, []);
  }

  saveAssessment(result: AssessmentResult): void {
    const assessments = this.getAssessments();
    assessments.unshift(result);
    this.setItem(STORAGE_KEYS.ASSESSMENTS, assessments);

    // Update active venture score
    const ventures = this.getVentures();
    const venture = ventures.find(v => v.id === result.ventureId);
    if (venture) {
      venture.latestReadinessScore = result.overallScore;
      venture.latestAssessmentDate = result.createdAt;
      this.saveVentures(ventures);
    }
  }

  // --- Freelancers ---
  getFreelancers(): Freelancer[] {
    return this.getItem<Freelancer[]>(STORAGE_KEYS.FREELANCERS, INITIAL_FREELANCERS);
  }

  saveFreelancers(list: Freelancer[]): void {
    this.setItem(STORAGE_KEYS.FREELANCERS, list);
  }

  // --- Enquiries ---
  getEnquiries(): Enquiry[] {
    return this.getItem<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  }

  saveEnquiries(enquiries: Enquiry[]): void {
    this.setItem(STORAGE_KEYS.ENQUIRIES, enquiries);
  }

  addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'responses'>): Enquiry {
    const enquiries = this.getEnquiries();
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      responses: []
    };
    enquiries.unshift(newEnq);
    this.setItem(STORAGE_KEYS.ENQUIRIES, enquiries);
    return newEnq;
  }

  respondToEnquiry(enquiryId: string, sender: string, text: string): void {
    const enquiries = this.getEnquiries();
    const enq = enquiries.find(e => e.id === enquiryId);
    if (enq) {
      enq.responses.push({ sender, text, time: new Date().toISOString() });
      enq.status = 'replied';
      this.setItem(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
  }

  // --- Mentors ---
  getMentors(): Mentor[] {
    return this.getItem<Mentor[]>(STORAGE_KEYS.MENTORS, INITIAL_MENTORS);
  }

  updateMentor(mentor: Mentor): void {
    const mentors = this.getMentors();
    const idx = mentors.findIndex(m => m.id === mentor.id);
    if (idx >= 0) {
      mentors[idx] = mentor;
      this.setItem(STORAGE_KEYS.MENTORS, mentors);
    }
  }

  // --- Resources ---
  getResources(): Resource[] {
    return this.getItem<Resource[]>(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
  }

  toggleResourceComplete(id: string): void {
    const resources = this.getResources();
    const res = resources.find(r => r.id === id);
    if (res) {
      res.completed = !res.completed;
      this.setItem(STORAGE_KEYS.RESOURCES, resources);
    }
  }

  // --- Notifications ---
  getNotifications(): AppNotification[] {
    return this.getItem<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications();
    const n = notifs.find(item => item.id === id);
    if (n) {
      n.read = true;
      this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  }

  markAllNotificationsAsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  addNotification(notif: Omit<AppNotification, 'id' | 'createdAt' | 'read'>): void {
    const notifs = this.getNotifications();
    notifs.unshift({
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    });
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  resetToDemo(): void {
    localStorage.clear();
    this.setCurrentUser(DEMO_FOUNDER_USER);
    this.saveVentures(INITIAL_VENTURES);
    this.setActiveVentureId(INITIAL_VENTURES[0].id);
    this.saveOpportunities(INITIAL_OPPORTUNITIES);
    this.saveApplications(INITIAL_APPLICATIONS);
    this.saveFreelancers(INITIAL_FREELANCERS);
    this.setItem(STORAGE_KEYS.MENTORS, INITIAL_MENTORS);
    this.setItem(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    this.setItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  }
}

export const storage = new StorageService();
