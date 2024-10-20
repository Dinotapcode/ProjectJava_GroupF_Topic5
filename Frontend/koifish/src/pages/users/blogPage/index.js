import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import BlogDetail from './BlogDetail';
import './style.scss'; 

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<BlogPage />} />
        
        {}
        <Route path="/post/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
