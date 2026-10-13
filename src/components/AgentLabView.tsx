import React, { useState } from 'react';
import { useDesk } from '../context/DeskContext';
import { 
  Globe, 
  Building2, 
  Shield, 
  Eye, 
  CheckCircle2, 
  Compass, 
  PenTool, 
  Play, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  FileText,
  RotateCcw,
  Check,
  Send
} from 'lucide-react';

export const AgentLabView: React.FC = () => {
  const { 
    agentSpecs, 
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
    pipeFlowOutputToDraft
  } = useDesk();

  const [activeLabMode, setActiveLabMode] = useState<'standalone' | 'flows'>('standalone');

  // Standalone inputs state
  const currentAgentSpec = agentSpecs.find(a => a.id === selectedAgentId) || agentSpecs[0];
  const [standaloneInputs, setStandaloneInputs] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    currentAgentSpec.defaultInputs.forEach(inp => {
      initial[inp.key] = inp.defaultValue || '';
    });
    return initial;
  });

  // Flow initial input
  const [flowPromptInput, setFlowPromptInput] = useState<string>(
    'Adversarial state media claims India has abandoned sovereignty claims in Ladakh while signing a secret naval treaty in Mauritius without parliamentary ratification.'
  );

  // When changing agent tab, update inputs default
  const handleSelectAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    const spec = agentSpecs.find(a => a.id === agentId);
    if (spec) {
      const updated: Record<string, string> = {};
      spec.defaultInputs.forEach(inp => {
        updated[inp.key] = inp.defaultValue || '';
      });
      setStandaloneInputs(updated);
    }
  };

  const handleRunStandalone = async () => {
    await invokeStandaloneAgent(
      selectedAgentId,
      currentAgentSpec.role,
      standaloneInputs
    );
  };

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Eye': return <Eye className="w-4 h-4" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'PenTool': return <PenTool className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const currentResult = agentResults[selectedAgentId];

  return (
    <div className="space-y-6">
      {/* Top Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#0F172A]">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-amber-400" />
            <span>Autonomous Agent Laboratory &amp; Flow Choreographer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Invoke specialized agents individually based on their specific operational duties, or chain them into custom multi-agent editorial workflows.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveLabMode('standalone')}
            className={`px-4 py-2 font-medium rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeLabMode === 'standalone'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Standalone Agent Workstation</span>
          </button>
          <button
            onClick={() => setActiveLabMode('flows')}
            className={`px-4 py-2 font-medium rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeLabMode === 'flows'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Agent Flow Builder</span>
          </button>
        </div>
      </div>

      {activeLabMode === 'standalone' ? (
        /* ========================================================================= */
        /* MODE 1: STANDALONE AGENT WORKSTATION                                      */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Agent Selector Ribbon (3 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2 px-1">
              Select Autonomous Agent
            </div>

            {agentSpecs.map(agent => (
              <button
                key={agent.id}
                onClick={() => handleSelectAgent(agent.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  selectedAgentId === agent.id
                    ? 'bg-slate-800/90 border-amber-500/60 shadow-md shadow-amber-500/5'
                    : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg mt-0.5 ${
                  selectedAgentId === agent.id ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}>
                  {getAgentIcon(agent.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-200 truncate">
                      Agent {agent.agentNumber}: {agent.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400/80 shrink-0">
                      {agent.codename.split('-')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {agent.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Execution & Duty Form (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Agent Duty Header */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    AGENT {currentAgentSpec.agentNumber} &middot; {currentAgentSpec.codename}
                  </span>
                  <h2 className="text-base font-bold text-slate-100">
                    {currentAgentSpec.name}
                  </h2>
                </div>

                {selectedAgentId === 'agent-5' && (
                  <span className="text-xs font-mono text-rose-400 font-semibold">
                    [INDEPENDENT VETO AUTHORITY]
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentAgentSpec.role}
              </p>

              {/* Dynamic Inputs Form */}
              <div className="space-y-3 pt-2">
                {currentAgentSpec.defaultInputs.map(input => (
                  <div key={input.key}>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {input.label}
                    </label>
                    <textarea
                      rows={2}
                      value={standaloneInputs[input.key] || ''}
                      onChange={e => setStandaloneInputs({ ...standaloneInputs, [input.key]: e.target.value })}
                      placeholder={input.placeholder}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              {/* Run Action */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono">
                  Engine: Local Ollama model · no web access
                </div>

                <button
                  onClick={handleRunStandalone}
                  disabled={isAgentRunning}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isAgentRunning ? 'Executing Duty...' : `Invoke Agent ${currentAgentSpec.agentNumber}`}</span>
                </button>
              </div>
            </div>

            {/* Agent Output Terminal */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                    Agent Intelligence Dossier Output
                  </h3>
                </div>

                {currentResult && (
                  <div className="flex items-center gap-2 text-xs font-mono">
                    {currentResult.verdict && (
                      <span className="font-bold text-emerald-400">
                        VERDICT: {currentResult.verdict}
                      </span>
                    )}
                    {currentResult.score !== undefined && (
                      <span className="font-bold text-amber-400">
                        SCORE: {currentResult.score}/100
                      </span>
                    )}
                  </div>
                )}
              </div>

              {!currentResult ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  Agent idle. Fill in parameters above and click "Invoke Agent" to view structured output.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Thinking Steps */}
                  <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 text-xs font-mono space-y-1">
                    <div className="text-[11px] text-slate-400 font-bold uppercase">Reasoning Trace:</div>
                    {currentResult.thinkingProcess.map((step, idx) => (
                      <div key={idx} className="text-slate-300 flex items-center gap-2 text-[11px]">
                        <span className="text-amber-400">&bull;</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  {/* Findings Prose */}
                  <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">
                    {currentResult.findings}
                  </div>

                  {/* Proposed Tweet or Action */}
                  {currentResult.proposedContent && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs space-y-1.5">
                      <div className="text-[11px] font-bold text-amber-400 uppercase font-mono">
                        Generated High-Impact Tweet Draft:
                      </div>
                      <p className="text-slate-100 font-sans leading-relaxed">
                        {currentResult.proposedContent}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 2: CUSTOM MULTI-AGENT FLOW BUILDER                                   */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Template Loader & Flow Config */}
          <div className="p-5 rounded-xl border border-slate-800 bg-[#0F172A] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Pipeline Choreographer: {customFlow.name}</span>
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Chain agents sequentially. Outputs from Step N automatically flow as context into Step N+1.
                </div>
              </div>

              {/* Template Buttons */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-mono">Templates:</span>
                <button
                  onClick={() => loadFlowTemplate('disinformation')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                >
                  Debunking
                </button>
                <button
                  onClick={() => loadFlowTemplate('policy')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                >
                  Policy Audit
                </button>
                <button
                  onClick={() => loadFlowTemplate('defence')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                >
                  Defence OSINT
                </button>
              </div>
            </div>

            {/* Root Input Prompt */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Root Inquiry / Unverified Incident to Feed into Step 1:
              </label>
              <textarea
                rows={2}
                value={flowPromptInput}
                onChange={e => setFlowPromptInput(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Sequential Pipeline Visualizer */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>PIPELINE STAGES ({customFlow.steps.length} AGENTS CHAINED)</span>
              <span>DATA FLOWS LEFT-TO-RIGHT / TOP-TO-BOTTOM</span>
            </div>

            <div className="space-y-3">
              {customFlow.steps.map((step, index) => {
                const spec = agentSpecs.find(a => a.id === step.agentId) || agentSpecs[0];
                const stepResult = customFlow.stepResults[index];

                return (
                  <div 
                    key={step.id} 
                    className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] relative group hover:border-slate-700 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            AGENT {spec.agentNumber}
                          </span>
                          <span className="text-sm font-bold text-slate-100">
                            {spec.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {customFlow.steps.length > 1 && (
                          <button
                            onClick={() => removeFlowStep(step.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer transition-colors"
                            title="Remove stage"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Step Duty Customizer */}
                    <div className="mt-2 pl-9">
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">
                        Duty Instruction for Stage {index + 1}:
                      </label>
                      <input
                        type="text"
                        value={step.customDutyPrompt || ''}
                        onChange={e => updateFlowStepPrompt(step.id, e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                      />
                    </div>

                    {/* Intermediate Result Display */}
                    {stepResult && (
                      <div className="mt-3 pl-9 pt-3 border-t border-slate-800/80">
                        <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Stage {index + 1} Completed Output:</span>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-[11px] font-mono text-slate-300 max-h-40 overflow-y-auto leading-relaxed">
                          {stepResult.findings}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pipeline Controls: Add Agent Step & Run Flow */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#0F172A]">
              {/* Add Step Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-mono">Append Agent:</span>
                {agentSpecs.map(spec => (
                  <button
                    key={spec.id}
                    onClick={() => addFlowStep(spec.id)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-mono cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3 text-amber-400" />
                    <span>Agent {spec.agentNumber}</span>
                  </button>
                ))}
              </div>

              {/* Execution Actions */}
              <div className="flex items-center gap-3">
                {customFlow.stepResults.length > 0 && (
                  <button
                    onClick={pipeFlowOutputToDraft}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Editorial Queue</span>
                  </button>
                )}

                <button
                  onClick={() => executeCustomFlow(flowPromptInput)}
                  disabled={customFlow.status === 'running'}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{customFlow.status === 'running' ? 'Piping Through Pipeline...' : 'Execute Chained Flow'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
