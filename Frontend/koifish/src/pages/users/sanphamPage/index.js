// src/pages/SanphamPage.js
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './sp.scss';

const initialProducts = [
    { 
        id: 1, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish' 
    },
    { 
        id: 2, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 3, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish' 
    },
    { 
        id: 4, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish' 
    },
    { 
        id: 5, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish' 
    },
    { 
        id: 6, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish' 
    },
    { 
        id: 7, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 8, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 9, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 10, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 11, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 12, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    { 
        id: 13, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium' 
    },
    // Các sản phẩm khác...
];

const SanphamPage = () => {
    const [filterType, setFilterType] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredProducts = useMemo(() => {
        let products = [...initialProducts];

        if (filterType !== 'all') {
            products = products.filter(product => product.type === filterType);
        }

        return products.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }, [filterType, sortOrder]);

    return (
        <div className="sanpham-page">
            <h1>Danh sách sản phẩm</h1>

            <div className="sanpham-page__controls">
                <label>
                    Lọc theo loại: 
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="all">Tất cả</option>
                        <option value="fish">Cá</option>
                        <option value="aquarium">Hồ cá</option>
                    </select>
                </label>

                <label>
                    Sắp xếp theo giá: 
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </label>
            </div>

            <div className="sanpham-page__list">
                {filteredProducts.map(product => (
                    <div className="sanpham-page__item" key={product.id}>
                        <Link to={`/sanpham/${product.id}`}>
                            <img src={product.img} alt={product.name} />
                        </Link>
                        <h2>{product.name}</h2>
                        <p>Giá: {product.price.toLocaleString('vi-VN')} VND</p>
                        <Link to={`/sanpham/${product.id}`}>
                            <button className='button-detail'>Xem chi tiết</button>
                         </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SanphamPage;