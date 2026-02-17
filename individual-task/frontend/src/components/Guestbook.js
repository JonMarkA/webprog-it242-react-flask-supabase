// src/components/Guestbook.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Guestbook.css';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ name: '', message: '' });
    setEditingId(null);
    fetchEntries();
  };

  const handleEdit = (entry) => {
    setFormData({ name: entry.name, message: entry.message });
    setEditingId(entry.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEntries();
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
        />
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? 'Update' : 'Sign'} Guestbook
        </button>
        {editingId && (
          <button onClick={() => {
            setFormData({ name: '', message: '' });
            setEditingId(null);
          }}>
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