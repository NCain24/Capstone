import { useState, useContext } from 'react';
import AuthContext from '../store/authContext';
import axios from 'axios';

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5432/profile', {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthday,
        occupation,
      })
      .then( ( res ) => {
        authCtx.addProfile(
          res.data.firstName,
          res.data.lastName,
          res.data.email,
          res.data.phoneNumber,
          res.data.address,
          res.data.birthday,
          res.data.occupation
        )
      });
  };

  return (
    <div>
      <div>
        <h1>Profile Page</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
          <label>Last Name:</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
          <label>E-mail:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label>Phone Number:</label>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
          <label>Address:</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} />
          <label>Birthday:</label>
          <input type="text" onChange={(e) => setBirthday(e.target.value)} />
          <label>Occupation:</label>
          <input type="text" onChange={(e) => setOccupation(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
