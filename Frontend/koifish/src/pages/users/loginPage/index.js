import React, { useState } from 'react';
import './style.scss';
import anh from "../../../assets/users/images/img_login/1.jpg";



function LoginPage() {
  const [activeForm, setActiveForm] = useState('login'); // Quản lý trạng thái để chuyển đổi giữa đăng nhập và đăng ký
  const [loginSuccess, setLoginSuccess] = useState(false); // Quản lý trạng thái đăng nhập thành công

  return (
    <div className='container'>
      <article className='log-container'>
        <div className="auth-box">
          {/* Form đăng nhập/đăng ký */}
          {activeForm === 'login' ? (
            <LoginForm setLoginSuccess={setLoginSuccess} switchToRegister={() => setActiveForm('register')} />
          ) : (
            <RegisterForm switchToLogin={() => setActiveForm('login')} />
          )}
          {loginSuccess && <p className="success-alert">Đăng nhập thành công!</p>}
        </div>

        <div className="welcome-box">
          <img src={anh} alt="Ảnh đại diện" className="circle-image" />
          <h1>FENGSHUIKOI xin chào!!!</h1>
          <p>&hearts; Trải nghiệm dịch vụ tuyệt vời của chúng tôi ngay hôm nay &hearts; </p>
        </div>
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
    <form className="login" onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <div className="login__field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" required />
      </div>
      <div className="login__field">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required />
      </div>
      <section className='login__functionality'>
        <button type="submit" className="functionality__btn-login">Đăng nhập</button>
        <button type="button" className="functionality__btn-forgot" onClick={() => alert('Chức năng quên mật khẩu chưa được triển khai.')}>Quên mật khẩu?</button>
      </section>
      <button type="button" className="login__btn-switch" onClick={switchToRegister}>Bạn chưa có tài khoản? Đăng kí thôi</button> {/* Nút chuyển sang form đăng ký */}
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
    <form className="register" onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <div className="register__field">
        <label htmlFor="username">Tên người dùng</label>
        <input type="text" id="username" name="username" placeholder="Nhập tên người dùng" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="reigster__field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="register__field">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="register__field">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleChange} required />
      </div>

      {error && <p className="error-alert">{error}</p>} {/* Thông báo lỗi */}

      <button type="submit" className="register__btn-register">Đăng ký</button>
      <button type="button" className="register__btn-switch" onClick={switchToLogin}>Tôi đã có tài khoản!! Đăng nhập </button> {/* Nút chuyển sang form đăng nhập */}
    </form>
  );
}

export default LoginPage;
