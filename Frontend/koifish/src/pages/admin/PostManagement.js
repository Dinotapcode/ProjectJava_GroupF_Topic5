import React, { useState, useEffect } from 'react';
import './PostManagement.scss';

const API_BASE_URL = "http://localhost:8083/api";

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [filterStatus, setFilterStatus] = useState('ALL');

    // Fetch tất cả bài viết khi component được mount
    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/post/all`, {
            headers: {
                Authorization: sessionStorage.getItem('authHeader')
            }
        })
            .then(response => response.json())
            .then(data => setPosts(data))  // Cập nhật danh sách bài viết
            .catch(error => {
                console.error('Có lỗi khi lấy danh sách bài viết!', error);
            });
    }, []);  // Chạy 1 lần khi component được render lần đầu

    // Function để cập nhật trạng thái bài viết (ACTIVE / INACTIVE)
    const handleUpdateStatus = async (postId, status) => {
        const response = await fetch(`${API_BASE_URL}/admin/post/update-status/${postId}?status=${status}`, {
            method: 'PUT',
            headers: {
                Authorization: sessionStorage.getItem('authHeader'),
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const updatedPosts = posts.map(post =>
                post.postId === postId ? { ...post, status: status } : post
            );
            const message = status === 'ACTIVE' ? 'Duyệt bài viết thành công!' : 'Huỷ duyệt bài viết thành công!';
            alert(message);
            setPosts(updatedPosts);
        } else {
            const errorMessage = status === 'ACTIVE' ? 'Duyệt bài viết thất bại!' : 'Huỷ duyệt bài viết thất bại!';
            alert(errorMessage);
        }
    };

    // Thêm hàm để lọc bài viết
    const getFilteredPosts = () => {
        if (filterStatus === 'ALL') return posts;
        return posts.filter(post => post.status === filterStatus);
    };

    // Thêm hàm xử lý xóa bài viết
    const handleDeletePost = async (postId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/post/delete/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: sessionStorage.getItem('authHeader'),
                    },
                });

                if (response.ok) {
                    // Cập nhật state để xóa bài viết khỏi danh sách
                    setPosts(posts.filter(post => post.postId !== postId));
                    alert('Xóa bài viết thành công!');
                } else {
                    alert('Xóa bài viết thất bại!');
                }
            } catch (error) {
                console.error('Lỗi khi xóa bài viết:', error);
                alert('Có lỗi xảy ra khi xóa bài viết!');
            }
        }
    };

    return (
        <div className="post-management">
            <div className="setting-add-post-btn">
                <h1>Quản lý bài viết</h1>
                <div className="filter-controls">
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="status-filter"
                    >
                        <option value="ALL">Tất cả bài viết</option>
                        <option value="ACTIVE">Đã duyệt</option>
                        <option value="INACTIVE">Chưa duyệt</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>UserId</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getFilteredPosts().map((post, index) => (
                        <tr key={post.postId || index}>
                            <td>{index + 1}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td><img src={`uploads/img_blog/${post.image}`} alt="Post" width="50" height="50" /></td>
                            <td>{post.date}</td>
                            <td>{post.status}</td> {/* Hiển thị status của bài viết */}
                            <td>
                                <div className="actions-column">
                                    {post.status === 'ACTIVE' ? (
                                        <button 
                                            className="btn-reject" 
                                            onClick={() => handleUpdateStatus(post.postId, 'INACTIVE')}
                                        >
                                            Huỷ Duyệt
                                        </button>
                                    ) : (
                                        <button 
                                            className="btn-approve" 
                                            onClick={() => handleUpdateStatus(post.postId, 'ACTIVE')}
                                        >
                                            Duyệt
                                        </button>
                                    )}
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDeletePost(post.postId)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostManagement;
