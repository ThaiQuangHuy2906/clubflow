import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth.jsx';
import { AppRouter } from './router.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter useTransitions={false}><AuthProvider><AppRouter /></AuthProvider></BrowserRouter>
);
