import { useState, useContext, useEffect } from 'react';
import AuthContext from '../store/authContext';
import { Modal } from 'react-responsive-modal';
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
  const [editProfile, setEditProfile] = useState(true);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleStartEdit = () => {
    setEditProfile(true);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);
    setPhoneNumber(profile.phoneNumber);
    setAddress(profile.address);
    setBirthday(profile.birthday);
    setOccupation(profile.occupation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profileExists) {
      updateProfile();
    } else {
      addProfile();
      setEditProfile(false);
    }
  };

  const addProfile = async () => {
    await axios
      .post(
        'http://localhost:5432/user/profile',

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

  const updateProfile = async () => {
    await axios
      .put(
        `http://localhost:5432/user/profile/edit/${profile.id}`,
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
      .then((res) => {
        setProfile(res.data);
        setEditProfile(false);
        console.log(res.data);
      });
  };

  const deleteProfile = async (id) => {
    await axios
      .delete(`http://localhost:5432/user/profile/delete/${id}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfileExists(false);
        setProfile([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5432/user/profile/${authCtx.userId}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.id) {
          setProfileExists(true);
          setEditProfile(false);
          setProfile(res.data);
        }
      });
  }, [authCtx.token, authCtx.userId]);

  console.log(profileExists, profile);
  return (
    <div className="h-full">
      {editProfile === true && (
        <div>
          <div className="flex items-center justify-center">
            <div className="flex justify-center">
              <form
                className="flex flex-col text-3xl bg-slate-200 border-2 m-20 p-10 rounded text-center"
                onSubmit={handleSubmit}
              >
                <h1 className="pb-8">
                  {profileExists
                    ? 'Update your profile info'
                    : 'Fill out your profile!'}
                </h1>
                <label>First Name</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label>E-mail</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Phone Number</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>Address</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label>Birthday</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                <label>Occupation</label>
                <input
                  className="rounded text-center"
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-slate-500 rounded mt-5 px-5 text-white"
                >
                  {profileExists ? 'Update' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {editProfile === false && (
        <div className="flex flex-col items-center pt-20 text-xl ">
          <h1 className="text-3xl text-white">Your Profile</h1>
          <div className="bg-slate-300 rounded-xl p-10 px-40 shadow-lg">
            <h4 className="text-center text-4xl text-black">First Name</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.firstName}
            </h2>
            <h4 className="text-center text-4xl text-black">Last Name</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.lastName}
            </h2>
            <h4 className="text-center text-4xl text-black">E-Mail</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.email}
            </h2>
            <h4 className="text-center text-4xl text-black">Phone Number</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.phoneNumber}
            </h2>
            <h4 className="text-center text-4xl text-black">Address</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.address}
            </h2>
            <h4 className="text-center text-4xl text-black">Birthday</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.birthday}
            </h2>
            <h4 className="text-center text-4xl text-black">Occupation</h4>
            <h2 className="cursor-pointer text-black transform duration-75 hover:scale-150 text-center">
              {profile.occupation}
            </h2>
          </div>
          <div>
            <div className="flex gap-40 text-3xl text-white">
              <button onClick={() => handleStartEdit()}>Edit</button>
              <button onClick={ () => onOpenModal }>Delete</button>
              <Modal open={open} onClose={onCloseModal} center>
                <h2>Test</h2>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
// deleteProfile(profile.id)
