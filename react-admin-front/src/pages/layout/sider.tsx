import React from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import { selectCollapsed } from '@/store/app';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Sider } = Layout;

const AppSider: React.FC = () => {
  const collapsed = useSelector(selectCollapsed);
  const navigate = useNavigate();
  const handleClickMenu: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
          {
            key: '/userPage',
            icon: <UploadOutlined />,
            label: '用户页面',
          },
        ]}
        onClick={handleClickMenu}
      />
    </Sider>
  );
};

export default AppSider;
