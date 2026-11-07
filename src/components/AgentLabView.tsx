import React, { useState } from 'react';
import { AgentBlueprint, ChatMessage } from '../types';
import { Bot, Sparkles, Send, Download, RefreshCw, Check, Play, Terminal, ShieldAlert, Wrench, Loader2 } from 'lucide-react';

interface AgentLabViewProps {
  agencyName: string;
  niche: string;
}

export const AgentLabView: React.FC<AgentLabViewProps> = ({ agencyName, niche }) => {
  const [agentName, setAgentName] = useState('SB Orchestrator');
  const [agentType, setAgentType] = useState('Inbound Triage & Appointment Setter');
  const [goal, setGoal] = useState('Qualify inbound leads, answer FAQ queries accurately, and book qualified discovery calls.');
  const [systemInstruction, setSystemInstruction] = useState(
    `You are the principal client solutions agent for ${agencyName || 'Digital SB AI Agency'}. Your goal is to guide prospects through our AI automation services, assess their current operational bottleneck, explain our setup + retainer pricing structure, and schedule a technical discovery call when qualified. Always remain concise, highly professional, and grounded in concrete ROI metrics. If the user asks for legal custom guarantees, invoke human escalation.`
  );
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'calendar_booking',
    'crm_sync',
    'slack_escalate',
  ]);

  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false);
  const [blueprint, setBlueprint] = useState<AgentBlueprint | null>(null);

  // Simulation Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I am ${agentName}, the solutions agent for ${agencyName || 'Aegis AI'}. How can I assist you with automating your operations today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastTrace, setLastTrace] = useState<string | null>('Agent initialized. System guardrails active.');

  const availableTools = [
    { id: 'calendar_booking', name: 'Calendar API', desc: 'Queries real-time team availability and locks calendar slots.' },
    { id: 'crm_sync', name: 'CRM & Pipeline Sync', desc: 'Enriches lead records in HubSpot / Salesforce.' },
    { id: 'slack_escalate', name: 'Slack Human Hand-off', desc: 'Triggers priority alerts for live engineer intervention.' },
    { id: 'rag_vector_search', name: 'Vector Knowledge Search', desc: 'Searches company SOPs, rate cards, and technical docs.' },
    { id: 'stripe_invoicing', name: 'Stripe Invoice Link', desc: 'Generates instant deposit or retainer links.' },
  ];

  const handleToggleTool = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId) ? prev.filter((t) => t !== toolId) : [...prev, toolId]
    );
  };

  const handleGenerateBlueprint = async () => {
    setIsGeneratingBlueprint(true);
    try {
      const response = await fetch('/api/agency/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName,
          agentType,
          niche,
          goal,
          integrationTools: selectedTools,
        }),
      });
      const data = await response.json();
      setBlueprint(data);
      if (data.systemInstruction) {
        setSystemInstruction(data.systemInstruction);
      }
      setLastTrace(`Blueprint v${data.version || '1.0.0'} generated via Gemini 3.8 Flash.`);
    } catch (err) {
      console.error('Failed to generate blueprint:', err);
    } finally {
      setIsGeneratingBlueprint(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isSimulating) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsSimulating(true);

    try {
      setLastTrace(`Processing user intent... Evaluating system instruction guardrails`);
      const response = await fetch('/api/agency/simulate-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName,
          systemInstruction,
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.reply || "I'm ready to help you with that.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...newHistory, assistantMsg]);
      setLastTrace(`Intent satisfied. Response streamed directly from agent persona.`);
    } catch (err) {
      console.error('Simulation error:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: "Our automation pipelines can handle that directly. Would you like to schedule a 15-minute technical review?",
        timestamp: 'Just now',
      };
      setMessages([...newHistory, fallbackMsg]);
      setLastTrace(`Used local fallback execution.`);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleDownloadBlueprintJson = () => {
    const exportData = {
      agencyName,
      niche,
      agentName,
      agentType,
      systemInstruction,
      selectedTools,
      blueprint: blueprint || {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agentName.toLowerCase().replace(/\s+/g, '_')}_blueprint.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: `Agent refreshed. I am ${agentName}. How may I help you today?`,
        timestamp: 'Just now',
      },
    ]);
    setLastTrace('Chat session reset.');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <span>Agent Architecture & Testing Studio</span>
            <span aria-hidden="true">·</span>
            <span>Gemini 3.8 Flash Powered</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Live AI Agent Lab & Simulator
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Engineer production agent system instructions, bind real enterprise tools, and test conversational flows in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadBlueprintJson}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Download className="h-4 w-4 text-slate-400" />
            <span>Export Blueprint JSON</span>
          </button>
          <button
            onClick={handleGenerateBlueprint}
            disabled={isGeneratingBlueprint}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {isGeneratingBlueprint ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate AI Blueprint</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Architect on Left (6 cols), Live Interactive Simulator on Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration & Tools (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-400" />
              <span>Agent Identity & Objectives</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Agent Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. Nova Inbound Qualifier"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Agent Function / Type</label>
                <input
                  type="text"
                  value={agentType}
                  onChange={(e) => setAgentType(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. Customer Support & Scheduler"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Primary Operational Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                placeholder="Qualify inbound inquiries and book qualified discovery calls..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-400">System Instruction Prompt</label>
                <span className="text-[10px] text-slate-500 font-mono">Governs reasoning & boundaries</span>
              </div>
              <textarea
                rows={6}
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 font-mono focus:border-blue-500 focus:outline-none leading-relaxed"
                placeholder="Enter system instruction..."
              />
            </div>

            {/* Tool Binding */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Bound Enterprise Tool Integrations
              </label>
              <div className="space-y-2">
                {availableTools.map((tool) => {
                  const isChecked = selectedTools.includes(tool.id);
                  return (
                    <div
                      key={tool.id}
                      onClick={() => handleToggleTool(tool.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-blue-500/50 bg-blue-950/20'
                          : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-600'
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <div className="text-xs">
                        <div className="font-medium text-slate-200">{tool.name}</div>
                        <div className="text-slate-500 text-[11px]">{tool.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Live Simulation Sandbox (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex flex-col h-[640px] rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
            {/* Simulation Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white font-mono">{agentName} — Test Sandbox</span>
              </div>
              <button
                onClick={handleResetChat}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Telemetry Trace Bar */}
            <div className="px-4 py-1.5 bg-slate-950 border-b border-slate-800/60 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="truncate">Trace: {lastTrace}</span>
              <span className="text-[10px] text-blue-400 uppercase tracking-wider shrink-0 ml-2">Active</span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 text-[10px] text-slate-500">
                    <span>{msg.role === 'user' ? 'Prospect' : agentName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isSimulating && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono py-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                  <span>{agentName} is thinking & checking tools...</span>
                </div>
              )}
            </div>

            {/* Quick Test Scenarios Prompt Pills */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-slate-500 shrink-0">Quick Tests:</span>
              <button
                onClick={() => handleSendMessage('What is your pricing and implementation timeline?')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap shrink-0 transition-colors"
              >
                Inquire Pricing
              </button>
              <button
                onClick={() => handleSendMessage('Can I book a 20-minute discovery call for this Thursday?')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap shrink-0 transition-colors"
              >
                Book Discovery Call
              </button>
              <button
                onClick={() => handleSendMessage('We get 4,000 customer inquiries a week. Can your system handle this volume?')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap shrink-0 transition-colors"
              >
                High Volume Check
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message as a prospective client..."
                disabled={isSimulating}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isSimulating || !inputMessage.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 transition-colors shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
