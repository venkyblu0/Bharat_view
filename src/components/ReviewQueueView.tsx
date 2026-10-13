import React, { useState } from 'react';
import { useDesk } from '../context/DeskContext';
import { CandidateStory, FactCheckVerdict } from '../types/intelligence';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Edit3, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Check, 
  Twitter, 
  MessageSquare, 
  Repeat, 
  Heart, 
  Bookmark, 
  Share, 
  FileText,
  Scale
} from 'lucide-react';

export const ReviewQueueView: React.FC = () => {
  const { 
    stories, 
    selectedStory, 
    setSelectedStory, 
    approveStory, 
    rejectStory, 
    updateStoryTweet,
    reverifyStory 
  } = useDesk();

  const [filterStatus, setFilterStatus] = useState<'PENDING' | 'PUBLISHED' | 'REJECTED' | 'ALL'>('PENDING');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTweetText, setEditTweetText] = useState<string>('');
  const [rejectReason, setRejectReason] = useState<string>('');
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);

  const displayedStories = stories.filter(story => {
    if (filterStatus === 'PENDING') return story.publicationStatus === 'DRAFT' || story.publicationStatus === 'NEEDS_RESEARCH';
    if (filterStatus === 'PUBLISHED') return story.publicationStatus === 'PUBLISHED';
    if (filterStatus === 'REJECTED') return story.publicationStatus === 'REJECTED';
    return true;
  });

  const activeStory = selectedStory || displayedStories[0] || null;

  const handleStartEdit = () => {
    if (!activeStory) return;
    setEditTweetText(activeStory.proposedTweet);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!activeStory) return;
    updateStoryTweet(activeStory.id, editTweetText);
    setIsEditing(false);
  };

  const handleConfirmReject = () => {
    if (!activeStory || !rejectReason.trim()) return;
    rejectStory(activeStory.id, rejectReason);
    setShowRejectDialog(false);
    setRejectReason('');
  };

  const getVerdictBadge = (verdict: FactCheckVerdict) => {
    switch (verdict) {
      case 'VERIFIED':
        return <span className="text-emerald-400 font-bold font-mono">VERIFIED</span>;
      case 'MOSTLY TRUE':
        return <span className="text-teal-400 font-bold font-mono">MOSTLY TRUE</span>;
      case 'MISLEADING':
        return <span className="text-amber-400 font-bold font-mono">MISLEADING</span>;
      case 'FALSE':
        return <span className="text-rose-400 font-bold font-mono">FALSE</span>;
      case 'UNSUPPORTED':
        return <span className="text-orange-400 font-bold font-mono">UNSUPPORTED</span>;
      case 'DISPUTED':
        return <span className="text-purple-400 font-bold font-mono">DISPUTED</span>;
      default:
        return <span className="text-slate-400 font-bold font-mono">UNVERIFIED BREAKING</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#0F172A]">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span>Chief Editorial Approval Gate (Human-in-the-Loop)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Section 9 &amp; 12 Compliance: No political or geopolitical post is published autonomously. Every story requires human verification and sign-off.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          {[
            { id: 'PENDING', label: 'Pending Review' },
            { id: 'PUBLISHED', label: 'Approved & Published' },
            { id: 'REJECTED', label: 'Rejected' },
            { id: 'ALL', label: 'All Records' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Story Selection List & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Queue List (4 Columns) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>QUEUE ({displayedStories.length} STORIES)</span>
            <span>CLICK TO AUDIT</span>
          </div>

          {displayedStories.length === 0 ? (
            <div className="p-8 text-center border border-slate-800 rounded-xl bg-slate-900/40 text-xs text-slate-500 font-mono">
              Queue clear. No stories in this status.
            </div>
          ) : (
            displayedStories.map(story => (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStory(story);
                  setIsEditing(false);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activeStory?.id === story.id
                    ? 'bg-slate-800/90 border-amber-500/60 shadow-md shadow-amber-500/5'
                    : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5">
                  <span className="font-semibold text-slate-300">{story.region}</span>
                  <span>{getVerdictBadge(story.factCheckVerdict)}</span>
                </div>

                <div className="text-xs font-bold text-slate-100 line-clamp-2 leading-snug mb-2">
                  {story.headline}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                  <span className="text-amber-400 font-bold">{story.priorityScore.total}/100 Score</span>
                  <span className="uppercase text-slate-300">{story.publicationStatus}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detailed Inspector & X Preview (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          {!activeStory ? (
            <div className="p-12 text-center border border-slate-800 rounded-xl bg-slate-900/40 text-slate-500 font-mono text-xs">
              Select a story from the queue to inspect full evidentiary record.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Section 11 Dossier Record */}
              <div className="p-6 rounded-xl border border-slate-800 bg-[#0F172A] space-y-5">
                {/* Dossier Header */}
                <div className="border-b border-slate-800 pb-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        {activeStory.id}
                      </span>
                      <span>{activeStory.region} &middot; {activeStory.subject}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>Event: {activeStory.eventDate}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="text-amber-400 font-bold">
                        Priority: {activeStory.priorityScore.total}/100
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-100 leading-tight">
                    {activeStory.headline}
                  </h2>

                  <div className="text-xs text-slate-400 italic">
                    Alternative Hook: "{activeStory.alternativeHook}"
                  </div>
                </div>

                {/* Fact-Check Verdict & Corroboration Block */}
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300 font-bold">Agent 5 Verification Gate:</span>
                      {getVerdictBadge(activeStory.factCheckVerdict)}
                    </div>

                    <div className="text-xs font-mono text-slate-400">
                      Confidence Level: <strong className="text-slate-200">{activeStory.confidenceLevel}%</strong>
                    </div>
                  </div>

                  {/* Primary & Corroborating Sources */}
                  <div className="text-xs space-y-2 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400 font-semibold font-mono text-[11px] uppercase">
                        Tier 1 Primary Evidence:
                      </span>
                      <ul className="mt-1 space-y-1 text-slate-300 pl-4 list-disc text-[11px]">
                        {activeStory.primarySources.map((src, idx) => (
                          <li key={idx}>
                            <strong>{src.name}</strong> ({src.date}): {src.excerpt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {activeStory.corroboratingSources.length > 0 && (
                      <div>
                        <span className="text-slate-400 font-semibold font-mono text-[11px] uppercase">
                          Tier 2 Independent Corroboration:
                        </span>
                        <ul className="mt-1 space-y-1 text-slate-300 pl-4 list-disc text-[11px]">
                          {activeStory.corroboratingSources.map((src, idx) => (
                            <li key={idx}>
                              <strong>{src.name}</strong>: {src.excerpt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeStory.contradictoryEvidence && (
                      <div className="pt-1">
                        <span className="text-amber-400/90 font-semibold font-mono text-[11px] uppercase">
                          Counter-Evidence Investigated:
                        </span>
                        <p className="text-slate-400 text-[11px] mt-0.5 pl-4 border-l border-amber-500/30">
                          {activeStory.contradictoryEvidence}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Strategic Relevance & Policy Implications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="font-mono text-[11px] text-amber-400 font-bold uppercase">
                      Strategic Relevance to India:
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {activeStory.strategicRelevance}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="font-mono text-[11px] text-amber-400 font-bold uppercase">
                      Policy &amp; Legal Risk Flags:
                    </div>
                    <ul className="text-slate-300 leading-relaxed text-[11px] list-disc pl-4 space-y-0.5">
                      {activeStory.legalRiskFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 100-Point Prioritization Score Breakdown */}
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-300 font-bold text-[11px]">
                    <span>100-PT PRIORITIZATION SCORE FORMULA</span>
                    <span className="text-amber-400">{activeStory.priorityScore.total}/100</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400">
                    <div>Strategic: {activeStory.priorityScore.strategicImportance}/25</div>
                    <div>Evidence: {activeStory.priorityScore.evidenceQuality}/25</div>
                    <div>Timeliness: {activeStory.priorityScore.timeliness}/15</div>
                    <div>Public Interest: {activeStory.priorityScore.publicInterest}/10</div>
                    <div>Analytical: {activeStory.priorityScore.analyticalValue}/10</div>
                    <div>Discussion: {activeStory.priorityScore.discussionPotential}/10</div>
                    <div>Editorial Identity: {activeStory.priorityScore.editorialAlignment}/5</div>
                  </div>
                </div>
              </div>

              {/* Realistic X (Twitter) Preview & Copy Editor */}
              <div className="p-6 rounded-xl border border-slate-800 bg-[#0F172A] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-sky-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                      X (Twitter) Draft Preview
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <button
                        onClick={handleStartEdit}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit Copy</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveEdit}
                        className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded text-xs cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      rows={6}
                      value={editTweetText}
                      onChange={e => setEditTweetText(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Structure: Hook &rarr; Evidence &rarr; Context &rarr; Implication &rarr; Closing</span>
                      <span className={editTweetText.length > 280 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                        {editTweetText.length} / 280 characters
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Realistic Twitter Card UI */
                  <div className="max-w-xl mx-auto p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 shadow-md space-y-3">
                    {/* User Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src="/src/assets/images/desk_emblem_seal_1791879019614.jpg" 
                          alt="Bharat Desk Avatar" 
                          className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <span>Bharat Strategic Intelligence</span>
                            <span className="text-amber-400" title="Verified Sovereign Intelligence Account">✓</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            @BharatIntelDesk &middot; Now
                          </div>
                        </div>
                      </div>
                      <Twitter className="w-4 h-4 text-slate-600" />
                    </div>

                    {/* Tweet Content */}
                    <p className="text-xs text-slate-100 whitespace-pre-wrap leading-relaxed font-sans">
                      {activeStory.proposedTweet}
                    </p>

                    {/* Attached Source Badges */}
                    {activeStory.sourcesToAttach.length > 0 && (
                      <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                        <div className="font-semibold text-slate-300 font-mono text-[10px] uppercase">
                          Attached Evidence Dossier:
                        </div>
                        {activeStory.sourcesToAttach.map((att, idx) => (
                          <div key={idx} className="text-slate-400 flex items-center gap-1.5">
                            <span className="text-amber-400">&bull;</span>
                            <span>{att}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tweet Action Bar (Mock Metrics) */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-400 text-xs">
                      <div className="flex items-center gap-1 hover:text-sky-400 cursor-pointer">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono">142</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                        <Repeat className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono">820</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-rose-400 cursor-pointer">
                        <Heart className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono">3.4K</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-amber-400 cursor-pointer">
                        <Bookmark className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono">650</span>
                      </div>
                      <Share className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* Primary Editorial Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => reverifyStory(activeStory.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Request Agent 5 Re-Check</span>
                    </button>

                    <button
                      onClick={() => setShowRejectDialog(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject with Reason</span>
                    </button>
                  </div>

                  {activeStory.publicationStatus !== 'PUBLISHED' ? (
                    <button
                      onClick={() => approveStory(activeStory.id)}
                      className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-400/20 cursor-pointer transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve &amp; Dispatch to X</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <Check className="w-4 h-4" />
                      <span>Published on X ({activeStory.publishedAt})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reject Reason Modal */}
      {showRejectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Reject Candidate Story</span>
            </h3>
            <p className="text-xs text-slate-400">
              Provide a mandatory justification for the internal audit record:
            </p>

            <textarea
              rows={3}
              required
              placeholder="e.g. Primary document date was prior to stated event; insufficient independent corroboration for disputed casualty figure."
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-rose-400 font-mono"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 text-xs bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
