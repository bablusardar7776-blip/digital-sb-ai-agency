import React, { useState } from 'react';
import { AgencyProfile } from './types';
import { PRESET_AGENCIES } from './data/presets';
import { TopNav } from './components/TopNav';
import { AgencyStudioView } from './components/AgencyStudioView';
import { AgentLabView } from './components/AgentLabView';
import { ProposalGeneratorView } from './components/ProposalGeneratorView';
import { EconomicsView } from './components/EconomicsView';
import { PublicWebsiteView } from './components/PublicWebsiteView';
import { ExportKitModal } from './components/ExportKitModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'agent-lab' | 'proposals' | 'economics' | 'website'>('studio');
  const [profile, setProfile] = useState<AgencyProfile>(PRESET_AGENCIES.digital_sb);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* TopNav is rendered across all management views */}
      {activeTab !== 'website' && (
        <TopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          agencyName={profile.name}
          logoUrl={profile.logoUrl}
          onDeploy={() => setShowExportModal(true)}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'studio' && (
          <AgencyStudioView
            profile={profile}
            setProfile={setProfile}
            onSwitchToLab={() => setActiveTab('agent-lab')}
            onSwitchToProposals={() => setActiveTab('proposals')}
          />
        )}

        {activeTab === 'agent-lab' && (
          <AgentLabView
            agencyName={profile.name}
            niche={profile.niche}
          />
        )}

        {activeTab === 'proposals' && (
          <ProposalGeneratorView
            profile={profile}
          />
        )}

        {activeTab === 'economics' && (
          <EconomicsView />
        )}

        {activeTab === 'website' && (
          <PublicWebsiteView
            profile={profile}
            onBackToStudio={() => setActiveTab('studio')}
          />
        )}
      </main>

      {/* Export Agency Bundle Modal */}
      <ExportKitModal
        profile={profile}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
