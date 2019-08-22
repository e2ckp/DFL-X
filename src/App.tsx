import React from 'react';
import {
  ConfigProvider
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Main from './layouts/Main';
import About from './layouts/About';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <Main />
          <About />
        </div>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
