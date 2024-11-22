import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import "./style.scss";
import CreateBlogPostPopup from "./CreateBlogPost";
import PaymentSection from "./PaymentSection";
import { ROUTERS } from "../../../utils/router";
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

  useEffect(() => {

    // Fetch blog posts
    fetch(`${API_BASE_URL}/public/post/all/active`)
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      });

    // Fetch user subscription status
    if (userId) {
      fetch(`${API_BASE_URL}/public/payment/check-subscription/${userId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Subscription check failed");
          return response.text(); // Đọc phản hồi dạng chuỗi
        })
        .then((message) => {
          setHasSubscription(message === "Người dùng đã đăng ký dịch vụ.");
        })
        .catch((error) => {
          console.error("Error checking subscription:", error);
        });
    };


    // Fetch available subscriptions
    fetch(`${API_BASE_URL}/public/subscriptions/all/active`)
      .then((response) => response.json())
      .then((data) => setSubscriptions(data))
      .catch((error) => {
        console.error("Error fetching subscriptions:", error);
      });
  }, [userId]);

  const handleCreatePost = (newPost) => {
    setBlogPosts([newPost, ...blogPosts]);
    setShowPopup(false);
  };

  const verifyPayment = (paymentDetails) => {
    console.log("Payment details being sent:", paymentDetails);

    fetch(`${API_BASE_URL}/public/payment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPaymentVerified(true);
          alert("Payment verified successfully!");
        } else {
          alert("Payment verification failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Payment verification failed:", error);
      });
  };

  const handlePostButtonClick = () => {
    if (userId) {
      console.log("Has subscription:", hasSubscription);
      if (hasSubscription) {
        setShowPopup(true);
      } else {
        alert("You need an active subscription to create a post.");
        setShowPaymentForm(true);
      }
    }
    else {
      alert("You need to login to create a post.");
      navigate(ROUTERS.USER.LOGIN);
    }
  };


  return (
    <div className="container">
      <div className="blog-page">
        <h1>Blog</h1>
        <div className="blog-actions">
          <button className="create-blog-btn" onClick={handlePostButtonClick}>
            <FaPlus />
          </button>
          <button
            className="payment-btn"
            onClick={() => setShowPaymentForm(true)}
          >
            <MdOutlinePayments />
          </button>
        </div>

        {showPopup && (
          <CreateBlogPostPopup
            onClose={() => setShowPopup(false)}
            onCreate={handleCreatePost}
          />
        )}

        {showPaymentForm &&
          (userId ? (
            <div className="popup-overlay">
              <div className="popup-content">
                <PaymentSection
                  userId={userId}
                  subscriptions={subscriptions}
                  onConfirmPayment={(paymentDetails) => {
                    verifyPayment(paymentDetails);
                    setShowPaymentForm(false);
                  }}
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
          ) : (
            (() => {
              alert("You need to login to create a post.");
              navigate(ROUTERS.USER.LOGIN);
            })()
          ))}

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
