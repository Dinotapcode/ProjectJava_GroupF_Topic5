import React, { useState } from 'react';
import './style.scss';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="dashboard-stats">
                        <h1>Dashboard</h1>
                        <div className="stat-item">Số lượng truy cập: 1000</div>
                        <div className="stat-item">Số lượng bài viết: 50</div>
                        <div className="stat-item">Số lượng sản phẩm: 25</div>
                        <div className="stat-item">Số lượng gói đã đăng ký: 10</div>
                    </div>
                );
            case 'userManagement':
                return (
                    <div className="user-management">
                        <h1>Quản lý người dùng</h1>
                        {/* Thêm bảng và chức năng quản lý người dùng ở đây */}
                    </div>
                );
            case 'productManagement':
                return (
                    <div className="product-management">
                        <h1>Quản lý sản phẩm</h1>
                        {/* Thêm bảng và chức năng quản lý sản phẩm ở đây */}
                    </div>
                );
            case 'servicePackageManagement':
                return (
                    <div className="service-package-management">
                        <h1>Quản lý gói dịch vụ</h1>
                        {/* Thêm bảng và chức năng quản lý gói dịch vụ ở đây */}
                    </div>
                );
            case 'blogManagement':
                return (
                    <div className="blog-management">
                        <h1>Quản lý bài viết</h1>
                        {/* Thêm bảng và chức năng quản lý bài viết ở đây */}
                    </div>
                );
            case 'consultationSchedule':
                return (
                    <div className="consultation-schedule">
                        <h1>Lịch tư vấn</h1>
                        {/* Thêm lịch và chức năng quản lý tư vấn ở đây */}
                    </div>
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
