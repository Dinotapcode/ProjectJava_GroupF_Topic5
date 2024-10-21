// src/pages/ProductDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail'; // Nhập component
import './ProductDetailPage.scss';

const initialProducts = [
    { 
        id: 1, 
        name: 'Cá phong thủy', 
        price: 2000000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả cá phong thủy...', 
        color: 'Đỏ', 
        weight: '500g', 
        origin: 'Việt Nam' 
    },
    { 
        id: 2, 
        name: 'Hồ thủy sinh', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả hồ thủy sinh...', 
        size: '1m x 0.5m x 0.5m', 
        material: 'Kính cường lực', 
        origin: 'Nhật Bản' 
    },
    { 
        id: 3, 
        name: 'Cá cảnh 1', 
        price: 1500000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả cá cảnh 1...', 
        color: 'Xanh', 
        weight: '300g', 
        origin: 'Thái Lan' 
    },
    { 
        id: 4, 
        name: 'Hồ thủy sinh 2', 
        price: 2500000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả hồ thủy sinh 2...', 
        size: '1.2m x 0.6m x 0.6m', 
        material: 'Thủy tinh', 
        origin: 'Đài Loan' 
    },
    { 
        id: 5, 
        name: 'Cá cảnh 2', 
        price: 1800000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả cá cảnh 2...', 
        color: 'Vàng', 
        weight: '400g', 
        origin: 'Việt Nam' 
    },
    { 
        id: 6, 
        name: 'Hồ thủy sinh 3', 
        price: 2200000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả hồ thủy sinh 3...', 
        size: '1m x 0.7m x 0.5m', 
        material: 'Kính trong suốt', 
        origin: 'Mỹ' 
    },
    { 
        id: 7, 
        name: 'Cá đuôi đỏ', 
        price: 1700000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả cá đuôi đỏ...', 
        color: 'Đỏ', 
        weight: '350g', 
        origin: 'Việt Nam' 
    },
    { 
        id: 8, 
        name: 'Hồ thủy sinh 4', 
        price: 2800000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả hồ thủy sinh 4...', 
        size: '1.5m x 0.5m x 0.5m', 
        material: 'Kính cường lực', 
        origin: 'Hàn Quốc' 
    },
    { 
        id: 9, 
        name: 'Cá bảy màu', 
        price: 1600000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        type: 'fish', 
        description: 'Mô tả cá bảy màu...', 
        color: 'Nhiều màu', 
        weight: '250g', 
        origin: 'Việt Nam' 
    },
    { 
        id: 10, 
        name: 'Hồ thủy sinh 5', 
        price: 3000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        type: 'aquarium', 
        description: 'Mô tả hồ thủy sinh 5...', 
        size: '1.8m x 0.6m x 0.6m', 
        material: 'Kính trong suốt', 
        origin: 'Pháp' 
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
