import React, { memo, useState, useEffect } from 'react';
import './style.scss';
import logo from '../../../../assets/images/logo.png';

const Header = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false); // Trạng thái cho nút quay lại đầu trang

    // Sử dụng useEffect để lắng nghe sự kiện cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Kiểm tra trạng thái thu nhỏ header
            setIsShrunk(scrollTop > 100);
            // Hiển thị nút quay lại đầu trang khi cuộn quá 200px
            setShowBackToTop(scrollTop > 200);
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
                <nav className={`header__top-navbar ${isShrunk ? 'shrink' : ''}`}>
                    <ul className="header__top-navbar-list">
                        <li className="header__top-navbar-item">
                            <i className="fa-regular fa-clock"></i>
                            7:30 - 21:00
                        </li>
                        <li className="header__top-navbar-item">
                            <i className="fa-solid fa-phone"></i>
                            19008080
                        </li>
                        <li className="header__top-navbar-item header__top-navbar-item--bold">
                            <a href="dang-ky">Đăng ký</a>
                        </li>
                        <li className="header__top-navbar-item header__top-navbar-item--bold">
                            <a href="dang-nhap">Đăng nhập</a>
                        </li>
                    </ul>
                </nav>

                {/* Thanh navbar chính */}
                <nav className="header__main-navbar">
                    <ul className="header__main-navbar-list">
                        <li className="header__main-navbar-item">
                            <a href="/" className='header__main-navbar-logo'>
                                <img src={logo} alt="logo" className={`${isShrunk ? 'shrink' : ''}`} />
                            </a>
                        </li>
                    </ul>
                    <ul className="header__main-navbar-list">
                        <li className="header__main-navbar-item">
                            <a href="/gioi-thieu" className="header__main-navbar-link">GIỚI THIỆU</a>
                        </li>
                        <li className="header__main-navbar-item">
                            <a href="/tra-cuu-phong-thuy" className="header__main-navbar-link">DỊCH VỤ TƯ VẤN</a>
                        </li>
                        <li className="header__main-navbar-item">
                            <a href="/blog" className="header__main-navbar-link">BLOG TIN TỨC</a>
                        </li>
                        <li className="header__main-navbar-item">
                            <a href="/san-pham-phong-thuy" className="header__main-navbar-link">SẢN PHẨM</a>
                        </li>
                        <li className="header__main-navbar-item">
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
