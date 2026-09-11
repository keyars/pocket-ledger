export const CATEGORIES = ['Housing', 'Food', 'Transport', 'Bills', 'Health', 'Fun', 'Shopping', 'Education', 'Other'] as const;
export type Category = (typeof CATEGORIES)[number];
export type EntryType = 'income' | 'expense' | 'transfer';

export interface Account { id: string; name: string; openingBalance: number; currency: 'INR'; archived?: boolean; }
export interface LedgerEntry { id: string; type: EntryType; title: string; amount: number; category: Category; date: string; accountId: string; toAccountId?: string; note?: string; recurring?: boolean; }
export interface Budget { id: string; category: Category; limit: number; month: string; }
export interface SavingsGoal { id: string; name: string; target: number; saved: number; deadline?: string; }
export interface FinanceSummary { income: number; expenses: number; balance: number; savingsRate: number; netCashFlow: number; }

export const calculateSummary = (entries: LedgerEntry[], accounts: Account[] = []): FinanceSummary => {
  const income = entries.filter((entry) => entry.type === 'income').reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = entries.filter((entry) => entry.type === 'expense').reduce((sum, entry) => sum + entry.amount, 0);
  const opening = accounts.reduce((sum, account) => sum + account.openingBalance, 0);
  const netCashFlow = income - expenses;
  const balance = opening + netCashFlow;
  const savingsRate = income > 0 ? Math.max(0, Math.round((netCashFlow / income) * 100)) : 0;
  return { income, expenses, balance, savingsRate, netCashFlow };
};

export const spendingByCategory = (entries: LedgerEntry[]) => {
  const totals = entries.filter((entry) => entry.type === 'expense').reduce<Partial<Record<Category, number>>>((acc, entry) => { acc[entry.category] = (acc[entry.category] ?? 0) + entry.amount; return acc; }, {});
  return (Object.entries(totals) as [Category, number][]).sort((a, b) => b[1] - a[1]);
};

export const accountBalance = (account: Account, entries: LedgerEntry[]) => account.openingBalance + entries.filter((entry) => entry.accountId === account.id).reduce((balance, entry) => entry.type === 'income' ? balance + entry.amount : balance - entry.amount, 0);
export const budgetProgress = (budget: Budget, entries: LedgerEntry[]) => {
  const spent = entries.filter((entry) => entry.type === 'expense' && entry.category === budget.category && entry.date.startsWith(budget.month)).reduce((sum, entry) => sum + entry.amount, 0);
  return { spent, remaining: Math.max(0, budget.limit - spent), percent: budget.limit > 0 ? Math.min(100, Math.round((spent / budget.limit) * 100)) : 0 };
};
export const goalProgress = (goal: SavingsGoal) => goal.target > 0 ? Math.min(100, Math.round((goal.saved / goal.target) * 100)) : 0;
export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
