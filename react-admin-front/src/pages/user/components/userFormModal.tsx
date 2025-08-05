import { useState } from 'react';
import type { FormProps } from 'antd';
import { Modal, Button, Checkbox, Form, Input, Select, Radio } from 'antd';
import { addUser } from '../api';
import type { UserEntity } from '../index.type';

interface UserFormModelProps {
  open: boolean;
  onCancel: () => void;
}

const UserFormModal: React.FC<UserFormModelProps> = (props) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const { open, onCancel } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish: FormProps<UserEntity>['onFinish'] = async (userInfo) => {
    await addUser(userInfo);
  };

  return (
    <Modal
      width={600}
      title="新增用户"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<UserEntity>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserEntity>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<UserEntity>
          label="性别"
          name="sex"
          rules={[{ required: true, message: '请输入性别' }]}
        >
          <Radio.Group
            options={[
              { value: 1, label: '男' },
              { value: 2, label: '女' },
            ]}
          />
        </Form.Item>
        <Form.Item<UserEntity> label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item<UserEntity>
          label="角色"
          name="roles"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select
            mode="multiple"
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
