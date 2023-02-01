import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../store/authContext';

const Member = () => {
  const authCtx = useContext(AuthContext);
  const [allProfiles, setAllProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5432/allprofiles', {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllProfiles(res.data);
      })
      .catch((err) => console.log(err));
  }, [authCtx.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen">
      <div className="h-5 justify-center pl-10 pt-10">
        <form className='h-6'  onSubmit={ handleSubmit }>
          <input
            className="rounded border text-xl border-slate-500 shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="flex gap-5 justify-center flex-wrap overflow-y-auto pt-5">
        {allProfiles
          .filter((member) => {
            return (
              member.firstName &&
              member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((member) => {
            return (
              <NavLink to={`/viewprofile/${member.id}`} key={member.id}>
                <div className="flex justify-center bg-white w-60 h-60 rounded-lg cursor-pointer object-fill shadow-xl transform hover:scale-110 duration-75">
                  <div className="flex items-center text-2xl">
                    {member.firstName} {member.lastName}
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default Member;
