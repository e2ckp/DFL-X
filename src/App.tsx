import React from 'react';
import {
  ConfigProvider
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Main from './layouts/Main';
import Edit from './layouts/Edit';
import About from './layouts/About';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          {/* 主操作窗口 */}
          <Main />
          {/* 操作相关 */}
          <Edit />
          {/* 关于 */}
          <About />
        </div>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
