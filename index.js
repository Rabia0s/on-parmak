import React from 'react';
import ReactDOM from 'react-dom/client'; // react-dom yerine react-dom/client import edilmelidir
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// React 18'de, render yerine createRoot kullanılacak
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
