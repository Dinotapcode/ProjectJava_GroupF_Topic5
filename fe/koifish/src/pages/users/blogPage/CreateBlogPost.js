import React, { useState } from 'react';
import './style.scss';

const CreateBlogPost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const newPost = {
      id: Date.now(),
      title,
      content,
      username,
      date: currentDate,
      image: image ? URL.createObjectURL(image) : null,
    };

    onSubmit(newPost);
    setTitle('');
    setContent('');
    setUsername('');
    setImage(null);
  };

  return (
    <div className="create-blog-post">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Enter Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Enter Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
