import React, { memo, useState, useEffect } from 'react';
import { ROUTERS } from '../../../../utils/router';
import './style.scss';
import logo from '../../../../assets/logo/logo.png';
import BackToHome from '../../../../components/BackToHome';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isShrunk, setIsShrunk] = useState(false);

    // Sử dụng useEffect để lắng nghe sự kiện cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Kiểm tra trạng thái thu nhỏ header
            setIsShrunk(scrollTop > 100);
            // Hiển thị nút quay lại đầu trang khi cuộn quá 200px
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [menus] = useState([
        {
            name: "Giới Thiệu",
            path: ROUTERS.USER.GIOITHIEU,
        },
        {
            name: "Blog tin tức",
            path: ROUTERS.USER.BLOG,
        },
        {
            name: "Dịch vụ tư vấn",
            path: ROUTERS.USER.TRACUU,
        },
        {
            name: "Sản phẩm phong thủy",
            path: ROUTERS.USER.SANPHAM,
        },
    ]);


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
                            <Link to={ROUTERS.USER.LOGIN} className="header__top-navbar-item">Đăng nhập</Link>
                        </li>
                    </ul>
                </nav>

                {/* Thanh navbar chính */}
                <nav className="header__main-navbar">
                    <ul className="header__main-navbar-list">
                        <li className="header__main-navbar-item">
                            <Link to={ROUTERS.USER.HOME} className="header__main-navbar-logo">
                                <img src={logo} alt="logo" className={`${isShrunk ? 'shrink' : ''}`} />
                            </Link>
                        </li>
                    </ul>
                    <ul className="header__main-navbar-list">
                        {
                            menus?.map((menu, menuKey) => (
                                <li key={menuKey} className="header__main-navbar-item">
                                    <Link to={menu?.path} className="header__main-navbar-link">{menu?.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </header>
            <div className="container"><BackToHome /></div>
        </>
    );
};

export default memo(Header);