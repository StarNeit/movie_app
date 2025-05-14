import React, { useState } from 'react';
import API from '../api';

const Login: React.FC<{ onLogin: (token: string, user: any) => void }> = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/login', {
        username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
        email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
        password
      });
      onLogin(res.data.token, res.data.user);
    } catch (e: any) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <form onSubmit={handleSubmit}>
          <h1 className="login__label">Login</h1>
          <input
            className="login__input"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
            required
          />
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {err && <div className="login__error">{err}</div>}
          <button className="btn btn--primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 