import React from 'react';
import { Button, Layout, theme } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSiderCollapsed } from '@/store/app';
import { selectCollapsed } from '@/store/app';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(toggleSiderCollapsed())}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default AppHeader;
