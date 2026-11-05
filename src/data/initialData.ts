import { Opportunity, Freelancer, Mentor, Resource, Venture } from '../types';

export const INITIAL_VENTURES: Venture[] = [
  {
    id: 'ven-1',
    userId: 'user-demo-founder',
    name: 'AgroPulse AI',
    tagline: 'Precision irrigation & crop health intelligence via satellite IoT',
    description: 'AgroPulse AI combines multi-spectral satellite imagery with low-cost ground moisture sensors to give smallholder farmers hyper-local irrigation schedules and disease alerts via WhatsApp and mobile app.',
    industry: 'AgriTech & Climate',
    location: 'Bangalore, India',
    stage: 'build',
    businessModel: 'B2B2C subscription for farmer cooperatives + FPO API data licensing',
    targetAudience: 'Farmer Producer Organizations (FPOs), progressive farmers, state agri-departments',
    problemSolved: 'Over-irrigation leads to 40% water wastage and soil degradation, while late pest detection cuts yields by up to 35%.',
    traction: '14 pilot farm deployments in Karnataka, 450 active farmers, 18% water savings recorded.',
    isArchived: false,
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-11-01T14:30:00Z',
    latestReadinessScore: 78,
    latestAssessmentDate: '2026-10-28T09:15:00Z',
    savedOpportunityIds: ['opp-1', 'opp-3'],
    savedResourceIds: ['res-1', 'res-4'],
    milestones: [
      { id: 'm-1', title: 'Complete MVP sensor hardware telemetry', stage: 'build', completed: true, dueDate: '2026-09-30' },
      { id: 'm-2', title: 'Achieve 500 farmer pilot signups', stage: 'build', completed: false, dueDate: '2026-11-20' },
      { id: 'm-3', title: 'File provisional patent for sensor calibration', stage: 'build', completed: true, dueDate: '2026-10-15' },
      { id: 'm-4', title: 'Apply for Startup India Seed Fund Scheme', stage: 'build', completed: false, dueDate: '2026-11-30' }
    ]
  },
  {
    id: 'ven-2',
    userId: 'user-demo-founder',
    name: 'MediConnect Care',
    tagline: 'Asynchronous diagnostics & triage clinic workflow for rural primary health',
    description: 'Empowering tier-3 and village clinics with AI-assisted clinical note taking and tele-consultation dispatching to secondary care hospitals.',
    industry: 'HealthTech',
    location: 'Pune, India',
    stage: 'validate',
    businessModel: 'SaaS per health worker + transactional tele-triage fee',
    targetAudience: 'Rural primary clinics, community healthcare workers, NGO health networks',
    problemSolved: 'Rural patients travel an average of 42 km just to get basic specialist triage or prescription renewals.',
    traction: 'Customer discovery interviews with 35 rural clinic nurses; signed letter of intent with 2 district NGO clinics.',
    isArchived: false,
    createdAt: '2026-09-10T12:00:00Z',
    updatedAt: '2026-10-25T11:00:00Z',
    latestReadinessScore: 54,
    latestAssessmentDate: '2026-10-12T16:00:00Z',
    savedOpportunityIds: ['opp-2'],
    savedResourceIds: ['res-2', 'res-5'],
    milestones: [
      { id: 'm-21', title: 'Complete 30 customer discovery interviews', stage: 'validate', completed: true, dueDate: '2026-10-10' },
      { id: 'm-22', title: 'Build clickable Figma prototype for clinic staff', stage: 'validate', completed: true, dueDate: '2026-10-25' },
      { id: 'm-23', title: 'Secure pilot approval from district health officer', stage: 'validate', completed: false, dueDate: '2026-12-05' }
    ]
  },
  {
    id: 'ven-3',
    userId: 'user-demo-founder',
    name: 'EcoPack Solutions',
    tagline: 'Agricultural waste transformed into waterproof packaging pellets',
    description: 'Converting paddy straw waste into biodegradable, thermal-resistant protective packaging to replace Styrofoam.',
    industry: 'CleanTech / Sustainability',
    location: 'New Delhi, India',
    stage: 'idea',
    businessModel: 'B2B manufacturing material supply to e-commerce and electronics shippers',
    targetAudience: 'Direct-to-consumer brands, electronics shippers, eco-conscious packaging converters',
    problemSolved: 'Crop stubble burning causes severe winter air pollution in northern India, while single-use plastic foam chokes landfills.',
    isArchived: false,
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-01T08:00:00Z',
    savedOpportunityIds: [],
    savedResourceIds: ['res-1'],
    milestones: [
      { id: 'm-31', title: 'Formulate preliminary chemical binder test', stage: 'idea', completed: false, dueDate: '2026-11-30' },
      { id: 'm-32', title: 'Conduct competitor cost benchmark study', stage: 'idea', completed: false, dueDate: '2026-12-15' }
    ]
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Startup India Seed Fund Scheme (SISFS)',
    organization: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    category: 'Government Scheme',
    eligibleStages: ['idea', 'validate', 'build'],
    industries: ['AgriTech', 'HealthTech', 'CleanTech', 'AI/DeepTech', 'EdTech', 'FinTech', 'Manufacturing', 'All Sectors'],
    location: 'Pan-India',
    deadline: '2026-12-31',
    fundingAmount: 'Up to ₹50 Lakhs (₹20L Grant + ₹30L Debt/Convertible)',
    eligibilitySummary: 'DPIIT recognized startups incorporated less than 2 years ago, with a scalable business idea requiring proof-of-concept or prototype commercialisation.',
    requirements: [
      'DPIIT Recognition Certificate',
      'Incorporated within 2 years from date of application',
      'Should not have received more than ₹10 lakh in monetary support from other Govt schemes',
      'Indian entity with at least 51% shareholding by Indian promoters'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'Startup India Govt Portal',
    officialUrl: 'https://seedfund.startupindia.gov.in/',
    lastVerified: '2026-11-01',
    description: 'Financial assistance to startups for proof of concept, prototype development, product trials, market-entry and commercialization through approved incubators across India.',
    tags: ['Government Grant', 'DPIIT', 'Seed Capital', 'Zero Equity Grant'],
    matchScore: 94,
    matchReason: 'Perfect match: Your venture is in the Build stage, has Indian incorporation readiness, and is developing a hardware/software prototype.'
  },
  {
    id: 'opp-2',
    title: 'BIRAC Biotechnology Ignition Grant (BIG)',
    organization: 'Biotechnology Industry Research Assistance Council (BIRAC)',
    category: 'Grant',
    eligibleStages: ['idea', 'validate', 'build'],
    industries: ['HealthTech', 'BioTech', 'MedTech', 'AgriTech', 'CleanTech'],
    location: 'Pan-India',
    deadline: '2026-11-30',
    fundingAmount: 'Up to ₹50 Lakhs (100% Non-Dilutive Grant)',
    eligibilitySummary: 'Individual innovators or startups registered within 5 years with innovative biotech, healthcare, or bioscience ideas requiring proof-of-concept validation.',
    requirements: [
      'Innovative biotechnology or health diagnostic concept with social impact',
      'Registered startup (<5 years) or individual researcher/entrepreneur',
      'Indian citizen with >51% equity'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'BIRAC Department of Biotechnology, Govt of India',
    officialUrl: 'https://birac.nic.in/big.php',
    lastVerified: '2026-10-25',
    description: 'Non-dilutive grant support to establish proof of concept and discover innovative biotechnology and health tech solutions for high impact challenges.',
    tags: ['Non-Dilutive', 'Biotech', 'Healthcare', 'Research Grant'],
    matchScore: 88,
    matchReason: 'High relevance for your HealthTech venture validating telemedicine and primary triage workflows.'
  },
  {
    id: 'opp-3',
    title: 'NIDHI-PRAYAS Hardware & Prototyping Grant',
    organization: 'Department of Science and Technology (DST)',
    category: 'Grant',
    eligibleStages: ['idea', 'validate', 'build'],
    industries: ['AgriTech', 'IoT', 'CleanTech', 'Hardware', 'Robotics'],
    location: 'Pan-India (Through PRAYAS Centres)',
    deadline: '2026-12-15',
    fundingAmount: 'Up to ₹10 Lakhs Prototypes Grant',
    eligibilitySummary: 'Support for hardware and IoT innovators to translate an innovative idea into a tangible working prototype within 18 months.',
    requirements: [
      'Hardware or IoT prototype proposal',
      'Access to a recognized PRAYAS Centre / FabLab',
      'Founder commitment for full-time project execution'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'National Science & Technology Entrepreneurship Development Board (NSTEDB)',
    officialUrl: 'https://www.nidhi-prayas.org/',
    lastVerified: '2026-10-28',
    description: 'National Initiative for Developing and Harnessing Innovations - PRomoting and Accelerating Young and ASpiring technology innovators to build working physical prototypes.',
    tags: ['Hardware Grant', 'IoT', 'DST', 'Prototyping'],
    matchScore: 92,
    matchReason: 'Directly aligns with your sensor telemetry hardware build phase and ground-IoT deployment.'
  },
  {
    id: 'opp-4',
    title: 'Y Combinator Core Accelerator Batch',
    organization: 'Y Combinator',
    category: 'Accelerator',
    eligibleStages: ['validate', 'build', 'launch', 'scale'],
    industries: ['AI/DeepTech', 'SaaS', 'FinTech', 'HealthTech', 'Climate', 'All Sectors'],
    location: 'San Francisco, USA / Global Hybrid',
    deadline: '2026-12-01',
    fundingAmount: '$500,000 standard deal ($125k for 7% + $375k MFN SAFE)',
    eligibilitySummary: 'Early stage and pre-seed founders globally building world-changing technology ventures with technical founders and massive addressable markets.',
    requirements: [
      'Working demo or clear technical prototype',
      'Strong founding team with technical core competency',
      'Scalable market size ($1B+ TAM)'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'Y Combinator Official Portal',
    officialUrl: 'https://www.ycombinator.com/apply',
    lastVerified: '2026-11-01',
    description: 'The world’s premier startup accelerator. 3-month intense program culminating in Demo Day before thousands of top-tier global venture capitalists.',
    tags: ['Global Accelerator', 'Top Tier', 'SAFE', 'Silicon Valley'],
    matchScore: 82,
    matchReason: 'Your software intelligence layer and scalable data platform qualifies for international pre-seed cohorts.'
  },
  {
    id: 'opp-5',
    title: 'MeitY TIDE 2.0 Incubation & Prototype Grant',
    organization: 'Ministry of Electronics and Information Technology (MeitY)',
    category: 'Government Scheme',
    eligibleStages: ['idea', 'validate', 'build'],
    industries: ['AI/DeepTech', 'IoT', 'Software', 'FinTech', 'AgriTech'],
    location: 'Pan-India through MeitY Incubation Centres',
    deadline: '2026-12-20',
    fundingAmount: '₹4 Lakhs (Entrepreneur-in-Residence) to ₹7 Lakhs (Grant)',
    eligibilitySummary: 'Tech startups leveraging emerging technologies (AI, IoT, Blockchain, Robotics) to solve national and commercial challenges.',
    requirements: [
      'Tech-enabled solution addressing key national priorities',
      'Incubated at a designated MeitY G1/G2/G3 centre',
      'Early validation or working prototype stage'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'MeitY Startup Hub (MSH)',
    officialUrl: 'https://meitystartuphub.in/',
    lastVerified: '2026-10-20',
    description: 'Promotes tech entrepreneurship through financial and technical support to incubators supporting ICT startups.',
    tags: ['Government Scheme', 'MeitY', 'Tech Grant', 'DeepTech'],
    matchScore: 79,
    matchReason: 'Applicable for ICT and IoT enabled ventures.'
  },
  {
    id: 'opp-6',
    title: 'AWS Activate Founders Tier Credit Grant',
    organization: 'Amazon Web Services',
    category: 'Seed Funding',
    eligibleStages: ['idea', 'validate', 'build', 'launch', 'scale'],
    industries: ['All Sectors', 'SaaS', 'AI/DeepTech', 'AgriTech'],
    location: 'Global',
    deadline: 'Rolling (Always Open)',
    fundingAmount: 'Up to $100,000 in Cloud Credits + Architecture Support',
    eligibilitySummary: 'Bootstrapped or angel/seed-backed technology startups building cloud-native infrastructure.',
    requirements: [
      'Active company website or working repository',
      'Valid AWS account',
      'Not received previous institutional Activate grants beyond limits'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'Amazon Web Services',
    officialUrl: 'https://aws.amazon.com/activate/',
    lastVerified: '2026-11-02',
    description: 'Provides startups with free tools, resources, AWS service credits, and architectural reviews to scale their workloads securely.',
    tags: ['Cloud Credits', 'Infrastructure', 'AWS', 'Zero Equity'],
    matchScore: 91,
    matchReason: 'Immediate compute savings for your satellite imagery AI processing pipelines.'
  },
  {
    id: 'opp-7',
    title: 'National Startup Awards 2026',
    organization: 'DPIIT & Startup India',
    category: 'Competition',
    eligibleStages: ['build', 'launch', 'scale'],
    industries: ['AgriTech', 'HealthTech', 'CleanTech', 'FinTech', 'Industry 4.0'],
    location: 'Pan-India',
    deadline: '2027-01-15',
    fundingAmount: '₹10 Lakhs Cash Prize + Government Procurement Priority',
    eligibilitySummary: 'DPIIT-recognized startups that demonstrate exceptional innovation, measurable economic impact, and job generation capabilities.',
    requirements: [
      'Active DPIIT Startup Certificate',
      'Audited financial statements for last fiscal year',
      'Proof of commercial traction or deployment'
    ],
    verificationStatus: 'Verified Official',
    officialSource: 'Startup India DPIIT',
    officialUrl: 'https://www.startupindia.gov.in/content/sih/en/national-startup-awards.html',
    lastVerified: '2026-10-18',
    description: 'Recognizes and rewards outstanding startups and ecosystem enablers that build innovative products or solutions with high potential for employment generation.',
    tags: ['National Award', 'DPIIT', 'Prestige', 'Govt Procurement'],
    matchScore: 75,
    matchReason: 'Excellent visibility and public sector procurement channel once your pilot milestones are verified.'
  }
];

export const INITIAL_FREELANCERS: Freelancer[] = [
  {
    id: 'free-1',
    name: 'Aarav Sharma',
    title: 'Senior Full-Stack & IoT Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Web & App Development',
    skills: ['React', 'Node.js', 'TypeScript', 'MQTT', 'AWS IoT', 'Tailwind CSS', 'PostgreSQL'],
    experienceYears: 7,
    startingPrice: 3500,
    availability: 'Available Now',
    rating: 4.9,
    reviewsCount: 38,
    location: 'Bangalore, India',
    bio: 'Ex-Zoho and early-stage startup engineering lead. I build rapid production-grade MVPs, telemetry dashboards, and cloud integrations for tech founders.',
    portfolio: [
      { title: 'AgriSensor Cloud Telemetry Suite', desc: 'Real-time sensor data pipeline handling 50k packets/min with live dashboard.' },
      { title: 'ClinicFlow EMR SaaS', desc: 'HIPAA-compliant fast telehealth consultation portal for regional doctors.' }
    ],
    services: [
      { title: 'Full MVP Architecture & Fast Deployment', price: 65000, turnaround: '14 Days', description: 'End-to-end web dashboard, database schema, authentication, and secure API deployment.' },
      { title: 'IoT Telemetry Pipeline & REST API', price: 38000, turnaround: '7 Days', description: 'Sensor connection gateway, time-series ingest, and analytics endpoints.' }
    ]
  },
  {
    id: 'free-2',
    name: 'Priyanka Sen',
    title: 'Principal Product & UX Designer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'UI/UX Design',
    skills: ['Figma', 'Design Systems', 'User Research', 'Pitch Decks', 'Interactive Prototyping', 'Mobile UX'],
    experienceYears: 6,
    startingPrice: 2800,
    availability: 'Available Now',
    rating: 5.0,
    reviewsCount: 44,
    location: 'Mumbai, India',
    bio: 'Specialist in converting ambiguous founder ideas into investor-ready Figma designs and user-tested prototypes that drive 2x conversion.',
    portfolio: [
      { title: 'FinFlow B2B NeoBank App', desc: 'Mobile-first treasury management UX that raised $2.4M seed.' },
      { title: 'HealthTriage Patient Experience', desc: 'Multi-lingual triage interface tested with 120 rural clinic workers.' }
    ],
    services: [
      { title: 'Founder MVP Product Design & Figma System', price: 45000, turnaround: '10 Days', description: '15-20 pixel-perfect screens, component library, and interactive prototype for user tests.' },
      { title: 'Investor Pitch Deck & Visual Storytelling', price: 22000, turnaround: '4 Days', description: '12-slide high-impact narrative deck designed to win angel and institutional cheques.' }
    ]
  },
  {
    id: 'free-3',
    name: 'Vikramaditya Roy',
    title: 'Startup Growth Marketer & B2B GTM Strategist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Marketing & Growth',
    skills: ['B2B Lead Gen', 'SEO Strategy', 'Cold Email Automation', 'LinkedIn Growth', 'HubSpot', 'Content Funnels'],
    experienceYears: 5,
    startingPrice: 3000,
    availability: 'Available Next Week',
    rating: 4.8,
    reviewsCount: 29,
    location: 'Gurugram, India',
    bio: 'Helped 18 seed-stage B2B startups acquire their first 100 paying customers through outbound automation and targeted founder content.',
    portfolio: [
      { title: 'Enterprise Cold Outreach Campaign', desc: 'Generated 42 demo calls with FPO leadership within 30 days.' },
      { title: 'Organic Founder Authority Playbook', desc: 'Grew founder LinkedIn from 800 to 24k followers with 15 qualified inbound leads.' }
    ],
    services: [
      { title: '0-to-1 Go-To-Market & Outbound Engine', price: 40000, turnaround: '12 Days', description: 'ICP persona definition, verified 500-lead database, personalized cold sequences, and CRM setup.' },
      { title: 'High-Converting Landing Page Copy & Funnel', price: 18000, turnaround: '5 Days', description: 'Conversion-focused messaging framework tested against target customer objections.' }
    ]
  },
  {
    id: 'free-4',
    name: 'Adv. Meera Chawla',
    title: 'Startup Legal Counsel & Intellectual Property Specialist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Legal & Compliance',
    skills: ['Founders Agreement', 'DPIIT Recognition', 'Patent Drafting', 'Term Sheet Negotiation', 'ESOP Schemes'],
    experienceYears: 9,
    startingPrice: 4000,
    availability: 'Available Now',
    rating: 4.9,
    reviewsCount: 52,
    location: 'New Delhi, India',
    bio: 'Assisted 80+ startups through DPIIT recognition, provisional patent filings, trademark protection, and investor term sheet negotiations.',
    portfolio: [
      { title: 'Hardware Patent Provisional Filing', desc: 'Drafted and secured early priority date for AgriTech IoT sensor hardware.' },
      { title: 'Seed Round Shareholders Agreement (SHA)', desc: 'Negotiated founder-friendly terms for ₹3.5 Cr institutional angel syndicate round.' }
    ],
    services: [
      { title: 'Startup Legal Inception & DPIIT Package', price: 25000, turnaround: '6 Days', description: 'Founders agreement, vesting schedule, NDAs, IP assignment, and DPIIT scheme advisory.' },
      { title: 'Provisional Patent Application Drafting', price: 35000, turnaround: '8 Days', description: 'Comprehensive specification drafting, claims structure, and formal filing support.' }
    ]
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'men-1',
    name: 'Dr. Ramesh Venkatesh',
    title: 'Venture Partner & Ex-CTO at AgriGlobal',
    company: 'Indus Valley Capital',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    expertise: ['AgriTech Commercialization', 'Hardware Scale-up', 'Govt Grant Navigation', 'Seed Fundraising'],
    industries: ['AgriTech', 'ClimateTech', 'IoT'],
    bio: '25+ years in agricultural technology and rural logistics. Former engineering VP who built crop sensors deployed in 12 countries. Angel investor in 9 hardware startups.',
    location: 'Bangalore, India',
    availableFor: ['Grant Strategy Reviews', 'Pitch Polish', 'Pilot Distribution Intros'],
    connectionStatus: 'connected'
  },
  {
    id: 'men-2',
    name: 'Ananya Deshmukh',
    title: 'Founding Partner & 2x HealthTech Founder',
    company: 'CareScale Health Ventures',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    expertise: ['HealthTech Regulations', 'Hospital Partnerships', 'B2B Sales', 'Unit Economics'],
    industries: ['HealthTech', 'MedTech', 'SaaS'],
    bio: 'Scaled a digital pathology venture from zero to ₹40Cr ARR before acquisition in 2023. Deep insight into clinical compliance and hospital buyer cycles.',
    location: 'Mumbai, India',
    availableFor: ['Business Model Audits', 'Clinical Trial Strategy', 'Advisory Board Seats'],
    connectionStatus: 'none'
  },
  {
    id: 'men-3',
    name: 'Karthik Balakrishnan',
    title: 'Principal Partner at SeedSprint',
    company: 'SeedSprint Ventures',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    expertise: ['Pre-Seed Fundraising', 'Y Combinator Prep', 'Product-Market Fit', 'Metrics & Growth'],
    industries: ['AI/DeepTech', 'SaaS', 'B2B Marketplace'],
    bio: 'Led early investments in 32 early-stage startups. Evaluates 500+ pitch decks annually and mentors founders through seed cohort rounds.',
    location: 'San Francisco & Delhi',
    availableFor: ['Mock Investor Pitches', 'Term Sheet Advisory', 'SAFE Note Structuring'],
    connectionStatus: 'pending',
    requestMessage: 'Hi Karthik, I would love your feedback on our AgriPulse AI unit economics before our upcoming angel discussions.'
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Complete Founder Checklist: From Idea to First Paying Pilot',
    category: 'Idea Validation',
    type: 'Checklist',
    readTime: '8 min read',
    description: 'A 24-point tactical roadmap to validate customer willingness-to-pay before writing a single line of backend production code.',
    source: 'SUTRA Editorial',
    tags: ['Validation', 'Checklist', 'Customer Discovery', 'Pilot'],
    completed: true,
    content: `# Complete Founder Checklist: Idea to First Paying Pilot

## Phase 1: Problem Articulation
- [x] Have you spoken with at least 25 prospective users experiencing this pain weekly?
- [x] Can the target customer quantify the monetary or time cost of this problem?
- [ ] Is there an existing workaround they currently pay money or waste hours doing?

## Phase 2: Offer Formulation
- [ ] Write a 1-sentence value proposition: "We help [Target User] achieve [Result] without [Primary Pain Point]."
- [ ] Create a no-code concierge or clickable Figma test before committing to engineering sprints.
- [ ] Secure a non-binding Letter of Intent (LOI) or pre-order deposit from at least 3 pilot partners.

## Phase 3: Pilot Readiness
- [ ] Define the exact Success Metric with the customer (e.g. 15% cost reduction within 30 days).
- [ ] Establish daily/weekly feedback cadence.
- [ ] Agree upfront on commercial pricing upon successful completion of the trial period.`
  },
  {
    id: 'res-2',
    title: 'DPIIT Startup Recognition: Step-by-Step Government Registration Blueprint',
    category: 'Legal and Registration',
    type: 'Guide',
    readTime: '12 min read',
    description: 'Detailed instructions on obtaining DPIIT recognition, accessing Section 80-IAC tax exemptions, fast-track patents, and SISFS seed grant eligibility.',
    source: 'Official Partner',
    tags: ['DPIIT', 'Govt Schemes', 'Tax Exemption', 'Patents'],
    content: `# DPIIT Startup Recognition Blueprint

## 1. Prerequisites
Ensure your entity is incorporated as a Private Limited Company, Registered Partnership, or Limited Liability Partnership (LLP) within the last 10 years.

## 2. Key Documents Needed
1. Certificate of Incorporation / Registration
2. Brief description of your product or service highlighting novelty and commercial scalability
3. Website or working prototype link
4. Details of Directors / Partners

## 3. Benefits Unlocked
- **Tax Exemption:** 3 consecutive years 100% tax holiday under Section 80-IAC.
- **Self-Certification:** Compliance under 9 environmental and labour laws.
- **Fast-Track Patents:** 80% rebate in patent application filing fees.
- **SISFS Eligibility:** Direct eligibility to apply for ₹50L Govt Seed Grants.`
  },
  {
    id: 'res-3',
    title: 'Investor-Ready Financial Model & Unit Economics Calculator',
    category: 'Funding',
    type: 'Template',
    readTime: '15 min read',
    description: 'Interactive financial modeling framework covering Customer Acquisition Cost (CAC), Lifetime Value (LTV), Monthly Burn Rate, and Runway projections.',
    source: 'SUTRA Editorial',
    tags: ['Financial Model', 'Runway', 'CAC', 'LTV', 'Unit Economics'],
    downloadFilename: 'SUTRA_Unit_Economics_Model_v2.xlsx'
  },
  {
    id: 'res-4',
    title: 'The 12-Slide Pitch Deck Formula That Closes Seed Cheques',
    category: 'Funding',
    type: 'Template',
    readTime: '10 min read',
    description: 'Structured slide breakdown used by top accelerator-backed startups: Problem, Solution, Why Now, Market Size, Traction, Team, and The Ask.',
    source: 'SUTRA Editorial',
    tags: ['Pitch Deck', 'Fundraising', 'Venture Capital', 'Angel Investors']
  },
  {
    id: 'res-5',
    title: 'B2B Sales Contract & Service Level Agreement (SLA) Template',
    category: 'Legal and Registration',
    type: 'Template',
    readTime: '9 min read',
    description: 'Standard master services agreement with founder-friendly IP indemnification, payment milestone schedules, and termination clauses.',
    source: 'Official Partner',
    tags: ['Legal', 'Contracts', 'B2B', 'SLA']
  }
];
