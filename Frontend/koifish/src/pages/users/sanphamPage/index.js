import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './sp.scss';

const SanphamPage = () => {
    const API_BASE_URL = "http://localhost:8083/api";
    const [productTypeOptions, setProductTypeOptions] = useState([]);
    const [products, setProducts] = useState([]); // Mảng chứa sản phẩm
    const [loading, setLoading] = useState(true); // Để hiển thị loading khi đang tải sản phẩm
    const [error, setError] = useState(null); // Để hiển thị lỗi nếu có
    const [filterItem, setFilterItem] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortType, setSortType] = useState('all');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const productTypeResponse = await fetch(`${API_BASE_URL}/public/product/option/type`);

                if (!productTypeResponse.ok) {
                    throw new Error("Không thể truy cập API");
                }

                const productTypeData = await productTypeResponse.json();

                setProductTypeOptions(productTypeData);
            } catch (err) {
                setError("Có lỗi xảy ra khi truy cập API.");
            }
        };

        fetchOptions();
    }, []);

    // Gọi API để lấy dữ liệu sản phẩm từ backend
    useEffect(() => {
        fetch(`${API_BASE_URL}/public/product/all`) // Đảm bảo API trả về danh sách sản phẩm
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
                        {productTypeOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="sanpham-page__list">
                {filteredProducts.map(product => (
                    <div className="sanpham-page__item" key={product.id}>
                        <Link to={`/san-pham-phong-thuy/${product.id}`}>
                            <img src={`/uploads/img_products/${product.img}`} alt={product.name} />
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
