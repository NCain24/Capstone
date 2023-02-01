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
    <div className="flex items-center justify-center  h-screen bg-slate-300">
      <div className="flex justify-center">
        <form
          className="flex flex-col text-3xl bg-slate-200 border-2 p-10 rounded"
          onSubmit={handleSubmit}
          >
          <h1>Fill out your profile!</h1>
          <label>First Name</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>E-mail</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone Number</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>Address</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>Birthday</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <label>Occupation</label>
          <input
            className="rounded"
            type="text"
            onChange={(e) => setOccupation(e.target.value)}
          />
          <button type="submit" className='bg-slate-500 rounded mt-5 px-5 text-white'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
