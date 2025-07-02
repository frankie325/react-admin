import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

interface ThemeState {
  value: 'light' | 'dark';
}

const initialState: ThemeState = { value: 'light' };
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // 这里可以根据实际需求切换主题
      state.value = 'light' === state.value ? 'dark' : 'light'; // 直接修改 state
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.value;
export default themeSlice.reducer;
