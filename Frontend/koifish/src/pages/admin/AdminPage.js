import React, { useState } from 'react';
import ProductManagement from './ProductManagement';
import PostManagement from './PostManagement';
import UserManagement from './UserManagement';
import PaymentManagement from './PaymentManagement';
<<<<<<< HEAD
import SearchManagement from './SearchManagement'; // Import component mới
=======
import ConsultationSchedule from './ConsultationSchedule';
import FateManagement from './FateManagement';
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b
import './style.scss';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
<<<<<<< HEAD
=======
    const [fates, setFates] = useState([]);
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b
    const [subscriptions, setSubscriptions] = useState([]);

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
<<<<<<< HEAD
                return <ProductManagement products={products} setProducts={setProducts} />;
=======
                return (
                    <ProductManagement products={products} setProducts={setProducts} />
                );
            case 'consultationSchedule':
                return (
                    <ConsultationSchedule />
                );
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b
            case 'blogManagement':
                return <PostManagement posts={posts} setPosts={setPosts} />;
            case 'userManagement':
                return <UserManagement users={users} setUsers={setUsers} />;
            case 'servicePackageManagement':
<<<<<<< HEAD
                return <PaymentManagement subscriptions={subscriptions} setSubscriptions={setSubscriptions} />;
            case 'searchManagement': // Thêm logic để hiển thị phần quản lý tra cứu
                return <SearchManagement />;
=======
                return (
                    <PaymentManagement subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                );
            case 'fateManagement':
                return (
                    <FateManagement fates={fates} setFates={setFates} />
                );
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b
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
