import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import './style.scss';
import CreateBlogPostPopup from './CreateBlogPost';
import PaymentSection from './PaymentSection';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8083/post/all')
      .then(response => response.json())
      .then(data => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });

    fetch('http://localhost:8083/subscriptions/getAll')
      .then(response => response.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subscriptions:', error);
        setLoading(false);
      });
  }, []);

  const handleCreatePost = (newPost) => {
    setBlogPosts([newPost, ...blogPosts]);
    setShowPopup(false);
  };

  const handleSuccess = (message) => {
    alert(message);
  };

  return (
    <div className="container">
      <div className="blog-page">
        <h1>Blog</h1>
        <div className="blog-actions">
          <button className='create-blog-btn' onClick={() => setShowPopup(true)}>
            <FaPlus className='create-icons' />
          </button>
          <button className='payment-btn' onClick={() => setShowPaymentForm(true)}>
            <MdOutlinePayments className='payment-icons' />
          </button>
        </div>

        {showPopup && (
          <CreateBlogPostPopup
            onClose={() => setShowPopup(false)}
            onCreate={handleCreatePost}
            onSuccess={handleSuccess}
          />
        )}

        {showPaymentForm && (
          <div className="popup-overlay">
            <div className="popup-content">
              <PaymentSection
                onConfirmPayment={() => setShowPaymentForm(false)}
                subscriptions={subscriptions}
                onClose={() => setShowPaymentForm(false)}
              />
              <button className="close-payment-btn" onClick={() => setShowPaymentForm(false)}>Close</button>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading blog posts...</p>
        ) : (
          blogPosts.length > 0 ? (
            blogPosts.map((post) => {
              console.log('Post ID:', post.postId);
              return (
                <div key={post.postId} className="blog-post">
                  <img src={require(`../../../assets/admin/img_blog/${post.image}`)} alt={post.title} className="blog-image" />
                  <h2>{post.title}</h2>
                  <p className="date">{post.date}</p>
                  <p>{post.content.substring(0, 100)}...</p>
                  <Link to={`/blog/${post.postId}`} className="read-more">Read more</Link>
                </div>
              );
            })
          ) : (
            <p>No posts available</p>
          )
        )}
      </div>
    </div>
  );
};

export default BlogPage;
