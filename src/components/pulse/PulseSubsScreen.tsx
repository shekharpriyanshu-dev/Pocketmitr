import React from 'react';
import { useBudget } from '../../context/BudgetContext';

export const PulseSubsScreen: React.FC = React.memo(() => {
  const {
    subscriptions,
    toggleSubscription,
    culledMonthlyTotal,
    culledDailyBoost,
    depositToGoal
  } = useBudget();

  return (
    <div className="flex flex-col w-full px-margin space-y-space-lg pb-space-xl max-w-xl mx-auto">
      {/* Header Meta & Drain Progress */}
      <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-xl border border-white/5">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-10 w-48 h-48 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        {/* Header Meta & Micro Status */}
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">lock_clock</span>
            <span className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-wider font-semibold">
              Locked Commitments
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface-variant border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            <span className="font-caption text-caption tracking-tight">Silent Leakage Radar</span>
          </div>
        </div>

        {/* Primary Metric */}
        <div className="flex flex-col pt-space-xs pb-space-sm">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface font-extrabold tracking-tight">
              ₹2,180
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant font-medium">
              / ₹10,000
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-error font-medium pt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">priority_high</span>
            21.8% of your entire allowance is locked before you wake up
          </p>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-surface-container-lowest rounded-full h-2.5 overflow-hidden flex my-space-xs border border-white/5">
          <div className="bg-primary-container h-full transition-all duration-500 rounded-l-full" style={{ width: '21.8%' }}></div>
          <div className="bg-surface-container-highest h-full transition-all duration-500" style={{ width: '78.2%' }}></div>
        </div>

        {/* Next Major Deduction Banner */}
        <div className="mt-space-sm rounded-DEFAULT bg-surface-container p-space-sm flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                3 days until next major hit
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                Spotify + Room WiFi (Day 15)
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-telemetry-val text-telemetry-val text-secondary-fixed">₹509</span>
          </div>
        </div>
      </div>

      {/* Interactive Cull Simulator Callout */}
      <div className="rounded-xl bg-gradient-to-r from-secondary-container/40 via-surface-container to-surface-container p-space-md shadow-lg relative overflow-hidden border border-white/5">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span className="font-label-caps text-label-caps tracking-wider uppercase font-bold">
                The Cull Simulator
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface leading-snug">
              Kill or pause recurring subs to re-inject liquidity into your daily lunch & chai fund!
            </p>
          </div>
          <div className="text-right bg-surface-container-lowest/80 px-2.5 py-1.5 rounded-lg flex flex-col items-end border border-white/5">
            <span className="font-caption text-caption text-on-surface-variant font-medium">Unshackled</span>
            <span className="font-telemetry-val text-telemetry-val text-primary-container">
              +₹{culledMonthlyTotal}/mo
            </span>
          </div>
        </div>

        {/* Live Dynamic Boost Bar */}
        <div className="mt-space-sm py-1.5 px-space-sm rounded-full bg-primary-container/10 flex items-center justify-between transition-all border border-primary-container/20">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span className="font-caption text-caption font-semibold">
              {culledMonthlyTotal > 0
                ? 'Reclaimed allowance: Ready to convert to instant daily spend!'
                : 'Toggle off subscriptions below to simulate instant boost'}
            </span>
          </div>
          <span className="font-label-caps text-label-caps text-primary font-bold">
            +₹{culledDailyBoost}/day
          </span>
        </div>
      </div>

      {/* Section 1: Active Subscriptions & Recurring Bills */}
      <div className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Active Subscriptions
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps border border-white/5">
              6 total
            </span>
          </div>
          <span className="font-caption text-caption text-on-surface-variant">
            Tap switch to simulate cull
          </span>
        </div>

        <div className="flex flex-col space-y-space-xs">
          {subscriptions.map((sub) => {
            return (
              <div
                key={sub.id}
                className={`rounded-DEFAULT bg-surface-container p-space-sm flex flex-col space-y-2 transition-all duration-300 border border-white/5 ${
                  !sub.isActive ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className="w-11 h-11 rounded-DEFAULT bg-surface-container-high flex items-center justify-center text-primary-container shrink-0 border border-white/5">
                      <span className="material-symbols-outlined text-[22px]">{sub.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-body-md text-body-md text-on-surface font-semibold truncate ${!sub.isActive ? 'line-through' : ''}`}>
                          {sub.name}
                        </span>
                        {sub.isFixed && (
                          <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface-variant font-caption text-caption uppercase text-[9px]">
                            Fixed
                          </span>
                        )}
                        {!sub.isFixed && sub.isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        )}
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant">
                        Due Day {sub.dueDay} • {sub.note}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-sm shrink-0">
                    <div className="text-right">
                      <span className={`font-body-lg text-body-lg text-on-surface font-bold ${!sub.isActive ? 'line-through text-on-surface-variant' : ''}`}>
                        ₹{sub.cost}
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant block">/mo</span>
                    </div>

                    {sub.isFixed ? (
                      <div
                        className="w-10 h-6 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-outline cursor-not-allowed border border-white/5"
                        title="Non-negotiable"
                      >
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleSubscription(sub.id)}
                        className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors focus:outline-none ${
                          sub.isActive ? 'bg-primary-container' : 'bg-surface-container-highest'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full bg-surface-container-lowest shadow-md transform transition-transform flex items-center justify-center ${
                            sub.isActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[13px] font-bold ${
                              sub.isActive ? 'text-primary-container' : 'text-error'
                            }`}
                          >
                            {sub.isActive ? 'check' : 'close'}
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* High-Impact Badge for Gym */}
                {sub.id === 'sub-gym' && sub.isActive && (
                  <div className="rounded-DEFAULT bg-surface-container-high px-space-sm py-1 flex items-center justify-between text-on-surface-variant text-caption font-caption border border-white/5">
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                      Simulate Pause: instantly adds <strong>+₹44/day</strong> safe spend
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary-fixed">8% of income</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Locked Savings Goals */}
      <div className="flex flex-col space-y-space-sm pt-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Locked Savings Goals
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary font-label-caps text-label-caps border border-secondary/20">
              2 Active
            </span>
          </div>
          <span className="font-caption text-caption text-primary">₹3,300 Cumulative</span>
        </div>

        {/* Savings Card 1: Goa Trip */}
        <div className="rounded-xl bg-surface-container p-space-md space-y-space-sm shadow-md border border-white/5">
          <div className="flex items-center gap-space-sm">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                alt="Goa Beach"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1PWDX3_9F7sa8Lsa51WNoiMhGAeD7lRdbNFM-PGKeOOYqSRLStfRN0khYjKt792zwWpVYjzS9H8X1Ora-D2fZbiFl2QTKLmDLzFUp4IItK3XjA86ZxCetBgoX8WcIkE9NMXD0QkjtyMN8SPgezW4ZeCsH36hDiKLGrbk3Jjev7HZB00kuOtFITfq6D_Q-BImsJTqlTGVmWaEaH-YH-YNZHYxsnrBFJFOY3gFVqMumMbj9yBKMtyvH"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"></div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface font-bold truncate">
                  Goa Trip with College Crew
                </span>
                <span className="font-label-caps text-label-caps text-primary-container">70%</span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant">
                Auto-deposits ₹70/day every midnight
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-body-lg text-body-lg text-on-surface font-extrabold">₹2,100</span>
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  of ₹3,000 target
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-secondary-container to-primary-container h-full rounded-full transition-all duration-500"
              style={{ width: '70%' }}
            ></div>
          </div>

          <div className="rounded-DEFAULT bg-error-container/20 p-space-sm flex items-start gap-space-xs border border-error/20">
            <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">warning</span>
            <p className="font-body-sm text-body-sm text-error leading-snug">
              <strong>Daily Solvency Alert:</strong> If you spend over <strong>₹300 today</strong>, this daily ₹70 auto-deposit automatically pauses to prevent overdraft charges.
            </p>
          </div>
        </div>

        {/* Savings Card 2: Emergency Cushion */}
        <div className="rounded-xl bg-surface-container p-space-md space-y-space-sm shadow-md border border-white/5">
          <div className="flex items-center gap-space-sm">
            <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-fixed shrink-0 border border-white/5">
              <span className="material-symbols-outlined text-[28px] text-[#00f59b]">shield_with_heart</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface font-bold truncate">
                  Emergency Rainy Day Cushion
                </span>
                <span className="font-label-caps text-label-caps text-primary-fixed-dim">60%</span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant">
                Untouchable safety float for health & medicals
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-body-lg text-body-lg text-on-surface font-extrabold">₹1,200</span>
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  of ₹2,000 target
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
            <div className="bg-primary-fixed-dim h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-primary">verified_user</span>
              Protects 6.2 days of zero-spend survival
            </span>
            <button
              type="button"
              onClick={() => depositToGoal('goal-emergency', 50)}
              className="font-caption text-caption text-primary hover:underline font-semibold flex items-center gap-0.5"
            >
              Top-up ₹50
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Visual Affirmation Pill */}
      <div className="pt-space-xs pb-space-sm flex justify-center">
        <div className="inline-flex items-center gap-2 px-space-md py-2 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-white/5">
          <span className="material-symbols-outlined text-primary-fixed-dim text-[16px]">verified</span>
          <span className="font-caption text-caption text-on-surface-variant">
            Fixed burn is recalculated nightly at 00:00 IST
          </span>
        </div>
      </div>
    </div>
  );
});
