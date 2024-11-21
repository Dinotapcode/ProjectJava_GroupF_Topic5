import React, { useState } from 'react';
import ProductManagement from './ProductManagement';
import PostManagement from './PostManagement';
import UserManagement from './UserManagement';
import PaymentManagement from './PaymentManagement';
import ConsultationSchedule from './ConsultationSchedule';
import FateManagement from './FateManagement';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [fates, setFates] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const role = sessionStorage.getItem("role");
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();
    if (role !== "ROLE_ADMIN") {
        navigate('/');
    }
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="dashboard-stats">
                        <h1>Dashboard</h1>
                        <div className="stat-item">Số lượng truy cập: 1000</div>
                        <div className="stat-item">Số lượng bài viết: {posts.length}</div>
                        <div className="stat-item">Số lượng sản phẩm: {products.length}</div>
                        <div className="stat-item">Số lượng gói đã đăng ký: 10</div>
                    </div>
                );
            case 'productManagement':
                return (
                    <ProductManagement products={products} setProducts={setProducts} />
                );
            case 'consultationSchedule':
                return (
                    <ConsultationSchedule />
                );
            case 'blogManagement':
                return <PostManagement posts={posts} setPosts={setPosts} />;
            case 'userManagement':
                return <UserManagement users={users} setUsers={setUsers} />;
            case 'servicePackageManagement':
                return (
                    <PaymentManagement subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                );
            case 'fateManagement':
                return (
                    <FateManagement fates={fates} setFates={setFates} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="admin-page">
                <nav className="admin-sidebar">
                    <ul>
                        <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                        <li onClick={() => setActiveTab('userManagement')}>Quản lý người dùng</li>
                        <li onClick={() => setActiveTab('fateManagement')}>Quản lý Tra cứu</li>
                        <li onClick={() => setActiveTab('productManagement')}>Quản lý sản phẩm</li>
                        <li onClick={() => setActiveTab('servicePackageManagement')}>Quản lý gói dịch vụ</li>
                        <li onClick={() => setActiveTab('blogManagement')}>Quản lý bài viết</li>
                        <li onClick={() => setActiveTab('searchManagement')}>Quản lý tra cứu</li> {/* Thêm mục mới */}
                        <li onClick={() => setActiveTab('consultationSchedule')}>Lịch tư vấn</li>
                    </ul>
                </nav>
                <div className="admin-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
