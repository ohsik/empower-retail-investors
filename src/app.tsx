import React from 'react';
import { createRoot } from 'react-dom/client';

import './app.css';

import { Home } from './dashboard';

const container = document.getElementById('app');

function App() {
  return (
    <main>
      <Home />
    </main>
  );
}

createRoot(container!).render(<App />);
