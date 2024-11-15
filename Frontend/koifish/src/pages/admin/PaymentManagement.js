import React, { useState } from 'react';
import './PaymentManagement.scss';

const PaymentManagement = ({ subscriptions = [], setSubscriptions }) => {
    const [newSubscription, setNewSubscription] = useState({
        subscription_name: '',
        price: '',
        description: '',
        duration: '',
    });

    const handleAddSubscription = () => {
        const updatedSubscriptions = [...subscriptions, { ...newSubscription, subscription_id: subscriptions.length + 1 }];
        setSubscriptions(updatedSubscriptions);
        setNewSubscription({ subscription_name: '', price: '', description: '', duration: '' }); // Reset form
    };

    const handlePauseSubscription = (index) => {
        const updatedSubscriptions = [...subscriptions];
        updatedSubscriptions[index].status = 'Paused'; // Update subscription status to "Paused"
        setSubscriptions(updatedSubscriptions);
    };

    const handleDeleteSubscription = (index) => {
        const updatedSubscriptions = subscriptions.filter((_, i) => i !== index);
        setSubscriptions(updatedSubscriptions);
    };

    return (
        <div className="payment-management">
            <div className="add-subscription-form">
                <h1>Quản lý gói Subscription</h1>
                <input
                    type="text"
                    placeholder="Tên gói"
                    value={newSubscription.subscription_name}
                    onChange={(e) => setNewSubscription({ ...newSubscription, subscription_name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Giá"
                    value={newSubscription.price}
                    onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    value={newSubscription.description}
                    onChange={(e) => setNewSubscription({ ...newSubscription, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Thời gian (months)"
                    value={newSubscription.duration}
                    onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}
                />
                <button className="btn-add" onClick={handleAddSubscription}>Thêm gói</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên gói</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((subscription, index) => (
                        <tr key={subscription.subscription_id}>
                            <td>{index + 1}</td>
                            <td>{subscription.subscription_name}</td>
                            <td>{subscription.price}</td>
                            <td>{subscription.description}</td>
                            <td>{subscription.duration}</td>
                            <td>{subscription.status || 'Active'}</td>
                            <td>
                                {subscription.status !== 'Paused' && (
                                    <button className="btn-pause" onClick={() => handlePauseSubscription(index)}>
                                        Tạm hoãn
                                    </button>
                                )}
                                <button className="btn-delete" onClick={() => handleDeleteSubscription(index)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentManagement;
