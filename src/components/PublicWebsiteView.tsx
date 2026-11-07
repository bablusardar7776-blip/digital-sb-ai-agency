import React, { useState } from 'react';
import { AgencyProfile } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Calendar, Sparkles, Phone, Bot, Database, Workflow } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface PublicWebsiteViewProps {
  profile: AgencyProfile;
  onBackToStudio: () => void;
}

export const PublicWebsiteView: React.FC<PublicWebsiteViewProps> = ({ profile, onBackToStudio }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    volume: '500 - 2,000 monthly inquiries',
    bottleneck: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Banner to switch back to Studio */}
      <div className="bg-blue-950/80 border-b border-blue-800/60 px-4 py-2 text-center text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto text-blue-200">
          <span className="font-semibold">Live Public Agency Site Preview</span>
          <span aria-hidden="true">·</span>
          <span className="hidden sm:inline">This is how prospective enterprise clients see your agency</span>
        </div>
        <button
          onClick={onBackToStudio}
          className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded transition-colors whitespace-nowrap shrink-0"
        >
          Return to Studio Builder
        </button>
      </div>

      {/* Top Navigation Bar: Strict 3-zone contract */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single text element wordmark with brand logo */}
          <a href="#hero" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0">
            <AgencyLogo logoUrl={profile.logoUrl} agencyName={profile.name} size="md" />
            <span>{profile.name}</span>
          </a>

          {/* Zone 2: 4 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#capabilities" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Capabilities
            </a>
            <a href="#architecture" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Architecture
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Case Studies
            </a>
            <a href="#consultation" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Engagement
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#consultation"
              className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
            >
              {profile.primaryCtaText || 'Schedule Discovery'}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative border-b border-slate-800/80 overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <span>Enterprise Autonomous Systems</span>
                <span aria-hidden="true">·</span>
                <span>{profile.niche}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
                {profile.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                {profile.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#consultation"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all text-center whitespace-nowrap shrink-0"
                >
                  <span>{profile.primaryCtaText || 'Schedule Engineering Discovery'}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#case-studies"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-all text-center whitespace-nowrap shrink-0"
                >
                  <span>Review Verified Impact</span>
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 border-t border-slate-800/60">
                <span>Zero-Retention Private Cloud</span>
                <span aria-hidden="true">·</span>
                <span>99.9% Production SLA</span>
                <span aria-hidden="true">·</span>
                <span>Sub-Second Latency</span>
              </div>
            </div>

            {/* Right Hero Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-[16/9] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/agency_hero_workspace_1793754405694.jpg"
                  alt="Modern high-end AI Agency Engineering Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 backdrop-blur-md bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <div className="font-semibold text-white">{profile.name} Headquarters</div>
                  <div className="text-[11px] text-slate-400">Autonomous Agent Deployment & Infrastructure Lab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Metrics Strip */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {profile.proofMetrics?.map((metric, idx) => (
              <div key={idx} className="pt-4 md:pt-0 md:px-6 first:pl-0 space-y-1">
                <div className="text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-300">{metric.label}</div>
                <div className="text-xs text-slate-500">{metric.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities / Bento Grid */}
      <section id="capabilities" className="py-20 border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turnkey AI Infrastructure Engineered for Measurable ROI
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We architect and maintain specialized agents designed around your exact operational bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Featured Service with Image */}
            <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col justify-between group">
              <div className="p-8 space-y-4">
                <div className="text-xs font-mono text-blue-400">01. Autonomous Workflow Orchestration</div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {profile.services[0]?.name || 'Internal Knowledge RAG & SOP Copilot'}
                </h3>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  {profile.services[0]?.description ||
                    'Secure document search, invoice extraction, and bi-directional ERP data synchronization.'}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
                  <span>Setup: ${profile.services[0]?.setupFee.toLocaleString()}</span>
                  <span>·</span>
                  <span>Retainer: ${profile.services[0]?.monthlyRetainer.toLocaleString()}/mo</span>
                  <span>·</span>
                  <span>Delivery: {profile.services[0]?.deliveryWeeks} weeks</span>
                </div>
              </div>

              <div className="relative h-60 w-full overflow-hidden border-t border-slate-800">
                <img
                  src="/src/assets/images/agency_bento_automation_1793754405785.jpg"
                  alt="Enterprise Digital Workflow Automation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bento Card 2: Voice or Communication AI */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col justify-between group">
              <div className="p-8 space-y-4">
                <div className="text-xs font-mono text-blue-400">02. Conversational Inbound AI</div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {profile.services[1]?.name || '24/7 Voice AI Receptionist'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {profile.services[1]?.description ||
                    'Conversational voice agents answering calls under 450ms, resolving FAQs, and booking calendar slots.'}
                </p>
              </div>

              <div className="relative h-48 w-full overflow-hidden border-t border-slate-800">
                <img
                  src="/src/assets/images/agency_bento_voice_1793754406456.jpg"
                  alt="Acoustic Voice AI Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bento Card 3: Additional Services */}
            {profile.services.slice(2).map((srv, idx) => (
              <div
                key={srv.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono text-blue-400">0{idx + 3}. {srv.category}</div>
                  <h4 className="text-lg font-bold text-white">{srv.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
                </div>
                <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>${srv.monthlyRetainer.toLocaleString()}/mo</span>
                  <span>{srv.deliveryWeeks} weeks delivery</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies & Tangible Proof */}
      <section id="case-studies" className="py-20 border-b border-slate-800/80 bg-slate-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Verifiable Case Studies
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Real Client Transformations & Quantified Outcomes
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Validated Across 40,000+ Real Agent Transactions
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Case Study Spotlight (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800 aspect-[16/10] relative">
              <img
                src="/src/assets/images/agency_case_meeting_1793754406074.jpg"
                alt="Executive Boardroom Reviewing AI Systems"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200 p-3 bg-slate-950/70 backdrop-blur-md rounded-lg border border-slate-800">
                <span className="font-semibold text-white block">Enterprise Deployment Sign-Off</span>
                <span className="text-[11px] text-slate-400">Full audit compliance and private SOC2 cloud migration.</span>
              </div>
            </div>

            {/* Case Study Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {profile.caseStudies?.map((cs, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-400 font-medium">{cs.industry}</span>
                    <span className="text-xs font-mono text-slate-500">{cs.deliveredIn}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{cs.client}</h4>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono tracking-tight tabular-nums">
                    {cs.metric}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cs.resultSummary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attributable Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {profile.testimonials?.map((t, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4"
              >
                <p className="text-sm text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 font-mono text-xs font-bold text-white">
                    {t.author.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-slate-400">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Discovery Booking & Lead Capture */}
      <section id="consultation" className="py-20 border-b border-slate-800/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Discovery & Technical Audit
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Request an Architecture Review & Prototype Scope
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We review your operational workflows, identify high-friction bottlenecks, and deliver a working 60-second prototype agent in under 5 business days.
              </p>
            </div>

            {formSubmitted ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Discovery Audit Requested</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our lead systems architect has received your details and will send a calendar invite and custom audit scope to <strong className="text-white">{formData.email}</strong> within 4 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jordan Miller"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jordan@company.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Global"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Estimated Inquiries / Task Volume</label>
                    <select
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="500 - 2,000 monthly inquiries">500 - 2,000 inquiries / month</option>
                      <option value="2,000 - 10,000 monthly inquiries">2,000 - 10,000 inquiries / month</option>
                      <option value="10,000+ enterprise volume">10,000+ enterprise inquiries / month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">
                    Describe your primary operational bottleneck
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bottleneck}
                    onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                    placeholder="We spend ~150 hours every month manually triaging customer tickets and copy-pasting data into our CRM..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 text-sm transition-all shadow-lg active:scale-[0.99]"
                  >
                    Lock in Technical Discovery Session
                  </button>
                  <div className="text-center text-[11px] text-slate-500 mt-2">
                    Confidential · SOC2 Ready Zero-Retention · No Obligations
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quiet Minimal Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <AgencyLogo logoUrl={profile.logoUrl} agencyName={profile.name} size="sm" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">{profile.name}</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise AI Systems & Autonomous Automation</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#capabilities" className="hover:text-slate-300 transition-colors">
              Capabilities
            </a>
            <a href="#case-studies" className="hover:text-slate-300 transition-colors">
              Case Studies
            </a>
            <a href="#consultation" className="hover:text-slate-300 transition-colors">
              Contact
            </a>
            <button onClick={onBackToStudio} className="hover:text-blue-400 transition-colors font-medium">
              Studio Builder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
