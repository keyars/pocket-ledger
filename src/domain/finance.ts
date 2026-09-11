export type Category = 'Housing' | 'Food' | 'Transport' | 'Bills' | 'Health' | 'Fun' | 'Other';
export type EntryType = 'income' | 'expense';

export interface LedgerEntry {
  id: string;
  type: EntryType;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}

export interface FinanceSummary {
  income: number;
  expenses: number;
  balance: number;
  savingsRate: number;
}

export const calculateSummary = (entries: LedgerEntry[]): FinanceSummary => {
  const income = entries.filter((entry) => entry.type === 'income').reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = entries.filter((entry) => entry.type === 'expense').reduce((sum, entry) => sum + entry.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.max(0, Math.round((balance / income) * 100)) : 0;

  return { income, expenses, balance, savingsRate };
};

export const spendingByCategory = (entries: LedgerEntry[]) => {
  const totals = entries
    .filter((entry) => entry.type === 'expense')
    .reduce<Partial<Record<Category, number>>>((acc, entry) => {
      acc[entry.category] = (acc[entry.category] ?? 0) + entry.amount;
      return acc;
    }, {});

  return (Object.entries(totals) as [Category, number][]).sort((a, b) => b[1] - a[1]);
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
