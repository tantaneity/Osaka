import {create} from 'zustand';

interface SearchHistoryState {
  history: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

const useSearchHistoryStore = create<SearchHistoryState>((set) => ({
  history: [],

  addToHistory: (query) => {
    set((state) => ({
      history: [...state.history, query],
    }));
  },

  clearHistory: () => {
    set({ history: [] });
  },
}));

export default useSearchHistoryStore;
