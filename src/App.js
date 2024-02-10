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
      <QRCodeGenerator />
    </div>
  );
}

export default App;
