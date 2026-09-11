import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Category, LedgerEntry } from '../domain/finance';

interface LedgerState {
  entries: LedgerEntry[];
  addEntry: (entry: Omit<LedgerEntry, 'id'>) => void;
  removeEntry: (id: string) => void;
}

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => set((state) => ({ entries: [{ ...entry, id: `${Date.now()}` }, ...state.entries] })),
      removeEntry: (id) => set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) })),
    }),
    {
      name: 'pocket-ledger-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const categories: Category[] = ['Housing', 'Food', 'Transport', 'Bills', 'Health', 'Fun', 'Other'];
