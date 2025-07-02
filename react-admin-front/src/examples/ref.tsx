import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  //   每当你的组件重新渲染时（例如当你设置 state 时），所有局部变量都会从头开始初始化
  //   let timeoutID = null;

  // 与 state 一样，ref 允许你在组件的重新渲染之间保留信息
  const timeoutRef = useRef(0);

  function handleSend() {
    setIsSending(true);
    // timeoutID = setTimeout(() => {
    // 与 state 不同，设置 ref 的 current 值不会触发重新渲染
    timeoutRef.current = setTimeout(() => {
      alert('已发送!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    // clearTimeout(timeoutID); //timeoutID这里为null
    clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <input disabled={isSending} value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={isSending} onClick={handleSend}>
        {isSending ? '发送中……' : '发送'}
      </button>
      {isSending && <button onClick={handleUndo}>撤销</button>}
    </>
  );
}
