import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import './sp.scss';

const SanphamPage = () => {
    const API_BASE_URL = "http://localhost:8083/api";
    const [productTypeOptions, setProductTypeOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterItem, setFilterItem] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortType, setSortType] = useState('all');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Retrieve session data
    const selectedKoi = sessionStorage.getItem('selectedKoi');
    const selectedPondShape = sessionStorage.getItem('selectedPondShape');

    // Add new ref for the filter container
    const filterRef = useRef(null);

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target) && 
                !event.target.classList.contains('button-filter')) {
                setIsFilterVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                alert("Có lỗi xảy ra khi truy cập trang sản phẩm.");
            }
        };

        fetchOptions();
    }, []);

    // Fetch products
    useEffect(() => {
        fetch(`${API_BASE_URL}/public/product/all`)
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

    // Filter products based on session data and other filters
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter based on item type (fish, aquarium, etc.)
        if (filterItem !== 'all') {
            filtered = filtered.filter(product => product.item === filterItem);
        }

        // Filter based on sort type (e.g., product type)
        if (sortType !== 'all') {
            filtered = filtered.filter(product => product.type === sortType);
        }

        // Sort products by price based on selected sort order
        return filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }, [products, selectedKoi, selectedPondShape, filterItem, sortOrder, sortType]);

    const handleResetFilters = () => {
        setFilterItem('all');
        setSortOrder('asc');
        setSortType('all');
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <div className="container">
            {!loading && !error && (
                <div className="sanpham-page">
                    <h1>Danh sách sản phẩm</h1>
                    <div className="sanpham-page__controls">
                        <button className="button-reset" onClick={handleResetFilters}>Tất cả</button>
                        <button onClick={toggleFilterVisibility} className="button-filter">
                            {isFilterVisible ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                        </button>
                        {isFilterVisible && (
                            <div className="control__filter" ref={filterRef}>
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
                                        {productTypeOptions.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        )}
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
            )}
        </div>
    );
};

export default SanphamPage;
