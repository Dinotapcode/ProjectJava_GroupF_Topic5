import React, { useState } from 'react';
import './style.scss'; // Ensure you have styles to display the popup correctly

const CreateBlogPostPopup = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new blog post object
    const newPost = {
      id: Math.floor(Math.random() * 1000), // Temporary ID
      title,
      content,
      username,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: image ? URL.createObjectURL(image) : null
    };

    // Call the onCreate callback function to add the new post
    onCreate(newPost);

    // Close the popup after creating the post
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Blog Post</h2>
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

          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />

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
