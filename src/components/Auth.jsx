import { useState, useContext } from 'react';
import AuthContext from '../store/authContext';
import axios from 'axios';

const Auth = () => {
  const authCtx = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (register) {
      axios
        .post('http://localhost:5432/register', {
          firstName,
          lastName,
          email,
          username,
          password,
        })
        .then((res) => {
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch(() => alert('Something went wrong.'));
    } else {
      axios
        .post('http://localhost:5432/login', {
          username,
          password,
        })
        .then((res) => {
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch(() => alert('That user does not exist.'));
    }
  };

  return (
    <main>
      <div>
        {register ? <h1>Register to get started</h1> : <h1>Welcome Back!</h1>}
      </div>
      {register ? (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>{register ? 'Register' : 'Login'}</button>
          </form>
          <button onClick={() => setRegister(!register)}>
            {register ? 'Login' : 'Register'}
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>{register ? 'Register' : 'Login'}</button>
          </form>
          <button onClick={() => setRegister(!register)}>
            {register ? 'Login' : 'Register'}
          </button>
        </div>
      )}
    </main>
  );
};

export default Auth;
