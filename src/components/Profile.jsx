import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../store/authContext';
import axios from 'axios';

const Profile = () => {
  const authCtx = useContext( AuthContext );
  const {reset} = useForm()

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [occupation, setOccupation] = useState('');
  const [profile, setProfile] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        'http://localhost:5432/profile',

        {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          birthday,
          occupation,
        },
        {
          headers: {
            authorization: authCtx.token,
          },
        }
      )
      .then(() => {
        setProfile( profile );
      });
      console.log('Form Submitted!');
      console.log(profile)
    
  };

  return (
    <div className="h-screen bg-slate-300">
      <div className="flex justify-center">
        <form
          className="flex flex-col align-center items-center border-2 p-20 m-10"
          onSubmit={handleSubmit}
        >
          <label className="bg-magenta-500">First Name:</label>
          <input
            className="border-2 bg-magenta-500"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name:</label>
          <input
            className="border-2"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>E-mail:</label>
          <input
            className="border-2"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone Number:</label>
          <input
            className="border-2"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>Address:</label>
          <input
            className="border-2"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>Birthday:</label>
          <input
            className="border-2"
            type="text"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <label>Occupation:</label>
          <input
            className="border-2"
            type="text"
            onChange={(e) => setOccupation(e.target.value)}
          />
          <button type="submit" onClick={() => reset()}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
