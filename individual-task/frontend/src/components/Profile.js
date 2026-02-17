// frontend/src/components/Profile.js
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './Profile.css';

function Profile() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skills = [
    { name: 'React', level: 5, icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'Nest.js', level: 10, icon: 'fab fa-node', color: '#E0234E' },
    { name: 'Supabase', level: 80, icon: 'fas fa-database', color: '#3ECF8E' },
    { name: 'JavaScript', level: 5, icon: 'fab fa-js', color: '#F7DF1E' },
    { name: 'TypeScript', level: 10, icon: 'fab fa-typescript', color: '#3178C6' },
    { name: 'Node.js', level: 10, icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Python', level: 10, icon: 'fab fa-python', color: '#3776AB' },
    { name: 'HTML/CSS', level: 90, icon: 'fa-file-code', color: '#E10098' }
  ];

  const stats = [
    { value: '4', label: 'Projects Completed', icon: 'fas fa-check-circle' },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="profile-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="profile-card">
        {/* Profile Header */}
        <motion.div 
          className="profile-header"
          variants={itemVariants}
        >
          <div className="avatar-wrapper">
            <div className="avatar-ring"></div>
            <motion.div 
              className="avatar"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="frontend/public/62441184-e377-4735-bc1d-394e39924922.jpg" 
                alt="Profile" 
                className="profile-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200';
                }}
              />
            </motion.div>
          </div>

          <h1 className="glitch-text">Jonathan Mark Agbulos</h1>
          
          <div className="typewriter">
            <TypeAnimation
              sequence={[
                'Gamer',
                2000,
                'IT Student',
                2000,
                'UI/UX Enthusiast',
                2000,
                'Problem Solver',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <motion.div 
            className="badge-container"
            variants={containerVariants}
          >
            {[
              { icon: 'fas fa-map-marker-alt', text: 'Asia Pacific College' },
              { icon: 'fas fa-briefcase', text: 'Available for work' },
              { icon: 'fas fa-graduation-cap', text: 'Arellano University' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="badge"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={badge.icon}></i>
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Content */}
        <div className="profile-content" ref={ref}>
          {/* Bio Section */}
          <motion.div 
            className="section"
            variants={itemVariants}
          >
            <h2 className="section-title">
              <i className="fas fa-user"></i>
              About Me
            </h2>
            <motion.p 
              className="bio-text"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Would prefer to take it easy and willing to learn.
            </motion.p>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            className="section"
            variants={itemVariants}
          >
            <h2 className="section-title">
              <i className="fas fa-code"></i>
              Technical Skills
            </h2>
            <motion.div 
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  custom={index}
                >
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                  <h4>{skill.name}</h4>
                  <div className="skill-level">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="section"
            variants={itemVariants}
          >
            <h2 className="section-title">
              <i className="fas fa-chart-bar"></i>
              Achievements
            </h2>
            <motion.div 
              className="stats-grid"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={stat.icon} style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;