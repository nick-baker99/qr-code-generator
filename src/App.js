import './App.css';
import QrCodeGenerator from './components/QrCodeGenerator';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect } from 'react';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvUvuAlbnhmFY6-abAh7W19VYbOLdoj3k",
  authDomain: "qr-code-generator-5abe3.firebaseapp.com",
  projectId: "qr-code-generator-5abe3",
  storageBucket: "qr-code-generator-5abe3.firebasestorage.app",
  messagingSenderId: "399652650965",
  appId: "1:399652650965:web:812e6ddbb81ed82cbdc75c",
  measurementId: "G-YL4SYL4P6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  useEffect(() => {
    logEvent(analytics, "page_view");
  }, []);
  
  return (
    <div className="App">
      <QrCodeGenerator />
    </div>
  );
}

export default App;
