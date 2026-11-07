import React from 'react';
import { ArrowUpRight, Sparkles, SlidersHorizontal, Bot, FileText, Calculator, Globe } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface TopNavProps {
  activeTab: 'studio' | 'agent-lab' | 'proposals' | 'economics' | 'website';
  setActiveTab: (tab: 'studio' | 'agent-lab' | 'proposals' | 'economics' | 'website') => void;
  agencyName: string;
  logoUrl?: string;
  onDeploy: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  agencyName,
  logoUrl,
  onDeploy,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 text-left font-bold tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <AgencyLogo
              logoUrl={logoUrl}
              agencyName={agencyName}
              size="md"
              showText={true}
              subtitle="Operating Studio"
            />
          </button>
        </div>

        {/* Zone 2: 5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'studio'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <span>Studio Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('agent-lab')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'agent-lab'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Bot className="h-4 w-4 text-blue-400" />
            <span>Agent Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('proposals')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'proposals'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>Client Proposals</span>
          </button>

          <button
            onClick={() => setActiveTab('economics')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'economics'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calculator className="h-4 w-4 text-amber-400" />
            <span>Economics & ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('website')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'website'
                ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                : 'text-slate-400 hover:text-blue-300 hover:bg-slate-900'
            }`}
          >
            <Globe className="h-4 w-4 text-blue-400" />
            <span>Live Agency Site</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDeploy}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Export Agency Kit</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/80 px-4 py-2 gap-2 text-xs">
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === 'studio' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('agent-lab')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === 'agent-lab' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          Agent Lab
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === 'proposals' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          Proposals
        </button>
        <button
          onClick={() => setActiveTab('economics')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === 'economics' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          Economics
        </button>
        <button
          onClick={() => setActiveTab('website')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === 'website' ? 'bg-blue-600 text-white font-medium' : 'text-blue-400'}`}
        >
          Live Site
        </button>
      </div>
    </header>
  );
};
