import { StrictMode } from 'react';
import router from './router/index.ts';
import store from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ThemeProvide from '@/components/ThemeProvide';
import RouteProvidePro from '@/router/routeProvidePro.tsx';
function App() {
  return (
    <StrictMode>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <ThemeProvide>
            <RouteProvidePro></RouteProvidePro>
          </ThemeProvide>
        </Provider>
      </ConfigProvider>
    </StrictMode>
  );
}

export default App;
