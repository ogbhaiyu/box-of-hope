// src/components/Jar.jsx
import React from 'react';

const Jar = ({ onDraw, isDrawing, isLocked }) => {
  return (
    <div 
      className={`jar-wrapper ${isDrawing ? 'drawing' : ''} ${isLocked ? 'locked' : ''}`} 
      onClick={!isDrawing ? onDraw : undefined}
      role="button"
      tabIndex={0}
      aria-label="Affirmation Jar. Tap to draw a note."
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isDrawing) {
          e.preventDefault();
          onDraw();
        }
      }}
    >
      <div className="jar-container">
        {/* Glow effect background */}
        <div className="jar-glow"></div>
        
        {/* SVG Jar design */}
        <svg className="jar-svg" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lid Lid */}
          <path d="M70 20C70 14.4772 74.4772 10 80 10H120C125.523 10 130 14.4772 130 20V30H70V20Z" fill="url(#lidGlow)" stroke="#ffd700" strokeWidth="2"/>
          <rect x="65" y="30" width="70" height="8" rx="4" fill="#d4af37" stroke="#b8860b" strokeWidth="1.5"/>
          
          {/* Jar Neck */}
          <rect x="75" y="38" width="50" height="20" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
          
          {/* Ribbon around neck */}
          <path d="M72 45H128V53H72V45Z" fill="#e25858" rx="2"/>
          <circle cx="100" cy="49" r="5" fill="#ffd700"/>
          
          {/* Jar Body */}
          <path d="M75 58C60 68 50 85 50 110V220C50 245 70 265 95 265H105C130 265 150 245 150 220V110C150 85 140 68 125 58V58H75Z" 
            fill="url(#glassGrad)" 
            stroke="url(#borderGrad)" 
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          
          {/* Inside Liquid/Glow base */}
          <path d="M54 130V220C54 240 70 256 90 256H110C130 256 146 240 146 220V130C146 130 120 140 100 130C80 120 54 130 54 130Z" 
            fill="url(#innerGlow)"
          />
          
          {/* Label inside jar */}
          <g className="jar-label">
            <rect x="70" y="150" width="60" height="35" rx="3" fill="#faf0e6" stroke="#d2b48c" strokeWidth="2"/>
            <text x="100" y="167" textAnchor="middle" fill="#5c4033" fontSize="10" fontWeight="bold" fontFamily="Lora, serif">BOX OF</text>
            <text x="100" y="179" textAnchor="middle" fill="#e25858" fontSize="11" fontWeight="bold" fontFamily="Lora, serif">HOPE</text>
          </g>
 
          {/* Reflections/Highlights */}
          <path d="M60 110C60 90 68 78 78 70" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M57 130V210" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M143 130V210" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="2" strokeLinecap="round"/>
 
          {/* Floating paper scrolls inside the jar (visual effect) */}
          <g className="floating-scrolls">
            <rect x="70" y="100" width="16" height="8" rx="2" fill="#fff" transform="rotate(15 70 100)" opacity="0.8"/>
            <rect x="115" y="115" width="16" height="8" rx="2" fill="#fff" transform="rotate(-25 115 115)" opacity="0.8"/>
            <rect x="80" y="210" width="16" height="8" rx="2" fill="#fff" transform="rotate(45 80 210)" opacity="0.7"/>
            <rect x="105" y="200" width="16" height="8" rx="2" fill="#fff" transform="rotate(-15 105 200)" opacity="0.85"/>
          </g>
 
          {/* Glowing particle stars */}
          <g className="jar-stars">
            <circle cx="80" cy="120" r="2" fill="#fff" className="star-fast"/>
            <circle cx="120" cy="100" r="3" fill="#ffe4b5" className="star-slow"/>
            <circle cx="95" cy="225" r="2.5" fill="#fff" className="star-medium"/>
            <circle cx="70" cy="190" r="2" fill="#ffe4b5" className="star-fast"/>
            <circle cx="130" cy="195" r="3.5" fill="#fff" className="star-slow"/>
            <circle cx="100" cy="135" r="1.5" fill="#fff" className="star-medium"/>
          </g>
 
          {/* Gradients definitions */}
          <defs>
            <linearGradient id="lidGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#daa520" />
              <stop offset="100%" stopColor="#8b6508" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="90%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.25)" />
            </linearGradient>
            <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
            </linearGradient>
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.35)" />
              <stop offset="60%" stopColor="rgba(255, 140, 0, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 69, 0, 0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
 
      <div className="jar-instructions">
        {isLocked ? (
          <span className="instruction-text lock-text">🔒 Tap Jar to Unlock ($5)</span>
        ) : isDrawing ? (
          <span className="instruction-text drawing-text">Reaching into the jar… ✨</span>
        ) : (
          <span className="instruction-text tap-text">Tap the Jar to Draw a Note ✨</span>
        )}
      </div>
    </div>
  );
};

export default Jar;
