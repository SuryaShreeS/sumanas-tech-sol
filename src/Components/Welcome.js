// import React from "react";
// import { useSelector } from "react-redux";
// import { useAuth0 } from "@auth0/auth0-react";

// const Welcome = () => {
//   const { logout } = useAuth0();
//   const user = useSelector((state) => state.auth.user);
//   console.log(user,"User")



//   return (
//     <div>
//       <h2>Welcome, {user?.name}!</h2>
//       <p>Email: {user?.email}</p>
//       <img src={user?.picture} alt="User Profile" />
//       <button onClick={() => logout({ returnTo: window.location.origin })}>
//         Log out
//       </button>
//     </div>
//   );
// };

// export default Welcome;
// src/components/Welcome.js

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const { accessToken, email } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!accessToken) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [accessToken, navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome!</h1>
      {email ? (
        <p>Logged in as: {email}</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Welcome;
