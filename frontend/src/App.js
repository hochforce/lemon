import React from 'react';
import Routes from './services/routes';
import './App.css';
import ptBR from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';
import { ConfigProvider } from 'antd';

function App() {

  return (
    <ConfigProvider locale={ptBR}>
      <div className="App">
        <div className="content">
          <Routes />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
