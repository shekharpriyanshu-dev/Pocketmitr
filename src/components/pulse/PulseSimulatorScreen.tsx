import React, { useState, useMemo, useDeferredValue } from 'react';
import { useBudget } from '../../context/BudgetContext';

const BASE_BALANCE = 6180;
const BASE_COMMITTED = 1650;
const REMAINING_DAYS = 18;
const BASE_SURPLUS = 1200;
const BASE_SCORE = 84;

export const PulseSimulatorScreen: React.FC = React.memo(() => {
  const { showToast, addTransaction, setActivePulseTab } = useBudget();

  const [delta, setDelta] = useState<number>(-1500);
  const [scenarioName, setScenarioName] = useState('Weekend Concert');
  const [scenarioTag, setScenarioTag] = useState('Social & Fun');

  // Deferred delta for silky 60fps slider dragging
  const deferredDelta = useDeferredValue(delta);

  const {
    newBalance,
    spendableCapital,
    newDailyBurn,
    newSurplus,
    newScore,
    isSevere,
    isDeficit
  } = useMemo(() => {
    const bal = Math.max(0, BASE_BALANCE + deferredDelta);
    const capital = Math.max(0, bal - BASE_COMMITTED);
    const daily = Math.max(0, Math.round(capital / REMAINING_DAYS));
    const surplus = BASE_SURPLUS + deferredDelta;

    let score = BASE_SCORE;
    if (deferredDelta < 0) {
      score = Math.max(38, Math.round(BASE_SCORE - (Math.abs(deferredDelta) / 3000) * 32));
    } else {
      score = Math.min(96, Math.round(BASE_SCORE + (deferredDelta / 1500) * 10));
    }

    return {
      newBalance: bal,
      spendableCapital: capital,
      newDailyBurn: daily,
      newSurplus: surplus,
      newScore: score,
      isSevere: deferredDelta <= -2000,
      isDeficit: surplus < 0
    };
  }, [deferredDelta]);

  const selectScenario = (name: string, tag: string, val: number) => {
    setScenarioName(name);
    setScenarioTag(tag);
    setDelta(val);
  };

  const resetSim = () => {
    setScenarioName('Base Trajectory');
    setScenarioTag('Unchanged');
    setDelta(0);
    showToast('Sandbox reset to baseline');
  };

  const handleCommit = () => {
    if (delta !== 0) {
      addTransaction({
        title: scenarioName,
        category: delta < 0 ? 'Social' : 'Income',
        amount: Math.abs(delta),
        timeAgo: 'Just now',
        icon: delta < 0 ? 'local_activity' : 'payments',
        impactPct: parseFloat(((Math.abs(delta) / 10000) * 100).toFixed(1)),
        paymentMethod: 'Pulse Decision Ledger'
      });
    }
    showToast(`Decision Locked: ${scenarioName} committed to Day 12 ledger.`);
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl gap-space-lg max-w-xl mx-auto">
      {/* HERO TELEMETRY CLUSTER */}
      <section className="flex flex-col w-full bg-surface-container rounded-lg p-space-md shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-md">
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f59b]"></span>
              <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Day 12 of 30 • 18 Days Left
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-primary-container/10 px-space-sm py-1 rounded-full border border-primary-container/20">
              <span className="material-symbols-outlined text-primary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <span className="font-label-caps text-label-caps text-primary-fixed-dim font-bold">
                Score 84/100
              </span>
            </div>
          </div>

          {/* Main Balance & Safe Daily Gauge Split */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-space-sm items-center pt-space-xs">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Available Liquidity
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display-hero-mobile text-display-hero-mobile text-primary tracking-tight font-extrabold text-[#00f59b]">
                  ₹6,180
                </span>
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  / ₹10k pool
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="font-caption text-caption px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface border border-white/5">
                  Commitments: ₹1,650
                </span>
                <span className="font-caption text-caption px-2 py-0.5 rounded-full bg-primary-container/20 text-primary-container font-semibold border border-primary-container/25">
                  61.8% Safe
                </span>
              </div>
            </div>

            {/* Safe Daily Cap Card */}
            <div className="flex items-center justify-between xs:justify-end gap-space-md bg-surface-container-high/60 backdrop-blur-md rounded-DEFAULT p-space-sm border border-white/5">
              <div className="flex flex-col text-left xs:text-right">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Safe Daily Cap
                </span>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
                  ₹220<span className="text-body-sm text-on-surface-variant font-normal">/day</span>
                </span>
                <span className="font-caption text-caption text-primary-fixed-dim font-medium">
                  Thriving • Low Risk
                </span>
              </div>
              {/* Radial Micro Meter */}
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  ></path>
                  <path
                    className="text-primary-container"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="84, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  ></path>
                </svg>
                <span className="absolute font-label-caps text-[10px] text-primary font-bold">84%</span>
              </div>
            </div>
          </div>

          {/* Quick Micro Telemetry Pill Bar */}
          <div className="grid grid-cols-3 gap-space-xs pt-space-xs text-center">
            <div className="flex flex-col bg-surface-container-lowest/80 rounded-DEFAULT p-2 border border-white/5">
              <span className="font-caption text-caption text-on-surface-variant">Base Inflow</span>
              <span className="font-telemetry-val text-sm text-on-surface">₹10,000</span>
            </div>
            <div className="flex flex-col bg-surface-container-lowest/80 rounded-DEFAULT p-2 border border-white/5">
              <span className="font-caption text-caption text-on-surface-variant">Spent (Day 1-12)</span>
              <span className="font-telemetry-val text-sm text-tertiary-fixed-dim">₹3,820</span>
            </div>
            <div className="flex flex-col bg-surface-container-lowest/80 rounded-DEFAULT p-2 border border-white/5">
              <span className="font-caption text-caption text-on-surface-variant">Proj. Surplus</span>
              <span className="font-telemetry-val text-sm text-primary-fixed-dim font-bold">+₹1,200</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTION SHORTCUTS */}
      <section className="grid grid-cols-3 gap-space-xs w-full">
        <button
          onClick={() => {
            const el = document.getElementById('decision-sandbox');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center justify-center p-space-sm rounded-DEFAULT bg-surface-container hover:bg-surface-container-high transition-all active:scale-95 shadow-md border border-white/5"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-primary-container/15 flex items-center justify-center text-primary-container mb-1 group-hover:shadow-[0_0_16px_rgba(0,245,155,0.4)] transition-all">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <span className="font-caption text-caption font-semibold text-on-surface">Simulate</span>
        </button>

        <button
          onClick={() => setActivePulseTab('cash')}
          className="group flex flex-col items-center justify-center p-space-sm rounded-DEFAULT bg-surface-container hover:bg-surface-container-high transition-all active:scale-95 shadow-md border border-white/5"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-1 group-hover:shadow-[0_0_16px_rgba(208,188,255,0.3)] transition-all">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <span className="font-caption text-caption font-semibold text-on-surface">Log Spend</span>
        </button>

        <button
          onClick={() => setActivePulseTab('subs')}
          className="group flex flex-col items-center justify-center p-space-sm rounded-DEFAULT bg-surface-container hover:bg-surface-container-high transition-all active:scale-95 shadow-md border border-white/5"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant mb-1 group-hover:text-primary transition-all">
            <span className="material-symbols-outlined text-[20px]">pause_circle</span>
          </div>
          <span className="font-caption text-caption font-semibold text-on-surface">Pause Sub</span>
        </button>
      </section>

      {/* COACH PRO-TIP ALERT BANNER */}
      <section className="flex items-start gap-space-sm p-space-md rounded-DEFAULT bg-surface-container-low shadow-lg border border-white/5">
        <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-base">psychology</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-label-caps text-label-caps text-secondary-fixed uppercase font-bold">
              Gen Z Micro-Coach
            </span>
            <span className="font-caption text-caption px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface-variant font-medium">
              Live Guardrail
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface mt-1 leading-relaxed">
            You have <span className="text-[#00f59b] font-bold">₹1,650</span> in upcoming auto-debits before Day 20. Spending{' '}
            <span className="text-error font-semibold">&gt;₹400 today</span> will drop daily safe allowance straight into the red danger line!
          </p>
        </div>
      </section>

      {/* FLAGSHIP FEATURE: DECISION SANDBOX */}
      <section
        id="decision-sandbox"
        className="flex flex-col w-full bg-surface-container rounded-lg p-space-md shadow-2xl relative overflow-hidden transition-all border border-white/5"
      >
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-md">
          {/* Simulator Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-base">candlestick_chart</span>
              </div>
              <div>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface block leading-tight">
                  Decision Sandbox
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Stress-test purchases before UPI checkout
                </span>
              </div>
            </div>
            <button
              onClick={resetSim}
              className="font-label-caps text-label-caps px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors border border-white/5"
              type="button"
            >
              Reset
            </button>
          </div>

          {/* SCENARIO QUICK CHIPS */}
          <div className="flex flex-col gap-1.5">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
              Select or Test a Scenario
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              <button
                type="button"
                onClick={() => selectScenario('Weekend Concert', 'Social & Fun', -1500)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-label-caps text-label-caps flex items-center gap-1.5 transition-all ${
                  delta === -1500 && scenarioName === 'Weekend Concert'
                    ? 'bg-primary-container/20 text-primary-container border border-primary-container/30 font-bold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                Concert (-₹1.5k)
              </button>

              <button
                type="button"
                onClick={() => selectScenario('iPhone EMI', 'Tech Commitment', -2200)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-label-caps text-label-caps flex items-center gap-1.5 transition-all ${
                  delta === -2200
                    ? 'bg-primary-container/20 text-primary-container border border-primary-container/30 font-bold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-surface-variant"></span>
                iPhone EMI (-₹2.2k)
              </button>

              <button
                type="button"
                onClick={() => selectScenario('Cut Gym Sub', 'Subscription Cut', 799)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-label-caps text-label-caps flex items-center gap-1.5 transition-all ${
                  delta === 799
                    ? 'bg-primary-container/20 text-primary-container border border-primary-container/30 font-bold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-surface-variant"></span>
                Cut Gym (+₹799)
              </button>

              <button
                type="button"
                onClick={() => selectScenario('Zomato Weekend', 'Late Night Swiggy/Zomato', -900)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-label-caps text-label-caps flex items-center gap-1.5 transition-all ${
                  delta === -900
                    ? 'bg-primary-container/20 text-primary-container border border-primary-container/30 font-bold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-surface-variant"></span>
                Zomato Binge (-₹900)
              </button>
            </div>
          </div>

          {/* CUSTOM INTERACTIVE SLIDER */}
          <div className="flex flex-col bg-surface-container-lowest/90 rounded-DEFAULT p-space-sm gap-2 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-body-md text-body-md font-bold text-on-surface">{scenarioName}</span>
                <span className="font-caption text-caption px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                  {scenarioTag}
                </span>
              </div>
              <span
                className={`font-telemetry-val text-telemetry-val ${
                  delta < 0 ? 'text-error' : 'text-primary-container'
                }`}
              >
                {delta >= 0 ? `+₹${delta}` : `-₹${Math.abs(delta)}`}
              </span>
            </div>

            <input
              type="range"
              min="-3000"
              max="1500"
              step="50"
              value={delta}
              onChange={(e) => setDelta(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary-container"
            />

            <div className="flex items-center justify-between font-caption text-caption text-on-surface-variant">
              <span>Expense: -₹3,000</span>
              <span>Baseline ₹0</span>
              <span>Refund / Cut: +₹1,500</span>
            </div>
          </div>

          {/* CASCADE IMPACT TELEMETRY MATRIX */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Predicted 30-Day Cascade
              </span>
              <span
                className={`font-caption text-caption px-2 py-0.5 rounded-full font-bold ${
                  newScore >= 80
                    ? 'bg-primary-container/20 text-primary-container'
                    : newScore >= 65
                    ? 'bg-secondary-container/30 text-secondary-fixed'
                    : 'bg-error-container/40 text-error'
                }`}
              >
                {newScore >= 80 ? '✨ Sustainable' : newScore >= 65 ? '⚠️ Moderate Squeeze' : '🚨 High Risk Slip'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-xs">
              {/* Remaining Balance */}
              <div className="flex flex-col bg-surface-container-high/80 rounded-DEFAULT p-space-sm border border-white/5">
                <span className="font-caption text-caption text-on-surface-variant">Remaining Balance</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    ₹{newBalance.toLocaleString('en-IN')}
                  </span>
                  <span className={`font-caption text-caption font-bold ${delta < 0 ? 'text-error' : 'text-primary-container'}`}>
                    {delta < 0 ? `${Math.round((delta / BASE_BALANCE) * 100)}%` : `+${Math.round((delta / BASE_BALANCE) * 100)}%`}
                  </span>
                </div>
                <span className="font-caption text-[10px] text-on-surface-variant">From ₹6,180 baseline</span>
              </div>

              {/* Daily Safe Burn */}
              <div className="flex flex-col bg-surface-container-high/80 rounded-DEFAULT p-space-sm border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-on-surface-variant">Daily Safe Burn</span>
                  <span
                    className={`font-caption text-[10px] px-1 rounded font-bold ${
                      newDailyBurn < 150
                        ? 'bg-error-container text-on-error'
                        : newDailyBurn < 200
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-primary-container/20 text-primary-container'
                    }`}
                  >
                    {newDailyBurn < 150 ? 'CRITICAL' : newDailyBurn < 200 ? 'CAUTION' : 'HEALTHY'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`font-headline-sm text-headline-sm font-bold ${
                      newDailyBurn < 150 ? 'text-error' : newDailyBurn < 200 ? 'text-secondary-fixed' : 'text-primary-container'
                    }`}
                  >
                    ₹{newDailyBurn}
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">/day</span>
                </div>
                <span className="font-caption text-[10px] text-on-surface-variant">Drops from ₹220/day</span>
              </div>

              {/* Month-End Result */}
              <div className="flex flex-col bg-surface-container-high/80 rounded-DEFAULT p-space-sm border border-white/5">
                <span className="font-caption text-caption text-on-surface-variant">End of Month Result</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`font-headline-sm text-headline-sm font-bold ${
                      isDeficit ? 'text-error' : 'text-primary-container'
                    }`}
                  >
                    {isDeficit ? `-₹${Math.abs(newSurplus).toLocaleString('en-IN')}` : `+₹${newSurplus.toLocaleString('en-IN')}`}
                  </span>
                  <span className={`font-caption text-[10px] font-bold ${isDeficit ? 'text-error' : 'text-primary-fixed-dim'}`}>
                    {isDeficit ? 'DEFICIT ⚠️' : 'SURPLUS'}
                  </span>
                </div>
                <span className="font-caption text-[10px] text-on-surface-variant">Baseline was +₹1,200 saved</span>
              </div>

              {/* Health Score */}
              <div className="flex flex-col bg-surface-container-high/80 rounded-DEFAULT p-space-sm border border-white/5">
                <span className="font-caption text-caption text-on-surface-variant">Pulse Financial Health</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary-fixed">
                    {newScore}
                  </span>
                  <span className={`font-caption text-caption font-bold ${delta < 0 ? 'text-error' : 'text-primary-container'}`}>
                    {delta < 0 ? `${newScore - BASE_SCORE} pts` : `+${newScore - BASE_SCORE} pts`}
                  </span>
                </div>
                <span className="font-caption text-[10px] text-on-surface-variant">
                  {newScore >= 80 ? 'Thriving • Stable' : newScore >= 65 ? 'Manageable Tension' : 'Danger / Vulnerable'}
                </span>
              </div>
            </div>

            {/* Goal Delay Alert Pill */}
            <div className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-lowest/90 border border-white/5">
              <div className="flex items-center gap-space-xs">
                <div className="w-7 h-7 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-sm">flight_takeoff</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                    Goa Trip Fund (₹3,000)
                  </span>
                  <span className={`font-caption text-caption font-medium ${delta < 0 ? 'text-error' : 'text-primary-container'}`}>
                    {delta < 0 ? `Delayed by ~${Math.round(Math.abs(delta) / 100)} days` : 'Fast-tracked by 6 days ahead!'}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">trending_flat</span>
            </div>
          </div>

          {/* Gratification vs Solvency Contrast */}
          <div className="grid grid-cols-2 gap-space-xs p-space-xs rounded-DEFAULT bg-surface-container-lowest border border-white/5">
            <div className="flex flex-col p-2 rounded-md bg-surface-container-high/40">
              <div className="flex items-center gap-1 text-on-surface-variant font-label-caps text-label-caps uppercase">
                <span className="material-symbols-outlined text-xs">sentiment_very_satisfied</span>
                <span>Immediate Mood</span>
              </div>
              <p className="font-caption text-caption text-on-surface mt-1 leading-snug">
                {delta < 0
                  ? 'High dopamine boost for 48 hours. Live energy & social memories.'
                  : 'Delayed gratification: calm confidence & high agency.'}
              </p>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-surface-container-high/40">
              <div className="flex items-center gap-1 text-primary-fixed-dim font-label-caps text-label-caps uppercase">
                <span className="material-symbols-outlined text-xs">shield</span>
                <span>30-Day Solvency</span>
              </div>
              <p className="font-caption text-caption text-on-surface mt-1 leading-snug">
                {delta < 0
                  ? 'Daily safe cap squeezed down. No room for unforeseen emergencies.'
                  : 'Expands daily buffer up to ₹260+/day. Total peace of mind.'}
              </p>
            </div>
          </div>

          {/* Simulator Actions */}
          <div className="flex flex-col gap-space-xs pt-space-xs">
            <button
              onClick={handleCommit}
              className="w-full h-13 py-3 rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,155,0.35)] active:scale-98 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">lock</span>
              <span>Commit & Update Ledger</span>
            </button>
            <div className="grid grid-cols-2 gap-space-xs">
              <button
                onClick={() => showToast("Scenario bookmarked to 'Decisions Sandbox' board.")}
                className="h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-base">bookmark_add</span>
                <span>Save Scenario</span>
              </button>
              <button
                onClick={() => showToast('Simulation snapshot copied to clipboard!')}
                className="h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-base">ios_share</span>
                <span>Share Reality-Check</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 30-DAY RUNWAY TRAJECTORY SPARKLINE & GRAPH */}
      <section className="flex flex-col w-full bg-surface-container rounded-lg p-space-md shadow-xl gap-space-sm border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
              Runway Burn Trajectory
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Day 1 to 30 Burn Curve
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-caption text-caption text-primary">
              <span className="w-2 h-0.5 bg-primary-container"></span> Actual
            </span>
            <span className="flex items-center gap-1 font-caption text-caption text-error">
              <span className="w-2 h-0.5 bg-error stroke-dashed"></span> Simulated
            </span>
          </div>
        </div>

        {/* Inline SVG Trajectory Visual */}
        <div className="w-full bg-surface-container-lowest/80 rounded-DEFAULT p-space-sm flex flex-col gap-1 border border-white/5">
          <svg className="w-full h-32 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 120">
            {/* Horizontal Guides */}
            <line stroke="#272935" strokeDasharray="2,2" strokeWidth="1" x1="0" x2="320" y1="20" y2="20"></line>
            <line stroke="#272935" strokeDasharray="2,2" strokeWidth="1" x1="0" x2="320" y1="60" y2="60"></line>
            <line stroke="#272935" strokeDasharray="2,2" strokeWidth="1" x1="0" x2="320" y1="100" y2="100"></line>
            <line opacity="0.6" stroke="#93000a" strokeWidth="1.2" x1="0" x2="320" y1="105" y2="105"></line>
            <text className="text-[8px] font-mono" fill="#ffb4ab" x="5" y="115">
              ₹0 Solvency Floor
            </text>

            {/* Day 12 Current Vertical Mark */}
            <line stroke="#5516be" strokeDasharray="3,2" strokeWidth="1.5" x1="128" x2="128" y1="5" y2="115"></line>
            <text className="text-[8px] font-sans font-bold" fill="#d0bcff" x="131" y="15">
              Today (Day 12)
            </text>

            {/* Actual Track */}
            <path d="M 0,20 Q 50,28 80,42 T 128,52" fill="none" stroke="#00f59b" strokeWidth="2.5"></path>
            <circle cx="128" cy="52" fill="#00f59b" r="4"></circle>

            {/* Simulated Projected Path */}
            <path
              d={
                delta < 0
                  ? isSevere
                    ? 'M 128,52 L 138,85 Q 200,118 320,120'
                    : 'M 128,52 L 140,76 Q 220,95 320,112'
                  : 'M 128,52 Q 220,50 320,40'
              }
              fill="none"
              stroke={delta < 0 ? '#ffb4ab' : '#00f59b'}
              strokeDasharray="3,3"
              strokeWidth="2"
            ></path>
            <circle
              cx="320"
              cy={delta < 0 ? (isSevere ? 120 : 112) : 40}
              fill={delta < 0 ? '#ffb4ab' : '#00f59b'}
              r="3.5"
            ></circle>
          </svg>

          <div className="flex items-center justify-between font-caption text-caption text-on-surface-variant pt-1">
            <span>Day 1 (₹10,000)</span>
            <span className="text-secondary-fixed">Day 12 (₹6,180)</span>
            <span className={delta < 0 ? 'text-error font-semibold' : 'text-primary font-semibold'}>
              {delta < 0 ? 'Day 30 (₹0 Deficit Risk)' : 'Day 30 (+₹1,950 Banked)'}
            </span>
          </div>
        </div>
      </section>

      {/* FIXED COMMITMENTS */}
      <section className="flex flex-col w-full bg-surface-container rounded-lg p-space-md shadow-xl gap-space-sm border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
              Fixed Commitments
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Locked Next 7 Days
            </span>
          </div>
          <span className="font-telemetry-val text-sm text-on-surface font-bold">₹1,650 Locked</span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-high/60 border border-white/5">
            <div className="flex items-center gap-space-xs">
              <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center text-primary-container shadow-inner">
                <span className="material-symbols-outlined text-[20px]">music_note</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md font-bold text-on-surface">Spotify Family Split</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Due Day 15 • Auto Debit</span>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-telemetry-val text-sm font-bold text-on-surface">₹299</span>
              <span className="font-caption text-caption text-primary-fixed-dim">Enforced</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-high/60 border border-white/5">
            <div className="flex items-center gap-space-xs">
              <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center text-secondary shadow-inner">
                <span className="material-symbols-outlined text-[20px]">wifi</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md font-bold text-on-surface">PG Shared Fiber WiFi</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Due Day 17 • UPI Mandate</span>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-telemetry-val text-sm font-bold text-on-surface">₹450</span>
              <span className="font-caption text-caption text-primary-fixed-dim">Enforced</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-high/60 border border-white/5">
            <div className="flex items-center gap-space-xs">
              <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center text-tertiary-fixed-dim shadow-inner">
                <span className="material-symbols-outlined text-[20px]">directions_subway</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md font-bold text-on-surface">Monthly Metro SmartCard</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Due Day 19 • Critical</span>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-telemetry-val text-sm font-bold text-on-surface">₹901</span>
              <span className="font-caption text-caption text-primary-fixed-dim">Enforced</span>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL FEED & PEER BENCHMARKS */}
      <section className="grid grid-cols-2 gap-space-sm w-full">
        <div className="flex flex-col rounded-lg bg-surface-container overflow-hidden p-space-sm relative border border-white/5">
          <div className="w-full h-24 rounded-DEFAULT overflow-hidden mb-2 relative">
            <img
              className="w-full h-full object-cover"
              alt="Goa Trip Vault"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW8J13-4irbfRPzRA0ET-EObHKABmA_tf6r2Y_EPKGjRp6QkSGi38R0EKgngHfTfVVtA_op2soDnqPUvOzahJlrNXT7MDYQ9OWGCv3b2aulNQJphE3bmtBs_NdqK1pGaALeI6L6w6OdtVBeuJhRum90m4KJL3eaVQid0g0EresiJQTwLy1XhdtnraFsqz0f4K5lRB5JNP2iVkthqG5q4YNguHno3C3vU-gB0FqvfOgrAY6vKCEVFXr"
            />
            <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-primary font-caption text-caption">
              Target
            </span>
          </div>
          <span className="font-body-sm text-body-sm font-bold text-on-surface">Goa Trip Vault</span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-caption text-caption text-on-surface-variant">₹1,850 / ₹3,000</span>
            <span className="font-caption text-caption text-primary font-semibold">61%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-1.5 overflow-hidden">
            <div className="w-[61%] h-full bg-primary-container rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-surface-container overflow-hidden p-space-sm relative border border-white/5">
          <div className="w-full h-24 rounded-DEFAULT overflow-hidden mb-2 relative">
            <img
              className="w-full h-full object-cover"
              alt="Rank Benchmark"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmIzuqL-BGrHI2uDvyh56oNPmiQO5mM0G2lfsZ-8_0T4cNqs2OFYP8Wqw6GlyHJps02anU1ydjy15rlDaK2pGgtckNDMoCQ6gHYD8oRC41aM4qsMj3KZ9CAud9TcxE6YXMpRUO0YAN-AY4ei7O-6_Hf7fSMETK6Em59FtJwCze5e3hoLJFHfsQOhfOWgKv9OqQ6ZborsXU85x1YUJpLCUnleR2zt9YUOngusQsHsyNpYiJ30rpsJeP"
            />
            <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-secondary font-caption text-caption">
              Rank
            </span>
          </div>
          <span className="font-body-sm text-body-sm font-bold text-on-surface">Top 12% in Bengaluru</span>
          <p className="font-caption text-caption text-on-surface-variant mt-0.5 line-clamp-2">
            Spending 22% less on dining than peers on identical ₹10k allowances.
          </p>
        </div>
      </section>
    </div>
  );
});
