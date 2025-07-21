import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: Record<string, unknown>;
  accessToken: string;
  refreshToken: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = { userInfo: {}, accessToken: '', refreshToken: '' };
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户信息
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    // 设置token信息
    setTokens: (state, action: PayloadAction<Tokens>) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const { setUserInfo, setTokens } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectRefreshToken = (state: RootState) => state.user.refreshToken;

export default userSlice.reducer;
