import React from 'react';
import { useParams } from 'react-router-dom';
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

const BlogDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const post = blogPosts.find(post => post.id === parseInt(id)); // Tìm bài viết theo id
  
    if (!post) {
      return <h2>Post not found!</h2>;
    }
  
    return (
      <div className='container'>
      <div className="blog-detail">
        <h1>{post.title}</h1>
        <p className="date">{post.date}</p>
        <img src={post.image} alt={post.title} className="blog-image" />
        <p>{post.content}</p>
      </div>
      </div>
    );
  }
  
  export default BlogDetail;