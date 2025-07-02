import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from '@/store/features/counter/counterSlice';

export default function CounterSlice() {
  // useSelector 这个 hooks 让我们的组件从 Redux 的 store 状态树中提取它需要的任何数据
  const count = useSelector(selectCount);
  //   useDispatch 这个 hooks 返回一个引用到 store 的 dispatch 函数
  //   让我们可以在组件中 dispatch actions
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
    </div>
  );
}
