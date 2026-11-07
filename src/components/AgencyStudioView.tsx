import React, { useState } from 'react';
import { AgencyProfile, AgencyService } from '../types';
import { PRESET_AGENCIES } from '../data/presets';
import { Sparkles, Plus, Trash2, CheckCircle2, ChevronRight, TrendingUp, Layers, Compass, Loader2, Image as ImageIcon } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface AgencyStudioViewProps {
  profile: AgencyProfile;
  setProfile: React.Dispatch<React.SetStateAction<AgencyProfile>>;
  onSwitchToLab: () => void;
  onSwitchToProposals: () => void;
}

export const AgencyStudioView: React.FC<AgencyStudioViewProps> = ({
  profile,
  setProfile,
  onSwitchToLab,
  onSwitchToProposals,
}) => {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('digital_sb');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newService, setNewService] = useState<Partial<AgencyService>>({
    name: '',
    category: 'Support',
    description: '',
    setupFee: 4500,
    monthlyRetainer: 2000,
    deliveryWeeks: 2,
    featured: false,
    active: true,
  });

  const handleSelectPreset = (key: string) => {
    setSelectedPresetKey(key);
    if (PRESET_AGENCIES[key]) {
      setProfile(JSON.parse(JSON.stringify(PRESET_AGENCIES[key])));
      setAuditResult(null);
    }
  };

  const handleRunNicheAudit = async () => {
    setIsAuditing(true);
    try {
      const response = await fetch('/api/agency/audit-niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: profile.niche,
          targetAudience: profile.subheadline,
          currentOffer: profile.services.map((s) => s.name).join(', '),
          budgetTier: 'Mid to High Ticket ($4k-$12k setup, $2k-$5k/mo)',
        }),
      });
      const data = await response.json();
      setAuditResult(data);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleApplyAuditServices = () => {
    if (!auditResult?.highMarginServices) return;
    const newServicesList: AgencyService[] = auditResult.highMarginServices.map(
      (s: any, idx: number) => ({
        id: `audited-${Date.now()}-${idx}`,
        name: s.name,
        category: (s.name.toLowerCase().includes('voice') ? 'Voice' : s.name.toLowerCase().includes('rag') ? 'Internal RAG' : 'Support') as any,
        description: s.description,
        setupFee: parseInt(s.pricingSetup?.replace(/[^0-9]/g, '') || '4500', 10),
        monthlyRetainer: parseInt(s.pricingRetainer?.replace(/[^0-9]/g, '') || '2000', 10),
        deliveryWeeks: s.deliveryWeeks || 2,
        featured: idx === 0,
        active: true,
      })
    );
    setProfile((prev) => ({
      ...prev,
      services: [...prev.services, ...newServicesList],
    }));
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name) return;
    const created: AgencyService = {
      id: `custom-${Date.now()}`,
      name: newService.name,
      category: (newService.category as any) || 'Support',
      description: newService.description || 'Custom tailored automated agent pipeline.',
      setupFee: Number(newService.setupFee) || 4000,
      monthlyRetainer: Number(newService.monthlyRetainer) || 2000,
      deliveryWeeks: Number(newService.deliveryWeeks) || 2,
      featured: Boolean(newService.featured),
      active: true,
    };
    setProfile((prev) => ({
      ...prev,
      services: [created, ...prev.services],
    }));
    setShowAddServiceModal(false);
    setNewService({
      name: '',
      category: 'Support',
      description: '',
      setupFee: 4500,
      monthlyRetainer: 2000,
      deliveryWeeks: 2,
      featured: false,
      active: true,
    });
  };

  const handleDeleteService = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const handleToggleServiceActive = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner: Presets & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <span>Agency Architecture Studio</span>
            <span aria-hidden="true">·</span>
            <span>Production V1.0</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Configure Your AI Automation Agency
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Select a battle-tested agency blueprint or customize your specialized niche, high-ticket retainer packages, and automated agent offerings.
          </p>
        </div>

        {/* Agency Presets */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950/80 rounded-lg border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => handleSelectPreset('digital_sb')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedPresetKey === 'digital_sb'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Digital SB (Flagship)
          </button>
          <button
            onClick={() => handleSelectPreset('syntropic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedPresetKey === 'syntropic'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Syntropic (B2B RAG)
          </button>
          <button
            onClick={() => handleSelectPreset('vanguard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedPresetKey === 'vanguard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vanguard (Voice AI)
          </button>
          <button
            onClick={() => handleSelectPreset('hyperscale')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedPresetKey === 'hyperscale'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            HyperScale (Growth SDRs)
          </button>
        </div>
      </div>

      {/* Grid: Identity & Positioning + AI Niche Auditor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Agency Profile & Positioning (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-semibold text-white">Agency Identity & Positioning</h2>
              <span className="text-xs text-slate-500">Live Synchronized</span>
            </div>

            {/* Agency Brand Logo Preview & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="relative group shrink-0">
                <AgencyLogo
                  logoUrl={profile.logoUrl}
                  agencyName={profile.name}
                  size="xl"
                  className="rounded-xl overflow-hidden border border-blue-500/40 shadow-lg"
                />
              </div>
              <div className="flex-1 space-y-1.5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
                    <span>Official Agency Logo</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Active & Synced</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Custom geometric Digital SB monogram with neural node and digital cube emblem.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={profile.logoUrl || ''}
                    onChange={(e) => setProfile({ ...profile, logoUrl: e.target.value })}
                    placeholder="/src/assets/images/... or custom logo URL"
                    className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setProfile({
                        ...profile,
                        logoUrl: '/src/assets/images/digital_sb_logo_1793757065507.jpg',
                      })
                    }
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    Reset Logo
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Agency Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. Syntropic AI"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Niche / Industry</label>
                <input
                  type="text"
                  value={profile.niche}
                  onChange={(e) => setProfile({ ...profile, niche: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. Enterprise Operations & Logistics"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Brand Tagline</label>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                placeholder="Autonomous enterprise workflows and internal intelligence copilots."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Hero Value Proposition Headline</label>
              <textarea
                rows={2}
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                placeholder="We engineer autonomous AI agents that run mission-critical enterprise operations."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Supporting Explanation / Subheadline</label>
              <textarea
                rows={2}
                value={profile.subheadline}
                onChange={(e) => setProfile({ ...profile, subheadline: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                placeholder="Eliminate 80% of repetitive data routing, contract analysis, and multi-system synchronization."
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Niche & Opportunity Audit (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">AI Niche Opportunity Auditor</h2>
              </div>
              <button
                onClick={handleRunNicheAudit}
                disabled={isAuditing}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-60 transition-all whitespace-nowrap"
              >
                {isAuditing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Run AI Audit</span>
                  </>
                )}
              </button>
            </div>

            {auditResult ? (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">Market Assessment</div>
                  <p className="text-slate-400 leading-relaxed">{auditResult.marketSummary}</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1.5">Niche Operational Bottlenecks</div>
                  <ul className="space-y-1.5 text-slate-400">
                    {auditResult.topPainPoints?.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-400 shrink-0 font-mono">0{i + 1}.</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Avg Retainer LTV</span>
                    <span className="text-base font-bold text-white font-mono tabular-nums">{auditResult.estimatedAvgLtv || '$38,000'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Target ROI Multiplier</span>
                    <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">{auditResult.roiMultiplier || '4.5x'}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-1">Tested Cold Outreach Hook</span>
                  <p className="text-slate-300 italic">"{auditResult.pitchHook}"</p>
                </div>

                <button
                  onClick={handleApplyAuditServices}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 transition-colors"
                >
                  <Plus className="h-4 w-4 text-blue-400" />
                  <span>Append {auditResult.highMarginServices?.length || 3} Audited Services to Catalog</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 space-y-3">
                <p className="text-xs leading-relaxed max-w-sm mx-auto">
                  Click <strong className="text-white">Run AI Audit</strong> to uncover high-margin service packages, validated pricing models, and target bottlenecks tailored directly to <span className="text-blue-300 font-medium">{profile.niche}</span>.
                </p>
                <button
                  onClick={handleRunNicheAudit}
                  disabled={isAuditing}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  <span>Analyze {profile.niche} with Gemini</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Catalog & Retainer Structure */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Agency Service Catalog & Retainer Offerings</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Define the automated solutions, setup fees, and ongoing monthly retainers your agency delivers.
            </p>
          </div>
          <button
            onClick={() => setShowAddServiceModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Service Package</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.services.map((service, index) => (
            <div
              key={service.id}
              className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                service.active
                  ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  : 'border-slate-800/40 bg-slate-950/40 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">0{index + 1}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleServiceActive(service.id)}
                      className={`text-[11px] font-medium transition-colors ${
                        service.active ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {service.active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors p-1"
                      title="Delete service"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-blue-400 uppercase tracking-wider mb-1">
                    {service.category}
                  </div>
                  <h3 className="text-base font-semibold text-white leading-snug">{service.name}</h3>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{service.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Setup Implementation</span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    ${service.setupFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Monthly Retainer</span>
                  <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                    ${service.monthlyRetainer.toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Estimated Delivery</span>
                  <span className="text-slate-300 font-mono">{service.deliveryWeeks} weeks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Interactive Agent Architect & Lab</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Build system prompts, configure tool declarations, and test your agency's agents in real-time simulation.
            </p>
          </div>
          <button
            onClick={onSwitchToLab}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-xs font-semibold transition-colors shrink-0"
          >
            <span>Open Agent Lab</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">AI Client Proposal Generator</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Generate enterprise-grade SOWs, milestone schedules, and ROI calculations for prospective clients in 10 seconds.
            </p>
          </div>
          <button
            onClick={onSwitchToProposals}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-semibold transition-colors shrink-0"
          >
            <span>Draft Proposal</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal: Add Service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add New Agency Service Offering</h3>
            <form onSubmit={handleAddService} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g. 24/7 Voice AI Booking Agent"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Voice">Voice AI</option>
                    <option value="Support">Support & Concierge</option>
                    <option value="Outbound">Outbound & SDR</option>
                    <option value="Internal RAG">Internal RAG & SOP</option>
                    <option value="Vision/Docs">Document Processing</option>
                    <option value="Fine-tuning">Custom Model Fine-tuning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Delivery Time (Weeks)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={newService.deliveryWeeks}
                    onChange={(e) => setNewService({ ...newService, deliveryWeeks: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description & Tangible Business Deliverable</label>
                <textarea
                  rows={2}
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Autonomous agent connected to CRM and calendar answering incoming inquiries..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Setup Implementation Fee ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={newService.setupFee}
                    onChange={(e) => setNewService({ ...newService, setupFee: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Monthly Management Retainer ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={newService.monthlyRetainer}
                    onChange={(e) => setNewService({ ...newService, monthlyRetainer: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
