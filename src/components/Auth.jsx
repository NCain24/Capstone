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
          console.log('registered');
          authCtx.login(
            res.data.token,
            res.data.exp,
            res.data.userId,
            res.data.username
          );
        })
        .catch((error) => {
          console.log(error);
          alert('Something went wrong');
        });
    } else {
      axios
        .post('http://localhost:5432/login', {
          username,
          password,
        })
        .then((res) => {
          console.log(res.data);
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
    <main className="flex-col h-screen">
      <div className="flex-col items-center text-5xl ">
        {register ? (
          <h1 className="text-4xl pb-20">Register to get started</h1>
        ) : (
          <h1 className="text-7xl pb-20">Welcome</h1>
        )}
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center border w-80 m-10 p-20 bg-slate-200 rounded">
          {register ? (
            <div>
              <form
                className="flex flex-col items-center"
                onSubmit={submitHandler}
              >
                <div className="flex flex-col gap-5">
                  <input
                    className="rounded"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="rounded"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    className="rounded"
                    type="email"
                    placeholder="E-mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="rounded"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button className=" text-white bg-slate-500 rounded-lg p-3 mt-5">
                    Register and login
                  </button>
                </div>
              </form>
              <div className="flex text-2xl justify-center pt-5">
                <button onClick={() => setRegister(!register)}>
                  <h6>Already have an account?</h6>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <form
                className="flex flex-col items-center gap-5"
                onSubmit={submitHandler}
              >
                <input
                  className="rounded"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className=" rounded"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className=" text-white bg-slate-500 rounded-lg p-3 mt-5">
                  <button>{register ? 'Register' : 'Login'}</button>
                </div>
              </form>
              <div className="flex text-2xl justify-center pt-5">
                <button onClick={() => setRegister(!register)}>
                  <h6>Need an account?</h6>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
