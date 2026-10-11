import React, { useState, useMemo } from 'react';
import { useBudget } from '../../context/BudgetContext';

const baseFoodCap = 2500;
const baseFoodSpent = 1450;
const baseSocialCap = 1800;
const baseSocialSpent = 1100;

export const PulseCashScreen: React.FC = React.memo(() => {
  const {
    transactions,
    setIsAddExpenseOpen,
    showToast,
    budgetBuckets,
    rebalanceBuckets
  } = useBudget();

  const [shiftVal, setShiftVal] = useState<number>(0);
  const [feedbackApplied, setFeedbackApplied] = useState(false);

  const { currentFoodCap, currentSocialCap, foodPercent, socialPercent } = useMemo(() => {
    const foodCap = baseFoodCap + shiftVal;
    const socialCap = baseSocialCap - shiftVal;
    const foodPct = Math.min(100, Math.round((baseFoodSpent / foodCap) * 100));
    const socialPct = Math.min(100, Math.round((baseSocialSpent / socialCap) * 100));
    return {
      currentFoodCap: foodCap,
      currentSocialCap: socialCap,
      foodPercent: foodPct,
      socialPercent: socialPct
    };
  }, [shiftVal]);

  const handleApplyShift = () => {
    if (shiftVal > 0) {
      rebalanceBuckets('b-social', 'b-food', shiftVal);
      setFeedbackApplied(true);
    } else {
      showToast('Select a shift amount on the slider first.');
    }
  };

  return (
    <div className="flex flex-col w-full px-margin space-y-space-lg pb-space-xl max-w-xl mx-auto">
      {/* Telemetry Header */}
      <div className="relative overflow-hidden rounded-lg bg-surface-container-low p-space-md shadow-xl border border-white/5">
        <div className="absolute -top-16 -right-12 w-44 h-44 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-12 w-40 h-40 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_8px_#00f59b]"></span>
              Liquid Liquidity
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-telemetry-val text-headline-sm text-primary-container">₹</span>
              <span className="font-display-hero-mobile text-display-hero-mobile font-extrabold text-on-surface tracking-tight">
                4,000
              </span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">
              Truly free to spend over the next 18 days
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary-fixed-dim font-label-caps text-label-caps uppercase tracking-wider border border-white/5">
              Cap ₹10,000
            </span>
            <span className="font-caption text-caption text-on-surface-variant/70 mt-1">Day 12 / 30</span>
          </div>
        </div>

        {/* Triple Tier Breakdown Bar */}
        <div className="mt-space-md space-y-1.5 relative z-10">
          <div className="h-3 w-full rounded-full bg-surface-container-highest overflow-hidden flex p-0.5 gap-0.5">
            <div className="h-full rounded-full bg-error transition-all duration-500" style={{ width: '38.2%' }} title="Spent: ₹3,820"></div>
            <div className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: '21.8%' }} title="Committed: ₹2,180"></div>
            <div className="h-full rounded-full bg-primary-container transition-all duration-500" style={{ width: '40.0%' }} title="Free Cash: ₹4,000"></div>
          </div>
          <div className="flex justify-between items-center font-caption text-caption text-on-surface-variant pt-1 px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span>Spent ₹3,820</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Locked ₹2,180</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_6px_#00f59b]"></span>
              <span className="font-medium text-[#00f59b]">Free ₹4,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safe Daily Velocity Metric Card */}
      <div className="relative overflow-hidden rounded-lg bg-surface-container p-space-md shadow-lg border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-container/15 flex items-center justify-center text-primary-container shadow-[0_0_16px_rgba(0,245,155,0.2)]">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Daily Velocity Horizon
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">₹222</span>
                <span className="font-caption text-caption text-on-surface-variant">/ day safe target</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container/20 text-primary-container border border-primary-container/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-caps text-label-caps uppercase font-bold">+₹137 Buffer</span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant mt-1">₹85 spent today</p>
          </div>
        </div>

        {/* Mini Daily Spark-Gauge */}
        <div className="mt-space-md pt-space-sm bg-surface-container-high/40 rounded-DEFAULT p-space-sm flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span className="font-body-sm text-body-sm text-on-surface">Safe-Burn Trajectory on pace</span>
          </div>
          <span className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-wider font-bold">
            38% Used
          </span>
        </div>
      </div>

      {/* Section: Category Fuel Tanks */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Budget Buckets</h2>
          <span className="font-caption text-caption text-on-surface-variant">4 Active • 1 Reserve</span>
        </div>

        <div className="space-y-space-xs">
          {/* Bucket 1: Food & Swiggy */}
          <div className="rounded-DEFAULT bg-surface-container p-space-md shadow-md border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">ramen_dining</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">Food & Delivery</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-primary-container/15 text-primary text-[10px] font-semibold tracking-wide border border-primary/20">
                      Pace OK
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Swiggy, Zomato, Campus Canteen
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-telemetry-val text-body-lg font-bold text-on-surface">
                  ₹{baseFoodSpent.toLocaleString('en-IN')}
                </span>
                <span className="font-caption text-caption text-on-surface-variant block">
                  / ₹{currentFoodCap.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-container transition-all duration-300"
                  style={{ width: `${foodPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center font-caption text-caption text-on-surface-variant mt-1.5">
                <span>{foodPercent}% consumed</span>
                <span className="text-on-surface">₹{(currentFoodCap - baseFoodSpent).toLocaleString('en-IN')} left</span>
              </div>
            </div>
          </div>

          {/* Bucket 2: Daily Transit */}
          <div className="rounded-DEFAULT bg-surface-container p-space-md shadow-md border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">directions_subway</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">Metro & Auto</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-semibold">
                      Steady
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Metro SmartCard, Rapido, Uber
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-telemetry-val text-body-lg font-bold text-on-surface">₹620</span>
                <span className="font-caption text-caption text-on-surface-variant block">/ ₹1,200</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                <div className="h-full rounded-full bg-secondary-fixed-dim transition-all duration-300" style={{ width: '51.6%' }}></div>
              </div>
              <div className="flex justify-between items-center font-caption text-caption text-on-surface-variant mt-1.5">
                <span>51% consumed</span>
                <span className="text-on-surface">₹580 left</span>
              </div>
            </div>
          </div>

          {/* Bucket 3: Social & Weekend Outings */}
          <div className="rounded-DEFAULT bg-surface-container p-space-md shadow-md border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined text-[20px]">nightlife</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">Social & Weekend</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary-fixed-dim text-[10px] font-semibold tracking-wide">
                      Caution
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">Cafes, Movies, Weekend hangs</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-telemetry-val text-body-lg font-bold text-on-surface">
                  ₹{baseSocialSpent.toLocaleString('en-IN')}
                </span>
                <span className="font-caption text-caption text-on-surface-variant block">
                  / ₹{currentSocialCap.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className="h-full rounded-full bg-tertiary-fixed-dim transition-all duration-300"
                  style={{ width: `${socialPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center font-caption text-caption text-on-surface-variant mt-1.5">
                <span>{socialPercent}% consumed</span>
                <span className="text-tertiary-fixed-dim font-medium">₹{(currentSocialCap - baseSocialSpent).toLocaleString('en-IN')} left</span>
              </div>
            </div>
          </div>

          {/* Bucket 4: Shopping & Impulse */}
          <div className="rounded-DEFAULT bg-surface-container p-space-md shadow-md border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">Shopping & Impulse</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-semibold">
                      Tightly Capped
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Blinkit snax, Thrift, Tech accessories
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-telemetry-val text-body-lg font-bold text-on-surface">₹450</span>
                <span className="font-caption text-caption text-on-surface-variant block">/ ₹800</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: '56.2%' }}></div>
              </div>
              <div className="flex justify-between items-center font-caption text-caption text-on-surface-variant mt-1.5">
                <span>56% consumed</span>
                <span className="text-on-surface">₹350 left</span>
              </div>
            </div>
          </div>

          {/* Bucket 5: Emergency Untouchable Reserve */}
          <div className="rounded-DEFAULT bg-surface-container-high/60 p-space-md flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">Emergency Buffer</span>
                  <span className="font-caption text-caption uppercase text-outline">Untouchable</span>
                </div>
                <span className="font-caption text-caption text-on-surface-variant">
                  Locked reserve for month-end shockwaves
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-telemetry-val text-body-md font-bold text-on-surface">₹700</span>
              <span className="font-caption text-caption text-primary block">100% Intact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Story */}
      <div className="rounded-lg bg-surface-container p-space-md shadow-lg space-y-space-sm border border-white/5">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
            Burn Reality Check
          </span>
          <span className="font-caption text-caption text-primary">₹10k Micro-Flow</span>
        </div>
        <div className="relative h-28 w-full rounded-DEFAULT overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Burn Reality Check"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYcrLufBSZsKSF88q0vBFGJg_YWUdU2kixoudDYfBJXFMMnttURxOPk-7YCNJqKBGVlUdINN6vjHmSyr_1eNGnQ-noQSODwpIAf2kbkSBa_bn6nus5j4tS6my332VoRfC-UJk6Fobik3XF8zLWYOkVwXU8eDfV4RDXGk_5AiUM9KC7jZWU4I1xt519IQfMrFC7Ywax6U4Nuf_dV8kgTsZ-E8nE37eIR7VLEeY9vmAMGrUk4oBPcX7S"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent flex items-end p-space-sm">
            <p className="font-caption text-caption text-on-surface leading-tight font-medium">
              "Weekend social pacing is running high. Smart rebalancing prevents mid-month overdrafts."
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Feature: Smart Rebalancer */}
      <div className="rounded-lg bg-surface-container-high p-space-md shadow-xl space-y-space-md relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary-fixed mb-1 border border-secondary/20">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span className="font-label-caps text-label-caps uppercase font-bold">Smart Rebalance Engine</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Zero-Ceiling Rebalancer</h3>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">
              Overspent on food? Reallocate from Social Outings without breaching your ₹10,000 monthly ceiling.
            </p>
          </div>
        </div>

        {/* Rebalance Shift Control */}
        <div className="bg-surface-container-lowest/80 rounded-DEFAULT p-space-sm space-y-3 relative z-10 border border-white/5">
          <div className="flex items-center justify-between text-body-sm font-medium">
            <div className="flex items-center gap-1.5 text-tertiary-fixed-dim">
              <span className="material-symbols-outlined text-[16px]">remove_circle_outline</span>
              <span>Social Outings</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">trending_flat</span>
            <div className="flex items-center gap-1.5 text-primary-container">
              <span>Food & Swiggy</span>
              <span className="material-symbols-outlined text-[16px]">add_circle_outline</span>
            </div>
          </div>

          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max="600"
              step="50"
              value={shiftVal}
              onChange={(e) => {
                setShiftVal(Number(e.target.value));
                setFeedbackApplied(false);
              }}
              className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary-container"
            />
            <div className="flex justify-between font-caption text-caption text-on-surface-variant/70">
              <span>₹0 shift</span>
              <span className="text-primary-container font-semibold">Shift: ₹{shiftVal}</span>
              <span>₹600 max</span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setShiftVal(300);
                setFeedbackApplied(false);
              }}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-on-surface font-caption text-caption flex items-center gap-1.5 transition-all border border-white/5"
            >
              <span className="material-symbols-outlined text-[14px] text-primary">auto_fix_high</span>
              <span>Auto-Recommend: Shift ₹300</span>
            </button>
            <button
              type="button"
              onClick={handleApplyShift}
              className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary-fixed font-caption text-caption font-bold shadow-[0_0_12px_rgba(0,245,155,0.3)] transition-all active:scale-95"
            >
              Apply Balance
            </button>
          </div>
        </div>

        {feedbackApplied && (
          <div className="p-2.5 rounded-DEFAULT bg-primary-container/10 flex items-center gap-2 border border-primary-container/20 animate-in fade-in">
            <span className="material-symbols-outlined text-primary-container text-[18px]">task_alt</span>
            <span className="font-caption text-caption text-primary">
              Shifted ₹{shiftVal} from Social to Food. Total ceiling remains locked at ₹10,000.
            </span>
          </div>
        )}
      </div>

      {/* Micro-Transactions Timeline */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Micro-Spends Activity</h3>
          <span className="font-caption text-caption text-on-surface-variant">Last 48 Hours</span>
        </div>

        <div className="space-y-space-xs">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="rounded-DEFAULT bg-surface-container p-space-sm flex items-center justify-between shadow-sm border border-white/5 hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-primary-container border border-primary-container/20">
                  <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface truncate">
                    {tx.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      {tx.timeAgo}
                    </span>
                    <span className="text-outline text-[10px]">•</span>
                    <span className="font-caption text-caption text-primary bg-primary-container/10 px-1.5 py-0.2 rounded-full border border-primary/20">
                      {tx.impactPct || 1.2}% budget impact
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <span className={`font-telemetry-val text-body-md font-bold ${tx.amount < 0 ? 'text-[#00f59b]' : 'text-on-surface'}`}>
                  {tx.amount < 0 ? `+₹${Math.abs(tx.amount)}` : `-₹${tx.amount}`}
                </span>
                <span className="font-caption text-caption text-on-surface-variant block">
                  {tx.paymentMethod || 'UPI Auto'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Kinetic Action Pill */}
      <div className="pt-2">
        <button
          onClick={() => setIsAddExpenseOpen(true)}
          className="w-full h-[52px] rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,155,0.35)] active:scale-95 transition-all text-[#002111]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Log Micro-Expense</span>
        </button>
      </div>
    </div>
  );
});
