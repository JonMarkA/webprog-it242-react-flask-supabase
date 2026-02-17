// frontend/src/components/Guestbook.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './Guestbook.css';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredEntry, setHoveredEntry] = useState(null);
  
  const formRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL || 'https://webprog-it242-react-flask-supabase-xquc.onrender.com/api';

  const fetchEntries = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/guestbook`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await axios.put(`${API_URL}/guestbook/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/guestbook`, formData);
      }
      
      setFormData({ name: '', message: '' });
      setEditingId(null);
      await fetchEntries();
      
      // Scroll to top after successful submission
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setFormData({ name: entry.name, message: entry.message });
    setEditingId(entry.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_URL}/guestbook/${id}`);
        await fetchEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

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
      className="guestbook-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="guestbook-card">
        <div className="guestbook-header">
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            📖 Guestbook
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Leave a message for future visitors!
          </motion.p>
        </div>

        <div className="guestbook-content">
          {/* Form */}
          <motion.div 
            ref={formRef}
            className="form-container"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fas fa-user"></i>
                  Your Name
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-pen"></i>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fas fa-comment"></i>
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-actions">
                <motion.button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Submitting...
                    </>
                  ) : editingId ? (
                    <>
                      <i className="fas fa-edit"></i>
                      Update Entry
                    </>
                  ) : (
                    <>
                      <i className="fas fa-pen"></i>
                      Sign Guestbook
                    </>
                  )}
                </motion.button>
                
                {editingId && (
                  <motion.button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({ name: '', message: '' });
                      setEditingId(null);
                    }}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-times"></i>
                    Cancel
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Entries Section */}
          <motion.div 
            className="entries-section"
            variants={itemVariants}
          >
            <div className="entries-header">
              <h3>
                <i className="fas fa-comments"></i>
                Recent Messages
              </h3>
              <motion.span 
                className="entries-count"
                key={entries.length}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
              </motion.span>
            </div>

            <AnimatePresence mode="popLayout">
              {entries.length === 0 ? (
                <motion.div 
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <i className="fas fa-book-open"></i>
                  <p>No entries yet. Be the first to sign the guestbook!</p>
                  <motion.button 
                    className="btn btn-primary"
                    onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-pen"></i>
                    Write Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  className="entries-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className="entry-card"
                      variants={itemVariants}
                      layout
                      whileHover={{ scale: 1.02, x: 10 }}
                      onHoverStart={() => setHoveredEntry(entry.id)}
                      onHoverEnd={() => setHoveredEntry(null)}
                    >
                      <div className="entry-header">
                        <div className="entry-author">
                          <motion.div 
                            className="author-avatar"
                            animate={hoveredEntry === entry.id ? { 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {getInitials(entry.name)}
                          </motion.div>
                          <div className="author-info">
                            <h4>{entry.name}</h4>
                            <span className="entry-date">
                              <i className="far fa-calendar-alt"></i>
                              {formatDate(entry.created_at)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="entry-actions">
                          <motion.button 
                            className="btn-icon edit"
                            onClick={() => handleEdit(entry)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </motion.button>
                          <motion.button 
                            className="btn-icon delete"
                            onClick={() => handleDelete(entry.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </motion.button>
                        </div>
                      </div>
                      
                      <motion.p 
                        className="entry-message"
                        animate={hoveredEntry === entry.id ? { 
                          borderLeftColor: ['var(--primary)', 'var(--secondary)', 'var(--primary)']
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {entry.message}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Guestbook;