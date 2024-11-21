import React, { useState } from 'react';
import './style.scss';
import anh from "../../../assets/users/images/img_login/1.jpg";


function LoginPage() {
    const [activeForm, setActiveForm] = useState('login');
    const [loginResponse] = useState('');
    const [registerResponse] = useState('');

    const handleRegister = async (formData) => {
        try {
            const response = await fetch('http://localhost:8083/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (error) {
                console.error('Phản hồi không phải JSON hợp lệ:', error);
            }

            if (response.ok) {
                alert('Đăng ký thành công!');
                setActiveForm('login');
            } else {
                alert(data.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Đã xảy ra lỗi: ${error.message}`);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const credentials = btoa(`${email}:${password}`);
            const response = await fetch('http://localhost:8083/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (error) {
                console.error('Phản hồi không phải JSON hợp lệ:', error);
                data.message = 'Phản hồi không hợp lệ';
            }

            if (response.ok) {
                sessionStorage.setItem('authHeader', `Basic ${credentials}`);
                sessionStorage.setItem('role', data.role);
                sessionStorage.setItem('userId', data.userId);
                alert('Đăng nhập thành công');
                if (data.role === 'ROLE_USER') {
                    window.location.href = '/';
                } else if (data.role === 'ROLE_ADMIN') {
                    window.location.href = '/admin';
                } else {
                    alert(data.message || 'Không xác định được quyền truy cập.');
                }
            } else {
                alert(data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Đã xảy ra lỗi: ${error.message}`);
        }
    };


    return (
        <div className='container'>
            <article className='login-container'>
                <div className="login-container__auth-box">
                    {activeForm === 'login' ? (
                        <LoginForm handleLogin={handleLogin} switchToRegister={() => setActiveForm('register')} />
                    ) : (
                        <RegisterForm handleRegister={handleRegister} switchToLogin={() => setActiveForm('login')} />
                    )}
                    {loginResponse && <p className="login-response">{loginResponse}</p>}
                    {registerResponse && <p className="register-response">{registerResponse}</p>} { }
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

function LoginForm({ handleLogin, switchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-form__title">Đăng nhập</h2>
            <div className="login-form__field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="login-form__field">
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
            </div>
            <section className='login-form__actions'>
                <button type="submit" className="actions__btn-login">Đăng nhập</button>
                <button
                    type="button"
                    className="actions__btn-forgot"
                    onClick={() => alert('Chức năng quên mật khẩu chưa được triển khai.')}
                >
                    Quên mật khẩu?
                </button>
            </section>
            <button type="button" className="btn-switch" onClick={switchToRegister}>
                Bạn chưa có tài khoản? Đăng kí thôi
            </button>
        </form>
    );
}

function RegisterForm({ handleRegister, switchToLogin }) {
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
            handleRegister(formData);
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="register-form__title">Đăng ký</h2>
            <div className="register-form__field">
                <label htmlFor="username">Tên người dùng</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Nhập tên người dùng"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="register-form__field">
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
            <div className="register-form__field">
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
            <div className="register-form__field">
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

            {error && <p className="register-form__error-alert">{error}</p>}

            <button type="submit" className="actions__btn-register">Đăng ký</button>
            <button type="button" className="btn-switch" onClick={switchToLogin}>
                Tôi đã có tài khoản!! Đăng nhập
            </button>
        </form>
    );
}

export default LoginPage;
