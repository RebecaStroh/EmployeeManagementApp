import React, { useState } from 'react';

import './Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Login succeded');
        window.location = '/my-profile';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('Error while processing the login request:', error);
    }
  };

  return (
    <form id="login-form">
      <h2>Login</h2>
      <div>
        <label>E-mail</label>
        <input
          type="text"
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
        <a className='forgot-password'> Forgot your password? </a>
      </div>
      <button type='button' onClick={handleLogin}>Login</button>
      <p>Don't have an account yet? <a > Register now </a></p>
    </form>
  );
};

export default Login;
