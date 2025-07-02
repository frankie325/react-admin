import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.module.less';
import AccountForm from './accountForm';
import { Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/features/theme';
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '账号密码登录',
    children: <AccountForm />,
  },
  {
    key: '2',
    label: '手机号登录',
    children: 'Content of Tab Pane 2',
  },
];

const Login: React.FC = () => {
  const dispatch = useDispatch();

  function handleSwitchChange() {
    dispatch(toggleTheme());
  }

  return (
    <div className={`${styles.loginContainer}`}>
      <div className={styles.loginBox}>
        <Switch onChange={handleSwitchChange}></Switch>
        <h1 className="bg-bg-primary p-6 text-text-primary">主题测试</h1>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default Login;
