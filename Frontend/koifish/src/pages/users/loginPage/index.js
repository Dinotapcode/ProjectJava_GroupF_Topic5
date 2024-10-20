import { memo } from 'react';
import './style.scss'; // Import SCSS file

const Login = () => {
  return (
    <div className="container">
      <article className="login-container">
        <h1>Đăng nhập - Đăng ký</h1>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-login">Login</button>
          </div>
          <div className="form-group">
            <button className="forgot-password" onClick={() => alert('Handle forgot password')}>Forgot Password?</button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default memo(Login);
