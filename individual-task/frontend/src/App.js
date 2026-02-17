// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Profile from './components/Profile';
import Guestbook from './components/Guestbook';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      {/* Custom Cursor Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Animated Background */}
      <div className="background-animation">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere delay"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-text">Portfolio</span>
            <span className="logo-dot">.</span>
          </motion.div>

          <div className="nav-tabs">
            <motion.button 
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-user"></i>
              <span>Profile</span>
              {activeTab === 'profile' && (
                <motion.div 
                  className="tab-indicator"
                  layoutId="tabIndicator"
                />
              )}
            </motion.button>

            <motion.button 
              className={`nav-tab ${activeTab === 'guestbook' ? 'active' : ''}`}
              onClick={() => setActiveTab('guestbook')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-book"></i>
              <span>Guestbook</span>
              {activeTab === 'guestbook' && (
                <motion.div 
                  className="tab-indicator"
                  layoutId="tabIndicator"
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' ? <Profile /> : <Guestbook />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container">
          <p>© 2026 Jonathan Mark. Made Render, Vercel, and Supabase</p>
          <div className="social-links">
            {/* GitHub */}
            <motion.a
              href="https://github.com/JonMarkA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/dyonasito/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-linkedin"></i>
            </motion.a>

            {/* Twitter/X - if you have it */}
            <motion.a
              href="https://facebook.com/dyonasito"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-facebook"></i>
            </motion.a>

            {/* Instagram - if you have it */}
            <motion.a
              href="https://www.instagram.com/dyonasito/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-instagram"></i>
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;