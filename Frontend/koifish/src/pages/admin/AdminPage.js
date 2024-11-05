import React, { useState, useEffect } from 'react';
import './style.scss';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        item: "",
        type: "",
        name: "",
        description: "",
        origin: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setShowPopup(false); // Đóng popup sau khi thêm
        resetForm();
    };

    const resetForm = () => {
        setNewProduct({
            item: "",
            type: "",
            name: "",
            description: "",
            origin: ""
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        if (showPopup) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPopup]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="dashboard-stats">
                        <h1>Dashboard</h1>
                        <div className="stat-item">Số lượng truy cập: 1000</div>
                        <div className="stat-item">Số lượng bài viết: 50</div>
                        <div className="stat-item">Số lượng sản phẩm: {products.length}</div>
                        <div className="stat-item">Số lượng gói đã đăng ký: 10</div>
                    </div>
                );
            case 'productManagement':
                return (
                    <div className="product-management">
                        <h1>Quản lý sản phẩm</h1>
                        <button onClick={() => setShowPopup(true)}>Thêm sản phẩm</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Item</th>
                                    <th>Loại</th>
                                    <th>Tên</th>
                                    <th>Mô tả</th>
                                    <th>Nguồn gốc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.item}</td>
                                        <td>{product.type}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.origin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Thêm sản phẩm</h2>
                        <label>
                            Item:
                            <input
                                type="text"
                                name="item"
                                value={newProduct.item}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Loại:
                            <input
                                type="text"
                                name="type"
                                value={newProduct.type}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Tên:
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Mô tả:
                            <input
                                type="text"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Nguồn gốc:
                            <input
                                type="text"
                                name="origin"
                                value={newProduct.origin}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={handleAddProduct}>Thêm</button>
                        <button onClick={() => setShowPopup(false)}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
