import React from 'react'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import * as htmlToImage from "html-to-image";
import { useRef } from 'react';
import { getAnalytics, logEvent } from "firebase/analytics";


const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // default QR size is 200 pixels
  const [size, setSize] = useState(200); // input size
  const [qrSize, setQrSize] = useState(200); // size used for rendering the QR code

  // Retrieve the initialized analytics instance
  const analytics = getAnalytics();

  const qrCodeRef = useRef(null);
  // download button handler
  const downloadQRCode = () => {
    // convert html element to png image and download
    htmlToImage
      // Set the dimensions to the full size
      .toPng(qrCodeRef.current, { width: size, height: size })
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
    if (size <= 0) {
      setErrorMsg("Invalid size");
      return;
    }
    if (size > 1080) {
      setErrorMsg("Size must be below 3000 pixels");
      return;
    }

    // remove error if set
    if (errorMsg) setErrorMsg('');
    setQrUrl(url);
    // Update QR code size only when the button is clicked
    setQrSize(size); 
    // make QR code visible
    setIsVisible(true);

    // log event for google analytics 4
    logEvent(analytics, "generate_qr");
  }
  // handler for reset button
  const resetQrCode = () => {
    setUrl('');
    setSize(200);
    setIsVisible(false);
  }

  const btnClass = `generate-btn${url ? " active" : ""}`;
  const btnDisabled = url ? false : true;

  return (
    <div className="qr-container">
      <h1>QR Code Generator</h1>
      <div className="qr_wrapper">
        <div className="qr-input">
          <label>QR Code URL</label>
          <input 
            type="text" 
            placeholder="Enter URL" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            maxLength="7000"
          />
        </div>
        <div className="qr-input">
          <label>Image Pixels</label>
          <input 
            type="number" 
            placeholder="Size" 
            value={size} 
            onChange={(e) => setSize(e.target.value)}
          />
          <span className="note">(Max 1080px)</span>
        </div>
        <div className="error-msg">
          <span>{errorMsg}</span>
        </div>
        <button 
          onClick={QrCodeHandler} 
          title="Generate QR Code" 
          className={btnClass}
          disabled={btnDisabled}
        >
          Generate
        </button>
        {isVisible && (
          <div className="qr-download">
            <label>Preview</label>
            <div className="qr-image">
              <QRCode value={qrUrl} size={qrSize} ref={qrCodeRef} />
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