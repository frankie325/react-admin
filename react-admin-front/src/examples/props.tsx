import React from 'react';

function Avatar() {
  return <img className="avatar" src="https://i.imgur.com/1bX5QH6.jpg" alt="Lin Lanying" width={100} height={100} />;
}

// 父组件将在名为 children 的 prop 中接收到该内容
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  return (
    <Card>
      {/* 将 JSX 作为子组件传递 */}
      <Avatar />
    </Card>
  );
}
