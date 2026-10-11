import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppTheme, PocketWiseTab, PulseTab, Transaction, SubscriptionItem, GoalItem, BudgetBucket } from '../types';

interface BudgetContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  activePocketWiseTab: PocketWiseTab;
  setActivePocketWiseTab: (tab: PocketWiseTab) => void;
  activePulseTab: PulseTab;
  setActivePulseTab: (tab: PulseTab) => void;

  // Global Financial Model State
  monthlyBudget: number;
  setMonthlyBudget: (val: number) => void;
  cycleLength: number;
  setCycleLength: (days: number) => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  
  // Balances
  spentTotal: number;
  reservedBillsTotal: number;
  emergencyFundTotal: number;
  targetSavingsTotal: number;
  availableToSpend: number;

  // Daily Allowance
  dailySafeSpendProtected: number;
  dailySafeSpendGross: number;
  healthScore: number;
  surplusForecast: number;

  // Subscriptions & Cull Engine
  subscriptions: SubscriptionItem[];
  toggleSubscription: (id: string) => void;
  culledMonthlyTotal: number;
  culledDailyBoost: number;

  // Goals
  goals: GoalItem[];
  depositToGoal: (goalId: string, amount: number) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;

  // Budget Buckets & Rebalancer
  budgetBuckets: BudgetBucket[];
  rebalanceBuckets: (fromId: string, toId: string, amount: number) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Modals
  isAddExpenseOpen: boolean;
  setIsAddExpenseOpen: (open: boolean) => void;
  isAddIncomeOpen: boolean;
  setIsAddIncomeOpen: (open: boolean) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>('pocketwise');
  const [activePocketWiseTab, setActivePocketWiseTab] = useState<PocketWiseTab>('dashboard');
  const [activePulseTab, setActivePulseTab] = useState<PulseTab>('simulator');

  const [monthlyBudget, setMonthlyBudget] = useState<number>(10000);
  const [cycleLength, setCycleLength] = useState<number>(30);
  const [currentDay, setCurrentDay] = useState<number>(8);

  const [emergencyFundTotal, setEmergencyFundTotal] = useState<number>(1000);
  const [semesterGoalTotal, setSemesterGoalTotal] = useState<number>(800);
  const [goaGoalTotal, setGoaGoalTotal] = useState<number>(1850);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([
    {
      id: 'sub-wifi',
      name: 'Roommate WiFi Split',
      cost: 450,
      dueDay: 15,
      category: 'Utilities',
      isFixed: true,
      isActive: true,
      dailyEquivalent: 20,
      icon: 'router',
      note: 'Non-negotiable necessity'
    },
    {
      id: 'sub-spotify',
      name: 'Spotify Student Plan',
      cost: 59,
      dueDay: 15,
      category: 'Entertainment',
      isFixed: false,
      isActive: true,
      dailyEquivalent: 3,
      icon: 'headphones',
      note: 'Recurring via UPI AutoPay'
    },
    {
      id: 'sub-gym',
      name: 'Cult.fit Gym Access',
      cost: 799,
      dueDay: 18,
      category: 'Fitness',
      isFixed: false,
      isActive: true,
      dailyEquivalent: 44,
      icon: 'fitness_center',
      note: 'Heaviest discretionary burden'
    },
    {
      id: 'sub-netflix',
      name: 'Netflix Mobile Plan',
      cost: 149,
      dueDay: 22,
      category: 'Entertainment',
      isFixed: false,
      isActive: true,
      dailyEquivalent: 8,
      icon: 'movie',
      note: '480p Single Device'
    },
    {
      id: 'sub-cloud',
      name: 'Cloud Storage & Notion AI',
      cost: 199,
      dueDay: 25,
      category: 'Tech',
      isFixed: false,
      isActive: true,
      dailyEquivalent: 11,
      icon: 'cloud_sync',
      note: 'Academic & Workspace'
    },
    {
      id: 'sub-airtel',
      name: 'Airtel 84-Day Pack',
      cost: 524,
      dueDay: 1,
      category: 'Cellular',
      isFixed: true,
      isActive: true,
      dailyEquivalent: 17,
      icon: 'cell_tower',
      note: 'Paid on Day 1 • Amortized ₹524/mo'
    }
  ]);

  const toggleSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === id && !sub.isFixed) {
          const updatedState = !sub.isActive;
          showToast(updatedState ? `Re-enabled ${sub.name}` : `Paused ${sub.name}: +₹${sub.dailyEquivalent}/day freed!`);
          return { ...sub, isActive: updatedState };
        }
        return sub;
      })
    );
  };

  const culledMonthlyTotal = subscriptions
    .filter((s) => !s.isActive && !s.isFixed)
    .reduce((acc, s) => acc + s.cost, 0);

  const culledDailyBoost = subscriptions
    .filter((s) => !s.isActive && !s.isFixed)
    .reduce((acc, s) => acc + s.dailyEquivalent, 0);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-1',
      title: 'Tapri Chai & Samosa',
      category: 'Food',
      amount: 140,
      timeAgo: 'Today, 4:20 PM',
      icon: 'coffee',
      impactPct: 1.4,
      paymentMethod: 'UPI Auto'
    },
    {
      id: 'tx-2',
      title: 'Rapido Metro Connector',
      category: 'Transport',
      amount: 65,
      timeAgo: 'Today, 9:15 AM',
      icon: 'directions_bike',
      impactPct: 0.6,
      paymentMethod: 'Transit'
    },
    {
      id: 'tx-3',
      title: 'Third Wave Coffee (Study Hang)',
      category: 'Social',
      amount: 320,
      timeAgo: 'Yesterday, 7:45 PM',
      icon: 'local_cafe',
      impactPct: 3.2,
      paymentMethod: 'Card'
    },
    {
      id: 'tx-4',
      title: 'Swiggy Gourmet Late Box',
      category: 'Food',
      amount: 290,
      timeAgo: 'Yesterday, 11:10 PM',
      icon: 'fastfood',
      impactPct: 2.9,
      paymentMethod: 'Swiggy UPI'
    },
    {
      id: 'tx-5',
      title: 'Metro SmartCard Recharge',
      category: 'Transport',
      amount: 300,
      timeAgo: 'Yesterday',
      icon: 'train',
      impactPct: 3.0,
      paymentMethod: 'UPI'
    },
    {
      id: 'tx-6',
      title: 'Economics Reference PDF',
      category: 'Education',
      amount: 250,
      timeAgo: '3 days ago',
      icon: 'description',
      impactPct: 2.5,
      paymentMethod: 'NetBanking'
    }
  ]);

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const id = 'tx-' + Date.now();
    const created: Transaction = { ...newTx, id };
    setTransactions((prev) => [created, ...prev]);
    showToast(created.amount < 0 || created.category === 'Income' ? `Added Income: ₹${Math.abs(created.amount)}` : `Logged Spend: ₹${created.amount}`);
  };

  const [budgetBuckets, setBudgetBuckets] = useState<BudgetBucket[]>([
    {
      id: 'b-food',
      name: 'Food & Delivery',
      spent: 1450,
      cap: 2500,
      color: 'primary',
      icon: 'ramen_dining',
      tag: 'Pace OK',
      subtext: 'Swiggy, Zomato, Campus Canteen'
    },
    {
      id: 'b-metro',
      name: 'Metro & Auto',
      spent: 620,
      cap: 1200,
      color: 'secondary',
      icon: 'directions_subway',
      tag: 'Steady',
      subtext: 'Metro SmartCard, Rapido, Uber'
    },
    {
      id: 'b-social',
      name: 'Social & Weekend',
      spent: 1100,
      cap: 1800,
      color: 'tertiary',
      icon: 'nightlife',
      tag: 'Caution',
      subtext: 'Cafes, Movies, Weekend hangs'
    },
    {
      id: 'b-shopping',
      name: 'Shopping & Impulse',
      spent: 450,
      cap: 800,
      color: 'primary',
      icon: 'shopping_bag',
      tag: 'Tightly Capped',
      subtext: 'Blinkit snax, Thrift, Tech accessories'
    },
    {
      id: 'b-emergency',
      name: 'Emergency Buffer',
      spent: 0,
      cap: 700,
      color: 'outline',
      icon: 'lock',
      tag: 'Untouchable',
      subtext: 'Locked reserve for month-end shockwaves'
    }
  ]);

  const rebalanceBuckets = (fromId: string, toId: string, amount: number) => {
    setBudgetBuckets((prev) =>
      prev.map((b) => {
        if (b.id === fromId) return { ...b, cap: Math.max(b.spent, b.cap - amount) };
        if (b.id === toId) return { ...b, cap: b.cap + amount };
        return b;
      })
    );
    showToast(`Rebalanced ₹${amount} between categories!`);
  };

  const depositToGoal = (goalId: string, amount: number) => {
    if (goalId === 'goal-emergency') {
      setEmergencyFundTotal((prev) => prev + amount);
      showToast(`Deposited ₹${amount} into Emergency Fund!`);
    } else if (goalId === 'goal-tech') {
      setSemesterGoalTotal((prev) => prev + amount);
      showToast(`Deposited ₹${amount} into Tech Upgrades!`);
    } else if (goalId === 'goal-goa') {
      setGoaGoalTotal((prev) => prev + amount);
      showToast(`Deposited ₹${amount} into Goa Trip Vault!`);
    }
  };

  const goals: GoalItem[] = [
    {
      id: 'goal-emergency',
      title: 'Emergency Fund',
      currentAmount: emergencyFundTotal,
      targetAmount: 1500,
      subtitle: 'Protected safety net',
      icon: 'savings',
      isProtected: true
    },
    {
      id: 'goal-tech',
      title: 'Semester Tech Upgrades',
      currentAmount: semesterGoalTotal,
      targetAmount: 2000,
      subtitle: 'Hardware & accessories',
      eta: 'Day 28 of 30',
      icon: 'laptop_mac'
    },
    {
      id: 'goal-goa',
      title: 'Goa Trip with College Crew',
      currentAmount: goaGoalTotal,
      targetAmount: 3000,
      subtitle: 'Auto-deposits ₹70/day every midnight',
      icon: 'flight_takeoff'
    }
  ];

  // Derived Values
  const spentTotal = 1480; // Baseline recorded expenditure
  const reservedBillsTotal = 1200; // Mandatory auto-deductions
  const targetSavingsTotal = 2000;

  // Available to spend (from 10k pool)
  const remainingDays = Math.max(1, cycleLength - currentDay);
  const availableToSpend = monthlyBudget - spentTotal - reservedBillsTotal; // ~ ₹7,320
  const uncommittedSpendable = Math.max(0, availableToSpend - emergencyFundTotal); // ₹5,320

  const dailySafeSpendProtected = Math.round(uncommittedSpendable / remainingDays) + culledDailyBoost; // ₹241
  const dailySafeSpendGross = Math.round(availableToSpend / remainingDays) + culledDailyBoost; // ₹332

  const healthScore = Math.min(98, 84 + (culledMonthlyTotal > 0 ? 4 : 0));
  const surplusForecast = 2380 + culledMonthlyTotal;

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'pulse') {
      root.classList.add('theme-pulse');
    } else {
      root.classList.remove('theme-pulse');
    }
  }, [theme]);

  return (
    <BudgetContext.Provider
      value={{
        theme,
        setTheme,
        activePocketWiseTab,
        setActivePocketWiseTab,
        activePulseTab,
        setActivePulseTab,
        monthlyBudget,
        setMonthlyBudget,
        cycleLength,
        setCycleLength,
        currentDay,
        setCurrentDay,
        spentTotal,
        reservedBillsTotal,
        emergencyFundTotal,
        targetSavingsTotal,
        availableToSpend,
        dailySafeSpendProtected,
        dailySafeSpendGross,
        healthScore,
        surplusForecast,
        subscriptions,
        toggleSubscription,
        culledMonthlyTotal,
        culledDailyBoost,
        goals,
        depositToGoal,
        transactions,
        addTransaction,
        budgetBuckets,
        rebalanceBuckets,
        toastMessage,
        showToast,
        isAddExpenseOpen,
        setIsAddExpenseOpen,
        isAddIncomeOpen,
        setIsAddIncomeOpen
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
