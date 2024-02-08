import React from 'react';
import './App.css';
import QRCodeGenerator from './QRCodeGenerator';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <QRCodeGenerator />
      <Analytics />
    </div>
  );
}

export default App;
