import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.scss';

const BlogDetail = () => {
  // Lấy id từ URL
  const { id } = useParams();  // Lấy id từ tham số URL
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra nếu id có sẵn trong URL
    if (id) {
      console.log('Fetching post with id:', id);  // Kiểm tra id

      setLoading(true); // Đặt lại loading = true khi bắt đầu tải dữ liệu

      // Fetch dữ liệu bài viết từ API
      fetch(`http://localhost:8083/post/get/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data);  // Kiểm tra dữ liệu nhận được
          setPost(data);
          setLoading(false);  // Đặt loading = false khi nhận được dữ liệu
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Nếu không tìm thấy bài viết, hiển thị thông báo
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="container">
      <div className="blog-detail">
        {/* Tiêu đề bài viết */}
        <h1>{post.title}</h1>
        {/* Ngày đăng bài viết */}
        <p className="date">{post.date}</p>
        {/* Hiển thị ảnh nếu có */}
        {post.image && <img src={require(`../../../assets/admin/img_blog/${post.image}`)} alt={post.title} className="blog-image" />}
        {/* Nội dung bài viết */}
        <p>{post.content}</p>

        {/* Link để quay lại trang Blog */}
        <Link to="/blog" className="back-to-blog">Back to Blog</Link>
      </div>
    </div>
  );
};

export default BlogDetail;
