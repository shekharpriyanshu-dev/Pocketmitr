import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { PocketWiseTab, PulseTab } from '../types';

export const BottomNav: React.FC = () => {
  const {
    theme,
    activePocketWiseTab,
    setActivePocketWiseTab,
    activePulseTab,
    setActivePulseTab
  } = useBudget();

  if (theme === 'pocketwise') {
    const tabs: { id: PocketWiseTab; label: string; icon: string }[] = [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'simulator', label: 'Simulator', icon: 'tune' },
      { id: 'scenarios', label: 'Scenarios', icon: 'compare_arrows' },
      { id: 'goals-and-bills', label: 'Goals & Bills', icon: 'savings' }
    ];

    return (
      <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.3)] border-t border-white/5">
        <div className="flex justify-around items-center h-16 px-space-xs max-w-xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activePocketWiseTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePocketWiseTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
                <span className="font-label-sm text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Pulse Bottom Nav
  const pulseTabs: { id: PulseTab; label: string; icon: string }[] = [
    { id: 'simulator', label: 'Simulator', icon: 'equalizer' },
    { id: 'cash', label: 'Cash', icon: 'account_balance_wallet' },
    { id: 'subs', label: 'Subs', icon: 'event_repeat' },
    { id: 'health', label: 'Health', icon: 'ecg_heart' }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.6)] border-t border-white/5">
      <div className="flex items-center justify-around h-20 px-space-xs max-w-xl mx-auto">
        {pulseTabs.map((tab) => {
          const isActive = activePulseTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePulseTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive ? 'text-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div
                className={`w-11 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary-container/15 shadow-[0_0_20px_rgba(0,245,155,0.35)]'
                    : 'group-hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              </div>
              <span className="font-caption text-caption tracking-tight mt-0.5">{tab.label}</span>
              <span
                className={`w-1 h-1 rounded-full bg-primary-container shadow-[0_0_6px_#00f59b] transition-opacity mt-0.5 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              ></span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
