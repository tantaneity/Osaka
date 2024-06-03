import { create } from 'zustand';

interface SearchHistoryState {
  history: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

const useSearchHistoryStore = create<SearchHistoryState>((set) => {
  const initialHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

  return {
    history: initialHistory,

    addToHistory: (query) => {
      set((state) => {
        if (!state.history.includes(query)) {
          const newHistory = [...state.history, query];
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
          return { history: newHistory };
        }
        return state;
      });
    },

    clearHistory: () => {
      localStorage.removeItem('searchHistory');
      set({ history: [] });
    },
  };
});

export default useSearchHistoryStore;
