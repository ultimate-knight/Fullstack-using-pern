import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18
import App from './App';


// Get the root DOM node where your app will be rendered
const container = document.getElementById('root');

// Create a root using React 18's createRoot method
const root = ReactDOM.createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
