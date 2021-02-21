import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Chat from './chat-innards';
import Store from './Store'

const App = () => {
  return <div className={'app'}>
    <Store>
      <Chat/>
    </Store>
  </div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
