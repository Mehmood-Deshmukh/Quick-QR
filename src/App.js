import React from "react";
import "./App.css";
import QRCodeGenerator from "./QRCodeGenerator";

function App() {
  return (
    <div className="App">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <h1>Quick QR</h1>
      <h6>Generate, Customize, and Share Your QR Codes Effortlessly!</h6>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
