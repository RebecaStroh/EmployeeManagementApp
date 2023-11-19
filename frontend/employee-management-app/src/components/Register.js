import React, { useState } from 'react';
import Container from '../pages/Container';

// External components
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
  };

  return (
    <form id="login-form">
      <h2>Sign up</h2>
      <div>
        <label>E-mail</label>
        <input
          type="email"
          placeholder='E-mail'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='button' onClick={handleSignup}>Sign up</button>
      <p>Already have an account? <Link to="/" > Sign in </Link></p>
    </form>
  );
};

export default Register;
