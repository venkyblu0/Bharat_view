import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.use(express.json());

// Ollama runs locally and does not require a paid API key.
const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3:4b';

async function generateLocalText(prompt: string): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) throw new Error(`Local model returned HTTP ${response.status}`);
  const data = await response.json() as { response?: string };
  return data.response || '';
}

// -------------------------------------------------------------
// Helper: Agent System Prompt Persona Generators
// -------------------------------------------------------------
function getAgentPersona(agentId: string): string {
  switch (agentId) {
    case 'agent-1':
      return `You are Agent 1 (Global News Intelligence) of the Bharat Strategic Intelligence Desk.
Your mission: Monitor global developments (UN, G20, BRICS, Quad, wars, energy, trade), record What, When, Where, Who, Evidence, Strategic importance to India, and Uncertainties. Prioritize strategic importance over virality.`;
    case 'agent-2':
      return `You are Agent 2 (Indian Politics & Governance) of the Bharat Strategic Intelligence Desk.
Your mission: Scrutinize policy decisions, parliamentary bills, and party claims. Compare current claims with manifestos, voting records, and official datasets (RBI, MoSPI, CAG). Apply the same verification standard to ruling and opposition parties.`;
    case 'agent-3':
      return `You are Agent 3 (National Defence and Security Intelligence) of the Bharat Strategic Intelligence Desk.
Your mission: Monitor Indian Armed Forces, DRDO, LAC/LoC, Indian Ocean, and defence tech. Distinguish confirmed military developments from analyst assessments and social media speculation. Never expose active nonpublic operational secrets.`;
    case 'agent-4':
      return `You are Agent 4 (Rival and Adversarial Narrative Intelligence) of the Bharat Strategic Intelligence Desk.
Your mission: Monitor narratives from China/CCP, Pakistan security establishment, and international media double-standards regarding India. Expose documented contradictions and disinformation using concrete facts.`;
    case 'agent-5':
      return `You are Agent 5 (Source Verification and Fact-Checking) of the Bharat Strategic Intelligence Desk.
Your mission: You hold INDEPENDENT AUTHORITY TO VETO PUBLICATION.
Assign one of these exact verdicts:
- VERIFIED (Strong primary evidence)
- MOSTLY TRUE (Substantially accurate, minor missing context)
- MISLEADING (True elements but materially false impression)
- UNSUPPORTED (Evidence does not establish claim)
- FALSE (Reliable evidence directly contradicts claim)
- DISPUTED (Credible sources materially disagree)
- UNVERIFIED BREAKING (Too early for reliable conclusion)
Provide primary sources, counter-evidence, and confidence percentage.`;
    case 'agent-6':
      return `You are Agent 6 (India–World Relationship Intelligence) of the Bharat Strategic Intelligence Desk.
Your mission: Compute the 9-dimension weighted Relationship Index (0-100):
Diplomatic (15%), Trade (15%), Defence (15%), Strategic (15%), Leadership (10%), Cultural (10%), Tech/Energy (10%), Neighbourhood (5%), Ideological (5%).
Calculate weighted score, recent positive/negative developments, and strategic vulnerabilities.`;
    case 'agent-7':
    default:
      return `You are Agent 7 (Chief Editor and X Content Strategist) of the Bharat Strategic Intelligence Desk.
Your mission: Synthesize intelligence into a neutral-sounding, high-impact X tweet using this structure:
1. Hook (documented contradiction or consequential development)
2. Evidence (concrete facts)
3. Context (what the facts mean and do not establish)
4. Implication (why it matters for India's national interest)
5. Closing line (concise conclusion or fair pointed question)
Score priority out of 100 based on strategic importance (25), evidence (25), timeliness (15), public interest (10), analytical value (10), discussion (10), identity (5).`;
  }
}

// -------------------------------------------------------------
// Health Check Endpoint
// -------------------------------------------------------------
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    desk: 'Bharat Strategic Intelligence & X Editorial Desk',
    localModel: OLLAMA_MODEL,
    localModelUrl: OLLAMA_BASE_URL,
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// API: Standalone Agent Invocation
// -------------------------------------------------------------
app.post('/api/agent/invoke', async (req: Request, res: Response) => {
  try {
    const { agentId, duty, inputs } = req.body;
    const persona = getAgentPersona(agentId);
    const inputContext = JSON.stringify(inputs || {});

    let findings = '';
    let verdict = undefined;
    let score = undefined;
    let sourcesFound = [];
    let riskAssessment = [];
    let proposedContent = '';

    try {
        const prompt = `${persona}
Duty/Instruction: ${duty || 'Perform assigned strategic intelligence duty'}
Inputs provided by analyst:
${inputContext}

Analyze only the material supplied by the analyst. You cannot access the internet or independently verify sources. Do not invent source names, URLs, dates, quotations, or corroboration. For fact-checking, the only permitted verdict is UNVERIFIED BREAKING. Include:
1. Executive Assessment
2. Evidence present in the supplied input, or state that none was supplied
3. Strategic Implications for India
4. Verdict (if Fact-Checking: VERIFIED / MOSTLY TRUE / MISLEADING / UNSUPPORTED / FALSE / DISPUTED / UNVERIFIED BREAKING)
5. Calculated Score (if Relationship or Priority Scoring)
6. Proposed High-Impact Tweet / Output (Hook, Evidence, Context, Implication, Closing)
7. Legal & Reputational Risk Flags`;

        findings = await generateLocalText(prompt);
    } catch (modelError: any) {
      console.warn('[Local model unavailable]', modelError);
      findings = 'UNVERIFIED: Local model unavailable. No source verification was performed. Start Ollama and install the configured model to run analysis.';
    }

    // If findings was empty or fallback needed
    if (!findings) {
      findings = 'UNVERIFIED: No model output or source verification is available.';
    }
    findings = `UNVERIFIED — analysis of supplied text only; no web search or source verification was performed. Model output may be wrong.\n\n${findings}`;

    // Extract verdict if agent-5
    if (agentId === 'agent-5') {
      verdict = 'UNVERIFIED BREAKING';
    }

    // Extract score
    if (agentId === 'agent-6' || agentId === 'agent-7') {
      const match = findings.match(/(\d{2,3})(?:\/100|%| score| index)/i);
      score = match ? Math.min(100, Math.max(0, parseInt(match[1]))) : 0;
    }

    res.json({
      agentId,
      agentName: getAgentName(agentId),
      timestamp: new Date().toISOString(),
      duty,
      inputs,
      thinkingProcess: [
        'Analyzed analyst-provided input only.',
        'No web search or independent source verification was performed.',
        'Assessed impact through sovereign strategic lens.',
        'Delivered structured intelligence verdict.'
      ],
      findings,
      verdict,
      score,
      riskAssessment: [
        'No source-retrieval tools are configured.',
        'Treat model output as unverified analysis until a human checks primary sources.'
      ],
      proposedContent: extractProposedContent(findings, agentId)
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Agent invocation failed' });
  }
});

// -------------------------------------------------------------
// API: Custom Flow Execution (Chained Pipeline)
// -------------------------------------------------------------
app.post('/api/flow/execute', async (req: Request, res: Response) => {
  try {
    const { flowId, name, steps, initialInput } = req.body;
    if (!Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ error: 'Steps array must not be empty' });
    }

    const stepResults = [];
    let currentInputText = initialInput || 'Comprehensive strategic inquiry for India.';

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const agentId = step.agentId;
      const persona = getAgentPersona(agentId);

      let stepOutput = '';
      try {
        const prompt = `${persona}
Step ${i + 1} of chained intelligence flow "${name}".
Duty: ${step.customDutyPrompt || 'Analyze preceding intelligence and advance investigation.'}
Input Payload:
${currentInputText}

Produce concise findings. You have no web access. Never claim sources were verified; mark missing evidence UNVERIFIED.`;
        stepOutput = await generateLocalText(prompt);
      } catch {
        stepOutput = `UNVERIFIED: Local model unavailable at step ${i + 1}; no source verification was performed.`;
      }

      const result = {
        agentId,
        agentName: getAgentName(agentId),
        timestamp: new Date().toISOString(),
        duty: step.customDutyPrompt || `Stage ${i + 1} processing`,
        inputs: { pipedInput: currentInputText },
        thinkingProcess: [
          `Received input from Step ${i === 0 ? 'User' : i}`,
          'No independent source verification was performed.',
          `Formulated intermediate dossier for Step ${i + 2 <= steps.length ? i + 2 : 'Final Output'}`
        ],
        findings: stepOutput,
        outputData: { stepIndex: i, text: stepOutput }
      };

      stepResults.push(result);
      currentInputText = stepOutput;
    }

    res.json({
      flowId,
      name,
      status: 'completed',
      totalSteps: steps.length,
      stepResults,
      finalOutput: currentInputText
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Flow execution failed' });
  }
});

// -------------------------------------------------------------
// API: 30-Minute Research Cycle Run
// -------------------------------------------------------------
app.post('/api/cycle/run', async (_req: Request, res: Response) => {
  const cycleId = `cycle-${Date.now().toString().slice(-4)}`;
  res.json({
    cycleId,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
    itemsIngested: 0,
    factChecksCompleted: 0,
    storiesGenerated: 0,
    highPriorityStories: 0,
    newStories: [],
    agentNotes: 'No news feeds or source retrieval are configured. No stories were generated. Add real source ingestion before enabling research cycles.'
  });
});

// Helper functions
function getAgentName(id: string): string {
  const names: Record<string, string> = {
    'agent-1': 'Global News Intelligence (GARUDA)',
    'agent-2': 'Indian Politics & Governance (CHANAKYA)',
    'agent-3': 'National Defence & Security (TRISHUL)',
    'agent-4': 'Rival & Adversarial Narrative (SUDARSHAN)',
    'agent-5': 'Source Verification & Fact-Checking (SATYAMEVA)',
    'agent-6': 'India–World Relationship Intelligence (MANDALA)',
    'agent-7': 'Chief Editor & X Content Strategist (VIKRAMA)'
  };
  return names[id] || 'Intelligence Agent';
}

function extractProposedContent(text: string, agentId: string): string {
  if (agentId !== 'agent-7') return '';
  const lines = text.split('\n');
  const tweetStart = lines.findIndex(l => /proposed tweet|draft post|hook:/i.test(l));
  if (tweetStart !== -1) {
    return lines.slice(tweetStart + 1, tweetStart + 8).join('\n').trim();
  }
  return text.slice(0, 280);
}

// -------------------------------------------------------------
// Vite Middleware / Static Serving
// -------------------------------------------------------------
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // HMR disabled in AI Studio
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Bharat Desk Server] Ready on http://${HOST}:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[Failed to start server]', err);
});
