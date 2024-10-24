import React, { useState } from 'react';
import './style.scss';
import anh from "../../../assets/users/images/img_login/1.jpg";

function LoginPage() {
  const [activeForm, setActiveForm] = useState('login');
  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <div className='container'>
      <article className='login-container'>
        <div className="login-container__auth-box">
          {activeForm === 'login' ? (
            <LoginForm setLoginSuccess={setLoginSuccess} switchToRegister={() => setActiveForm('register')} />
          ) : (
            <RegisterForm switchToLogin={() => setActiveForm('login')} />
          )}
          {loginSuccess && <p className="login-success">Đăng nhập thành công!</p>}
        </div>

        <div className="login-container__welcome-box">
          <img src={anh} alt="Logo" className="welcome-box__image" />
          <h1 className="welcome-box__title">FENGSHUIKOI xin chào!!!</h1>
          <p className="welcome-box__text">Trải nghiệm dịch vụ tuyệt vời của chúng tôi ngay hôm nay ♥</p>
        </div>
      </article>
    </div>
  );
}

function LoginForm({ setLoginSuccess, switchToRegister }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginSuccess(true);
    alert('Đăng nhập thành công!');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">Đăng nhập</h2>
      <div className="login-form__field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" required />
      </div>
      <div className="login-form__field">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required />
      </div>
      <section className='login-form__actions'>
        <button type="submit" className="actions__btn-login">Đăng nhập</button>
        <button type="button" className="actions__btn-forgot" onClick={() => alert('Chức năng quên mật khẩu chưa được triển khai.')}>Quên mật khẩu?</button>
      </section>
      <button type="button" className="btn-switch" onClick={switchToRegister}>Bạn chưa có tài khoản? Đăng kí thôi</button>
    </form>
  );
}

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
      alert('Đăng ký thành công!');
      switchToLogin();
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form__title">Đăng ký</h2>
      <div className="register-form__field">
        <label htmlFor="username">Tên người dùng</label>
        <input type="text" id="username" name="username" placeholder="Nhập tên người dùng" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="register-form__field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Nhập email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="register-form__field">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="register-form__field">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleChange} required />
      </div>

      {error && <p className="register-form__error-alert">{error}</p>}

      <button type="submit" className="actions__btn-register">Đăng ký</button>
      <button type="button" className="btn-switch" onClick={switchToLogin}>Tôi đã có tài khoản!! Đăng nhập</button>
    </form>
  );
}

export default LoginPage;
