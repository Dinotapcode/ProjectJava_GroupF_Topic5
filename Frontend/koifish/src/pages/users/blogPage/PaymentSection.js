import React, { useEffect, useState } from 'react';
import './style.scss';
import { IoClose } from "react-icons/io5";

const API_BASE_URL = "http://localhost:8083/api";

const PaymentSection = ({ userId, onConfirmPayment, subscriptions, onClose }) => {
  const [userName, setUserName] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Fetch username on component mount
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

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSubscriptionId(pkg.subscriptionId);
    setAmount(pkg.price);
  };

  // Handle form submission and payment processing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackage) {
      alert('Vui lồng chọn gói đăng ký');
      return;
    }

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

      alert('Thanh toán thành công');
      onConfirmPayment();
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Đã xảy ra lỗi khi xử lý thanh toán');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
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

          <div className='form-input'>
            <label>Tên người dùng:</label>
            <input type="text" value={userName} readOnly required />
          </div>

          <div className='form-input'>
            <label>Tên gói:</label>
            <input
              type="text"
              value={selectedPackage ? selectedPackage.subscriptionName : ''}
              readOnly
              required
            />
          </div>

          <div className='form-input'>
            <label>Số tiền (VND):</label>
            <input type="number" value={amount} readOnly required />
          </div>

          <div className='form-input'>
            <label>Ngày thanh toán:</label>
            <input type="text" value={new Date().toISOString().split('T')[0]} readOnly />
          </div>

          <div className='form-input'>
            <label>Trạng thái:</label>
            <input type="text" value="Completed" readOnly />
          </div>

          <div className="form-buttons">
            <button className="confirm-btn" type="submit">Xác nhận thanh toán</button>
            <button className="close-btn" onClick={onClose}><IoClose className="close-icon" /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentSection;
