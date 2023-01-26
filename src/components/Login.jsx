import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    <div>Required</div>;
  }
};

const Login = () => {

  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [ message, setMessage ] = useState( '' );
  
  const onChangeEmail = (e) => {
    const email = e.target.value
  }

  const onChangePassword = ( e ) => {
    const password = e.target.value
  }

  const handleLogin = ( e ) => {
    e.preventDefault()
    setMessage( '' )
    setLoading( true )
    form.current.validateAll()

    if ( checkBtn.current.context._errors.length === 0 ) {
      AuthService.login( email, password )
        .then( () => {
        navigate('/profile')
        },
          ( error ) => {
            const resMessage = ( error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
            setLoading( false )
            setMessage(resMessage)
        })
    } else {
      setLoading(false)
    }
  }

  return (
    <div>
      Login/Signup Page
    </div>
  );
    
};

export default Login;
