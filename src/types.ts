export interface AgencyService {
  id: string;
  name: string;
  category: 'Voice' | 'Support' | 'Outbound' | 'Internal RAG' | 'Vision/Docs' | 'Fine-tuning';
  description: string;
  setupFee: number;
  monthlyRetainer: number;
  deliveryWeeks: number;
  featured: boolean;
  active: boolean;
}

export interface AgencyProfile {
  name: string;
  logoUrl?: string;
  tagline: string;
  niche: string;
  foundedYear: string;
  location: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  services: AgencyService[];
  proofMetrics: {
    label: string;
    value: string;
    context: string;
  }[];
  caseStudies: {
    client: string;
    industry: string;
    metric: string;
    resultSummary: string;
    deliveredIn: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
}

export interface ProposalData {
  proposalTitle: string;
  clientName: string;
  clientIndustry?: string;
  executiveSummary: string;
  coreObjectives: string[];
  deliverables: {
    phase: string;
    duration: string;
    items: string[];
  }[];
  investmentBreakdown: {
    setupFee: string;
    monthlyRetainer: string;
    estimatedAnnualSavings: string;
    projectedRoi: string;
  };
  slaAndSupport: string;
  nextSteps: string[];
}

export interface AgentBlueprint {
  agentName: string;
  version: string;
  systemInstruction: string;
  toneAndManner: string;
  toolsSchema: {
    name: string;
    description: string;
    parameters: string[];
  }[];
  escalationCriteria: string[];
  testScenarios: {
    scenario: string;
    sampleUserMessage: string;
    expectedAgentAction: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolInvocations?: string[];
}
