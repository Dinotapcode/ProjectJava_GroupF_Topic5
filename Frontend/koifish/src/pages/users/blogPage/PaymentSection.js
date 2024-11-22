import React, { useEffect, useState } from 'react';
import './style.scss';

const API_BASE_URL = "http://localhost:8083/api";

const PaymentSection = ({ userId, onConfirmPayment, subscriptions, onClose }) => {
  const [userName, setUserName] = useState(''); // Trực tiếp lưu userName
  const [subscriptionId, setSubscriptionId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
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
          setUserName(data.userName); // Đảm bảo đúng field từ API
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

    const token = localStorage.getItem('token');
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

        <div className="subscription-list">
          <h3>Available Subscription Packages</h3>
          {selectedPackage ? (
            <div className="subscription-item">
              <p><strong>Name:</strong> {selectedPackage.subscriptionName}</p>
              <p><strong>Price:</strong> {selectedPackage.price} VND</p>
              <p><strong>Description:</strong> {selectedPackage.description}</p>
              <p><strong>Subscription ID:</strong> {selectedPackage.subscriptionId}</p>
            </div>
          ) : (
            <p>No package selected</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={userName} readOnly required />

          <label>User ID:</label>
          <input type="text" value={userId} readOnly required />

          <label>Subscription Name:</label>
          <input type="text" value={selectedPackage.subscriptionName} readOnly required />

          <label>Amount (VND):</label>
          <input type="number" value={amount} readOnly required />

          <label>Payment Date:</label>
          <input type="text" value={new Date().toISOString().split('T')[0]} readOnly />

          <label>Status:</label>
          <input type="text" value="Completed" readOnly />

          <div className="form-buttons">
            <button type="submit">Tạo</button>
            <button type="button" onClick={onClose} className="cancel-button">Hủy</button>
          </div>
        </form>

        <div className="subscription-selection">
          <h3>Select a Subscription Package</h3>
          {subscriptions.length > 0 ? (
            subscriptions.map((pkg) => (
              <button key={pkg.subscription_id} onClick={() => handlePackageSelect(pkg)}>
                Gói {pkg.subscription_name} - {pkg.price} VND
              </button>
            ))
          ) : (
            <p>No subscription packages available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
