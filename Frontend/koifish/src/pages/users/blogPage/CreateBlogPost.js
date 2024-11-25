import React, { useState, useEffect } from 'react';
import './style.scss';

const API_BASE_URL = "http://localhost:8083/api";

const CreateBlogPostPopup = ({ onClose, onCreate, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null); // Thêm trạng thái lỗi

  const userId = sessionStorage.getItem("userId");  // Retrieve userId from sessionStorage

  useEffect(() => {
    if (userId) {
      const fetchUserName = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            headers: {
              Authorization: sessionStorage.getItem('authHeader'),
            }
          });
          if (!response.ok) throw new Error('Failed to fetch user data');
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

    if (!title || !content || !image) {
      setError("Please fill in all fields and upload an image."); // Cập nhật thông báo lỗi
      return;
    }

    // Creating FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('userId', userId);  // Add userId to the FormData

    // Sending the data to backend
    fetch(`${API_BASE_URL}/public/post/add`, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error('Failed to create post');
        }
        alert('Bài đăng của bạn sẽ được duyệt trong 24h.');
        onClose();
        const textResponse = await response.text(); // Get the response as text first
        try {
          const jsonResponse = JSON.parse(textResponse); // Try to parse as JSON
          return jsonResponse;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.error('Response:', textResponse);  // Log the response content
          throw new Error('Response is not valid JSON');
        }
      })
      .then(newPost => {
        onCreate(newPost); // Create the post in the parent component
        onSuccess('Your post will be reviewed');
        onClose(); // Close the popup
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setError('An error occurred while creating the post'); // Hiển thị lỗi khi xảy ra sự cố
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Post</h2>
        {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}
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
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            required
          />

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
