import React, { memo, useState, useEffect } from 'react';
import './style.scss'; // SCSS định nghĩa cho header
import logo from './logo.png'; // Import logo nếu cần

const Header = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false); // Trạng thái cho nút quay lại đầu trang

    // Sử dụng useEffect để lắng nghe sự kiện cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Kiểm tra trạng thái thu nhỏ header
            if (scrollTop > 100) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }

            // Hiển thị nút quay lại đầu trang khi cuộn quá 200px
            if (scrollTop > 200) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Hàm xử lý quay lại đầu trang với hiệu ứng mượt mà
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <header className={`header ${isShrunk ? 'shrink' : ''}`}>
                {/* Thanh navbar trên cùng */}
                <nav className={`header__navbar header__navbar--top ${isShrunk ? 'shrink' : ''}`}>
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item-left">
                            <i className="fa-regular fa-clock"></i>
                            7:30 - 21:00
                        </li>
                        <li className="header__navbar-item-left">
                            <i className="fa-solid fa-phone"></i>
                            19008080
                        </li>
                        <li className="header__navbar-item header__navbar-item--bold">Đăng ký</li>
                        <li className="header__navbar-item header__navbar-item--bold">Đăng nhập</li>
                    </ul>
                </nav>

                {/* Thanh navbar chính */}
                <nav className="header__navbar">
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item">
                            <a href="#" className="header__navbar-logo">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className={isShrunk ? 'shrink' : ''}
                                />
                            </a>
                        </li>
                    </ul>
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item header__navbar-item--strong">
                            <a href="#">GIỚI THIỆU</a>
                        </li>
                        <li className="header__navbar-item header__navbar-item--strong">
                            <a href="#">DỊCH VỤ TƯ VẤN</a>
                        </li>
                        <li className="header__navbar-item header__navbar-item--strong">
                            <a href="#">BLOG TIN TỨC</a>
                        </li>
                        <li className="header__navbar-item header__navbar-item--strong">
                            <a href="#">SẢN PHẨM</a>
                        </li>
                        <li className="header__navbar-item">
                            <i className="header__navbar-search fa-solid fa-magnifying-glass"></i>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Nút quay lại đầu trang */}
            {showBackToTop && (
                <button
                    id="backToTop"
                    className="back-to-top"
                    onClick={handleBackToTop}
                >
                    ↑
                </button>
            )}
        </>
    );
};

export default memo(Header);
