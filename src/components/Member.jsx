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

    <div className="flex flex-col h-screen flex-wrap flex-auto max-w-screen-2xl overflow-x-hidden">
      <div className="flex m-5">
        <form className='h-6'  onSubmit={ handleSubmit }>
          <input
            className="rounded border text-xl border-slate-500 shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      
      { !loading ? (
            <ReactLoading type={ 'spin' } color={ '#03fc4e' } height={ 300 } width={ 300 } />
      ) : (
        <>
      <div className="flex gap-5 p-10 flex-wrap overflow-hidden overscroll-none">
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
                <div className="flex justify-center p-5 bg-slate-300 rounded-lg cursor-pointer object-fill shadow-xl transform hover:scale-110 duration-75">
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
