// D:\Project Java\ProjectJava_GroupF_Topic5\fe\koifish\src\pages\users\blogPage\component\CreateBlogPostPopup.js

import React, { useState } from 'react';
import './style.scss';
import PaymentSection from './PaymentSection'; 

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

 
    const newPost = {
      id: Math.floor(Math.random() * 1000), 
      title,
      content,
      username,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: image ? URL.createObjectURL(image) : null,
    };

    onCreate(newPost);

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Tạo bài viết</h2>
        <form onSubmit={handleSubmit}>
          <label>Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Nội dung:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <label>Tên người tạo:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Ảnh bài viết:</label>
          <input type="file" onChange={handleImageChange} />

          <div className="popup-buttons">
            <button type="submit">Tạo</button>
            <button type="button" onClick={onClose}>Hủy tạo</button>
          </div>
        </form>
      </div>
      <PaymentSection /> {}
    </div>
  );
};

export default CreateBlogPostPopup;
