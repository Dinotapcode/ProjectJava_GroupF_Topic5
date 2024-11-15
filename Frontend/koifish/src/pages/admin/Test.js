import React, { useState } from 'react';
import PostManagement from './PostManagement';
import './App.scss';

const App = () => {
    const [posts, setPosts] = useState([
        { id: 1, userId: 'user123', title: 'Post 1' },
        { id: 2, userId: 'user456', title: 'Post 2' },
        { id: 3, userId: 'user789', title: 'Post 3' }
    ]);

    return (
        <div className="test">
            <PostManagement posts={posts} setPosts={setPosts} />
        </div>
    );
};

export default App;
