import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
interface CounterState {
  value: number;
}

const initialState = { value: 0 } satisfies CounterState as CounterState;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
      // 并不是真正的改变 state 因为它使用了 immer 库
      // 当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的
      // 不可变的 state
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

// selector 函数允许我们从 state 中获取值
// Selectors 也可以在使用的地方内联的方式定义
// 而不是仅仅只能在 slice 文件中。例如 : `useSelector((state) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;
