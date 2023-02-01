import { useState, useContext, useEffect } from 'react';
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
  const [profile, setProfile] = useState([]);
  const [profileExists, setProfileExists] = useState(false);

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
          userId: authCtx.userId,
        },
        {
          headers: {
            authorization: authCtx.token,
          },
        }
      )
      .then((res) => {
        setProfile(res.data);
        setProfileExists(true);
        console.log(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5432/user/profile/${authCtx.userId}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then( ( res ) => {
        console.log(res.data);
        if (res.data.id) {
          setProfileExists( true );
          setProfile( res.data );
        }
        
      });
  }, [authCtx.token, authCtx.userId]);
  console.log(profileExists, profile);
  return (
    <div>
      {profileExists === false && (
        <div className="flex items-center justify-center max-h-full bg-slate-300">
          <div className="flex justify-center">
            <form
              className="flex flex-col text-3xl bg-slate-200 border-2 p-10 rounded text-center"
              onSubmit={handleSubmit}
            >
              <h1 className="pb-8">Fill out your profile!</h1>
              <label>First Name</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last Name</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>E-mail</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Phone Number</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label>Address</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label>Birthday</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setBirthday(e.target.value)}
              />
              <label>Occupation</label>
              <input
                className="rounded text-center"
                type="text"
                onChange={(e) => setOccupation(e.target.value)}
              />
              <button
                type="submit"
                className="bg-slate-500 rounded mt-5 px-5 text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {profileExists === true && (
        <div className="flex flex-col items-center pt-20 text-xl ">
          <h1 className="text-3xl">Your Profile</h1>
          <div className="bg-slate-500 rounded-xl p-10 px-40 text-white shadow-lg">
            <h4 className="text-center text-4xl text-black">First Name</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.firstName}
            </h2>
            <h4 className="text-center text-4xl text-black">Last Name</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.lastName}
            </h2>
            <h4 className="text-center text-4xl text-black">E-Mail</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.email}
            </h2>
            <h4 className="text-center text-4xl text-black">Phone Number</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.phoneNumber}
            </h2>
            <h4 className="text-center text-4xl text-black">Address</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.address}
            </h2>
            <h4 className="text-center text-4xl text-black">Birthday</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.birthday}
            </h2>
            <h4 className="text-center text-4xl text-black">Occupation</h4>
            <h2 className="text-white transform duration-75 hover:scale-150 text-center">
              {profile.occupation}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
