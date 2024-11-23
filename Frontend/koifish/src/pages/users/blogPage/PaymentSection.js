import React, { useEffect, useState } from 'react';
import './style.scss';

const API_BASE_URL = "http://localhost:8083/api";

const PaymentSection = ({ userId, onConfirmPayment, subscriptions, onClose }) => {
  const [userName, setUserName] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: sessionStorage.getItem('authHeader'),
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
          } else {
            alert('Error fetching user data');
          }
          return;
        }

        const data = await response.json();
        if (data) {
          setUserName(data.userName);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (userId) {
      fetchUsername();
    }
  }, [userId]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSubscriptionId(pkg.subscriptionId);
    setAmount(pkg.price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount: amount,
      paymentDate: new Date().toISOString().split('T')[0],
      status: "Completed",
      subscriptionId: subscriptionId,
      userId: userId,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/public/payment/add`, {
        method: 'POST',
        headers: {
          Authorization: sessionStorage.getItem('authHeader'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
        return;
      }

      alert('Payment created successfully');
      onConfirmPayment();
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Thanh toán</h2>

        <div className="subscription-selection">
          <h3>Chọn gói đăng ký</h3>
          {subscriptions.length > 0 ? (
            subscriptions.map((pkg) => (
              <div key={pkg.subscription_id} className="subscription-item">
                <p><strong>Tên gói:</strong> {pkg.subscriptionName}</p>
                <p><strong>Giá:</strong> {pkg.price} VND</p>
                <p><strong>Mô tả:</strong> {pkg.description}</p>
                <button onClick={() => handlePackageSelect(pkg)}>Chọn gói này</button>
              </div>
            ))
          ) : (
            <p>Không có gói nào khả dụng</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label>Tên người dùng:</label>
          <input type="text" value={userName} readOnly required />

          <label>ID người dùng:</label>
          <input type="text" value={userId} readOnly required />

          <label>Tên gói:</label>
          <input
            type="text"
            value={selectedPackage ? selectedPackage.subscriptionName : ''}
            readOnly
            required
          />

          <label>Số tiền (VND):</label>
          <input type="number" value={amount} readOnly required />

          <label>Ngày thanh toán:</label>
          <input type="text" value={new Date().toISOString().split('T')[0]} readOnly />

          <label>Trạng thái:</label>
          <input type="text" value="Completed" readOnly />

          <div className="form-buttons">
            <button type="submit">Xác nhận thanh toán</button>
            <button type="button" onClick={onClose} className="cancel-button">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentSection;
