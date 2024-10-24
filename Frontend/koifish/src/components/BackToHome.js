import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { TiHome } from "react-icons/ti";

const BackToHome = () => {
    const location = useLocation();
    const [currentLabel, setCurrentLabel] = useState('');

    useEffect(() => {
        const navBottomLinks = [
            { path: '/gioi-thieu', label: 'Giới thiệu' },
            { path: '/tra-cuu-phong-thuy', label: 'Dịch vụ tư vấn' },
            { path: '/blog', label: 'Blog tin tức' },
            { path: '/post', label: 'Bài viết' },
            { path: '/san-pham-phong-thuy', label: 'Sản phẩm' },
            { path: '/sanpham', label: 'Chi tiết sản phẩm' }
        ];

        const currentLink = navBottomLinks.find(link =>
            location.pathname === link.path ||
            (link.path !== '/' && location.pathname.startsWith(link.path))
        );

        if (location.pathname.startsWith('/san-pham-phong-thuy/')) {
            setCurrentLabel('Chi tiết sản phẩm');
        } else {
            setCurrentLabel(currentLink ? currentLink.label : 'Unknown');
        }
    }, [location.pathname]);

    if (location.pathname === '/') {
        return (
            <nav className="backToHome"></nav>
        );
    }

    return (
        <nav className="backToHome">
            <div className="backToHome-container">
            <Link to="/" className="backToHome__link">
                <TiHome className='backToHome__icon' /> Trang chủ
            </Link> /
            <span className='backToHome__Label'> {currentLabel} </span>
            </div>
        </nav>
    );
}

export default BackToHome;
