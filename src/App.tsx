import React from 'react';
import { DeskProvider, useDesk } from './context/DeskContext';
import { Header } from './components/Header';
import { NewsroomView } from './components/NewsroomView';
import { AgentLabView } from './components/AgentLabView';
import { ReviewQueueView } from './components/ReviewQueueView';
import { RelationshipIndexView } from './components/RelationshipIndexView';
import { WatchlistView } from './components/WatchlistView';
import { PerformanceView } from './components/PerformanceView';
import { Check, AlertCircle } from 'lucide-react';

const DeskAppContent: React.FC = () => {
  const { activeTab, notification } = useDesk();

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 border border-amber-500/40 text-amber-200 text-xs font-mono rounded-lg shadow-2xl backdrop-blur-md animate-fade-in">
          <Check className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'newsroom' && <NewsroomView />}
        {activeTab === 'agent-lab' && <AgentLabView />}
        {activeTab === 'review-queue' && <ReviewQueueView />}
        {activeTab === 'relationship-index' && <RelationshipIndexView />}
        {activeTab === 'watchlist' && <WatchlistView />}
        {activeTab === 'performance' && <PerformanceView />}
      </main>

      {/* Sovereign Editorial Footer */}
      <footer className="border-t border-slate-900 bg-[#060910] py-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">BHARAT STRATEGIC INTELLIGENCE DESK</span>
            <span aria-hidden="true">&middot;</span>
            <span>NATIONAL INTEREST FIRST</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Evidence Over Virality</span>
            <span aria-hidden="true">&middot;</span>
            <span>Independent Veto Gate Active</span>
            <span aria-hidden="true">&middot;</span>
            <span>Human Editorial Sign-Off</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <DeskProvider>
      <DeskAppContent />
    </DeskProvider>
  );
}
