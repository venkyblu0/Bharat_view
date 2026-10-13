import React from 'react';
import { useDesk } from '../context/DeskContext';
import { Play, Loader2, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    stories, 
    cycleSecondsRemaining, 
    isCycleRunning, 
    runResearchCycle 
  } = useDesk();

  const pendingCount = stories.filter(s => s.publicationStatus === 'DRAFT' || s.publicationStatus === 'NEEDS_RESEARCH').length;

  const minutes = Math.floor(cycleSecondsRemaining / 60);
  const seconds = cycleSecondsRemaining % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Text Element Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <img 
              src="/src/assets/images/desk_emblem_seal_1791879019614.jpg" 
              alt="Bharat Strategic Intelligence Seal"
              className="w-9 h-9 rounded-full object-cover border border-amber-500/40 shadow-sm shadow-amber-500/10"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={() => setActiveTab('newsroom')} 
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="text-base font-bold tracking-tight text-slate-100 group-hover:text-amber-400 transition-colors whitespace-nowrap">
                BHARAT STRATEGIC INTELLIGENCE
              </div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wider -mt-1">
                EDITORIAL DESK &middot; X COMMENTARY
              </div>
            </button>
          </div>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('newsroom')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'newsroom' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Live Newsroom
            </button>
            <button
              onClick={() => setActiveTab('agent-lab')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'agent-lab' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Agent Lab &amp; Flows
            </button>
            <button
              onClick={() => setActiveTab('review-queue')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer flex items-center gap-2 ${
                activeTab === 'review-queue' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <span>Editorial Queue</span>
              {pendingCount > 0 && (
                <span className="text-[11px] font-mono text-amber-300">
                  [{pendingCount}]
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('relationship-index')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'relationship-index' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Relationship Index
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'watchlist' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Source Watchlist
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'performance' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Performance
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action with 30-min Cycle Clock */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Cycle Cadence
              </span>
              <span className="text-xs font-mono font-semibold text-slate-200">
                Next in {timeFormatted}
              </span>
            </div>
            <button
              onClick={() => runResearchCycle()}
              disabled={isCycleRunning}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-sm shadow-amber-400/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isCycleRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Trigger 30m Cycle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
