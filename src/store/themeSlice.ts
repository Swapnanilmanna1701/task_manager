import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const getInitialTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const initialState: ThemeState = {
  isDark: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', state.isDark);
      }
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', state.isDark);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
