import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const [qrData, setQRData] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const generateQRCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const canvas = document.getElementById('qr-canvas');
        const dataURL = canvas.toDataURL('image/png');
        setDownloadLink(dataURL);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setIsGenerating(false);
      }
    }, 1000);
  };

  const handleDownloadPNG = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = downloadLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const canvas = document.getElementById('qr-canvas');
    const imgData = canvas.toDataURL('image/png');
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    const qrCodeSize = canvas.width;
    const qrCodeX = (pageWidth - qrCodeSize) / 2;
    const qrCodeY = (pageHeight - qrCodeSize) / 2;
  
    doc.addImage(imgData, 'PNG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
    doc.save('qrcode.pdf');
  };

  return (
    <div className="qr-generator">
      <input
        type="text"
        placeholder="Enter text for QR code"
        value={qrData}
        onChange={(e) => setQRData(e.target.value)}
      />
      <button onClick={generateQRCode} className={isGenerating ? 'generating' : ''}>
        {isGenerating ? 'Generating...' : 'Generate QR Code'}
      </button>
      <div id="qr-code" className={isGenerating ? 'loading' : ''}>
        {qrData && <QRCode value={qrData} id="qr-canvas" />}
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
