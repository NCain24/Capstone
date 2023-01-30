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
        .then( ( res ) => {
          console.log('registered')
          authCtx.login(
            res.data.token,
            res.data.exp,
            res.data.userId,
            res.data.username
          );
        })
        .catch(() => alert('Something went wrong.'));
    } else {
      axios
        .post('http://localhost:5432/login', {
          username,
          password,
        })
        .then( ( res ) => {
          console.log(res.data)
          authCtx.login(
            res.data.token,
            res.data.exp,
            res.data.userId,
            res.data.username
          );
        })
        .catch(() => alert('That user does not exist.'));
    }
  };

  return (
    <main className="flex-col gap-10 p-6 mx-auto border-solid border-2 border-sky-500 rounded">
      <div className="text-5xl text-center">
        {register ? <h1>Register to get started</h1> : <h1>Welcome</h1>}
      </div>
      {register ? (
        <div>
          <form className="" onSubmit={submitHandler}>
            <div className='flex-col w-1 align-center justify-center'>
              <input
                className="border-solid border-2 m-2"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="border-solid border-2 m-2"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="border-solid border-2 m-2"
                type="email"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="border-solid border-2 m-2"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="border-solid border-2 m-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="border-solid border-2 m-2">
              Register and login
            </button>
          </form>
          <div>
            
            <button onClick={() => setRegister(!register)}>
            <h6>Already have an account?</h6>
            </button>
          </div>
        </div>
      ) : (
        <div className='flex-col w-1 align-center justify-center'>
          <form onSubmit={submitHandler}>
            <input
              className="border-solid border-2 border-sky-500 rounded"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border-solid border-2 border-sky-500 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>{register ? 'Register' : 'Login'}</button>
          </form>
          <button onClick={() => setRegister(!register)}>
            <h6>Need an account?</h6>
          </button>
        </div>
      )}
    </main>
  );
};

export default Auth;
