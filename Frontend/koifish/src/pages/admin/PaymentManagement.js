import React, { useState, useEffect } from 'react';
import './PaymentManagement.scss';
const API_BASE_URL = "http://localhost:8083/api";


const SubscriptionManagement = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [newSubscription, setNewSubscription] = useState({
        subscriptionName: '',
        price: '',
        description: '',
        duration: '',
    });

    // Lấy danh sách subscription từ backend
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/public/subscriptions/all`);
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };
        fetchSubscriptions();
    }, []);

    // Tạm hoãn subscription
    const handlePauseSubscription = async (index) => {
        const subscription = subscriptions[index];
        try {
            const response = await fetch(`${API_BASE_URL}/public/subscriptions/pause/${subscription.subscriptionId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to pause subscription');
            }

            // Cập nhật trạng thái "Paused"
            const updatedSubscriptions = [...subscriptions];
            updatedSubscriptions[index].status = 'Paused';
            setSubscriptions(updatedSubscriptions);
        } catch (error) {
            console.error('Error pausing subscription:', error);
        }
    };

    // Hủy tạm hoãn subscription
    const handleResumeSubscription = async (index) => {
        const subscription = subscriptions[index];
        try {
            const response = await fetch(`${API_BASE_URL}/public/subscriptions/resume/${subscription.subscriptionId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to resume subscription');
            }

            // Cập nhật trạng thái "Active"
            const updatedSubscriptions = [...subscriptions];
            updatedSubscriptions[index].status = 'Active';
            setSubscriptions(updatedSubscriptions);
        } catch (error) {
            console.error('Error resuming subscription:', error);
        }
    };

    // Xóa subscription
    const handleDeleteSubscription = async (index) => {
        const subscription = subscriptions[index];
        try {
            const response = await fetch(`${API_BASE_URL}/public/subscriptions/delete/${subscription.subscriptionId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete subscription');
            }

            // Cập nhật lại danh sách subscriptions
            const updatedSubscriptions = subscriptions.filter((_, i) => i !== index);
            setSubscriptions(updatedSubscriptions);
        } catch (error) {
            console.error('Error deleting subscription:', error);
        }
    };

    // Thêm mới subscription
    const handleAddSubscription = async () => {
        try {
            const response = await fetch('${API_BASE_URL}/public/subscriptions/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSubscription),
            });

            if (!response.ok) {
                throw new Error('Failed to add new subscription');
            }

            const addedSubscription = await response.json();
            setSubscriptions([...subscriptions, addedSubscription]);
            setNewSubscription({
                subscriptionName: '',
                price: '',
                description: '',
                duration: '',
            });
        } catch (error) {
            console.error('Error adding subscription:', error);
        }
    };

    return (
        <div class = "payment-management">
            <h2>Subscription Management</h2>

            {/* Form Thêm Subscription */}
            <div>
                <h3>Thêm mới gói subscription</h3>
                <input
                    type="text"
                    placeholder="Tên gói"
                    value={newSubscription.subscriptionName}
                    onChange={(e) => setNewSubscription({ ...newSubscription, subscriptionName: e.target.value })}
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
                    type="number"
                    placeholder="Thời gian (ngày)"
                    value={newSubscription.duration}
                    onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}
                />
                <button onClick={handleAddSubscription}>Thêm mới</button>
            </div>

            {/* Danh sách Subscription */}
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
                        <tr key={subscription.subscriptionId}>
                            <td>{index + 1}</td>
                            <td>{subscription.subscriptionName}</td>
                            <td>{subscription.price}</td>
                            <td>{subscription.description}</td>
                            <td>{subscription.duration}</td>
                            <td>{subscription.status || 'Active'}</td>
                            <td>
                                {subscription.status !== 'Paused' ? (
                                    <button className="btn-pause" onClick={() => handlePauseSubscription(index)}>
                                        Tạm hoãn
                                    </button>
                                ) : (
                                    <button className="btn-resume" onClick={() => handleResumeSubscription(index)}>
                                        Hủy tạm hoãn
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

export default SubscriptionManagement;
