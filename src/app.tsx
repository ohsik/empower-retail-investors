import React from 'react';
import { createRoot } from 'react-dom/client';

import './app.css';

import { Dashboard } from './dashboard';

const container = document.getElementById('app');

function App() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}

createRoot(container!).render(<App />);
