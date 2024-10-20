import React, { useState } from 'react';

const ProductDetail = ({ product }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    if (!product) {
        return <div>Không tìm thấy sản phẩm!</div>;
    }

    const handleConsultationClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý dữ liệu form khi submit
        console.log('Thông tin tư vấn:', formData);
        setIsPopupVisible(false); // Đóng popup sau khi submit
    };

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                <div className="product-image">
                    <img src={product.img} alt={product.name} />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p>Giá: {product.price.toLocaleString('vi-VN')} VND</p>
                    <p>{product.description}</p>

                    {product.type === 'fish' && (
                        <>
                            <p>Màu sắc: {product.color}</p>
                            <p>Cân nặng: {product.weight}</p>
                            <p>Xuất xứ: {product.origin}</p>
                        </>
                    )}

                    {product.type === 'aquarium' && (
                        <>
                            <p>Kích thước: {product.size}</p>
                            <p>Chất liệu: {product.material}</p>
                            <p>Xuất xứ: {product.origin}</p>
                        </>
                    )}

                    <button onClick={handleConsultationClick}>Đặt lịch tư vấn</button>
                    <button onClick={() => window.history.back()}>Quay lại</button>
                </div>
            </div>

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-popup" onClick={handleClosePopup}>X</span>
                        <h2>Đặt lịch tư vấn</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Họ tên:
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Số điện thoại:
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Email:
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <div className='btn'>
                            <button type="submit">Gửi thông tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
