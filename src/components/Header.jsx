import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/authContext';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="flex justify-between px-20 py-10">
      <div className="flex justify-center">
        <h1 className="text-3xl">Hello, {authCtx.username}!</h1>
      </div>
      <div>
        <nav className="flex justify-center gap-10 text-2xl">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/login" onClick={authCtx.logout}>
            Logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
