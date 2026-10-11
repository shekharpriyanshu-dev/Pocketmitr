import React from 'react';
import { useBudget } from '../context/BudgetContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useBudget();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 inset-x-6 z-50 flex items-center justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="px-4 py-2.5 rounded-full bg-primary text-on-primary shadow-2xl flex items-center gap-2 font-label-md text-label-md font-bold max-w-sm text-center border border-white/10">
        <span className="material-symbols-outlined text-[18px]">check_circle</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
