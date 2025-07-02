import { useState } from 'react';

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function Count() {
  const [count, setCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    //  count为这次渲染时的快照（count为闭包内的变量，值一直为useState创建的快照）
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    // 连续点击按钮两次的效果：
    // 点击第一次时：pending + 1后，组件渲染 pending = 1
    // 点击第二次后 pending + 1后，组件渲染 pending = 2
    // 点击第一次的3秒延时，pending（此时为第一次点击时闭包的pending = 0） - 1 = -1
    // 点击第二次的3秒延时，pending（此时为第二次点击时闭包的pending = 1） - 1 = 0
    // setPending(pending + 1);
    // await delay(3000);
    // setPending(pending - 1);
    // // 两次延时后，连续设置 completed（效果相当于在渲染之前连续更新两次count）
    // setCompleted(completed + 1);

    // 在下次渲染前多次更新同一个 state：批处理
    // 更新函数：React 会获取你上一个更新函数的返回值，并将其作为 n 传递给下一个更新函数
    setPending((pending) => pending + 1);
    await delay(3000);
    setPending((pending) => pending - 1);
    setCompleted((completed) => completed + 1);
  }

  return (
    <>
      <h3>计数：{count}</h3>
      <h3>等待：{pending}</h3>
      <h3>完成：{completed}</h3>
      <button onClick={handleClick}>购买</button>
    </>
  );
}
