import React from 'react';
import { createRoot } from 'react-dom/client';

import '../app.css';

const container = document.getElementById('app');

function Popup() {
  return (
    <div>
      <h1 className="text-2xl p-20 text-primary">
        Hot load popup! Ready?
      </h1>
    </div>
  );
}
createRoot(container!).render(<Popup />);
