// src/components/ScrollModal.jsx
import React, { useState } from 'react';

const ScrollModal = ({ affirmation, onClose }) => {
  const [copied, setCopied] = useState(false);

  const textToShare = `✨ Note from the Box of Hope ✨\n\n"${affirmation.text}"\n\nDraw yours at: ${window.location.origin}`;

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Box of Hope',
          text: textToShare,
          url: window.location.origin,
        });
      } catch (err) {
        console.warn('Native share failed or canceled', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="scroll-modal-overlay">
      <div className="scroll-modal-content">
        
        {/* Top Roller */}
        <div className="scroll-roller top">
          <div className="roller-rod"></div>
          <div className="roller-knob left"></div>
          <div className="roller-knob right"></div>
        </div>
        
        {/* Parchment Paper */}
        <div className="scroll-paper">
          <div className="parchment-content">
            <span className="scroll-category-badge">{affirmation.category}</span>
            <p className="scroll-text">"{affirmation.text}"</p>
            <div className="scroll-divider">🌸</div>
            <p className="scroll-footer">Take a moment to let this sink in.</p>
          </div>
        </div>
        
        {/* Bottom Roller */}
        <div className="scroll-roller bottom">
          <div className="roller-rod"></div>
          <div className="roller-knob left"></div>
          <div className="roller-knob right"></div>
        </div>

        {/* Action Buttons */}
        <div className="scroll-actions">
          <div className="share-section-title">✨ Share this reminder of hope:</div>
          
          <div className="share-buttons-container">
            <div className="share-buttons-grid">
              <button className="share-grid-btn whatsapp" onClick={shareWhatsApp} aria-label="Share on WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp
              </button>
              <button className="share-grid-btn twitter" onClick={shareX} aria-label="Share on X (Twitter)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </button>
              <button className="share-grid-btn facebook" onClick={shareFacebook} aria-label="Share on Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </button>
              <button className="share-grid-btn native" onClick={shareNative} aria-label="Share to other apps">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                Apps (IG/TikTok)
              </button>
            </div>

            <button className="scroll-action-btn copy" onClick={handleCopy}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              {copied ? "Copied to Clipboard!" : "Copy Text & Link"}
            </button>
          </div>
          
          <button className="scroll-action-btn close" onClick={onClose}>
            Fold Scroll & Close
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ScrollModal;
