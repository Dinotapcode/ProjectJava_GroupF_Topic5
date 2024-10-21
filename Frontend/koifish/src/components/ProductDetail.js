import React, { useState } from 'react';

const ProductDetail = ({ product }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
        return <div>Không tìm thấy sản phẩm!</div>;
    }

    // Hàm mở popup
    const handleConsultationClick = () => {
        setIsPopupVisible(true);
    };

    // Hàm đóng popup
    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    // Hàm xử lý thay đổi input trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý dữ liệu form khi submit
        console.log('Thông tin tư vấn:', formData);
        setIsPopupVisible(false); // Đóng popup sau khi submit
    };

    // Hàm xử lý click để đóng popup khi bấm ra ngoài
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

                    {/* Hiển thị thuộc tính cho sản phẩm là cá */}
                    {product.type === 'fish' && (
                        <>
                            <p>Màu sắc: {product.color}</p>
                            <p>Cân nặng: {product.weight}</p>
                            <p>Xuất xứ: {product.origin}</p>
                        </>
                    )}

                    {/* Hiển thị thuộc tính cho sản phẩm là bể cá */}
                    {product.type === 'aquarium' && (
                        <>
                            <p>Kích thước: {product.size}</p>
                            <p>Chất liệu: {product.material}</p>
                            <p>Xuất xứ: {product.origin}</p>
                        </>
                    )}
                    <div className='btn-detail'>
                    <button onClick={handleConsultationClick}>Đặt lịch tư vấn</button>
                    <button onClick={() => window.history.back()}>Quay lại</button>
                    </div>
                </div>
            </div>

            {/* Hiển thị popup nếu isPopupVisible là true */}
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
                                    placeholder='Tràn Văn A'
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
