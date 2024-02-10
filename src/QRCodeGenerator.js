import React, { useState } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [qrData, setQRData] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");

  const [fileSrc, setFileSrc] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generateQRCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const canvas = document.getElementById("qr-canvas");
        const dataURL = canvas.toDataURL("image/png");
        setDownloadLink(dataURL);
        setIsGenerating(false);
      } catch (error) {
        console.error("Error generating QR code:", error);
        setIsGenerating(false);
      }
    }, 1000);
  };

  const handleDownloadPNG = () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = downloadLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const canvas = document.getElementById("qr-canvas");
    const imgData = canvas.toDataURL("image/png");

    const doc = new jsPDF();
    doc.addImage(imgData, "PNG", 10, 10);
    doc.save("qrcode.pdf");
  };

  return (
    <div className="qr-generator">
      <div className="customization">
        <input
          type="text"
          placeholder="Enter text for QR code"
          value={qrData}
          onChange={(e) => setQRData(e.target.value)}
        />

        <div>
          <label htmlFor="size">Size:</label>
          <input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="bg-color">Background Color:</label>
          <input
            type="color"
            id="bg-color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fg-color">Foreground Color:</label>
          <input
            type="color"
            id="fg-color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </div>
        <div className="logoContainer">
        <label htmlFor="logo" style={{ display: 'inline-block', marginBottom: '12px', cursor: 'pointer' }}>
        <span style={{ backgroundColor: '#8f94fb', color: '#fff', padding: '8px 16px', borderRadius: '10px' }}>Upload Logo</span>
        <input type="file" id="logo" onChange={handleFileChange} style={{ display: 'none' }} />
      </label>
        </div>
        <button
          onClick={generateQRCode}
          className={isGenerating ? "generating" : ""}
        >
          {isGenerating ? "Generating..." : "Generate QR Code"}
        </button>
      </div>
      <div id="qr-code" className={isGenerating ? "loading" : ""}>
        {qrData && (
          <QRCode
            value={qrData}
            id="qr-canvas"
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            includeMargin={true}
            imageSettings={{
              src: fileSrc,
              height: 40,
              width : 40
            }}
          />
        )}
      </div>
      {downloadLink && (
        <div className="download-buttons">
          <button onClick={handleDownloadPNG} className="download-button">
            Download PNG
          </button>
          <button onClick={handleDownloadPDF} className="download-button">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
