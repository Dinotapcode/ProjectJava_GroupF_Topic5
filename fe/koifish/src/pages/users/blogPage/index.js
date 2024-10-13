import React from 'react';
import './style.scss';

const blogPosts = [
  {
    title: 'Understanding Koi Fish in Feng Shui',
    date: 'October 12, 2024',
    content: 'Koi fish have long been associated with good fortune and abundance. In Feng Shui, they are believed to bring wealth and success...',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnkBilMPFx4I0f58fTUKNAEg3AKxpTZoxmA&s'
  },
  {
    title: 'How to Choose the Right Pond for Your Koi',
    date: 'October 10, 2024',
    content: 'Selecting the appropriate pond size, depth, and location is essential for the well-being of your Koi fish and enhancing Feng Shui benefits...',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRiwoMGHbzvuJvQ9HV6r6M0OZwUeSpHHckg&s'
  },
  {
    title: 'The Five Elements and Koi Fish Selection',
    date: 'October 8, 2024',
    content: 'Each element (wood, fire, earth, metal, water) plays a crucial role in determining the best type of Koi fish for your pond based on your destiny...',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xwu48pYVrEuhp_rFY-hjn30zIt0nQtKiDg&s'
  }
];

// Danh sách bài viết gần đây
const recentPosts = blogPosts.slice(0, 3); // Lấy 3 bài viết gần đây

function BlogPost({ title, date, content, image }) {
  return (
    <div className="blog-post">
      <img src={image} alt={title} className="blog-image" />
      <h2>{title}</h2>
      <p className="date">{date}</p>
      <p>{content}</p>
    </div>
  );
}

function RecentPost({ title, date }) {
  return (
    <div className="recent-post">
      <h4>{title}</h4>
      <p className="date">{date}</p>
    </div>
  );
}

function BlogPage() {
  return (
    <div className="blog-page">
      <div className="navbar">
        <h2>BLOG</h2>
      </div>
      <div className="blog-layout">
        <div className="blog-container">
          <h1>Feng Shui Koi Fish Blog</h1>
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              date={post.date}
              content={post.content}
              image={post.image}
            />
          ))}
        </div>
        <div className="recent-posts">
          <h3>Recent Posts</h3>
          {recentPosts.map((post, index) => (
            <RecentPost
              key={index}
              title={post.title}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
