export type FactCheckVerdict = 
  | 'VERIFIED'
  | 'MOSTLY TRUE'
  | 'MISLEADING'
  | 'UNSUPPORTED'
  | 'FALSE'
  | 'DISPUTED'
  | 'UNVERIFIED BREAKING';

export type PublicationStatus = 
  | 'DRAFT'
  | 'NEEDS_RESEARCH'
  | 'APPROVED'
  | 'REJECTED'
  | 'PUBLISHED';

export type StoryFormat = 
  | 'SINGLE_TWEET'
  | 'THREAD_EXPLAINER'
  | 'ROUNDUP'
  | 'MONITOR_ONLY';

export type StoryCategory = 
  | 'BREAKING'
  | 'POLITICAL_ACCOUNTABILITY'
  | 'DEFENCE_INTEL'
  | 'RELATIONSHIP_ANALYSIS'
  | 'MEDIA_SCRUTINY'
  | 'WEEKLY_REVIEW';

export type SourceTier = 'TIER_1' | 'TIER_2' | 'TIER_3';

export interface SourceReference {
  name: string;
  url?: string;
  tier: SourceTier;
  date: string;
  excerpt?: string;
}

export interface PriorityScoreBreakdown {
  strategicImportance: number; // max 25
  evidenceQuality: number;      // max 25
  timeliness: number;          // max 15
  publicInterest: number;      // max 10
  analyticalValue: number;     // max 10
  discussionPotential: number; // max 10
  editorialAlignment: number;  // max 5
  total: number;               // 0 - 100
}

export interface CandidateStory {
  id: string;
  headline: string;
  alternativeHook: string;
  eventDate: string;
  publicationDate: string;
  region: string;
  subject: string;
  category: StoryCategory;
  primarySources: SourceReference[];
  corroboratingSources: SourceReference[];
  contradictoryEvidence: string;
  factCheckVerdict: FactCheckVerdict;
  confidenceLevel: number; // 0 - 100
  strategicRelevance: string;
  politicalContext: string;
  potentialImplications: string;
  priorityScore: PriorityScoreBreakdown;
  recommendedFormat: StoryFormat;
  proposedTweet: string;
  threadPosts?: string[];
  sourcesToAttach: string[];
  legalRiskFlags: string[];
  publicationStatus: PublicationStatus;
  rejectionReason?: string;
  agentAuthor: string;
  cycleId?: string;
  publishedAt?: string;
  impressions?: number;
  retweets?: number;
  likes?: number;
}

export interface MonitoredAccount {
  id: string;
  handle: string;
  name: string;
  avatar?: string;
  region: string;
  category: 'Government' | 'Wire Service' | 'Independent Journalist' | 'Defence Analyst' | 'Think Tank' | 'Business' | 'Political' | 'State Media';
  orientation: 'Center-Right' | 'Center-Left' | 'Nationalist' | 'Liberal' | 'Official/Neutral' | 'Adversarial/State Media';
  tier: SourceTier;
  reliabilityScore: number; // 0 - 100
  conflictsOfInterest: string;
  correctionsHistory: string;
  active: boolean;
  lastChecked: string;
}

export interface RelationshipDimensions {
  diplomatic: number;       // weight 15%
  trade: number;            // weight 15%
  defence: number;          // weight 15%
  strategic: number;        // weight 15%
  leadership: number;       // weight 10%
  cultural: number;         // weight 10%
  techEnergy: number;       // weight 10%
  neighbourhood: number;    // weight 5%
  ideological: number;      // weight 5%
}

export interface CountryRelationship {
  id: string;
  country: string;
  code: string;
  flag: string;
  currentScore: number;
  previousScore: number;
  delta30d: number;
  delta90d: number;
  dimensions: RelationshipDimensions;
  strongestDimensions: string[];
  weakestDimensions: string[];
  recentPositiveDevelopments: string[];
  recentNegativeDevelopments: string[];
  keyDependencies: string[];
  strategicVulnerabilities: string[];
  supportingSources: string[];
  confidenceRating: number;
  unresolvedQuestions: string;
  lastUpdated: string;
}

export interface AgentDutySpec {
  id: string;
  agentNumber: number;
  name: string;
  codename: string;
  role: string;
  description: string;
  iconName: string;
  defaultInputs: {
    label: string;
    key: string;
    placeholder: string;
    defaultValue?: string;
  }[];
}

export interface AgentExecutionResult {
  agentId: string;
  agentName: string;
  timestamp: string;
  duty: string;
  inputs: Record<string, any>;
  thinkingProcess: string[];
  outputData: Record<string, any>;
  findings: string;
  sourcesFound?: SourceReference[];
  verdict?: FactCheckVerdict;
  score?: number;
  riskAssessment?: string[];
  proposedContent?: string;
}

export interface FlowStep {
  id: string;
  agentId: string;
  customDutyPrompt?: string;
  pipeInputFromPrevious: boolean;
}

export interface FlowExecutionState {
  flowId: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  currentStepIndex: number;
  steps: FlowStep[];
  stepResults: AgentExecutionResult[];
}

export interface CycleTelemetry {
  cycleId: string;
  timestamp: string;
  durationMs: number;
  itemsIngested: number;
  factChecksCompleted: number;
  storiesGenerated: number;
  highPriorityStories: number;
  status: 'completed' | 'in_progress' | 'failed';
  summaryNotes: string;
}

export interface CorrectionRecord {
  id: string;
  originalPostId: string;
  originalPostText: string;
  publishedDate: string;
  correctionDate: string;
  reason: string;
  correctiveActionTaken: string;
  internalAuditNotes: string;
}
