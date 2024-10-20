import React, { memo, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './sp.scss';

// Danh sách sản phẩm ban đầu mở rộng với thông tin chi tiết
const initialProducts = [
    { 
        id: 1, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        details: { weight: '1.5kg', color: 'Đỏ', breed: 'Koi Nhật' } 
    },
    { 
        id: 2, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        details: { size: '100x50x50 cm', material: 'Kính cường lực', capacity: '200L' } 
    },
    { 
        id: 3, 
        name: 'Sản phẩm phong thủy 3', 
        price: 1500000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        details: { weight: '1.2kg', color: 'Vàng', breed: 'Koi Nhật' } 
    },
    { 
        id: 4, 
        name: 'Sản phẩm phong thủy 4', 
        price: 3000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'aquarium', 
        details: { size: '120x60x60 cm', material: 'Kính trong', capacity: '300L' } 
    },
    { 
        id: 5, 
        name: 'Sản phẩm phong thủy 5', 
        price: 2500000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'fish', 
        details: { weight: '2kg', color: 'Trắng', breed: 'Koi Nhật' } 
    },
    { 
        id: 6, 
        name: 'Sản phẩm phong thủy 6', 
        price: 1800000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'aquarium', 
        details: { size: '80x40x40 cm', material: 'Kính cường lực', capacity: '150L' } 
    },
    { 
        id: 7, 
        name: 'Sản phẩm phong thủy 7', 
        price: 2200000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'fish', 
        details: { weight: '1.8kg', color: 'Cam', breed: 'Koi Nhật' } 
    },
    { 
        id: 8, 
        name: 'Sản phẩm phong thủy 8', 
        price: 3500000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'aquarium', 
        details: { size: '140x70x70 cm', material: 'Kính trong', capacity: '400L' } 
    },
    // Thêm các sản phẩm khác nếu cần
];


// Component Popup
const Popup = ({ onClose }) => {
    const handleClickOutside = (e) => {
        if (e.target.className === 'popup') {
            onClose();
        }
    };

    return (
        <div className="popup" onClick={handleClickOutside}>
            <div className="popup-content">
                <button className="close-icon" onClick={onClose}>✖</button>
                <h2>Điền thông tin tư vấn</h2>
                <form>
                    <label>Họ và tên:</label>
                    <input type="text" placeholder="Nhập họ và tên" required />
                    
                    <label>Email:</label>
                    <input type="email" placeholder="Nhập email" required />
                    
                    <label>Số điện thoại:</label>
                    <input type="tel" placeholder="Nhập số điện thoại" required />
                    
                    <button type="submit">Gửi yêu cầu</button>
                </form>
            </div>
        </div>
    );
};

// Component SanphamPage
const SanphamPage = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterType, setFilterType] = useState('all');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSort = (order) => {
        setSortOrder(order);
        scrollToTop();
    };

    const handleFilter = (type) => {
        setFilterType(type);
        scrollToTop();
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const filteredProducts = useMemo(() => {
        let products = initialProducts;

        // Lọc sản phẩm
        if (filterType !== 'all') {
            products = products.filter(product => product.type === filterType);
        }

        // Sắp xếp sản phẩm
        return products.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
    }, [sortOrder, filterType]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProductClick = (id) => {
        navigate(`/sanpham/${id}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    return (
        <div className="container">
            <article className="sanphamPage">
                <div className="btn-sort">
                    <div className="button-choice-type">
                        <button className="choice-all" onClick={() => handleFilter('all')}>Tất cả</button>
                        <button className="choice-fish" onClick={() => handleFilter('fish')}>Cá</button>
                        <button className="choice-aquarium" onClick={() => handleFilter('aquarium')}>Hồ</button>
                    </div>
                    <div className="button-sort-product">
                        <button className="sortAsc" onClick={() => handleSort('asc')}>Sắp xếp giá tăng dần</button>
                        <button className="sortDesc" onClick={() => handleSort('desc')}>Sắp xếp giá giảm dần</button>
                    </div>
                </div>
                <hr className="hr-sort" />

                <div className="grid-container">
                    {/* Hiển thị sản phẩm */}
                    {filteredProducts.map(product => (
                        <div className="product" key={product.id}>
                            <img 
                                src={product.img} 
                                alt={product.name} 
                                className="product__img" 
                                onClick={() => handleProductClick(product.id)} 
                            />
                            <h3 className="product__name">{product.name}</h3>
                            <p className="product__price">{product.price.toLocaleString()} VND</p>
                            <div className="button-booking">
                                <button className="product__btn" onClick={() => handleProductClick(product.id)}>Thông tin chi tiết</button>
                                <button className="product__btn" onClick={handleOpenPopup}>Đặt lịch tư vấn</button>
                            </div>
                        </div>
                    ))}
                </div>
            </article>
            {showPopup && <Popup onClose={handleClosePopup} />}
        </div>
    );
};

export default memo(SanphamPage);
