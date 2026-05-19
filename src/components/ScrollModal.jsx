// src/components/ScrollModal.jsx
import React, { useState } from 'react';

const ScrollModal = ({ affirmation, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const textToCopy = `✨ Note from the Box of Hope ✨\n\n"${affirmation.text}"\n\n---\nDraw yours at: ${window.location.origin}\nHelp a broke creator turn 28: Buy the full jar on Gumroad!`;
    navigator.clipboard.writeText(textToCopy);
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
          <button className="scroll-action-btn share" onClick={handleShare}>
            {copied ? "✨ Copied to Clipboard!" : "🔗 Share this Reminder"}
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
