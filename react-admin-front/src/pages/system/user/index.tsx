import { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Flex, Input } from 'antd';
import { Layout } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { findAllUsers } from './api';
import UserFormModal from './components/userFormModal';
import type { UserEntity } from './index.type';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const columns: TableColumnsType<UserEntity> = [
  { title: '姓名', dataIndex: 'username' },
  { title: '性别', dataIndex: 'sex' },
  { title: '邮箱', dataIndex: 'email' },
];

const UserPage: React.FC = () => {
  const [data, setData] = useState<UserEntity[]>([]);

  const getUserList = async () => {
    const { data } = await findAllUsers();
    setData(data);
  };
  const onSearch = () => {};

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUserList();
  }, []); // 依赖数组为空，只在首次渲染时执行
  return (
    <Layout className="h-[calc(100%-32px)] bg-white! m-[16px] p-[16px]">
      <Header className="bg-white! p-0! flex items-center justify-between">
        <Flex align="center" gap={16}>
          <Search size="large" placeholder="请输入用户姓名" onSearch={onSearch} style={{ width: 200 }} />
        </Flex>
        <div>
          <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>
            新增
          </Button>
        </div>
      </Header>
      <Content>
        <Table<UserEntity> className="table-align h-full" bordered pagination={{ position: ['bottomCenter'] }} columns={columns} dataSource={data} />
      </Content>
      <UserFormModal open={isModalOpen} onCancel={onCancel} />
    </Layout>
  );
};

export default UserPage;
