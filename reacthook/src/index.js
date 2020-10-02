import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './router';
import * as serviceWorker from './serviceWorker';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

ReactDOM.render(
  <React.StrictMode>
    <Routes socketIOClient={socketIOClient(ENDPOINT)} ENDPOINT={ENDPOINT} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
