import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' hoặc 'admin'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (role === 'admin') {
      // Xử lý đăng nhập Admin
      if (username === 'admin' && password === 'admin') {
        alert('Admin login successful!');
        navigate('/'); // Điều hướng tới trang Admin
      } else {
        alert('Invalid Admin credentials!');
      }
    } else {
      // Xử lý đăng nhập Khách hàng
      try {
        const response = await fetch('http://localhost:5000/api/customers/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Welcome, ${data.customer.name}!`);
          navigate('/');
        } else {
          alert(data.error || 'Login failed!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
      }
    }
  };

  return (
    <div className="login__container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form__group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form__group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
