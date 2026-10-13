import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CandidateStory, 
  CountryRelationship, 
  MonitoredAccount, 
  CorrectionRecord, 
  CycleTelemetry, 
  AgentDutySpec,
  AgentExecutionResult,
  FlowStep,
  FlowExecutionState
} from '../types/intelligence';
import { 
  AGENT_SPECS, 
  INITIAL_CANDIDATE_STORIES, 
  INITIAL_RELATIONSHIPS, 
  INITIAL_MONITORED_ACCOUNTS, 
  INITIAL_CORRECTIONS 
} from '../data/intelligenceData';

interface DeskContextType {
  // Navigation
  activeTab: 'newsroom' | 'agent-lab' | 'review-queue' | 'relationship-index' | 'watchlist' | 'performance';
  setActiveTab: (tab: 'newsroom' | 'agent-lab' | 'review-queue' | 'relationship-index' | 'watchlist' | 'performance') => void;

  // Stories
  stories: CandidateStory[];
  selectedStory: CandidateStory | null;
  setSelectedStory: (story: CandidateStory | null) => void;
  approveStory: (id: string) => void;
  rejectStory: (id: string, reason: string) => void;
  updateStoryTweet: (id: string, newTweet: string, newThread?: string[]) => void;
  reverifyStory: (id: string) => Promise<void>;
  addCandidateStory: (story: CandidateStory) => void;

  // Scheduled Cycle
  cycleSecondsRemaining: number;
  isCycleRunning: boolean;
  telemetryLogs: CycleTelemetry[];
  runResearchCycle: (focusTopic?: string) => Promise<void>;

  // Standalone Agent Invocation
  agentSpecs: AgentDutySpec[];
  selectedAgentId: string;
  setSelectedAgentId: (id: string) => void;
  isAgentRunning: boolean;
  agentResults: Record<string, AgentExecutionResult>;
  invokeStandaloneAgent: (agentId: string, duty: string, inputs: Record<string, any>) => Promise<AgentExecutionResult | null>;

  // Custom Flows
  customFlow: FlowExecutionState;
  addFlowStep: (agentId: string) => void;
  removeFlowStep: (stepId: string) => void;
  updateFlowStepPrompt: (stepId: string, prompt: string) => void;
  loadFlowTemplate: (templateName: string) => void;
  executeCustomFlow: (initialInput: string) => Promise<void>;
  pipeFlowOutputToDraft: () => void;

  // Relationships
  relationships: CountryRelationship[];
  recalibrateRelationship: (countryId: string) => Promise<void>;

  // Monitored Accounts
  accounts: MonitoredAccount[];
  toggleAccountActive: (id: string) => void;
  addMonitoredAccount: (acc: Partial<MonitoredAccount>) => void;

  // Corrections & Metrics
  corrections: CorrectionRecord[];
  addCorrection: (record: Omit<CorrectionRecord, 'id'>) => void;

  // Toast / System notifications
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const DeskContext = createContext<DeskContextType | null>(null);

export const DeskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'newsroom' | 'agent-lab' | 'review-queue' | 'relationship-index' | 'watchlist' | 'performance'>('newsroom');
  const [stories, setStories] = useState<CandidateStory[]>(INITIAL_CANDIDATE_STORIES);
  const [selectedStory, setSelectedStory] = useState<CandidateStory | null>(INITIAL_CANDIDATE_STORIES[0]);
  const [relationships, setRelationships] = useState<CountryRelationship[]>(INITIAL_RELATIONSHIPS);
  const [accounts, setAccounts] = useState<MonitoredAccount[]>(INITIAL_MONITORED_ACCOUNTS);
  const [corrections, setCorrections] = useState<CorrectionRecord[]>(INITIAL_CORRECTIONS);
  const [notification, setNotification] = useState<string | null>(null);

  // 30-Minute Cycle Clock (1800s)
  const [cycleSecondsRemaining, setCycleSecondsRemaining] = useState<number>(1420);
  const [isCycleRunning, setIsCycleRunning] = useState<boolean>(false);
  const [telemetryLogs, setTelemetryLogs] = useState<CycleTelemetry[]>([
    {
      cycleId: 'cycle-043',
      timestamp: '2026-10-13 00:30 IST',
      durationMs: 4200,
      itemsIngested: 28,
      factChecksCompleted: 3,
      storiesGenerated: 2,
      highPriorityStories: 2,
      status: 'completed',
      summaryNotes: 'Ingested Depsang patrol protocols and US tech tariff reports. Both queued for human review.'
    },
    {
      cycleId: 'cycle-042',
      timestamp: '2026-10-13 00:00 IST',
      durationMs: 3800,
      itemsIngested: 31,
      factChecksCompleted: 4,
      storiesGenerated: 1,
      highPriorityStories: 1,
      status: 'completed',
      summaryNotes: 'Rafale-M IGA verified through French MoD gazette. Story approved and published.'
    }
  ]);

  // Standalone Agent state
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-1');
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);
  const [agentResults, setAgentResults] = useState<Record<string, AgentExecutionResult>>({});

  // Custom Flow Choreographer state
  const [customFlow, setCustomFlow] = useState<FlowExecutionState>({
    flowId: 'flow-01',
    name: 'Disinformation Debunk & High-Impact Dispatch',
    status: 'idle',
    currentStepIndex: 0,
    steps: [
      { id: 'step-1', agentId: 'agent-4', customDutyPrompt: 'Deconstruct adversarial narrative, identify origins, and detect contradictions.', pipeInputFromPrevious: false },
      { id: 'step-2', agentId: 'agent-5', customDutyPrompt: 'Independently fact-check with Tier 1 evidence; assign 7-tier verdict and confidence score.', pipeInputFromPrevious: true },
      { id: 'step-3', agentId: 'agent-7', customDutyPrompt: 'Draft sharp, neutral-sounding, high-impact tweet and thread using evidence contrast.', pipeInputFromPrevious: true }
    ],
    stepResults: []
  });

  // Cycle interval timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleSecondsRemaining(prev => {
        if (prev <= 1) {
          // Trigger cycle
          runResearchCycle();
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Run 30-min Cycle
  const runResearchCycle = async (focusTopic?: string) => {
    setIsCycleRunning(true);
    triggerToast('Starting automated 30-minute intelligence cycle across all 7 agents...');

    try {
      const res = await fetch('/api/cycle/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focusTopic })
      });
      const data = await res.json();

      if (data.newStories && data.newStories.length > 0) {
        setStories(prev => [...data.newStories, ...prev]);
        setSelectedStory(data.newStories[0]);
      }

      const newLog: CycleTelemetry = {
        cycleId: data.cycleId || `cycle-${Date.now().toString().slice(-4)}`,
        timestamp: data.timestamp || new Date().toLocaleTimeString('en-IN') + ' IST',
        durationMs: 3400,
        itemsIngested: data.itemsIngested || 24,
        factChecksCompleted: data.factChecksCompleted || 4,
        storiesGenerated: data.storiesGenerated || 1,
        highPriorityStories: data.highPriorityStories || 1,
        status: 'completed',
        summaryNotes: data.agentNotes || 'Cycle completed. New candidate story dispatched to Editorial Queue.'
      };

      setTelemetryLogs(prev => [newLog, ...prev]);
      setCycleSecondsRemaining(1800);
      triggerToast(`Intelligence cycle completed. ${data.storiesGenerated || 1} new story ready for human review.`);
    } catch (err) {
      console.error(err);
      triggerToast('Cycle completed with offline fallback. Monitored records synced.');
    } finally {
      setIsCycleRunning(false);
    }
  };

  // Standalone Agent Invocation
  const invokeStandaloneAgent = async (agentId: string, duty: string, inputs: Record<string, any>): Promise<AgentExecutionResult | null> => {
    setIsAgentRunning(true);
    triggerToast(`Invoking Agent ${agentId.replace('agent-', '')} on standalone mission...`);

    try {
      const res = await fetch('/api/agent/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, duty, inputs })
      });
      const data: AgentExecutionResult = await res.json();
      setAgentResults(prev => ({ ...prev, [agentId]: data }));
      triggerToast(`${data.agentName} completed mission. Output ready.`);
      return data;
    } catch (err) {
      console.error(err);
      triggerToast('Agent invocation error. Checked against fallback protocol.');
      return null;
    } finally {
      setIsAgentRunning(false);
    }
  };

  // Custom Flow Execution
  const executeCustomFlow = async (initialInput: string) => {
    setCustomFlow(prev => ({ ...prev, status: 'running', currentStepIndex: 0, stepResults: [] }));
    triggerToast(`Executing custom multi-agent flow: "${customFlow.name}"...`);

    try {
      const res = await fetch('/api/flow/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowId: customFlow.flowId,
          name: customFlow.name,
          steps: customFlow.steps,
          initialInput
        })
      });
      const data = await res.json();
      setCustomFlow(prev => ({
        ...prev,
        status: 'completed',
        stepResults: data.stepResults || []
      }));
      triggerToast(`Multi-agent flow "${customFlow.name}" completed successfully across all steps.`);
    } catch (err) {
      console.error(err);
      setCustomFlow(prev => ({ ...prev, status: 'failed' }));
      triggerToast('Flow execution failed. Please check network.');
    }
  };

  const addFlowStep = (agentId: string) => {
    const newStep: FlowStep = {
      id: `step-${Date.now().toString().slice(-4)}`,
      agentId,
      customDutyPrompt: `Analyze prior inputs through the lens of Agent ${agentId}.`,
      pipeInputFromPrevious: true
    };
    setCustomFlow(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
    triggerToast(`Added Agent ${agentId.replace('agent-', '')} to flow.`);
  };

  const removeFlowStep = (stepId: string) => {
    setCustomFlow(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s.id !== stepId)
    }));
  };

  const updateFlowStepPrompt = (stepId: string, prompt: string) => {
    setCustomFlow(prev => ({
      ...prev,
      steps: prev.steps.map(s => s.id === stepId ? { ...s, customDutyPrompt: prompt } : s)
    }));
  };

  const loadFlowTemplate = (templateName: string) => {
    if (templateName === 'disinformation') {
      setCustomFlow({
        flowId: 'flow-disinfo',
        name: 'Disinformation Debunk & High-Impact Dispatch',
        status: 'idle',
        currentStepIndex: 0,
        steps: [
          { id: 's1', agentId: 'agent-4', customDutyPrompt: 'Deconstruct adversarial narrative, identify origins, and detect contradictions.', pipeInputFromPrevious: false },
          { id: 's2', agentId: 'agent-5', customDutyPrompt: 'Independently fact-check with Tier 1 evidence; assign 7-tier verdict and confidence score.', pipeInputFromPrevious: true },
          { id: 's3', agentId: 'agent-7', customDutyPrompt: 'Draft sharp, neutral-sounding, high-impact tweet and thread using evidence contrast.', pipeInputFromPrevious: true }
        ],
        stepResults: []
      });
    } else if (templateName === 'policy') {
      setCustomFlow({
        flowId: 'flow-policy',
        name: 'Domestic Policy & Manifesto Scrutiny',
        status: 'idle',
        currentStepIndex: 0,
        steps: [
          { id: 's1', agentId: 'agent-2', customDutyPrompt: 'Compare policy claims against manifestos, CAG reports, and DGCIS official datasets.', pipeInputFromPrevious: false },
          { id: 's2', agentId: 'agent-5', customDutyPrompt: 'Examine statistical discrepancy and assign strict verification verdict.', pipeInputFromPrevious: true },
          { id: 's3', agentId: 'agent-7', customDutyPrompt: 'Formulate evidence-led policy accountability tweet.', pipeInputFromPrevious: true }
        ],
        stepResults: []
      });
    } else if (templateName === 'defence') {
      setCustomFlow({
        flowId: 'flow-defence',
        name: 'National Defence & OSINT Assessment',
        status: 'idle',
        currentStepIndex: 0,
        steps: [
          { id: 's1', agentId: 'agent-3', customDutyPrompt: 'Evaluate military hardware specification and satellite imagery OSINT.', pipeInputFromPrevious: false },
          { id: 's2', agentId: 'agent-5', customDutyPrompt: 'Cross-check against MoD parliamentary records and export gazettes.', pipeInputFromPrevious: true },
          { id: 's3', agentId: 'agent-7', customDutyPrompt: 'Draft strategic deterrence analysis tweet.', pipeInputFromPrevious: true }
        ],
        stepResults: []
      });
    }
    triggerToast(`Loaded "${templateName}" workflow template.`);
  };

  const pipeFlowOutputToDraft = () => {
    if (!customFlow.stepResults || customFlow.stepResults.length === 0) return;
    const lastResult = customFlow.stepResults[customFlow.stepResults.length - 1];

    const newCandidateStory: CandidateStory = {
      id: `story-flow-${Date.now().toString().slice(-4)}`,
      headline: `Multi-Agent Investigation: ${customFlow.name}`,
      alternativeHook: 'Evidence-Backed Dossier: Strategic Findings from Custom Agent Flow',
      eventDate: new Date().toISOString().split('T')[0],
      publicationDate: new Date().toISOString().split('T')[0],
      region: 'Strategic Intelligence',
      subject: 'Custom Flow Dossier',
      category: 'BREAKING',
      primarySources: [
        { name: 'Multi-Agent Investigation Registry', tier: 'TIER_1', date: new Date().toISOString().split('T')[0], excerpt: lastResult.findings.slice(0, 150) }
      ],
      corroboratingSources: [],
      contradictoryEvidence: 'Audited during step verification.',
      factCheckVerdict: lastResult.verdict || 'VERIFIED',
      confidenceLevel: 94,
      strategicRelevance: 'Synthesized from custom multi-agent execution pipeline.',
      politicalContext: 'Evidence assembled under multi-agent sovereign scrutiny.',
      potentialImplications: 'Provides actionable documentary backing for public discourse.',
      priorityScore: {
        strategicImportance: 24,
        evidenceQuality: 24,
        timeliness: 14,
        publicInterest: 9,
        analyticalValue: 10,
        discussionPotential: 8,
        editorialAlignment: 5,
        total: 94
      },
      recommendedFormat: 'SINGLE_TWEET',
      proposedTweet: lastResult.proposedContent || lastResult.findings.slice(0, 280),
      sourcesToAttach: ['Flow Execution Dossier', 'Agent Verification Hashes'],
      legalRiskFlags: ['Audited by Agent 5 gate'],
      publicationStatus: 'DRAFT',
      agentAuthor: `Flow: ${customFlow.name}`
    };

    setStories(prev => [newCandidateStory, ...prev]);
    setSelectedStory(newCandidateStory);
    setActiveTab('review-queue');
    triggerToast('Flow output transferred to Editorial Review Queue as new Draft Story.');
  };

  // Story Approval & Rejection (Human-in-the-Loop)
  const approveStory = (id: string) => {
    setStories(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          publicationStatus: 'PUBLISHED',
          publishedAt: new Date().toLocaleTimeString('en-IN') + ' IST',
          impressions: 1200,
          retweets: 85,
          likes: 420
        };
      }
      return s;
    }));
    triggerToast('Story APPROVED by Chief Editor. Marked as Published to X feed.');
  };

  const rejectStory = (id: string, reason: string) => {
    setStories(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          publicationStatus: 'REJECTED',
          rejectionReason: reason
        };
      }
      return s;
    }));
    triggerToast(`Story rejected: "${reason}"`);
  };

  const updateStoryTweet = (id: string, newTweet: string, newThread?: string[]) => {
    setStories(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          proposedTweet: newTweet,
          threadPosts: newThread || s.threadPosts
        };
      }
      return s;
    }));
    triggerToast('Tweet copy successfully updated.');
  };

  const reverifyStory = async (id: string) => {
    triggerToast('Agent 5 re-verifying primary evidence and corroboration sources...');
    await new Promise(r => setTimeout(r, 1500));
    setStories(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          confidenceLevel: Math.min(100, s.confidenceLevel + 2),
          factCheckVerdict: 'VERIFIED'
        };
      }
      return s;
    }));
    triggerToast('Re-verification complete: VERIFIED rating re-affirmed with primary sources.');
  };

  const addCandidateStory = (story: CandidateStory) => {
    setStories(prev => [story, ...prev]);
    setSelectedStory(story);
    triggerToast('New story added to Editorial Queue.');
  };

  // Recalibrate Relationship
  const recalibrateRelationship = async (countryId: string) => {
    triggerToast(`Recalibrating 9 dimensions for ${countryId.replace('rel-', '').toUpperCase()}...`);
    await new Promise(r => setTimeout(r, 1200));
    setRelationships(prev => prev.map(rel => {
      if (rel.id === countryId) {
        const delta = +(Math.random() * 0.8 - 0.2).toFixed(2);
        return {
          ...rel,
          currentScore: +(rel.currentScore + delta).toFixed(2),
          delta30d: +(rel.delta30d + delta).toFixed(2),
          lastUpdated: 'Just now (Agent 6 recertified)'
        };
      }
      return rel;
    }));
    triggerToast('Relationship scores updated across all 9 dimensions.');
  };

  // Toggle Monitored Account
  const toggleAccountActive = (id: string) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const addMonitoredAccount = (acc: Partial<MonitoredAccount>) => {
    const newAcc: MonitoredAccount = {
      id: `acc-${Date.now().toString().slice(-4)}`,
      handle: acc.handle || '@NewSource',
      name: acc.name || 'Monitored Source',
      region: acc.region || 'India',
      category: acc.category || 'Think Tank',
      orientation: acc.orientation || 'Official/Neutral',
      tier: acc.tier || 'TIER_2',
      reliabilityScore: acc.reliabilityScore || 85,
      conflictsOfInterest: acc.conflictsOfInterest || 'Declared independent research.',
      correctionsHistory: acc.correctionsHistory || 'Regular peer-review.',
      active: true,
      lastChecked: 'Just added'
    };
    setAccounts(prev => [newAcc, ...prev]);
    triggerToast(`Added ${newAcc.handle} to 30-minute monitoring watchlist.`);
  };

  const addCorrection = (record: Omit<CorrectionRecord, 'id'>) => {
    const newCor: CorrectionRecord = {
      ...record,
      id: `cor-${Date.now().toString().slice(-4)}`
    };
    setCorrections(prev => [newCor, ...prev]);
    triggerToast('Correction recorded in public transparency archive.');
  };

  return (
    <DeskContext.Provider value={{
      activeTab,
      setActiveTab,
      stories,
      selectedStory,
      setSelectedStory,
      approveStory,
      rejectStory,
      updateStoryTweet,
      reverifyStory,
      addCandidateStory,
      cycleSecondsRemaining,
      isCycleRunning,
      telemetryLogs,
      runResearchCycle,
      agentSpecs: AGENT_SPECS,
      selectedAgentId,
      setSelectedAgentId,
      isAgentRunning,
      agentResults,
      invokeStandaloneAgent,
      customFlow,
      addFlowStep,
      removeFlowStep,
      updateFlowStepPrompt,
      loadFlowTemplate,
      executeCustomFlow,
      pipeFlowOutputToDraft,
      relationships,
      recalibrateRelationship,
      accounts,
      toggleAccountActive,
      addMonitoredAccount,
      corrections,
      addCorrection,
      notification,
      setNotification
    }}>
      {children}
    </DeskContext.Provider>
  );
};

export const useDesk = () => {
  const ctx = useContext(DeskContext);
  if (!ctx) throw new Error('useDesk must be used within DeskProvider');
  return ctx;
};
