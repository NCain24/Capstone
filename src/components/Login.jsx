// import { useState, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import AuthService from '../services/auth.service';

// const Login = () => {
//   // const navigate = useNavigate();
//   const form = useRef();
//   // const checkBtn = useRef();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState('');
//   const [message, setMessage] = useState('');

//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     console.log(email)
//     setEmail(email)
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     console.log(password)
//     setPassword(password)
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);
//   };

//   return (
//     <div>
//       Login/Signup Page
//       <form onSubmit={handleLogin} ref={form}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             name="email"
//             value={email}
//             onChange={onChangeEmail}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="text"
//             name="password"
//             value={password}
//             onChange={onChangePassword}
//             required
//           />
//         </div>
//         <div>
//           <button disabled={ loading }>
//             <span>Login</span>
//           </button>
//         </div>
//         { message && (
//           <div>
//             {message}
//           </div>
//         ) }
//       </form>
//     </div>
//   );
// };

// export default Login;

import {useState} from 'react';
import PropTypes from 'prop-types'

const Login = ( { setToken } ) => {
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()

  const loginUser = async ( credentials ) => {
    return fetch( 'http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    } )
    .then(data => data.json())
  }
  
  const handleSubmit = async ( e ) => {
    e.preventDefault()
    const token = await loginUser( {
      email,
      password
    } )
    setToken(token)
  }

  return (
    <div>
      <h1>Please Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>E-Mail</p>
        <input type="text" onChange={e => setEmail(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <button type='submit'>Login</button>
      </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login
