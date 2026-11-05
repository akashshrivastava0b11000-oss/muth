import { AssessmentResult, StartupStage, Venture } from '../types';

export interface AssessmentQuestion {
  id: string;
  categoryKey: keyof AssessmentResult['categoryScores'];
  categoryLabel: string;
  question: string;
  description: string;
  options: {
    label: string;
    score: number;
    feedbackTip?: string;
  }[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 1. Problem and Solution
  {
    id: 'q1',
    categoryKey: 'problemSolution',
    categoryLabel: '1. Problem & Solution',
    question: 'How deeply has the core customer pain point been verified?',
    description: 'A venture succeeds when it solves a hair-on-fire problem with measurable value.',
    options: [
      { label: 'We have an intuition/idea but have not yet interviewed real prospects', score: 25, feedbackTip: 'Prioritize customer discovery conversations immediately.' },
      { label: 'Spoke with 10-20 potential users who confirmed the friction', score: 60, feedbackTip: 'Good start. Deepen interviews to calculate the exact dollar/hour cost of the pain.' },
      { label: 'Validated with 30+ users and have written commitment / letters of intent', score: 90, feedbackTip: 'Strong problem-solution validation foundation.' },
      { label: 'Customer problem actively being solved with paying beta/pilot customers', score: 100, feedbackTip: 'Exceptional evidence of genuine demand.' }
    ]
  },
  // 2. Target Customers
  {
    id: 'q2',
    categoryKey: 'targetCustomers',
    categoryLabel: '2. Target Customers',
    question: 'How specific is your Ideal Customer Profile (ICP)?',
    description: 'Targeting everyone means targeting no one. Who is the exact decision maker?',
    options: [
      { label: 'Broad market (e.g. "Anyone who wants to eat healthy or buy online")', score: 30, feedbackTip: 'Narrow down to a beachhead customer segment with acute urgency.' },
      { label: 'Defined demographic or sector, but still discovering user buyer habits', score: 65, feedbackTip: 'Map the decision maker vs the budget controller.' },
      { label: 'Pinpointed ICP with explicit title, budget authority, and purchasing trigger', score: 95, feedbackTip: 'Precise segmentation allows high-conversion outbound and marketing.' }
    ]
  },
  // 3. Market & Competition
  {
    id: 'q3',
    categoryKey: 'marketCompetition',
    categoryLabel: '3. Market & Competition',
    question: 'What is your competitive moat or defensible wedge?',
    description: 'Why will customers choose you over legacy workarounds, spreadsheets, or incumbents?',
    options: [
      { label: 'We are cheaper or have a cleaner UI', score: 35, feedbackTip: 'Pricing is rarely a durable moat. Build proprietary workflows or network effects.' },
      { label: 'Specific feature differentiator and localized customer relationships', score: 70, feedbackTip: 'Ensure competitors cannot replicate within 2-3 sprints.' },
      { label: 'Proprietary IP/algorithms, regulatory license, or high switching cost network', score: 95, feedbackTip: 'Strong defensibility against well-funded incumbents.' }
    ]
  },
  // 4. Business Model
  {
    id: 'q4',
    categoryKey: 'businessModel',
    categoryLabel: '4. Business Model',
    question: 'How validated is your monetization and pricing structure?',
    description: 'Unit economics dictate whether your startup can survive and scale.',
    options: [
      { label: 'Undecided or planning to monetize only after achieving mass users', score: 20, feedbackTip: 'Early stage startups must validate willingness-to-pay early.' },
      { label: 'Estimated pricing based on competitor analysis; no transactions yet', score: 55, feedbackTip: 'Test pricing directly in customer discovery calls with pre-orders.' },
      { label: 'Closed paying customers or secured pre-orders proving willingness to pay', score: 95, feedbackTip: 'Demonstrates proven customer value exchange.' }
    ]
  },
  // 5. Financial Planning
  {
    id: 'q5',
    categoryKey: 'financialPlanning',
    categoryLabel: '5. Financial Planning',
    question: 'What is your current runway and capital requirement clarity?',
    description: 'Cash is the oxygen of an early-stage startup.',
    options: [
      { label: 'Less than 3 months runway and no detailed budget model', score: 30, feedbackTip: 'High financial fragility. Reduce personal burn or seek bridge grants.' },
      { label: '6-12 months runway with line-item budget for milestones', score: 80, feedbackTip: 'Adequate breathing room to hit validation milestones.' },
      { label: '12+ months runway or cashflow positive on early revenues', score: 100, feedbackTip: 'High financial resilience.' }
    ]
  },
  // 6. Team & Capabilities
  {
    id: 'q6',
    categoryKey: 'teamCapabilities',
    categoryLabel: '6. Team & Capabilities',
    question: 'Does the founding team possess full-stack execution capability for this idea?',
    description: 'Investors back founders who have unfair technical and domain advantages.',
    options: [
      { label: 'Solo founder without technical or domain skills, relying entirely on agencies', score: 35, feedbackTip: 'Consider finding a technical co-founder or dedicated domain advisor.' },
      { label: 'Co-founders with complementary technical and business backgrounds', score: 90, feedbackTip: 'Optimal founder balance for rapid iteration.' },
      { label: 'Experienced founding team with prior startup exits or deep sector patents', score: 100, feedbackTip: 'Elite founder-market fit.' }
    ]
  },
  // 7. Product Development
  {
    id: 'q7',
    categoryKey: 'productDev',
    categoryLabel: '7. Product Development',
    question: 'What is the current technical state of your product or prototype?',
    description: 'Execution speed separates winning founders from dreamers.',
    options: [
      { label: 'Concept sketches or conceptual slide deck only', score: 30, feedbackTip: 'Build an interactive mockup or no-code pilot to show users.' },
      { label: 'Clickable wireframe / Figma prototype undergoing usability testing', score: 65, feedbackTip: 'Fast progress. Prepare minimal technical spec for v1 build.' },
      { label: 'Functional MVP deployed and actively used in beta trials', score: 95, feedbackTip: 'Real user feedback loop established.' }
    ]
  },
  // 8. Execution & Traction
  {
    id: 'q8',
    categoryKey: 'executionTraction',
    categoryLabel: '8. Execution & Traction',
    question: 'What measurable traction or momentum have you generated?',
    description: 'Evidence of progress is the single biggest predictor of seed funding.',
    options: [
      { label: 'No public deployment or user signups yet', score: 30, feedbackTip: 'Set up an early access waitlist or launch 5 targeted pilot tests.' },
      { label: 'Waitlist of 100+ prospects or active trial with 2-5 pilot partners', score: 75, feedbackTip: 'Convert pilot usage into quantified case studies.' },
      { label: 'Consistent week-over-week user or revenue growth metrics', score: 95, feedbackTip: 'Clear validation of growth flywheel.' }
    ]
  },
  // 9. Legal & Compliance
  {
    id: 'q9',
    categoryKey: 'legalCompliance',
    categoryLabel: '9. Legal & Compliance Readiness',
    question: 'What is your corporate incorporation and legal readiness status?',
    description: 'Clean cap tables and regulatory compliance are essential for government grants and angel checks.',
    options: [
      { label: 'Unregistered informal partnership / idea stage', score: 40, feedbackTip: 'Incorporate as a Pvt Ltd or LLP to unlock DPIIT recognition and grants.' },
      { label: 'Incorporated entity with founders agreement in place', score: 80, feedbackTip: 'Ready for DPIIT registration and angel syndicate paperwork.' },
      { label: 'DPIIT recognized, IP assigned to company, clean cap table and compliance', score: 100, feedbackTip: 'Fully eligible for SISFS, TIDE 2.0, and tax holidays.' }
    ]
  }
];

export function evaluateAssessment(
  venture: Venture,
  answers: Record<string, number>,
  isAiAssisted: boolean = false
): AssessmentResult {
  const categoryScores = {
    problemSolution: answers['q1'] || 50,
    targetCustomers: answers['q2'] || 50,
    marketCompetition: answers['q3'] || 50,
    businessModel: answers['q4'] || 50,
    financialPlanning: answers['q5'] || 50,
    teamCapabilities: answers['q6'] || 50,
    productDev: answers['q7'] || 50,
    executionTraction: answers['q8'] || 50,
    legalCompliance: answers['q9'] || 50,
  };

  const scoresArray = Object.values(categoryScores);
  const total = scoresArray.reduce((acc, curr) => acc + curr, 0);
  const overallScore = Math.round(total / scoresArray.length);

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingInfo: string[] = [];
  const nextSteps: string[] = [];

  // Problem & solution
  if (categoryScores.problemSolution >= 80) {
    strengths.push('Demonstrated deep problem-solution validation with actual prospect commitments.');
  } else {
    weaknesses.push('Problem validation is primarily anecdotal; needs documented quantitative cost discovery.');
    nextSteps.push('Conduct 15 structured customer discovery calls focusing on willingness-to-pay.');
  }

  // Business model
  if (categoryScores.businessModel >= 80) {
    strengths.push('Clear monetization mechanism supported by empirical transaction or pre-order data.');
  } else {
    weaknesses.push('Monetization model relies on unvalidated competitor assumptions.');
    nextSteps.push('Define a pilot pricing model and test deposit requests on next 3 prospect calls.');
  }

  // Legal & compliance
  if (categoryScores.legalCompliance >= 80) {
    strengths.push('Strong corporate governance readiness (DPIIT / incorporation alignment).');
  } else {
    risks.push('Unincorporated entity or missing IP assignment poses liability and disqualifies from government seed grants.');
    nextSteps.push('Complete DPIIT startup recognition to become eligible for the ₹50L SISFS grant.');
  }

  // Team
  if (categoryScores.teamCapabilities >= 80) {
    strengths.push('Well-balanced founding team with in-house technical and domain execution.');
  } else {
    risks.push('Single point of failure in technical architecture or product execution.');
    missingInfo.push('Key hire roadmap or co-founder equity allocation structure.');
  }

  // Traction
  if (categoryScores.executionTraction >= 75) {
    strengths.push('Measurable traction milestones established with pilot users.');
  } else {
    weaknesses.push('Early momentum needs faster feedback loops with active beta participants.');
  }

  // Financial Runway
  if (categoryScores.financialPlanning < 60) {
    risks.push('Runway risk: Capital constraints may force premature pivots without disciplined budgeting.');
    nextSteps.push('Construct a 12-month zero-based runway forecast and apply for non-dilutive grants.');
  }

  const suggestedResourceIds = ['res-1', 'res-2', 'res-3'];
  const relevantOpportunityIds = ['opp-1', 'opp-3', 'opp-6'];

  const summary = `Based on SUTRA's ${isAiAssisted ? 'AI Analysis' : 'Venture Diagnostic Engine'}, ${venture.name} demonstrates an indicative readiness score of ${overallScore}/100 for the ${venture.stage.toUpperCase()} stage. Key strengths lie in your execution domain, while your immediate growth unlocks require formalized DPIIT registration and structured pilot monetization testing.`;

  return {
    id: `assess-${Date.now()}`,
    ventureId: venture.id,
    createdAt: new Date().toISOString(),
    overallScore,
    categoryScores,
    strengths,
    weaknesses,
    risks,
    missingInfo,
    nextSteps,
    suggestedResourceIds,
    relevantOpportunityIds,
    answers,
    summary
  };
}
