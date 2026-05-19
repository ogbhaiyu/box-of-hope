// src/components/LicenseModal.jsx
import React, { useState } from 'react';

const LicenseModal = ({ onUnlock, onClose, gumroadUrl, productPermalink }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'error', 'success'
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && status !== 'success') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, status]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;

    // Initialize audio context in direct user gesture to enable verification sounds
    if (typeof window !== 'undefined' && window.initHopeJarAudio) {
      window.initHopeJarAudio();
    }

    setStatus('loading');
    setErrorMessage('');

    // Developer test key bypass
    const key = licenseKey.trim().toUpperCase();
    if (key === 'DEMO-KEY' || key === 'SUPPORT-BROKE-CREATOR' || key === 'TESTKEY') {
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
          onUnlock(licenseKey);
        }, 1500);
      }, 1000);
      return;
    }

    try {
      // Serverless proxy call to bypass CORS limits on the client side
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_permalink: productPermalink || 'boxofhope',
          license_key: licenseKey.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && !data.uses_limit_reached) {
        setStatus('success');
        setTimeout(() => {
          onUnlock(licenseKey.trim());
        }, 1500);
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Invalid license key. Make sure to copy the exact key from your Gumroad receipt.');
      }
    } catch (err) {
      console.error("Verification error:", err);
      setStatus('error');
      setErrorMessage('Verification failed due to a network connection issue. Please check your internet connection or try again later.');
    }
  };

  return (
    <div className="license-overlay">
      <div className="license-card">
        <button 
          type="button"
          className="license-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
          disabled={status === 'success'}
        >
          &times;
        </button>
        <div className="license-lock-icon">🔒</div>
        <h2>Unlock the Box of Hope</h2>
        
        <p className="license-description">
          To open this sealed jar and access all <strong>45 notes of hope for tough days</strong>, please support the 30-day turnaround challenge.
        </p>

        <div className="pricing-box">
          <span className="pwyw-badge">Pay What You Want</span>
          <p className="price-tag"><strong>$5.00</strong></p>
          <p className="price-details">
            Give a little more if you want to support a broke 27-year-old creator trying to turn his life around before his 28th birthday.
          </p>
        </div>

        <a 
          href={gumroadUrl || "https://gumroad.com"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="buy-button-link"
        >
          🎁 Get License Key on Gumroad
        </a>

        <div className="divider-text">Already have a key? Enter it below:</div>

        <form onSubmit={handleVerify} className="license-form">
          <input 
            type="text" 
            placeholder="Pasted license key (e.g. XXXX-XXXX-…)" 
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            spellCheck={false}
            className="license-input"
          />
          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success' || !licenseKey.trim()}
            className={`verify-btn ${status}`}
          >
            {status === 'idle' && "Unlock Box of Hope"}
            {status === 'loading' && "Verifying Key… ✨"}
            {status === 'error' && "Retry Unlock"}
            {status === 'success' && "Unlocked! Enjoy the Jar 🎉"}
          </button>
        </form>

        {status === 'error' && <p className="error-text">{errorMessage}</p>}
        {status === 'success' && <p className="success-text">Success! Your Box of Hope is permanently unlocked.</p>}

      </div>
    </div>
  );
};

export default LicenseModal;
