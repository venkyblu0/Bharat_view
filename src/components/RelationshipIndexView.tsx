import React, { useState } from 'react';
import { useDesk } from '../context/DeskContext';
import { CountryRelationship } from '../types/intelligence';
import { 
  Compass, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  RotateCcw, 
  HelpCircle, 
  AlertCircle,
  BarChart2,
  ExternalLink
} from 'lucide-react';

export const RelationshipIndexView: React.FC = () => {
  const { relationships, recalibrateRelationship } = useDesk();
  const [selectedCountryId, setSelectedCountryId] = useState<string>(relationships[0]?.id || 'rel-usa');

  const selectedRel = relationships.find(r => r.id === selectedCountryId) || relationships[0];

  const dimensionWeights = [
    { key: 'diplomatic', label: 'Diplomatic & Political Alignment', weight: '15%' },
    { key: 'trade', label: 'Trade & Economic Relations', weight: '15%' },
    { key: 'defence', label: 'Defence & Security Cooperation', weight: '15%' },
    { key: 'strategic', label: 'Strategic & Geopolitical Alignment', weight: '15%' },
    { key: 'leadership', label: 'Leadership & Personal Diplomacy', weight: '10%' },
    { key: 'cultural', label: 'People-to-People & Cultural Ties', weight: '10%' },
    { key: 'techEnergy', label: 'Tech, Energy & Critical Resources', weight: '10%' },
    { key: 'neighbourhood', label: 'Neighbourhood & Regional Stability', weight: '5%' },
    { key: 'ideological', label: 'Ideological & Philosophical Affinity', weight: '5%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>India–World Relationship Intelligence Matrix (Agent 6)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Section 2 (Agent 6): Multi-dimensional quantitative index computed across 9 weighted dimensions. Evaluates strategic alignment, not sentimental friendship.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          Composite Index = &Sigma; (Dimension Score &times; Weight)
        </div>
      </div>

      {/* Main Grid: Countries Matrix & Deep Dimension Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Country Selector Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>TRACKED NATIONS ({relationships.length})</span>
            <span>30-DAY DELTA</span>
          </div>

          {relationships.map(rel => {
            const isSelected = selectedCountryId === rel.id;
            const isPositive = rel.delta30d >= 0;

            return (
              <button
                key={rel.id}
                onClick={() => setSelectedCountryId(rel.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500/60 shadow-md shadow-amber-500/5'
                    : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{rel.flag}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{rel.country}</div>
                    <div className="text-[10px] font-mono text-slate-400">Code: {rel.code}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-slate-100">
                    {rel.currentScore.toFixed(1)}
                  </div>
                  <div className={`text-[10px] font-mono flex items-center justify-end gap-0.5 ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{isPositive ? `+${rel.delta30d.toFixed(2)}` : rel.delta30d.toFixed(2)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive & 9 Dimensions (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedRel && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-6 rounded-xl border border-slate-800 bg-[#0F172A] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedRel.flag}</span>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-100">
                        India &ndash; {selectedRel.country} Bilateral Index
                      </h2>
                      <div className="text-xs text-slate-400 font-mono">
                        Last Recalibrated: {selectedRel.lastUpdated} &middot; Confidence: {selectedRel.confidenceRating}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-black font-mono text-amber-400">
                        {selectedRel.currentScore.toFixed(2)} / 100
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Previous: {selectedRel.previousScore.toFixed(2)} (90d: {selectedRel.delta90d >= 0 ? `+${selectedRel.delta90d}` : selectedRel.delta90d})
                      </div>
                    </div>

                    <button
                      onClick={() => recalibrateRelationship(selectedRel.id)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-lg cursor-pointer transition-colors"
                      title="Recalibrate 9 dimensions"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* The 9 Weighted Dimensions Bar Graph */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-2">
                    9 Weighted Dimension Breakdown
                  </div>

                  {dimensionWeights.map(dim => {
                    const val = (selectedRel.dimensions as any)[dim.key] || 50;
                    return (
                      <div key={dim.key} className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-slate-300 font-mono text-[11px]">
                          <span>{dim.label} <span className="text-slate-400">({dim.weight})</span></span>
                          <span className="font-bold">{val}/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              val >= 80 ? 'bg-emerald-400' : val >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                            }`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strategic Insights & Vulnerabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Positive Developments */}
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] space-y-2">
                  <div className="font-mono text-[11px] font-bold text-emerald-400 uppercase">
                    Recent Positive Strategic Developments:
                  </div>
                  <ul className="space-y-1.5 text-slate-300 pl-4 list-disc text-[11px]">
                    {selectedRel.recentPositiveDevelopments.map((pos, idx) => (
                      <li key={idx}>{pos}</li>
                    ))}
                  </ul>
                </div>

                {/* Negative Developments */}
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] space-y-2">
                  <div className="font-mono text-[11px] font-bold text-rose-400 uppercase">
                    Frictional &amp; Competing Interests:
                  </div>
                  <ul className="space-y-1.5 text-slate-300 pl-4 list-disc text-[11px]">
                    {selectedRel.recentNegativeDevelopments.map((neg, idx) => (
                      <li key={idx}>{neg}</li>
                    ))}
                  </ul>
                </div>

                {/* Key Dependencies */}
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] space-y-2">
                  <div className="font-mono text-[11px] font-bold text-amber-400 uppercase">
                    Key Indian Dependencies:
                  </div>
                  <ul className="space-y-1.5 text-slate-300 pl-4 list-disc text-[11px]">
                    {selectedRel.keyDependencies.map((dep, idx) => (
                      <li key={idx}>{dep}</li>
                    ))}
                  </ul>
                </div>

                {/* Strategic Vulnerabilities */}
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] space-y-2">
                  <div className="font-mono text-[11px] font-bold text-orange-400 uppercase">
                    Strategic Vulnerabilities &amp; Risks:
                  </div>
                  <ul className="space-y-1.5 text-slate-300 pl-4 list-disc text-[11px]">
                    {selectedRel.strategicVulnerabilities.map((vuln, idx) => (
                      <li key={idx}>{vuln}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Supporting Sources & Methodology Note */}
              <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] space-y-2 text-xs">
                <div className="font-mono text-[11px] font-bold text-slate-300 uppercase">
                  Supporting Primary Sources for Score Changes:
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedRel.supportingSources.map((src, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400 text-[11px] font-mono">
                      {src}
                    </span>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 leading-relaxed">
                  <strong className="text-slate-300">Methodological Note:</strong> The index treats bilateral relations as structured analytical vectors, not moral judgments. Personal chemistry is weighted as one factor (10%), subordinated to actual defence agreements (15%), trade volume (15%), and geopolitical policy execution (15%).
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
