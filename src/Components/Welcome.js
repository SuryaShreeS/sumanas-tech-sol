// src/components/Welcome.js

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/WelcomeStyles.css'; // Import the CSS file

const Welcome = () => {
  const { accessToken, email } = useSelector((state) => state.auth);
  const { logout } = useAuth0();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome to Sumanas Technology!</h1>
      {email ? (
        <div>
          <p>Logged in as: {email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Welcome;
