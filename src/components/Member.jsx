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
    <div>
      <div className="flex justify-center pt-10">
        <form onSubmit={handleSubmit}>
          <input
            className="border-2"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className='flex p-10 gap-5 justify-center'>
        {allProfiles
          .filter((member) => {
            return (
              member.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((member, id) => {
            return (
              <NavLink to='/profile/:id' key={id}>
                <div className='flex border-2 p-10'>
                  <div>{member.firstName} {member.lastName}</div>
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default Member;
