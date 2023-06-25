import React from 'react';
import { render } from 'react-dom';

const container = document.getElementById('app');

function Popup() {
  return (
    <div>
      <h1>Hot load popup!</h1>
    </div>
  );
}
render(<Popup />, container);
