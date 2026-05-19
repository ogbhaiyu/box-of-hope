// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { affirmations } from './affirmations';

// Components
import Jar from './components/Jar';
import ScrollModal from './components/ScrollModal';
import LicenseModal from './components/LicenseModal';

// GUMROAD SETTINGS
const GUMROAD_PRODUCT_URL = "https://jyotiraditya56.gumroad.com/l/mcfpgg"; 
const GUMROAD_PRODUCT_PERMALINK = "mcfpgg"; 

// Web Audio API sound synthesizers (no external dependencies, 100% reliable)
const playDrawSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    
    // Magical soft arpeggio: C4 -> E4 -> G4 -> C5
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.4);
    });
  } catch (e) {
    console.warn("AudioContext blocked or not supported", e);
  }
};

const playSuccessSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    
    // Triumphant double chime: G5 -> C6
    // First Note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(783.99, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);
    
    // Second Note
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.50, now + 0.1);
    gain2.gain.setValueAtTime(0, now + 0.1);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.1 + 0.45);
  } catch (e) {
    console.warn("AudioContext blocked or not supported", e);
  }
};

function App() {
  const [currentAffirmation, setCurrentAffirmation] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const savedUnlock = localStorage.getItem('hope_jar_unlocked');
    if (savedUnlock === 'true') {
      setIsUnlocked(true);
    }

    const generatedParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(generatedParticles);
  }, []);

  const handleDraw = () => {
    if (!isUnlocked) {
      setShowLicenseModal(true);
      return;
    }

    playDrawSound();
    setIsDrawing(true);

    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * affirmations.length);
      
      if (currentAffirmation && affirmations[randomIndex].id === currentAffirmation.id) {
        randomIndex = (randomIndex + 1) % affirmations.length;
      }

      const drawn = affirmations[randomIndex];
      setCurrentAffirmation(drawn);
      setIsDrawing(false);
    }, 1500);
  };

  const handleUnlock = (licenseKey) => {
    playSuccessSound();
    setIsUnlocked(true);
    localStorage.setItem('hope_jar_unlocked', 'true');
    localStorage.setItem('hope_license_key', licenseKey);
    setShowLicenseModal(false);
  };


  return (
    <>
      <div className="background-particles">
        {particles.map(p => (
          <div 
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>

      <header className="app-header">
        <div className="brand-subtitle">✨ 30-Day Turnaround Challenge</div>
        <h1 className="brand-title">The Box of Hope</h1>
        <p className="brand-desc">
          When life feels heavy, pull a reminder from the jar. A simple, raw truth to get you through the next hour.
        </p>
      </header>

      <main className="app-main">
        <Jar 
          onDraw={handleDraw} 
          isDrawing={isDrawing} 
          isLocked={!isUnlocked}
        />

        {/* Locked Hero Card CTA */}
        {!isUnlocked && (
          <div className="lock-hero-card" aria-live="polite">
            <h2 className="lock-hero-title">🔒 The Box of Hope is Sealed</h2>
            <p className="lock-hero-body">
              Inside are <strong>45 encouraging notes</strong> for the days you want to give up. Warm validation, raw truths, and comfort when life feels heavy.
            </p>
            <p className="broke-story">
              Created by a broke 27-year-old trying to change his life before his 28th birthday. Your support feeds a dream.
            </p>
            <button className="unlock-now-btn" onClick={() => setShowLicenseModal(true)}>
              Unlock the Box ($5)
            </button>
          </div>
        )}
      </main>

      {currentAffirmation && (
        <ScrollModal 
          affirmation={currentAffirmation} 
          onClose={() => setCurrentAffirmation(null)} 
        />
      )}

      {showLicenseModal && (
        <LicenseModal 
          onUnlock={handleUnlock}
          onClose={() => setShowLicenseModal(false)}
          gumroadUrl={GUMROAD_PRODUCT_URL}
          productPermalink={GUMROAD_PRODUCT_PERMALINK}
        />
      )}

      <footer className="app-footer">
        <p className="footer-challenge-text">
          Made with 🤎 by a 27-year-old trying to change his life before his 28th birthday.<br />
          Every PWYW purchase feeds a dream. <strong>{isUnlocked ? "Thank you for unlocking the Box! 🙏" : "Unlock the full Box of Hope to support!"}</strong>
        </p>
      </footer>
    </>
  );
}

export default App;
