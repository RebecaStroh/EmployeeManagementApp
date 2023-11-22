import React, { useState } from 'react';

// External components
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    window.location = '/employees';
  };

  return (
    <form id="login-form">
      <h2>Login</h2>
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
        <a className='forgot-password'> Forgot your password? </a>
      </div>
      <button type='button' onClick={handleLogin}>Login</button>
      <p>Don't have an account yet? <Link to={`/?signup=true`}> Register now </Link></p>
    </form>
  );
};

export default Login;
