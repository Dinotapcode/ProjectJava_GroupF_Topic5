import React, { useState, useEffect } from 'react';
import './UserManagement.scss';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    // Gọi API khi component được mount để lấy dữ liệu từ backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8083/user/getAll');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleUserStatus = async (index) => {
        try {
            const updatedUser = users[index];
            const newStatus = !updatedUser.enabled;

            // Gửi PUT request với trạng thái mới (true/false)
            const response = await fetch(`http://localhost:8083/user/actions/${updatedUser.id}?enabled=${newStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Cập nhật lại trạng thái của người dùng trong state
                const updatedUsers = [...users];
                updatedUsers[index].enabled = newStatus;
                setUsers(updatedUsers);
            } else {
                throw new Error('Failed to update user status');
            }
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <div className="user-management">
            <div className="setting-add-user-btn">
                <h1>Quản lý người dùng</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>UserId</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Enabled</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.enabled ? 'Đang hoạt động' : 'Bị cấm'}</td>
                            <td>
                                <button
                                    className={user.enabled ? 'btn-disable' : 'btn-enable'}
                                    onClick={() => handleToggleUserStatus(index)}
                                >
                                    {user.enabled ? 'Cấm' : 'Mở cấm'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
