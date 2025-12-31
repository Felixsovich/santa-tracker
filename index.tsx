
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// --- INITIALIZATION ---
// Main entry point for the application. 
// Renders the root App component into the 'root' element in the DOM.
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
