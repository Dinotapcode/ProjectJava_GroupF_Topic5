import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
    const API_BASE_URL = "http://localhost:8083/api";
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null); // state để lưu thông tin người dùng
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    // Lấy thông tin sản phẩm và người dùng trang này có phân quyền ko
    useEffect(() => {
        const fetchProductAndUser = async () => {
            try {
                // Fetch sản phẩm
                const productResponse = await fetch(`${API_BASE_URL}/public/product/detail?id=${id}`);
                if (!productResponse.ok) {
                    throw new Error('Sản phẩm không tồn tại');
                }
                const productData = await productResponse.json();
                setProduct(productData);

                // Fetch thông tin người dùng
                
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProductAndUser();
    }, [id]);

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => window.history.back()}>Quay lại</button>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            {product ? (
                <ProductDetail product={product}  />
            ) : (
                <p>Sản phẩm hoặc người dùng không tồn tại.</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
