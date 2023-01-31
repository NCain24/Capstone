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
            className="border-2 border-black"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="flex p-10 gap-5 justify-center">
        {allProfiles
          .filter((member) => {
            return member.firstName &&
              member.firstName.toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((member) => {
            return (
              <NavLink to={`/viewprofile/${member.id}`} key={member.id}>
                <div className="flex border-2 border-black p-10 bg-white">
                  <div className="text-xl">
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
