// src/components/ProductDetail.js
import React from 'react';

const ProductDetail = ({ product }) => {
    if (!product) {
        return <div>Không tìm thấy sản phẩm!</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <img src={product.img} alt={product.name} />
            <p>Giá: {product.price.toLocaleString('vi-VN')} VND</p>
            <p>{product.description}</p>
            <button onClick={() => window.history.back()}>Quay lại</button>
        </div>
    );
};

export default ProductDetail;
