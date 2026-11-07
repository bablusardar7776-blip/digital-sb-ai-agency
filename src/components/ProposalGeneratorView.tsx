import React, { useState } from 'react';
import { ProposalData, AgencyProfile } from '../types';
import { FileText, Sparkles, Copy, Check, Printer, Download, Clock, DollarSign, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface ProposalGeneratorViewProps {
  profile: AgencyProfile;
}

export const ProposalGeneratorView: React.FC<ProposalGeneratorViewProps> = ({ profile }) => {
  const [clientName, setClientName] = useState('Apex Real Estate Group');
  const [clientIndustry, setClientIndustry] = useState('Commercial Property Management');
  const [problemStatement, setProblemStatement] = useState(
    'Support team overwhelmed with 3,500 monthly tenant maintenance requests and leasing inquiries, resulting in 4-hour response latency and missed prospective tenants.'
  );
  const [estimatedBudget, setEstimatedBudget] = useState('$8,500 setup + $2,400/mo retainer');
  const [timelineWeeks, setTimelineWeeks] = useState('3');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    profile.services.slice(0, 2).map((s) => s.id)
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleToggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    const chosenServices = profile.services
      .filter((s) => selectedServiceIds.includes(s.id))
      .map((s) => s.name);

    try {
      const response = await fetch('/api/agency/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyName: profile.name,
          clientName,
          clientIndustry,
          problemStatement,
          selectedServices: chosenServices,
          estimatedBudget,
          timelineWeeks,
        }),
      });
      const data = await response.json();
      setProposal(data);
    } catch (err) {
      console.error('Failed to generate proposal:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!proposal) return;
    const md = `# ${proposal.proposalTitle}
**Client:** ${proposal.clientName}
**Prepared by:** ${profile.name}
**Date:** ${new Date().toLocaleDateString()}

## Executive Summary
${proposal.executiveSummary}

## Core Project Objectives
${proposal.coreObjectives.map((o) => `- ${o}`).join('\n')}

## Deliverables & Milestone Schedule
${proposal.deliverables
  .map(
    (d) => `### ${d.phase} (${d.duration})
${d.items.map((i) => `- ${i}`).join('\n')}`
  )
  .join('\n\n')}

## Commercial Terms & Investment
- **Setup & Engineering Fee:** ${proposal.investmentBreakdown.setupFee}
- **Monthly SLA & Operations Retainer:** ${proposal.investmentBreakdown.monthlyRetainer}
- **Estimated Annual Operational Savings:** ${proposal.investmentBreakdown.estimatedAnnualSavings}
- **Projected Return on Investment:** ${proposal.investmentBreakdown.projectedRoi}

## Service Level Agreement (SLA) & Governance
${proposal.slaAndSupport}

## Immediate Next Steps
${proposal.nextSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Client SOW & Contract Generator</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Format</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AI Client Proposal Generator
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Generate formal, high-converting scopes of work, milestones, SLA terms, and ROI models in seconds.
          </p>
        </div>

        {proposal && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Printer className="h-4 w-4 text-slate-400" />
              <span>Print / PDF</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4 text-xs">
            <h2 className="text-sm font-semibold text-white">Client & Project Parameters</h2>

            <div>
              <label className="block text-slate-400 mb-1">Prospective Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Client Industry</label>
              <input
                type="text"
                value={clientIndustry}
                onChange={(e) => setClientIndustry(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Core Operational Bottleneck / Need</label>
              <textarea
                rows={3}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Target Budget</label>
                <input
                  type="text"
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Timeline (Weeks)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={timelineWeeks}
                  onChange={(e) => setTimelineWeeks(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-2">Included Agency Services</label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {profile.services.map((service) => {
                  const isChecked = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleToggleService(service.id)}
                      className={`flex items-center gap-2 p-2 rounded border cursor-pointer text-xs ${
                        isChecked
                          ? 'border-blue-500/50 bg-blue-950/30 text-white'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span className="truncate">{service.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerateProposal}
              disabled={isGenerating}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Proposal...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Enterprise Proposal</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Proposal Document Preview (8 cols) */}
        <div className="lg:col-span-8">
          {proposal ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl space-y-8 font-sans">
              {/* Proposal Header */}
              <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <AgencyLogo logoUrl={profile.logoUrl} agencyName={profile.name} size="lg" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
                      CONFIDENTIAL STATEMENT OF WORK
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{proposal.proposalTitle}</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                      <span>Client: <strong className="text-slate-200">{proposal.clientName}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Agency: <strong className="text-slate-200">{profile.name}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Date: <strong className="text-slate-200">{new Date().toLocaleDateString()}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-xs self-start">
                  Status: Ready for Authorization
                </div>
              </div>

              {/* Section 1: Executive Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  01. Executive Summary
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{proposal.executiveSummary}</p>
              </div>

              {/* Section 2: Core Objectives */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  02. Core Operational Objectives
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {proposal.coreObjectives?.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
                      <span className="text-blue-400 font-mono font-bold">0{i + 1}.</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Deliverables & Milestones */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  03. Phased Implementation Roadmap
                </h3>
                <div className="space-y-3">
                  {proposal.deliverables?.map((deliv, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white">{deliv.phase}</span>
                        <span className="text-xs font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/50">
                          {deliv.duration}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                        {deliv.items?.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Commercial Terms & ROI Projection */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  04. Commercial Terms & Projected Return on Investment
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">One-Time Setup</span>
                    <span className="text-base font-bold text-white font-mono tabular-nums">
                      {proposal.investmentBreakdown.setupFee}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Monthly Retainer</span>
                    <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                      {proposal.investmentBreakdown.monthlyRetainer}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Estimated Savings</span>
                    <span className="text-base font-bold text-white font-mono tabular-nums">
                      {proposal.investmentBreakdown.estimatedAnnualSavings}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Projected ROI</span>
                    <span className="text-base font-bold text-blue-400 font-mono tabular-nums">
                      {proposal.investmentBreakdown.projectedRoi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 5: SLA & Governance */}
              <div className="space-y-2 p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span>05. SLA & Enterprise Governance</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{proposal.slaAndSupport}</p>
              </div>

              {/* Section 6: Next Steps */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  06. Immediate Implementation Steps
                </h3>
                <div className="space-y-2">
                  {proposal.nextSteps?.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 font-mono text-[10px] font-bold">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/20 p-8 text-center text-slate-400">
              <FileText className="h-10 w-10 text-slate-600 mb-3" />
              <h3 className="text-base font-semibold text-white">No Proposal Drafted Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Fill in the client parameters on the left and click "Generate Enterprise Proposal" to create a complete, ready-to-sign SOW.
              </p>
              <button
                onClick={handleGenerateProposal}
                disabled={isGenerating}
                className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Apex Real Estate SOW</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
