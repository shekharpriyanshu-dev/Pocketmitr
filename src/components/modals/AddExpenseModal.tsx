import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

export const AddExpenseModal: React.FC = () => {
  const { isAddExpenseOpen, setIsAddExpenseOpen, addTransaction } = useBudget();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'Food' | 'Transport' | 'Social' | 'Education' | 'Shopping'>('Food');

  if (!isAddExpenseOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const iconMap = {
      Food: 'lunch_dining',
      Transport: 'directions_subway',
      Social: 'local_cafe',
      Education: 'menu_book',
      Shopping: 'shopping_bag'
    };

    addTransaction({
      title,
      amount: parsedAmount,
      category,
      timeAgo: 'Just now',
      icon: iconMap[category],
      impactPct: parseFloat(((parsedAmount / 10000) * 100).toFixed(1)),
      paymentMethod: 'UPI'
    });

    setTitle('');
    setAmount('');
    setIsAddExpenseOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-end sm:items-center justify-center p-margin animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-surface-container p-space-lg shadow-2xl flex flex-col gap-space-md border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-error/15 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Add Expense</h3>
          </div>
          <button
            onClick={() => setIsAddExpenseOpen(false)}
            className="text-on-surface-variant hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Description</label>
            <input
              type="text"
              placeholder="e.g. Swiggy Lunch, Metro recharge..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-white/5"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 150"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-white/5"
              required
              min="1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Category</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Food', 'Transport', 'Social', 'Education', 'Shopping'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-high text-on-surface border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md transition-transform active:scale-95"
            >
              Record Outflow
            </button>
            <button
              type="button"
              onClick={() => setIsAddExpenseOpen(false)}
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
