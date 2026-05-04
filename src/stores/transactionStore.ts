import { create } from 'zustand';
import { Transaction } from '@/types';
import { mockTransactions } from "@/mock/zhangdan";

interface TransactionStore {
  transactions: Transaction[];

  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  getTransactionsByDate: (date: Date) => Transaction[];
  getTransaction: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getBalance: () => number;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: mockTransactions || [],

  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [{ ...transaction, id: Date.now().toString() }, ...state.transactions],
    }));
  },

  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  updateTransaction: (id, transaction) => {
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...transaction } : t)),
    }));
  },

  getTransactionsByDate: (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return get().transactions.filter((t) => {
      const tDate = new Date(t.updateTime);
      return tDate.getFullYear() === year && tDate.getMonth() === month;
    });
  },

  getTransaction: () => get().transactions,

  getTotalIncome: () => {
    return get().transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getTotalExpense: () => {
    return get().transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getBalance: () => {
    return get().getTotalIncome() - get().getTotalExpense();
  },
}));
