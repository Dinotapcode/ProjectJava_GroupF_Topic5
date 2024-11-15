import React, { useState, useEffect } from "react";
import { FaUser, FaHeart, FaBox, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

// Base URL for your API
const API_BASE_URL = "http://localhost:8083/user";

// API function to get user profile by ID using fetch
const updateUserProfile = async (id, userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userData.name,
                email: userData.email,
                phone: userData.phone,
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

const PersonalPage = () => {
    const [profile, setProfile] = useState({});
    const [walletBalance, setWalletBalance] = useState(0);
    const userId = localStorage.getItem('userId') || null; // Get userId from localStorage after login(dòng này xác định id khi login)
    const [activeSection, setActiveSection] = useState('profile');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(userId, formData);
            setProfile(updatedUser);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin!');
        }
    };

    const getUserProfile = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setFormData({
                name: data.userName || '',
                email: data.email || '',
                phone: data.phone || '',
                bio: data.bio || ''
            });
            setWalletBalance(data.wallet || 0);
            return data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        // Xóa token từ localStorage
        localStorage.removeItem('token');
        // Xóa thông tin người dùng từ localStorage nếu có
        localStorage.removeItem('user');
        // Chuyển hướng về trang chủ
        navigate('/');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(userId);
                setProfile(data);
            } catch (error) {
                console.error("Failed to load profile:", error);
            }
        };
        fetchProfile();
    }, [userId]);

    return (
        <div className="container">
            <div className="profile-container">
                <div className="sidebar">
                    <div
                        className="profile-pic"
                        style={{ backgroundImage: profile.picture ? `url(${profile.picture})` : "" }}
                    ></div>
                    <div className="name">{profile.name || "Ảnh đại diện"}</div>

                    <Link to="/" className="button home-button">TRANG CHỦ</Link>
                    <button onClick={handleLogout} className="button logout-button">ĐĂNG XUẤT</button>
                    <ul className="menu">
                        <li 
                            className={`menu-item ${activeSection === 'profile' ? 'active' : ''}`} 
                            onClick={() => setActiveSection('profile')}
                        >
                            <FaUser />
                            <span>Cập nhật thông tin cá nhân</span>
                        </li>
                        <li 
                            className={`menu-item ${activeSection === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveSection('orders')}
                        >
                            <FaBox />
                            <span>Quản lý đơn hàng</span>
                        </li>
                        <li 
                            className={`menu-item ${activeSection === 'wallet' ? 'active' : ''}`}
                            onClick={() => setActiveSection('wallet')}
                        >
                            <FaHeart />
                            <span>Ví của tôi</span>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    {activeSection === 'profile' ? (
                        <div>
                            <div className="profile-info">
                                
                                <h2>Chào mừng {profile.name} đến với website FengshuiKoi</h2>
                                
                            </div>
                            
                            <button 
                                className="update-button"
                                onClick={() => setActiveSection('update-profile')}
                            >
                                Cập nhật thông tin
                            </button>
                        </div>
                    ) : activeSection === 'update-profile' ? (
                        <form onSubmit={handleSubmit} className="update-form">
                            <h2>Cập nhật thông tin cá nhân</h2>
                            <div className="form-group">
                                <label>Tên:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Nhập tên của bạn"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Nhập số điện thoại của bạn"
                                />
                            </div>
                            <div className="form-group">
                                <label>Giới thiệu:</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Giới thiệu về bản thân"
                                />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="update-button">
                                    Lưu thông tin
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={() => setActiveSection('profile')}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    ) : activeSection === 'wallet' ? (
                        <div className="wallet-info">
                            <h2>Ví của tôi</h2>
                            <div className="balance-container">
                                <h3>Số dư hiện tại:</h3>
                                <p className="balance-amount">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(walletBalance)}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <p>Chào mừng {profile.name} đến với website FengshuiKoi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
