import React, { useState, useEffect } from 'react';
import ProductManagement from './ProductManagement';
import PostManagement from './PostManagement';
import UserManagement from './UserManagement';
import PaymentManagement from './SubscriptionManagement';
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
    
    if (!userId || role !== "ROLE_ADMIN") {
        navigate(ROUTERS.USER.HOME);
    }

    const [counts, setCounts] = useState({
        users: 0,
        posts: 0,
        products: 0,
        subscriptions: 0,
        });

    const fetchCounts = async () => {
        try {
            // Gọi API đồng thời
            const [usersResponse, postsResponse, productsResponse, subscriptionsResponse] = await Promise.all([
                fetch("http://localhost:8083/api/admin/users/count",{
                    headers: { Authorization: sessionStorage.getItem('authHeader') },
                }),
                fetch("http://localhost:8083/api/admin/posts/count",{
                    headers: { Authorization: sessionStorage.getItem('authHeader') },
                }),
                fetch("http://localhost:8083/api/admin/products/count",{
                    headers: { Authorization: sessionStorage.getItem('authHeader') },
                }),
                fetch("http://localhost:8083/api/admin/subscriptions/count",{
                    headers: { Authorization: sessionStorage.getItem('authHeader') },
                }),
            ]);

            // Parse dữ liệu JSON
            const usersCount = await usersResponse.json();
            const postsCount = await postsResponse.json();
            const productsCount = await productsResponse.json();
            const subscriptionsCount = await subscriptionsResponse.json();

            // Cập nhật state counts
            setCounts({
                users: usersCount,
                posts: postsCount,
                products: productsCount,
                subscriptions: subscriptionsCount,
            });
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="dashboard-stats">
                        <h1>Dashboard</h1>
                        <div className="stat-item">Số lượng người dùng: {counts.users}</div>
                        <div className="stat-item">Số lượng bài viết: {counts.posts}</div>
                        <div className="stat-item">Số lượng sản phẩm: {counts.products}</div>
                        <div className="stat-item">Số lượng gói đã đăng ký: {counts.subscriptions} </div>
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
                        <li onClick={() => setActiveTab('fateManagement')}>Quản lý tra cứu</li>
                        <li onClick={() => setActiveTab('productManagement')}>Quản lý sản phẩm</li>
                        <li onClick={() => setActiveTab('servicePackageManagement')}>Quản lý gói dịch vụ</li>
                        <li onClick={() => setActiveTab('blogManagement')}>Quản lý bài viết</li>
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
