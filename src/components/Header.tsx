import React from 'react';
import { useBudget } from '../context/BudgetContext';

export const Header: React.FC = React.memo(() => {
  const {
    theme,
    setTheme,
    monthlyBudget,
    currentDay,
    cycleLength,
    activePocketWiseTab,
    setActivePocketWiseTab,
    activePulseTab,
    setActivePulseTab,
    setIsDocModalOpen,
    showToast
  } = useBudget();

  const pocketWiseLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1V7n4G58P2o2nXX1TfFKNveMz9WZf5A7M7EEEhXLzMSZnAHbeGFSRlohDAYHr0qe9AGpJnswrEbC6tRhyq9vIG2Df-QFkF10uTV_aDR54sPvT5iQmwwPXnu_MWp1xw1f3ixpOtv5u7CYwqbZ-yBqUQQ9fd8YAVf8M3l3tzgAypLLi-EerUPaD8JJAPMMvLJnU1W7AFSvYbYd6_Gv_wPThhjjRpRXW8GyeWVj4ys9Aat3BdhDPRG4CZbsX4';

  const pulseLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1U28Adt4dCs2iAJJkNiyL-BMRioZRuMAfzOAplfZ3UKLhI5cWS7ufOxyl-gG5vNE-_V83PxlgPaeEFb7UH_5ancDPM7pIrve0_wCKKzyi_h40tCmXJc_rqZXqZLQxkW-ECtGz0lVgekEgcOst88RWPdFBjR3NZt9RPDJs015cI-SvWw7nOuhdoq4LlMnl1wdrVcT9zMtpmTDBy4Xox_G0Et7SJmbBzKHW5GnjQQx1VYvTjpm77hLdMDzPg';

  const profileAvatarPocketWise =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnS-esHzOdN2h87Fnax6rop89CLXScKywdml4z9jJLtM2AtiorvYh60qstsKO_f2D1oZUPB6LGoKv3_uWieYqvQiJigN2rJEidYPkqbPh3TTBSNW3AUYMgz5Sa4mtW87G6CpdE3EDeTOvYz_4_ECUkA61939xTtkKdcruKo1hVG9tdP7ZRAY7j-iuDt5TefCx86xsKSe5xdbWuDX3qlLNNvX5HRkYlGJ0HOKsVCRvOMOBudi2-qmTW';

  const profileAvatarPulse =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB4KKV7MddVJmtDINVmlh8iErBQ5CITR-8bq3vJwiaqR3bmfpIC3wDXICjrzgVKJpLQq4xtqlLpG1FpDkBxMgWde11DOwroykZS020Ylw14_DluO0s8RqFNnYfTkKkfy5D49j7R5J8-TWy4rfk-ng-im1eHo4RQPjlO1oK7TpTqGLMbmQMuqlyXkAg8HqcsziIOahP2jRIqsffo_unmYDSoA1aYf4qpWHWNuEbTn4CLhcj7CuwNKHy4';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-colors duration-300">
      {/* Top Phone Status Bar */}
      <div className="pt-safe">
        <div className="flex justify-between items-center px-margin pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
          <span className="font-semibold tracking-tight text-on-surface">9:41</span>
          
          {/* Quick Theme Switcher Pill in Top Bar */}
          <div className="flex items-center gap-1 bg-surface-container-highest/80 px-2 py-0.5 rounded-full border border-white/5">
            <button
              onClick={() => setTheme('pocketwise')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                theme === 'pocketwise'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Switch to PocketWise (Midnight Neo-Fintech)"
            >
              PocketWise
            </button>
            <button
              onClick={() => setTheme('pulse')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                theme === 'pulse'
                  ? 'bg-[#00f59b] text-[#002111] shadow-[0_0_8px_rgba(0,245,155,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Switch to Pulse (Obsidian Kinetic Fintech)"
            >
              Pulse
            </button>
          </div>

          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
            <span className="font-bold text-[10px] tracking-wider">5G</span>
            <span className="material-symbols-outlined text-[17px]">battery_charging_full</span>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="h-16 px-margin flex items-center justify-between">
        {theme === 'pocketwise' ? (
          /* PocketWise Header Variant */
          <div className="flex items-center gap-space-sm">
            <img
              alt="PocketWise Logo"
              className="h-8 w-auto object-contain cursor-pointer"
              src={pocketWiseLogoUrl}
              onClick={() => setActivePocketWiseTab('dashboard')}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                  PocketWise
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] tracking-wide border border-primary/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  ₹{monthlyBudget.toLocaleString('en-IN')} Budget • Day {currentDay} of {cycleLength}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Pulse Header Variant */
          <div className="flex items-center gap-space-xs">
            <img
              alt="Pulse Finance Logo"
              className="h-8 w-auto object-contain cursor-pointer"
              src={pulseLogoUrl}
              onClick={() => setActivePulseTab('simulator')}
            />
            <div className="flex flex-col pl-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-none tracking-tight">
                Pulse
              </span>
              <span className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-wider scale-90 origin-left mt-0.5">
                {activePulseTab === 'simulator' && 'Simulator & Flow'}
                {activePulseTab === 'cash' && 'Cash & Budget'}
                {activePulseTab === 'subs' && 'Commitments & Subs'}
                {activePulseTab === 'health' && 'Risk & Health'}
              </span>
            </div>
          </div>
        )}

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Documentation & Audit Engine Trigger Button */}
          <button
            onClick={() => setIsDocModalOpen(true)}
            aria-label="Documentation and Financial Audit"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-white/10 text-xs font-semibold text-primary transition-all active:scale-95"
            title="Open Documentation & Financial Audit Engine"
          >
            <span className="material-symbols-outlined text-[17px]">description</span>
            <span className="hidden sm:inline">Docs & Audit</span>
          </button>

          {theme === 'pulse' && (
            <>
              <div className="hidden xs:flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high/90 text-primary shadow-[0_0_12px_rgba(0,245,155,0.15)]">
                <span className="text-xs leading-none">🔥</span>
                <span className="font-label-caps text-label-caps text-primary tracking-tight whitespace-nowrap">
                  Day 12 of 30 • 18d left
                </span>
              </div>
              <button
                aria-label="Notifications"
                className="relative w-9 h-9 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
                type="button"
                onClick={() => showToast('Daily safe burn rate is protected at ₹241/day.')}
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#00f59b]"></span>
              </button>
            </>
          )}

          {/* Profile Avatar with status ring */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => {
                if (theme === 'pocketwise') {
                  setActivePocketWiseTab('goals-and-bills');
                } else {
                  setActivePulseTab('health');
                }
              }}
              className="relative block rounded-full focus:outline-none"
              title="View Profile & Settings"
            >
              <img
                alt="Profile"
                className={`w-8 h-8 rounded-full object-cover transition-all ${
                  theme === 'pocketwise'
                    ? 'ring-1 ring-primary/40'
                    : 'ring-2 ring-primary-container/40 hover:ring-primary'
                }`}
                src={theme === 'pocketwise' ? profileAvatarPocketWise : profileAvatarPulse}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});
