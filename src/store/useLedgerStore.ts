import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Account, Budget, Category, LedgerEntry, SavingsGoal } from '../domain/finance';

interface LedgerState {
  accounts: Account[];
  entries: LedgerEntry[];
  budgets: Budget[];
  goals: SavingsGoal[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  addEntry: (entry: Omit<LedgerEntry, 'id'>) => void;
  removeEntry: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  addGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  contributeToGoal: (id: string, amount: number) => void;
}

const id = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useLedgerStore = create<LedgerState>()(persist((set) => ({
  accounts: [{ id: 'cash', name: 'Cash & Bank', openingBalance: 0, currency: 'INR' }],
  entries: [],
  budgets: [],
  goals: [],
  addAccount: (account) => set((state) => ({ accounts: [...state.accounts, { ...account, id: id() }] })),
  addEntry: (entry) => set((state) => ({ entries: [{ ...entry, id: id() }, ...state.entries] })),
  removeEntry: (entryId) => set((state) => ({ entries: state.entries.filter((entry) => entry.id !== entryId) })),
  addBudget: (budget) => set((state) => ({ budgets: [...state.budgets, { ...budget, id: id() }] })),
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, { ...goal, id: id() }] })),
  contributeToGoal: (goalId, amount) => set((state) => ({ goals: state.goals.map((goal) => goal.id === goalId ? { ...goal, saved: goal.saved + amount } : goal) })),
}), { name: 'pocket-ledger-storage-v2', storage: createJSONStorage(() => AsyncStorage) }));

export const categories: Category[] = ['Housing', 'Food', 'Transport', 'Bills', 'Health', 'Fun', 'Shopping', 'Education', 'Other'];
