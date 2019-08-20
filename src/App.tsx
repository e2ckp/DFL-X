import React from 'react';
import Main from './layouts/Main';
import About from './layouts/About';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
        <About />
      </div>
    </Provider>
  );
}

export default App;
