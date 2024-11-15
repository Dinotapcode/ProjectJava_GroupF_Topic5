import React, { useState } from 'react';
import './style.scss';

const CreateBlogPostPopup = ({ onClose, onCreate, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Random user_id for demo purposes
    const userId = Math.floor(Math.random() * 1000) + 1;

    // Creating FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    onSuccess('Your post will be reviewed');
    onClose();
    // Sending the data to backend
    fetch('http://localhost:8083/post/add', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(newPost => {
      onCreate(newPost);
      console.log('New blog post added');
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
