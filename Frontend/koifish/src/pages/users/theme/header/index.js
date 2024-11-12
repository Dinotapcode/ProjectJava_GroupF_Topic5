import React, { memo, useState, useEffect, useRef } from 'react';
import { ROUTERS } from '../../../../utils/router';
import './style.scss';
import logo from '../../../../assets/logo/logo.png';
import BackToHome from '../../../../components/BackToHome';
import { Link } from 'react-router-dom';
import { RiMenuFold4Line } from "react-icons/ri";

const Header = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null); // Tham chiếu đến menu

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsShrunk(scrollTop > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Đóng menu khi nhấn chuột ngoài menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const [menus] = useState([
        { name: "Giới Thiệu", path: ROUTERS.USER.GIOITHIEU },
        { name: "Blog tin tức", path: ROUTERS.USER.BLOG },
        { name: "Dịch vụ tư vấn", path: ROUTERS.USER.TRACUU },
        { name: "Sản phẩm phong thủy", path: ROUTERS.USER.SANPHAM },
    ]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={`header ${isShrunk ? 'shrink' : ''}`}>
                <nav className={`header__top-navbar ${isShrunk ? 'shrink' : ''}`}>
                    <ul className="header__top-navbar-list">
                        <li className="header__top-navbar-item">
                            <i className="fa-regular fa-clock"></i> 7:30 - 21:00
                        </li>
                        <li className="header__top-navbar-item">
                            <i className="fa-solid fa-phone"></i> 19008080
                        </li>
                        <li className="header__top-navbar-item header__top-navbar-item--guest">
                            <Link to={ROUTERS.USER.LOGIN} className="header__top-navbar-item">Đăng nhập</Link>
                        </li>
                        <li className="header__top-navbar-item header__top-navbar-item--member">
                            <Link to={ROUTERS.USER.LOGOUT} className="header__top-navbar-item">Đăng xuất</Link>
                        </li>
                    </ul>
                </nav>

                <nav className="header__main-navbar" ref={menuRef}>
                    <ul className="header__main-navbar-list">
                        <li className="header__main-navbar-item">
                            <Link to={ROUTERS.USER.HOME} className="header__main-navbar-logo">
                                <img src={logo} alt="logo" className={`${isShrunk ? 'shrink' : ''}`} />
                            </Link>
                        </li>
                    </ul>
                    <ul className={`header__main-navbar-list header__main-navbar-menu ${isMenuOpen ? 'header__main-navbar-menu--open' : ''}`}>
                        {menus.map((menu, menuKey) => (
                            <li key={menuKey} className="header__main-navbar-item">
                                <Link to={menu.path} className="header__main-navbar-link">{menu.name}</Link>
                            </li>
                        ))}
                        <li className="header__main-navbar-item header__top-navbar-item--member">
                            <span>Anh long</span>
                            <Link to={ROUTERS.USER.HOME} className="header__main-navbar-avatar">
                                <img src={logo} alt="avatar" />
                            </Link>
                        </li>
                    </ul>
                    <u className=  {`header__main-navbar-list header__main-navbar-menu--close ${isMenuOpen ? 'header__main-navbar-menu-icon--open' : ''}`}>
                        <li className="header__main-navbar-item header__main-navbar-menu-icon">
                            <RiMenuFold4Line className='menu-icon' onClick={handleMenuToggle} />
                        </li>
                    </u>
                </nav>
            </header>
            <div className="container"><BackToHome /></div>
        </>
    );
};

export default memo(Header);
