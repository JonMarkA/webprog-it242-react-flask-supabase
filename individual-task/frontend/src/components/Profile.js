// frontend/src/components/Profile.js
import React, { useEffect } from 'react';
import './Profile.css';

function Profile() {
  // Removed setSkills and setStats since they're not being used
  const skills = [
    { name: 'Supabase', level: 80, icon: 'fas fa-database' },
    { name: 'HTML/CSS', level: 90, icon: 'fab fa-css3' }
  ];

  const stats = [
    { value: '3', label: 'Projects' },
  ];

  // Animate skill bars on mount
  useEffect(() => {
    const skillBars = document.querySelectorAll('.skill-level-bar');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.width = bar.parentElement?.getAttribute('data-level') || '0%';
      }, index * 100);
    });
  }, []);

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src="/profile.jpg" 
            alt="Profile" 
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
        <h1>Jonathan Mark Agbulos</h1>
        <p className="profile-title">IT Student</p>
        <div className="profile-badges">
          <span className="badge">📍 Asia Pacific College</span>
          <span className="badge">💼 Available for work</span>
          <span className="badge">🎓 Arellano University Jose Abad Santos Campus</span>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Bio Section */}
        <div className="bio-section">
          <h2>About Me</h2>
          <p>
            I just enjoy and prefer to be on easy mode
          </p>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <i className={`${skill.icon} skill-icon`}></i>
                <h4>{skill.name}</h4>
                <div className="skill-level" data-level={`${skill.level}%`}>
                  <div 
                    className="skill-level-bar" 
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;