# QR Code Generator

The **QR Code Generator** is a React-based web application that allows users to easily create and download QR codes. This tool is perfect for generating QR codes for URLs, which can be used for websites, online resources, or digital marketing campaigns. The application includes a user-friendly interface, customizable size options, and high-resolution image downloads.

## Demo

[View demo](https://qr-code-generator-5abe3.web.app/) (right-click to open in a new tab)

![qr-code-2](https://github.com/user-attachments/assets/3800cb74-79d2-46d2-b88e-1180430afec7)


## Features

- **Generate QR Codes:** Enter a URL and create a QR code instantly.
- **Customizable Size:** Specify the size of the QR code in pixels (up to 1080px) for both preview and download.
- **Preview Mode:** View a small, styled preview of the QR code (maximum 200px) before downloading.
- **Download as PNG:** Save the QR code as a high-resolution PNG file at the specified size.

## Technologies Used

- **React:** For building the user interface and managing application state.
- **React-QR-Code:** A library for rendering QR codes in the browser.
- **html-to-image:** For converting the QR code preview into a downloadable PNG image.
- **CSS:** For styling the application, including responsive layouts and the preview window.

## How It Works

1. Enter a URL into the input field.
2. Optionally, adjust the QR code size (default is 200px).
3. Click the "Generate" button to create a QR code.
4. Preview the QR code in the display area.
5. Download the QR code as a PNG by clicking the "Download" button.
6. Use the "Reset" button to clear all inputs and start over.

## Notes

- The preview window is capped at 200px to ensure it fits on the page.
- The downloadable QR code retains the full size specified in the input, up to 1080px.
