// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [skills, setSkills] = useState([
    { name: 'React', level: 90, icon: 'fab fa-react' },
    { name: 'Nest.js', level: 85, icon: 'fab fa-node' },
    { name: 'Supabase', level: 80, icon: 'fas fa-database' },
    { name: 'JavaScript', level: 95, icon: 'fab fa-js' },
    { name: 'HTML/CSS', level: 90, icon: 'fab fa-css3' },
    { name: 'Node.js', level: 85, icon: 'fab fa-node-js' }
  ]);

  const [stats, setStats] = useState([
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects' },
    { value: '15+', label: 'Clients' },
    { value: '5', label: 'Certifications' }
  ]);

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
        <h1>Your Name</h1>
        <p className="profile-title">Full Stack Developer</p>
        <div className="profile-badges">
          <span className="badge">📍 San Francisco, CA</span>
          <span className="badge">💼 Available for work</span>
          <span className="badge">🎓 Computer Science</span>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Bio Section */}
        <div className="bio-section">
          <h2>About Me</h2>
          <p>
            Passionate full-stack developer with expertise in building modern web applications.
            I love creating elegant solutions to complex problems and sharing knowledge with the
            developer community. When I'm not coding, you can find me hiking or reading tech blogs.
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