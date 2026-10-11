import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const GoalsBillsScreen: React.FC = () => {
  const {
    monthlyBudget,
    setMonthlyBudget,
    cycleLength,
    setCycleLength,
    currentDay,
    emergencyFundTotal,
    depositToGoal,
    healthScore,
    showToast
  } = useBudget();

  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());
  const [cycleDaysInput, setCycleDaysInput] = useState(cycleLength.toString());

  // Subscription toggles in Goals & Bills
  const [spotifyActive, setSpotifyActive] = useState(true);
  const [cloudActive, setCloudActive] = useState(true);
  const [appliedOptimize, setAppliedOptimize] = useState(false);

  const remainingDays = cycleLength - currentDay;

  // Saved amount from simulated cancellations
  const savedSubsMonthly = (!spotifyActive ? 119 : 0) + (!cloudActive ? 130 : 0);
  const dailyBoost = savedSubsMonthly > 0 ? (savedSubsMonthly / remainingDays).toFixed(1) : '0';

  const handleApplyConfig = () => {
    const b = parseInt(budgetInput, 10);
    const d = parseInt(cycleDaysInput, 10);
    if (!isNaN(b) && b > 0) setMonthlyBudget(b);
    if (!isNaN(d) && d > 0) setCycleLength(d);
    setIsConfigDrawerOpen(false);
    showToast('Updated cycle parameters');
  };

  const emergencyPct = Math.min(100, Math.round((emergencyFundTotal / 1500) * 100));

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl gap-space-lg max-w-xl mx-auto">
      {/* Top Context & Quick Configurator Bar */}
      <section className="flex flex-col gap-space-sm pt-space-xs">
        <div className="flex items-center justify-between bg-surface-container p-space-sm rounded-xl shadow-sm border border-white/5">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Active Baseline
              </span>
              <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate">
                ₹{monthlyBudget.toLocaleString('en-IN')} • {cycleLength} Days • India (INR)
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsConfigDrawerOpen(!isConfigDrawerOpen)}
            className="flex items-center gap-1 bg-surface-container-high px-space-sm py-1.5 rounded-lg text-primary font-label-md text-label-md active:scale-95 transition-transform shrink-0 border border-white/5 font-semibold"
          >
            <span className="material-symbols-outlined text-[15px]">edit</span>
            <span>Edit</span>
          </button>
        </div>

        {/* Inline Quick Config Drawer (Collapsible) */}
        {isConfigDrawerOpen && (
          <div className="flex flex-col gap-space-sm p-space-md bg-surface-container-high rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Simulate Month Baseline
              </span>
              <button
                onClick={() => setIsConfigDrawerOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-space-sm pt-1">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Cycle Allowance (₹)
                </label>
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-stat-numeric text-[16px] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-primary border border-white/5"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Cycle Length (Days)
                </label>
                <input
                  type="number"
                  value={cycleDaysInput}
                  onChange={(e) => setCycleDaysInput(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-stat-numeric text-[16px] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-primary border border-white/5"
                />
              </div>
            </div>
            <button
              onClick={handleApplyConfig}
              className="w-full mt-1 py-2 bg-primary text-on-primary font-label-md text-label-md font-bold rounded-lg active:opacity-90 transition-opacity"
            >
              Update Simulation
            </button>
          </div>
        )}
      </section>

      {/* SAVINGS GOALS HUB */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_lock
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Savings Goals Hub
            </h2>
          </div>
          <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold border border-primary/20">
            2 Active Goals
          </span>
        </div>

        {/* Goal 1: Emergency Fund (Protected Reserve) */}
        <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col gap-space-sm relative overflow-hidden border border-white/5">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                    Emergency Fund
                  </span>
                  <span className="bg-primary/15 text-primary text-[10px] font-label-sm px-1.5 py-0.5 rounded-md font-semibold shrink-0">
                    Ring-fenced
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Protected safety net</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-stat-numeric text-[20px] text-primary font-bold">
                {emergencyPct}%
              </span>
            </div>
          </div>

          {/* Financial Metrics Line */}
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="font-stat-numeric text-stat-numeric text-on-surface font-bold">
                ₹{emergencyFundTotal.toLocaleString('en-IN')}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant"> / ₹1,500 Target</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">event_repeat</span>
              <span className="font-label-sm text-label-sm font-semibold">₹22 / day needed</span>
            </div>
          </div>

          {/* Dual Tone Progress Bar */}
          <div className="w-full bg-surface-container-lowest h-2.5 rounded-full overflow-hidden p-[2px]">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${emergencyPct}%` }}
            ></div>
          </div>

          {/* Ring-fenced Micro Explainer Badge */}
          <div className="flex items-center gap-space-xs bg-surface-container-low px-2.5 py-1.5 rounded-lg border border-white/5">
            <span className="material-symbols-outlined text-primary text-[15px] shrink-0">verified_user</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
              Separately ring-fenced; never deducted from daily spend allowance.
            </p>
          </div>

          {/* Interactive Quick Action */}
          <div className="flex items-center gap-space-sm pt-1">
            <button
              onClick={() => depositToGoal('goal-emergency', 200)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold shadow-md active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Deposit ₹200</span>
            </button>
            <button
              onClick={() => depositToGoal('goal-emergency', 50)}
              className="p-2.5 bg-surface-container-high text-on-surface rounded-xl active:bg-surface-bright transition-colors border border-white/5"
              title="+ Deposit ₹50"
            >
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
        </div>

        {/* Goal 2: Semester Tech Upgrades */}
        <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col gap-space-sm border border-white/5">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[22px]">laptop_mac</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                  Semester Tech Upgrades
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Hardware & accessories</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-stat-numeric text-[20px] text-secondary font-bold">40%</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="font-stat-numeric text-stat-numeric text-on-surface font-bold">₹800</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant"> / ₹2,000 Target</span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-md border border-white/5">
              <span className="material-symbols-outlined text-secondary text-[14px]">flag</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">ETA: Day 28 of 30</span>
            </div>
          </div>

          {/* Animated Multi-stop Gradient Bar */}
          <div className="w-full bg-surface-container-lowest h-2.5 rounded-full overflow-hidden p-[2px]">
            <div
              className="h-full bg-gradient-to-r from-secondary-container to-secondary rounded-full"
              style={{ width: '40%' }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1">
            <span>₹1,200 remaining</span>
            <span>₹54.5/day allocation target</span>
          </div>
        </div>
      </section>

      {/* UPCOMING COMMITMENTS & SUBSCRIPTIONS */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[20px]">calendar_clock</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Upcoming Commitments
              </h2>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Total ₹1,200 ring-fenced from cycle
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-semibold border border-secondary/20">
            100% Backed
          </span>
        </div>

        {/* Active Bills Sub-list */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold px-1">
            Mandatory Bills
          </span>

          {/* Hostel WiFi */}
          <div className="flex items-center justify-between p-space-md bg-surface-container rounded-xl shadow-sm border border-white/5">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">wifi</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                  Hostel High-Speed WiFi
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    Due Day 12 (In 4 days)
                  </span>
                  <span className="w-1 h-1 rounded-full bg-on-surface-variant"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-Reserved</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-stat-numeric text-[18px] text-on-surface font-bold">₹450</span>
              <span className="block font-label-sm text-[10px] text-primary font-semibold">Funds Locked</span>
            </div>
          </div>

          {/* Mobile Data Plan */}
          <div className="flex items-center justify-between p-space-md bg-surface-container rounded-xl shadow-sm border border-white/5">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">sim_card</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                  Mobile Data Plan
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Due Day 15 (In 7 days)
                  </span>
                  <span className="w-1 h-1 rounded-full bg-on-surface-variant"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Unpaid</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-stat-numeric text-[18px] text-on-surface font-bold">₹250</span>
              <span className="block font-label-sm text-[10px] text-primary font-semibold">Funds Locked</span>
            </div>
          </div>
        </div>

        {/* Subscriptions & Cancellation Simulator */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Flexible Subscriptions
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              Sandbox Impact Mode
            </span>
          </div>

          {/* Subscription 1: Spotify */}
          <div className={`flex items-center justify-between p-space-md bg-surface-container rounded-xl shadow-sm border border-white/5 transition-all ${!spotifyActive ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">headphones</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-body-md text-body-md text-on-surface font-semibold truncate ${!spotifyActive ? 'line-through' : ''}`}>
                  Spotify Student Duo
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  ₹119 • Due Day 18
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:block">
                {spotifyActive ? 'Active' : 'Paused'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSpotifyActive(!spotifyActive);
                  showToast(!spotifyActive ? 'Re-activated Spotify' : 'Paused Spotify (+₹119/mo)');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                  spotifyActive ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    spotifyActive ? 'right-0.5' : 'left-0.5'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Subscription 2: Cloud Storage */}
          <div className={`flex items-center justify-between p-space-md bg-surface-container rounded-xl shadow-sm border border-white/5 transition-all ${!cloudActive ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">cloud_queue</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-body-md text-body-md text-on-surface font-semibold truncate ${!cloudActive ? 'line-through' : ''}`}>
                  Cloud Storage 100GB
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  ₹130 • Due Day 22
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:block">
                {cloudActive ? 'Active' : 'Paused'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCloudActive(!cloudActive);
                  showToast(!cloudActive ? 'Re-activated Cloud Storage' : 'Paused Cloud Storage (+₹130/mo)');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                  cloudActive ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    cloudActive ? 'right-0.5' : 'left-0.5'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Cancellation Simulator Live Feedback Card */}
          <div className="p-space-md bg-surface-container-high rounded-xl flex items-center justify-between gap-space-sm mt-1 transition-all border border-white/5">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-7 h-7 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">insights</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Simulate Cancellation
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {savedSubsMonthly > 0 ? (
                    <span>
                      Simulating <strong className="text-primary">₹{savedSubsMonthly}/mo saved!</strong> Increases daily allowance by{' '}
                      <strong className="text-primary font-bold">+{dailyBoost}/day</strong>.
                    </span>
                  ) : (
                    'Toggle switch off to free up cash into daily spend pool.'
                  )}
                </span>
              </div>
            </div>
            {savedSubsMonthly > 0 && (
              <div className="shrink-0 bg-primary/15 px-2.5 py-1 rounded-lg text-primary font-stat-numeric text-[13px] font-bold border border-primary/20">
                +{dailyBoost}/day
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FINANCIAL RISK & EARLY WARNING RADAR */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">radar</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Financial Health Radar
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Telemetry V2.4</span>
        </div>

        {/* Big Health Score Gauge Card */}
        <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col gap-space-md relative overflow-hidden border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Risk Classification
              </span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                Low-to-Moderate
              </span>
              <span className="font-body-sm text-body-sm text-primary font-semibold mt-0.5">
                Safety index stable
              </span>
            </div>

            {/* Radial Score Display */}
            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-highest"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-primary stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-stat-numeric text-[19px] text-on-surface font-bold leading-none">
                  {healthScore}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant font-semibold">/100</span>
              </div>
            </div>
          </div>

          {/* Live Automated Insights List */}
          <div className="flex flex-col gap-space-sm pt-2">
            <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-high rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                check_circle
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Commitment Coverage: 100%
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Upcoming ₹1,200 bills are fully backed by ring-fenced bank reserves.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-high rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                warning
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Velocity Pacing Alert
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Food & Dining spend (₹650) is running 12% ahead of ideal 30-day velocity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-high rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                lightbulb
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Optimization Opportunity
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Allocating ₹35 extra into Emergency Fund brings your safety net to 80%.
                </p>
                <div className="pt-2">
                  <button
                    disabled={appliedOptimize}
                    onClick={() => {
                      depositToGoal('goal-emergency', 35);
                      setAppliedOptimize(true);
                    }}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-label-md text-label-md font-semibold transition-colors ${
                      appliedOptimize
                        ? 'bg-primary/30 text-primary cursor-default'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    <span>{appliedOptimize ? 'Allocated +₹35!' : 'Apply +₹35 Allocation'}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      {appliedOptimize ? 'check' : 'arrow_forward'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Delighter Mini Affirmation Card */}
      <div className="flex items-center justify-between p-space-md bg-gradient-to-r from-surface-container to-surface-container-high rounded-xl shadow-sm border border-white/5">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Smart Run-Rate On Track
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Day {currentDay} completed without exceeding daily caps.
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
      </div>
    </div>
  );
};
