
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { AuthProvider } from './infra/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<AuthProvider><App/></AuthProvider>

);
