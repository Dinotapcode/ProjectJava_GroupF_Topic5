import React, { useState, useEffect } from 'react';
import './PostManagement.scss';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);

    // Fetch tất cả bài viết khi component được mount
    useEffect(() => {
        fetch('http://localhost:8083/post/admin/all') // API để lấy tất cả bài viết
            .then(response => response.json())
            .then(data => setPosts(data))  // Cập nhật danh sách bài viết
            .catch(error => {
                console.error('Có lỗi khi lấy danh sách bài viết!', error);
            });
    }, []);  // Chạy 1 lần khi component được render lần đầu

    // Function để cập nhật trạng thái bài viết (ACTIVE / INACTIVE)
    const handleUpdateStatus = (postId, status) => {
        fetch(`http://localhost:8083/post/update-status/${postId}?status=${status}`, {
            method: 'PUT', // PUT method để cập nhật bài viết
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(() => {
            // Sau khi thay đổi trạng thái, cập nhật lại danh sách bài viết
            const updatedPosts = posts.map(post =>
                post.postId === postId ? { ...post, status: status } : post
            );
            setPosts(updatedPosts);
        })
        .catch(error => {
            console.error('Có lỗi khi thay đổi trạng thái bài viết!', error);
        });
    };

    return (
        <div className="post-management">
            <div className="setting-add-post-btn">
                <h1>Quản lý bài viết</h1>
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
                    {posts.map((post, index) => (
                        <tr key={post.postId || index}>
                            <td>{index + 1}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td><img src={`http://localhost:8083/uploads/${post.image}`} alt="Post" width="50" height="50" /></td>
                            <td>{post.date}</td>
                            <td>{post.status}</td> {/* Hiển thị status của bài viết */}
                            <td>
                                <button 
                                    className="btn-approve" 
                                    onClick={() => handleUpdateStatus(post.postId, 'ACTIVE')}
                                >
                                    Duyệt
                                </button>
                                <button 
                                    className="btn-reject" 
                                    onClick={() => handleUpdateStatus(post.postId, 'INACTIVE')}
                                >
                                    Không Duyệt
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostManagement;
