import React from 'react';
import { createRoot } from 'react-dom/client';

import './app.css';

import { Home } from './dashboard';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('app');

function App() {
  return (
    <HashRouter>
      <main>
        <Home />
      </main>
    </HashRouter>
  );
}

createRoot(container!).render(<App />);
