import { App } from './App.tsx';
import { createRoot } from 'react-dom/client';
import React from 'react';

const rootElement = (document.getElementById('root'));
if (null !== rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    throw "Root does not exist";
}
