import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const SimulatorScreen: React.FC = () => {
  const {
    availableToSpend,
    dailySafeSpendProtected,
    healthScore: baselineHealth,
    surplusForecast: baselineSurplus,
    setActivePocketWiseTab,
    addTransaction,
    showToast
  } = useBudget();

  const [selectedCategory, setSelectedCategory] = useState('product');
  const [itemDescription, setItemDescription] = useState('Sony WH-CH520 Wireless Headphones');
  const [proposedAmount, setProposedAmount] = useState<number>(2500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'product', icon: '🎧', label: 'Buy Product' },
    { id: 'dining', icon: '🍔', label: 'Dining Out' },
    { id: 'event', icon: '🎟️', label: 'Event / Trip' },
    { id: 'course', icon: '💻', label: 'Course' },
    { id: 'subscription', icon: '🔄', label: 'Subscription' },
    { id: 'emergency', icon: '🚑', label: 'Emergency' }
  ];

  const presets = [
    { label: '+₹500', value: 500 },
    { label: '₹1,000', value: 1000 },
    { label: '₹2,500', value: 2500 },
    { label: '₹4,000', value: 4000 }
  ];

  // Dynamic calculations
  const remainingDays = 22;
  const simulatedBalance = Math.max(0, availableToSpend - proposedAmount);
  const uncommittedSpendable = Math.max(0, simulatedBalance - 1500);
  const simulatedDaily = Math.max(0, Math.round(uncommittedSpendable / remainingDays));
  const dropPct = Math.round(((dailySafeSpendProtected - simulatedDaily) / dailySafeSpendProtected) * 100);

  const simulatedSurplus = baselineSurplus - proposedAmount;
  const isDeficit = simulatedSurplus < 0;

  const healthPenalty = Math.round((proposedAmount / 6000) * 35);
  const simulatedHealth = Math.max(30, baselineHealth - healthPenalty);

  const handleAuthorize = () => {
    addTransaction({
      title: itemDescription || 'Simulated Purchase',
      category: selectedCategory === 'dining' ? 'Food' : selectedCategory === 'event' ? 'Social' : 'Shopping',
      amount: proposedAmount,
      timeAgo: 'Just now',
      icon: selectedCategory === 'dining' ? 'restaurant' : selectedCategory === 'event' ? 'confirmation_number' : 'shopping_bag',
      impactPct: parseFloat(((proposedAmount / 10000) * 100).toFixed(1)),
      paymentMethod: 'UPI'
    });
    setIsModalOpen(false);
    showToast(`Deduction of ₹${proposedAmount.toLocaleString('en-IN')} recorded!`);
  };

  const handleReset = () => {
    setProposedAmount(2500);
    setItemDescription('Sony WH-CH520 Wireless Headphones');
    setSelectedCategory('product');
    showToast('Simulation parameters reset');
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-lg gap-space-lg max-w-xl mx-auto">
      {/* Simulation Environment Header Pill */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-md border border-white/5">
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
            </span>
            <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Decision Simulator
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            Zero Risk Sandbox
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Simulate before you swipe. Zero impact on your real balance until explicitly authorized.
        </p>
      </div>

      {/* Interactive Input Card */}
      <section className="rounded-xl bg-surface-container p-space-md shadow-lg flex flex-col gap-space-md border border-white/5">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">category</span>
            Purchase Category
          </span>
          <span className="font-label-sm text-label-sm text-primary font-semibold">Live Calculator</span>
        </div>

        {/* Category Chips (Horizontal Scrollable) */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-white/5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Item Description Input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium" htmlFor="itemInput">
            Item or Goal Description
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-[18px]">
              shopping_bag
            </span>
            <input
              id="itemInput"
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="e.g. Flight ticket, shoes, buffet..."
              className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-colors border border-white/5"
            />
          </div>
        </div>

        {/* Amount Input & Interactive Telemetry */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-medium" htmlFor="amountRange">
              Proposed Outflow
            </label>
            <div className="flex items-baseline gap-1">
              <span className="font-label-sm text-label-sm text-secondary font-bold">₹</span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                {proposedAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Live Drag Slider */}
          <div className="relative flex items-center py-1">
            <input
              id="amountRange"
              type="range"
              min="200"
              max="6000"
              step="100"
              value={proposedAmount}
              onChange={(e) => setProposedAmount(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Quick Preset Increment Chips */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {presets.map((p) => {
              const isActive = proposedAmount === p.value;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setProposedAmount(p.value)}
                  className={`py-1.5 px-2 rounded-lg font-label-sm text-label-sm text-center transition-all ${
                    isActive
                      ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-white/5'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Side-by-Side Impact Telemetry Grid */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">compare</span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Impact Analysis
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {remainingDays} days remaining in cycle
          </span>
        </div>

        {/* Dual Column Comparison Header */}
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="p-space-sm rounded-t-xl bg-surface-container-low text-center border-t border-x border-white/5">
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">
              Current Baseline
            </span>
          </div>
          <div className="p-space-sm rounded-t-xl bg-surface-container text-center relative overflow-hidden border-t border-x border-secondary/20">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-secondary"></div>
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
              With Proposed Spend
            </span>
          </div>
        </div>

        {/* Comparative Metrics Stack */}
        <div className="flex flex-col gap-2 -mt-2">
          {/* Metric 1: Available Balance */}
          <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm flex flex-col gap-2 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">account_balance_wallet</span>
                Liquid Available Balance
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px] font-bold">
                🔻 -₹{proposedAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-sm items-baseline">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  ₹{availableToSpend.toLocaleString('en-IN')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">Starting baseline</span>
              </div>
              <div className="flex flex-col pl-space-sm">
                <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                  ₹{simulatedBalance.toLocaleString('en-IN')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">Post deduction</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Daily Allowance Burn */}
          <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm flex flex-col gap-2 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                Daily Spending Allowance
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px] font-bold">
                🔻 -{Math.max(0, dropPct)}% Drop
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-sm items-baseline">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    ₹{dailySafeSpendProtected}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">/day</span>
                </div>
                <span className="font-label-sm text-[10px] text-on-surface-variant">Comfortable flex</span>
              </div>
              <div className="flex flex-col pl-space-sm">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-error">
                    ₹{simulatedDaily}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">/day</span>
                </div>
                <span className="font-label-sm text-[10px] text-error font-medium">
                  {simulatedDaily < 150 ? 'Frugal ration needed' : 'Moderate buffer'}
                </span>
              </div>
            </div>
            {/* Fuel Bar */}
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-1 flex">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(10, 100 - dropPct))}%` }}
              ></div>
              <div
                className="bg-error h-full transition-all duration-300"
                style={{ width: `${Math.min(90, Math.max(0, dropPct))}%` }}
              ></div>
            </div>
          </div>

          {/* Metric 3: Month-End Net Surplus / Deficit */}
          <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm flex flex-col gap-2 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">event_available</span>
                Month-End Projected Delta
              </span>
              <span
                className={`px-1.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${
                  isDeficit
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-primary/20 text-primary'
                }`}
              >
                {isDeficit ? '⚠️ Deficit Alert' : '✨ Protected'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-sm items-baseline">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">
                  +₹{baselineSurplus.toLocaleString('en-IN')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">Healthy surplus</span>
              </div>
              <div className="flex flex-col pl-space-sm">
                <span
                  className={`font-headline-sm text-headline-sm font-bold ${
                    isDeficit ? 'text-error' : 'text-primary'
                  }`}
                >
                  {isDeficit ? `-₹${Math.abs(simulatedSurplus).toLocaleString('en-IN')}` : `+₹${simulatedSurplus.toLocaleString('en-IN')}`}
                </span>
                <span className={`font-label-sm text-[10px] font-semibold ${isDeficit ? 'text-error' : 'text-primary'}`}>
                  {isDeficit ? 'Overdraft risk' : 'Safe reserve'}
                </span>
              </div>
            </div>
          </div>

          {/* Metric 4: Goal & Health Score Combined Card */}
          <div className="rounded-xl bg-surface-container p-space-md shadow-sm grid grid-cols-2 gap-space-md border border-white/5">
            {/* Left: Savings Feasibility */}
            <div className="flex flex-col gap-1.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">savings</span>
                Goal (₹2,000)
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md font-bold text-error">
                  Delayed +{Math.round(proposedAmount / 180)}d
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">Down from 100% on-track</span>
                </div>
              </div>
            </div>

            {/* Right: Health Score Impact */}
            <div className="flex flex-col gap-1.5 pl-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">health_and_safety</span>
                Health Score
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                  {simulatedHealth}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">/ 100</span>
                <span className="font-label-sm text-[10px] text-error font-bold">
                  🔻-{baselineHealth - simulatedHealth}
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-secondary font-medium">Needs Attention</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Money Coach Insight Box */}
      <section className="rounded-xl bg-surface-container-high p-space-md shadow-md relative overflow-hidden flex flex-col gap-space-sm border border-white/5">
        <div className="flex items-center gap-space-xs">
          <div className="w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-on-surface">AI Coach Verdict</span>
            <span className="font-label-sm text-[10px] text-secondary">Real-time algorithmic forecast</span>
          </div>
        </div>

        {/* AI Guidance Card Content */}
        <div className="rounded-lg bg-surface-container-low p-space-sm flex flex-col gap-1.5 text-on-surface-variant font-body-sm text-body-sm leading-relaxed border border-white/5">
          <p>
            <strong className="text-secondary font-semibold">⚠️ Purchase Strain:</strong> Buying this now cuts your daily food and discretionary allowance from{' '}
            <span className="text-on-surface font-semibold">₹{dailySafeSpendProtected}</span> down to{' '}
            <span className="text-error font-semibold">₹{simulatedDaily}/day</span> for the next 22 days, producing an estimated{' '}
            <span className="text-error font-semibold">
              {isDeficit ? `₹${Math.abs(simulatedSurplus)} shortfall` : 'cushion reduction'}
            </span>{' '}
            at month-end.
          </p>
          <div className="pt-1 flex items-center gap-1.5 text-primary font-medium">
            <span className="material-symbols-outlined text-[16px]">lightbulb</span>
            <span>Best move: Consider Scenario B (refurbished @ ₹1,100) or defer to Day 25.</span>
          </div>
        </div>
      </section>

      {/* Alternative Scenarios Call-to-Action */}
      <button
        type="button"
        onClick={() => setActivePocketWiseTab('scenarios')}
        className="w-full text-left flex items-center justify-between p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md transition-all active:scale-[0.99] group border border-white/5"
      >
        <div className="flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">alt_route</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-on-surface">
              Compare 3 Smart Alternatives
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Refurbished, Postpone, or Micro-EMI
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-primary text-[20px]">chevron_right</span>
      </button>

      {/* Primary Simulator Actions & Authorizations */}
      <div className="flex flex-col gap-space-sm pt-space-xs">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 h-12 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-bold hover:bg-surface-container-highest transition-colors active:scale-95 flex items-center justify-center gap-1.5 border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">undo</span>
            <span>Reset Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Authorize ₹{proposedAmount.toLocaleString('en-IN')}</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-1 text-center">
          <span className="material-symbols-outlined text-[15px] text-on-surface-variant">shield</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Simulation Mode Active. No funds deducted until confirmed.
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-end sm:items-center justify-center p-margin animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-surface-container p-space-lg shadow-2xl flex flex-col gap-space-md border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Commit Transaction?
                </h3>
                <span className="font-label-sm text-label-sm text-error font-semibold">
                  Simulated Alert: High Impact
                </span>
              </div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant">
              You are about to record a manual deduction of{' '}
              <strong className="text-on-surface">₹{proposedAmount.toLocaleString('en-IN')}</strong> for{' '}
              <strong className="text-on-surface">{itemDescription}</strong>. This will lower your daily budget for the rest of the month.
            </p>

            <div className="flex flex-col gap-2 pt-space-xs">
              <button
                type="button"
                onClick={handleAuthorize}
                className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Yes, Record Spend</span>
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full h-11 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors border border-white/5"
              >
                Return to Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
