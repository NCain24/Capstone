import { NavLink } from "react-router-dom"

const Header = ({firstName}) => {
  return (
    <div>
      <div><h1>Welcome back, {firstName}!</h1></div>
      <div><nav>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/auth'>Logout</NavLink>
      </nav></div>
    
    </div>
  )
}

export default Header