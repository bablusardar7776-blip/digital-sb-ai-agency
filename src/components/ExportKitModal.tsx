import React, { useState } from 'react';
import { AgencyProfile } from '../types';
import { Download, Check, X, FileJson, FileText, Table } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface ExportKitModalProps {
  profile: AgencyProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportKitModal: React.FC<ExportKitModalProps> = ({ profile, isOpen, onClose }) => {
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedItem(filename);
    setTimeout(() => setDownloadedItem(null), 2500);
  };

  const exportAgencyManifestJson = () => {
    const manifest = {
      exportVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      agency: profile,
    };
    downloadFile(
      JSON.stringify(manifest, null, 2),
      `${profile.name.toLowerCase().replace(/\s+/g, '_')}_manifest.json`,
      'application/json'
    );
  };

  const exportRateCardCsv = () => {
    let csv = 'Service Name,Category,Setup Fee ($),Monthly Retainer ($),Delivery Timeline (Weeks),Description\n';
    profile.services.forEach((s) => {
      csv += `"${s.name}","${s.category}",${s.setupFee},${s.monthlyRetainer},${s.deliveryWeeks},"${s.description.replace(/"/g, '""')}"\n`;
    });
    downloadFile(
      csv,
      `${profile.name.toLowerCase().replace(/\s+/g, '_')}_rate_card.csv`,
      'text/csv'
    );
  };

  const exportProposalTemplateMd = () => {
    const template = `# Master Services Agreement & Scope of Work
**Agency:** ${profile.name}
**Tagline:** ${profile.tagline}
**Niche:** ${profile.niche}
**Generated:** ${new Date().toLocaleDateString()}

## 1. Agency Overview
${profile.headline}
${profile.subheadline}

## 2. Standard Service Offerings & Retainers
${profile.services
  .map(
    (s, i) => `### 0${i + 1}. ${s.name} (${s.category})
- **Setup Fee:** $${s.setupFee.toLocaleString()}
- **Monthly SLA Retainer:** $${s.monthlyRetainer.toLocaleString()}/mo
- **Delivery Timeline:** ${s.deliveryWeeks} weeks
- **Description:** ${s.description}
`
  )
  .join('\n')}

## 3. SLA & Operational Commitments
- 99.9% Uptime SLA on all production inference endpoints.
- Continuous prompt optimization and weekly hallucination auditing.
- Dedicated engineer Slack channel with sub-30 minute response during business hours.
- Strict SOC2-ready data segregation and zero-retention policies.
`;
    downloadFile(
      template,
      `${profile.name.toLowerCase().replace(/\s+/g, '_')}_sow_template.md`,
      'text/markdown'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <AgencyLogo logoUrl={profile.logoUrl} agencyName={profile.name} size="md" />
            <div>
              <h3 className="text-lg font-bold text-white">Export Complete Agency Kit</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Production assets, pricing rate cards, and proposal templates for {profile.name}.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <FileJson className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Agency Manifest JSON</div>
                <div className="text-slate-400">Complete profile, services, and prompt settings</div>
              </div>
            </div>
            <button
              onClick={exportAgencyManifestJson}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400">
                <Table className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Pricing & Rate Card CSV</div>
                <div className="text-slate-400">Spreadsheet table with setup fees and retainers</div>
              </div>
            </div>
            <button
              onClick={exportRateCardCsv}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Client SOW Contract Markdown</div>
                <div className="text-slate-400">Ready-to-sign enterprise scope of work template</div>
              </div>
            </div>
            <button
              onClick={exportProposalTemplateMd}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {downloadedItem && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Check className="h-4 w-4" />
            <span>Saved {downloadedItem} successfully</span>
          </div>
        )}

        <div className="flex items-center justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
