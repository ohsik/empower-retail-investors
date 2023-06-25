import React from 'react';
import { render } from 'react-dom';

const container = document.getElementById('app');

function App() {
  return (
    <div>
      <h1>Report App</h1>
    </div>
  );
}
render(<App />, container);
