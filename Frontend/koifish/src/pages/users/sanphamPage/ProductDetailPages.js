// src/pages/ProductDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail'; // Nhập component
import './ProductDetailPage.scss';

const initialProducts = [
    { 
        id: 1, 
        name: 'Cá phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả cá phong thủy 1...', 
        color: 'Đỏ', 
        weight: '500g', 
        origin: 'Việt Nam' 
    },
    { 
        id: 2, 
        name: 'Hồ thủy sinh 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả hồ thủy sinh 2...', 
        size: '1m x 0.5m x 0.5m', 
        material: 'Kính cường lực', 
        origin: 'Nhật Bản' 
    },
];


const ProductDetailPage = () => {
    const { id } = useParams();
    const product = initialProducts.find(product => product.id === parseInt(id));

    return (
        <div className="product-detail-page">
            <ProductDetail product={product} /> 
        </div>
    );
};

export default ProductDetailPage;
