import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/features/counter/counterSlice';
import postsReducer from '@/store/features/posts/postsSlice';
import themeReducer from '@/store/features/theme';
import appReducer from '@/store/features/app';

const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    posts: postsReducer,
    theme: themeReducer,
  },
});

// 从 store 本身推断 `RootState` 类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
