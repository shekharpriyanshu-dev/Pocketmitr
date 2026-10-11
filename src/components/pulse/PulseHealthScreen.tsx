import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const PulseHealthScreen: React.FC = () => {
  const { depositToGoal, showToast } = useBudget();

  const BASELINE_STASH = 6180;

  const shockScenarios = [
    {
      id: 'dentist',
      title: 'Medical / Dentist visit',
      subtitle: 'Unplanned critical procedure',
      cost: 2000,
      burn: 110,
      risk: 'CRITICAL HIGH',
      riskClass: 'text-error bg-error-container',
      deficit: '-₹480',
      isDeficit: true,
      advice: 'Pause Netflix & Spotify, delay weekend trek, cut takeout by 35% to avoid high-cost credit borrow.',
      icon: 'emergency',
      iconClass: 'text-error'
    },
    {
      id: 'phone',
      title: 'Phone screen cracked',
      subtitle: 'Gorilla glass replacement',
      cost: 1800,
      burn: 121,
      risk: 'HIGH RISK',
      riskClass: 'text-tertiary-fixed-dim bg-tertiary-container/30',
      deficit: '-₹280',
      isDeficit: true,
      advice: 'Delay new sneakers buy, utilize college campus mess meals exclusively for the next 10 days.',
      icon: 'phonelink_erase',
      iconClass: 'text-tertiary-fixed-dim'
    },
    {
      id: 'bday',
      title: 'Best friend surprise dinner',
      subtitle: 'Group split + gift pool',
      cost: 1200,
      burn: 154,
      risk: 'ELEVATED',
      riskClass: 'text-secondary bg-secondary-container/40',
      deficit: '+₹320',
      isDeficit: false,
      advice: 'Switch weekend trek to day-hike only. Cancel mid-week Boba tea runs to protect runway.',
      icon: 'celebration',
      iconClass: 'text-secondary'
    },
    {
      id: 'bike',
      title: 'Bike scooter brake repair',
      subtitle: 'Puncture + brake cable',
      cost: 750,
      burn: 179,
      risk: 'CONTROLLED',
      riskClass: 'text-primary-fixed-dim bg-primary-container/20',
      deficit: '+₹770',
      isDeficit: false,
      advice: 'Within normal absorption capacity. No major budget overhaul needed; log transaction promptly.',
      icon: 'two_wheeler',
      iconClass: 'text-primary-container'
    }
  ];

  const [selectedShockId, setSelectedShockId] = useState<string | null>('dentist');

  const selectedShock = shockScenarios.find((s) => s.id === selectedShockId);
  const adjustedStash = selectedShock ? BASELINE_STASH - selectedShock.cost : BASELINE_STASH;
  const currentDailyBurn = selectedShock ? selectedShock.burn : 232;
  const currentRisk = selectedShock ? selectedShock.risk : 'BASELINE TRACK';
  const currentRiskClass = selectedShock
    ? selectedShock.riskClass
    : 'text-primary-container bg-primary-container/15';
  const currentAdvice = selectedShock
    ? selectedShock.advice
    : 'All regular expenses on target. Stash healthy for remaining 18 days.';

  const handleReset = () => {
    setSelectedShockId(null);
    showToast('Reset scenario baseline');
  };

  const handleLockCushion = () => {
    depositToGoal('goal-emergency', 500);
    showToast('Locked ₹500 Micro-Emergency Cushion into safe vault!');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin pt-space-md pb-space-xl gap-space-lg">
      {/* Top Health Telemetry Card */}
      <div className="relative overflow-hidden rounded-lg bg-surface-container p-space-md shadow-xl border border-white/5">
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="relative flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f59b]"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
              Health Telemetry
            </span>
          </div>
          <div className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary-fixed-dim border border-white/5 font-semibold">
            <span className="font-label-caps text-label-caps tracking-tight">Cycle Day 12 / 30</span>
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-space-md mt-space-xs">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface font-extrabold tracking-tight">
                84
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
                / 100
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-primary-container/15 text-primary-container font-label-caps text-label-caps font-bold border border-primary-container/20">
                GRADE A−
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Solvency Stable</span>
            </div>
          </div>

          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                className="text-surface-container-highest"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="text-primary-container drop-shadow-[0_0_10px_rgba(0,245,155,0.4)]"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251.2"
                strokeDashoffset="40.2"
                strokeLinecap="round"
                strokeWidth="8"
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[26px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                ecg_heart
              </span>
              <span className="font-caption text-caption text-on-surface-variant tracking-tight mt-0.5 font-bold">
                LIVE
              </span>
            </div>
          </div>
        </div>

        <div className="mt-space-md p-space-sm rounded bg-surface-container-low flex items-start gap-space-sm border border-white/5">
          <div className="w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center shrink-0 text-tertiary-fixed-dim">
            <span className="material-symbols-outlined text-[18px]">warning</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-tertiary-fixed-dim uppercase tracking-wider font-bold">
                Moderate Risk Vector
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
              <span className="font-caption text-caption text-on-surface-variant font-medium">Pending Draw</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface mt-0.5 leading-snug">
              Upcoming <strong className="text-on-surface font-semibold">₹1,400 weekend trek</strong> commitment will consume 22.6% of your unallocated safety margin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-sm mt-space-sm">
          <div className="p-space-sm rounded bg-surface-container-high flex flex-col border border-white/5">
            <span className="font-caption text-caption text-on-surface-variant">Available Runway</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">18 Days</span>
            <span className="font-caption text-caption text-primary-container mt-0.5">₹343 / day baseline</span>
          </div>
          <div className="p-space-sm rounded bg-surface-container-high flex flex-col border border-white/5">
            <span className="font-caption text-caption text-on-surface-variant">Unallocated Stash</span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">₹6,180</span>
            <span className="font-caption text-caption text-on-surface-variant mt-0.5">out of ₹10,000 cap</span>
          </div>
        </div>
      </div>

      {/* Vulnerability Core */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Vulnerability Core</h2>
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase font-semibold">
            3 Key Vectors
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-sm">
          {/* Liquidity Ratio */}
          <div className="p-space-md rounded-lg bg-surface-container shadow-md flex flex-col gap-space-xs border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">water_drop</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">Liquidity Ratio</span>
              </div>
              <span className="font-telemetry-val text-telemetry-val text-secondary font-bold">78%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-secondary-fixed-dim rounded-full shadow-[0_0_8px_rgba(208,188,255,0.4)]" style={{ width: '78%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-caption text-caption text-on-surface-variant">Committed ₹3,820 vs Liquid ₹6,180</span>
              <span className="font-caption text-caption text-primary font-semibold">Solid Buffer</span>
            </div>
          </div>

          {/* Burn Velocity */}
          <div className="p-space-md rounded-lg bg-surface-container shadow-md flex flex-col gap-space-xs border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary-container">speed</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">Burn Velocity</span>
              </div>
              <span className="font-telemetry-val text-telemetry-val text-primary-container font-bold">92%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-primary-container rounded-full shadow-[0_0_8px_rgba(0,245,155,0.35)]" style={{ width: '92%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-caption text-caption text-on-surface-variant">Under-burning by ₹28/day vs standard track</span>
              <span className="font-caption text-caption text-primary font-semibold">Optimal Pacing</span>
            </div>
          </div>

          {/* Shock Absorption Limit */}
          <div className="p-space-md rounded-lg bg-surface-container shadow-md flex flex-col gap-space-xs border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">shield</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">Shock Absorption Limit</span>
              </div>
              <span className="font-telemetry-val text-telemetry-val text-tertiary-fixed-dim font-bold">₹1,500</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-tertiary-fixed-dim rounded-full shadow-[0_0_8px_rgba(255,181,154,0.3)]" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-caption text-caption text-on-surface-variant">Max single blow before entering 0-margin debt</span>
              <span className="font-caption text-caption text-tertiary-fixed-dim font-semibold">Thin Cushion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shock Simulator */}
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[20px]">bolt</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Shock Simulator</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Tap a stress-test scenario to see how unexpected life hits impact your ₹10,000 monthly limit.
          </p>
        </div>

        {/* Buttons List */}
        <div className="grid grid-cols-1 gap-space-xs">
          {shockScenarios.map((sc) => {
            const isSelected = selectedShockId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedShockId(sc.id)}
                className={`w-full text-left p-space-sm rounded-lg transition-all flex items-center justify-between active:scale-[0.98] border border-white/5 ${
                  isSelected
                    ? 'bg-surface-bright shadow-md ring-1 ring-primary-container/40'
                    : 'bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className={`material-symbols-outlined text-[20px] ${sc.iconClass}`}>{sc.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                      {sc.title}
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {sc.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className={`font-telemetry-val text-telemetry-val ${sc.iconClass}`}>
                    −₹{sc.cost.toLocaleString('en-IN')}
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {sc.id === 'dentist' ? 'Instant hit' : sc.id === 'phone' ? 'Hardware fix' : sc.id === 'bday' ? 'Social load' : 'Maintenance'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Results Card */}
        <div className="rounded-lg bg-surface-container-high p-space-md shadow-xl flex flex-col gap-space-md border border-white/5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">crisis_alert</span>
              <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider font-bold">
                Projected Shock Impact
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full font-label-caps text-label-caps font-bold tracking-wider ${currentRiskClass}`}>
              {currentRisk}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="p-space-sm rounded bg-surface-container flex flex-col border border-white/5">
              <span className="font-caption text-caption text-on-surface-variant">Adjusted Stash</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ₹{adjustedStash.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="font-caption text-caption text-error">from ₹6,180 available</span>
            </div>

            <div className="p-space-sm rounded bg-surface-container flex flex-col border border-white/5">
              <span className="font-caption text-caption text-on-surface-variant">Allowed Daily Burn</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`font-headline-sm text-headline-sm font-bold ${currentDailyBurn < 150 ? 'text-error' : 'text-primary-fixed-dim'}`}>
                  ₹{currentDailyBurn}
                </span>
                <span className="font-caption text-caption text-on-surface-variant">/ day</span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant">Down from ₹232/day</span>
            </div>
          </div>

          <div className="p-space-sm rounded bg-surface-container flex flex-col gap-space-xs border border-white/5">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[16px]">shield_with_heart</span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">
                Recommended Defense Strategy
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface leading-snug">{currentAdvice}</p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full h-11 rounded-full bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-caps text-label-caps tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 border border-white/5 font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            Reset Scenario Baseline
          </button>
        </div>
      </div>

      {/* Day 30 Forecast Ledger */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Day 30 Forecast Ledger
          </h2>
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase font-semibold">
            End-of-Month
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-full bg-primary-container/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] text-primary-container">trending_up</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                  Best-Case Outcome
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Zero unplanned spending + cut dine-out
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 pl-2">
              <span className="font-telemetry-val text-telemetry-val text-primary-container font-bold">+₹1,850</span>
              <span className="font-caption text-caption text-primary">Surplus stash</span>
            </div>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-full bg-secondary-container/25 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] text-secondary">trending_flat</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                  Current Baseline Track
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  With confirmed ₹1,400 weekend trip
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 pl-2">
              <span className="font-telemetry-val text-telemetry-val text-on-surface font-bold">+₹920</span>
              <span className="font-caption text-caption text-on-surface-variant">Safe margin</span>
            </div>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-full bg-error-container/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] text-error">trending_down</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                  Active Shock Simulation
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Selected crisis scenario applied
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 pl-2">
              <span
                className={`font-telemetry-val text-telemetry-val font-bold ${
                  selectedShock?.isDeficit ? 'text-error' : 'text-primary-container'
                }`}
              >
                {selectedShock ? selectedShock.deficit : '+₹920'}
              </span>
              <span className={`font-caption text-caption font-semibold ${selectedShock?.isDeficit ? 'text-error' : 'text-primary'}`}>
                {selectedShock?.isDeficit ? 'Deficit Alert' : 'Protected Surplus'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-space-xs pb-space-sm">
        <button
          type="button"
          onClick={handleLockCushion}
          className="w-full h-12 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,245,155,0.3)] active:scale-[0.98] transition-transform text-[#002111]"
        >
          <span className="material-symbols-outlined text-[20px]">lock_reset</span>
          Lock Micro-Emergency Cushion (₹500)
        </button>
      </div>
    </div>
  );
};
