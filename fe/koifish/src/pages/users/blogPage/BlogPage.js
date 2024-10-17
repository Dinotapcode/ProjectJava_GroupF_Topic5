import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import img1 from '../../../assets/users/images/img_blog/anh1.jpg';
import img2 from '../../../assets/users/images/img_blog/anh2.jpg';
import img3 from '../../../assets/users/images/img_blog/anh3.jpg';
import CreateBlogPopup from './Popup';

// Initial blog posts
const initialBlogPosts = [
  {
    id: 1,
    title: 'Understanding Koi Fish in Feng Shui',
    date: 'October 12, 2024',
    content: 'Koi fish have long been associated with good fortune and abundance...',
    image: img1,
  },
  {
    id: 2,
    title: 'How to Choose the Right Pond for Your Koi',
    date: 'October 10, 2024',
    content: 'Selecting the appropriate pond size, depth, and location...',
    image: img2,
  },
  {
    id: 3,
    title: 'The Five Elements and Koi Fish Selection',
    date: 'October 8, 2024',
    content: 'Each element (wood, fire, earth, metal, water) plays a crucial role...',
    image: img3,
  }
];

const BlogPage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleCreatePost = (newPost) => {
    setBlogPosts([newPost, ...blogPosts]); // Add new post to the beginning of the list
  };

  return (
    <div className="container">
      <div className="blog-page">
        <div className="navbar">
          <h2>BLOG</h2>
        </div>
        <div className="blog-layout">
          <div className="blog-container">
            <h1>Feng Shui Koi Fish Blog</h1>
            {blogPosts.map((post) => (
              <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                content={post.content}
                image={post.image}
              />
            ))}
          </div>
          <div className="recent-posts">
            <h3>Recent Posts</h3>
            {blogPosts.slice(0, 3).map((post) => (
              <RecentPost
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
              />
            ))}
          </div>
        </div>
        <button className="create-blog-btn" onClick={togglePopup}>
          + Create Post
        </button>
        {isPopupOpen && (
          <CreateBlogPopup onClose={togglePopup} onCreate={handleCreatePost} />
        )}
      </div>
    </div>
  );
};

// RecentPost and BlogPost components (keep these unchanged)
function RecentPost({ id, title, date }) {
  return (
    <div className="recent-post">
      <h4><Link to={`/post/${id}`}>{title}</Link></h4>
      <p className="date">{date}</p>
    </div>
  );
}

function BlogPost({ id, title, date, content, image }) {
  return (
    <div className="blog-post">
      <img src={image} alt={title} className="blog-image" />
      <h2>{title}</h2>
      <p className="date">{date}</p>
      <p>{content}</p>
      <Link to={`/post/${id}`} className="read-more">Read more</Link>
    </div>
  );
}

export default BlogPage;
