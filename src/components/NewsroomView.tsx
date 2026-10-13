import React, { useState } from 'react';
import { useDesk } from '../context/DeskContext';
import { CandidateStory, StoryCategory } from '../types/intelligence';
import { 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Clock, 
  Radio, 
  ArrowRight,
  Filter,
  PlusCircle,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';

export const NewsroomView: React.FC = () => {
  const { 
    stories, 
    setSelectedStory, 
    setActiveTab, 
    telemetryLogs, 
    runResearchCycle, 
    isCycleRunning,
    addCandidateStory
  } = useDesk();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isInjectModalOpen, setIsInjectModalOpen] = useState<boolean>(false);
  const [newHeadline, setNewHeadline] = useState<string>('');
  const [newRegion, setNewRegion] = useState<string>('');
  const [newClaim, setNewClaim] = useState<string>('');

  const filteredStories = stories.filter(story => {
    const matchesCategory = selectedCategory === 'ALL' || story.category === selectedCategory;
    const matchesSearch = 
      story.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.proposedTweet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'VERIFIED':
        return 'text-emerald-400 font-semibold';
      case 'MOSTLY TRUE':
        return 'text-teal-400 font-semibold';
      case 'MISLEADING':
        return 'text-amber-400 font-semibold';
      case 'FALSE':
        return 'text-rose-400 font-semibold';
      case 'UNSUPPORTED':
        return 'text-orange-400 font-semibold';
      case 'DISPUTED':
        return 'text-purple-400 font-semibold';
      default:
        return 'text-slate-400 font-semibold';
    }
  };

  const handleInspectStory = (story: CandidateStory) => {
    setSelectedStory(story);
    setActiveTab('review-queue');
  };

  const handleInjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeadline.trim()) return;

    const customStory: CandidateStory = {
      id: `story-injected-${Date.now().toString().slice(-4)}`,
      headline: newHeadline,
      alternativeHook: 'Urgent Editorial Flash: Dispatched from Live Command Floor',
      eventDate: new Date().toISOString().split('T')[0],
      publicationDate: new Date().toISOString().split('T')[0],
      region: newRegion || 'Indo-Pacific',
      subject: 'Urgent Sovereign Assessment',
      category: 'BREAKING',
      primarySources: [
        { name: 'Live Field Dispatch', tier: 'TIER_1', date: new Date().toISOString().split('T')[0], excerpt: newClaim || newHeadline }
      ],
      corroboratingSources: [],
      contradictoryEvidence: 'Under ongoing Tier 2 corroboration search.',
      factCheckVerdict: 'UNVERIFIED BREAKING',
      confidenceLevel: 80,
      strategicRelevance: 'Fast-moving strategic lead requiring priority human vetting.',
      politicalContext: 'National security relevance flagged for rapid fact-checking.',
      potentialImplications: 'Awaiting corroborating telemetry.',
      priorityScore: {
        strategicImportance: 22,
        evidenceQuality: 18,
        timeliness: 15,
        publicInterest: 9,
        analyticalValue: 8,
        discussionPotential: 8,
        editorialAlignment: 5,
        total: 85
      },
      recommendedFormat: 'SINGLE_TWEET',
      proposedTweet: `BREAKING: ${newHeadline}\n\nEvidence under independent verification by Bharat Desk. Details to follow as primary documents are checked.`,
      sourcesToAttach: ['Dispatch Hash'],
      legalRiskFlags: ['Breaking unverified: Human sign-off required prior to dispatch.'],
      publicationStatus: 'DRAFT',
      agentAuthor: 'Chief Editor Incident Dispatch'
    };

    addCandidateStory(customStory);
    setIsInjectModalOpen(false);
    setNewHeadline('');
    setNewRegion('');
    setNewClaim('');
  };

  return (
    <div className="space-y-6">
      {/* OSINT Strategic Banner */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#0F172A] shadow-lg">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/src/assets/images/osint_satellite_radar_1791879021185.jpg" 
            alt="Strategic OSINT Indian Ocean Situation Radar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wider mb-2">
              <span>BHARAT SOVEREIGN INTELLIGENCE NETWORK</span>
              <span aria-hidden="true">&middot;</span>
              <span>24/7 ACTIVE RADAR</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight mb-2">
              Live Strategic Newsroom &amp; Verification Desk
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monitoring global geopolitics, Indian Ocean maritime corridors, northern border theatres, 
              and adversarial narrative operations. Operating under strict evidence-first editorial standards with mandatory human sign-off.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-4 font-mono">
              <span>72 Accounts Monitored</span>
              <span aria-hidden="true">&middot;</span>
              <span>30m Cadence</span>
              <span aria-hidden="true">&middot;</span>
              <span className="text-emerald-400">Agent 5 Veto: Active</span>
              <span aria-hidden="true">&middot;</span>
              <span className="text-amber-400">Human Approval Gate: Strict</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 shrink-0">
            <button
              onClick={() => setIsInjectModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Inject Breaking Lead</span>
            </button>
            <button
              onClick={() => runResearchCycle()}
              disabled={isCycleRunning}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
            >
              <Radio className="w-4 h-4" />
              <span>{isCycleRunning ? 'Scanning Feeds...' : 'Run Intelligence Cycle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        {/* Interactive Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto text-xs">
          {[
            { id: 'ALL', label: 'All Developments' },
            { id: 'DEFENCE_INTEL', label: 'Defence Intel' },
            { id: 'POLITICAL_ACCOUNTABILITY', label: 'Political Accountability' },
            { id: 'BREAKING', label: 'Breaking News' },
            { id: 'MEDIA_SCRUTINY', label: 'Media Scrutiny' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search claims, sources, regions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Main Grid: Candidate Stories & Live Telemetry Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stories List (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SHOWING {filteredStories.length} CANDIDATE STORIES</span>
            <span>RANKED BY 100-PT STRATEGIC SCORE</span>
          </div>

          {filteredStories.length === 0 ? (
            <div className="p-12 text-center border border-slate-800 rounded-xl bg-slate-900/40">
              <FileCheck2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-slate-300">No stories match your filter</div>
              <div className="text-xs text-slate-500 mt-1">Adjust search parameters or run a new 30-minute intelligence cycle.</div>
            </div>
          ) : (
            filteredStories.map(story => (
              <div
                key={story.id}
                className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] hover:border-slate-700 transition-all shadow-sm group"
              >
                {/* Unboxed Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">{story.region}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{story.subject}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="font-mono">{story.eventDate}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className={getVerdictStyle(story.factCheckVerdict)}>
                      {story.factCheckVerdict}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-amber-400 font-bold">
                      {story.priorityScore.total}/100 Score
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
                  {story.headline}
                </h2>

                {/* Proposed Tweet Hook Preview */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 font-sans">
                  {story.proposedTweet}
                </p>

                {/* Primary Source Attributions */}
                <div className="text-xs text-slate-400 mb-4 space-y-1">
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Primary Evidence Cited:</span>
                  </div>
                  {story.primarySources.map((source, idx) => (
                    <div key={idx} className="text-slate-400 pl-5 text-[11px] truncate">
                      {source.name} ({source.tier}) &middot; {source.excerpt}
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                    <span>Status: <strong className={story.publicationStatus === 'PUBLISHED' ? 'text-emerald-400' : 'text-amber-400'}>{story.publicationStatus}</strong></span>
                    <span aria-hidden="true">&middot;</span>
                    <span>Confidence: {story.confidenceLevel}%</span>
                  </div>

                  <button
                    onClick={() => handleInspectStory(story)}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                  >
                    <span>Inspect in Review Queue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Intelligence Telemetry Sidebar (1 Column) */}
        <div className="space-y-6">
          {/* Desk Governance Summary */}
          <div className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Editorial Constitution</span>
            </h3>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>
                <strong className="text-slate-200">Orientation:</strong> Center-right, sovereign national-interest-first, evidence-led contrast.
              </p>
              <p>
                <strong className="text-slate-200">Verification Gate:</strong> Agent 5 holds absolute veto authority. Zero unverified assertions permitted.
              </p>
              <p>
                <strong className="text-slate-200">Format Standard:</strong> Hook &rarr; Evidence &rarr; Context &rarr; Strategic Implication &rarr; Closing Question.
              </p>
            </div>
          </div>

          {/* 30-Minute Cycle History */}
          <div className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Recent Research Cycles</span>
            </h3>

            <div className="space-y-3">
              {telemetryLogs.map((log, idx) => (
                <div key={idx} className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-slate-200">{log.cycleId}</span>
                    <span className="text-slate-400">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    {log.summaryNotes}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono pt-1">
                    <span>{log.itemsIngested} Ingested</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{log.factChecksCompleted} Fact-Checked</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-emerald-400">{log.highPriorityStories} High Priority</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Lead Injection Modal */}
      {isInjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Inject Urgent Geopolitical Lead</span>
              </h3>
              <button 
                onClick={() => setIsInjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-mono cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            <form onSubmit={handleInjectSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Headline or Core Development</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indian Navy intercepts hostile drone vessel in Gulf of Aden"
                  value={newHeadline}
                  onChange={e => setNewHeadline(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Region / Strategic Theatre</label>
                <input
                  type="text"
                  placeholder="e.g. Western Indian Ocean / Horn of Africa"
                  value={newRegion}
                  onChange={e => setNewRegion(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Source Snippet or Specific Claim</label>
                <textarea
                  rows={3}
                  placeholder="Provide quotes, handle sources, or coordinates to be routed to Agent 5 Fact-Checking..."
                  value={newClaim}
                  onChange={e => setNewClaim(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInjectModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded-lg cursor-pointer"
                >
                  Inject into Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
