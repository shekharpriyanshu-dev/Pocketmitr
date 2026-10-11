import React, { useState, useMemo } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const DashboardScreen: React.FC = React.memo(() => {
  const {
    monthlyBudget,
    currentDay,
    cycleLength,
    availableToSpend,
    dailySafeSpendProtected,
    dailySafeSpendGross,
    healthScore,
    surplusForecast,
    setActivePocketWiseTab,
    setIsAddExpenseOpen,
    setIsAddIncomeOpen,
    setIsDocModalOpen,
    transactions
  } = useBudget();

  const [isHealthDrawerOpen, setIsHealthDrawerOpen] = useState(false);
  const [dailyMode, setDailyMode] = useState<'protected' | 'gross'>('protected');

  const daysLeft = useMemo(() => cycleLength - currentDay, [cycleLength, currentDay]);

  return (
    <div className="flex flex-col w-full px-margin pb-space-lg gap-space-lg max-w-xl mx-auto">
      {/* TOP FINANCIAL HEALTH HUD */}
      <section className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md relative overflow-hidden border border-white/5">
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-sm py-1 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-sm text-label-sm text-on-surface">Day {currentDay} of {cycleLength}</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">• {daysLeft} days left</span>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-highest px-space-sm py-1 rounded-full">
            <span className="material-symbols-outlined text-primary text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Pacing: Optimal</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            {/* Circular Micro Meter */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle
                  className="text-surface-container-highest"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4.5"
                ></circle>
                <circle
                  className="text-primary transition-all duration-700"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  stroke="currentColor"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * healthScore) / 100}
                  strokeLinecap="round"
                  strokeWidth="4.5"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-stat-numeric text-[16px] leading-tight text-on-surface font-extrabold">
                  {healthScore}
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                  Financial Health
                </h2>
                <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-label-sm font-semibold">
                  Healthy
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Low risk • 4% consistency boost
              </p>
            </div>
          </div>

          <button
            aria-label="Health breakdown"
            onClick={() => setIsHealthDrawerOpen(!isHealthDrawerOpen)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isHealthDrawerOpen
                ? 'bg-primary/20 text-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
          </button>
        </div>

        {/* Collapsible micro breakdown drawer */}
        {isHealthDrawerOpen && (
          <div className="grid grid-cols-3 gap-space-xs pt-space-xs animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-surface-container-low p-2 rounded-lg text-center border border-white/5">
              <span className="font-label-sm text-[10px] text-on-surface-variant block">Burn Rate</span>
              <span className="font-headline-sm text-[13px] text-primary font-bold">₹185/d</span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg text-center border border-white/5">
              <span className="font-label-sm text-[10px] text-on-surface-variant block">Discretionary</span>
              <span className="font-headline-sm text-[13px] text-on-surface font-bold">72%</span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg text-center border border-white/5">
              <span className="font-label-sm text-[10px] text-on-surface-variant block">Safety Buffer</span>
              <span className="font-headline-sm text-[13px] text-secondary font-bold">₹1,500</span>
            </div>
          </div>
        )}
      </section>

      {/* DYNAMIC BALANCE & ALLOWANCE CARDS */}
      <section className="flex flex-col gap-space-md">
        {/* Primary Available Card */}
        <div className="w-full bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low rounded-xl p-space-lg shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-space-sm relative z-10">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block font-semibold">
                Available to Spend
              </span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-on-surface tracking-tight">
                  ₹{availableToSpend.toLocaleString('en-IN')}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  / ₹{monthlyBudget.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
            </div>
          </div>

          {/* Quick Breakdown Chips */}
          <div className="grid grid-cols-2 gap-space-xs mt-space-md relative z-10">
            <div className="bg-surface-container-lowest/70 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] text-on-surface-variant">Spent</span>
                <span className="font-headline-sm text-[13px] text-on-surface font-semibold truncate">
                  ₹1,480
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest/70 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] text-on-surface-variant">Reserved Bills</span>
                <span className="font-headline-sm text-[13px] text-on-surface font-semibold truncate">
                  ₹1,200
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest/70 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-tertiary"></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] text-on-surface-variant">Emergency Fund</span>
                <span className="font-headline-sm text-[13px] text-on-surface font-semibold truncate">
                  ₹1,500
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest/70 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] text-on-surface-variant">Target Savings</span>
                <span className="font-headline-sm text-[13px] text-on-surface font-semibold truncate">
                  ₹2,000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Daily Spending Allowance Widget */}
        <div className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-white/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[18px]">speed</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Daily Safe Spend</h3>
                <p className="font-label-sm text-[11px] text-on-surface-variant">Dynamic allocation model</p>
              </div>
            </div>

            {/* Mode Toggle Pill */}
            <div className="flex items-center bg-surface-container-lowest p-0.5 rounded-full border border-white/5">
              <button
                onClick={() => setDailyMode('protected')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-label-sm font-semibold transition-all ${
                  dailyMode === 'protected'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Protected
              </button>
              <button
                onClick={() => setDailyMode('gross')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-label-sm font-semibold transition-all ${
                  dailyMode === 'gross'
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Gross
              </button>
            </div>
          </div>

          <div className="flex items-baseline justify-between bg-surface-container-low p-space-md rounded-lg border border-white/5">
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`font-stat-numeric text-stat-numeric font-extrabold tracking-tight ${dailyMode === 'protected' ? 'text-primary' : 'text-secondary'}`}>
                  ₹{dailyMode === 'protected' ? dailySafeSpendProtected : dailySafeSpendGross}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ day</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5 block">
                {dailyMode === 'protected'
                  ? `Formula: ₹5,320 uncommitted ÷ ${daysLeft} days`
                  : `Formula: ₹${availableToSpend.toLocaleString()} available balance ÷ ${daysLeft} days`}
              </span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-label-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[12px]">verified_user</span>
                ₹2,000 Shielded
              </span>
            </div>
          </div>

          {/* Educational Tooltip Note */}
          <div className="flex items-start gap-2 bg-surface-container-highest/60 p-2.5 rounded-lg border border-white/5">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
              lightbulb
            </span>
            <p className="font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
              <strong className="text-on-surface font-semibold">Smart Cushion:</strong> PocketWise protects your ₹2,000 savings goal from being diluted. Gross spending (
              <span className="text-on-surface font-semibold">₹332/day</span>) treats your future savings as expendable cash.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CATEGORY SPENDING BREAKDOWN */}
      <section className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-secondary-container/20 rounded-lg text-secondary">
              <span className="material-symbols-outlined text-[18px]">pie_chart</span>
            </div>
            <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Category Velocity</h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Total Spent: ₹1,480
          </span>
        </div>

        {/* Pacing Bar Indicator */}
        <div>
          <div className="flex justify-between text-[11px] font-label-sm mb-1.5">
            <span className="text-on-surface-variant">Spent (14.8%)</span>
            <span className="text-primary font-semibold">Projected Target: Day 8 Pacing (26.6%)</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden flex">
            <div className="bg-primary h-full" style={{ width: '44%' }}></div>
            <div className="bg-secondary h-full" style={{ width: '22%' }}></div>
            <div className="bg-tertiary h-full" style={{ width: '18%' }}></div>
            <div className="bg-surface-bright h-full" style={{ width: '16%' }}></div>
          </div>
        </div>

        {/* Category Pills Grid */}
        <div className="grid grid-cols-2 gap-space-xs">
          {/* Food */}
          <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
              </div>
              <div className="truncate">
                <span className="font-label-md text-label-md text-on-surface block truncate">Food</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">44% of spend</span>
              </div>
            </div>
            <span className="font-headline-sm text-[13px] font-bold text-on-surface ml-1 shrink-0">₹650</span>
          </div>

          {/* Transportation */}
          <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[16px]">directions_subway</span>
              </div>
              <div className="truncate">
                <span className="font-label-md text-label-md text-on-surface block truncate">Transit</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">22% of spend</span>
              </div>
            </div>
            <span className="font-headline-sm text-[13px] font-bold text-on-surface ml-1 shrink-0">₹320</span>
          </div>

          {/* Entertainment */}
          <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[16px]">sports_esports</span>
              </div>
              <div className="truncate">
                <span className="font-label-md text-label-md text-on-surface block truncate">Hangouts</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">18% of spend</span>
              </div>
            </div>
            <span className="font-headline-sm text-[13px] font-bold text-on-surface ml-1 shrink-0">₹260</span>
          </div>

          {/* Education */}
          <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-surface-bright flex items-center justify-center text-on-surface shrink-0">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </div>
              <div className="truncate">
                <span className="font-label-md text-label-md text-on-surface block truncate">Books</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">16% of spend</span>
              </div>
            </div>
            <span className="font-headline-sm text-[13px] font-bold text-on-surface ml-1 shrink-0">₹250</span>
          </div>
        </div>
      </section>

      {/* 30-DAY FINANCIAL TIMELINE & FORECAST */}
      <section className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
            </div>
            <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">30-Day Trajectory</h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            +₹{surplusForecast.toLocaleString('en-IN')} Surplus Forecast
          </span>
        </div>

        {/* Timeline Horizontal Slider / Ribbon */}
        <div className="relative bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-md border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-label-sm text-on-surface-variant">
            <span>Day 1</span>
            <span className="text-primary font-semibold">Today (Day {currentDay})</span>
            <span>Day {cycleLength}</span>
          </div>

          {/* Visual Stage Path */}
          <div className="relative w-full h-1.5 bg-surface-container-highest rounded-full flex items-center">
            {/* Past Progress */}
            <div className="h-full bg-primary rounded-full" style={{ width: `${(currentDay / cycleLength) * 100}%` }}></div>
            {/* Day 8 Node */}
            <div
              className="absolute w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface shadow-md"
              style={{ left: `${(currentDay / cycleLength) * 100}%`, transform: 'translateX(-50%)' }}
            ></div>
            {/* Day 12 Pin */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface"
              style={{ left: '40%', transform: 'translateX(-50%)' }}
              title="Day 12: Hostel Wifi"
            ></div>
            {/* Day 18 Pin */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-tertiary ring-2 ring-surface"
              style={{ left: '60%', transform: 'translateX(-50%)' }}
              title="Day 18: Spotify"
            ></div>
          </div>

          {/* Up Next Scheduled Commitments */}
          <div className="flex flex-col gap-space-xs mt-1">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Upcoming Auto-Deductions
            </span>
            <div className="flex items-center justify-between bg-surface-container p-2 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-label-sm text-[10px] shrink-0 font-bold">
                  Day 12
                </span>
                <span className="font-body-sm text-body-sm text-on-surface truncate">
                  Hostel Wifi & Cell Pack
                </span>
              </div>
              <span className="font-headline-sm text-[13px] text-secondary font-bold shrink-0">₹700</span>
            </div>

            <div className="flex items-center justify-between bg-surface-container p-2 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-label-sm text-[10px] shrink-0 font-bold">
                  Day 18
                </span>
                <span className="font-body-sm text-body-sm text-on-surface truncate">
                  Spotify + Student Cloud
                </span>
              </div>
              <span className="font-headline-sm text-[13px] text-tertiary font-bold shrink-0">₹500</span>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT TRANSACTIONS & ACTIVITY */}
      <section className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-surface-container-high rounded-lg text-on-surface">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Recent Flow</h3>
          </div>
          <button
            onClick={() => setActivePocketWiseTab('simulator')}
            className="font-label-sm text-label-sm text-primary hover:underline font-semibold"
          >
            Simulate Spend
          </button>
        </div>

        <div className="flex flex-col gap-space-xs">
          {transactions.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors border border-white/5"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="truncate">
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface truncate">
                    {item.title}
                  </h4>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    {item.category} • {item.timeAgo}
                  </span>
                </div>
              </div>
              <span className={`font-headline-sm text-[14px] font-bold shrink-0 ${item.amount < 0 ? 'text-primary' : 'text-on-surface'}`}>
                {item.amount < 0 ? `+₹${Math.abs(item.amount)}` : `-₹${item.amount}`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACTION DECK & SIMULATOR LAUNCHER */}
      <section className="flex flex-col gap-space-sm">
        {/* Highlight Feature Banner */}
        <button
          onClick={() => setActivePocketWiseTab('simulator')}
          className="w-full text-left bg-gradient-to-r from-primary-container via-surface-container-high to-surface-container p-space-md rounded-xl shadow-lg flex items-center justify-between active:scale-[0.98] transition-all border border-primary/20"
        >
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-md">
              <span className="material-symbols-outlined text-[22px]">auto_fix_high</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                  Simulate Next Purchase
                </span>
                <span className="bg-primary/20 text-primary font-label-sm text-[10px] px-1.5 rounded font-bold">
                  Gen Z Mode
                </span>
              </div>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Test impact on daily allowance before you swipe
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary text-[22px]">chevron_right</span>
        </button>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-space-sm">
          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="w-full py-3 px-space-md rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 active:bg-surface-container-highest transition-colors border border-white/5 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">add_circle</span>
            <span>Add Expense</span>
          </button>
          <button
            onClick={() => setIsAddIncomeOpen(true)}
            className="w-full py-3 px-space-md rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 active:bg-surface-container-highest transition-colors border border-white/5 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">payments</span>
            <span>Add Income</span>
          </button>
        </div>

        {/* Documentation Engine Instant Access */}
        <button
          onClick={() => setIsDocModalOpen(true)}
          className="w-full py-2.5 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-white font-label-sm text-xs flex items-center justify-center gap-2 transition-colors border border-white/5 font-medium"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">description</span>
          <span>Generate Financial Health Statement & Audit Docs</span>
        </button>
      </section>
    </div>
  );
});
