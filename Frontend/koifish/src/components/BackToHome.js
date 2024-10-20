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
            { path: '/san-pham-phong-thuy', label: 'Sản phẩm' }
        ];

        const currentLink = navBottomLinks.find(link =>
            location.pathname === link.path ||
            (link.path !== '/' && location.pathname.startsWith(link.path))
        );
        setCurrentLabel(currentLink ? currentLink.label : 'Unknown');
    }, [location.pathname]);

    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="backToHome">
            <Link to="/" className="backToHome__link"><TiHome className='backToHome__icon' /> Trang chủ</Link> /
            <span className='backToHome__Label'> {currentLabel} </span>
        </nav>
    );
}

export default BackToHome;
