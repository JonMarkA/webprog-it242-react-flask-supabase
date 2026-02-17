// frontend/src/App.js
import React, { useState } from 'react';
import Profile from './components/Profile';
import Guestbook from './components/Guestbook';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">Portfolio</span>
            <span className="logo-dot">.</span>
          </div>
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i>
              Profile
            </button>
            <button 
              className={`nav-tab ${activeTab === 'guestbook' ? 'active' : ''}`}
              onClick={() => setActiveTab('guestbook')}
            >
              <i className="fas fa-book"></i>
              Guestbook
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {activeTab === 'profile' ? <Profile /> : <Guestbook />}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Your Portfolio. Powered by React & Vercel</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;