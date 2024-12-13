import React from 'react'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import * as htmlToImage from "html-to-image";
import { useRef } from 'react';

const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const qrCodeRef = useRef(null);
  // download button handler
  const downloadQRCode = () => {
    // convert html element to png image and download
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  const QrCodeHandler = () => {
    // if no URL entered set error message
    if (!url) {
      setErrorMsg("Enter a URL to generate QR code");
      return;
    }
    // remove error if set
    if (errorMsg) setErrorMsg('');
    // make QR code visible
    setIsVisible(true);
  }
  // handler for reset button
  const resetQrCode = () => {
    setUrl('');
    setIsVisible(false);
  }

  var btnClass = "generate-btn";
  if (url) btnClass += " active";

  return (
    <div className="qr-container">
      <h1>Generate a QR Code</h1>
      <div className="qr_wrapper">
        <div className="qr-input">
          <input 
            type="text" 
            placeholder="Enter URL" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="error-msg">
          <span>{errorMsg}</span>
        </div>
        <button 
          onClick={QrCodeHandler} 
          title="Generate QR Code" 
          className={btnClass}
        >
          Generate
        </button>
        {isVisible && (
          <div className="qr-download">
            <div className="qr-image">
              <QRCode value={url} size={200} ref={qrCodeRef} />
            </div>
            <button 
              onClick={downloadQRCode} 
              className="download-btn"
              title="Download QR code"
            >
              <img src="/download.png" alt="download icon" />
              Download
            </button>
            <button 
              onClick={resetQrCode} 
              className="download-btn reset-btn"
              title="Download QR code"
            >
              <img src="/reset.png" alt="reset icon" />
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QrCodeGenerator