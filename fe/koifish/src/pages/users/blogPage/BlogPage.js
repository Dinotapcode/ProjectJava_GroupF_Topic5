import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import img1 from '../../../assets/users/images/img_blog/anh1.jpg';
import img2 from '../../../assets/users/images/img_blog/anh2.jpg';
import img3 from '../../../assets/users/images/img_blog/anh3.jpg';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Koi Fish in Feng Shui',
    date: 'October 12, 2024',
    content: 'Koi fish have long been associated with good fortune and abundance. In Feng Shui, they are believed to bring wealth and success...',
    // image: img1
  },
  {
    id: 2,
    title: 'How to Choose the Right Pond for Your Koi',
    date: 'October 10, 2024',
    content: 'Selecting the appropriate pond size, depth, and location is essential for the well-being of your Koi fish and enhancing Feng Shui benefits...',
    // image: img2
  },
  {
    id: 3,
    title: 'The Five Elements and Koi Fish Selection',
    date: 'October 8, 2024',
    content: 'Each element (wood, fire, earth, metal, water) plays a crucial role in determining the best type of Koi fish for your pond based on your destiny...',
    // image: img3
  }
];

// Danh sách bài viết gần đây
const recentPosts = blogPosts.slice(0, 3); // Lấy 3 bài viết gần đây

function BlogPost({ id, title, date, content, image }) {
  return (
    <div className="blog-post">
      <img src={image} alt={title} className="blog-image" />
      <h2>{title}</h2>
      <p className="date">{date}</p>
      <p>{content}</p>
      {/* Link tới trang chi tiết bài viết */}
      <Link to={`/post/${id}`} className="read-more">Read more</Link>
    </div>
  );
}

function RecentPost({ id, title, date }) {
  return (
    <div className="recent-post">
      <h4><Link to={`/post/${id}`}>{title}</Link></h4>
      <p className="date">{date}</p>
    </div>
  );
}

const BlogPage = () => {
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
            {recentPosts.map((post) => (
              <RecentPost
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
