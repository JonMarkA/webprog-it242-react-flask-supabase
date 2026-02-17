// frontend/src/App.js
import React from 'react';
import Profile from './components/Profile';
import Guestbook from './components/Guestbook';
import './App.css';

function App() {
  return (
    <div className="App">
      <Profile />
      <Guestbook />
    </div>
  );
}

export default App;