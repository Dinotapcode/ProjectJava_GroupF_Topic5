// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
    // Khai báo state cho username và password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hàm xử lý khi form được submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // Kiểm tra hợp lệ
        if (username === "" || password === "") {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        // Xử lý đăng nhập
        console.log("Username:", username);
        console.log("Password:", password);

        // Hiển thị thông báo đăng nhập thành công (chỉ minh họa)
        alert("Đăng nhập thành công!");

        // Reset form
        setUsername('');
        setPassword('');
    };

    return (
        <div className="login-container">
            <h2>Đăng Nhập</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Đăng Nhập</button>

                <div className="forgot-password">
                    <a href="#">Quên mật khẩu?</a>
                </div>
            </form>

            <div className="signup">
                <p>Bạn chưa có tài khoản? <a href="#">Đăng ký</a></p>
            </div>
        </div>
    );
};

export default LoginPage;
