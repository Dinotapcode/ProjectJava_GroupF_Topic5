import React, { useState } from 'react';
import './style.scss';

function LoginPage() {
  const [activeForm, setActiveForm] = useState('login'); // Quản lý trạng thái để chuyển đổi giữa đăng nhập và đăng ký
  const [loginSuccess, setLoginSuccess] = useState(false); // Quản lý trạng thái đăng nhập thành công

  return (
    <div className="container">
      <article className="auth-container">
        <section className="functionality">
          <input
            type="radio"
            id="form__btn-login"
            name="toggle"
            checked={activeForm === 'login'}
            onChange={() => setActiveForm('login')} // Chuyển sang form đăng nhập
          />
          <label htmlFor="form__btn-login" className="functionality__btn">Đăng nhập</label>

          <input
            type="radio"
            id="form__btn-register"
            name="toggle"
            checked={activeForm === 'register'}
            onChange={() => setActiveForm('register')} // Chuyển sang form đăng ký
          />
          <label htmlFor="form__btn-register" className="functionality__btn">Đăng ký</label>
        </section>

        {/* Hiển thị form đăng nhập hoặc đăng ký dựa trên trạng thái */}
        {activeForm === 'login' ? <LoginForm setLoginSuccess={setLoginSuccess} /> : <RegisterForm setActiveForm={setActiveForm} />}

        {loginSuccess && <p className="success-message">Đăng nhập thành công!</p>} {/* Thông báo đăng nhập thành công */}
      </article>
    </div>
  );
}

// Form đăng nhập
function LoginForm({ setLoginSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập đăng nhập thành công
    setLoginSuccess(true);
    alert('Đăng nhập thành công!'); // Hiện thông báo
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required />
      </div>
      <button type="submit" className="btn-login">Đăng nhập</button>
      <button type="button" className="btn-forgot-password" onClick={() => alert('Chức năng quên mật khẩu chưa được triển khai.')}>Quên mật khẩu?</button>
    </form>
  );
}

// Form đăng ký với kiểm tra mật khẩu
function RegisterForm({ setActiveForm }) { // Nhận props để chuyển đổi về đăng nhập
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

    // Kiểm tra mật khẩu có khớp không
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
    } else {
      setError('');
      // Xử lý đăng ký (submit form data)
      console.log('Đăng ký thành công:', formData);
      alert('Đăng ký thành công!'); // Hiện thông báo
      setActiveForm('login'); // Chuyển về form đăng nhập
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <div className="form-group">
        <label htmlFor="username">Tên người dùng</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nhập tên người dùng"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Nhập email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>} {/* Thông báo lỗi */}

      <button type="submit" className="btn-register">Đăng ký</button>
    </form>
  );
}

export default LoginPage;
