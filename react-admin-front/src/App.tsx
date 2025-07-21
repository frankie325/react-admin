import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ThemeProvide from '@/components/ThemeProvide';
import PersistentStore from './store';
import RouteProvidePro from '@/router/routeProvidePro.tsx';
function App() {
  return (
    <StrictMode>
      <ConfigProvider locale={zhCN}>
        <PersistentStore>
          <ThemeProvide>
            <RouteProvidePro></RouteProvidePro>
          </ThemeProvide>
        </PersistentStore>
      </ConfigProvider>
    </StrictMode>
  );
}

export default App;
