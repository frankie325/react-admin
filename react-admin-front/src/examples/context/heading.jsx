import { useContext } from 'react';
import { LevelContext } from './levelContext.js';

export default function Heading({ children }) {
  // 在子组件中使用 context：
  // 组件会使用 UI 树中在它上层最近的那个 <LevelContext> 传递过来的值
  const level = useContext(LevelContext);

  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}
