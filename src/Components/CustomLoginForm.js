// src/components/CustomLoginForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css'; // Import the CSS file

const CustomLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem('accessToken', accessToken);
      navigate('/welcome');
    } catch (err) {
      // Error handling is now managed by Redux slice
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomLoginForm;
