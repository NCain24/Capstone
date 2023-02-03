import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/authContext';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="flex justify-between px-20 py-5">
      <div className="flex justify-center">
        <h1 className="text-white text-3xl">Hello, {authCtx.username}!</h1>
      </div>
      <div>
        <nav className="flex justify-center gap-10 text-2xl text-white">
          <NavLink className={'transform hover:scale-150 duration-75'} to="/home">
            Home
          </NavLink>
          <NavLink className={'transform hover:scale-150 duration-75'} to="/profile">
            Profile
          </NavLink>
          <NavLink
            className={'transform hover:scale-150 duration-75'}
            to="/login"
            onClick={authCtx.logout}
          >
            Logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
