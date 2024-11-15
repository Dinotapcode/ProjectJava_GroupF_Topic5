import React, { useState } from 'react';
import './UserManagement.scss';

const UserManagement = () => {
    // Dữ liệu mẫu với các trường user_id, user_name, password, birthday, avatar, email, phone, enabled
    const [users, setUsers] = useState([
        { 
            user_id: 1, 
            user_name: 'john_doe', 
            password: 'password123', 
            birthday: '1990-01-01', 
            avatar: 'avatar1.jpg', 
            email: 'john.doe@example.com', 
            phone: '123-456-7890', 
            enabled: true 
        },
        { 
            user_id: 2, 
            user_name: 'jane_doe', 
            password: 'password456', 
            birthday: '1985-05-15', 
            avatar: 'avatar2.jpg', 
            email: 'jane.doe@example.com', 
            phone: '987-654-3210', 
            enabled: false 
        },
        // Thêm người dùng vào đây nếu cần
    ]);

    const handleToggleUserStatus = (index) => {
        const updatedUsers = [...users];
        updatedUsers[index].enabled = !updatedUsers[index].enabled;
        setUsers(updatedUsers);
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
                        <tr key={user.user_id}>
                            <td>{index + 1}</td>
                            <td>{user.user_id}</td>
                            <td>{user.user_name}</td>
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
