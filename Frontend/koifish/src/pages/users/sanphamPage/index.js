// src/pages/SanphamPage.js
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './sp.scss';

const initialProducts = [
    { 
        id: 1, 
        name: 'Cá phong thủy', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Cá Koi Showa', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
        
    },
    { 
        id: 2, 
        name: 'Hồ thủy sinh', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình vuông', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
        
    },
    { 
        id: 3, 
        name: 'Cá cảnh 1', 
        price: 1500000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Cá Koi Asagi', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 4, 
        name: 'Hồ thủy sinh 2', 
        price: 2500000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình tròn', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
    { 
        id: 5, 
        name: 'Cá cảnh 2', 
        price: 1800000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Cá Koi Kohaku', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 6, 
        name: 'Hồ thủy sinh 3', 
        price: 2200000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình bầu dục', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
    { 
        id: 7, 
        name: 'Cá đuôi đỏ', 
        price: 1700000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Cá Koi Shiro Utsuri', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 8, 
        name: 'Hồ thủy sinh 4', 
        price: 2800000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình chữ nhật', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
    { 
        id: 9, 
        name: 'Cá bảy màu', 
        price: 1600000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Cá Koi Sanke', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 10, 
        name: 'Hồ thủy sinh 5', 
        price: 3000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Vô định', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
];

const SanphamPage = () => {
    const [filterItem, setFilterItem] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortType, setSortType] = useState('all');

    const filteredProducts = useMemo(() => {
        let products = [...initialProducts];

        if (filterItem !== 'all') {
            products = products.filter(product => product.item === filterItem);
        }

        if (sortType !== 'all') {
            products = products.filter(product => product.type === sortType);
        }

        return products.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }, [filterItem, sortOrder, sortType]);

    return (
        <div className="sanpham-page">
            <h1>Danh sách sản phẩm</h1>

            <div className="sanpham-page__controls">
                <label>
                    Lọc theo loại: 
                    <select value={filterItem} onChange={(e) => setFilterItem(e.target.value)}>
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

                <label>
                    Sắp xếp theo loại: 
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option value="all">Tất cả</option>
                        <option value="Cá Koi Showa">Cá Koi Showa</option>
                        <option value="Cá Koi Asagi">Cá Koi Asagi</option>
                        <option value="Cá Koi Kohaku">Cá Koi Kohaku</option>
                        <option value="Cá Koi Shiro Utsuri">Cá Koi Shiro Utsuri</option>
                        <option value="Cá Koi Sanke">Cá Koi Sanke</option>
                        <option value="Hình vuông">Hình vuông</option>
                        <option value="Hình tròn">Hình tròn</option>
                        <option value="Hình bầu dục">Hình bầu dục</option>
                        <option value="Hình chữ nhật">Hình chữ nhật</option>
                        <option value="Vô định">Vô định</option>
                    </select>
                </label>
            </div>

            <div className="sanpham-page__list">
                {filteredProducts.map(product => (
                    <div className="sanpham-page__item" key={product.id}>
                        <Link to={`/san-pham-phong-thuy/${product.id}`}>
                            <img src={product.img} alt={product.name} />
                        </Link>
                        <h2>{product.name}</h2>
                        <p>Giá: {product.price.toLocaleString('vi-VN')} VND</p>
                        <Link to={`/san-pham-phong-thuy/${product.id}`}>
                            <button className='button-detail'>Xem chi tiết</button>
                         </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SanphamPage;
