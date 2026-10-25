import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/cover.css';
import Cover from './CoverPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cover />
  </React.StrictMode>
);
