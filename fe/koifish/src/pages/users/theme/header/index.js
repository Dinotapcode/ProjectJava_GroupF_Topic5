import { memo } from 'react';
import './style.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__top">
                <div className="grid">
                    <nav className="header__navbar header__navbar--top">
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item"></li>
                        </ul>
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item-left header__navbar-item--separate">
                                <div className="header__navbar-icon-link">
                                    <i className="fa-regular fa-clock"></i>
                                    7:30 - 21:00
                                </div>
                            </li>
                            <li className="header__navbar-item-left header__navbar-item--separate">
                                <div className="header__navbar-icon-link">
                                    <i className="fa-solid fa-phone"></i>
                                    19008080
                                </div>
                            </li>
                            <li className="header__navbar-item header__navbar-item--bold">Đăng ký</li>
                            <li className="header__navbar-item header__navbar-item--bold">Đăng nhập</li>
                        </ul>
                    </nav>

                    <nav className="header__navbar">
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item">
                                <a href="#" className="header__navbar-logo">
                                    <img src="./assets/img/logo.png" alt="Logo" />
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
                </div>
                <hr />
            </div>
        </header>
    );
};

export default memo(Header);
