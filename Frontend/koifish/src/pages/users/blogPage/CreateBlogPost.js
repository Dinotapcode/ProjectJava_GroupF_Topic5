import React, { useState, useEffect } from 'react';
import './style.scss';

const API_BASE_URL = "http://localhost:8083/api";

const CreateBlogPostPopup = ({ onClose, onCreate, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const userId = sessionStorage.getItem("userId");  // Retrieve userId from sessionStorage

  useEffect(() => {
    if (userId) {
      const fetchUserName = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/user/${userId}`,
            {
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              },
            }
          );
          const data = await response.json();
          setUsername(data.userName);
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      };
      fetchUserName();
    }
  }, [userId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('userId', userId);  // Add userId to the FormData
    onSuccess('Your post will be reviewed');  // Success message
    onClose();  // Close the popup
    // Sending the data to backend
    fetch(`${API_BASE_URL}/public/post/add`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(newPost => {
        onCreate(newPost);
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <label>Image:</label>
          <input accept="image/*" type="file" onChange={handleImageChange} />

          <div className="popup-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPostPopup;
