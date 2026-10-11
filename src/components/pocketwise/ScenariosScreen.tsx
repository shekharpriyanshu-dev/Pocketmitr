import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const ScenariosScreen: React.FC = () => {
  const { showToast, addTransaction } = useBudget();
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C'>('B');

  const scenarios = {
    A: {
      key: 'A',
      name: 'Scenario A',
      title: 'Brand New Headphones',
      spend: 2500,
      riskLevel: 'Moderate Risk',
      riskClass: 'text-error bg-error/15',
      daily: '₹128',
      monthEnd: '-₹120',
      monthEndColor: 'text-error',
      savings: '40%',
      savingsLabel: 'Target delayed',
      health: '62',
      healthStatus: 'Needs Attention',
      quote: '"High strain on daily student budget; leaves zero buffer for emergency meals or transit."',
      desc: 'Locking Scenario A drops your daily allowance to ₹128/day. You will need to cut weekend expenditures to avoid deficit.',
      delta: '-₹120 deficit',
      deltaColor: 'text-error'
    },
    B: {
      key: 'B',
      name: 'Scenario B',
      title: 'Budget / Refurbished',
      spend: 1100,
      riskLevel: 'Low Risk',
      riskClass: 'text-primary bg-primary/15',
      daily: '₹191',
      monthEnd: '+₹1,280',
      monthEndColor: 'text-primary',
      savings: '92%',
      savingsLabel: 'On steady track',
      health: '78',
      healthStatus: 'Healthy',
      quote: '"Optimal balance: satisfies audio upgrade desire while keeping ₹2,000 savings objective intact."',
      desc: 'Applying this path locks your daily burn limit to ₹191/day and re-forecasts your monthly savings to ₹1,280.',
      delta: '+₹1,280 buffer',
      deltaColor: 'text-primary'
    },
    C: {
      key: 'C',
      name: 'Scenario C',
      title: 'Postpone to Next Month',
      spend: 0,
      riskLevel: 'Zero Risk',
      riskClass: 'text-primary bg-primary/15',
      daily: '₹241',
      monthEnd: '+₹2,380',
      monthEndColor: 'text-secondary',
      savings: '100%',
      savingsLabel: 'Surpassed',
      health: '88',
      healthStatus: 'Excellent',
      quote: '"Max financial cushion; build ₹1,500 emergency reserve first before committing non-essentials."',
      desc: 'Deferring purchase retains full ₹241/day baseline allowance and accelerates your emergency reserve past 100%.',
      delta: '+₹2,380 surplus',
      deltaColor: 'text-secondary'
    }
  };

  const current = scenarios[selectedKey];

  const handleCommit = () => {
    if (current.spend > 0) {
      addTransaction({
        title: current.title,
        category: 'Shopping',
        amount: current.spend,
        timeAgo: 'Just now',
        icon: 'headphones',
        impactPct: parseFloat(((current.spend / 10000) * 100).toFixed(1)),
        paymentMethod: 'Committed Plan'
      });
    }
    showToast(`Committed: ${current.name} (${current.title})!`);
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl max-w-xl mx-auto gap-space-md">
      {/* Baseline Context Panel */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-md border border-white/5">
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">calculate</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Simulation Sandbox
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              What-If Scenario Matrix
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              All scenarios evaluated against identical starting baseline: Day 8 • ₹7,320 Available Balance • 22 days remaining.
            </p>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm shrink-0 border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span>Live Run</span>
          </div>
        </div>

        {/* Micro Stats Strip */}
        <div className="grid grid-cols-3 gap-2 mt-space-md pt-space-sm bg-surface-container-low/60 rounded-lg p-2.5 border border-white/5">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Baseline Daily</span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              ₹241<span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/d</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Current Buffer</span>
            <span className="font-headline-sm text-headline-sm font-bold text-primary">₹7,320</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Goal Target</span>
            <span className="font-headline-sm text-headline-sm font-bold text-secondary">₹2,000</span>
          </div>
        </div>
      </div>

      {/* Scenario Visual Comparison Telemetry Chart */}
      <div className="rounded-xl bg-surface-container-high p-space-md shadow-md border border-white/5">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">insights</span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              Telemetry Comparison
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Daily vs Buffer</span>
        </div>

        <div className="flex flex-col gap-3.5 mt-2">
          {/* Metric 1: Daily Allowance */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
              <span>Daily Allowance Forecast</span>
              <span className="text-on-surface font-mono">Min ₹150 Safe Cap</span>
            </div>
            <div className="space-y-1.5 bg-surface-container-low p-2 rounded-lg border border-white/5">
              {/* A */}
              <div className="flex items-center gap-2">
                <span className="w-4 font-label-sm text-label-sm text-error font-bold text-center">A</span>
                <div className="flex-1 bg-surface-container-highest h-3 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full transition-all duration-500" style={{ width: '53%' }}></div>
                </div>
                <span className="w-16 text-right font-label-sm text-label-sm text-error font-medium">₹128/d</span>
              </div>
              {/* B */}
              <div className="flex items-center gap-2">
                <span className="w-4 font-label-sm text-label-sm text-primary font-bold text-center">B</span>
                <div className="flex-1 bg-surface-container-highest h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '79%' }}></div>
                </div>
                <span className="w-16 text-right font-label-sm text-label-sm text-primary font-bold">₹191/d</span>
              </div>
              {/* C */}
              <div className="flex items-center gap-2">
                <span className="w-4 font-label-sm text-label-sm text-secondary font-bold text-center">C</span>
                <div className="flex-1 bg-surface-container-highest h-3 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                </div>
                <span className="w-16 text-right font-label-sm text-label-sm text-secondary font-medium">₹241/d</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Month-End Net Surplus / Deficit */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
              <span>Month-End Balance (Surplus / Deficit)</span>
              <span className="text-on-surface font-mono">₹0 Threshold</span>
            </div>
            <div className="space-y-1.5 bg-surface-container-low p-2 rounded-lg border border-white/5">
              {/* A */}
              <div className="flex items-center gap-2">
                <span className="w-4 font-label-sm text-label-sm text-error font-bold text-center">A</span>
                <div className="flex-1 bg-surface-container-highest h-3 rounded-full overflow-hidden flex items-center">
                  <div className="bg-error h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
                <span className="w-16 text-right font-label-sm text-label-sm text-error font-medium">-₹120</span>
              </div>
              {/* B */}
              <div className="flex items-center gap-2">
                <span className="w-4 font-label-sm text-label-sm text-primary font-bold text-center">B</span>
                <div className="flex-1 bg-surface-container-highest h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '62%' }}></div>
                </div>
                <span className="w-16 text-right font-label-sm text-label-sm text-primary font-bold">+₹1,280</span>
              </div>
              {/* C */}
              <div className="flex items-center gap-2">
                <span className="w-4 font-label-sm text-label-sm text-secondary font-bold text-center">C</span>
                <div className="flex-1 bg-surface-container-highest h-3 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="w-16 text-right font-label-sm text-label-sm text-secondary font-medium">+₹2,380</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Cards Deck */}
      <div className="flex flex-col gap-space-md">
        {/* SCENARIO A */}
        <div
          onClick={() => setSelectedKey('A')}
          className={`relative flex flex-col p-space-md rounded-xl transition-all duration-200 cursor-pointer shadow-md border ${
            selectedKey === 'A'
              ? 'bg-surface-container-high ring-2 ring-error/50 border-error/40'
              : 'bg-surface-container border-white/5 hover:bg-surface-container-high'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-label-md text-error shrink-0">
                A
              </div>
              <div className="flex flex-col truncate">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                  Brand New Headphones
                </h3>
                <span className="font-label-sm text-label-sm text-error font-semibold">Spend: ₹2,500</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/15 text-error font-label-sm text-label-sm shrink-0 font-semibold">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              <span>Moderate Risk</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 p-2 rounded-lg bg-surface-container-low border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Daily Allowance</span>
              <span className="font-headline-sm text-headline-sm font-bold text-error">
                ₹128 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span>
              </span>
              <span className="font-label-sm text-label-sm text-error/90 font-medium">Critical drop</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Month-End Balance</span>
              <span className="font-headline-sm text-headline-sm font-bold text-error">-₹120</span>
              <span className="font-label-sm text-label-sm text-error/90 font-medium">Deficit risk</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Savings Target</span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">40%</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Target delayed</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Health Score</span>
              <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                62<span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/100</span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Needs Attention</span>
            </div>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant italic mb-2">
            "High strain on daily student budget; leaves zero buffer for emergency meals or transit."
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {selectedKey === 'A' ? 'Currently Selected' : 'Tap to simulate'}
            </span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedKey === 'A' ? 'bg-error text-white' : 'bg-surface-container-highest'
              }`}
            >
              {selectedKey === 'A' && <span className="material-symbols-outlined text-[14px]">done</span>}
            </div>
          </div>
        </div>

        {/* SCENARIO B (HIGHLIGHTED / RECOMMENDED) */}
        <div
          onClick={() => setSelectedKey('B')}
          className={`relative flex flex-col p-space-md rounded-xl shadow-xl cursor-pointer transition-all duration-200 border ${
            selectedKey === 'B'
              ? 'bg-surface-container-high ring-2 ring-primary border-primary/40'
              : 'bg-surface-container border-white/5 hover:bg-surface-container-high'
          }`}
        >
          {/* Top Neon Highlight Pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-label-sm font-bold shadow-sm border border-primary/30">
              <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
              <span>Best Value Pick</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Low Risk</span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">
                B
              </div>
              <div className="flex flex-col truncate">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                  Budget / Refurbished
                </h3>
                <span className="font-label-sm text-label-sm text-primary font-semibold">Spend: ₹1,100</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-headline-sm text-headline-sm font-bold text-primary">+₹1,280</span>
              <span className="block font-label-sm text-label-sm text-on-surface-variant">Surplus</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 p-2.5 rounded-lg bg-surface-container-low shadow-inner border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Daily Allowance</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                ₹191 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span>
              </span>
              <span className="font-label-sm text-label-sm text-primary font-medium">Safe buffer preserved</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Month-End Balance</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">+₹1,280</span>
              <span className="font-label-sm text-label-sm text-primary font-medium">Solid safety cushion</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Savings Feasibility</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">92%</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">On steady track</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Health Score</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                78<span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/100</span>
              </span>
              <span className="font-label-sm text-label-sm text-primary font-medium">Healthy</span>
            </div>
          </div>

          <div className="rounded-lg bg-primary/10 p-2.5 mb-2 border border-primary/20">
            <div className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                thumb_up
              </span>
              <p className="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed">
                "Optimal balance: satisfies audio upgrade desire while keeping ₹2,000 savings objective intact."
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span> Selected for Implementation
            </span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedKey === 'B' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest'
              }`}
            >
              {selectedKey === 'B' && <span className="material-symbols-outlined text-[14px] font-bold">done</span>}
            </div>
          </div>
        </div>

        {/* SCENARIO C */}
        <div
          onClick={() => setSelectedKey('C')}
          className={`relative flex flex-col p-space-md rounded-xl transition-all duration-200 cursor-pointer shadow-md border ${
            selectedKey === 'C'
              ? 'bg-surface-container-high ring-2 ring-secondary border-secondary/40'
              : 'bg-surface-container border-white/5 hover:bg-surface-container-high'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-label-md text-secondary shrink-0">
                C
              </div>
              <div className="flex flex-col truncate">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                  Postpone to Next Month
                </h3>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Spend: ₹0</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Zero Risk</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 p-2 rounded-lg bg-surface-container-low border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Daily Allowance</span>
              <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                ₹241 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Full freedom</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Month-End Balance</span>
              <span className="font-headline-sm text-headline-sm font-bold text-secondary">+₹2,380</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Full surplus</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Savings Feasibility</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">100%</span>
              <span className="font-label-sm text-label-sm text-primary">Surpassed</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Health Score</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                88<span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/100</span>
              </span>
              <span className="font-label-sm text-label-sm text-primary">Excellent</span>
            </div>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant italic mb-2">
            "Max financial cushion; build ₹1,500 emergency reserve first before committing non-essentials."
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {selectedKey === 'C' ? 'Currently Selected' : 'Tap to simulate'}
            </span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedKey === 'C' ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest'
              }`}
            >
              {selectedKey === 'C' && <span className="material-symbols-outlined text-[14px]">done</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Decision Flow & Action Module */}
      <div className="rounded-xl bg-surface-container-high p-space-md shadow-xl flex flex-col gap-3 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {current.name} Chosen
            </span>
          </div>
          <span
            className={`font-label-sm text-label-sm ${current.deltaColor} font-bold px-2 py-0.5 rounded-full bg-surface-container-low border border-white/5`}
          >
            {current.delta}
          </span>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {current.desc}
        </p>

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleCommit}
            className="w-full h-12 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span>Commit {current.name} (₹{current.spend.toLocaleString('en-IN')})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedKey('B');
              showToast('Reset parameters to Baseline (Scenario B)');
            }}
            className="w-full h-11 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors active:bg-surface-container-highest border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Reset / Customize Parameters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
