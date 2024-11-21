import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './sp.scss';

const SanphamPage = () => {
    const [products, setProducts] = useState([]); // Mảng chứa sản phẩm
    const [loading, setLoading] = useState(true); // Để hiển thị loading khi đang tải sản phẩm
    const [error, setError] = useState(null); // Để hiển thị lỗi nếu có
    const [filterItem, setFilterItem] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortType, setSortType] = useState('all');

    // Gọi API để lấy dữ liệu sản phẩm từ backend
    useEffect(() => {
        fetch('http://localhost:8083/api/products/all') // Đảm bảo API trả về danh sách sản phẩm
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu sản phẩm');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Bộ lọc và sắp xếp sản phẩm
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (filterItem !== 'all') {
            filtered = filtered.filter(product => product.item === filterItem);
        }

        if (sortType !== 'all') {
            filtered = filtered.filter(product => product.type === sortType);
        }

        return filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }, [filterItem, sortOrder, sortType, products]);

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

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
                        <option disabled>--Các loại cá--</option>
                        <option value="Cá Koi Showa">Cá Koi Showa</option>
                        <option value="Cá Koi Asagi">Cá Koi Asagi</option>
                        <option value="Cá Koi Kohaku">Cá Koi Kohaku</option>
                        <option value="Cá Koi Shiro Utsuri">Cá Koi Shiro Utsuri</option>
                        <option value="Cá Koi Sanke">Cá Koi Sanke</option>
                        <option disabled>--Các dạng hồ cá--</option>
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
                        <img src={`/img_products/${product.img}`} alt={product.name} />
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
