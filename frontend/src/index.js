import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AuthState from './context/authState'

ReactDOM.render(
  <AuthState>
     <App />
  </AuthState>,
  document.getElementById('root')
);
