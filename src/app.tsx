import React from 'react';
import { createRoot } from 'react-dom/client';

import './app.css';

const container = document.getElementById('app');

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Report App
      </h1>
    </div>
  );
}

createRoot(container!).render(<App />);
