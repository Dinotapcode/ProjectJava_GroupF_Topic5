import React, { useState } from 'react';
import './style.scss';

const PaymentSection = ({ onConfirmPayment, subscriptions, onClose }) => {
  const [subscriptionId, setSubscriptionId] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [status] = useState('INACTIVE');
  const [paymentDate] = useState(new Date().toISOString());
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    console.log('Selected package:', pkg); // For debugging
    setSelectedPackage(pkg);
    setSubscriptionId(pkg.subscriptionId);
    setAmount(pkg.price);
    setUserId(Math.floor(Math.random() * 1000000)); // Example: Generate random user ID
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      subscriptionId,
      userId,
      amount,
      paymentDate,
      status,
    };

    fetch('http://localhost:8083/payments/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then(response => response.json())
      .then(data => {
        alert('Payment processed successfully');
        onConfirmPayment(data);
        console.log('Payment data:', data);
      })
      .catch(error => {
        console.error('Error processing payment:', error);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Thanh toán</h2>

        <div className="subscription-list">
          <h3>Available Subscription Packages</h3>
          {selectedPackage ? (
            <div className="subscription-item">
              <p><strong>ID:</strong> {selectedPackage.subscriptionId}</p>
              <p><strong>Name:</strong> {selectedPackage.subscriptionName}</p>
              <p><strong>Price:</strong> {selectedPackage.price} VND</p>
              <p><strong>Description:</strong> {selectedPackage.description}</p>
            </div>
          ) : (
            <p>No package selected</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label>Subscription ID:</label>
          <input type="text" value={subscriptionId} readOnly required />

          <label>User ID:</label>
          <input type="text" value={userId} readOnly required />

          <label>Amount (VND):</label>
          <input type="number" value={amount} readOnly required />

          <label>Payment Date:</label>
          <input type="text" value={paymentDate} readOnly />

          <label>Status:</label>
          <input type="text" value={status} readOnly />

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
