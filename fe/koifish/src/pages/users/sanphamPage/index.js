import React, { memo, useState, useMemo } from 'react';
import './sp.scss';

// Danh sách sản phẩm ban đầu mở rộng
const initialProducts = [
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 3, name: 'Sản phẩm phong thủy 3', price: 3000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 4, name: 'Sản phẩm phong thủy 4', price: 2500000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 5, name: 'Sản phẩm phong thủy 5', price: 1500000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 6, name: 'Sản phẩm phong thủy 6', price: 1800000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 7, name: 'Sản phẩm phong thủy 7', price: 2100000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 8, name: 'Sản phẩm phong thủy 8', price: 1600000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 9, name: 'Sản phẩm phong thủy 9', price: 1700000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 10, name: 'Sản phẩm phong thủy 10', price: 2200000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 11, name: 'Sản phẩm phong thủy 11', price: 1400000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 12, name: 'Sản phẩm phong thủy 12', price: 1950000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 13, name: 'Sản phẩm phong thủy 13', price: 2450000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 14, name: 'Sản phẩm phong thủy 14', price: 2750000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 15, name: 'Sản phẩm phong thủy 15', price: 3050000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 16, name: 'Sản phẩm phong thủy 16', price: 1900000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' }
];
const Popup = ({ onClose }) => {
    const handleClickOutside = (e) => {
        if (e.target.className === 'popup') {
            onClose();  // Đóng popup nếu click ra ngoài nội dung popup
        }
    };
    return (
        <div className="popup" onClick={handleClickOutside}>
            <div className="popup-content">
            <button className="close-icon" onClick={onClose}>✖</button> {/* Dấu X */}
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
const SanphamPage = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterType, setFilterType] = useState('all');
    const [showPopup, setShowPopup] = useState(false);
    // Hàm xử lý sắp xếp và lọc sản phẩm
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
    // Sử dụng useMemo để lọc và sắp xếp danh sách sản phẩm khi state thay đổi
    const filteredProducts = useMemo(() => {
        let products = initialProducts;
        
        // Lọc sản phẩm
        if (filterType !== 'all') {
            products = products.filter(product => product.type === filterType);
        }

        // Sắp xếp sản phẩm
        return products.sort((a, b) => 
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
    }, [sortOrder, filterType]);

    // Hàm cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        <div className="product" key={product.id} type={product.type}>
                            <img src={product.img} alt={product.name} className="product__img" />
                            <h3 className="product__name">{product.name}</h3>
                            <p className="product__price">{product.price.toLocaleString()} VND</p>
                            <div className="button-booking">
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
