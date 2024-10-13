import React, { memo, useState, useMemo } from 'react';
import './style.scss';
import './sp.scss';
import Header from '../theme/header';

// Danh sách sản phẩm ban đầu
const initialProducts = [
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
    { id: 1, name: 'Sản phẩm phong thủy 1', price: 2000000, img: require('../../../assets/users/images/img_sp/1.png'), type: 'fish' },
    { id: 2, name: 'Sản phẩm phong thủy 2', price: 1000000, img: require('../../../assets/users/images/img_sp/aquarium.jpg'), type: 'aquarium' },
];

const SanphamPage = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterType, setFilterType] = useState('all');

    // Hàm xử lý sắp xếp và lọc sản phẩm
    const handleSort = (order) => {
        setSortOrder(order);
        scrollToTop();
    };

    const handleFilter = (type) => {
        setFilterType(type);
        scrollToTop();
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
        <div className="app">
           <Header />

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
