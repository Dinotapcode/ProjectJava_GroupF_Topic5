import React, { useState, useEffect } from "react";
import { FaUser, FaBox, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import "./style.scss";

const PersonalPage = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    birthday: "",
    wallet: "",
    avatar: null,
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const role = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    avatar: null,
    phone: "",
    birthday: "",
  });

  if (!userId) {
    // Assuming you have a token stored in localStorage or a state

    navigate(ROUTERS.USER.HOME);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Add one day to get tomorrow's date
    date.setDate(date.getDate() + 1);
    // Ensure the date is formatted as 'yyyy-mm-dd'
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // Message will disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  
  useEffect(() => {
    fetch(`http://localhost:8083/api/user/${userId}`,{
      headers: { Authorization: sessionStorage.getItem('authHeader') }})
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data: ", data);
        setUser({
          userName: data.userName,
          email: data.email,
          phone: data.phone,
          birthday: formatDate(data.birthday), // Format the birthday here
          wallet: data.wallet,
          avatar: data.avatar || null,
        });
        setNewUser({
          userName: data.userName || "",
          email: data.email || "",
          avatar: data.avatar || null,
          phone: data.phone || "",
          birthday: formatDate(data.birthday) || "", // Format the birthday here as well
        });
      })
      .catch((error) => console.error("Error fetching user data: ", error));
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo preview URL cho ảnh mới
      const newPreviewUrl = URL.createObjectURL(file);

      // Xóa preview URL cũ nếu có
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(newPreviewUrl);
      setNewUser({ ...newUser, avatar: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", newUser.userName);
    formData.append("email", newUser.email);
    formData.append("phone", newUser.phone);
    formData.append("birthday", newUser.birthday);

    // Chỉ append avatar nếu có file mới
    if (newUser.avatar instanceof File) {
      formData.append("avatar", newUser.avatar);
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8083/api/user/update/${userId}`,
        {
          method: "PUT",
          body: formData,
          headers: { Authorization: sessionStorage.getItem('authHeader') }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Cập nhật thất bại.");
      }

      const resultText = await response.text();
      setMessage("Cập nhật thành công!");

      // Lấy tên file avatar mới từ response
      const newAvatarPath = resultText.split("avatar: ")[1];

      // Cập nhật state với avatar mới
      setUser((prev) => ({
        ...prev,
        userName: newUser.userName,
        email: newUser.email,
        phone: newUser.phone,
        birthday: newUser.birthday,
        avatar: newAvatarPath,
      }));

      // Reset preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      navigate(0);
      setActiveMenu(null); // Reset to show welcome message
    } catch (error) {
      console.error("Error:", error);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi sessionStorage
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    // Hiển thị thông báo
    alert("Đăng xuất thành công");

    // Chuyển hướng người dùng về trang đăng nhập
    navigate(ROUTERS.USER.HOME);
  };
  return (
    <div className="personal-page">
      <div className="sidebar">
        <div className="user-profile">
          <img
            src={
              user.avatar
                ? require(`../../../assets/admin/avatar_user/uploads/${user.avatar}`)
                : require(`../../../assets/admin/avatar_user/defaults/default_avatar.png`)
            }
            alt="Avatar"
            className="avatar"
          />

          <h3>{user.userName}</h3>

          <div className="action-buttons">
            <Link to={ROUTERS.USER.HOME} className="btn primary">
              TRANG CHỦ
            </Link>
            <button className="btn danger" onClick={handleLogout}>
              ĐĂNG XUẤT
            </button>
          </div>
        </div>

        <div className="menu-list">
          <div
            className={`menu-item ${activeMenu === "profile" ? "active" : ""}`}
            onClick={() => setActiveMenu("profile")}
          >
            <FaUser /> Cập nhật thông tin cá nhân
          </div>
          <div
            className={`menu-item ${activeMenu === "orders" ? "active" : ""}`}
            onClick={() => setActiveMenu("orders")}
          >
            <FaBox /> Quản lý lịch hẹn
          </div>
          <div
            className={`menu-item ${activeMenu === "wallet" ? "active" : ""}`}
            onClick={() => setActiveMenu("wallet")}
          >
            <FaWallet /> Ví của tôi: {user.wallet || 0} VNĐ
          </div>
        </div>
      </div>

      <div className="main-content">
        {!activeMenu && (
          <div className="welcome-message">
            Chào mừng {user.userName} đến với website Fengshuikoi
          </div>
        )}

        {activeMenu === "profile" && (
          <div className="content-section">
            <h2 className="title-edit">Thông tin cá nhân</h2>
            <div className="profile-container">
              <div className="avatar-section">
                <img
                  src={
                    previewUrl ||
                    (user.avatar
                      ? require(`../../../assets/admin/avatar_user/uploads/${user.avatar}`)
                      : require(`../../../assets/admin/avatar_user/defaults/default_avatar.png`))
                  }
                  alt="Avatar"
                  className="avatar"
                />
                <div className="avatar-upload">
                  <input
                    type="file"
                    id="avatar-input"
                    onChange={handleAvatarChange}
                    accept="image/*"
                    hidden
                  />
                  <label htmlFor="avatar-input" className="upload-btn">
                    Chọn ảnh
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên người dùng</label>
                    <input
                      type="text"
                      name="userName"
                      value={newUser.userName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input
                      type="date"
                      name="birthday"
                      value={newUser.birthday}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {message && <div className="message-toast fade-out">{message}</div>}
    </div>
  );
};

export default PersonalPage;
