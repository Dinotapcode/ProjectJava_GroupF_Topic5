import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import { memo } from "react";
import "./style.scss";
import { useEffect, useState } from "react";

import koi1 from "../../../assets/users/images/img_sp/1.png";
import ho1 from "../../../assets/users/images/img_sp/aquarium.jpg";
import blog1 from "../../../assets/users/images/img_blog/anh1.jpg";
import blog2 from "../../../assets/users/images/img_blog/anh2.jpg";
import blog3 from "../../../assets/users/images/img_blog/anh3.jpg";
import blog4 from "../../../assets/users/images/img_blog/anh4.jpg";

const HomePage = () => {
  const API_BASE_URL = "http://localhost:8083/api";
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]); // Định nghĩa products là một mảng
  const [posts, setPosts] = useState([]); // Định nghĩa products là một mảng

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 25; // Mỗi item chiếm 25% chiều rộng
  const maxIndex = Math.max(0, products.length - 4); // Tổng số item có thể trượt (4 item hiển thị tại một thời điểm)

  const updateSliderPosition = () => {
    const offset = -currentIndex * itemWidth;
    return `${offset}%`;
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/public/product/all`);
        if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm.");

        const data = await response.json();
        setProducts(data); // Cập nhật mảng sản phẩm
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
        alert("Không thể tải danh sách sản phẩm.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/public/post/all/active`);
        if (!response.ok) throw new Error("Không thể tải danh sách bài viết.");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
        alert("Không thể tải danh sách bài viết.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="home-container">
        <div className="intro-sections">
          <h2>Chào mừng bạn đến với Fengshuikoi!</h2>
          <p>
            Fengshuikoi, nơi mà bạn sẽ được tư vấn để sở hữu cho mình cá Koi
            phong thủy phù hợp nhất với bản thân...
          </p>
        </div>
        <div className="news-sections">
          <div className="title">
            Sản phẩm phong thuỷ nổi bật
            <hr />
          </div>
          <div className="slider-container">
            <div
              className="slide-cards"
              style={{ transform: `translateX(${updateSliderPosition()})`, transition: 'transform 0.3s ease' }}
            >
              {isLoading ? (
                <p>Đang tải sản phẩm...</p>
              ) : (
                products.map((product, index) => (
                  <div className="slide-card" key={index}>
                    <div className="slide-card-image">
                      <img
                        src={`uploads/img_products/${product.img}`}
                        alt={product.title}
                      />
                    </div>
                    <div className="slide-card-title">{product.title}</div>
                    <Link
                      to={`${ROUTERS.USER.SANPHAM}/${product.id}`}
                      className="slide-card-description"
                    >
                      Xem Ngay
                    </Link>
                  </div>
                ))
              )}
            </div>
            <div className="slider-controls">
              <button
                className="slide-btn"
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <button
                className="slide-btn"
                onClick={handleNextClick}
                disabled={currentIndex === maxIndex}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="know-more">
            <Link to={ROUTERS.USER.SANPHAM}>Xem Thêm Tại đây </Link>
          </div>
        </div>
        <div className="suggest-sections">
          <h2>
            Nếu bạn vẫn chưa biết cách chọn cá Koi phong thủy phù hợp
            <br />
            Hãy đến với dịch vụ tư vấn và tra cứu của chúng tôi{" "}
          </h2>
          <Link to={ROUTERS.USER.TRACUU}> Tại đây </Link>
        </div>
        <div className="news-sections">
          <div className="title">
            Tin tức nổi bật về cá Koi phong thủy
            <hr />
          </div>
          <div className="slider-container">
            <div
              className="slide-cards"
              style={{ transform: `translateX(${updateSliderPosition()})`, transition: 'transform 0.3s ease' }}
            >
              {isLoading ? (
                <p>Đang tải sản phẩm...</p>
              ) : (
                posts.map((post, index) => (
                  <div className="slide-card" key={index}>
                    <div className="slide-card-image">
                      <img
                        src={`uploads/img_blog/${post.image}`}
                        alt={post.title}
                      />
                    </div>
                    <div className="slide-card-title">{post.title}</div>
                    <Link
                      to={`${ROUTERS.USER.BLOG}/${post.postId}`}
                      className="slide-card-description"
                    >
                      Xem Ngay
                    </Link>
                  </div>
                ))
              )}
            </div>
            <div className="slider-controls">
              <button
                className="slide-btn"
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <button
                className="slide-btn"
                onClick={handleNextClick}
                disabled={currentIndex === maxIndex}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="know-more">
            <Link to={ROUTERS.USER.BLOG}>Xem Thêm Tại đây </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(HomePage);
