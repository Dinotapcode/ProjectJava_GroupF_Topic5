import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import "./style.scss";
import CreateBlogPostPopup from "./CreateBlogPost";
import PaymentSection from "./PaymentSection";

const API_BASE_URL = "http://localhost:8083/api";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/post/all/active`);
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  // Check user subscription status
  useEffect(() => {
    if (userId) {
      const checkSubscription = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/public/payment/check-subscription/${userId}`);
          if (!response.ok) throw new Error("Subscription check failed");
          const message = await response.text();
          setHasSubscription(message === "Người dùng đã đăng ký dịch vụ.");
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      };
      checkSubscription();
    }
  }, [userId]);

  // Fetch available subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/subscriptions/all/active`);
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleCreatePost = (newPost) => {
    setBlogPosts([newPost, ...blogPosts]);
    setShowPopup(false);
  };

  const handlePostButtonClick = () => {
    if (userId) {
      if (hasSubscription) {
        setShowPopup(true);
      } else {
        setShowPaymentForm(true);
      }
    } else {
      alert("Vui lòng đăng nhập để đăng bài viết.");
    }
  };

  const handlePaymentButtonClick = () => {
    if (userId) {
      if (hasSubscription) {
        setShowPaymentForm(true);
      }
    } else {
      alert("Vui lòng đăng nhập để đăng bài viết.");
    }
  };

  const verifyPayment = (paymentDetails) => {
    setPaymentVerified(true);
    setShowPaymentForm(false);
  };

  return (
    <div className="container">
      <div className="blog-page">
        <h1>Blog</h1>
        <div className="blog-actions">
          <button className="create-blog-btn" onClick={handlePostButtonClick}>
            <FaPlus />
          </button>
          <button className="payment-btn" onClick={handlePaymentButtonClick}>
            <MdOutlinePayments />
          </button>
        </div>

        {showPopup && (
          <CreateBlogPostPopup
            onClose={() => setShowPopup(false)}
            onCreate={handleCreatePost}
          />
        )}

        {showPaymentForm && userId ? (
          <div className="popup-overlay">
            <div className="popup-content">
              <PaymentSection
                userId={userId}
                subscriptions={subscriptions}
                onConfirmPayment={verifyPayment}
                onClose={() => setShowPaymentForm(false)}
              />
              <button
                className="close-payment-btn"
                onClick={() => setShowPaymentForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        ) : null}

        {loading ? (
          <p>Loading blog posts...</p>
        ) : blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post.postId} className="blog-post">
              <img
                src={`uploads/img_blog/${post.image}`}
                alt={post.title}
                className="blog-image"
              />
              <h2>{post.title}</h2>
              <p className="date">{post.date}</p>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/blog/${post.postId}`} className="read-more">
                Read more
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
