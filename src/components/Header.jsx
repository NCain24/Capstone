import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/authContext';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className='flex justify-center'>
      <div>
        <div className='flex justify-center'>
          <h1>Hello, {authCtx.username}!</h1>
        </div>
        <div>
          <nav className='flex justify-center gap-10'>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/login" onClick={authCtx.logout}>
              Logout
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
