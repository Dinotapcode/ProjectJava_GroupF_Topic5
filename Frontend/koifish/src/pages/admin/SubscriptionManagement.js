import React, { useState, useEffect } from 'react';
import './SubscriptionManagement.scss';
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
    const fetchSubscriptions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/subscriptions/all`, {
                headers: { Authorization: sessionStorage.getItem('authHeader') }
            });
            const data = await response.json();
            setSubscriptions(data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    useEffect(() => {
        fetchSubscriptions(); // Gọi API khi component load
    }, []);

    // Tạm hoãn subscription
    const handlePauseSubscription = async (index) => {
        const subscription = subscriptions[index];
        try {
            const response = await fetch(`${API_BASE_URL}/admin/subscriptions/pause/${subscription.subscriptionId}`, {
                method: 'PUT',
                headers: { Authorization: sessionStorage.getItem('authHeader') }
            });
            if (!response.ok) {
                throw new Error('Failed to pause subscription');
            }

            // Sau khi tạm hoãn, gọi lại API để cập nhật danh sách
            fetchSubscriptions();
        } catch (error) {
            console.error('Error pausing subscription:', error);
        }
    };

    // Hủy tạm hoãn subscription
    const handleResumeSubscription = async (index) => {
        const subscription = subscriptions[index];
        try {
            const response = await fetch(`${API_BASE_URL}/admin/subscriptions/resume/${subscription.subscriptionId}`, {
                method: 'PUT',
                headers: { Authorization: sessionStorage.getItem('authHeader') }
            });
            if (!response.ok) {
                throw new Error('Failed to resume subscription');
            }

            // Sau khi hủy tạm hoãn, gọi lại API để cập nhật danh sách
            fetchSubscriptions();
        } catch (error) {
            console.error('Error resuming subscription:', error);
        }
    };

    // Xóa subscription
    const handleDeleteSubscription = async (index) => {
        const subscription = subscriptions[index];
        try {
            const response = await fetch(`${API_BASE_URL}/admin/subscriptions/delete/${subscription.subscriptionId}`, {
                method: 'DELETE',
                headers: { Authorization: sessionStorage.getItem('authHeader') }
            });
            if (!response.ok) {
                throw new Error('Failed to delete subscription');
            }

            // Sau khi xóa, gọi lại API để cập nhật danh sách
            fetchSubscriptions();
        } catch (error) {
            console.error('Error deleting subscription:', error);
        }
    };

    // Thêm mới subscription
    const handleAddSubscription = async () => {
        if (!newSubscription.subscriptionName || !newSubscription.price || !newSubscription.description || !newSubscription.duration) {
            alert('Vui lòng nhập đầy đủ thông tin gói subscription');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/admin/subscriptions/add`, {
                method: 'POST',
                headers: {
                    Authorization: sessionStorage.getItem('authHeader'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSubscription),
            });

            if (!response.ok) {
                throw new Error('Failed to add new subscription');
            }

            // Sau khi thêm, gọi lại API để cập nhật danh sách
            fetchSubscriptions();
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
        <div className="payment-management">
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
