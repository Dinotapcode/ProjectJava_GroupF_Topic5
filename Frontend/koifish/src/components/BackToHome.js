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
            { path: '/san-pham-phong-thuy', label: 'Sản phẩm phong thủy' },
            { path: '/dang-nhap', label: 'Đăng nhập' },
        ];

        const currentLink = navBottomLinks.find(link =>
            location.pathname === link.path ||
            (link.path !== '/' && location.pathname.startsWith(link.path))
        );

        // Kiểm tra nếu path bắt đầu bằng '/san-pham-phong-thuy/'
        if (location.pathname.startsWith('/san-pham-phong-thuy/')) {
            const productId = location.pathname.split('/').pop();
            setCurrentLabel(`Sản phẩm ${productId}`);
        }
        // Kiểm tra nếu path bắt đầu bằng '/blog/'
        else if (location.pathname.startsWith('/blog/')) {
            const postId = location.pathname.split('/').pop();
            setCurrentLabel(`Post ${postId}`);
        }
        else {
            setCurrentLabel(currentLink ? currentLink.label : 'Unknown');
        }
    }, [location.pathname]);

    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="backToHome">
            <div className="backToHome-container">
                <Link to="/" className="link">
                    <TiHome className='icon' /> Trang chủ
                </Link> /
                {location.pathname.startsWith('/san-pham-phong-thuy/') ? (
                    <>
                        <Link to="/san-pham-phong-thuy" className="link">
                            Sản phẩm phong thủy
                        </Link> /
                        <span className='label'> {currentLabel} </span>
                    </>
                ) : location.pathname.startsWith('/blog/') ? (
                    <>
                        <Link to="/blog" className="link">
                            Blog tin tức
                        </Link> /
                        <span className='label'> {currentLabel} </span>
                    </>
                ) : (
                    <span className='label'> {currentLabel} </span>
                )}
            </div>
        </nav>
    );
}

export default BackToHome;
