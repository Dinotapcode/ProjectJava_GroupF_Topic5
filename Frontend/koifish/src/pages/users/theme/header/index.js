import React, { memo, useState, useEffect, useRef } from 'react';
import { ROUTERS } from '../../../../utils/router';
import './style.scss';
import logo from '../../../../assets/logo/logo.png';
import BackToHome from '../../../../components/BackToHome';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenuFold4Line } from "react-icons/ri";

const Header = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null); // Tham chiếu đến menu
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            // Assuming you have a token stored in localStorage or a state

            fetch(`http://localhost:8083/api/user/${userId}`, {
                method: 'GET',
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data); // Lưu thông tin người dùng vào state
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [userId]);


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

    const [menus] = useState(() => {
        const baseMenus = [
            { name: "Giới Thiệu", path: ROUTERS.USER.GIOITHIEU },
            { name: "Blog tin tức", path: ROUTERS.USER.BLOG },
            { name: "Dịch vụ tư vấn", path: ROUTERS.USER.TRACUU },
            { name: "Sản phẩm phong thủy", path: ROUTERS.USER.SANPHAM },
        ];

        if (role === 'ROLE_ADMIN') {
            baseMenus.push({ name: "Quản lý", path: ROUTERS.ADMIN });
        }

        return baseMenus;
    });


    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Xóa thông tin đăng nhập khỏi sessionStorage
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        // Hiển thị thông báo
        alert('Đăng xuất thành công');

        // Chuyển hướng người dùng về trang đăng nhập
        navigate(ROUTERS.USER.HOME);
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
                        <li className="header__top-navbar-item">
                            {sessionStorage.getItem('userId') ? (
                                <span onClick={handleLogout} className="header__top-navbar-item header__top-navbar-item--member">
                                    Đăng xuất
                                </span>
                            ) : (
                                <Link to={ROUTERS.USER.LOGIN}
                                    className="header__top-navbar-item header__top-navbar-item--guest">
                                    Đăng nhập
                                </Link>
                            )}
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
                        {sessionStorage.getItem('userId') ? (
                            <li className="header__main-navbar-item header__top-navbar-item--member">
                                <span>Trần đình công siêu nhân</span>
                                <Link to={ROUTERS.USER.PROFILE} className="header__main-navbar-avatar">
                                    <img src={logo} alt="avatar" />
                                </Link>
                            </li>
                        ) : null}

                    </ul>
                    <u className={`header__main-navbar-list header__main-navbar-menu-icon--close  ${isMenuOpen ? 'header__main-navbar-menu-icon--open' : ''} ${isShrunk ? 'shrink' : ''}`}>
                        <li className="header__main-navbar-item header__main-navbar-menu-icon">
                            <div className="menu-icon">
                                <input
                                    type="checkbox"
                                    id="toggleChecker"
                                    checked={isMenuOpen}
                                    onChange={handleMenuToggle}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="toggleChecker" className="checkboxtoggler">
                                    <div className={`line line-1 ${isMenuOpen ? 'checked' : ''}`}></div>
                                    <div className={`line line-2 ${isMenuOpen ? 'checked' : ''}`}></div>
                                    <div className={`line line-3 ${isMenuOpen ? 'checked' : ''}`}></div>
                                </label>
                            </div>
                        </li>
                    </u>
                </nav>
            </header>
            <div className="container"><BackToHome /></div>
        </>
    );
};

export default memo(Header);
