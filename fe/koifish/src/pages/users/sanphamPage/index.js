import React, { memo, useState } from 'react';
import './style.scss';
import './sp.scss';
import '../theme/header/style.scss';


// Danh sách sản phẩm ban đầu
const initialProducts = [
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    // Thêm sản phẩm khác tại đây
];

const SanphamPage = () => {
    const [products, setProducts] = useState(initialProducts);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterType, setFilterType] = useState('all');

    // Hàm xử lý sắp xếp sản phẩm
    const handleSort = (order) => {
        const sortedProducts = [...products].sort((a, b) => 
            order === 'asc' ? a.price - b.price : b.price - a.price
        );
        setProducts(sortedProducts);
        setSortOrder(order);
    };

    // Hàm xử lý lọc sản phẩm
    const handleFilter = (type) => {
        setFilterType(type);
    };

    // Lọc sản phẩm theo loại
    const filteredProducts = filterType === 'all' 
        ? products 
        : products.filter(product => product.type === filterType);

    // Hàm cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app">
           <header className="header">
            <div className="header__top">
                <div className="grid">
                    <nav className="header__navbar header__navbar--top">
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item"></li>
                        </ul>
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item-left header__navbar-item--separate">
                                <div className="header__navbar-icon-link">
                                    <i className="fa-regular fa-clock"></i>
                                    7:30 - 21:00
                                </div>
                            </li>
                            <li className="header__navbar-item-left header__navbar-item--separate">
                                <div className="header__navbar-icon-link">
                                    <i className="fa-solid fa-phone"></i>
                                    19008080
                                </div>
                            </li>
                            <li className="header__navbar-item header__navbar-item--bold">Đăng ký</li>
                            <li className="header__navbar-item header__navbar-item--bold">Đăng nhập</li>
                        </ul>
                    </nav>

                    <nav className="header__navbar">
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item">
                                <a href="#" className="header__navbar-logo">
                                    <img src="../../../assets/users/images/logo.png" alt="Logo" />
                                </a>
                            </li>
                        </ul>
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item header__navbar-item--strong">
                                <a href="#">GIỚI THIỆU</a>
                            </li>
                            <li className="header__navbar-item header__navbar-item--strong">
                                <a href="#">DỊCH VỤ TƯ VẤN</a>
                            </li>
                            <li className="header__navbar-item header__navbar-item--strong">
                                <a href="#">BLOG TIN TỨC</a>
                            </li>
                            <li className="header__navbar-item header__navbar-item--strong">
                                <a href="#">SẢN PHẨM</a>
                            </li>
                            <li className="header__navbar-item">
                                <i className="header__navbar-search fa-solid fa-magnifying-glass"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
                <hr />
            </div>
        </header>

            <article className="container">
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
                                <button className="product__btn">Đặt lịch tư vấn</button>
                            </div>
                        </div>
                    ))}
                </div>
            </article>

           
        </div>
    );
};

export default memo(SanphamPage);
