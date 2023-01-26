import { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { isEmail } from 'validator';
import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    return <div>Required</div>;
  }
};

const validFirstName = (value) => {
  if (value.length < 1) {
    return <div>Please enter your first name.</div>;
  }
};

const validLastName = (value) => {
  if (value.length < 1) {
    return <div>Please enter your last name.</div>;
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return <div>Invalid Email</div>;
  }
};

const validPassword = (value) => {
  if (value.length < 8 || value.length > 30) {
    return <div>Password must be between 8 and 30 characters in length.</div>;
  }
};

const Signup = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(firstName, lastName, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccess(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccess(false);
        }
      );
    }
  };

  return <div>Signup</div>;
};

export default Signup;
