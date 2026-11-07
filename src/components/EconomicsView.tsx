import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, Users, ArrowUpRight, BarChart3, CheckCircle } from 'lucide-react';

export const EconomicsView: React.FC = () => {
  const [activeClients, setActiveClients] = useState<number>(6);
  const [avgRetainer, setAvgRetainer] = useState<number>(2400);
  const [avgSetupFee, setAvgSetupFee] = useState<number>(5500);
  const [monthlyApiCostPerClient, setMonthlyApiCostPerClient] = useState<number>(140);
  const [hoursSavedPerClient, setHoursSavedPerClient] = useState<number>(110);
  const [clientHourlyCost, setClientHourlyCost] = useState<number>(38);

  // Calculations
  const mrr = activeClients * avgRetainer;
  const arr = mrr * 12;
  const cumulativeSetupRevenue = activeClients * avgSetupFee;
  const totalMonthlyInfraCost = activeClients * monthlyApiCostPerClient;
  const monthlyGrossProfit = mrr - totalMonthlyInfraCost;
  const grossMarginPercent = Math.round((monthlyGrossProfit / (mrr || 1)) * 100);

  // Client ROI
  const clientMonthlyLaborSavings = hoursSavedPerClient * clientHourlyCost;
  const clientNetMonthlySavings = clientMonthlyLaborSavings - avgRetainer;
  const clientAnnualSavings = clientNetMonthlySavings * 12;
  const clientRoiMultiplier = (clientMonthlyLaborSavings / (avgRetainer || 1)).toFixed(1);

  // Agency LTV (assuming 14-month average retention)
  const avgRetentionMonths = 14;
  const agencyLtv = avgSetupFee + avgRetainer * avgRetentionMonths;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Financial Planning & Unit Economics</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Model</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Agency Margins & Client ROI Calculator
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Model your recurring agency retainers, cloud inference expenses, client payback periods, and annualized margins.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono text-xs">
          <span>Target Margin: 80%+</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-medium text-slate-400">Monthly Recurring Revenue (MRR)</span>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            ${mrr.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            ARR: ${arr.toLocaleString()}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-medium text-slate-400">Blended Gross Margin</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
            {grossMarginPercent}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Infra Cost: ${totalMonthlyInfraCost.toLocaleString()}/mo
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-medium text-slate-400">Client ROI Multiplier</span>
          <div className="text-2xl font-bold text-blue-400 font-mono tabular-nums">
            {clientRoiMultiplier}x
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Net Value: +${clientNetMonthlySavings.toLocaleString()}/mo
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-medium text-slate-400">Average Client LTV</span>
          <div className="text-2xl font-bold text-amber-300 font-mono tabular-nums">
            ${agencyLtv.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Over {avgRetentionMonths} months average tenure
          </div>
        </div>
      </div>

      {/* Interactive Controls & Scenario Modeler */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
          <h2 className="text-base font-semibold text-white">Agency Economic Variables</h2>

          <div className="space-y-5">
            {/* Active Clients */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Active Retainer Clients</span>
                <span className="font-mono text-white font-bold">{activeClients} clients</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={activeClients}
                onChange={(e) => setActiveClients(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 client</span>
                <span>15 clients</span>
                <span>30 clients</span>
              </div>
            </div>

            {/* Average Monthly Retainer */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Average Monthly Retainer</span>
                <span className="font-mono text-emerald-400 font-bold">${avgRetainer.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="200"
                value={avgRetainer}
                onChange={(e) => setAvgRetainer(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$1,000/mo</span>
                <span>$5,000/mo</span>
                <span>$10,000/mo</span>
              </div>
            </div>

            {/* Implementation Setup Fee */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">One-Time Setup Fee (Avg)</span>
                <span className="font-mono text-white font-bold">${avgSetupFee.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={avgSetupFee}
                onChange={(e) => setAvgSetupFee(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* API Cost per Client */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Cloud & LLM API Cost per Client</span>
                <span className="font-mono text-slate-300 font-bold">${monthlyApiCostPerClient}/mo</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={monthlyApiCostPerClient}
                onChange={(e) => setMonthlyApiCostPerClient(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Client Hours Saved */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Client Labor Saved per Month</span>
                <span className="font-mono text-blue-400 font-bold">{hoursSavedPerClient} hours/mo</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={hoursSavedPerClient}
                onChange={(e) => setHoursSavedPerClient(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Breakdown & Proof Math (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <h3 className="text-base font-semibold text-white">Value Proposition & Client Payback</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Equivalent Human Labor Value</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  ${clientMonthlyLaborSavings.toLocaleString()}/mo
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Client Retainer Cost</span>
                <span className="font-mono font-semibold text-amber-400 tabular-nums">
                  -${avgRetainer.toLocaleString()}/mo
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-emerald-300 font-medium">Net Monthly Client Benefit</span>
                <span className="font-mono font-bold text-emerald-300 tabular-nums">
                  +${clientNetMonthlySavings.toLocaleString()}/mo
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-950/40 border border-blue-500/30">
                <span className="text-blue-300 font-medium">Client Annual Net Savings</span>
                <span className="font-mono font-bold text-blue-300 tabular-nums">
                  +${clientAnnualSavings.toLocaleString()}/yr
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-300">Discovery Call Objection Killer</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                "Our agency fee of ${avgRetainer.toLocaleString()}/mo replaces over {hoursSavedPerClient} hours of repetitive staff work that currently costs your business ${clientMonthlyLaborSavings.toLocaleString()}/mo. You generate an immediate <strong className="text-emerald-400 font-mono">{clientRoiMultiplier}x ROI</strong> starting in month one."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
