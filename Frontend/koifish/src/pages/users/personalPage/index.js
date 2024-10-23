import React, { useState } from "react";
import { FaUser, FaHeart, FaBox, FaEnvelope } from "react-icons/fa";
import "./style.scss";

const PersonalPage = () => {
    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfilePic(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            <div className="profile-container">
                <div className="sidebar">
                    <div
                        className="profile-pic"
                        style={{ backgroundImage: profilePic ? `url(${profilePic})` : "" }}
                        onClick={() => document.getElementById("fileInput").click()}
                    ></div>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <div className="name">Ảnh đại diện</div>

                    <a href="#" className="button home-button">
                        TRANG CHỦ
                    </a>
                    <a href="#" className="button logout-button">
                        THOÁT RA
                    </a>
                    <ul className="menu">
                        <li className="menu-item">
                            <FaUser />
                            <a href="#">Cập nhật thông tin cá nhân</a>
                        </li>
                        <li className="menu-item">
                            <FaHeart />
                            <a href="#">Sản phẩm yêu thích</a>
                        </li>
                        <li className="menu-item">
                            <FaBox />
                            <a href="#">Quản lý đơn hàng</a>
                        </li>
                        <li className="menu-item">
                            <FaEnvelope />
                            <a href="#">Tin nhắn</a>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <p>Chào mừng Bạn đến với website FengshuiKoi</p>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
