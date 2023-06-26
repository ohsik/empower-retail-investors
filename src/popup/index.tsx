import React from 'react';
import { createRoot } from 'react-dom/client';

import '../app.css';

import { Popup } from './popup';

const container = document.getElementById('popup');

createRoot(container!).render(<Popup />);