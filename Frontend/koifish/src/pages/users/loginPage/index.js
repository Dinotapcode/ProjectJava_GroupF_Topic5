import React, { useState } from 'react';
import './style.scss';

function LoginPage() {
  const [activeForm, setActiveForm] = useState('login'); // Quản lý trạng thái để chuyển đổi giữa đăng nhập và đăng ký
  const [loginSuccess, setLoginSuccess] = useState(false); // Quản lý trạng thái đăng nhập thành công

  return (
    <div className="log-auth-wrapper">
      <article className="auth-box">
        {/* Hiển thị form đăng nhập hoặc đăng ký dựa trên trạng thái */}
        {activeForm === 'login' ? (
          <LoginForm setLoginSuccess={setLoginSuccess} switchToRegister={() => setActiveForm('register')} />
        ) : (
          <RegisterForm switchToLogin={() => setActiveForm('login')} />
        )}

        {loginSuccess && <p className="success-alert">Đăng nhập thành công!</p>} {/* Thông báo đăng nhập thành công */}
      </article>
    </div>
  );
}

// Form đăng nhập
function LoginForm({ setLoginSuccess, switchToRegister }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginSuccess(true);
    alert('Đăng nhập thành công!');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" required />
      </div>
      <div className="form-field">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required />
      </div>
      <button type="submit" className="btn-login">Đăng nhập</button>
      <button type="button" className="btn-forgot-password" onClick={() => alert('Chức năng quên mật khẩu chưa được triển khai.')}>Quên mật khẩu?</button>
      <button type="button" className="btn-switch" onClick={switchToRegister}>Đăng ký</button> {/* Nút chuyển sang form đăng ký */}
    </form>
  );
}

// Form đăng ký
function RegisterForm({ switchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
    } else {
      setError('');
      console.log('Đăng ký thành công:', formData);
      alert('Đăng ký thành công!');
      switchToLogin(); // Chuyển về form đăng nhập sau khi đăng ký thành công
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <div className="form-field">
        <label htmlFor="username">Tên người dùng</label>
        <input type="text" id="username" name="username" placeholder="Nhập tên người dùng" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleChange} required />
      </div>

      {error && <p className="error-alert">{error}</p>} {/* Thông báo lỗi */}

      <button type="submit" className="btn-register">Đăng ký</button>
      <button type="button" className="btn-switch" onClick={switchToLogin}>Đăng nhập</button> {/* Nút chuyển sang form đăng nhập */}
    </form>
  );
}

export default LoginPage;
