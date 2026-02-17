// frontend/src/components/Guestbook.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Guestbook.css';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="guestbook-container">
      <div className="guestbook-header">
        <h2>📖 Guestbook</h2>
        <p>Leave a message for future visitors!</p>
      </div>

      <div className="guestbook-content">
        <form onSubmit={handleSubmit} className="guestbook-form">
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Your Name
            </label>
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

          <div className="form-group">
            <label htmlFor="message">
              <i className="fas fa-comment"></i> Your Message
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
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
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
            </button>
            
            {editingId && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setFormData({ name: '', message: '' });
                  setEditingId(null);
                }}
                disabled={loading}
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="entries-section">
          <div className="entries-header">
            <h3>
              <i className="fas fa-comments"></i> Recent Messages
            </h3>
            <span className="entries-count">
              {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-book-open"></i>
              <p>No entries yet. Be the first to sign the guestbook!</p>
            </div>
          ) : (
            <div className="entries-list">
              {entries.map(entry => (
                <div key={entry.id} className="entry-card">
                  <div className="entry-header">
                    <div className="entry-author">
                      <div className="author-avatar">
                        {getInitials(entry.name)}
                      </div>
                      <div className="author-info">
                        <h4>{entry.name}</h4>
                        <span className="entry-date">
                          <i className="far fa-calendar-alt"></i>
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="entry-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEdit(entry)}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDelete(entry.id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  
                  <p className="entry-message">{entry.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Guestbook;