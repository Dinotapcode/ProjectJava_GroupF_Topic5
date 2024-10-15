import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import BlogDetail from './BlogDetail';
import './style.scss'; // Import các style cho ứng dụng

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang blog tổng hợp */}
        <Route path="/" element={<BlogPage />} />
        
        {/* Route cho trang chi tiết bài viết */}
        <Route path="/post/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
