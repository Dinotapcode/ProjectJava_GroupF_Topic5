import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
    const API_BASE_URL = "http://localhost:8083/api";
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Dừng trạng thái tải
            }
        };

        fetchProductAndUser(); // Gọi hàm khi component render
    }, [id]); // Chạy lại khi `id` thay đổi

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
                <ProductDetail product={product} />
            ) : (
                <p>Sản phẩm không tồn tại.</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
