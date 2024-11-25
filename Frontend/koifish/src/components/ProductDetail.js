import React, { useState } from 'react';

const ProductDetail = ({ product }) => {
    const [contact, setContact] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
const userId = sessionStorage.getItem('userId');
const [user, setUser] = useState({
    userName: '',
    
});
    // Hàm mở popup khi nhấn vào "Đặt lịch tư vấn"
    const handleConsultationClick = () => {
        if (userId){
            fetch(`http://localhost:8083/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': sessionStorage.getItem('authHeader'), // Thêm Basic Auth header
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data); // Lưu thông tin người dùng vào state
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
                setIsPopupVisible(true);
        }else{
            setIsPopupVisible(false);
            alert('Vui lớng đăng nhập để đặt lịch tư vấn.');
        }
    };

    // Hàm đóng popup
    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "contact") {
            setContact(value);
        } else if (name === "date") {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                alert('Không thể chọn ngày trong quá khứ');
                return;
            }
            setErrorMessage('');
            setDate(value);
            setTime('');
        } else if (name === "time") {
            const selectedTime = value;
            const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);
            
            // Kiểm tra giờ hành chính (7:00 - 17:00)
            if (selectedHour < 7 || selectedHour > 17 || (selectedHour === 17 && selectedMinute > 0)) {
                alert('Vui lòng chọn giờ trong khung giờ hành chính (7:00 - 17:00)');
                return;
            }

            const selectedDate = new Date(date);
            const now = new Date();

            // Nếu ngày được chọn là ngày hiện tại, kiểm tra thêm với giờ hiện tại
            if (selectedDate.toDateString() === now.toDateString()) {
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();

                if (selectedHour < currentHour || 
                    (selectedHour === currentHour && selectedMinute < currentMinute)) {
                    alert('Không thể chọn thời gian trong quá khứ');
                    return;
                }
            }
            setTime(value);
        }
    };

    // Kiểm tra hợp lệ số điện thoại (chỉ kiểm tra nếu là số)
    const isPhoneNumberValid = (phone) => {
        const phonePattern = /^[0-9]+$/;  // Kiểm tra xem có phải là số hay không
        return phonePattern.test(phone);
    };

    // Kiểm tra hợp lệ email (phải chứa @ và .)
    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Kiểm tra hợp lệ liên hệ (SDT hoặc Email)
        if (!contact) {
            setErrorMessage('Vui lòng nhập số điện thoại hoặc email.');
            setIsSubmitting(false);
            return;
        }

        if (!isPhoneNumberValid(contact) && !isEmailValid(contact)) {
            setErrorMessage('Số điện thoại không hợp lệ hoặc email không hợp lệ.');
            setIsSubmitting(false);
            return;
        }

        const consultationData = {
            user_id: user.id,
            product_id: product.id,
            contact: contact,
            date: date,
            time: time,
        };

        try {
            const response = await fetch('http://localhost:8083/api/public/consultation/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(consultationData),
            });

            if (response.ok) {
                alert('Đặt lịch tư vấn thành công!');
                setContact('');
                setDate('');
                setTime('');
                handleClosePopup();
            } else {
                setErrorMessage('Đã xảy ra lỗi khi tạo lịch hẹn.');
            }
        } catch (error) {
            setErrorMessage('Lỗi kết nối với server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Hàm kiểm tra nhấp ngoài popup
    const handlePopupClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClosePopup();
        }
    };

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                <div className="product-image">
                    <img src={`/uploads/img_products/${product.img}`} alt={product.name} />
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
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-popup" onClick={handleClosePopup}>X</span>
                        <h2>Đặt lịch tư vấn</h2>

                        {/* Hiển thị thông tin người dùng */}
                        <label>
                            Họ tên:
                            <input
                                type="text"
                                value={user.userName}  // Sử dụng user.userName thay vì user.name
                                disabled
                            />
                        </label>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="product_id" value={product.id} />
                            <input type="hidden" name="user_id" value={user.id} />
                            <label>
                                Liên hệ:
                                <input
                                    type="text"
                                    name="contact"
                                    value={contact}
                                    onChange={handleChange}
                                    placeholder="Nhập sdt hoặc email"
                                    required
                                />
                            </label>
                            <label>
                                Ngày hẹn:
                                <input
                                    type="date"
                                    name="date"
                                    value={date}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Giờ hẹn:
                                <input
                                    type="time"
                                    name="time"
                                    value={time}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Hiển thị thông báo thành công/lỗi */}
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            <div className='btn'>
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
