import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

interface AppState {
  collapsed: boolean;
}

const initialState: AppState = { collapsed: false };
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 侧边栏是否折叠
    toggleSiderCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { toggleSiderCollapsed } = appSlice.actions;

export const selectCollapsed = (state: RootState) => state.app.collapsed;
export default appSlice.reducer;
