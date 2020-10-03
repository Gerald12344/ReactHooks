import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './router';
import * as serviceWorker from './serviceWorker';
import socketIOClient from "socket.io-client";

import {SocketIOContext} from './SocketIOContext';

const ENDPOINT = "http://127.0.0.1:4001";

const client = socketIOClient(ENDPOINT);

ReactDOM.render(
  <React.StrictMode>
    <SocketIOContext.Provider value={client}>
      <Routes />
    </SocketIOContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
