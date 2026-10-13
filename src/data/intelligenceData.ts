import { 
  AgentDutySpec, 
  CandidateStory, 
  CountryRelationship, 
  MonitoredAccount, 
  CorrectionRecord 
} from '../types/intelligence';

export const AGENT_SPECS: AgentDutySpec[] = [
  {
    id: 'agent-1',
    agentNumber: 1,
    name: 'Global News Intelligence',
    codename: 'GARUDA-GLOBAL',
    role: 'Monitors international geopolitics, diplomacy, multilateral summits (UN, G20, BRICS, Quad), sanctions, and strategic trade corridors affecting India.',
    description: 'Scans global developments every 30 minutes, identifies strategic implications for India, and filters viral noise from consequential geopolitical shifts.',
    iconName: 'Globe',
    defaultInputs: [
      { key: 'targetRegion', label: 'Region or Forum', placeholder: 'e.g. Indo-Pacific, West Asia, BRICS, UN Security Council', defaultValue: 'Indo-Pacific' },
      { key: 'incidentQuery', label: 'Event or Development', placeholder: 'e.g. Chagos Islands agreement, Red Sea shipping disruption, US semiconductor export controls', defaultValue: 'Malacca Strait shipping security and Indian Navy Andaman deployments' }
    ]
  },
  {
    id: 'agent-2',
    agentNumber: 2,
    name: 'Indian Politics & Governance',
    codename: 'CHANAKYA-DOMESTIC',
    role: 'Scrutinizes central policy announcements, parliamentary records, manifesto promises vs implementation, and public statements from ruling and opposition parties.',
    description: 'Maintains an immutable archive of political statements, votes, and budgets. Compares rhetoric to official datasets (CAG, MoSPI, RBI, Union Budget).',
    iconName: 'Building2',
    defaultInputs: [
      { key: 'politicalActor', label: 'Party / Official / Coalition', placeholder: 'e.g. INC Leadership, BJP Central Ministry, Opposition Alliance', defaultValue: 'Ministry of Commerce & Industry' },
      { key: 'statementOrClaim', label: 'Claim or Policy Metric', placeholder: 'e.g. PLI scheme disbursement totals, defence indigenisation targets, infrastructure capex growth', defaultValue: 'Manufacturing exports under PLI electronics scheme reached record FY highs' }
    ]
  },
  {
    id: 'agent-3',
    agentNumber: 3,
    name: 'National Defence & Security Intelligence',
    codename: 'TRISHUL-DEFENCE',
    role: 'Tracks Indian Armed Forces, DRDO indigenous R&D, LAC/LoC border theatres, naval choke points, and counter-terrorism operations.',
    description: 'Separates confirmed operational facts from social media speculation. Verifies defence procurement, satellite OSINT, and weapons trials with MoD archives.',
    iconName: 'Shield',
    defaultInputs: [
      { key: 'theatreOrService', label: 'Theatre / Service / Agency', placeholder: 'e.g. Western Naval Command, Eastern Ladakh LAC, DRDO, Strategic Forces Command', defaultValue: 'Eastern Ladakh LAC' },
      { key: 'tacticalEvent', label: 'Tactical Event or Weaponry', placeholder: 'e.g. Patrol point disengagement verification, Tejas Mk1A delivery schedule, S-400 squadron deployment', defaultValue: 'Verification of buffer zone patrolling protocols at Depsang and Demchok' }
    ]
  },
  {
    id: 'agent-4',
    agentNumber: 4,
    name: 'Rival & Adversarial Narrative Intelligence',
    codename: 'SUDARSHAN-COUNTER',
    role: 'Monitors Chinese state media, Pakistan security establishment, cross-border propaganda, and international media double-standards regarding India.',
    description: 'Identifies manipulated footage, selective translations, and diplomatic disinformation. Exposes contradictions between adversaries\' rhetoric and documented actions.',
    iconName: 'Eye',
    defaultInputs: [
      { key: 'sourceOrigin', label: 'State / Media Outlet', placeholder: 'e.g. Global Times (Beijing), ISPR (Rawalpindi), Western editorial desks', defaultValue: 'Global Times & CCP Foreign Ministry' },
      { key: 'narrativeClaim', label: 'Narrative or Accusation', placeholder: 'e.g. Allegation of Indian trade protectionism, commentary on Kashmir, border infrastructure criticism', defaultValue: 'Chinese state media criticizing India-US military interoperability in Uttarakhand' }
    ]
  },
  {
    id: 'agent-5',
    agentNumber: 5,
    name: 'Source Verification & Fact-Checking',
    codename: 'SATYAMEVA-VETO',
    role: 'Holds independent editorial authority to block publication. Rigorously examines primary records, transcripts, gazettes, and statistics to assign a 7-tier verdict.',
    description: 'Independent publication gatekeeper. Evaluates claims against Tier 1 primary evidence, checks original dates, searches for contradicting data, and flags legal risks.',
    iconName: 'CheckCircle2',
    defaultInputs: [
      { key: 'claimToVerify', label: 'Exact Claim to Fact-Check', placeholder: 'e.g. "India signed secret naval base lease in Mauritius without parliamentary consent"', defaultValue: 'Claim that India agreed to halt all military infrastructure construction within 20km of the LAC' },
      { key: 'claimedSource', label: 'Originating Source or URL', placeholder: 'e.g. Viral X clip, Foreign think tank paper, Opposition press briefing', defaultValue: 'Viral social media thread citing unnamed diplomatic cables' }
    ]
  },
  {
    id: 'agent-6',
    agentNumber: 6,
    name: 'India–World Relationship Intelligence',
    codename: 'MANDALA-DIPLOMACY',
    role: 'Maintains the multi-dimensional India–Country Relationship Index across 9 weighted dimensions with historical 30/90-day deltas and strategic risk audits.',
    description: 'Computes real-time quantitative diplomatic alignment scores using structured rubrics, trade volumes, defence pacts, and voting patterns.',
    iconName: 'Compass',
    defaultInputs: [
      { key: 'targetCountry', label: 'Bilateral Partner / Nation', placeholder: 'e.g. United States, Russia, France, Japan, Bangladesh', defaultValue: 'United States' },
      { key: 'bilateralIncident', label: 'Recent Treaty / Event', placeholder: 'e.g. Critical Minerals MoU signed, trade tariff dispute, joint naval patrol in Malacca', defaultValue: 'US-India iCET initiative expansion on quantum computing and jet engine technology transfer' }
    ]
  },
  {
    id: 'agent-7',
    agentNumber: 7,
    name: 'Chief Editor & X Content Strategist',
    codename: 'VIKRAMA-EDITOR',
    role: 'Applies the 100-point story prioritization formula, enforces the neutral-sounding high-impact tweet standard, and prepares formatted drafts for human approval.',
    description: 'Synthesizes intelligence from all agents into sharp, evidence-first X posts: Hook, Evidence, Context, Implication, and Pointed Closing.',
    iconName: 'PenTool',
    defaultInputs: [
      { key: 'storyBrief', label: 'Intelligence Record or Thesis', placeholder: 'Paste a claim and source material for analysis', defaultValue: '' },
      { key: 'desiredFormat', label: 'Publishing Format', placeholder: 'Single Tweet, 4-Part Thread, Policy Explainer', defaultValue: 'Single Tweet' }
    ]
  }
];

export const INITIAL_RELATIONSHIPS: CountryRelationship[] = [
  {
    id: 'rel-usa',
    country: 'United States',
    code: 'USA',
    flag: '🇺🇸',
    currentScore: 81.25,
    previousScore: 80.50,
    delta30d: 0.75,
    delta90d: 2.10,
    dimensions: {
      diplomatic: 82,      // 15% -> 12.3
      trade: 84,           // 15% -> 12.6
      defence: 88,         // 15% -> 13.2
      strategic: 86,       // 15% -> 12.9
      leadership: 78,      // 10% -> 7.8
      cultural: 85,        // 10% -> 8.5
      techEnergy: 83,      // 10% -> 8.3
      neighbourhood: 65,   // 5%  -> 3.25
      ideological: 50      // 5%  -> 2.5
    },
    strongestDimensions: ['Defence & Security Cooperation', 'Strategic & Geopolitical Alignment', 'Trade & Economic Relations'],
    weakestDimensions: ['Ideological & Philosophical Affinity', 'Neighbourhood Regional Dynamics'],
    recentPositiveDevelopments: [
      'Expansion of US-India iCET initiative with GE F414 jet engine co-production licensed.',
      'Quad maritime domain awareness initiative active tracking illegal fishing in Bay of Bengal.'
    ],
    recentNegativeDevelopments: [
      'Congressional commentary on internal judicial proceedings and minority rights.',
      'Friction regarding Indian purchases of discounted Russian crude and trade tariff threats.'
    ],
    keyDependencies: ['Semiconductor design tools', 'Commercial aerospace components (Boeing)', 'Advanced gas turbine propulsion'],
    strategicVulnerabilities: ['Potential secondary sanctions risks', 'Unpredictable swings in US domestic political consensus on H1B and trade tariffs'],
    supportingSources: ['US-India 2+2 Ministerial Joint Statement (MoD/State Dept)', 'Ministry of Commerce & Industry FY trade bulletin', 'DOD Indo-Pacific Strategy Progress Report'],
    confidenceRating: 94,
    unresolvedQuestions: 'Long-term clarity on US tariff trajectory under evolving trade policy.',
    lastUpdated: '2026-10-12 18:30 IST'
  },
  {
    id: 'rel-russia',
    country: 'Russia',
    code: 'RUS',
    flag: '🇷🇺',
    currentScore: 74.80,
    previousScore: 75.20,
    delta30d: -0.40,
    delta90d: 1.15,
    dimensions: {
      diplomatic: 86,      // 15% -> 12.9
      trade: 78,           // 15% -> 11.7
      defence: 82,         // 15% -> 12.3
      strategic: 76,       // 15% -> 11.4
      leadership: 88,      // 10% -> 8.8
      cultural: 60,        // 10% -> 6.0
      techEnergy: 85,      // 10% -> 8.5
      neighbourhood: 48,   // 5%  -> 2.4
      ideological: 40      // 5%  -> 2.0
    },
    strongestDimensions: ['Leadership-Level & Personal Diplomacy', 'Diplomatic & Political Alignment', 'Technology & Energy Cooperation'],
    weakestDimensions: ['Neighbourhood Stability (Deepening Russia-China ties)', 'Ideological Affinity', 'People-to-People Ties'],
    recentPositiveDevelopments: [
      'Steady delivery of Kudankulam Nuclear Power Plant Units 5 & 6 critical components.',
      'Continued bilateral rupee-ruble settlement mechanism expansion for hydrocarbon shipments.'
    ],
    recentNegativeDevelopments: [
      'Growing Russian military dependence on Chinese industrial electronics and dual-use components.',
      'Delays in remaining S-400 Triumf missile battery deliveries due to domestic wartime diversion.'
    ],
    keyDependencies: ['Legacy military spare parts (Su-30MKI, T-90)', 'Crude oil discounted blends', 'Fertilizer & potash imports'],
    strategicVulnerabilities: ['Risk of Russia prioritizing Beijing in an event of serious LAC escalation', 'Western payment secondary sanction barriers'],
    supportingSources: ['MEA Bilateral Summit Factsheet', 'Directorate General of Commercial Intelligence & Statistics (DGCIS)', 'Stockholm International Peace Research Institute (SIPRI)'],
    confidenceRating: 91,
    unresolvedQuestions: 'Timeline for final 2 S-400 regiments and nuclear attack submarine lease negotiations.',
    lastUpdated: '2026-10-12 14:00 IST'
  },
  {
    id: 'rel-france',
    country: 'France',
    code: 'FRA',
    flag: '🇫🇷',
    currentScore: 87.40,
    previousScore: 86.60,
    delta30d: 0.80,
    delta90d: 3.20,
    dimensions: {
      diplomatic: 90,      // 15% -> 13.5
      trade: 78,           // 15% -> 11.7
      defence: 95,         // 15% -> 14.25
      strategic: 92,       // 15% -> 13.8
      leadership: 92,      // 10% -> 9.2
      cultural: 74,        // 10% -> 7.4
      techEnergy: 90,      // 10% -> 9.0
      neighbourhood: 85,   // 5%  -> 4.25
      ideological: 68      // 5%  -> 3.4
    },
    strongestDimensions: ['Defence & Security Cooperation', 'Strategic & Geopolitical Alignment', 'Diplomatic Alignment'],
    weakestDimensions: ['Trade Volume (Non-defence)', 'Ideological / Philosophical Nuance'],
    recentPositiveDevelopments: [
      'Formal contract finalization for 26 Rafale-Marine fighter aircraft for INS Vikrant.',
      'Joint maritime surveillance flights executed from Reunion Island in southwest Indian Ocean.'
    ],
    recentNegativeDevelopments: [
      'Slow progress on Jaitapur Nuclear Plant commercial civil liability agreements.'
    ],
    keyDependencies: ['Carrier aviation naval strike aircraft', 'Scorpene submarine air-independent propulsion (AIP) upgrades', 'Safran joint engine development'],
    strategicVulnerabilities: ['High cost per platform', 'Dependency on French domestic industrial assembly timelines'],
    supportingSources: ['Ministry of Defence DAC Approvals', 'French Ministry of Armed Forces Official Release', 'Dassault Aviation Operational Dispatches'],
    confidenceRating: 96,
    unresolvedQuestions: 'Finalization date for 100% intellectual property transfer on the indigenous 110kN fighter jet engine.',
    lastUpdated: '2026-10-12 11:20 IST'
  },
  {
    id: 'rel-china',
    country: 'China',
    code: 'CHN',
    flag: '🇨🇳',
    currentScore: 32.40,
    previousScore: 31.80,
    delta30d: 0.60,
    delta90d: 1.40,
    dimensions: {
      diplomatic: 35,      // 15% -> 5.25
      trade: 52,           // 15% -> 7.80
      defence: 15,         // 15% -> 2.25
      strategic: 18,       // 15% -> 2.70
      leadership: 40,      // 10% -> 4.00
      cultural: 30,        // 10% -> 3.00
      techEnergy: 32,      // 10% -> 3.20
      neighbourhood: 12,   // 5%  -> 0.60
      ideological: 15      // 5%  -> 0.75
    },
    strongestDimensions: ['Trade & Economic Exchange (despite high deficit)', 'Leadership-level structured dialogue'],
    weakestDimensions: ['Defence & Border Security', 'Neighbourhood Stability & Sovereignty', 'Strategic Alignment'],
    recentPositiveDevelopments: [
      'Completion of disengagement talks at Depsang and Demchok buffer zones with coordinated patrolling protocols.',
      'Resumption of direct civil aviation talks and consular business visa processing discussions.'
    ],
    recentNegativeDevelopments: [
      'Continued Chinese dual-use border village ("Xiaokang") militarization along central and eastern LAC.',
      'Active intelligence cooperation with Pakistan military in Arabian Sea corridors.'
    ],
    keyDependencies: ['Active Pharmaceutical Ingredients (APIs)', 'Solar photovoltaic wafers and cells', 'Lithium battery chemical precursors'],
    strategicVulnerabilities: ['Critical supply-chain weaponization', 'Active military deployment parity strain along 3,488 km border'],
    supportingSources: ['MEA Border Affairs Working Mechanism (WMCC) releases', 'Ministry of Commerce Bilateral Import Statistics', 'Centre for Strategic and International Studies (CSIS) ChinaPower'],
    confidenceRating: 89,
    unresolvedQuestions: 'Whether patrolling protocols signify durable peace or tactical pause while Beijing focuses on Taiwan.',
    lastUpdated: '2026-10-12 19:45 IST'
  },
  {
    id: 'rel-israel',
    country: 'Israel',
    code: 'ISR',
    flag: '🇮🇱',
    currentScore: 84.10,
    previousScore: 83.70,
    delta30d: 0.40,
    delta90d: 1.60,
    dimensions: {
      diplomatic: 85,
      trade: 74,
      defence: 94,
      strategic: 88,
      leadership: 88,
      cultural: 76,
      techEnergy: 89,
      neighbourhood: 70,
      ideological: 75
    },
    strongestDimensions: ['Defence & Security Cooperation', 'Technology & Agriculture/Water R&D', 'Strategic Alignment'],
    weakestDimensions: ['Non-defence Trade Diversification', 'Middle East Regional Volatility Balance'],
    recentPositiveDevelopments: [
      'Co-production of Hermes 900 Starliner UAVs in Hyderabad for domestic use and export.',
      'Cooperation on advanced electronic warfare and radar suites for indigenous naval destroyers.'
    ],
    recentNegativeDevelopments: [
      'West Asia regional conflict complicating India-Middle East-Europe Economic Corridor (IMEC) progress.'
    ],
    keyDependencies: ['Precision guided munitions kits (Spice 2000)', 'Phalcon AWACS radar systems', 'Advanced precision agriculture technology'],
    strategicVulnerabilities: ['Regional security blowback in West Asia affecting 9M Indian diaspora'],
    supportingSources: ['Ministry of Defence Joint Working Group', 'Israel Ministry of Foreign Affairs', 'SIPRI Arms Transfer Database'],
    confidenceRating: 95,
    unresolvedQuestions: 'Timeline for stabilization of Mediterranean terminal ports for the IMEC trade route.',
    lastUpdated: '2026-10-11 16:15 IST'
  },
  {
    id: 'rel-japan',
    country: 'Japan',
    code: 'JPN',
    flag: '🇯🇵',
    currentScore: 86.85,
    previousScore: 86.20,
    delta30d: 0.65,
    delta90d: 2.10,
    dimensions: {
      diplomatic: 92,
      trade: 82,
      defence: 84,
      strategic: 94,
      leadership: 86,
      cultural: 78,
      techEnergy: 90,
      neighbourhood: 85,
      ideological: 72
    },
    strongestDimensions: ['Strategic & Geopolitical Alignment (Indo-Pacific)', 'Diplomatic Alignment', 'Tech & Infrastructure Financing'],
    weakestDimensions: ['Bilateral Trade Volume relative to potential', 'Joint Defence Hardware Manufacturing'],
    recentPositiveDevelopments: [
      'JICA loan disbursement for Mumbai-Ahmedabad High-Speed Rail Project next construction phase.',
      'Joint naval anti-submarine warfare exercise in Bay of Bengal with JMSDF.'
    ],
    recentNegativeDevelopments: [
      'Protracted negotiations on UNICORN mast antenna integration for Indian naval frigates.'
    ],
    keyDependencies: ['Soft loan infrastructure financing (JICA)', 'High-precision industrial robotics', 'Advanced semiconductor foundry equipment'],
    strategicVulnerabilities: ['Japanese corporate risk aversion and slow decision cycles in direct FDI'],
    supportingSources: ['India-Japan Annual Summit Joint Statement', 'JICA Official Project Records', 'Indian Navy Operational Press Briefings'],
    confidenceRating: 97,
    unresolvedQuestions: 'Agreement on joint defence export framework for co-developed sensors.',
    lastUpdated: '2026-10-12 12:00 IST'
  }
];

export const INITIAL_MONITORED_ACCOUNTS: MonitoredAccount[] = [
  {
    id: 'acc-1',
    handle: '@MEAIndia',
    name: 'Ministry of External Affairs, India',
    region: 'India',
    category: 'Government',
    orientation: 'Official/Neutral',
    tier: 'TIER_1',
    reliabilityScore: 99,
    conflictsOfInterest: 'Official institutional spokesperson for Indian foreign policy.',
    correctionsHistory: 'Standard diplomatic retractions extremely rare; issued within 24h if necessary.',
    active: true,
    lastChecked: '4 mins ago'
  },
  {
    id: 'acc-2',
    handle: '@DefenceMinIndia',
    name: 'Ministry of Defence, India',
    region: 'India',
    category: 'Government',
    orientation: 'Official/Neutral',
    tier: 'TIER_1',
    reliabilityScore: 99,
    conflictsOfInterest: 'Official Indian sovereign defence communications.',
    correctionsHistory: 'Zero uncorrected errors in operational communications.',
    active: true,
    lastChecked: '6 mins ago'
  },
  {
    id: 'acc-3',
    handle: '@ANI',
    name: 'Asian News International',
    region: 'India',
    category: 'Wire Service',
    orientation: 'Official/Neutral',
    tier: 'TIER_2',
    reliabilityScore: 84,
    conflictsOfInterest: 'Commercial wire service; occasional unverified breaking flashes.',
    correctionsHistory: 'Issues clarifying tweets on fast-moving stories.',
    active: true,
    lastChecked: '2 mins ago'
  },
  {
    id: 'acc-4',
    handle: '@PTI_News',
    name: 'Press Trust of India',
    region: 'India',
    category: 'Wire Service',
    orientation: 'Official/Neutral',
    tier: 'TIER_2',
    reliabilityScore: 91,
    conflictsOfInterest: 'National news cooperative, strict editorial protocol.',
    correctionsHistory: 'Transparent corrigendum protocol followed consistently.',
    active: true,
    lastChecked: '3 mins ago'
  },
  {
    id: 'acc-5',
    handle: '@ORFonLine',
    name: 'Observer Research Foundation',
    region: 'India',
    category: 'Think Tank',
    orientation: 'Center-Right',
    tier: 'TIER_2',
    reliabilityScore: 88,
    conflictsOfInterest: 'Receives Indian corporate and institutional funding; pro-national interest.',
    correctionsHistory: 'Academic peer review standards maintained.',
    active: true,
    lastChecked: '12 mins ago'
  },
  {
    id: 'acc-6',
    handle: '@MFA_China',
    name: 'Foreign Ministry Spokesperson, China',
    region: 'China & East Asia',
    category: 'State Media',
    orientation: 'Adversarial/State Media',
    tier: 'TIER_1',
    reliabilityScore: 65,
    conflictsOfInterest: 'Official diplomatic arm of CCP; tactical narratives and selective disclosures.',
    correctionsHistory: 'Does not issue public corrections for politically motivated assertions.',
    active: true,
    lastChecked: '8 mins ago'
  },
  {
    id: 'acc-7',
    handle: '@globaltimesnews',
    name: 'Global Times (Beijing)',
    region: 'China & East Asia',
    category: 'State Media',
    orientation: 'Adversarial/State Media',
    tier: 'TIER_3',
    reliabilityScore: 42,
    conflictsOfInterest: 'State-run nationalist tabloid used for psychological warfare and signalling.',
    correctionsHistory: 'Frequently scrubs or alters articles without disclosure.',
    active: true,
    lastChecked: '15 mins ago'
  },
  {
    id: 'acc-8',
    handle: '@StateDept',
    name: 'U.S. Department of State',
    region: 'United States',
    category: 'Government',
    orientation: 'Official/Neutral',
    tier: 'TIER_1',
    reliabilityScore: 94,
    conflictsOfInterest: 'Official voice of US foreign policy.',
    correctionsHistory: 'Formal briefing corrections on transcript record.',
    active: true,
    lastChecked: '10 mins ago'
  },
  {
    id: 'acc-9',
    handle: '@Reuters',
    name: 'Reuters World',
    region: 'United States',
    category: 'Wire Service',
    orientation: 'Official/Neutral',
    tier: 'TIER_2',
    reliabilityScore: 93,
    conflictsOfInterest: 'Global wire; occasional Western-centric editorial framing on Indian domestic laws.',
    correctionsHistory: 'Industry gold-standard published correction tags.',
    active: true,
    lastChecked: '1 min ago'
  },
  {
    id: 'acc-10',
    handle: '@OfficialDGISPR',
    name: 'Inter-Services Public Relations, Pakistan',
    region: 'Pakistan & South Asia',
    category: 'State Media',
    orientation: 'Adversarial/State Media',
    tier: 'TIER_1',
    reliabilityScore: 48,
    conflictsOfInterest: 'Military media wing; established history of fabricated casualty and operational claims.',
    correctionsHistory: 'Never acknowledges documented discrepancies.',
    active: true,
    lastChecked: '18 mins ago'
  },
  {
    id: 'acc-11',
    handle: '@DRDO_India',
    name: 'Defence Research and Development Organisation',
    region: 'India',
    category: 'Government',
    orientation: 'Official/Neutral',
    tier: 'TIER_1',
    reliabilityScore: 98,
    conflictsOfInterest: 'Indian state defence lab.',
    correctionsHistory: 'Rigorous flight test releases verified by telemetry.',
    active: true,
    lastChecked: '14 mins ago'
  },
  {
    id: 'acc-12',
    handle: '@CSIS',
    name: 'Center for Strategic & International Studies',
    region: 'United States',
    category: 'Think Tank',
    orientation: 'Official/Neutral',
    tier: 'TIER_2',
    reliabilityScore: 90,
    conflictsOfInterest: 'Bipartisan US defence policy think tank.',
    correctionsHistory: 'High academic standard, publishes methodology.',
    active: true,
    lastChecked: '25 mins ago'
  }
];

export const INITIAL_CANDIDATE_STORIES: CandidateStory[] = [
  {
    id: 'story-101',
    headline: 'India-France Seal Landmark Rafale-Marine Deal: 26 Jets for INS Vikrant',
    alternativeHook: 'Carrier Deck Superiority: Navy Replaces Russian MiG-29K with French Rafale-M',
    eventDate: '2026-10-12',
    publicationDate: '2026-10-13',
    region: 'France / Indo-Pacific',
    subject: 'Carrier Aviation & Naval Defence',
    category: 'DEFENCE_INTEL',
    primarySources: [
      { name: 'Defence Acquisition Council (DAC) Gazette', tier: 'TIER_1', date: '2026-10-12', excerpt: 'Acceptance of Necessity granted for 26 Rafale-Marine aircraft under Inter-Governmental Agreement.' },
      { name: 'Ministry of Armed Forces France Release', tier: 'TIER_1', date: '2026-10-12', excerpt: 'Cooperation agreement finalized covering training, flight simulator suite, and weapon integration in Goa.' }
    ],
    corroboratingSources: [
      { name: 'Press Trust of India (PTI)', tier: 'TIER_2', date: '2026-10-12', excerpt: 'Final price negotiations concluded at estimated €5.8 billion.' },
      { name: 'Janes Defence Weekly', tier: 'TIER_2', date: '2026-10-12', excerpt: 'Deliveries to commence within 36 months, integrating indigenous Astra beyond-visual-range missiles.' }
    ],
    contradictoryEvidence: 'Claims in partisan foreign forums that aircraft wing-fold mechanics cannot fit INS Vikrant elevators were disproven by official Shore-Based Test Facility trials in Goa in 2022.',
    factCheckVerdict: 'VERIFIED',
    confidenceLevel: 98,
    strategicRelevance: 'Solves the acute carrier aviation shortfall on INS Vikrant, phasing out mechanically troublesome MiG-29Ks while standardizing maintenance tooling with the IAF\'s existing 36 Rafale fleet in Ambala and Hasimara.',
    politicalContext: 'Critics previously alleged government delays were leaving aircraft carriers defenseless; this government-to-government route bypasses intermediate middlemen while securing Astra weapon source codes.',
    potentialImplications: 'Guarantees Indian carrier strike group dominance over Chinese PLAN surface vessels in the Malacca and Sunda straits choke points.',
    priorityScore: {
      strategicImportance: 24,
      evidenceQuality: 25,
      timeliness: 14,
      publicInterest: 9,
      analyticalValue: 10,
      discussionPotential: 8,
      editorialAlignment: 5,
      total: 95
    },
    recommendedFormat: 'SINGLE_TWEET',
    proposedTweet: 'Political critics claimed India\'s aircraft carriers were sitting defenseless without aircraft.\n\nThe signed government-to-government record tells a very different story.\n\nYesterday, India and France formally concluded the 26 Rafale-Marine agreement for INS Vikrant, securing weapon source-code integration for indigenous Astra missiles and joint maintenance facilities with the IAF.\n\nProcurement delays are fair game for scrutiny. But leaving sea lanes undefended was never the plan.\n\nHere is how the deal reshapes Indian Ocean naval dominance:',
    threadPosts: [
      '1/4 Political critics claimed India\'s aircraft carriers were sitting defenseless without aircraft. The signed government-to-government record tells a very different story.',
      '2/4 Yesterday, India and France concluded the 26 Rafale-Marine agreement for INS Vikrant, securing weapon source-code integration for indigenous Astra BVR missiles and shared depot tooling with the IAF.',
      '3/4 The agreement addresses the Russian MiG-29K serviceability bottleneck while Indian Navy awaits the twin-engine deck-based fighter (TEDBF) slated for 2032.',
      '4/4 Procurement timelines deserve strict scrutiny. But sovereign power projection cannot be compromised by political point-scoring. Let the naval capability speak for itself.'
    ],
    sourcesToAttach: ['DAC Inter-Governmental Summary (12-Oct-2026)', 'Indian Navy Carrier Aviation Factsheet', 'Janes Aircraft Assessment'],
    legalRiskFlags: ['None: Official bilateral government release confirmed by both defence ministries.'],
    publicationStatus: 'APPROVED',
    agentAuthor: 'Agent 3 (National Defence) + Agent 7 (Chief Editor)',
    cycleId: 'cycle-042',
    publishedAt: '2026-10-13 08:30 IST',
    impressions: 48200,
    retweets: 1420,
    likes: 5890
  },
  {
    id: 'story-102',
    headline: 'LAC Buffer Zone Patrol Protocol: Checking the "Surrender of Territory" Allegation',
    alternativeHook: 'Depsang & Demchok Patrolling: Why the "Loss of Land" Claim Collapses Under Satellite Evidence',
    eventDate: '2026-10-11',
    publicationDate: '2026-10-13',
    region: 'Eastern Ladakh (India-China)',
    subject: 'National Security & Border Accountability',
    category: 'POLITICAL_ACCOUNTABILITY',
    primarySources: [
      { name: 'Ministry of External Affairs WMCC Protocol Document', tier: 'TIER_1', date: '2026-10-11', excerpt: 'Indian troops retain verified patrol rights to Patrol Points 10, 11, 12, and 13 on Depsang Plains under mutual notification schedule.' },
      { name: 'Indian Army Eastern Ladakh Operational Briefing', tier: 'TIER_1', date: '2026-10-11', excerpt: 'No physical permanent post or territory has been ceded; temporary physical disengagement verified by UAV imagery.' }
    ],
    corroboratingSources: [
      { name: 'The Hindu Defence Bureau', tier: 'TIER_2', date: '2026-10-11', excerpt: 'Troops from 14 Corps conducted physical patrol to traditional grazing grounds without PLA interference.' },
      { name: 'Satellite Imagery (Sentinel-2 / Maxar Open-Source)', tier: 'TIER_1', date: '2026-10-11', excerpt: 'Dismantling of temporary Chinese tent clusters at Y-Junction confirmed.' }
    ],
    contradictoryEvidence: 'Opposition social media posts claimed that India had conceded 2,000 sq km of territory permanently. Parliamentary answers (Rajya Sabha 2024-2026) and surveyor general coordinates prove patrol lines remain legally intact.',
    factCheckVerdict: 'MISLEADING',
    confidenceLevel: 94,
    strategicRelevance: 'Addresses the most heated domestic political dispute concerning national sovereignty while providing concrete physical evidence of Indian Army boots on the ground.',
    politicalContext: 'Opposition leaders frequently weaponize border diplomacy to allege treason. Exposing discrepancies using official coordinates protects soldier morale while maintaining constitutional accountability.',
    potentialImplications: 'Reduces operational risk of miscalculation along the 1959 claim line while freeing up XIV Corps logistics for permanent winter fortification.',
    priorityScore: {
      strategicImportance: 25,
      evidenceQuality: 23,
      timeliness: 13,
      publicInterest: 10,
      analyticalValue: 9,
      discussionPotential: 10,
      editorialAlignment: 5,
      total: 95
    },
    recommendedFormat: 'SINGLE_TWEET',
    proposedTweet: 'Political claims are easy to make on social media. Official military survey records are harder to explain away.\n\nOpposition posts allege that India permanently "surrendered" Depsang patrol points to China.\n\nThe published Army operational record shows the opposite:\n\n1. Indian troops executed patrols to PPs 10 through 13 under mutual verification.\n2. Satellite imagery confirms PLA tent clusters at the Y-junction were dismantled.\n3. Zero permanent posts were ceded or abandoned.\n\nScrutinizing the government\'s border policy is essential. But inventing Chinese territorial gains when Indian soldiers are physically patrolling the coordinates serves no Indian interest.',
    sourcesToAttach: ['WMCC Bilateral Verification Protocol', 'Indian Army Eastern Command Coordinates Release', 'Sentinel-2 Satellite Verification Imagery'],
    legalRiskFlags: ['Sensitive border theatre: All quotes verified against public press briefings; zero non-public operational coordinates revealed.'],
    publicationStatus: 'DRAFT',
    agentAuthor: 'Agent 2 (Domestic Politics) + Agent 5 (Fact-Check Veto)',
    cycleId: 'cycle-043'
  },
  {
    id: 'story-103',
    headline: 'US Congressional Report on Indian Tech Tariffs: Fact-Checking the "Protectionist" Charge',
    alternativeHook: 'The Data Behind Indian Electronics Tariffs: Why Washington\'s Critique Ignores WTO Precedent',
    eventDate: '2026-10-10',
    publicationDate: '2026-10-13',
    region: 'United States / Trade',
    subject: 'International Trade & Economic Sovereignty',
    category: 'MEDIA_SCRUTINY',
    primarySources: [
      { name: 'US Congressional Research Service (CRS) Report', tier: 'TIER_1', date: '2026-10-10', excerpt: 'Claims Indian tariffs on ICT equipment constitute an unfair non-tariff barrier for American suppliers.' },
      { name: 'Ministry of Commerce & Industry Tariff Schedule', tier: 'TIER_1', date: '2026-10-10', excerpt: 'Tariff exemptions applied for 85% of critical semiconductor manufacturing and assembly inputs.' }
    ],
    corroboratingSources: [
      { name: 'Financial Times Global Economy', tier: 'TIER_2', date: '2026-10-10', excerpt: 'Apple and Foxconn report record iPhone export surges from Tamil Nadu and Karnataka hubs.' }
    ],
    contradictoryEvidence: 'The CRS report conveniently omitted that US Section 301 tariffs on Chinese technology are 3x higher than Indian basic customs duties, and that India\'s PLI incentives comply fully with WTO Agreement on Subsidies.',
    factCheckVerdict: 'MOSTLY TRUE',
    confidenceLevel: 88,
    strategicRelevance: 'Demonstrates how Western think tanks often label sovereign industrial strategy as "protectionism" when developing nations build manufacturing leverage.',
    politicalContext: 'Center-right economic perspective: Defends market-oriented indigenization and manufacturing sovereignty without resorting to xenophobic rhetoric.',
    potentialImplications: 'Important context as US-India bilateral trade discussions resume on semiconductor supply-chain resilience.',
    priorityScore: {
      strategicImportance: 20,
      evidenceQuality: 22,
      timeliness: 12,
      publicInterest: 7,
      analyticalValue: 10,
      discussionPotential: 8,
      editorialAlignment: 4,
      total: 83
    },
    recommendedFormat: 'SINGLE_TWEET',
    proposedTweet: 'When Washington subsidizes domestic semiconductor foundries under the CHIPS Act, it is called "strategic resilience".\n\nWhen New Delhi implements targeted PLI incentives and electronics duties, Washington reports call it "unfair protectionism".\n\nThe double standard is stark. Official DGCIS data shows Indian electronics exports reached $38B in 2026—with US firms like Apple as the prime beneficiaries.\n\nSovereign industrial policy is not an American monopoly. Before lecturing India on open markets, compare the two policy documents.',
    sourcesToAttach: ['CRS Report Excerpt', 'DGCIS FY Electronics Export Ledger', 'WTO ITA Schedule Comparison'],
    legalRiskFlags: ['None: Trade policy critique based on published datasets.'],
    publicationStatus: 'DRAFT',
    agentAuthor: 'Agent 4 (Adversarial Narratives) + Agent 7 (Chief Editor)',
    cycleId: 'cycle-043'
  },
  {
    id: 'story-104',
    headline: 'Viral Claim: "India Leased Secret Military Island Base in Maldives Without Permission"',
    alternativeHook: 'Debunking the Maldivian "Secret Indian Base" Conspiracy',
    eventDate: '2026-10-09',
    publicationDate: '2026-10-13',
    region: 'Maldives / Indian Ocean',
    subject: 'Regional Disinformation & Maritime Intel',
    category: 'BREAKING',
    primarySources: [
      { name: 'Government of Maldives Presidential Office Press Briefing', tier: 'TIER_1', date: '2026-10-09', excerpt: 'President Muizzu confirms no foreign military bases exist; Agalega infrastructure belongs entirely to Mauritius sovereign control.' },
      { name: 'Ministry of External Affairs Official Transcript', tier: 'TIER_1', date: '2026-10-09', excerpt: 'India\'s cooperation with Indian Ocean neighbours is strictly developmental and civilian-managed.' }
    ],
    corroboratingSources: [
      { name: 'Reuters Colombo Bureau', tier: 'TIER_2', date: '2026-10-09', excerpt: 'Viral satellite imagery was recycled 2021 dredging photos from an unrelated resort development.' }
    ],
    contradictoryEvidence: 'The viral posts utilized manipulated satellite stills from Google Earth showing commercial land reclamation in Hulhumale, falsely labelling it as an Indian Navy submarine pen.',
    factCheckVerdict: 'FALSE',
    confidenceLevel: 99,
    strategicRelevance: 'Neutralizes hostile psychological operations designed to incite anti-India sentiment in Male and Colombo.',
    politicalContext: 'Adversarial media networks consistently attempt to derail diplomatic stabilization between India and President Muizzu\'s administration.',
    potentialImplications: 'Preserves delicate bilateral recovery after New Delhi provided $50M emergency budgetary support to the Maldives.',
    priorityScore: {
      strategicImportance: 22,
      evidenceQuality: 25,
      timeliness: 15,
      publicInterest: 8,
      analyticalValue: 8,
      discussionPotential: 7,
      editorialAlignment: 5,
      total: 90
    },
    recommendedFormat: 'SINGLE_TWEET',
    proposedTweet: 'A viral thread claims satellite images reveal a "secret Indian military submarine pen" in the Maldives.\n\nThe claim is entirely false. Here is what primary evidence proves:\n\n1. The images are recycled 2021 commercial dredging stills from a resort lagoon in Hulhumale.\n2. The Maldivian President\'s Office confirmed on record that no foreign military facility exists.\n3. Geolocation coordinates verify zero naval construction.\n\nManufactured outrage travels fast on X. Documentary facts travel with receipts.',
    sourcesToAttach: ['Maldives Presidential Press Statement', 'Sentinel-2 Geolocation Comparison', 'High-Res Dredging Archive Match'],
    legalRiskFlags: ['Defamation / Disinformation Debunk: Fully supported by Maldivian sovereign release.'],
    publicationStatus: 'APPROVED',
    agentAuthor: 'Agent 4 (Adversarial Narratives) + Agent 5 (Fact-Check Veto)',
    cycleId: 'cycle-041',
    publishedAt: '2026-10-12 19:15 IST',
    impressions: 61500,
    retweets: 2890,
    likes: 8120
  }
];

export const INITIAL_CORRECTIONS: CorrectionRecord[] = [
  {
    id: 'cor-01',
    originalPostId: 'story-088',
    originalPostText: 'Reported that DRDO Pinaka Mk3 regiment trials were completed in Pokhran with 120km range.',
    publishedDate: '2026-09-28',
    correctionDate: '2026-09-29',
    reason: 'Official DRDO press clarify that tests in Pokhran were for Guided Pinaka (75km range); the 120km extended version was simulated in Chandipur.',
    correctiveActionTaken: 'Published thread correction within 2 hours of DRDO gazette update; archived internal errata log.',
    internalAuditNotes: 'Agent 3 relied on early PTI dispatch before checking DRDO telemetry sheet. Protocol updated to require DRDO telemetry release for range figures.'
  }
];
