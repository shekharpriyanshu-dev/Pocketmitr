import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const AddIncomeModal: React.FC = () => {
  const { isAddIncomeOpen, setIsAddIncomeOpen, addTransaction, setMonthlyBudget, monthlyBudget } = useBudget();
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  if (!isAddIncomeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!source || isNaN(parsedAmount) || parsedAmount <= 0) return;

    addTransaction({
      title: source,
      amount: -parsedAmount, // Negative represents inflow
      category: 'Income',
      timeAgo: 'Just now',
      icon: 'payments',
      impactPct: parseFloat(((parsedAmount / 10000) * 100).toFixed(1)),
      paymentMethod: 'Bank Transfer'
    });

    setMonthlyBudget(monthlyBudget + parsedAmount);
    setSource('');
    setAmount('');
    setIsAddIncomeOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-end sm:items-center justify-center p-margin animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-surface-container p-space-lg shadow-2xl flex flex-col gap-space-md border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Add Income</h3>
          </div>
          <button
            onClick={() => setIsAddIncomeOpen(false)}
            className="text-on-surface-variant hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Income Source</label>
            <input
              type="text"
              placeholder="e.g. Freelance Gig, Monthly Allowance, Cashback..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary border border-white/5"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary border border-white/5"
              required
              min="1"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-bold shadow-md transition-transform active:scale-95"
            >
              Credit to Allowance
            </button>
            <button
              type="button"
              onClick={() => setIsAddIncomeOpen(false)}
              className="w-full h-10 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors border border-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
