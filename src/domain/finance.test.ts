import { calculateSummary, spendingByCategory } from './finance';

describe('finance domain', () => {
  const entries = [
    { id: '1', type: 'income' as const, title: 'Salary', amount: 100000, category: 'Other' as const, date: '2026-09-01' },
    { id: '2', type: 'expense' as const, title: 'Rent', amount: 25000, category: 'Housing' as const, date: '2026-09-02' },
    { id: '3', type: 'expense' as const, title: 'Food', amount: 5000, category: 'Food' as const, date: '2026-09-03' },
    { id: '4', type: 'expense' as const, title: 'Groceries', amount: 3000, category: 'Food' as const, date: '2026-09-04' },
  ];

  test('calculates income, expenses, balance and savings rate', () => {
    expect(calculateSummary(entries)).toEqual({ income: 100000, expenses: 33000, balance: 67000, savingsRate: 67 });
  });

  test('ranks spending categories by total amount', () => {
    expect(spendingByCategory(entries)).toEqual([
      ['Housing', 25000],
      ['Food', 8000],
    ]);
  });

  test('handles no income safely', () => {
    expect(calculateSummary(entries.slice(1))).toMatchObject({ income: 0, expenses: 33000, balance: -33000, savingsRate: 0 });
  });
});
