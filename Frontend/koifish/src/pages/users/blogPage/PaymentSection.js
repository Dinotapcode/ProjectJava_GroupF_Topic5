import React from 'react';
import './style.scss';

const PaymentSection = () => {
  return (
    <div className="payment-section">
      <h3>Thông Tin Thanh Toán</h3>
      <div className="payment-details">
        <div className="qr-code">
        <img src="https://example.com/qr-code.png" alt="QR Code" />
        </div>
        <div className="account-info">
          <p>Tên Chủ Tài Khoản: Nguyễn Văn A</p>
          <p>Số Tài Khoản: 123456789</p>
          <p>Số Tiền/Bài: 100,000 VND</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;

