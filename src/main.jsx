import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import RoutesLink from './router/RoutesLink.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoutesLink />
  </React.StrictMode>,
)
