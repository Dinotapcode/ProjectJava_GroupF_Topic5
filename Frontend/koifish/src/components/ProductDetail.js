import React, { useState } from 'react';

const ProductDetail = ({ product }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '' // Thêm trường giờ vào formData
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
        console.log('Thông tin tư vấn:', formData);
        setIsPopupVisible(false);
    };

    const handlePopupClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClosePopup();
        }
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

                    {product.item === 'fish' && (
                        <>
                            <p>Màu sắc: {product.info1}</p>
                            <p>Cân nặng: {product.info2}</p>
                            <p>Xuất xứ: {product.info3}</p>
                        </>
                    )}

                    {product.item === 'aquarium' && (
                        <>
                            <p>Kích thước: {product.info1}</p>
                            <p>Chất liệu: {product.info2}</p>
                            <p>Xuất xứ: {product.info3}</p>
                        </>
                    )}
                    <div className='btn-detail'>
                        <button onClick={handleConsultationClick}>Đặt lịch tư vấn</button>
                        <button onClick={() => window.history.back()}>Quay lại</button>
                    </div>
                </div>
            </div>

            {isPopupVisible && (
                <div className="popup" onClick={handlePopupClick}>
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
                                    placeholder='Trần Văn A'
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
                                    placeholder='0987654321'
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
                                    placeholder='example@gmail.com'
                                    required 
                                />
                            </label>
                            <label>
                                Ngày hẹn:
                                <input 
                                    type="date" 
                                    name="date" 
                                    value={formData.date} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Giờ hẹn:
                                <input 
                                    type="time" 
                                    name="time" 
                                    value={formData.time} 
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
