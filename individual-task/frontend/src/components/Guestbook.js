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
    e.preventDefault(); // This prevents page reload
    setLoading(true);
    
    try {
      if (editingId) {
        await axios.put(`${API_URL}/guestbook/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/guestbook`, formData);
      }
      
      // Clear form and refresh
      setFormData({ name: '', message: '' });
      setEditingId(null);
      await fetchEntries();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setFormData({ name: entry.name, message: entry.message });
    setEditingId(entry.id);
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

  return (
    <div className="guestbook">
      <h2>Guestbook</h2>
      
      <form onSubmit={handleSubmit} className="guestbook-form">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : editingId ? 'Update Entry' : 'Sign Guestbook'}
        </button>
        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setFormData({ name: '', message: '' });
              setEditingId(null);
            }}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="entries">
        {entries.map(entry => (
          <div key={entry.id} className="entry">
            <h4>{entry.name}</h4>
            <p>{entry.message}</p>
            <small>{new Date(entry.created_at).toLocaleDateString()}</small>
            <div className="entry-actions">
              <button onClick={() => handleEdit(entry)}>Edit</button>
              <button onClick={() => handleDelete(entry.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guestbook;