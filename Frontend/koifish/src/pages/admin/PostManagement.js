import React, { useState, useEffect } from 'react';
import './PostManagement.scss';
const API_BASE_URL = "http://localhost:8083/api";

const PostManagement = () => {
    const [posts, setPosts] = useState([]);

    // Fetch tất cả bài viết khi component được mount
    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/post/all`,{headers: {Authorization: sessionStorage.getItem('authHeader')}},
    )
             // API để lấy tất cả bài viết
            .then(response => response.json())
            .then(data => setPosts(data))  // Cập nhật danh sách bài viết
            .catch(error => {
                console.error('Có lỗi khi lấy danh sách bài viết!', error);
            });
    }, []);  // Chạy 1 lần khi component được render lần đầu

    // Function để cập nhật trạng thái bài viết (ACTIVE / INACTIVE)
    const handleUpdateStatus = async (postId, status) => {
        const response = await fetch(`${API_BASE_URL}/admin/post/update-status/${postId}?status=${status}`, {
            method: 'PUT', // PUT method để cập nhật bài viết
            headers: {
                 Authorization: sessionStorage.getItem('authHeader'),
                'Content-Type': 'application/json',
            },
        })
        
        if(response.ok){
            // Sau khi thay đổi trạng thái, cập nhật lại danh sách bài viết
            const updatedPosts = posts.map(post =>
                post.postId === postId ? { ...post, status: status } : post
            );
            alert('Thay đổi trạng thái bài viết thành công!');
            setPosts(updatedPosts);
        }
        else{
            alert('Thay đổi trạng thái bài viết thất bại!');
        };
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
                            <td><img src={`uploads/img_blog/${post.image}`} alt="Post" width="50" height="50" /></td>
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
