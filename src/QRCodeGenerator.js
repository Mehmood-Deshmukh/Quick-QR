import React, { useState } from 'react';
import QRCode from 'qrcode.react';
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
 

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = downloadLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <button onClick={handleDownload} className="download-button">
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
