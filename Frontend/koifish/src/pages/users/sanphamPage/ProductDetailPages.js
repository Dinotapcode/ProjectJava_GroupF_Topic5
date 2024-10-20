// src/pages/ProductDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail'; // Nhập component
import './ProductDetailPage.scss';

const initialProducts = [
    { 
        id: 1, 
        name: 'Sản phẩm phong thủy 1', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả sản phẩm phong thủy 1...' 
    },
    { 
        id: 2, 
        name: 'Sản phẩm phong thủy 2', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả sản phẩm phong thủy 2...' 
    },
   
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = initialProducts.find(item => item.id === parseInt(id));

    return (
        <div className="product-detail-page">
            <ProductDetail product={product} /> 
        </div>
    );
};

export default ProductDetailPage;
