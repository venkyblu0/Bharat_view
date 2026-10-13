# Bharat Strategic Intelligence & X Editorial Desk

An autonomous, multi-agent geopolitical intelligence, political fact-checking, and editorial command center built to monitor global developments, evaluate India's strategic interests, independently verify claims, and prepare high-impact commentary for X (Twitter).

### User Review & Critical Decisions

> [!IMPORTANT]
> **Revised Architectural Capabilities**: Incorporated user requirement for standalone agent invocation and custom flow chaining alongside the automated queue.

- **Confirmed Decision 1 (Autonomous Queue + On-Demand Dispatch)**:
  - *Automated 30-minute queue*: Runs the standard end-to-end editorial pipeline across all 7 agents.
  - *Standalone Agent Invocation*: Each of the 7 agents can be invoked individually on demand based on their specific duties (e.g., ad-hoc fact-check on a viral claim via Agent 5, bilateral recalculation via Agent 6, or OSINT defense analysis via Agent 3).
  - *Custom Flow Choreographer*: Users can link arbitrary agent chains (e.g., Agent 3 [Defence] → Agent 5 [Fact-Check] → Agent 7 [Editorial Draft]), inspect intermediate outputs at each step, and pipe outputs dynamically.
- **Confirmed Decision 2 (Live Ingestion)**: Live intelligence engine powered by Gemini 3.8 with Google Search grounding, supplemented by real-time strategic feeds and curated incident archives.
- **Confirmed Decision 3 (Strict Human-in-the-Loop Gate)**: Human editorial approval is strictly required before any generated story can transition from Draft to Published status.
- **Confirmed Decision 4 (Fact-Checking Veto Gate)**: Agent 5 retains independent authority to block publication or issue high-risk flags if primary corroboration is lacking.

---

### 1. Overview & Core Concept

- **What It Does**: Automates intelligence gathering, geopolitical impact evaluation, strict 7-verdict fact-checking, and X draft generation. Provides both an autonomous scheduled newsroom and an interactive agent laboratory where individual agents or custom multi-agent pipelines can be triggered on demand.
- **Target Audience / Persona**: Geopolitical analysts, digital editors, foreign policy researchers, defense journalists, and strategic communications directors managing India-focused public commentary.
- **Key Value**: Delivers rigorous evidence-first editorial analysis with dual execution modes: hands-free scheduled cycles for breaking news, and modular on-demand agent invocation for rapid ad-hoc investigations.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Command Center & Live Newsroom**: View breaking developments, active cycles, and system-wide intelligence metrics.
2. **Autonomous Scheduled Pipeline**: 30-minute rolling cycles automatically ingest, cross-verify, score, and draft priority tweets into the Editorial Queue.
3. **Standalone Agent Workstation (New)**:
   - Select any agent from the 7 specialized desks (Global Intel, Indian Politics, Defence, Adversarial Narratives, Fact-Checker, Relationship Index, Chief Editor).
   - Input duty-specific queries (e.g., raw text claim, policy announcement, military deployment, foreign ministry statement, or bilateral trade update).
   - Execute standalone reasoning with live Gemini 3.8 search grounding and inspect detailed intermediate outputs, citations, and risk scores.
4. **Custom Flow Choreographer (New)**:
   - Assemble bespoke agent pipelines (e.g., Step 1: Rival Narratives -> Step 2: Fact-Checker -> Step 3: Chief Editor).
   - Run the custom chain with a single prompt; watch real-time sequential agent execution with intermediate hand-offs.
   - Save custom flow outputs directly to the Editorial Review Queue or export as an investigation dossier.
5. **Editorial Review & Human Approval Curtain**:
   - Inspect candidate records: claim vs. primary document comparison, fact-check verdict (`VERIFIED`, `MOSTLY TRUE`, `MISLEADING`, `UNSUPPORTED`, `FALSE`, `DISPUTED`, `UNVERIFIED BREAKING`), 100-point score breakdown, and risk flags.
   - Take action: Approve & Queue, Request Re-verification, Reject with Reason, or Edit Draft Hook.
6. **India–World Relationship Matrix**:
   - Interactive bilateral index tracking major powers across 9 weighted dimensions with 30-day delta trends.
7. **Source Watchlist & Reliability Archive**:
   - Audit 70+ tracked international and Indian handles with tier classification (Tier 1 Primary, Tier 2 Corroboration, Tier 3 Discovery) and reliability scores.

#### Visual Identity & Theme
- **Aesthetic Direction**: High-density sovereign intelligence terminal. Utilitarian, authoritative, dark slate editorial command center with clean hairline dividers, tabular numbers, and zero-pill typographic discipline.
- **Color Palette & Tokens**:
  - Neutral Canvas (60%): `#090D16` (Deep Midnight Slate) and `#0F172A` (Card Base)
  - Structural Surfaces (30%): `#1E293B` borders, hairline dividers (`rgba(255,255,255,0.08)`), subdued text `#94A3B8`
  - Accent Budget (10%): `#F59E0B` (Amber Gold / Sovereign Focus), `#10B981` (Verified Green), `#EF4444` (False/Risk Red), `#3B82F6` (Diplomatic Blue)
- **Typography & Hierarchy**:
  - Display / Headings: `Plus Jakarta Sans` (bold, tracking-tight, no all-caps shouting)
  - Body & Reading: `Public Sans` / `DM Sans` (14px–15px, 1.5 line height)
  - Telemetry & Metrics: `JetBrains Mono` / tabular figures (`font-mono tabular-nums`)
- **Anti-Slop Discipline**: No decorative pulsing dots, no purple gradients, no code-comment titles (`// 01 ARCHITECTURE`), no arbitrary fake percentage widgets, and no pill badge sandwiches.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Execution Model (Queue vs. Standalone & Custom Flow)**
  - *Chosen Approach*: Maintain a unified agent registry where each agent implements a standard execution contract `runAgent(duty, inputPayload, context)`. Agents can be executed either as nodes in the scheduled 30-minute queue, as standalone micro-services with custom inputs, or as steps in a user-composed workflow.
  - *Why*: Allows maximum flexibility—users can let the background queue run uninterrupted while simultaneously running ad-hoc fact-checks or deep dives without state collision.

- **Decision 2: Intermediate State Inspection & Output Piping**
  - *Chosen Approach*: When running standalone agents or custom flows, every agent's raw thinking, cited primary sources, confidence scores, and structured JSON output are exposed in expandable inspection panels, with a "Pipe to Next Agent" button.
  - *Why*: Ensures transparency and fulfills the user's explicit request to "get the output and create the flow if required".

- **Decision 3: Server-Side Gemini Grounding with Resilient Fallback**
  - *Chosen Approach*: Live search grounding via Gemini 3.8 (`tools: [{ googleSearch: {} }]`) on the backend for both autonomous cycles and standalone agent queries, backed by a comprehensive pre-seeded strategic dataset for instant offline exploration.
  - *Why*: Protects API credentials server-side and guarantees continuous uptime even under API rate limits.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         DESK COMMAND CENTER (UI)                                 │
├───────────────────┬────────────────────┬────────────────────┬────────────────────┤
│ 1. Live Newsroom  │ 2. Agent Lab &     │ 3. Editorial       │ 4. Diplomatic      │
│    & Queue        │    Flow Builder    │    Review Curtain  │    Index & Map     │
└─────────┬─────────┴─────────┬──────────┴─────────┬──────────┴─────────┬──────────┘
          │                   │                    │                    │
          ▼                   ▼                    ▼                    ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             DESK STATE STORE                                     │
│ • Scheduled Queue State (Drafts, Approved, Published, Rejected)                  │
│ • Agent Registry & Standalone Execution State                                    │
│ • Custom Flow Choreographer State (Active Nodes, Pipeline Stages, Run Logs)      │
│ • Watchlist Directory & Relationship Index Store                                 │
└─────────────────────────────────────┬────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                    FULL-STACK INTELLIGENCE BACKEND (/api/*)                      │
├─────────────────────────┬────────────────────────────────────────────────────────┤
│ • /api/cycle/run        │ Scheduled 30-min multi-agent pipeline                  │
│ • /api/agent/invoke     │ Standalone agent invocation with duty-specific params  │
│ • /api/flow/execute     │ Orchestrated multi-agent chained flow execution        │
│ • /api/search/grounded  │ Live Google Search grounding via Gemini 3.8            │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### The 7 Standalone Agent Contracts
1. **Agent 1 (Global News Intel)**: Ingests foreign policy events; produces strategic impact assessment.
2. **Agent 2 (Indian Politics & Governance)**: Ingests domestic claims/bills; compares against manifestos & official records.
3. **Agent 3 (National Defence & Security)**: Ingests military/border developments; validates via verified OSINT & MoD records.
4. **Agent 4 (Rival Narrative Intel)**: Ingests foreign narratives (China, Pakistan, West); analyzes contradictions & double standards.
5. **Agent 5 (Fact-Checking & Verification)**: Independent veto gate; issues 7-tier verdict (`VERIFIED` to `FALSE`) + primary corroboration dossier.
6. **Agent 6 (Relationship Intelligence)**: Computes 9-dimension weighted score (0–100) and 30-day deltas for any country.
7. **Agent 7 (Chief Editor & X Strategist)**: Evaluates 100-point priority score; crafts neutral-sounding, high-impact tweets (Hook, Evidence, Context, Implication, Closing).
