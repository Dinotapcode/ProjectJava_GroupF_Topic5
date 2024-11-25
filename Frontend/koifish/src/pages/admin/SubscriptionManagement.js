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

    // Pause subscription
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
            alert('Đã tạm dừng gói dịch vụ thành công!');
            fetchSubscriptions();
        } catch (error) {
            console.error('Error pausing subscription:', error);
            alert('Có lỗi xảy ra khi tạm dừng gói dịch vụ!');
        }
    };

    // Resume subscription
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
            alert('Đã kích hoạt gói dịch vụ thành công!');
            fetchSubscriptions();
        } catch (error) {
            console.error('Error resuming subscription:', error);
            alert('Có lỗi xảy ra khi kích hoạt gói dịch vụ!');
        }
    };

    // Delete subscription
    const handleDeleteSubscription = async (index) => {
        const subscription = subscriptions[index];
        if (window.confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/subscriptions/delete/${subscription.subscriptionId}`, {
                    method: 'DELETE',
                    headers: { Authorization: sessionStorage.getItem('authHeader') }
                });
                if (!response.ok) {
                    throw new Error('Failed to delete subscription');
                }
                alert('Đã xóa gói dịch vụ thành công!');
                fetchSubscriptions();
            } catch (error) {
                console.error('Error deleting subscription:', error);
                alert('Có lỗi xảy ra khi xóa gói dịch vụ!');
            }
        }
    };

    // Add new subscription
    const handleAddSubscription = async () => {
        if (!newSubscription.subscriptionName || !newSubscription.price || !newSubscription.description || !newSubscription.duration) {
            alert('Vui lòng nhập đầy đủ thông tin gói dịch vụ!');
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
            alert('Đã thêm gói dịch vụ mới thành công!');
            fetchSubscriptions();
            setNewSubscription({
                subscriptionName: '',
                price: '',
                description: '',
                duration: '',
            });
        } catch (error) {
            console.error('Error adding subscription:', error);
            alert('Có lỗi xảy ra khi thêm gói dịch vụ mới!');
        }
    };

    return (
        <div className="payment-management">
            <h2>Quản Lý Gói Dịch Vụ</h2>

            {/* Form Thêm Gói Dịch Vụ */}
            <div className="add-subscription">
                <h3>Thêm mới gói dịch vụ</h3>
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

            {/* Danh sách gói dịch vụ */}
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên gói</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
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
                            <td>{subscription.status === 'Paused' ? 'Tạm dừng' : 'Hoạt động'}</td>
                            <td>
                                {subscription.status !== 'Paused' ? (
                                    <button className="btn-pause" onClick={() => handlePauseSubscription(index)}>
                                        Tạm dừng
                                    </button>
                                ) : (
                                    <button className="btn-resume" onClick={() => handleResumeSubscription(index)}>
                                        Kích hoạt
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
