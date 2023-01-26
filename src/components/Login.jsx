import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthService from '../services/auth.service';

const Login = () => {
  // const navigate = useNavigate();
  const form = useRef();
  // const checkBtn = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');

  const onChangeEmail = (e) => {
    const email = e.target.value;
    console.log(email)
    setEmail(email)
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    console.log(password)
    setPassword(password)
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
  };

  return (
    <div>
      Login/Signup Page
      <form onSubmit={handleLogin} ref={form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <button disabled={ loading }>
            <span>Login</span>
          </button>
        </div>
        { message && (
          <div>
            {message}
          </div>
        ) }
      </form>
    </div>
  );
};

export default Login;
