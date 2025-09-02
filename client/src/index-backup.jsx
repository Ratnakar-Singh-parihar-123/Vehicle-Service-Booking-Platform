import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Simple test component
const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚀 React Server Test</h1>
      <p>If you can see this, the React server is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TestApp />
    </BrowserRouter>
  </React.StrictMode>
);
