// src/pages/ProductDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';

// Danh sách sản phẩm ban đầu
const initialProducts = [
    { 
        id: 1, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        details: { weight: '1.5kg', color: 'Đỏ', breed: 'Koi Nhật' } 
    },
    { 
        id: 2, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        details: { size: '100x50x50 cm', material: 'Kính cường lực', capacity: '200L' } 
    },
    // Các sản phẩm khác...
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = initialProducts.find(prod => prod.id === parseInt(id));

    if (!product) {
        return <h2>Sản phẩm không tồn tại.</h2>;
    }

    return (
        <div className="product-detail">
            <h1 className="product-detail__title">{product.name}</h1>
            <img src={product.img} alt={product.name} className="product-detail__img" />
            <p className="product-detail__price">Giá: {product.price.toLocaleString()} VND</p>
            <p className="product-detail__type">Loại sản phẩm: {product.type === 'fish' ? 'Cá' : 'Hồ'}</p>
            
            {product.type === 'fish' ? (
                <div className="product-detail__details">
                    <h2>Thông tin chi tiết</h2>
                    <p>Trọng lượng: {product.details.weight}</p>
                    <p>Màu sắc: {product.details.color}</p>
                    <p>Loại giống: {product.details.breed}</p>
                </div>
            ) : (
                <div className="product-detail__details">
                    <h2>Thông tin chi tiết</h2>
                    <p>Kích thước: {product.details.size}</p>
                    <p>Chất liệu: {product.details.material}</p>
                    <p>Dung tích: {product.details.capacity}</p>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
