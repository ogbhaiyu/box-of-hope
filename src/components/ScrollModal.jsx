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
          text: `✨ Note from the Box of Hope ✨\n\n"${affirmation.text}"`,
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
            <div className="scroll-meditation">
              <span className="meditation-step">🧘 Close your eyes</span>
              <span className="meditation-step">💨 Take a deep breath</span>
              <span className="meditation-step">✨ Exhale, and read:</span>
            </div>
            
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
          
          <div className="share-buttons-grid">
            <button className="share-grid-btn whatsapp" onClick={shareWhatsApp} aria-label="Share on WhatsApp">
              <span className="share-icon">💬</span> WhatsApp
            </button>
            <button className="share-grid-btn twitter" onClick={shareX} aria-label="Share on X (Twitter)">
              <span className="share-icon">𝕏</span> X / Twitter
            </button>
            <button className="share-grid-btn facebook" onClick={shareFacebook} aria-label="Share on Facebook">
              <span className="share-icon">👥</span> Facebook
            </button>
            <button className="share-grid-btn native" onClick={shareNative} aria-label="Share to other apps">
              <span className="share-icon">📱</span> Apps (IG/TikTok)
            </button>
          </div>

          <button className="scroll-action-btn copy" onClick={handleCopy}>
            {copied ? "✅ Copied to Clipboard!" : "🔗 Copy Text & Link"}
          </button>
          
          <button className="scroll-action-btn close" onClick={onClose}>
            Fold Scroll & Close
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ScrollModal;
