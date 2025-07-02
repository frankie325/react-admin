import { useEffect } from 'react';

function createConnection() {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    },
  };
}

export default function Chat() {
  console.log('Chat 组件被渲染了！');
  //   在开发环境下 Effect 运行了两次，为什么这样做？
  //   React会在开发模式下运行两次，以帮助你发现副作用的错误
  //   解决副作用错误办法：添加清理（cleanup）函数
  useEffect(() => {
    const connection = createConnection();
    connection.connect();

    // 如果每次重新渲染后都得进行连接，就会创造多个连接，导致性能问题
    // 添加清理（cleanup）函数：React 会在每次 Effect 重新运行之前调用清理函数，并在组件卸载（被移除）时最后一次调用清理函数
    return () => {
      connection.disconnect();
    };
  }, []); // 依赖项数组为空，表示只在组件挂载时执行一次

  return <h1>欢迎来到聊天室！</h1>;
}
