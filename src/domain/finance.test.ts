import { accountBalance, budgetProgress, calculateSummary, goalProgress, spendingByCategory } from './finance';

describe('finance domain', () => {
  const accounts = [{ id: 'cash', name: 'Cash', openingBalance: 10000, currency: 'INR' as const }];
  const entries = [
    { id: '1', type: 'income' as const, title: 'Salary', amount: 100000, category: 'Other' as const, date: '2026-09-01', accountId: 'cash' },
    { id: '2', type: 'expense' as const, title: 'Rent', amount: 25000, category: 'Housing' as const, date: '2026-09-02', accountId: 'cash' },
    { id: '3', type: 'expense' as const, title: 'Food', amount: 5000, category: 'Food' as const, date: '2026-09-03', accountId: 'cash' },
    { id: '4', type: 'expense' as const, title: 'Groceries', amount: 3000, category: 'Food' as const, date: '2026-09-04', accountId: 'cash' },
  ];
  test('calculates cash flow and balance including opening balance', () => expect(calculateSummary(entries, accounts)).toEqual({ income: 100000, expenses: 33000, balance: 77000, savingsRate: 67, netCashFlow: 67000 }));
  test('ranks spending categories by total amount', () => expect(spendingByCategory(entries)).toEqual([['Housing', 25000], ['Food', 8000]]));
  test('handles no income safely', () => expect(calculateSummary(entries.slice(1))).toMatchObject({ income: 0, expenses: 33000, balance: -33000, savingsRate: 0, netCashFlow: -33000 }));
  test('calculates an account balance', () => expect(accountBalance(accounts[0], entries)).toBe(77000));
  test('calculates monthly budget progress', () => expect(budgetProgress({ id: 'b1', category: 'Food', limit: 10000, month: '2026-09' }, entries)).toEqual({ spent: 8000, remaining: 2000, percent: 80 }));
  test('calculates savings goal progress', () => expect(goalProgress({ id: 'g1', name: 'Emergency fund', target: 100000, saved: 35000 })).toBe(35));
});
