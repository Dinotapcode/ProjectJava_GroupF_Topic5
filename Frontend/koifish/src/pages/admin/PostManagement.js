import React, { useState } from 'react';
import './PostManagement.scss';

const PostManagement = () => {
    // Example data with additional columns like content, image, date, and active status
    const [posts, setPosts] = useState([
        { 
            id: 1, 
            userId: 'user123', 
            title: 'Post 1', 
            content: 'This is the content of Post 1.', 
            image: 'image1.jpg', 
            date: '2024-11-01', 
            active: true 
        },
        { 
            id: 2, 
            userId: 'user456', 
            title: 'Post 2', 
            content: 'This is the content of Post 2.', 
            image: 'image2.jpg', 
            date: '2024-11-02', 
            active: false 
        },
        // Add more posts as needed
    ]);

    const handleApprovePost = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].status = 'Approved';
        setPosts(updatedPosts);
    };

    const handleRejectPost = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].status = 'Rejected';
        setPosts(updatedPosts);
    };

    return (
        <div className="post-management">
            <div className='setting-add-post-btn'>
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
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id || index}>
                            <td>{index + 1}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td><img src={post.image} alt="Post" width="50" height="50" /></td>
                            <td>{post.date}</td>
                            <td>{post.active ? 'Yes' : 'No'}</td>
                            <td>
                                <button className='btn-approve' onClick={() => handleApprovePost(index)}>Duyệt</button>
                                <button className='btn-reject' onClick={() => handleRejectPost(index)}>Không Duyệt</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostManagement;
