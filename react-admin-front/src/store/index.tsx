import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/features/counter/counterSlice';
import postsReducer from '@/store/features/posts/postsSlice';
import themeReducer from '@/store/features/theme';
import appReducer from '@/store/app';
import userReducer from '@/store/user';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { PropsWithChildren } from 'react';

// userReducer使用持久存储
const persistedUserReducer = persistReducer(
  {
    key: 'user',
    storage,
  },
  userReducer,
);

const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    posts: postsReducer,
    theme: themeReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /*
       忽略序列化检查：因为redux-persist的某些action可能不是可序列化的，
       例如FLUSH, REHYDRATE等 这些action是redux-persist内部使用的，需要忽略序列化检查，否则会导致警告或错误
      */
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 从 store 本身推断 `RootState` 类型
export type RootState = ReturnType<typeof store.getState>;

export default store;

const persistor = persistStore(store);

export function PersistentStore({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
