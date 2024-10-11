import { memo } from 'react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.scss'
const HomePage = () => {
    return (
        <>
            <h1>Hello</h1>
        </>
    );
};

export default memo(HomePage);
function App() {
    return (
    <div className="home">
    <Header/>
    <Main/>
    <Footer/>
    </div>
    )
    }
    
    function Header() {
    return (
    <header>
    <h1>Logo</h1>
    <a><img src="logo.jpg" /></a>
    <nav>
    <ul>
        <li><a href="#">TRANG CHỦ</a></li>
        <li><a href="#">GIỚI THIỆU</a></li>
        <li><a href="#">BLOG</a></li>
        <li><a href="#">SẢN PHẨM</a></li>
        <li><a href="#">TRA CỨU</a></li>
        <li>Đăng nhập</li>

    </ul>
    </nav>
    </header>
    )
    }
    
    function Main() {
    return (
    <main>
     <h2>Welcome to our site!</h2>
    <p>Lorem ipsum dolor sit amet...</p> 
    </main>
    )
    }
    
    function Footer() {
    return (
    <footer>
    <p>© 2023 Company Name</p>
    </footer>
    )
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(<App />)