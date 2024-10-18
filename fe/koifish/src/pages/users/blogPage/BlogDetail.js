import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Add Link import
import './style.scss';
import img1 from '../../../assets/users/images/img_blog/anh1.jpg';
import img2 from '../../../assets/users/images/img_blog/anh2.jpg';
import img3 from '../../../assets/users/images/img_blog/anh3.jpg';

// Danh sách bài viết
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Koi Fish in Feng Shui',
    date: 'October 12, 2024',
    content: 'KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI',
    image: img1
  },
  {
    id: 2,
    title: 'How to Choose the Right Pond for Your Koi',
    date: 'October 10, 2024',
    content: 'KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI',
    image: img2
  },
  {
    id: 3,
    title: 'The Five Elements and Koi Fish Selection',
    date: 'October 8, 2024',
    content: 'KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI KOI',
    image: img3
  }
];

const recentPosts = blogPosts.slice(0, 3); // Lấy 3 bài viết gần đây

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

function RecentPost({ id, title, date }) {
  return (
    <div className="recent-post">
      <h4><Link to={`/post/${id}`}>{title}</Link></h4>
      <p className="date">{date}</p>
    </div>
  );
}

const BlogDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const post = blogPosts.find(post => post.id === parseInt(id)); // Tìm bài viết theo id
  
  if (!post) {
    return <h2>Không tìm thấy bài viết!</h2>;
  }

  return (
    <div className='container'>
      <div className="blog-layout"> {}
        <div className="blog-detail">
          <h1>{post.title}</h1>
          <p className="date">{post.date}</p>
          <img src={post.image} alt={post.title} className="blog-image" />
          <p>{post.content}</p>
        </div>
        <div className="recent-posts"> {}
          <h3>Các bài viết gần đây</h3>
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
  );
}

export default BlogDetail;
