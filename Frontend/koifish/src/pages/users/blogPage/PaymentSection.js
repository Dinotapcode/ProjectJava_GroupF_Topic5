import React, { useState } from 'react';
import './style.scss';

const PaymentSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showQrPopup, setShowQrPopup] = useState(false);

  const packages = [
    { id: 1, name: "Gói 1", description: "1 tuần - 50k - Đăng 3 bài", price: 50000 },
    { id: 2, name: "Gói 2", description: "1 tháng - 200k - Thoải mái đăng bài", price: 200000 },
    { id: 3, name: "Gói 3", description: "3 tháng - 500k - Thoải mái đăng bài", price: 500000 }
  ];

  const handleMouseEnter = (id) => {
    setSelectedPackage(id);
  };

  const handleMouseLeave = () => {
    setSelectedPackage(null);
  };

  const handlePaymentClick = (id) => {
    setSelectedPackage(id);
    setShowQrPopup(true);
  };

  const closePopup = () => {
    setShowQrPopup(false);
  };

  const handlePaymentConfirmation = () => {
    alert('Cảm ơn bạn đã thanh toán!- Vui lòng đợi 5p để được nhận gói dịch vụ');
    closePopup();
  };

  return (
    <div className="payment-section">
      <h3>Chọn Gói Thanh Toán</h3>
      <div className="package-options">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className={`package-option ${selectedPackage === pkg.id ? 'highlight' : ''}`}
            onMouseEnter={() => handleMouseEnter(pkg.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handlePaymentClick(pkg.id)}
          >
            <h4>{pkg.name}</h4>
            <p>{pkg.description}</p>
          </div>
        ))}
      </div>

      {showQrPopup && (
        <div className="qr-popup">
          <div className="qr-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <div className="qr-code">
              <img src="https://example.com/qr-code.png" alt="QR Code" />
            </div>
            <div className="account-info">
              <p>Tên Chủ Tài Khoản: Nguyễn Văn A</p>
              <p>Số Tài Khoản: 123456789</p>
              <p>Thanh Toán: {packages.find(pkg => pkg.id === selectedPackage)?.price} VND</p>
            </div>
            <button className="payment-confirmation-btn" onClick={handlePaymentConfirmation}>
              Đã Thanh Toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
