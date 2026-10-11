export type AppTheme = 'pocketwise' | 'pulse';

export type PocketWiseTab = 'dashboard' | 'simulator' | 'scenarios' | 'goals-and-bills';
export type PulseTab = 'simulator' | 'cash' | 'subs' | 'health';

export interface Transaction {
  id: string;
  title: string;
  category: 'Food' | 'Transport' | 'Education' | 'Social' | 'Shopping' | 'Income' | 'Emergency';
  amount: number;
  timeAgo: string;
  icon: string;
  impactPct?: number;
  paymentMethod?: string;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  cost: number;
  dueDay: number;
  category: string;
  isFixed: boolean;
  isActive: boolean;
  dailyEquivalent: number;
  icon: string;
  note: string;
}

export interface GoalItem {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  subtitle: string;
  eta?: string;
  icon: string;
  isProtected?: boolean;
}

export interface BudgetBucket {
  id: string;
  name: string;
  spent: number;
  cap: number;
  color: string;
  icon: string;
  tag: string;
  subtext: string;
}
