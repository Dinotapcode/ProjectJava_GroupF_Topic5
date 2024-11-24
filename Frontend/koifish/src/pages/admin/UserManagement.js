import React, { useState, useEffect } from 'react';
import './UserManagement.scss';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Lấy dữ liệu người dùng từ API
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:8083/api/admin/user/getAll', {
                    headers: { Authorization: sessionStorage.getItem('authHeader') },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Sắp xếp người dùng theo quyền: Admin trước, User sau
                data.sort((a, b) => {
                    if (a.role === 'ROLE_ADMIN' && b.role !== 'ROLE_ADMIN') return -1;
                    if (a.role === 'ROLE_USER' && b.role !== 'ROLE_USER') return 1;
                    return 0;
                });

                setUsers(data); // Gán dữ liệu người dùng đã sắp xếp vào state
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Cập nhật quyền người dùng (Admin hoặc User)
    const handleChangeRole = async (index, event) => {
        const updatedRole = event.target.value;
        const updatedUser = users[index];
    
        const currentRole = updatedUser.role;
    
        if (updatedRole === "ROLE_ADMIN" && currentRole !== "ROLE_ADMIN") {
            const confirmChange = window.confirm("Bạn muốn nâng cấp tài khoản này lên quyền Admin?");
            if (!confirmChange) return;
        }
    
        if (updatedRole === "ROLE_USER" && currentRole !== "ROLE_USER") {
            const confirmChange = window.confirm("Bạn muốn hạ cấp tài khoản này xuống quyền User?");
            if (!confirmChange) return;
        }
    
        try {
            const response = await fetch(`http://localhost:8083/api/admin/user/actions/${updatedUser.id}?role=${updatedRole}`, {
                method: 'PUT',
                headers: {
                    Authorization: sessionStorage.getItem('authHeader'),
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const updatedUsers = [...users];
                updatedUsers[index].role = updatedRole;
                setUsers(updatedUsers);
            } else {
                throw new Error('Failed to update user role');
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    // Cập nhật trạng thái người dùng (enable/disable)
    const handleToggleUserStatus = async (index) => {
        const updatedUser = users[index];
        const newStatus = !updatedUser.enabled;

        try {
            const response = await fetch(`http://localhost:8083/api/admin/user/actions/${updatedUser.id}?enabled=${newStatus}`, {
                method: 'PUT',
                headers: {
                    Authorization: sessionStorage.getItem('authHeader'),
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
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

            {isLoading ? (
                <div className="loading">Đang tải dữ liệu...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tài khoản</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Quyền</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.enabled ? 'Đang hoạt động' : 'Bị cấm'}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(event) => handleChangeRole(index, event)}
                                    >
                                        <option value="ROLE_USER">User</option>
                                        <option value="ROLE_ADMIN">Admin</option>
                                    </select>
                                </td>
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
            )}
        </div>
    );
};

export default UserManagement;
