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
        item: 'fish', 
        type: 'Loại cá', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
        
    },
    { 
        id: 2, 
        name: 'Hồ thủy sinh', 
        price: 1000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình dạng', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
        
    },
    { 
        id: 3, 
        name: 'Cá cảnh 1', 
        price: 1500000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Loại cá', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 4, 
        name: 'Hồ thủy sinh 2', 
        price: 2500000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình dạng', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
    { 
        id: 5, 
        name: 'Cá cảnh 2', 
        price: 1800000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Loại cá', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 6, 
        name: 'Hồ thủy sinh 3', 
        price: 2200000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình dạng', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
    { 
        id: 7, 
        name: 'Cá đuôi đỏ', 
        price: 1700000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Loại cá', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 8, 
        name: 'Hồ thủy sinh 4', 
        price: 2800000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình dạng', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
    { 
        id: 9, 
        name: 'Cá bảy màu', 
        price: 1600000, 
        img: require('../../../assets/users/images/img_sp/1.png'), 
        item: 'fish', 
        type: 'Loại cá', 
        description: 'Mô tả cá phong thủy...', 
        info1: 'Đỏ', 
        info2: '500g', 
        info3: 'Việt Nam'
    },
    { 
        id: 10, 
        name: 'Hồ thủy sinh 5', 
        price: 3000000, 
        img: require('../../../assets/users/images/img_sp/aquarium.jpg'), 
        item: 'aquarium', 
        type: 'Hình dạng', 
        description: 'Mô tả hồ thủy sinh...', 
        info1:'1m x 0.5m x 0.5m', 
        info2:'Kính cường lực', 
        info3: 'Nhật Bản'
    },
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = initialProducts.find(product => product.id === parseInt(id));

    return (
        <div className="product-detail-page">
            {/* Nếu không tìm thấy sản phẩm, có thể hiển thị thông báo lỗi */}
            {product ? (
                <ProductDetail product={product} />
            ) : (
                <p>Sản phẩm không tồn tại.</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
