// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SanphamPage from './pages/SanphamPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SanphamPage />} />
                <Route path="/sanpham/:id" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
