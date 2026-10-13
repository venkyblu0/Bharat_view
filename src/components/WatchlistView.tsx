import React, { useState } from 'react';
import { useDesk } from '../context/DeskContext';
import { MonitoredAccount, SourceTier } from '../types/intelligence';
import { 
  Users, 
  Search, 
  Plus, 
  ShieldCheck, 
  AlertCircle, 
  History, 
  ToggleLeft, 
  ToggleRight,
  Filter
} from 'lucide-react';

export const WatchlistView: React.FC = () => {
  const { 
    accounts, 
    toggleAccountActive, 
    addMonitoredAccount, 
    corrections 
  } = useDesk();

  const [activeTab, setActiveTab] = useState<'watchlist' | 'corrections'>('watchlist');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New account form
  const [newHandle, setNewHandle] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newRegion, setNewRegion] = useState<string>('India');
  const [newCategory, setNewCategory] = useState<any>('Think Tank');
  const [newTier, setNewTier] = useState<SourceTier>('TIER_2');
  const [newReliability, setNewReliability] = useState<number>(85);
  const [newConflict, setNewConflict] = useState<string>('');

  const filteredAccounts = accounts.filter(acc => {
    const matchRegion = selectedRegion === 'ALL' || acc.region === selectedRegion;
    const matchTier = selectedTier === 'ALL' || acc.tier === selectedTier;
    const matchSearch = 
      acc.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchTier && matchSearch;
  });

  const regions = ['ALL', 'India', 'China & East Asia', 'Pakistan & South Asia', 'United States', 'Europe & UK', 'Russia & Central Asia', 'West Asia'];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) return;

    addMonitoredAccount({
      handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
      name: newName || newHandle,
      region: newRegion,
      category: newCategory,
      tier: newTier,
      reliabilityScore: newReliability,
      conflictsOfInterest: newConflict || 'Declared independent.',
      correctionsHistory: 'Standard record.',
      active: true
    });

    setShowAddModal(false);
    setNewHandle('');
    setNewName('');
    setNewConflict('');
  };

  return (
    <div className="space-y-6">
      <div role="alert" className="rounded-lg border border-amber-500/50 bg-amber-950/40 px-4 py-3 text-sm text-amber-100">
        This is a sample directory only. Accounts are not being monitored, and reliability scores or “last checked” times are not live measurements.
      </div>
      {/* Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Source Watchlist &amp; Corrections Archive (Sections 3 &amp; 12)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sample directory of source records. No live feed, monthly audit, or source reliability scoring is connected.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'watchlist'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active Watchlist ({accounts.length})
            </button>
            <button
              onClick={() => setActiveTab('corrections')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'corrections'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Public Corrections Archive ({corrections.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Account</span>
          </button>
        </div>
      </div>

      {activeTab === 'watchlist' ? (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto text-xs">
              {regions.map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedRegion === reg
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search handles, names, categories..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Accounts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAccounts.map(account => (
              <div
                key={account.id}
                className={`p-4 rounded-xl border transition-all ${
                  account.active 
                    ? 'bg-[#0F172A] border-slate-800 hover:border-slate-700' 
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{account.name}</span>
                    </div>
                    <div className="text-xs font-mono text-amber-400">
                      {account.handle}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAccountActive(account.id)}
                    className="text-slate-400 hover:text-slate-200 cursor-pointer"
                    title={account.active ? 'Pause monitoring' : 'Resume monitoring'}
                  >
                    {account.active ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
                  <span>{account.region}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{account.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className={account.tier === 'TIER_1' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                    {account.tier}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between font-mono">
                    <span>Reliability Assessment:</span>
                    <strong className={account.reliabilityScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                      {account.reliabilityScore}/100
                    </strong>
                  </div>
                  <div className="truncate text-slate-400">
                    <span className="text-slate-400 font-medium">Affiliation: </span>
                    {account.conflictsOfInterest}
                  </div>
                  <div className="truncate text-slate-400">
                    <span className="text-slate-400 font-medium">Correction History: </span>
                    {account.correctionsHistory}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Corrections Archive Tab */
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] space-y-2">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <span>Immutable Transparency &amp; Errata Log</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Section 9: If a published post is materially wrong, it must be flagged promptly, a correction published on X, and an internal record retained with corrective action. We never delete evidence or conceal an editorial mistake.
            </p>
          </div>

          <div className="space-y-3">
            {corrections.map(cor => (
              <div key={cor.id} className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-amber-400 font-bold">{cor.id}</span>
                    <span className="mx-2">&middot;</span>
                    <span>Origin: {cor.originalPostId}</span>
                  </div>
                  <div>
                    Published: {cor.publishedDate} &middot; Corrected: {cor.correctionDate}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 font-bold uppercase">Original Text:</div>
                    <p className="text-slate-300 italic pl-3 border-l-2 border-slate-700 mt-0.5">
                      "{cor.originalPostText}"
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-rose-400 font-bold uppercase">Root Cause / Error Identified:</div>
                    <p className="text-slate-300 pl-3 border-l-2 border-rose-500/50 mt-0.5">
                      {cor.reason}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase">Corrective Action Taken:</div>
                    <p className="text-slate-300 pl-3 border-l-2 border-emerald-500/50 mt-0.5">
                      {cor.correctiveActionTaken}
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
                    Internal Protocol Audit: {cor.internalAuditNotes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Account to 30-Minute Monitoring Watchlist</span>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">X Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="@HandleName"
                    value={newHandle}
                    onChange={e => setNewHandle(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Institution / Analyst Name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Region</label>
                  <select
                    value={newRegion}
                    onChange={e => setNewRegion(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    {regions.filter(r => r !== 'ALL').map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Government">Government / Ministry</option>
                    <option value="Wire Service">Wire Service</option>
                    <option value="Think Tank">Think Tank</option>
                    <option value="Defence Analyst">Defence Analyst</option>
                    <option value="Independent Journalist">Independent Journalist</option>
                    <option value="State Media">State Media</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Source Hierarchy Tier</label>
                  <select
                    value={newTier}
                    onChange={e => setNewTier(e.target.value as SourceTier)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="TIER_1">Tier 1: Primary Evidence (Official gazette/gov)</option>
                    <option value="TIER_2">Tier 2: Independent Corroboration (Wire/Thinktank)</option>
                    <option value="TIER_3">Tier 3: Discovery & Commentary (Opinion/Viral)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Reliability Score (0-100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newReliability}
                    onChange={e => setNewReliability(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Known Institutional Affiliations or Conflicts</label>
                <input
                  type="text"
                  placeholder="e.g. State-funded foreign broadcasting service; corporate defense sponsorship"
                  value={newConflict}
                  onChange={e => setNewConflict(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded-lg cursor-pointer"
                >
                  Add to Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
