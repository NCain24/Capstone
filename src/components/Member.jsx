import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ReactLoading from 'react-loading'
import axios from 'axios';
import AuthContext from '../store/authContext';

const Member = () => {
  const authCtx = useContext( AuthContext );
  
  const [allProfiles, setAllProfiles] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [loading, setLoading] = useState(undefined)

  useEffect(() => {
    axios
      .get('http://localhost:5432/allprofiles', {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        setAllProfiles( res.data );
        setLoading(true)
      })
      .catch((err) => console.log(err));
  }, [authCtx.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col flex-wrap max-w-screen-2xl ">
      
      { !loading ? (
        <ReactLoading type={ 'spin' } color={'#03fc4e'} height={ 300 } width={ 300 } />
      ) : (
        <>
      <div className="flex justify-center">
        <form className='h-6'  onSubmit={ handleSubmit }>
          <input
            className="rounded border text-xl border-slate-500 shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="flex gap-5 flex-wrap overflow-y-auto p-10">
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
                <div className="flex justify-center bg-slate-300 w-60 h-60 rounded-lg cursor-pointer object-fill shadow-xl transform hover:scale-110 duration-75">
                  <div className="flex items-end text-3xl">
                    {member.firstName} {member.lastName}
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div> </>)}
    </div>
  );
};

export default Member;
